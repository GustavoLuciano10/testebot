import { Request, Response } from "express";
import botBaileys from "../../baileys/bot";
import botVenom from "../../venom/bot";
const fs = require("fs");

class ConnectionController {
    public connectBaileys(req: Request, res: Response) {
        try {
            botBaileys();
            return res.json({
                response: "Início de conexão Baileys, aguardando QRCode.",
            });
        } catch (error) {
            return res.json({
                response: "Ocorreu um erro na tentativa de início de conexão Baileys.",
            });
        }
    }

    public connectVenom(req: Request, res: Response) {
        try {
            botVenom();
            return res.json({
                response: "Início de conexão Venom, aguardando QRCode.",
            });
        } catch (error) {
            return res.json({
                response: "Ocorreu um erro na tentativa de início de conexão Venom.",
            });
        }
    }
}

export const connectionController = new ConnectionController();