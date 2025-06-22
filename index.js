// index.js
const express = require('express');
const cors = require('cors');
const https = require('https');
const http = require('http');
const { URL } = require('url');

const app = express();
app.use(cors());

app.get('/proxy', (req, res) => {
  const targetUrl = req.query.url;
  if (!targetUrl) return res.status(400).send('Missing url parameter');

  try {
    const parsedUrl = new URL(targetUrl);
    const lib = parsedUrl.protocol === 'https:' ? https : http;

    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        'Accept': '*/*',
        'Referer': parsedUrl.origin
      }
    };

    lib.get(targetUrl, options, (response) => {
      res.writeHead(response.statusCode, response.headers);
      response.pipe(res);
    }).on('error', (err) => {
      res.status(500).send('Proxy error: ' + err.message);
    });
  } catch (e) {
    res.status(400).send('Invalid URL');
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
