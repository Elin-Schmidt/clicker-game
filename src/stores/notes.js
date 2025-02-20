// Composition API

import { defineStore } from 'pinia'

export const useNotesStore = defineStore('notes', {
  state: () => ({
    notes: JSON.parse(localStorage.getItem('notes')) || []
  }),
  actions: {
    addNote(note) {
      this.notes.push(note)
      this.saveNotes()
    },
    deleteNote(index) {
      this.notes.splice(index, 1)
      this.saveNotes()
    },
    updateNote(index, newNote) {
      this.notes[index] = newNote
      this.saveNotes()
    },
    saveNotes() {
      localStorage.setItem('notes', JSON.stringify(this.notes))
    }
  }
})
