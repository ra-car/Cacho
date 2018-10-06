import {Mongo} from "meteor/mongo";
import {Meteor} from "meteor/meteor";
export const Partidas = new Mongo.Collection("partidas");  //nombre que va a tener la coleccion en la BD

if(Meteor.isServer){
  Meteor.publish("partidas", () =>{
    return Partidas.find({});
  });
}