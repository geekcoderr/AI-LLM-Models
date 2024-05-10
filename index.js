require('dotenv').config();
const app = require('express')();
const axios = require('axios');
const { response } = require('express');
const PORT = process.env.NODE_PORT || 3000;
const api_key = process.env.API_KEY;

app.get('/', (req, res) => {
    res.json({ message: 'Server is Stable!' });
});

app.get('/:Prompt', (req, res) => {
    const prompt = req.params.Prompt;

    axios.post('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent', {
        contents: {
            parts: [
                {
                    text: prompt,
                }
            ]
        }
    }, {
        headers: {
            'Content-Type': 'application/json',
        },
        params: {
            key: api_key,
        }
    }).then((response) => {
        const data = response.data;
        const answer=data.candidates[0].content.parts[0].text;
        res.end(`
        <pre>
        ${answer}
        </pre>
        `)
    }).catch((error) => {
        res.json({ message: error.message });
    });
});



app.listen(PORT, () => {
    console.log(`Server Started at localhost:${PORT}`);
});