/* eslint-disable react/no-direct-mutation-state */
/*
    logout?
*/
import React, { Component } from "react";
import "./Game.css";
import { PacmanLoader } from "react-spinners";
import Opo from "./Opo";
import { TimelineLite, gsap,CSSPlugin } from "gsap";
// import Websocket from 'ws';
gsap.registerPlugin(CSSPlugin);
const url="wss://uno-react-server.herokuapp.com/websocket";
const dev='wss://localhost:3001/websocket';

const ws = new WebSocket(url);

const gamearea = {
  display: "grid",
  "grid-template-columns": "auto",
  height: "auto",
  width: "auto",
};
const mid = {
  display: "grid",
  "grid-template-columns": "auto 33% auto",
};
const player = {
  position: "relative",
  width: "50%",
  height: "auto",
  "margin-left": "25%",
  "margin-right": "25%",
  justifyContent: "center",
  alignItems: "center",
};
const playerx = {
  position: "relative",
  width: "auto",
  height: "auto",
  "margin-right": "25%",
  justifyContent: "center",
  alignItems: "center",
  marginLeft: "50%",
};
const stack = {
  width: "50%",
  height: "auto",
  "margin-left": "25%",
  "margin-right": "25%",
};

export default class Gamearea extends Component {
  constructor() {
    super();
    this.state = {
      playercards: [],
      loading: true,
      user: "",
      tablecard: { num: "", color: "back" },
      allusers: [],
      op1: {},
      op2: {},
      op3: {},
      player: {},
    };
    this.timeline = new TimelineLite({ paused: true });
  }

