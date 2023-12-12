const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

// Sample blog data
const blogPosts = [
  { id: 1, title: 'First Post', content: 'This is the content of the first post.' },
  { id: 2, title: 'Second Post', content: 'This is the content of the second post.' }
];

const server = http.createServer((req, res) => {
  const { url } = req;

  if (url === '/') {
    // Serve the index.html file
    const indexPath = path.join(__dirname, 'public', 'index.html');
    fs.readFile(indexPath, 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    });
  } else if (url.startsWith('/post/')) {
    // Serve the post.html file
    const postId = url.split('/post/')[1];
    const postPath = path.join(__dirname, 'public', 'post.html');
    fs.readFile(postPath, 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
        return;
      }
      const post = blogPosts.find(post => post.id == postId);
      if (post) {
        data = data.replace('{{title}}', post.title).replace('{{content}}', post.content);
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
      }
    });
  } else if (url === '/api/posts') {
    // Return blog posts as JSON
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(blogPosts));
  } else {
    // Serve static files
    const filePath = path.join(__dirname, 'public', url);
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    });
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});