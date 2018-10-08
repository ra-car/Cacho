import {Mongo} from "meteor/mongo";
import {Meteor} from "meteor/meteor";

export const Partidas = new Mongo.Collection("partidas");  //nombre que va a tener la coleccion en la BD

if(Meteor.isServer){
  Meteor.publish("partidas", () =>{
    return Partidas.find({});
  });
}

Meteor.methods(
  {
    "partida.add"(name){

     const creador = Meteor.user().username;


      if(!creador){
        throw new Meteor.Error("Not autorized");
      }

      Partidas.upsert({creador},{
        name,
        creador,
        apuesta:"",
        usuarios:[],
        dadosMesa:[],
        iniciada:false,
        finalizada:false

      });

 
    },

    "partida.del"(name){

     const creador = Meteor.user().username;


      if(!creador){
        throw new Meteor.Error("Not autorized");
      }

      const part = Partidas.findOne({creador});

      Partidas.remove(part);

 
    },

    "usuarios.agregar"(name){

      const creador = Meteor.user().username;

       if(!creador){
        throw new Meteor.Error("Not autorized");
      }

      const part = Partidas.findOne({name});

      const a = part.usuarios;
      a.push(creador);


      Partidas.update({_id: part._id},{
        $set:{
          usuarios: a
        }
      });
    }


  }
);