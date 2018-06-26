import React, { Component } from 'react';
import './css/ProdMan.css';

//single create or update
//table edit to be done

class ProdMan extends Component{
  constructor(){
    super();
    this.state={
        value:'',
        getdata:[],
        sentdata:[],
        createname:'',
        createprice:0.0,
        createstock:0,
        createupc:'not given',
        created:'',
      };
      this.handleCreateName=this.handleCreateName.bind(this);
      this.handleCreatePrice=this.handleCreatePrice.bind(this);
      this.handleCreateStock=this.handleCreateStock.bind(this);
      this.handleCreateUpc=this.handleCreateUpc.bind(this);

    this.handleCreate=this.handleCreate.bind(this);
    this.handleUpdate=this.handleUpdate.bind(this);
  }

  componentDidMount=()=> {
      //console.log('componentDidMount')

  fetch('http://127.0.0.1:8000/mart/productsdata/',{
  cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
  credentials: 'same-origin', // include, same-origin, *omit
  headers: {
    'user-agent': 'Mozilla/4.0 MDN Example',
    'content-type': 'application/json'
  },
  method: 'GET', // *GET, POST, PUT, DELETE, etc.
  mode: 'cors', // no-cors, cors, *same-origin
  redirect: 'follow', // manual, *follow, error
  referrer: 'no-referrer', // *client, no-referrer
    }).then(function(response){
          return('response:: ',response.json());
        }).then(myJson=> {
    console.log('myJson:: ', myJson);
    let temp=[]
    //console.log('working')
    for (let value in myJson){
      console.log(myJson[value]);
      temp.push(myJson[value])
    }
    this.setState({getdata:temp});
    //console.log(this.state.getdata[0]);
    //console.log('updated')


  })
      }

handleUpdate=()=>{
  //console.log('handleSubmit')
  //trying post with handleSubmit
  fetch('http://127.0.0.1:8329836582377721000/mart/productsdata/',{
  body: JSON.stringify([{
        "product_upc": "329836582377721",
        "product_name": "product_name_1",
        "product_stock": 297,
        "should_delete": false,
        "product_price": 94
    },
    {
        "product_upc": "329836582377724",
        "product_name": "product_name_4",
        "product_stock": 296,
        "should_delete": false,
        "product_price": 64
    }
]
), // must match 'Content-Type' header
  cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
  credentials: 'same-origin', // include, same-origin, *omit
  headers: {
    'user-agent': 'Mozilla/4.0 MDN Example',
    'content-type': 'application/json'
  },
  method: 'POST', // *GET, POST, PUT, DELETE, etc.
  mode: 'cors', // no-cors, cors, *same-origin
  redirect: 'follow', // manual, *follow, error
  referrer: 'no-referrer', // *client, no-referrer
}).then(response =>{return(response.json());  // response.json() --parses response to JSON returns a Promise object
  //console.log('response::::',response);
  //console.log('response.data::: ',response.data);
  //console.log('response.json()::::',response.json());
  })
}


handleCreateName=(e)=>{
  this.setState({createname:e.target.value})
}
handleCreatePrice=(e)=>{
  this.setState({createprice:e.target.value})
}
handleCreateStock=(e)=>{
  this.setState({createstock:e.target.value})
}
handleCreateUpc=(e)=>{
  this.setState({createupc:e.target.value})
}

  handleCreate=()=>{
    //console.log('handleSubmit')
    //trying post with handleSubmit
    let sendforupdateorcreate=this.state.sentdata;
    let createname=this.state.createname;
    let createupc=this.state.createupc;
    let createprice=this.state.createprice;
    let createstock=this.state.createstock;
    //array type object

    //pushing into the update array
    sendforupdateorcreate.push({
        "product_upc": createupc,
        "product_name": createname,
        "product_stock": createstock,
        "should_delete": false,
        "product_price": createprice
    })

    this.setState({sentdata:sendforupdateorcreate});

    //making that post
    fetch('http://127.0.0.1:8000/mart/productsdata/',{
    body: JSON.stringify(this.state.sentdata), // must match 'Content-Type' header
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, same-origin, *omit
    headers: {
      'user-agent': 'Mozilla/4.0 MDN Example',
      'content-type': 'application/json'
    },
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // *client, no-referrer
  }).then(response =>{
    return(response.json());  // response.json() --parses response to JSON returns a Promise object
    //console.log('response::::',response);
    //console.log('response.json()::::',response.json());
    //console.log('response.data::: ',response.data);
  }).then(res=>{
    //console.log('res::',res);
    //this.componentDidMount();
    this.handleCreatedShow();
  })
}
handleCreatedShow=()=>{
  this.setState({created:'updated'})
  setTimeout(() => {
    this.setState({value:'',
          createname:'',
          createprice:0.0,
          createstock:0,
          createupc:'not given',
          created:''});
    }, 2000);

}
handleChangeforUpdate=()=>{
  console.log('handle change')
}

    render() {
let list=this.state.getdata.map(object=>{
  return(
    <tr key={object.product_upc} className="producttabledata">
            <td><input type="checkbox" /></td>
            <td><input className="inputprodmantext" defaultValue={object['product_name']} onChange={this.handleChangeforUpdate.bind(this)} placeholder={object['product_name']} /></td>
            <td><input className="inputprodmantext" defaultValue={object['product_price']} onChange={this.handleChangeforUpdate.bind(this)}  placeholder={object['product_price']}  /></td>
            <td><input className="inputprodmantext" defaultValue={object['product_stock']} onChange={this.handleChangeforUpdate.bind(this)}  placeholder={object['product_stock']} /></td>
            <td><input className="inputprodmantext" defaultValue={object['product_upc']} onChange={this.handleChangeforUpdate.bind(this)}  placeholder={object['product_upc']} /></td>
    </tr>

  )
})


      return (
    <div>

    <div className="topnav">
        <a className="active" href="/">home</a>
        <a className="active" href="pos">Pos screen</a>
        <h3 className="storename">storename</h3>
    </div>

    <div className="createcontainer">
      <table className="createtable" border="1" width="65%" align='center'>
        <thead>
          <tr>

          <th><input className="inputprodmantext" placeholder="product name" onChange={this.handleCreateName}/></th>
          <th><input  className="inputprodmantext" placeholder="product price" onChange={this.handleCreatePrice} /></th>
          <th><input  className="inputprodmantext" placeholder="product stock" onChange={this.handleCreateStock} /></th>
          <th><input  className="inputprodmantext" placeholder="product upc" onChange={this.handleCreateUpc} /></th>

          </tr>
        </thead>

      </table>
    </div>

    <div className="thisshouldupdate" align="center">{this.state.created}</div>

    <div className="buttonscontainer" align='center'>
          <button className="button" onClick={this.handleCreate}>Create or Update</button>
    </div>

<div className="productscontainer" >
    <table border="1" align="center" width="65%" className='productstable' >
      <thead>
        <tr className="tableheadrow">
          <th >delete</th>
          <th>product name</th>
          <th>product price</th>
          <th>product stock</th>
          <th>product upc</th>

        </tr>
      </thead>
      <tbody>{list}</tbody>

    </table>
</div>


      <div className="buttonscontainer" align='center'>
            <button className="button">update</button>
      </div>



        </div>
              );
            }
}

export default ProdMan;