  componentDidMount() {
    this.setState({ user: this.props.user });

    ws.onopen = () => {
      console.log("open");
    };
    ws.onmessage = (data) => {
      console.log(data.data);
      var res = JSON.parse(data.data);
      if (res.action === "startreturn") {
        console.log("startreturn");
        this.state.playercards = res.cards;
        this.state.tablecard = res.tablecard;
        var x = 1;
        for (var d of res.users) {
          if (d !== this.state.user) {
            this.state.allusers.push({ name: d, op: "op" + x });
            this.state["op" + x] = { name: d, num: 7 };
            x++;
          } else {
            this.state.allusers.push({ name: d, op: "player" });
            this.state["player"] = { name: d, num: 7 };
          }
        }
        console.log(this.state.allusers);
        console.log(this.state.opnum);
        this.setState({ loading: false });
        //add border condition on ps
        if (this.state.op1.name === res.turn) {
          document.getElementsByClassName("op1p")[0].style.border =
            "solid green 3px";
          document.getElementsByClassName("op2p")[0].style.border = "none";
          document.getElementsByClassName("op3p")[0].style.border = "none";
          document.getElementsByClassName("playerp")[0].style.border = "none";
        } else if (this.state.op2.name === res.turn) {
          document.getElementsByClassName("op2p")[0].style.border =
            "solid green 3px";
          document.getElementsByClassName("op1p")[0].style.border = "none";
          document.getElementsByClassName("op3p")[0].style.border = "none";
          document.getElementsByClassName("playerp")[0].style.border = "none";
        } else if (this.state.op3.name === res.turn) {
          document.getElementsByClassName("op3p")[0].style.border =
            "solid green 3px";
          document.getElementsByClassName("op1p")[0].style.border = "none";
          document.getElementsByClassName("op2p")[0].style.border = "none";
          document.getElementsByClassName("playerp")[0].style.border = "none";
        } else if (this.state.player.name === res.turn) {
          document.getElementsByClassName("playerp")[0].style.border =
            "solid green 3px";
          document.getElementsByClassName("op1p")[0].style.border = "none";
          document.getElementsByClassName("op3p")[0].style.border = "none";
          document.getElementsByClassName("op2p")[0].style.border = "none";
        }
        if (res.turn === this.state.user) {
          document.getElementsByClassName("player")[0].style.pointerEvents =
            "auto";
        } else {
          document.getElementsByClassName("player")[0].style.pointerEvents =
            "none";
        }
      } else if (res.action === "nextturn") {
        let x = 1;
        for (let d of res.op) {
          if (d.name !== this.state.user) {
            this.state["op" + x] = d;
            x++;
          } else {
            this.state["player"] = d;
          }
        }
        this.setState({ tablecard: res.tablecard });
        //add border conditions on ps
        if (this.state.op1.name === res.turn) {
          document.getElementsByClassName("op1p")[0].style.border =
            "solid green 3px";
          document.getElementsByClassName("op2p")[0].style.border = "none";
          document.getElementsByClassName("op3p")[0].style.border = "none";
          document.getElementsByClassName("playerp")[0].style.border = "none";
        } else if (this.state.op2.name === res.turn) {
          document.getElementsByClassName("op2p")[0].style.border =
            "solid green 3px";
          document.getElementsByClassName("op1p")[0].style.border = "none";
          document.getElementsByClassName("op3p")[0].style.border = "none";
          document.getElementsByClassName("playerp")[0].style.border = "none";
        } else if (this.state.op3.name === res.turn) {
          document.getElementsByClassName("op3p")[0].style.border =
            "solid green 3px";
          document.getElementsByClassName("op1p")[0].style.border = "none";
          document.getElementsByClassName("op2p")[0].style.border = "none";
          document.getElementsByClassName("playerp")[0].style.border = "none";
        } else if (this.state.player.name === res.turn) {
          document.getElementsByClassName("playerp")[0].style.border =
            "solid green 3px";
          document.getElementsByClassName("op1p")[0].style.border = "none";
          document.getElementsByClassName("op3p")[0].style.border = "none";
          document.getElementsByClassName("op2p")[0].style.border = "none";
        }
        this.nextturn(res.turn, res.addcards);
      } else if (res.action === "win") {
        this.win(res.user);
      } else if (res.action === "retry") {
        ws.send(JSON.stringify({ action: "start", user: this.state.user }));
      } else if (res.action === "drawrep") {
        var e = { target: document.getElementsByClassName("tablecard")[0] };
        var dest = document.getElementsByClassName("player")[0].lastChild;
        var temp = document.createElement("img");

        let x = 1;
        for (let d of res.op) {
          if (d.name !== this.state.user) {
            this.state["op" + x] = d;
            x++;
          } else {
            this.state["player"] = d;
          }
        }
        this.setState();
        if (res.user === this.state.user) {
          temp.src = require("./cards/back-.png");
          temp.style.height = e.target.style.height;
          temp.style.width = e.target.style.width;
          document.getElementsByClassName("stack")[0].appendChild(temp);
          temp.style.position = "absolute";
          temp.className = "tempplayer";
          temp.style.opacity = 0;
          ws.send(
            JSON.stringify({
              action: "drawanim",
              number: res.addcard.length,
              user: this.state.user,
            })
          );
          this.timeline
            .to(temp, 0.01, {css:{
              x:
                e.target.getBoundingClientRect().x -
                temp.getBoundingClientRect().x +
                50,
              y:
                e.target.getBoundingClientRect().y -
                temp.getBoundingClientRect().y,
            }})
            .to(temp, 0.25, {css:{ opacity: 1 }})
            .to(temp, 0.25, {css:{
              rotateY: 90,
              },onComplete: () => {
                console.log(res.addcard[0].color + "-" + res.addcard[0].num);
                temp.src = require("./cards/" +
                  res.addcard[0].color +
                  "-" +
                  res.addcard[0].num +
                  ".png");
              }
            })
            .to(temp, 0.25, {css:{ rotateY: 0 }})
            .to(temp, 0.5, {css:{
              x:
                dest.getBoundingClientRect().x -
                temp.getBoundingClientRect().x +
                50,
              y:
                dest.getBoundingClientRect().y - temp.getBoundingClientRect().y,
              },onComplete: () => {
                document.getElementsByClassName(
                  "player"
                )[0].style.pointerEvents = "auto";
                this.drawCard(res.addcard);
                temp.parentNode.removeChild(temp);
              }
            })
            .play();
        }
      } else if (res.action === "drawanimresp") {
          let rotation;
        if (this.state.user === res.user) {
          return;
        } else if(this.state.op1.name===res.user){
            rotation=180;
        } else if(this.state.op2.name===res.user){
            rotation=90
        } else if(this.state.op3.name===res.user){
            rotation=270
        }
        let dest = document.getElementsByClassName(res.user + "cards")[0];
        let temp = document.createElement("img");
        let e = { target: document.getElementsByClassName("tablecard")[0] };
        temp.src = require("./cards/back-.png");
        temp.style.height = e.target.style.height;
        temp.style.width = e.target.style.width;
        document.getElementsByClassName("stack")[0].appendChild(temp);
        temp.style.position = "absolute";
        temp.className = "tempplayer";
        temp.style.opacity = 0;
        for (let i = 0; i < res.number; i++) {
          this.timeline
            .to(temp, 0.01, {css:{
              x:
                e.target.getBoundingClientRect().x -
                temp.getBoundingClientRect().x,
              y:
                e.target.getBoundingClientRect().y -
                temp.getBoundingClientRect().y,
            }})
            .to(temp, 0.25, {css:{
              opacity: 1,
              
              background: "black",
            }})
            .to(temp, 0.5, {css:{
              x:
                dest.getBoundingClientRect().x -
                temp.getBoundingClientRect().x +
                50,
              y:
                dest.getBoundingClientRect().y - temp.getBoundingClientRect().y,
                rotateZ:rotation,
              },onComplete: () => {
                temp.parentNode.removeChild(temp);
              }
            })
            .play();
        }
      } else if (res.action === "opresp") {
          let rotation;
        if (this.state.user === res.user) {
          return;
        } else if(this.state.op1.name===res.user){
              rotation=180;
          } else if(this.state.op2.name===res.user){
              rotation=90
          } else if(this.state.op3.name===res.user){
              rotation=270
          }
        let temp = document.createElement("img");
        let dest = document.getElementsByClassName("tablecard")[0];
        let target = document.getElementsByClassName(res.user + "cards")[0];
        temp.src = require("./cards/back-.png");
        temp.style.height = dest.style.height;
        temp.style.width = dest.style.width;
        document.body.appendChild(temp);
        temp.className = "tempopplayer";
        temp.style.opacity = 0;
        this.timeline
          .to(temp, 0.1, {css:{
            x:
              target.getBoundingClientRect().x -
              temp.getBoundingClientRect().x,
            y:
              target.getBoundingClientRect().y - temp.getBoundingClientRect().y,rotateZ:rotation
          }})
          .to(temp, 0.1, {css:{ opacity: 1}})
          .to(temp, 0.25, {
            rotateY: 90,
            onComplete: () => {
              temp.src = require("./cards/" +
                res.card.color +
                "-" +
                res.card.num +
                ".png");
            },
          })
          .to(temp, 0.25, {css:{ rotateY: 0}})
          .to(temp, 0.25, {css:{
            x:
              dest.getBoundingClientRect().x -
              temp.getBoundingClientRect().x,
            y: dest.getBoundingClientRect().y - temp.getBoundingClientRect().y,
            rotateZ:0,
            },onComplete: () => {
              temp.parentNode.removeChild(temp);
            }
          })
          .play();
      }
    };
  }

