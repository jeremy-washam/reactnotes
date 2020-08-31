import React from 'react';
import ReactDOM from 'react-dom';
import { Map } from 'immutable';
import './style.scss';
import Note from './components/note';
import InputBar from './components/input_bar';
import * as db from './services/datastore';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: new Map(),
    };

    this.renderNotes = this.renderNotes.bind(this);
  }

  componentDidMount() {
    db.fetchNotes((notes) => {
      this.setState({ notes: new Map(notes) });
    });
  }

    addNote = (newTitle) => {
      const note = {
        title: newTitle,
        content: 'Edit to add content',
        x: 575,
        y: 20,
      };
      db.createNote(note);
    }

    updateNote = (id, updatedNote) => {
      db.updateNote(id, updatedNote);
    }

    deleteNote = (id) => {
      db.deleteNote(id);
    }

    renderNotes = (notes) => {
      return (notes.entrySeq().map(([id, note]) => {
        return <Note updateNote={this.updateNote} deleteNote={this.deleteNote} id={id} key={id} note={note} />;
      }));
    }

    render() {
      return (
        <div>
          <InputBar addNote={this.addNote} />
          { this.renderNotes(this.state.notes) }
        </div>
      );
    }
}

ReactDOM.render(<App />, document.getElementById('main'));
