const express = require('express');
const cors = require('cors');
const request = require('request');
const app = express();

app.use(cors());

app.get('/proxy', (req, res) => {
  const targetUrl = req.query.url;
  if (!targetUrl) return res.status(400).send('Missing url parameter');

  const headers = {
    'User-Agent': req.headers['user-agent'] || 'Mozilla/5.0',
    'Referer': 'https://google.com',
    'Accept': '*/*',
    'Origin': 'https://google.com'
  };

  request({ url: targetUrl, headers }).on('error', err => {
    res.status(500).send(`Proxy error: ${err.message}`);
  }).pipe(res);
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
