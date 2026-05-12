let posts = [];
let filteredPosts = [];
let currentBuyLink = "";

async function loadPosts() {
  try {
    const response = await fetch('/api/posts');
    posts = await response.json();
    filteredPosts = [...posts];
    renderPosts(posts);
  } catch (err) {
    console.error('Failed to load posts:', err);
    document.getElementById("postGrid").innerHTML = '<p style="color: #d97757;">Lỗi tải bài viết</p>';
  }
}

function renderPosts(postsToRender) {
  const postGrid = document.getElementById("postGrid");
  const noResults = document.getElementById("noResults");

  if (postsToRender.length === 0) {
    postGrid.innerHTML = "";
    noResults.style.display = "block";
    return;
  }

  noResults.style.display = "none";
  postGrid.innerHTML = postsToRender.map(post => `
    <article class="post-card">
      <a href="/posts/${post.slug}.html" class="post-thumb-link">
        <img class="post-thumb" src="${post.thumbnail_url}" alt="${post.title}" loading="lazy" />
      </a>
      <div class="post-body">
        <span class="post-date">${post.date} · Yên Hạ</span>
        <h3 class="post-title">${post.title}</h3>
        <p class="post-excerpt">${post.excerpt}</p>
        <a href="/posts/${post.slug}.html" class="post-link">Đọc tiếp →</a>
      </div>
    </article>
  `).join("");
}

document.getElementById("searchInput").addEventListener("keyup", (e) => {
  const query = e.target.value.toLowerCase();
  filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(query) ||
    post.excerpt.toLowerCase().includes(query)
  );
  renderPosts(filteredPosts);
});

// Buy Modal Functions
function openBuyModal(bookTitle, buyLink) {
  document.getElementById("modalBookTitle").textContent = `Mua: ${bookTitle}`;
  currentBuyLink = buyLink;
  const modal = document.getElementById("buyModal");
  modal.style.display = "flex";
  document.body.style.overflow = "hidden";
}

function closeBuyModal() {
  document.getElementById("buyModal").style.display = "none";
  document.body.style.overflow = "auto";
  document.getElementById("buyForm").reset();
}

async function handleBuySubmit(event) {
  event.preventDefault();
  const name = document.querySelector("#buyForm input[type='text']").value;
  const email = document.querySelector("#buyForm input[type='email']").value;
  const phone = document.querySelector("#buyForm input[type='tel']").value;
  const quantity = document.querySelector("#buyForm input[type='number']").value;
  const bookTitle = document.getElementById("modalBookTitle").textContent.replace('Mua: ', '');

  try {
    const response = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bookTitle, name, email, phone, quantity, notes: '' })
    });

    if (response.ok) {
      alert(`Cảm ơn ${name}! Đơn hàng của bạn đã được ghi nhận. Bây giờ bạn sẽ được chuyển hướng đến Shopee để thanh toán.`);
      closeBuyModal();
      window.open(currentBuyLink, "_blank");
    } else {
      alert('Lỗi gửi đơn hàng');
    }
  } catch (err) {
    console.error('Error submitting order:', err);
    alert('Lỗi gửi đơn hàng');
  }
}

// Close modal when clicking outside
window.addEventListener("click", (event) => {
  const modal = document.getElementById("buyModal");
  if (event.target === modal) {
    closeBuyModal();
  }
});

loadPosts();
