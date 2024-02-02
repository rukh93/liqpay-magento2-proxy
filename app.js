const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const port = 1234;
const endpoint = 'https://magento.test/rest/V1/liqpay/callback';

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

// Middleware to parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/callback', async (req, res) => {
    const formData = req.body;
    console.log('Received data:', formData);
    
    try {
        const apiResponse = await axios.post(endpoint, formData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Cookie: `XDEBUG_SESSION=PHPSTORM`
            },
        });
        res.send('Callback received successfully and data sent to the API!');
    } catch (error) {
        console.error('Error sending data to the API:', error.message);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});