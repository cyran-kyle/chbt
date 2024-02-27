const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/getOpenAIResponse', async (req, res) => {
  const { userInput } = req.body;

  try {
    const response = await axios.post('https://api.openai.com/v1/engines/text-davinci-002/completions', {
      prompt: userInput,
      max_tokens: 100,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_OPENAI_API_KEY',
      },
    });

    res.json({ botResponse: response.data.choices[0].text.trim() });
  } catch (error) {
    console.error('Error fetching response from ChatGPT:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
