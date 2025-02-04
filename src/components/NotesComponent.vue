<template>
    <div class="wrapper">
        <div class="main">
            <div class="container">
                <h1 class="title">My Notes</h1>

                <textarea
                    class="textArea"
                    placeholder="Add a note..."
                    v-model="diaryEntry"
                    rows="5"
                ></textarea>

                <button class="button" @click="addOrUpdateEntry">
                    {{ editIndex !== null ? 'Update note' : 'Add note' }}
                </button>

                <div class="linebreak"></div>

                <p v-if="diaryEntries.length === 0" class="emptyMessage">
                    No notes!
                </p>

                <ul>
                    <li
                        v-for="(entry, index) in diaryEntries"
                        :key="index"
                        class="entry-container"
                    >
                        <p class="entry">{{ entry }}</p>
                        <div class="entryActions">
                            <button
                                @click="startEditing(index)"
                                class="actionText"
                            >
                                Edit
                            </button>
                            <button
                                @click="deleteEntry(index)"
                                class="actionText"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import { ref } from 'vue';

    export default {
        setup() {
            const diaryEntry = ref('');
            const diaryEntries = ref([]);
            const editIndex = ref(null);

            const addOrUpdateEntry = () => {
                if (editIndex.value !== null) {
                    diaryEntries.value[editIndex.value] = diaryEntry.value;
                } else {
                    diaryEntries.value.push(diaryEntry.value);
                }
                diaryEntry.value = '';
                editIndex.value = null;
            };

            const deleteEntry = (index) => {
                diaryEntries.value.splice(index, 1);
            };

            const startEditing = (index) => {
                diaryEntry.value = diaryEntries.value[index];
                editIndex.value = index;
            };

            return {
                diaryEntry,
                diaryEntries,
                editIndex,
                addOrUpdateEntry,
                deleteEntry,
                startEditing
            };
        }
    };
</script>

<style scoped>
    .wrapper {
        flex: 1;
        display: flex;
        flex-direction: column;
    }

    .main {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center; /* Centrera horisontellt */
        justify-content: center; /* Centrera vertikalt */
        width: 100%; /* Anpassa bredden */
    }

    .container {
        display: flex;
        flex-direction: column;
        align-items: center; /* Centrera innehållet */
        padding: 20px;
        min-width: 500px;
        max-width: 800px; /* Begränsa bredden för bättre layout */
        width: 100%;
    }

    .title {
        font-size: 26px;
        font-weight: bold;
        margin-bottom: 20px;
        color: #333;
        text-align: center;
    }

    .textArea {
        border: 1px solid #ddd;
        padding: 10px;
        margin-bottom: 10px;
        border-radius: 8px;
        background-color: #fff;
        height: 100%;
        width: 100%;
        text-align: start;
        vertical-align: top;
    }

    .button {
        width: 100%;
        background-color: #ffd5c3;
        padding: 12px;
        border-radius: 8px;
        border-style: inset;
        border-color: #333;
        text-align: center;
        margin: 10px 0;
        color: #000;
        font-size: 16px;
        cursor: pointer;
    }

    .linebreak {
        margin: 20px 0;
        height: 1px;
        width: 100%;
        background-color: #000;
    }

    .entriesContainer {
        border: 1px solid #ddd;
        border-radius: 8px;
        background-color: #f8f8f8;
    }

    .entryContainer {
        border: 1px solid #000;
        border-radius: 8px;
        padding: 5px;
        background-color: #f8f8f8;
    }

    .entry {
        background-color: #fff1eb;
        padding: 25px;
        margin: 2px 0;
        font-size: 18px;
        font-style: italic;
        color: #333;
        border: 8px;
        border-style: double;
        border-color: #ffd5c3;
        border-radius: 8px;
        box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.2);
        display: flex;
        align-items: center;
        width: 100%; /* Gör så att varje entry tar upp hela bredden */
        min-height: 45px; /* Minimumhöjd så att den inte kollapsar */
        box-sizing: border-box; /* Inkludera padding och border i storleken */
    }

    .emptyMessage {
        text-align: center;
        color: #999;
        font-style: italic;
    }

    .entryActions {
        display: flex;
        justify-content: space-between;
        margin-left: 10px;
        margin-right: 10px;
        margin-bottom: 50px;
        margin-top: 10px;
    }

    .actionText {
        color: #000;
        font-size: 14px;
        text-decoration: none;
        cursor: pointer;
        background-color: #ffd5c3;
        border: 1px;
        border-style: inset;
        border-color: #000;
        border-radius: 18px;
    }
    ul {
        list-style: none;
        padding: 0;
    }
</style>
