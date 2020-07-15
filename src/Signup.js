import React, { Component } from 'react';
import Appbar from './Appbar';
import { TextField } from '@material-ui/core';

const url=`https://uno-react-server.herokuapp.com/`;
const dev=`http://localhost:3001`;

export default class Signup extends Component {
    constructor() {
        super();
        this.state = {}
    }

    handleSubmit=async ()=>{
        var form = document.getElementsByClassName('signForm')[0];
        if(form.elements.password.value===form.elements.cpassword.value){
            fetch(url+`/signup`, {
            method: 'POST',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name:form.elements.name.value,
                user:form.elements.username.value,
                pass:form.elements.password.value,
                mail:form.elements.email.value
            })
          }).then(res=>{this.props.handle();});
        }
    }

    handleLog=()=>{
        this.props.handle();
    }

    render() {
        return (
            <div>
                <Appbar />
                <div className='paperBack'>
                    <form className='signForm'>
                        <center>
                        <TextField
                                id="standard-name"
                                label="Name"
                                className="name"
                                name='name'
                                margin="normal"
                            />
                            <br></br>
                            <TextField
                                id="standard-name"
                                label="Email"
                                className="email"
                                name='email'
                                margin="normal"
                            />
                            <br></br>
                            <TextField
                                id="standard-name"
                                label="Username"
                                className="username"
                                name='username'
                                margin="normal"
                            />
                            <br></br>
                            <TextField
                                id="standard-password-input"
                                label="Password"
                                className='password'
                                name='password'
                                type="password"
                                autoComplete="current-password"
                                margin="normal"
                            />
                            <br></br>
                            <TextField
                                id="standard-password-input"
                                label="Confirm Password"
                                className='cpassword'
                                name='cpassword'
                                type="password"
                                autoComplete="current-password"
                                margin="normal"
                            />
                            <br></br>
                            <button className='loginbtn' name='loginbtn' type='button' onClick={this.handleSubmit}>
                                Signup
                                </button>
                            <button className='loginbtn' name='signupbtn' type='button' onClick={this.handleLog}>
                                Login
                                </button>
                        </center>
                    </form>
                </div>
            </div>
        )
    }
}