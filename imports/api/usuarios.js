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

      var num = Math.floor(Math.random() * 6) + 0;
      var num1 = Math.floor(Math.random() * 6) + 0;
      var num2 = Math.floor(Math.random() * 6) + 0;
      var num3 = Math.floor(Math.random() * 6) + 0;
      var num4 = Math.floor(Math.random() * 6) + 0;

      Usuarios.upsert(
      {name},
      {
        name,
        puntaje:0,
        dados:[num,num1,num2,num3,num4]
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

      var num = Math.floor(Math.random() * 6) + 0;
      var num1 = Math.floor(Math.random() * 6) + 0;
      var num2 = Math.floor(Math.random() * 6) + 0;
      var num3 = Math.floor(Math.random() * 6) + 0;
      var num4 = Math.floor(Math.random() * 6) + 0;
      Usuarios.upsert(
      {name},
      {
        name,
        puntaje:0,
        dados:[num,num1,num2,num3,num4]
      });

      //asi le retorno el objeto al cliente
    const player = Usuarios.findOne({name});

    return player;
    },

    "player2.dar"(namae){
      const name = Meteor.user().username;
      if(!name){
          throw new Meteor.Error("Not autorized");
        }

      const player = Usuarios.findOne({namae});

      return player;
    },
    "dados.dar"(namae){

      console.log("ël nombre que llega es "+namae)
     let a= "rafa";
     let dados= [];
     const name = Meteor.user().username;
     const player = Usuarios.findOne({name});
     dados = player.dados;
     console.log("los dados en server son " + dados);
    return Object.values(dados);
    }

  }



);