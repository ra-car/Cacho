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
      player:{dados:[]}
     }

    this.darUsuario = this.darUsuario.bind(this);
    this.playeradd = this.playeradd.bind(this);
    this.acualizarApuesta = this.acualizarApuesta.bind(this);
  }

   playeradd()
   {
     Meteor.call("players.add");
  }
 
  acualizarApuesta(){
    const cant = document.getElementById("cantidad").value;
    const deno = document.getElementById("denomi").value;

    Meteor.call("apuesta.up",this.props.nombreP, cant, deno);
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
    this.playeradd();
  }

  darUsuario(){

    Meteor.call("player.dar", (err,p)=>{
      if(err){alert(err); return;}
      this.setState({
        player: p
      })
    });
  }
  darUsuario2(name){
    const a=null;
    Meteor.call("player2.dar",name, (err,p)=>{
      if(err){alert(err); return;}
      a=p
    });
    return a;
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
                <div>
                 { this.state.player.dados.map((p,i) => 
                     <img key={i} src={"/images/dado" +(p+1)+".png"} border="1" alt="dado" width="60" height="60"/>
                  )}
                </div>
                
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
              {/*Aca van las opciones*/}
                <div className="row">
                 <div className="col">
                   <br/>
                   <button class="btn btn-outline-secondary btn-block" type="button">Dudar</button>
                   <br/>
                   <button class="btn btn-outline-secondary btn-block" type="button">Plantar</button>
                 </div>
                 <div className="col">
                    <label >¡Has una apuesta!</label>
                    <div class="input-group mb-3">
                      <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon3">Cantidad:</span>
                      </div>
                      <input type="text" class="form-control" id="cantidad" aria-describedby="basic-addon3"/>
                    </div>  
                    <div class="input-group mb-3">
                      <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon3">Denominación:</span>
                      </div>
                      <input type="text" class="form-control" id="denomi" aria-describedby="basic-addon3"/>
                    </div>  
                     <button class="btn btn-outline-secondary" type="button" onClick={this.acualizarApuesta}>Apostar!</button>
                 </div>
                </div>
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