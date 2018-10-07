import React, {Component} from "react";
import PropTypes from "prop-types";
import {Meteor} from "meteor/meteor";
import {withTracker} from "meteor/react-meteor-data";
import {Usuarios} from "../api/usuarios.js"; 
import {Partidas} from "../api/partidas.js"
import AccountsUIWrapper from "./AccountsUIWrapper.js";
import Lobby from './Lobby';
import Bienvenida from './Bienvenida';
class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      player: null
    };

    this.addPlayer = this.addPlayer.bind(this);
  }

  addPlayer(e){
    e.preventDefault();
    Meteor.call("players.add", name , (err,player)=>{
      if(err){alert(err); return;}
      this.setState({player})
    });
  }


  render() {
    return (
     <div> 
        <div>
          {/*navbar de la pagina*/}        
          <nav className ="navbar navbar-expand-lg navbar-dark bg-dark">
           <a className ="navbar-brand" href="#">
            <img src="/images/dice.png" width="30" height="30" alt="dados"/>
            Cacho
           </a>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                  <a className="nav-item nav-link" href="#"><AccountsUIWrapper/></a>
                </div>
            </div>
          </nav>
        {/*Si un usuario ya inicio sesion se le muestra el lobby, de lo contrario se le mostrara la pagina de bienvenida*/}
          {
            Meteor.user() ?
            <Lobby jugadores={this.props.usuarios} player= {Meteor.user().username}/> : 
            <Bienvenida/>
          }

        </div>
        <div class="footer-copyright text-center py-3">© 2018 Copyright:
          <a href="https://mdbootstrap.com/bootstrap-tutorial/"> MDBootstrap.com</a>
        </div>
      </div>
      );
  }
}

App.propTypes ={
 usuarios: PropTypes.array.isRequired,
 usuario: PropTypes.object
};

export default withTracker(() =>{

  Meteor.subscribe("usuarios");
  return{
    usuarios: Usuarios.find({}).fetch(),
    usuario: Meteor.user()
  };
}
)(App);
