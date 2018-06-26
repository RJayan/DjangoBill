import React, { Component } from 'react';
import './css/NotFoundPage.css';

class NotFoundPage extends Component {
  constructor(){
    super();
    this.state={
        value:'',
    }
  }
  render() {
    return (
      <div align="center" className="NotFoundpagemargin">
        <h2>content not found</h2>
        <p>Bills of purchase before three days of current date cannot be displayed</p>
      </div>
    );
  }
}

export default NotFoundPage;
