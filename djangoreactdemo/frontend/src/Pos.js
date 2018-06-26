import React, { Component } from 'react';
import './components/css/Pos.css';
import QRCode from 'qrcode-react';
import 'react-select/dist/react-select.css'
import 'react-virtualized/styles.css'
import 'react-virtualized-select/styles.css'
import VirtualizedSelect from 'react-virtualized-select';
import StoreName from './components/StoreName.js';

//import Input from './components/Input';

class Pos extends Component{
  constructor(){
    super();
    this.state={
        getdata:{},
        options:[], //for VirtualizedSelect
        selectedproduct:'not selected yet',
        selectedqty:1,
        buyers_bought_list:[],
        qrcodetext:'Processing... please wait a minute',
        total:0,
        error:'',
        show: false,
        customers_email:'not given',
        customers_contact_number:0,
        starttime:0,
        performance:0,
        counter:0,
        username:"",

      };
      this.resetSelected=this.resetSelected.bind(this);
      this.handleChange=this.handleChange.bind(this);
      //this.handleRemove=this.handleRemove.bind(this);
      this.handleEmailInput=this.handleEmailInput.bind(this);
      this.handleContactInput=this.handleContactInput.bind(this);
  }



  componentDidMount=()=> {

    //console.log("tokene:::::",localStorage.getItem("token"))

    //console.log("anboe::::::::::::",Date.now()/1000)
    //console.log("anboe::::::::::::",Date.now()/1000 -localStorage.getItem("validfrom"))



    //verify token
    fetch('http://127.0.0.1:8000/mart/token/verify/',{
    body: JSON.stringify({
            "token":localStorage.getItem("token")
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
  }).then(response =>{
      console.log("token response::::::::",response)
      console.log("status::::::::",response.status)

      if(response.status!==200){
        //redirect to the login page

        window.location.href="http://localhost:3000/login"
      }

    })



  fetch('http://127.0.0.1:8000/mart/buyersdata/').then(function(response){
          //console.log("response.json()::::",typeof(response.json()));
                  //console.log("response.json()::::",response.json());
          return('response:: ',response.json());
  }).then(myJson=>{
    //console.log('myJson:: ', myJson);

    let temp2=[];
    let temp={};
    //console.log('in loop')
    for (let value of myJson){
      //console.log(value)
      //console.log(value['product_upc'])

      temp[value['product_name']]=value; //using dict type object to make searching faster
      temp2.push({label:value['product_name'],value:value['product_upc']})
    }
    this.setState({getdata:temp,options:temp2});
    //var x=this.state.getdata['productname1'];
    //console.log('x:::::::::',x,':::::::',x['product_upc']);
    //console.log('for executed get data done');

  })

//  while(Date.now()-localStorage.getItem("validfrom")){


    fetch('http://127.0.0.1:8000/mart/token/verify/',{
    body: JSON.stringify({
            "token":localStorage.getItem("token")
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
  }).then(response =>{
      //console.log("token response::::::::",response)
      console.log("status::::::::",response)
      console.log("current value:::::",localStorage.getItem("validfrom"))
      let validfrom=Date.now()/1000;
      localStorage.setItem("validfrom",validfrom)

      if(response.status!==200){
        //redirect to the login page
        window.location.href="http://localhost:3000/login"
      }

    })
//}


}

  handleSubmit=()=>{
    //console.log('handleSubmit')
    let starttime=this.state.starttime;
    let counter=this.state.counter;
    //console.log('countersubmit::',counter)
    let endtime=Date.now()/1000; //in seconds from epoch
    //endtime=endtime.getTime();
    console.log('endtime::',endtime)
    let performance=((endtime-starttime)/counter).toFixed(2)
    let tokenvalue=localStorage.getItem("token")
    let username=localStorage.getItem("username")
    //this.setState({submittime:endtime})

    //trying post with handleSubmit
    fetch('http://127.0.0.1:8000/mart/buyersdata/',{
    body: JSON.stringify({
            "performance":performance,
            "customers_contact_number": this.state.customers_contact_number,
            "customers_email": this.state.customers_email,
            "buyers_bought_list": this.state.buyers_bought_list,
            "token":tokenvalue,
            "employee_id":username
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
  }).then(response =>{
      console.log(response)
      return(response.json());
    // response.json() --parses response to JSON returns a Promise object
    //console.log('response::::',response);
    //console.log('response.data::: ',response.data);
    //console.log('response.json()::::',response.json());
    }).then(res=>{
  //console.log('res["unique_identifier_string"]:::',res['unique_identifier_string'])
  this.setState({qrcodetext:"http://localhost:3000/boughtdata/"+res['unique_identifier_string']})
  console.log('here:::::','http://localhost:3000/boughtdata/'+res["unique_identifier_string"]);
setTimeout(() => {
  this.setState({selectedproduct:'not selected yet',
            selectedqty:1,
            buyers_bought_list:[],
            qrcodetext:'Processing... please wait a minute',
            total:0,
            show:false,
            error:'',
            customers_email:'not given',
            customers_contact_number:0,
            starttime:0,
            performance:0,
            counter:0,
           });
  }, 2000);
 })
}

  handleChange=(e)=>{
      //console.log('e:::::: ',e);
      //console.log('e["label"]:::::: ',e["label"]); //product name

      this.setState({selectedproduct:e['label']})
    }
    handleQtychange=(e)=>{
      //console.log('Quantity:::::::' ,Math.abs(e.target.value));
      this.setState({selectedqty:Math.abs(e.target.value)});
    }
    resetSelected=()=>{
      this.setState({selectedproduct:'not selected',selectedqty:1});
      //  let y=this.state.selectedproduct;
      //console.log('y:::::::::: ',y);
    }
    handleAdd=()=>{
      //in handle add add to buyers_bought_list and show in table verify if added
      //console.log('handleAdd');
      let prod=this.state.selectedproduct;
      let qty=this.state.selectedqty;
      let total=this.state.total;
      let data=this.state.getdata;
      let bought_list=this.state.buyers_bought_list;
      let counter=this.state.counter;
      //console.log('co::::',counter)


      //logic:: check if product already exists in list if does then replace the existing

      //temp is the new data
      let temp={"bought_product_upc":this.state.getdata[prod]['product_upc'],
                "bought_product_qty":qty,"bought_product_name":this.state.getdata[prod]['product_name']
          }


      let exists=false;
      let removevalue=0;
        for (let key in this.state.buyers_bought_list){
          //console.log('keyed::',this.state.buyers_bought_list[key])
          //console.log('temp::::',temp)
          if(temp["bought_product_upc"]===this.state.buyers_bought_list[key]["bought_product_upc"]){
             exists=true;
            let name=this.state.buyers_bought_list[key]["bought_product_name"]
            let previousqty=this.state.buyers_bought_list[key]["bought_product_qty"]
             removevalue=data[name]['product_price']*previousqty
             bought_list.splice(bought_list.indexOf(this.state.buyers_bought_list[key]),1,temp)
//this.state.buyers_bought_list[key]["bought_product_name"]
          }
        }


        if(!exists){ //add directly to total
          //console.log('does not exist')
          //console.log('dddddddddd',counter)
          counter+=1;
          //console.log(counter)
          this.setState({show:true,
                        buyers_bought_list:this.state.buyers_bought_list.concat([temp]),
                      selectedqty:1,
                      counter:counter,
                      total:total+=qty*data[prod]['product_price']});
        }else{

          this.setState({buyers_bought_list:bought_list,
                      total:total+=qty*data[prod]['product_price']-removevalue,

                        });
        }
        //console.log('anboei::::::::::',this.state.counter)
        if(counter===1){
          let ctime= Date.now()/1000; //gives seconds
          //console.log("starttime::::::",ctime);

          this.setState({starttime:ctime})
        }



      //console.log('x:::::::::: ',this.state.selectedqty);
      //this.resetSelected();

  }

    handleRemove=()=>{
        //remove the current product
        //console.log(this.state.selectedproduct)
        let temp=this.state.buyers_bought_list
        let deletethis=this.state.selectedproduct
        let updatedtotal=this.state.total;
        let counter=this.state.counter;
        let removevalue=0;
        let deleteobject={}
        let remove={}
        //remove from temp and set it to buyers_bought_list
        for (let value in temp){

          if(deletethis===temp[value]["bought_product_name"]){
            deleteobject=temp[value]
            //console.log('d::',deleteobject)
            remove=deleteobject['bought_product_name']
            //console.log('remove::',remove)
            //get price from get data
            removevalue=this.state.getdata[remove]['product_price']*deleteobject['bought_product_qty']
            //console.log('value:::',removevalue)
            temp.splice(temp.indexOf(deleteobject),1)
              //console.log('temp:::',temp);
              counter-=1;
          }
        }
        this.setState({buyers_bought_list:temp,
                      total:(updatedtotal-removevalue),
                      counter:counter
                    })
    }
    handleEmailInput=(e)=>{
      this.setState({customers_email:e.target.value});
    }
    handleContactInput=(e)=>{
      this.setState({customers_contact_number:e.target.value});
    }
    handleLogout=()=>{

      //remove token remove data and redirect to login screen
      console.log("token",localStorage.getItem("token"))
      localStorage.removeItem("refresh");
      localStorage.removeItem("token");
      window.location.href="http://localhost:3000/login"
    }


    render() {

    let list=this.state.buyers_bought_list.map(object=>{
        return(
          <tr key={object['bought_product_upc']} >
                 <td>{this.state.buyers_bought_list.indexOf(object)+1}</td>
                 <td>{object['bought_product_name']}</td>
                 <td>{this.state.getdata[object['bought_product_name']]['product_price']}</td>
                 <td>{object['bought_product_qty']}</td>
                 <td>{(this.state.getdata[object['bought_product_name']]['product_price']*object['bought_product_qty']).toFixed(2)}</td>

           </tr>
        )
    })

      return (
    <div>

    <div className="topnav">

        <a className="active" href="/">Home</a>
        <h3 className="storename">name of store</h3>
        <button className="logout" onClick={this.handleLogout.bind(this)}>Logout</button>
    </div>

          <div className='fullseperator'>
            <div className='leftside'>

              <div className="productentry" >

              Product:::
                      <VirtualizedSelect ref="citySelect"
                            className="posvirtualizedinputtext"

                            clearable
                            placeholder="select product"
        					          options={this.state.options}
                            autosize={false}
                            name="product name"
        					          value={this.state.selectedproduct}
        					          onChange={this.handleChange.bind(this)}  />
                <br />
                Quantity:::
                <input type="text" className="posinputtext" placeholder="enter product qty"
                           onChange={this.handleQtychange}  />
                  <br />

              <button className='button' onClick={this.handleAdd.bind(this)}>add to list</button>
              <button className="button" onClick={this.handleSubmit.bind(this)} >submit</button>
              <button className="button" onClick={this.handleRemove.bind(this)} >Remove</button>

            <br /><br />
                      </div>

                      <div id='addbuttons' align='left'>

                        <div className='inputcustomerdetails'>
                          <input className="posinputtext" type='text' placeholder="phone number optional"
                            onChange={this.handleContactInput}/><br />
                          <input className="posinputtext" type='text' placeholder="mail id optional"
                            onChange={this.handleEmailInput}/>
                        </div>
                      </div>
                </div>

      <div className='rightside'>

      <StoreName />

        <div className="billcontainer" >
<div>
            <table border="1" align="center" className='billtable' >
              <thead>
                <tr>
                  <th>S.no.</th>
                  <th>product name</th>
                  <th>product price</th>
                  <th>product qty</th>
                  <th>subtotal</th>
                </tr>
              </thead>

              <tbody>{list}</tbody>
                <tbody>
                    <tr>
                      <td align='center'>$</td>
                      <td colSpan="3" align='center'>Total</td>
                      <td>{this.state.total.toFixed(2)}</td>
                    </tr>
                </tbody>
            </table>
            </div>

        </div>


            <div className="qrcode">
                <QRCode value={this.state.qrcodetext} />
            </div>

          </div>
      </div>

    <div className='endofseperator'></div>
        </div>
              );
            }
}

export default Pos;


//<div className='storename'><StoreName /></div>
