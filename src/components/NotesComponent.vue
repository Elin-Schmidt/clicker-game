<template>
    <div class="wrapper">
        <!-- Input-fältet som alltid är högst upp -->
        <div class="top-input">
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
        </div>

        <div class="main-container">
            <!-- Sidebar -->
            <div class="sidebar">
                <ul>
                    <li
                        v-for="(entry, index) in notesStore.notes"
                        :key="index"
                        @click="selectEntry(index)"
                    >
                        {{ entry.substring(0, 20) }}...
                    </li>
                </ul>
            </div>

            <!-- Innehåll där den valda noten visas -->
            <div class="entriesContainer">
                <p v-if="selectedEntry === null" class="emptyMessage">
                    No notes!
                </p>
                <p v-else class="entry">
                    {{ notesStore.notes[selectedEntry] }}
                </p>

                <div class="entryActions">
                    <button
                        v-if="selectedEntry !== null"
                        @click="startEditing(selectedEntry)"
                        class="actionText"
                    >
                        Edit
                    </button>
                    <button
                        v-if="selectedEntry !== null"
                        @click="deleteEntry(selectedEntry)"
                        class="actionText"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { ref, onMounted, watch } from 'vue';
    import { useNotesStore } from '../stores/notes';

    export default {
        setup() {
            const notesStore = useNotesStore();
            const diaryEntry = ref('');
            const editIndex = ref(null);
            const selectedEntry = ref(null);

            const addOrUpdateEntry = () => {
                if (editIndex.value !== null) {
                    notesStore.updateNote(editIndex.value, diaryEntry.value);
                } else {
                    notesStore.addNote(diaryEntry.value);
                }
                diaryEntry.value = '';
                editIndex.value = null;
            };

            const deleteEntry = (index) => {
                notesStore.deleteNote(index);
                if (selectedEntry.value === index) {
                    selectedEntry.value = null;
                }
            };

            const startEditing = (index) => {
                diaryEntry.value = notesStore.notes[index];
                editIndex.value = index;
            };

            const selectEntry = (index) => {
                selectedEntry.value = index;
            };

            return {
                notesStore,
                diaryEntry,
                editIndex,
                selectedEntry,
                addOrUpdateEntry,
                deleteEntry,
                startEditing,
                selectEntry
            };
        }
    };
</script>

<style scoped>
    .wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .top-input {
        width: 100%;
        max-width: 1050px;
        margin-bottom: 0;
        padding-bottom: 2%;
        border-bottom: 2px solid #ff99ac;
    }

    .title {
        font-size: 24px;
        margin-bottom: 10px;
    }

    .textArea {
        width: 100%;
        padding: 10px;
        margin-bottom: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
    }

    .button {
        width: 100%;
        background-color: #ffd5c3; /* Ljus orange/rosa */
        padding: 12px;
        border-radius: 8px;
        border: 2px solid #333;
        text-align: center;
        margin: 10px 0;
        color: #000;
        font-size: 16px;
        cursor: pointer;
    }

    .button:hover {
        background-color: #ffbfa3;
    }

    .main-container {
        display: flex;
        width: 100%;
        max-width: 1200px;
        flex-grow: 1;
        justify-content: space-between;
    }

    .sidebar {
        width: 200px;
        border-right: 2px solid #ff99ac;
        flex-shrink: 0;
    }

    .sidebar ul {
        text-align: start;
        padding-left: 5px !important;
        width: 100%;
    }
    .sidebar li {
        list-style-type: none;
        padding: 5%;
        cursor: pointer;
        border: 1px solid #ff99ac;
    }

    .entriesContainer {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px;
        min-width: 450px;
        max-width: 800px;
        width: 100%;
        background-color: #f8f8f8;
        overflow: auto;
    }

    .entry {
        margin-bottom: 20px;
        width: 100%;
    }

    .entryActions {
        display: flex;
        justify-content: space-between; /* Se till att knapparna placeras på varsin kant */
        width: 100%; /* Gör så att de tar upp hela bredden */
        margin-top: 10px; /* Lägger till lite utrymme ovanför knapparna */
    }

    .actionText {
        color: #000;
        font-size: 14px;
        text-decoration: none;
        cursor: pointer;
        background-color: #ffd5c3;
        border: 2px solid #000;
        border-radius: 18px;
        padding: 5px 10px;
    }

    .actionText:hover {
        background-color: #ffbfa3;
    }

    ul {
        list-style-type: none;
    }

    /* Responsiv design */
    @media (max-width: 768px) {
        .main-container {
            flex-direction: column; /* Sidebar går under textarean på mindre skärmar */
        }

        .sidebar {
            width: 100%;
            border-right: none;
            border-bottom: 2px solid #ff99ac;
        }

        .textArea {
            width: 100%; /* Textarea ska fortfarande fylla hela bredden */
        }
    }
</style>
