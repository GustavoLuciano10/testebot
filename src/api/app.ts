import express from "express";
import { router } from "./router";
import swaggerUi = require('swagger-ui-express');
import fs = require('fs');

export class App{
  public server: express.Application = express();

  private swaggerFile: any = ("./src/api/swagger/swagger.json");
  private swaggerData: any = fs.readFileSync(this.swaggerFile, 'utf8');
  private swaggerDocument = JSON.parse(this.swaggerData);

  constructor(){
    this.server;
    this.middleware();
    this.router();
  }

  private middleware(){
    this.server.use(express.static(__dirname + '/public'));

    this.server.use(express.json());

    this.server.get("/QRCode", (req, res) => {
      res.sendFile('QRCode.html', {root: __dirname})
    });

    // swagger docs
    this.server.use('/api/docs', swaggerUi.serve,
    swaggerUi.setup(this.swaggerDocument, null, null, null));
  }

  private router(){
    this.server.use(router);
  }
}