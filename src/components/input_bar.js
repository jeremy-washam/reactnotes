import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

class InputBar extends Component {
  constructor(props) {
    super(props);
    this.state = { title: '' };

    this.onInputChange = this.onInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

    onInputChange = (e) => {
      this.setState({ title: e.target.value });
    }

    onSubmit = () => {
      if (this.state.title === '') {
        this.props.addNote('Untitled');
      } else {
        this.props.addNote(this.state.title);
      }
      this.setState({ title: '' });
    }

    render() {
      return (
        <div className="inputBar">
          <p>Dark Mode Notes</p>
          <input placeholder="Enter note title" value={this.state.title} onChange={this.onInputChange} />
          <button onClick={this.onSubmit} type="button">
            <FontAwesomeIcon icon={faPlus} />
            <span>Create new note</span>
          </button>
        </div>
      );
    }
}

export default InputBar;
