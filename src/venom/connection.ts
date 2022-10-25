const fs = require('fs');
const venom = require('venom-bot');
import { Buffer } from 'buffer';
import { start } from "./bot";

interface Response {
    type: string;
    data: any; // 👈️ mark as optional so you can add later
}

export const connect = async () => {
    venom
    .create(
      'sessionName',
      (base64Qr: any, asciiQR: any, attempts: any, urlCode: any) => {
        console.log(asciiQR); // Optional to log the QR in the terminal
        var matches = base64Qr.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
  
        if (matches.length !== 3) {
          return new Error('Invalid input string');
        }
  
        const response: Response = {
          type: matches[1],
          data: Buffer.from(matches[2], 'base64')
        };
  
        var imageBuffer = response;
        require('fs').writeFile(
          'QRVenom.png',
          imageBuffer['data'],
          'binary',
          function (err: any) {
            if (err != null) {
              console.log(err);
            }
          }
        );
      },
      undefined,
      { logQR: false }
    )
    .then((client: any) => {
        start(client);
    })
    .catch((erro: any) => {
      console.log(erro);
    });
}

