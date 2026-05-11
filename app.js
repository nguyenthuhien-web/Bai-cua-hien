// Blog Posts Data
const posts = [
  {
    id: 1,
    title: "Chuyến tàu trưởng thành đã rời ga",
    date: "10.04.2026",
    thumb: "https://picsum.photos/seed/yenha-train/800/600",
    excerpt: "Chuyến tàu trưởng thành đã rời ga, mang theo những đứa trẻ ở xóm nhỏ năm ấy lớn khôn dần và đi đến nơi xa...",
    link: "posts/post-1.html"
  },
  {
    id: 2,
    title: "Khoảnh khắc bạn nhận ra mình đã trưởng thành",
    date: "07.03.2026",
    thumb: "https://picsum.photos/seed/yenha-grown/800/600",
    excerpt: "Bạn sống xa gia đình, ngày nọ đứng trước cửa hàng, bạn muốn mua món đồ mình rất thích nhưng mở ví ra chỉ còn một tờ...",
    link: "posts/post-2.html"
  },
  {
    id: 3,
    title: "Cô nhóc 18 tuổi và một triệu đồng",
    date: "25.01.2026",
    thumb: "https://picsum.photos/seed/yenha-18/800/600",
    excerpt: "Hồi mới vào đại học, mình đem hết thảy những háo hức và hiếu chiến của tuổi trẻ để ngày đêm đi tìm công việc chốn thành phố...",
    link: "posts/post-3.html"
  },
  {
    id: 4,
    title: "Mỗi cột mốc, một dấu vết âm thầm",
    date: "15.01.2026",
    thumb: "https://picsum.photos/seed/yenha-milestones/800/600",
    excerpt: "Năm 5 tuổi, bạn tin thế giới này rất rộng lớn. Năm 10 tuổi, niềm vui có hình dáng rõ ràng hơn. Năm 15 tuổi, bạn đứng ở lưng chừng...",
    link: "posts/post-4.html"
  },
  {
    id: 5,
    title: "Một đời bình thường",
    date: "28.12.2025",
    thumb: "https://picsum.photos/seed/yenha-ordinary/800/600",
    excerpt: "Có thể sống một đời bình thường vốn dĩ là một chuyện rất tốt. Nhưng nhiều người lại coi một đời bình thường là \"tầm thường\"...",
    link: "posts/post-5.html"
  },
  {
    id: 6,
    title: "Nếu cuộc đời chỉ có 60 năm thì sao?",
    date: "12.12.2025",
    thumb: "https://picsum.photos/seed/yenha-cassette/800/600",
    excerpt: "Ngày mình còn nhỏ, gần nhà có một tiệm chuyên bán băng đĩa. Chú ít nói nhưng lại có thói quen mở nhạc suốt ngày...",
    link: "posts/post-6.html"
  }
];

let filteredPosts = [...posts];
let currentBuyLink = "";

// Render Posts
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
      <a href="${post.link}" class="post-thumb-link">
        <img class="post-thumb" src="${post.thumb}" alt="${post.title}" loading="lazy" />
      </a>
      <div class="post-body">
        <span class="post-date">${post.date} · Yên Hạ</span>
        <h3 class="post-title">${post.title}</h3>
        <p class="post-excerpt">${post.excerpt}</p>
        <a href="${post.link}" class="post-link">Đọc tiếp →</a>
      </div>
    </article>
  `).join("");
}

// Search Posts
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

function handleBuySubmit(event) {
  event.preventDefault();
  const formData = new FormData(document.getElementById("buyForm"));
  const name = document.querySelector("#buyForm input[type='text']").value;
  const email = document.querySelector("#buyForm input[type='email']").value;
  const phone = document.querySelector("#buyForm input[type='tel']").value;
  const quantity = document.querySelector("#buyForm input[type='number']").value;

  // Save order info to localStorage
  const order = { name, email, phone, quantity, timestamp: new Date().toISOString() };
  let orders = JSON.parse(localStorage.getItem("yenha_orders")) || [];
  orders.push(order);
  localStorage.setItem("yenha_orders", JSON.stringify(orders));

  // Show confirmation
  alert(`Cảm ơn ${name}! Đơn hàng của bạn đã được ghi nhận. Bây giờ bạn sẽ được chuyển hướng đến Shopee để thanh toán.`);

  closeBuyModal();
  window.open(currentBuyLink, "_blank");
}

// Close modal when clicking outside
window.addEventListener("click", (event) => {
  const modal = document.getElementById("buyModal");
  if (event.target === modal) {
    closeBuyModal();
  }
});

// Initial render
renderPosts(posts);

// Load Disqus comments (optional - requires Disqus account setup)
function loadDisqusComments() {
  if (typeof window.location !== 'undefined' && window.location.pathname.includes('posts/')) {
    // This would be configured on individual post pages
    // Add the Disqus universal code here if you set up a Disqus forum
  }
}
