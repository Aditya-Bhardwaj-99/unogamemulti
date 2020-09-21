import React, { Component } from 'react';
import Appbar from './Appbar';
import './Game.css'
import { Card } from '@material-ui/core'
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import Gamearea from './Gamearea';

const style = (theme) => ({
    root: {
      background: 'rgba(255, 255, 255, 0.4)',
      '-webkit-box-shadow' : '5px 5px 15px rgba(0,0,0,0.5)',
      width:'1268.35px',
      height:'540px'
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      color: 'black'
    },
  });

class Game extends Component {
    render() {
        const {classes}=this.props
        return (
            <div>
                <Appbar auth='true' logout={this.props.logout} user={this.props.user}/>
                <Card className='gameSpace' classes={{root:classes.root}} >
                    <Gamearea user={this.props.user} room={this.props.room}></Gamearea>
                </Card>
            </div>
        )
    }
}
Game.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  export default withStyles(style)(Game);