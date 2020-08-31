import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyDIXJt2IydsJqcjO7mGfAo_jJEo30D5OGA',
  authDomain: 'react-notes-743e5.firebaseapp.com',
  databaseURL: 'https://react-notes-743e5.firebaseio.com',
  projectId: 'react-notes-743e5',
  storageBucket: 'react-notes-743e5.appspot.com',
  messagingSenderId: '945888869362',
  appId: '1:945888869362:web:a230f362af89082e34096b',
  measurementId: 'G-G8QZFXM7NQ',
};
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the database service
const database = firebase.database();

export function fetchNotes(callback) {
  database.ref('notes').on('value', (snapshot) => {
    const newNoteState = snapshot.val();
    // do something with new note state
    callback(newNoteState);
  });
}

export function createNote(note) {
  database.ref('notes').push(note);
}

export function updateNote(id, note) {
  database.ref('notes').child(id).update(note);
}

export function deleteNote(id) {
  database.ref('notes').child(id).remove();
}
