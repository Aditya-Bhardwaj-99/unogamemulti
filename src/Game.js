import React ,{ Component } from 'react';
import Appbar from './Appbar';

export default class Game extends Component{
    constructor(){
        super();
        this.state={}
    }

    render(){
        return (
            <div>
                <Appbar auth='true' logout={this.props.logout}/>
            </div>
        )
    }
}