import React, {Component} from 'react';
import { TweenLite,TimelineLite } from 'gsap'
/* get number in props */

export default class Opo extends Component{
    render(){
        return(
            <div>
                {Array(this.props.cardnum).fill().map(i => {
              return (
                <img src={require("./cards/back-.png")} className='op3cards' ref={this.props.name+i} alt='back'
                style={
                    i === 0
                      ? { zIndex: `${i}`, marginLeft: "0 !important",background:'black',height:'75px',width:'50px' }
                      : { zIndex: `${i}`, marginLeft: "-45px",background:'black',height:'75px',width:'50px' }
                  }
                ></img>
              );
          })}
            </div>
        )
    }
}