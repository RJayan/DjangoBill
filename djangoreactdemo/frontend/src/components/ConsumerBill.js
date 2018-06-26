import React, { Component } from 'react';
import QRCode from 'qrcode-react';
import './css/ConsumerBill.css'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
//import Input from './components/Input';


class ConsumerBill extends Component{
  constructor(props){
    super(props);
    this.state={
        getdata:[],
        total:0,
        qrcodetext:'Processing... please wait a minute',
        error:'',
        boughtdateandtimedetails:'',
        
      };

      this.printDocument=this.printDocument.bind(this);
  }

  componentDidMount=()=> {
      //console.log('componentDidMount')
      //console.log('here::: ',window.location.href)
      //let url=window.location.href;
      //http://localhost:3000/boughtdata/L6qPFJftGClMbj853wqjR1ESlBzLkeV8ejDChZXJE97gGM
      //let string=url.substr(33,)
      //console.log(string)

      //got it from Locations regex
      //console.log('prps::::::::::',this.props)
      let string=this.props.unique_identifier_string;
      //console.log('string:::::',string)
      fetch('http://127.0.0.1:8000/mart/boughtdata/'+string).then(function(response){
        //console.log('d:::::::',response.status)
        //redirecting according to response status
        if(response.status===200){
        return('response:: ',response.json());}
        else{
          //redirect to NotFound page
          window.location.href='http://localhost:3000/doesnotexist'
        }
      }).then(myJson=>{
        console.log('myJson::',myJson)
        //console.log('ewhiooooou:::',typeof(myJson.buyers_bought_list))
        let temp=[];
        let add=0;
        //time formatting
        for (let value of myJson.buyers_bought_list){
          //console.log('eeeeeeee:::::',value)
        temp.push(value)
        add+=value['bought_product_price']*value['bought_product_qty']
      }
      this.setState({getdata:temp,
                total:add,
                boughtdateandtimedetails:myJson.date_and_time_of_purchase,
                qrcodetext:myJson.unique_identifier_string//+'http://localhost:3000/boughtdata/'
                })
  console.log('no problem so far')

})
    }

    printDocument() {
      const input = document.getElementById('Bill');
      //const qrcodeinput = document.getElementById('qrcodeid');

      html2canvas(input)
        .then((canvas) => {
          //const qrcodeimgData = qrcodecanvas.toDataURL('image/png');

          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF();
          pdf.addImage(imgData, 'JPEG', 0, 0);
          //pdf.output('dataurlnewwindow');
          pdf.save("mart_name bill.pdf"); //set it to mart name later
        })
      ;
    }

    render() {


      let list=this.state.getdata.map(object=>{
          return(
            <tr key={object['bought_product_name']} height='30px' className='rowofbilltable'>
                   <td>{this.state.getdata.indexOf(object)+1}</td>
                   <td>{object['bought_product_name']}</td>
                   <td>{object['bought_product_price']}</td>
                   <td>{object['bought_product_qty']}</td>
                   <td>{(object['bought_product_price']*object['bought_product_qty']).toFixed(3)}</td>
             </tr>
          )
      })

      return (
      <div>
        <div className="complete">


<div id="Bill" width="100%">


    <div className="topbillnav">
        <h3 className="store">name of store</h3>
    </div>

    <div className='adcontainer1' align="center">
     <a href="https://store.tutorialspoint.com/" rel="noopener noreferrer" target="_blank">
      <img alt="E-Books Store ad" src={require("./css/images/buy_ebooks_online.jpg")} />
     </a>
    </div>

    <div align='center' className='storenamedetailsconsumerpage'>
    <br />
      address::  kunnil heights, bypass road near infosys kazhakoottam, trivandrum -695583 <br />
       phone:7856876756567,5765769876554<br />
       <strong>email: marginfree@mail.com</strong>
       <pre>Invoice: invoicenumber         Date: 24/03/2018</pre>
     </div>

    <div className='datetime'>
      bought date-
        {this.state.boughtdateandtimedetails}
              </div>


  <div className="container" >

            <table border="1" align='center' className='tableofbill'>
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


            <div align='center' className='qr'>
                <QRCode value={this.state.qrcodetext} size="64" />
            </div>

            <div className='adcontainer' align="center">
             <a href="https://store.tutorialspoint.com/" rel="noopener noreferrer" target="_blank">
              <img alt="E-Books Store ad" src={require("./css/images/buy_ebooks_online.jpg")} />
             </a>
            </div>


        </div>



        <div className="buttoncontainer" align='center'>
          <button onClick={this.printDocument} className="buttondownload">Download bill</button>
        </div>

      </div>
  </div>
              );
            }
}

export default ConsumerBill;