  win = (winn) => {
    alert(winn + " wins");
  };

  handlePlay = async (e) => {
    console.log(e.target);
    var card = e.target.id.split("-");
    var temp = document.createElement("img");
    temp.id = e.target.id;
    temp.src = require("./cards/" + card[0] + "-" + card[1] + ".png");
    temp.style.height = e.target.style.height;
    temp.style.width = e.target.style.width;
    document.getElementsByClassName("player")[0].appendChild(temp);
    temp.style.position = "absolute";
    temp.className = "tempplayer";
    temp.style.opacity = 0;
    this.timeline
      .to(temp, 0.01, {css:{
        x:
          e.target.getBoundingClientRect().x -
          temp.getBoundingClientRect().x +
          50,
        y: e.target.getBoundingClientRect().y - temp.getBoundingClientRect().y,
      }})
      .to(temp, 0.01, {css:{
        opacity: 1,
      },onComplete: () => {
        ws.send(
          JSON.stringify({
            action: "opplayedanim",
            card: { color: card[0], num: card[1] },
            user: this.state.user,
          })
        );
      }});
    if (card[0] === "black") {
      this.putblackcard(card, e);
    } else if (
      card[0] === this.state.tablecard.color ||
      card[1] === this.state.tablecard.num
    ) {
      this.putcard(card, e);
    } else if (this.state.tablecard.color === "black") {
      this.putcard(card, e);
    }
  };

