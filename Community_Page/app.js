// app.js - 서버 메인 파일
// [LOAD PACKAGES]
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose'
const app = express();
 
// [CONFIGURE APP TO USE bodyParser]
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
 
// [CONFIGURE SERVER PORT]
var port = 8080;
 
// [CONFIGURE ROUTER]
import api from './routes'
app.use('/api', api);
 
// [RUN SERVER]
app.listen(port, () => {
  console.log("Express server has started on port " + port)
});