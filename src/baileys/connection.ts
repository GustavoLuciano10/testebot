import makeWASocket, { DisconnectReason, useSingleFileAuthState } from "@adiwajshing/baileys";
import { Boom } from "@hapi/boom";
import fs = require('fs');
import qr from 'qrcode'

export const connect = async () => {

    var dir = './src/baileys/cache';
    var dirPublic = './src/api/public';
    var dirImage = './src/api/public/images';

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }

    if (!fs.existsSync(dirPublic)) {
        fs.mkdirSync(dirPublic);
    }

    if (!fs.existsSync(dirImage)) {
        fs.mkdirSync(dirImage);
    }

    const { state, saveState } = useSingleFileAuthState(
        './src/baileys/cache/auth_info_multi.json'
    );

    const socket = makeWASocket({
        printQRInTerminal: false,
        auth: state,
    });

    socket.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect } = update;

        if (update.qr) {
            qr.toFile('./src/api/public/images/QRBaileys.png', update.qr); // generate the file
        }

        if (connection === 'close') {
            const shoudReconnect = (lastDisconnect?.error as Boom)?.output?.statusCode !== DisconnectReason.loggedOut;

            if (shoudReconnect) {
                await connect();
            }
        }
    });

    // socket.ev.on('connection.update', async (conn) => {
    //     if (conn.qr) { // if the 'qr' property is available on 'conn'
    //       qr.toFile('qr.png', conn.qr); // generate the file
    //     } else if (conn.connection && conn.connection === 'close') { // when websocket is closed
    //     //   if (existsSync(resolvePath(__dirname, '..', 'qr.png'))) { // and, the QR file is exists
    //     //     unlinkSync(resolvePath(__dirname, '..', 'qr.png')); // delete it
    //     //   }
    //     }
    //   });

    socket.ev.on('creds.update', saveState);

    return socket;
}