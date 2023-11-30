const express = require('express');
const cors = require('cors');
require('dotenv').config()

const PORT = process.env.PORT || 8000;
const API_KEY = process.env.OPENAI_API_KEY;

const app = express();
app.use(express.json());
app.use(cors());

app.post('/completions', async (req, res) => {
    const text_prompt = "Answer back with an identity as Voyagenius. Provide the itinerary for the city mentioned in the query here. Provide the near best route one can take in a day for the interests mentioned";
    const options = {
        method: 'POST',
        headers: {
            "Authorization": `Bearer ${API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: `${req.body.message} ${text_prompt}` }],
            max_tokens: 4000,
        })
    }
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', options);
        const data = await response.json();
        res.send(data);
    } catch (error) {
        console.log(error);
    }
})

app.listen(PORT, () => console.log(`Your Server is running successfully on PORT ${PORT}`));