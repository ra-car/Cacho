import React, {Component} from "react";
import PropTypes from "prop-types";
import {Meteor} from "meteor/meteor";
import {withTracker} from "meteor/react-meteor-data";
import {Usuarios} from "../api/usuarios.js"; 
import AccountsUIWrapper from "./AccountsUIWrapper.js";

class App extends Component {
  render() {
    return (
      <div>        
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
        <ul>
          {this.props.usuarios.map( (u,i) =>
            <li key={i}>{u.name}</li>
          )}
        </ul>        
      </div>
      );
  }
}

App.propTypes ={
 usuarios: PropTypes.array.isRequired,
 usuario: PropTypes.object
};

export default withTracker(() =>{
  return{
    usuarios: Usuarios.find({}).fetch(),
    usuario: Meteor.user()
  };
}
)(App);
