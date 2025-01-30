<template>
    <div>
        <button @click="authenticateTwitch">Log in with Twitch</button>
        <div v-if="events.length">
            <h1>Stream Schedule</h1>
            <div v-for="event in events" :key="event.start">
                <h3>{{ event.title }}</h3>
                <p>
                    {{ new Date(event.start).toLocaleString() }} -
                    {{ new Date(event.end).toLocaleString() }}
                </p>
            </div>
        </div>
        <div v-else>
            <p>No schedule available for this streamer.</p>
        </div>
    </div>
</template>

<script>
    import { ref, onMounted } from 'vue';
    import axios from 'axios';

    export default {
        name: 'TwitchCalendar',
        setup() {
            const events = ref([]);
            const oauthToken = ref(null);

            const clientId = 'ynv3rhgdjywakw98cad9kfymzoqjes'; // Replace with your actual Client ID
            const redirectUri = 'http://localhost:5173/twitch-calendar'; // Replace with your registered Redirect URI

            const authenticateTwitch = () => {
                const authUrl =
                    `https://id.twitch.tv/oauth2/authorize?client_id=${clientId}
        &redirect_uri=${redirectUri}
        &response_type=token
        &scope=user:read:follows`.replace(/\s+/g, '');

                window.location.href = authUrl;
            };

            const validateToken = async () => {
                try {
                    const response = await axios.get(
                        'https://id.twitch.tv/oauth2/validate',
                        {
                            headers: {
                                Authorization: `Bearer ${oauthToken.value}`
                            }
                        }
                    );
                    console.log('Token is valid:', response.data);
                    return response.data.user_id; // Returns valid user ID
                } catch (error) {
                    console.error('Invalid or expired token:', error);
                    return null;
                }
            };

            const fetchUserId = async () => {
                const userId = await validateToken(); // ✅ Validate first
                if (!userId) {
                    console.error('User ID is invalid. Please log in again.');
                    return null;
                }

                try {
                    const response = await axios.get(
                        'https://api.twitch.tv/helix/users',
                        {
                            headers: {
                                Authorization: `Bearer ${oauthToken.value}`,
                                'Client-Id': clientId
                            }
                        }
                    );
                    return response.data.data[0].id;
                } catch (error) {
                    console.error('Error fetching user ID:', error);
                    return null;
                }
            };

            const fetchFollowedStreamers = async () => {
                const userId = await fetchUserId();

                if (!userId) {
                    console.error(
                        'Invalid user ID. Cannot fetch followed streamers.'
                    );
                    return [];
                }

                try {
                    const response = await axios.get(
                        `https://api.twitch.tv/helix/channels/followed?user_id=${userId}`,
                        {
                            headers: {
                                'Client-Id': clientId,
                                Authorization: `Bearer ${oauthToken.value}`
                            }
                        }
                    );

                    console.log('Followed Streamers:', response.data);
                    return response.data.data.map((follow) => ({
                        broadcaster_id: follow.broadcaster_id,
                        broadcaster_name: follow.broadcaster_name
                    }));
                } catch (error) {
                    console.error(
                        'Error fetching followed streamers:',
                        error.response?.data || error
                    );
                    return [];
                }
            };

            const fetchStreamerSchedule = async (broadcasterId) => {
                try {
                    // Get the streamer's name using the broadcaster ID
                    const userResponse = await axios.get(
                        `https://api.twitch.tv/helix/users?id=${broadcasterId}`,
                        {
                            headers: {
                                Authorization: `Bearer ${oauthToken.value}`,
                                'Client-Id': clientId
                            }
                        }
                    );

                    const streamerName =
                        userResponse.data.data.length > 0
                            ? userResponse.data.data[0].display_name
                            : 'Unknown';
                    console.log(
                        `Fetching schedule for streamer: ${streamerName} (ID: ${broadcasterId})`
                    );

                    // Fetch the schedule for the broadcaster
                    const scheduleResponse = await axios.get(
                        `https://api.twitch.tv/helix/schedule?broadcaster_id=${broadcasterId}`,
                        {
                            headers: {
                                Authorization: `Bearer ${oauthToken.value}`,
                                'Client-Id': clientId
                            }
                        }
                    );

                    // Check if the schedule exists
                    if (
                        !scheduleResponse.data.data ||
                        scheduleResponse.data.data.length === 0
                    ) {
                        console.log(
                            `No schedule found for ${streamerName} (ID: ${broadcasterId})`
                        );
                        return [];
                    }

                    // Return the schedule if available
                    return scheduleResponse.data.data.segments || [];
                } catch (error) {
                    if (error.response && error.response.status === 404) {
                        console.log(
                            `No schedule available for broadcaster ID: ${broadcasterId}`
                        );
                    } else {
                        console.error('Error fetching schedule:', error);
                    }
                    return [];
                }
            };

            const fetchStreams = async () => {
                try {
                    const followedStreamers = await fetchFollowedStreamers();
                    const allSchedules = [];

                    for (const {
                        broadcaster_id,
                        broadcaster_name
                    } of followedStreamers) {
                        const schedule = await fetchStreamerSchedule(
                            broadcaster_id
                        );
                        schedule.forEach((stream) => {
                            allSchedules.push({
                                title: `${broadcaster_name}: ${stream.title}`,
                                start: stream.start_time,
                                end: stream.end_time
                            });
                        });
                    }

                    events.value = allSchedules;
                } catch (error) {
                    console.error('Error fetching streams:', error);
                }
            };

            const handleOAuthCallback = () => {
                const hash = window.location.hash;
                if (hash) {
                    const params = new URLSearchParams(hash.substring(1));
                    oauthToken.value = params.get('access_token');

                    if (oauthToken.value) {
                        localStorage.setItem('twitch_token', oauthToken.value); // ✅ Store token
                        fetchStreams();
                    }
                }
                console.log('OAuth Token:', oauthToken.value);
            };

            onMounted(() => {
                oauthToken.value = localStorage.getItem('twitch_token'); // ✅ Load stored token

                if (oauthToken.value) {
                    validateToken(); // ✅ Ensure token is valid
                    fetchStreams();
                } else {
                    handleOAuthCallback();
                }
            });

            return {
                events,
                authenticateTwitch
            };
        }
    };
</script>

<style scoped>
    #calendar {
        max-width: 900px;
        margin: 0 auto;
    }
    p {
        margin-bottom: 50px;
    }
</style>
