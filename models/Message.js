import mongoose from "mongoose";
const Schema = mongoose.Schema;
const messagedata= new Schema({
  Sequence:Number,
  UserID:Number,
  Timestamp:String,
  MessageBody:String,
});
const Messagedata = mongoose.model("messagedata",messagedata );
export default Messagedata;