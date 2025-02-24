import axios from 'axios';
import { sendSlackMessage } from './slackServices.js'
import config from '../config/config.js';

export const sendWhatsappMessage = async (to, text, phoneId) => {
    try {
        const response = await axios.post(`${config.WHATSAPP_API_URL}/${phoneId}/messages`, {
            messaging_product: 'whatsapp',
            to: to,
            text: { body: text }
        }, {
            headers: {
                'Authorization': `Bearer ${config.WHATSAPP_ACCESS_TOKEN}`,
                'Content-Type': 'application/json'
            }
        });
        console.log(`Message sent to: ${to}`);
    } catch (error) {
        console.error('Error sending message:', error);
        throw error;
    }
};

export const sendContactCard = async (to, phone, phoneId) => {
    let contact = {
        "name": {
            "first_name": "Contacto",
            "last_name": "Cajero",
            "formatted_name": "Contacto"
        },
        "phones": [
            {
                "phone": phone,
                "type": "CELL"
            }
        ]
    };

    try {
        const response = await axios.post(
            `${config.WHATSAPP_API_URL}/${phoneId}/messages`,
            {
                messaging_product: 'whatsapp',
                to: to,
                type: 'contacts',
                contacts: [contact]
            },
            {
                headers: {
                    'Authorization': `Bearer ${config.WHATSAPP_ACCESS_TOKEN}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        console.log(`Contact card sent to: ${to}`);
    } catch (error) {
        console.error('Error sending contact card:', error.response ? error.response.data : error.message);
    }
};

export const healthCheck = async (msg) => {
    try {
        if(msg === '/health'){
            // await sendSlackMessage('Todo nice!');
            console.log('ok')
        }
    } catch (error) {
        console.error('Error sending message:', error);
        throw error;
    }
};