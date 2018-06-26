import React, { Component } from 'react';
import './css/Login.css';


class Login extends Component {
  constructor(){
    super();
    this.state={
        username:"",
        password:"",
        token:""
    }
  }

  handleLogin=()=>{
    console.log('handleLogin')
    //trying post with handleSubmit
    fetch('http://127.0.0.1:8000/mart/api/token/',{
    body: JSON.stringify({
            "username": this.state.username,
            "password": this.state.password
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
    console.log('response:::::',response)
    console.log(response.status)
    if(response.status===200){
    return(response.json()); }
    else{
      //redirect to login page
      console.log('redirecting')
      window.location.href="http://localhost:3000/login"
    }
    }).then(res=>{
      console.log('res:::::::',res)
      //console.log('res["token"]:::',res.token)

      //saving token in local storage
      localStorage.setItem("token",res.access)
      localStorage.setItem("refresh",res.refresh)
      localStorage.setItem("username",this.state.username)
   let gottime=Date.now()/1000 //seconds from epoch
   localStorage.setItem("validfrom",gottime)

      this.setState({
                      username:"",
                    password:""
                  })
      //redirect to pos page
      window.location.href="http://localhost:3000/pos"


 })
}

  handleusername=(e)=>{
    //console.log('e:::',e.target.value)
    this.setState({username:e.target.value});
  }
  handlepassword=(e)=>{
    //console.log('Pass:::::',e.target.value)
    this.setState({password:e.target.value})
  }
  render() {
    return (
      <div>

      <div className="loginform" align="center">
      <input type="text" className="inputtext" placeholder="Username" onChange={this.handleusername.bind(this)} /><br />
  
      <input type="password" className="inputtext" placeholder="enter Password" onChange={this.handlepassword.bind(this)} /><br />
      <button className="button" onClick={this.handleLogin.bind(this)}>Login</button>
      </div>

      </div>
    );
  }
}

export default Login;