  nextturn = (turn, addcards) => {
    if (turn === this.state.user) {
      document.getElementsByClassName("player")[0].style.pointerEvents = "auto";
      if (
        (this.state.tablecard.num === "+2" ||
          this.state.tablecard.num === "+4") &&
        addcards.length !== 0
      ) {
        this.drawTwoCards(addcards);
        ws.send(JSON.stringify({ action: "d2", user: this.state.user }));
      } else if (
        (this.state.tablecard.num === "+2" ||
          this.state.tablecard.num === "+4") &&
        addcards.length === 0
      ) {
      }
    } else {
      document.getElementsByClassName("player")[0].style.pointerEvents = "none";
    }
  };

  drawTwoCards = (addcards) => {
    for (let data of addcards) {
      let e = { target: document.getElementsByClassName("tablecard")[0] };
    let dest = document.getElementsByClassName("player")[0].lastChild;
    let temp = document.createElement("img");
    temp.src = require("./cards/back-.png");
    temp.style.height = e.target.style.height;
    temp.style.width = e.target.style.width;
    document.getElementsByClassName("stack")[0].appendChild(temp);
    temp.style.position = "absolute";
    temp.className = "tempplayer";
    temp.style.opacity = 0;
      ws.send(
        JSON.stringify({
          action: "drawanim",
          number: addcards.length,
          user: this.state.user,
        })
      );
      this.timeline
        .to(temp, 0.01, {css:{
          x:
            e.target.getBoundingClientRect().x -
            temp.getBoundingClientRect().x +
            50,
          y:
            e.target.getBoundingClientRect().y - temp.getBoundingClientRect().y,
        }})
        .to(temp, 0.25, {css:{ opacity: 1 }})
        .to(temp, 0.25, {css:{
          rotateY: 90,
        },
        onComplete: () => {
          temp.src = require("./cards/" +
            data.color +
            "-" +
            data.num +
            ".png");
        }})
        .to(temp, 0.25, {css:{ rotateY: 0 }})
        .to(temp, 0.5, {css:{
          x:
            dest.getBoundingClientRect().x -
            temp.getBoundingClientRect().x +
            50,
          y: dest.getBoundingClientRect().y - temp.getBoundingClientRect().y,
          
        },onComplete: () => {
          this.state.playercards.push(data);
          temp.parentNode.removeChild(temp);
          this.setState({ playercards: this.state.playercards });
        }})
        .play();
    }
  };
  drawCard = (addcards) => {
    this.state.playercards.push(...addcards);
    console.log(this.state.playercards);
    this.setState({ playercards: this.state.playercards });
  };

