const http = require('http');
const url = require('url');
const sqlite3 = require('sqlite3').verbose();
const axios = require('axios');
const cors = require('cors');  // Import cors

const port = 3000;

// Initialize SQLite database
const db = new sqlite3.Database('./data.db', (err) => {
  if (err) {
    console.error('Error opening database', err);
  } else {
    db.run('CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY, title TEXT, body TEXT)');
  }
});

// Fetch data from API and save to database
async function populateData(response) {
  try {
    const apiResponse = await axios.get('https://jsonplaceholder.typicode.com/posts');
    const data = apiResponse.data;

    db.serialize(() => {
      db.run('BEGIN TRANSACTION');
      const stmt = db.prepare('INSERT OR REPLACE INTO posts (id, title, body) VALUES (?, ?, ?)');
      data.forEach(post => {
        stmt.run(post.id, post.title, post.body);
      });
      stmt.finalize();
      db.run('COMMIT');
    });

    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.end('Data populated successfully.');
  } catch (error) {
    console.error('Error populating data', error);
    response.writeHead(500, { 'Content-Type': 'text/plain' });
    response.end('Internal Server Error');
  }
}

// Handle incoming HTTP requests
function requestHandler(request, response) {
  const parsedUrl = url.parse(request.url, true);

  // CORS headers
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (request.method === 'OPTIONS') {
    response.writeHead(204);
    response.end();
    return;
  }

  if (request.method === 'GET') {
    if (parsedUrl.pathname === '/populate') {
      populateData(response);
    } else if (parsedUrl.pathname === '/data') {
      db.all('SELECT * FROM posts', [], (err, rows) => {
        if (err) {
          console.error('Error fetching data', err);
          response.writeHead(500, { 'Content-Type': 'text/plain' });
          response.end('Internal Server Error');
          return;
        }
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify(rows));
      });
    } else {
      response.writeHead(404, { 'Content-Type': 'text/plain' });
      response.end('Not Found');
    }
  } else {
    response.writeHead(405, { 'Content-Type': 'text/plain' });
    response.end('Method Not Allowed');
  }
}

const server = http.createServer(requestHandler);

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
