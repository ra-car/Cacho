import React, { Component } from "react";

class Bienvenida extends Component {
  

  render () {
    return  (

      <div className="container-fluid" id="bienve">
        
        <div class="container my-auto">
          <div class="row">
            <div class="col-lg-10 mx-auto">
              <h1 class="text-uppercase text-center text-white">
                <br/>
                <strong>Bienvenido a el juego Cacho</strong>
              </h1>
              <hr/>
            </div>
            <div class="col-lg-8 mx-auto">
              <p class="text-faded mb-5 text-white">Cacho es un juego de dos o más jugadores. Cada jugador tiene un "cacho" (vaso opaco) y cinco dados. En cada turno, los jugadores agitan los dados en el vaso y los voltea sobre la mesa, ocultándolos con el mismo a los demás. El objetivo del juego es especular sobre la cantidad de repeticiones de una determinada cara superior de los dados, sabiendo solamente el resultado de los propios</p>
              <a class="btn btn-primary center-block" href="#about">Enterate mas</a>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default Bienvenida;