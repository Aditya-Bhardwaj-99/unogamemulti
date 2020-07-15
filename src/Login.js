import React, { Component } from 'react';
import Appbar from './Appbar';
import { TextField } from '@material-ui/core';
import Signup from './Signup';
import Game from './Game';
import './Login.css'

const url=`https://uno-react-server.herokuapp.com`;
const dev=`http://localhost:3001`;

export default class Login extends Component {
    constructor() {
        super();
        this.state = {
            auth: false,
            user:'',
            gamex:0
        }
    }

    handleSubmit = () => {
        var form = document.getElementsByClassName('logForm')[0];
        fetch(url+`/login`, {
            method: 'POST',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user:form.elements.username.value,
                pass:form.elements.password.value
            })
          }).then(res=>res.json()).then(res=>{
              this.setState({user:form.elements.username.value,gamex:1});
              if(res.auth===true){
                document.getElementsByClassName('login')[0].style.display='none';
                document.getElementsByClassName('signup')[0].style.display='none';
              }
          });
        //   if(form.elements.username.value){
        //     document.getElementsByClassName('login')[0].style.display='none';
        //     document.getElementsByClassName('signup')[0].style.display='none';
        //     document.getElementsByClassName('game')[0].style.display='inline';
        //   }
    }

    handleSign=()=>{
        document.getElementsByClassName('login')[0].style.display='none';
        document.getElementsByClassName('signup')[0].style.display='inline';
    }

    handleSubmitdone=()=>{
        document.getElementsByClassName('login')[0].style.display='inline';
        document.getElementsByClassName('signup')[0].style.display='none';
    }
    handleLogout=()=>{
        this.setState({gamex:0})
        document.getElementsByClassName('login')[0].style.display='inline';
        document.getElementsByClassName('signup')[0].style.display='none';
    }


    render() {
        return (
            <div>
                <div className='login'>
                    <Appbar />
                    <div className='paperBack'>
                        <form className='logForm'>
                            <center>
                                <TextField
                                    id="standard-name"
                                    label="Username"
                                    className="username"
                                    name='username'
                                    margin="normal"
                                    
                                />
                                <br></br><br></br>
                                <TextField
                                    id="standard-password-input"
                                    label="Password"
                                    className='password'
                                    name='password'
                                    type="password"
                                    autoComplete="current-password"
                                    margin="normal"
                                />
                                <br></br><br></br>
                                <button className='loginbtn' name='loginbtn' type='button' onClick={this.handleSubmit}>
                                    Login
                                </button><br></br>
                                <button className='loginbtn' name='signupbtn' type='button' onClick={this.handleSign}>
                                    Signup
                                </button>
                            </center>
                        </form>
                    </div>
                </div>
                <div className='signup' ><Signup handle={this.handleSubmitdone}/></div>
                {this.state.gamex?<Game logout={this.handleLogout} user={this.state.user}/>:null}
            </div >
        )
    }
}