import React, { Component } from "react";
import PropTypes from "prop-types";
import {Meteor} from "meteor/meteor";
import {withTracker} from "meteor/react-meteor-data";
import {Partidas} from "../api/partidas.js"
import {Usuarios} from "../api/usuarios.js";

class Partida extends Component {
  constructor(props) {
    super(props);
    this.state = { 

      partida:{usuarios: [],
      apuesta:"No hay Apuesta"},
      player:null
     }

    this.darUsuario = this.darUsuario.bind(this);
  }

  darPartida(){

    Meteor.call("partida.dar", this.props.nombreP , (err,partidad)=>{
       console.log(partidad);
      if(err){alert(err); return;}

      this.setState({
        partida: partidad
      })
    });

    this.darUsuario();
  }

  darUsuario(){

    Meteor.call("player.dar", (err,p)=>{
      if(err){alert(err); return;}
      this.setState({
        player: p
      })
    });

  }
  render() {
    return(
      <div>
        <div className="container-fluid" id="lobby">
          <br/>
          <button class="btn btn-outline-secondary" type="button" onClick={this.darPartida.bind(this)}>Ready!</button>
          <div class="col-lg-10 mx-auto">
              <h3 class="text-uppercase text-center">
                <br/>
                <strong>Apuesta: {this.state.partida.apuesta} </strong>
              </h3>
              <hr/>
          </div>
          <div className="row">
            <div className="col">
              <h2>Dados</h2>
              <hr/>
            </div>
            <div className="col">
              <h2>Jugadores:</h2>
              <hr/>
            </div>
          </div>
          <div className="row">
            <div className="col">
              {/*Aca ban los dados del jugador*/}
              
            </div>
            <div className="col">
            
              <ol>
               { this.state.partida.usuarios.map((p,i) => 
                <li key={i} href="#">{p}</li>
              )}
              </ol>            
            </div>
          </div>
          <br/>
          <div className="row">
            <div className="col">
              <div class="input-group mb-3">
                <p>Puedes crear una partida si lo deseas, escribe el nombre de la partida y dale a crear</p>
                <br/>
              {/*Aca van las opciones*/}
                
              </div>
            </div>
            <div className="col">
            </div>
          </div>

        </div>
      </div>
      
    );
    }
  }

Partida.propTypes ={
 usuarios: PropTypes.array.isRequired
};

export default withTracker(() =>{
  
  Meteor.subscribe("usuarios");
  return{
    usuarios: Usuarios.find({}).fetch(),
  };

  Meteor.subscribe("partidas");

}
)(Partida);