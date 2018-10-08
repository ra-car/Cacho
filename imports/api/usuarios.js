import {Mongo} from "meteor/mongo";
import {Meteor} from "meteor/meteor";

export const Usuarios = new Mongo.Collection("usuarios");  //nombre que va a tener la coleccion en la BD

if(Meteor.isServer){
  Meteor.publish("usuarios", () =>{
    return Usuarios.find({});
  });
}

Meteor.methods(
  {
    "players.add"(){
      const name = Meteor.user().username;

      if(!name){
        throw new Meteor.Error("Not autorized");
      }

      Usuarios.upsert(
      {name},
      {
        name,
        puntaje:0,
        dados:5
      });

      //asi le retorno el objeto al cliente
    const player = Usuarios.findOne({name});

    return player;
    },

    "player.dar"(){
      const name = Meteor.user().username;
      if(!name){
          throw new Meteor.Error("Not autorized");
        }

      const player = Usuarios.findOne({name});

      return player;
    },

    "players.reset"(){
      const name = Meteor.user().username;

      if(!name){
        throw new Meteor.Error("Not autorized");
      }

      Usuarios.upsert(
      {name},
      {
        name,
        puntaje:0,
        dados:0
      });

      //asi le retorno el objeto al cliente
    const player = Usuarios.findOne({name});

    return player;
    }

  }

);