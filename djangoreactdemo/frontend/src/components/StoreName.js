import React, { Component } from 'react';


class StoreName extends Component {
  constructor(){
    super();
    this.state={
        value:'',
    }
  }
  render() {
    return (
      <div>
      <div align='center' className='storenamedetails'>
        <h2>store name</h2>
        kunnil heights, bypass road near infosys kazhakoottam, trivandrum -695583<br />
         phone:7856876756567,5765769876554 <br />
         <strong>email: storename@mail.com</strong>
        <pre> <strong>Invoice:</strong> invoicenumber         <strong>Date:</strong> 24/03/2018</pre>
       </div>
      </div>
    );
  }
}

export default StoreName;
