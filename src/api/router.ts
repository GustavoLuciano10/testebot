import { Router } from "express";
import { messageController } from "./controllers/messageController";
import { webHookController } from "./controllers/webhookController";
import { connectionController } from "./controllers/connectionController";

const router: Router = Router();

router.put("/api/setWebHook", webHookController.setWebHook);
router.post("/api/sendText", messageController.sendText);
router.post("/api/sendImage", messageController.sendImage);
router.get("/api/connectBaileys", connectionController.connectBaileys);
router.get("/api/connectVenom", connectionController.connectVenom);

export { router };
