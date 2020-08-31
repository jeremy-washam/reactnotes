/* eslint-disable react/no-danger */
import React from 'react';
import Draggable from 'react-draggable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrash, faEdit, faSave, faArrowsAlt,
} from '@fortawesome/free-solid-svg-icons';
import marked from 'marked';

class Note extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
    };
  }

    onEditClick = () => {
      this.setState({ isEditing: true });

      // Handle note with no content and/or no title
      if (this.props.note.content === 'Edit to add content' && this.props.note.title === 'Untitled') {
        const newNote = { ...this.props.note };
        newNote.title = '';
        newNote.content = '';
        this.props.updateNote(this.props.id, newNote);
      } else if (this.props.note.content === 'Edit to add content') {
        const newNote = { ...this.props.note };
        newNote.content = '';
        this.props.updateNote(this.props.id, newNote);
      } else if (this.props.note.title === 'Untitled') {
        const newNote = { ...this.props.note };
        newNote.title = '';
        this.props.updateNote(this.props.id, newNote);
      }
    }

    onSaveClick = () => {
      this.setState({ isEditing: false });

      // Handle note with no content and/or no title
      if (this.props.note.content === '' && this.props.note.title === '') {
        const newNote = { ...this.props.note };
        newNote.title = 'Untitled';
        newNote.content = 'Edit to add content';
        this.props.updateNote(this.props.id, newNote);
      } else if (this.props.note.content === '') {
        const newNote = { ...this.props.note };
        newNote.content = 'Edit to add content';
        this.props.updateNote(this.props.id, newNote);
      } else if (this.props.note.title === '') {
        const newNote = { ...this.props.note };
        newNote.title = 'Untitled';
        this.props.updateNote(this.props.id, newNote);
      }
    }

    onDeleteClick = () => {
      this.props.deleteNote(this.props.id);
    }

    onTitleChange = (event) => {
      const newNote = { ...this.props.note };
      newNote.title = event.target.value;
      this.props.updateNote(this.props.id, newNote);
    }

    onInputChange = (event) => {
      const newNote = { ...this.props.note };
      newNote.content = event.target.value;
      this.props.updateNote(this.props.id, newNote);
    }

    handleDrag = (e, data) => {
      const newNote = { ...this.props.note };
      const x = this.props.note.x + data.deltaX;
      const y = this.props.note.y + data.deltaY;
      newNote.x = x;
      newNote.y = y;
      this.props.updateNote(this.props.id, newNote);
    }

    /* Consulted https://github.com/STRML/react-draggable for a lot of this */
    renderNote() {
      if (this.state.isEditing) {
        return (
          <Draggable
            grid={[10, 10]}
            position={{ x: this.props.note.x, y: this.props.note.y }}
            onDrag={this.handleDrag}
            handle=".drag"
          >
            <div className="note">
              <div className="noteHeader">
                <textarea placeholder="Enter title" value={this.props.note.title} onChange={this.onTitleChange} />
                <div className="icons">
                  <FontAwesomeIcon className="pointer" onClick={this.onSaveClick} icon={faSave} />
                  <FontAwesomeIcon className="pointer" onClick={this.onDeleteClick} icon={faTrash} />
                  <FontAwesomeIcon className="drag" icon={faArrowsAlt} />
                </div>
              </div>
              <textarea placeholder="Enter note content" value={this.props.note.content} onChange={this.onInputChange} />
            </div>
          </Draggable>
        );
      } else {
        return (
          <Draggable
            grid={[10, 10]}
            position={{ x: this.props.note.x, y: this.props.note.y }}
            onDrag={this.handleDrag}
            handle=".drag"
          >
            <div className="note">
              <div className="noteHeader">
                <p> {this.props.note.title} </p>
                <div className="icons">
                  <FontAwesomeIcon className="pointer" onClick={this.onEditClick} icon={faEdit} />
                  <FontAwesomeIcon className="pointer" onClick={this.onDeleteClick} icon={faTrash} />
                  <FontAwesomeIcon className="drag" icon={faArrowsAlt} />
                </div>
              </div>
              <div className="noteBody" dangerouslySetInnerHTML={{ __html: marked(this.props.note.content || '') }} />
            </div>
          </Draggable>
        );
      }
    }

    render() {
      return (
        <div>
          {this.renderNote()}
        </div>
      );
    }
}

export default Note;
