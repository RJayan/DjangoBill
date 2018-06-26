import React, { Component } from 'react';
import './css/AdvertisersPage.css';


class AdvertisersPage extends Component {
  constructor(){
    super();
    this.state={
        source:'',
        redirect:'',
        priority:0,
        pictures:[],
    }
  }
  handleSourceChange=(e)=>{
    console.log(e.target.value);
    this.setState({source:e.target.value});
  }
  handleRedirectChange=(e)=>{
    console.log(e.target.value);
    this.setState({redirect:e.target.value});
  }
  componentDidMount=()=>{
    //on mount fetch data

    fetch('http://127.0.0.1:8000/mart/advertiser/').then(function(response){
            //console.log("response.json()::::",typeof(response.json()));
                    //console.log("response.json()::::",response.json());
            return('response:: ',response.json());
    }).then(myJson=>{
      //console.log('myJson:: ', myJson);
      //console.log(myJson.detail);
      if (myJson.detail==='Authentication credentials were not provided.'){
        console.log("no Authentication provided");
      }else{
      //console.log('myJson[0]::',myJson[0]);

      let temp=[];
      //console.log('in loop')
      for (let value of myJson){
        //console.log(value)
        //console.log(value['product_upc'])

        console.log('v:::::',value)
        //temp2.push({label:value['product_name'],value:value['product_upc']})
      }
      this.setState({getdata:temp});
      //var x=this.state.getdata['productname1'];
      //console.log('x:::::::::',x,':::::::',x['product_upc']);
      //console.log('for executed get data done');
      }
    })

  }
  handleSubmit=()=>{

    fetch('http://127.0.0.1:8000/mart/advertiser/',{
    body: JSON.stringify({
            "source_of_image_or_gif":this.state.source,
            "redirected_to_link": this.state.redirect
                               }), // must match 'Content-Type' header
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

  render() {

    let list=this.state.pictures.map(object=>{
        return(
          <div className='rowofbilltable'>
              <img alt="not received" src={require('./css/images/buy_ebooks_online.jpg')} />
           </div>
        )
    })

    return (
      <div>
      <div className="topbillnav">
          <h3 className="store">name of store</h3>
      </div>

      <div align="left" className="inputbox">
        source::
        <input type="text" className="inputtext" onChange={this.handleSourceChange.bind(this)} placeholder='enter source of ad'/><br />
        redirect::
        <input type="text" className="inputtext" onChange={this.handleRedirectChange.bind(this)} placeholder='enter redirection url'/>
      </div>
      <button onClick={this.handleSubmit.bind(this)} className="Submitadbutton">Submit</button>


      <div className="ImageUploader" align="center">


      </div>

      <div className="uploadedimages" align="center">
        {list}
        <img alt="E-Books Store ad" src={require("./css/images/buy_ebooks_online.jpg")} />
      </div>


      </div>
    );
  }
}

export default AdvertisersPage;
