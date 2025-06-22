const express = require('express');
const cors = require('cors');
const request = require('request');
const app = express();

app.use(cors());

app.get('/proxy', (req, res) => {
  const targetUrl = req.query.url;
  if (!targetUrl) {
    return res.status(400).send('Missing url parameter');
  }

  req.pipe(
    request({
      url: targetUrl,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
      }
    })
  ).pipe(res);
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});