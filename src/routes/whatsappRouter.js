import { Router } from 'express';
import { verifyWebhook, processMessage, processPendingMessages, sendMessage } from '../controllers/whatsappController.js';

const whatsappRouter = Router();

whatsappRouter.get('/webhook', verifyWebhook);

whatsappRouter.post('/webhook',processMessage);

whatsappRouter.post('/message', sendMessage);

whatsappRouter.post('/pending',processPendingMessages);

export default whatsappRouter;