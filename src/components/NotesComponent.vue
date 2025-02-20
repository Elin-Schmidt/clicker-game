<!-- Composition API -->

<template>
  <div class="wrapper">
    <div class="top-input">
      <h1 class="title">My Notes</h1>
      <textarea
        class="textArea"
        placeholder="Add a note..."
        v-model="diaryEntry"
        rows="5"
      />
      <button class="button" @click="addOrUpdateEntry">
        {{ editIndex !== null ? 'Update note' : 'Add note' }}
      </button>
    </div>

    <div class="main-container">
      <div class="sidebar">
        <ul>
          <li
            v-for="(entry, index) in notesStore.notes"
            :key="index"
            @click="selectEntry(index)"
            :class="{ selected: selectedEntry === index }"
          >
            {{ entry.substring(0, charactersToShow) }}...
          </li>
        </ul>
      </div>

      <div class="entriesContainer">
        <p
          v-if="selectedEntry === null"
          class="emptyMessage"
          placeholder="Select an entry to view"
        >
          Select an entry to view
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
  import { ref, onMounted, onUnmounted, watch, computed } from 'vue'
  import { useNotesStore } from '../stores/notes'

  export default {
    setup() {
      const notesStore = useNotesStore()
      const diaryEntry = ref('')
      const editIndex = ref(null)
      const selectedEntry = ref(null)
      const windowWidth = ref(window.innerWidth)

      const addOrUpdateEntry = () => {
        if (editIndex.value !== null) {
          notesStore.updateNote(editIndex.value, diaryEntry.value)
        } else {
          notesStore.addNote(diaryEntry.value)
        }
        diaryEntry.value = ''
        editIndex.value = null
      }

      const deleteEntry = (index) => {
        notesStore.deleteNote(index)
        if (selectedEntry.value === index) {
          selectedEntry.value = null
        }
      }

      const startEditing = (index) => {
        diaryEntry.value = notesStore.notes[index]
        editIndex.value = index
      }

      const selectEntry = (index) => {
        selectedEntry.value = index
      }

      const charactersToShow = computed(() => {
        return windowWidth.value <= 768 ? 50 : 20
      })

      const updateWindowWidth = () => {
        windowWidth.value = window.innerWidth
      }

      onMounted(() => {
        window.addEventListener('resize', updateWindowWidth)
      })

      onUnmounted(() => {
        window.removeEventListener('resize', updateWindowWidth)
      })

      return {
        notesStore,
        diaryEntry,
        editIndex,
        selectedEntry,
        addOrUpdateEntry,
        deleteEntry,
        startEditing,
        selectEntry,
        charactersToShow
      }
    }
  }
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
    border-bottom: 1px solid #ff99ac;
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
    background-color: #ffd5c3;
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
    overflow-y: scroll;
    max-height: 29.6dvh;
    scroll-snap-type: proximity;
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
  .sidebar li:hover {
    background-color: #eee3e3;
  }
  .sidebar li.selected {
    background-color: #eee3e3;
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
    border-radius: 1rem;
    margin-top: 1rem;
  }

  .entry {
    margin-bottom: 50px;
    width: 100%;
    min-height: 10dvh;
  }

  .entryActions {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 10px;
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
  .emptyMessage {
    color: #747474;
    font-style: italic;
  }

  @media (max-width: 768px) {
    .main-container {
      flex-direction: column;
    }

    .sidebar {
      width: 100%;
      border-right: none;
    }

    .textArea {
      width: 100%;
    }
    .sidebar li {
      padding: 0.69rem;
    }
    .entriesContainer {
      border: 2px solid #ff99ac;
    }
  }
</style>