  putblackcard = async (card, e) => {
    this.state.playercards.splice(
      this.state.playercards.indexOf(
        this.state.playercards.find(
          (x) => x.num === card[1] && x.color === card[0]
        )
      ),
      1
    );
    this.setState({ playercards: this.state.playercards });
    let temp = document.getElementsByClassName("tempplayer")[0];
    var box = document
      .getElementsByClassName("tablecard")[0]
      .getBoundingClientRect();
    if (card[1] === "W") {
      let userInput = prompt(
        "What color do you want your Wild card to be?",
        "R, Y, G or B?"
      );
      switch (userInput.toUpperCase()) {
        case "R":
          this.timeline
            .to(temp, 0.5, {css:{
              x: box.x - temp.getBoundingClientRect().x + 50,
              y: box.y - temp.getBoundingClientRect().y,
            },
            onComplete: () => {
              ws.send(
                JSON.stringify({
                  action: "wplayed",
                  tablecard: { num: "0", color: "red" },
                  played: this.state.user,
                })
              );
              temp.parentNode.removeChild(temp);
            }})
            .play();
          break;
        case "Y":
          this.timeline
            .to(temp, 0.5, {css:{
              x: box.x - temp.getBoundingClientRect().x + 50,
              y: box.y - temp.getBoundingClientRect().y,
            },
            onComplete: () => {
              ws.send(
                JSON.stringify({
                  action: "wplayed",
                  tablecard: { num: "0", color: "yellow" },
                  played: this.state.user,
                })
              );
              temp.parentNode.removeChild(temp);
            }})
            .play();
          break;
        case "G":
          this.timeline
            .to(temp, 0.5, {css:{
              x: box.x - temp.getBoundingClientRect().x + 50,
              y: box.y - temp.getBoundingClientRect().y,
            },
            onComplete: () => {
              ws.send(
                JSON.stringify({
                  action: "wplayed",
                  tablecard: { num: "0", color: "green" },
                  played: this.state.user,
                })
              );
              temp.parentNode.removeChild(temp);
            }})
            .play();
          break;
        case "B":
          this.timeline
            .to(temp, 0.5, {css:{
              x: box.x - temp.getBoundingClientRect().x + 50,
              y: box.y - temp.getBoundingClientRect().y,
            },
            onComplete: () => {
              ws.send(
                JSON.stringify({
                  action: "wplayed",
                  tablecard: { num: "0", color: "blue" },
                  played: this.state.user,
                })
              );
              temp.parentNode.removeChild(temp);
            }})
            .play();
          break;
        default:
          console.log("nothing");
      }
    } else if (
      this.state.playercards.filter(
        (x) => x.color === card[0] || x.num === card[1]
      ).length === 0
    ) {
      let userInput = prompt(
        "What color do you want your +4 card to be?",
        "R, Y, G or B?"
      );
      switch (userInput.toUpperCase()) {
        case "R":
          this.timeline
            .to(temp, 0.5, {css:{
              x: box.x - temp.getBoundingClientRect().x + 50,
              y: box.y - temp.getBoundingClientRect().y,
            },
            onComplete: () => {
              ws.send(
                JSON.stringify({
                  action: "4played",
                  tablecard: { num: "0", color: "red" },
                  played: this.state.user,
                })
              );
              temp.parentNode.removeChild(temp);
            }})
            .play();
          break;
        case "Y":
          this.timeline
            .to(temp, 0.5, {css:{
              x: box.x - temp.getBoundingClientRect().x + 50,
              y: box.y - temp.getBoundingClientRect().y,
            },
            onComplete: () => {
              ws.send(
                JSON.stringify({
                  action: "4played",
                  tablecard: { num: "0", color: "yellow" },
                  played: this.state.user,
                })
              );
              temp.parentNode.removeChild(temp);
            }})
            .play();
          break;
        case "G":
          this.timeline
            .to(temp, 0.5, {css:{
              x: box.x - temp.getBoundingClientRect().x + 50,
              y: box.y - temp.getBoundingClientRect().y,
            },
            onComplete: () => {
              ws.send(
                JSON.stringify({
                  action: "4played",
                  tablecard: { num: "0", color: "green" },
                  played: this.state.user,
                })
              );
              temp.parentNode.removeChild(temp);
            }})
            .play();
          break;
        case "B":
          this.timeline
            .to(temp, 0.5, {css:{
              x: box.x - temp.getBoundingClientRect().x + 50,
              y: box.y - temp.getBoundingClientRect().y,
            },
            onComplete: () => {
              ws.send(
                JSON.stringify({
                  action: "4played",
                  tablecard: { num: "0", color: "blue" },
                  played: this.state.user,
                })
              );
              temp.parentNode.removeChild(temp);
            }})
            .play();
          break;
        default:
          console.log("nothing");
      }
    }
  };

  putcard = async (card, e) => {
    this.state.playercards.splice(
      this.state.playercards.indexOf(
        this.state.playercards.find(
          (x) => x.num === card[1] && x.color === card[0]
        )
      ),
      1
    );
    this.setState({ playercards: this.state.playercards });
    let temp = document.getElementsByClassName("tempplayer")[0];
    var box = document
      .getElementsByClassName("tablecard")[0]
      .getBoundingClientRect();
    this.timeline
      .to(temp, 0.5, {css:{
        x: box.x - temp.getBoundingClientRect().x + 50,
        y: box.y - temp.getBoundingClientRect().y,
      },
      onComplete: () => {
        if (card[1] === "R") {
          ws.send(
            JSON.stringify({
              action: "rplayed",
              tablecard: { num: card[1], color: card[0] },
              played: this.state.user,
            })
          );
        } else if (card[1] === "S") {
          ws.send(
            JSON.stringify({
              action: "splayed",
              tablecard: { num: card[1], color: card[0] },
              played: this.state.user,
            })
          );
        } else if (card[1] === "+2") {
          ws.send(
            JSON.stringify({
              action: "2played",
              tablecard: { num: card[1], color: card[0] },
              played: this.state.user,
            })
          );
        } else {
          ws.send(
            JSON.stringify({
              action: "played",
              tablecard: { num: card[1], color: card[0] },
              played: this.state.user,
            })
          );
        }
        temp.parentNode.removeChild(temp);
      }})
      .play();
  };

