import { connect } from "./connection";

export default async () => {
    await connect();
}

export function start(client) {
    client.onMessage((message) => {
      console.log(message);
      if (message.body.toLowerCase() === 'oi') {
        client
          .sendText(message.from, 'Oi seu otário 2');
      }
    });
  }