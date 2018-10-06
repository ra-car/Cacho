import React, { Component } from "react";

class Lobby extends Component {
  constructor (props) {
    super(props)

    this.state = {
      partidas: [],
      jugadores: []
    }
    
  }


  render () {
    return  (
      <div className="container-fluid" id="lobby">
        <div className="row">
          <div className="col">
            <h2>Partidas</h2>
          </div>
          <div className="col">
            <h2>Top 10</h2>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="list-group">
              <a href="#" class="list-group-item list-group-item-action">Dapibus ac facilisis in</a>
              <a href="#" class="list-group-item list-group-item-action">Dapibus ac facilisis in</a>
              <a href="#" class="list-group-item list-group-item-action">Dapibus ac facilisis in</a>
              <a href="#" class="list-group-item list-group-item-action">Dapibus ac facilisis in</a>
            </div>
          </div>
          <div className="col">

          </div>
        </div>

        <div>
          <ul>
            {this.props.jugadores.map( (u,i) =>
              <li key={i}>{u.name}</li>
            )}
          </ul> 
        </div> 

      </div>
    );
  }
}

export default Lobby;