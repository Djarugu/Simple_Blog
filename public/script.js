// Fetch and display blog posts
fetch('/api/posts')
  .then(response => response.json())
  .then(posts => {
    const blogList = document.getElementById('blog-list');
    blogList.innerHTML = posts.map(post => `<li><a href="/post/${post.id}">${post.title}</a></li>`).join('');
  });

// Fetch and display individual blog post
const postId = window.location.pathname.split('/post/')[1];
if (postId) {
  fetch(`/api/posts/${postId}`)
    .then(response => response.json())
    .then(post => {
      document.getElementById('post-title').innerText = post.title;
      document.getElementById('post-content').innerText = post.content;
    });
}