import { App } from "./app"
import baileys from "../baileys/bot"
import venom from "../venom/bot"

baileys();
// venom();
new App().server.listen(process.env.PORT || 3000);

