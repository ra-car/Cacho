import React, { Component } from "react";
import PropTypes from "prop-types";
import {Meteor} from "meteor/meteor";
import {withTracker} from "meteor/react-meteor-data";
import {Partidas} from "../api/partidas.js"
import Partida from './Partida';

class Lobby extends Component {
  constructor (props) {
    super(props)

    this.state = {
      partidas: [],
      entrarPartida: false,
      nombreP:"",
      partida:null
    }
     this.entraraPartida = this.entraraPartida.bind(this);
     this.onClick = this.onClick.bind(this);
  }

  addPartida(){
    const name = document.getElementById("nombrePartida").value;
    console.log("nombre partida" + name)
    Meteor.call("partida.add",name);
  }

  entraraPartida(namae){

    this.setState({ entrarPartida: true});
    this.setState({nombreP: namae});
    Meteor.call("usuarios.agregar",namae);

   
  }
  onClick(a)
  {
    this.entraraPartida(a);

  }
  

  eliminarPartida(){
    Meteor.call("partida.del");
  }

  render () {
    return  (
      <div>
      {!this.state.entrarPartida ? <div className="container-fluid" id="lobby">
        <br/>
        <br/>
    // Te falto declarar el jugador en la validación de PropTypes
        <h2> Bienvenid@ {this.props.player} </h2>
        <br/>
        <br/>
        <div className="row">
          <div className="col">
            <h2>Partidas</h2>
            <hr/>
          </div>
          <div className="col">
            <h2>Top 10</h2>
            <hr/>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <br/>
            <p>Selecciona la partida a la que quieras ingresar</p>
            <br/>
            <div className="list-group">
            { this.props.partidas.map((p,i) => 
              <a key={i} href="#" class="list-group-item list-group-item-action" onClick={ () => this.onClick(p.name)}>{p.name} de {p.creador}</a>
            )}
            </div>
          </div>
          <div className="col">
            <ol>
            // Te falto declarar los jugadores en la validación de PropTypes
             { this.props.jugadores.map((p,i) => 
              <li key={i} href="#">{p.name}</li>
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
              <div class="input-group-prepend">
                <button class="btn btn-outline-secondary" type="button" onClick ={this.addPartida.bind(this)}>Crear</button>
              </div>
              <input type="text" id="nombrePartida" class="form-control" placeholder="" aria-label="" aria-describedby="basic-addon1"/>
              <button class="btn btn-outline-secondary" type="button" onClick ={this.eliminarPartida.bind(this)}>Eliminar Partida</button>
            </div>
          </div>
          <div className="col">
          </div>
        </div>

      </div> :
        <Partida jugadores={this.props.jugadores} nombreP={this.state.nombreP} partidas={this.props.partidas}/>
      }
      </div>
    );
  }
}

// A continuación, te pongo los PropTypes faltantes

Lobby.propTypes ={
 partidas: PropTypes.array.isRequired,
 jugadores: PropTypes.array,
 player: PropTypes.string
};

export default withTracker(() =>{

  Meteor.subscribe("partidas");
  return{
    partidas: Partidas.find({}).fetch()
  };
}
)(Lobby);
