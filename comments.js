// Comments System using localStorage

const COMMENTS_KEY = "yenha_comments";

// Get page ID from current URL
function getPageId() {
  const pathname = window.location.pathname;
  return pathname.split("/").pop().replace(".html", "") || "index";
}

// Load comments for current page
function loadComments() {
  const pageId = getPageId();
  const allComments = JSON.parse(localStorage.getItem(COMMENTS_KEY)) || {};
  return allComments[pageId] || [];
}

// Save comment
function saveComment(name, email, text) {
  const pageId = getPageId();
  const allComments = JSON.parse(localStorage.getItem(COMMENTS_KEY)) || {};

  if (!allComments[pageId]) {
    allComments[pageId] = [];
  }

  const comment = {
    id: Date.now(),
    name,
    email,
    text,
    timestamp: new Date().toISOString(),
    approved: false
  };

  allComments[pageId].push(comment);
  localStorage.setItem(COMMENTS_KEY, JSON.stringify(allComments));
  return comment;
}

// Render comments section
function renderCommentsSection() {
  const container = document.querySelector(".post-content");
  if (!container) return;

  const commentsHTML = `
    <section class="comments-section">
      <h3>Bình luận</h3>
      <div id="commentsList" class="comments-list"></div>

      <form id="commentForm" class="comment-form" onsubmit="submitComment(event)">
        <h4>Để lại bình luận của bạn</h4>
        <input type="text" name="name" placeholder="Tên của bạn *" required />
        <input type="email" name="email" placeholder="Email *" required />
        <textarea name="text" placeholder="Bình luận của bạn... *" required rows="5"></textarea>
        <button type="submit">Gửi bình luận</button>
      </form>
    </section>
  `;

  container.insertAdjacentHTML("afterend", commentsHTML);
  loadAndDisplayComments();

  // Add styles dynamically if not already loaded
  if (!document.getElementById("commentStyles")) {
    const style = document.createElement("style");
    style.id = "commentStyles";
    style.textContent = `
      .comments-section {
        margin-top: 60px;
        padding-top: 40px;
        border-top: 1px solid var(--border);
      }

      .comments-section h3 {
        font-family: var(--serif);
        font-size: 1.8rem;
        font-style: italic;
        color: var(--text);
        margin-bottom: 30px;
      }

      .comments-section h4 {
        font-family: var(--serif);
        font-size: 1.2rem;
        font-style: italic;
        color: var(--text);
        margin-bottom: 20px;
      }

      .comments-list {
        margin-bottom: 40px;
      }

      .comment-item {
        padding: 24px;
        background: var(--bg-soft);
        border-radius: var(--radius);
        margin-bottom: 16px;
      }

      .comment-author {
        font-weight: 500;
        color: var(--accent);
        margin-bottom: 4px;
      }

      .comment-date {
        font-size: 0.85rem;
        color: var(--text-soft);
        margin-bottom: 12px;
      }

      .comment-text {
        color: var(--text);
        line-height: 1.7;
      }

      .comment-form {
        background: var(--bg-cream);
        padding: 30px;
        border-radius: var(--radius-lg);
        display: flex;
        flex-direction: column;
        gap: 16px;
      }

      .comment-form input,
      .comment-form textarea {
        padding: 12px 16px;
        border: 1px solid var(--border);
        border-radius: var(--radius-sm);
        font-family: var(--sans);
        font-size: 0.95rem;
        color: var(--text);
      }

      .comment-form input::placeholder,
      .comment-form textarea::placeholder {
        color: var(--text-soft);
      }

      .comment-form input:focus,
      .comment-form textarea:focus {
        outline: none;
        border-color: var(--accent);
        box-shadow: 0 0 0 3px rgba(217, 119, 87, 0.1);
      }

      .comment-form button {
        padding: 12px 24px;
        background: var(--accent);
        color: var(--bg);
        border: none;
        border-radius: var(--radius-pill);
        font-weight: 500;
        cursor: pointer;
        transition: all 0.3s;
      }

      .comment-form button:hover {
        background: #c85f48;
        transform: translateY(-2px);
        box-shadow: 0 8px 20px -8px rgba(217, 119, 87, 0.3);
      }

      .comment-pending {
        background: var(--bg-sand);
        border: 1px solid var(--border);
        padding: 12px;
        border-radius: var(--radius-sm);
        font-size: 0.85rem;
        color: var(--text-soft);
        margin-top: 10px;
      }
    `;
    document.head.appendChild(style);
  }
}

// Load and display comments
function loadAndDisplayComments() {
  const comments = loadComments();
  const commentsList = document.getElementById("commentsList");

  if (!commentsList) return;

  if (comments.length === 0) {
    commentsList.innerHTML = '<p style="color: var(--text-soft); text-align: center; padding: 20px;">Chưa có bình luận nào. Hãy là người đầu tiên!</p>';
    return;
  }

  commentsList.innerHTML = comments.map(comment => `
    <div class="comment-item">
      <div class="comment-author">${escapeHtml(comment.name)}</div>
      <div class="comment-date">${new Date(comment.timestamp).toLocaleDateString("vi-VN")} · ${new Date(comment.timestamp).toLocaleTimeString("vi-VN", {hour: "2-digit", minute: "2-digit"})}</div>
      <div class="comment-text">${escapeHtml(comment.text).replace(/\n/g, "<br>")}</div>
      ${!comment.approved ? '<div class="comment-pending">⏳ Đang chờ duyệt</div>' : ""}
    </div>
  `).join("");
}

// Submit comment
function submitComment(event) {
  event.preventDefault();
  const form = event.target;
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const text = form.text.value.trim();

  if (!name || !email || !text) {
    alert("Vui lòng điền đầy đủ thông tin!");
    return;
  }

  saveComment(name, email, text);
  form.reset();
  loadAndDisplayComments();
  alert("Cảm ơn bình luận của bạn! Bình luận sẽ được hiển thị sau khi được duyệt.");
}

// Sanitize HTML
function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

// Initialize comments on post pages
if (document.body.classList.contains("post-page") || document.querySelector(".post-header")) {
  renderCommentsSection();
}
