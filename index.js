import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import csv from "csvtojson";
import Messagedata from "./models/Message.js";
const csvFilePath = "Message_data.csv";

const app = express();

app.use(cors());
app.use(express.json());
const CONNECTION_URL = process.env.MONGODB;
const PORT = process.env.PORT || 4000;
mongoose.connect(CONNECTION_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const data = await csv().fromFile(csvFilePath);

app.get("/",(req,res)=>{

  res.send("hit the api");
})
app.get("/getallmessage",(req,res)=>{
  Messagedata.find({
  }).sort({UserID:1 })
    .then((data) => {
      if (data.length == 0) {
        res.json({
          message: "No data found",
          data: [],
        });
      } else {
        res.json({
          message: "data found",
          data: data,
        });
      }
    })
    .catch((error) => {
      console.log("error happened", error);
    });
})
app.get("/getmessage/:id",(req,res)=>{
  
  Messagedata.find({
    UserID: req.params.id,
  })
    .then((data) => {
      if (data.length == 0) {
        res.json({
          message: "No data found",
          data: [],
        });
      } else {
        res.json({
          message: "data found",
          data: data,
        });
      }
    })
    .catch((error) => {
      console.log("error happened", error);
    });
})

app.get("/postdata",(req,res)=>{
  setTimeout(function () {
    for (var i = 0; i < data.length; i++) {
      const messagedata = new Messagedata(data[i]);
      console.log(messagedata);

      messagedata.save((error) => {
        if (error) {
          console.log(error);
        } else {
          console.log("Message data Successfully saved");
        }
      });
    }
  }, 5000);

  res.json({
    message: "Data Updated",
  });

})


app.listen( PORT, function(){
  console.log("welcome to CS APP");
});