  ready = (e) => {
    ws.send(JSON.stringify({ action: "start", user: this.state.user }));
    e.target.style.display = "none";
  };

  drawCarde = () => {
    ws.send(JSON.stringify({ action: "draw", played: this.state.user }));
  };

  render() {
    return (
      <div className="gamearea" style={gamearea}>
        <button onClick={this.ready}>ready</button>
        <PacmanLoader
          color="yellow"
          css="margin-top:20%;margin-left:45%;"
          loading={this.state.loading}
        ></PacmanLoader>
        <div className="gridItem">
          <div
            className="op1"
            style={{
              transform: "rotateZ(180deg)",
              height: "auto",
              width: "auto",
            }}
          >
            <div
              className="op1p"
              style={{ width: "25%", marginLeft: "40%", textAlign: "center" }}
            >
              {this.state.op1.name ? this.state.op1.name : ""}
            </div>
            <div className="whereop1resides" style={player}>
              {this.state.op1.num ? (
                <Opo
                  cardnum={this.state.op1.num}
                  name={this.state.op1.name}
                ></Opo>
              ) : null}
            </div>
          </div>
        </div>
        <div className="gridItem" id="mid" style={mid}>
          <div
            className="op2"
            style={{
              transform: "rotateZ(90deg)",
              height: "auto",
              width: "auto",
            }}
          >
            <div
              className="op2p"
              style={{ width: "25%", marginLeft: "40%", textAlign: "center" }}
            >
              {this.state.op2.name ? this.state.op2.name : ""}
            </div>
            <div className="whereop2resides" style={playerx}>
              {this.state.op2.num ? (
                <Opo
                  cardnum={this.state.op2.num}
                  name={this.state.op2.name}
                ></Opo>
              ) : null}
            </div>
          </div>
          <div className="stack" style={stack}>
            <div>
              <img
                src={require("./cards/" +
                  this.state.tablecard.color +
                  "-" +
                  this.state.tablecard.num +
                  ".png")}
                className="tablecard"
                style={{ height: "75px", width: "50px" }}
                id={this.state.tablecard.color + "-" + this.state.tablecard.num}
                alt={
                  "cards/" +
                  this.state.tablecard.color +
                  "-" +
                  this.state.tablecard.num +
                  ".png"
                }
              ></img>
              <img
                src={require("./cards/back-.png")}
                alt={"deck"}
                style={{ height: "75px", width: "50px", background: "black" }}
                onClick={this.drawCarde}
              ></img>
            </div>
          </div>
          <div
            className="op3"
            style={{
              transform: "rotateZ(270deg)",
              height: "auto",
              width: "auto",
            }}
          >
            <div
              className="op3p"
              style={{ width: "25%", marginLeft: "40%", textAlign: "center" }}
            >
              {this.state.op3.name ? this.state.op3.name : ""}
            </div>
            <div className="whereop3resides" style={playerx}>
              {this.state.op3.num ? (
                <Opo
                  cardnum={this.state.op3.num}
                  name={this.state.op3.name}
                ></Opo>
              ) : null}
            </div>
          </div>
        </div>
        <div className="gridItem" id="playerplace">
          <div
            className="playerp"
            style={{ width: "25%", marginLeft: "40%", textAlign: "center" }}
          >
            {this.state.user}
          </div>
          <div className="player" style={player}>
            {this.state.playercards.map((data) => {
              return (
                <img
                  src={require("./cards/" +
                    data.color +
                    "-" +
                    data.num +
                    ".png")}
                  style={{ height: "75px", width: "50px" }}
                  id={data.color + "-" + data.num}
                  alt={"cards/" + data.color + "-" + data.num + ".png"}
                  onClick={this.handlePlay}
                ></img>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
