import { parseWhatsAppChat } from "../utils/whatsAppParser.js";

export const analyzeChart = (req, res) => {
    try {
        if (!req.file){
            return res.status(400).json({
                message: "No file uploaded"
            })
        }

        const chatText = req.file.buffer.toString('utf-8');

        const result = parseWhatsAppChat(chatText);

        return res.json(result);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}