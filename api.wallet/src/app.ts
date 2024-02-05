process.env.NODE_ENV = process.env.NODE_ENV //|| 'development';
process.env.APP_ENV = process.env.APP_ENV //|| 'development';

import dotenv = require('dotenv');
dotenv.config({
    path:`${__dirname}/../config/${process.env.APP_ENV}.env`
});
console.log(process.env.APP_FOO);

import express from 'express';

const app:express.Application = express();
app.get('/',(req,resp)=>{
    resp.send("Running");
});

export {app};