import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Registration extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {};
  }

  handleClick() {
    console.log('Click happened');
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
  };

  render() {
    return (
      <div>
        <br />
      </div>
    );
  }
}

export default Registration;