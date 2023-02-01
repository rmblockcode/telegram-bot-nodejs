// Dependencies
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
// Constants

const port = 3000;
const url = 'https://api.telegram.org/bot';
const apiToken = 'TOKEN';


app.use(bodyParser.json());

function sendMessage(url, chatId, text, res){
    axios.post(`${url}${apiToken}/sendMessage`,
        {
            chat_id: chatId,
            text: text
        })
        .then((response) => { 
            res.status(200).send(response);
        }).catch((error) => {
            res.send(error);
        });
}

app.post('/', (req, res) => {
    const chatId = req.body.message.chat.id;
    const sentMessage = req.body.message.text;
    // Expresion regular para hola
    if (sentMessage.match(/hola/gi)) {
        sendMessage(url, chatId, 'Hola de nuevo 👋', res)
    } else {
        // if no hello present, just respond with 200 
        sendMessage(url, chatId, 'Otro mensaje 👋', res)
    }
});

app.listen(port, () => {
     console.log(`Listening on port ${port}`);
});