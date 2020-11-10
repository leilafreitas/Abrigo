import * as express from 'express';
import './connection';
import * as path from 'path';
import * as cors from 'cors';
import 'express-async-errors';
import router from './routes';
//import handle from './handle/errorHandle';

//TESTAR A API COM RESTESTTEST
const server=express();
//PERMITE QUE A API SEJA ACESSADA POR DIVERSOS DOMINIOS(CORS)
//server.use (cors());
server.use(express.json());
//server.use(router);
//Para acessar as images na url
server.use('/uploads',express.static(path.join(__dirname,'..','uploads')))
//server.use(handle);
server.listen(3333);
