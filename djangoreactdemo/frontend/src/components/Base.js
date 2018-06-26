import React, { Component } from 'react';
import './css/Base.css';

class Base extends Component {
  constructor(){
    super();
    this.state={
        value:'',
    }
  }
  render() {
    return (
      <div>
      <div className="topnav">
          <a className="active" href="pos">Pos screen</a>
          <a className="active" href="prodman">Inventory</a>
          <h3 className="storename">storename</h3>
      </div>

        <div>
        <h4>pos page usage tips::</h4>

          1.use keyboard only.<br />
          2.click tab for switching between input and buttons while entering data.<br />
          3.for updating an entered product use add to list with the new product quantity.<br />
          4.for removing an entered product select the product and click remove quantity is no required. <br />
          </div>

      </div>
    );
  }
}

export default Base;
