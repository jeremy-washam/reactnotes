import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyDS0Op-Cy6AqZHAVuBkcGvQOcqWei1-JVM',
  authDomain: 'reactnotes-c34fd.firebaseapp.com',
  databaseURL: 'https://reactnotes-c34fd.firebaseio.com',
  projectId: 'reactnotes-c34fd',
  storageBucket: 'reactnotes-c34fd.appspot.com',
  messagingSenderId: '411057911169',
  appId: '1:411057911169:web:091983b5a2feb5f0976480',
  measurementId: 'G-S8SLTX6JK1',
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
