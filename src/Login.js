import React, { Component } from 'react';
import Appbar from './Appbar';
import { TextField } from '@material-ui/core';
import Signup from './Signup';
import Game from './Game';
import './Login.css'

export default class Login extends Component {
    constructor() {
        super();
        this.state = {
            auth: false
        }
    }

    handleSubmit = () => {
        var form = document.getElementsByClassName('logForm')[0];
        //make fetch request update server
        if(form.elements.username.value === 'aditya' && form.elements.password.value === 'abc'){
            document.getElementsByClassName('login')[0].style.display='none';
            document.getElementsByClassName('signup')[0].style.display='none';
            document.getElementsByClassName('game')[0].style.display='inline';
        }
    }

    handleSign=()=>{
        document.getElementsByClassName('login')[0].style.display='none';
        document.getElementsByClassName('signup')[0].style.display='inline';
        document.getElementsByClassName('game')[0].style.display='none';
    }

    handleSubmitdone=()=>{
        document.getElementsByClassName('login')[0].style.display='inline';
        document.getElementsByClassName('signup')[0].style.display='none';
        document.getElementsByClassName('game')[0].style.display='none';
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
                <div className='game'><Game logout={this.handleSubmitdone}/></div>
            </div >
        )
    }
}