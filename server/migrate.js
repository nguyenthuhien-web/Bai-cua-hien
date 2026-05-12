import db from './db.js';

const posts = [
  {
    title: "Chuyến tàu trưởng thành đã rời ga",
    date: "10.04.2026",
    category: "Tản mạn",
    excerpt: "Những suy nghĩ nhân dịp sinh nhật tuổi 20...",
    thumbnail_url: "https://picsum.photos/seed/yenha-train/800/600"
  },
  {
    title: "Khoảnh khắc bạn nhận ra mình đã trưởng thành",
    date: "07.03.2026",
    category: "Suy nghĩ",
    excerpt: "Trưởng thành không phải lúc bạn tròn 18 tuổi...",
    thumbnail_url: "https://picsum.photos/seed/yenha-mature/800/600"
  },
  {
    title: "Cô nhóc 18 tuổi và một triệu đồng",
    date: "25.01.2026",
    category: "Hồi ức",
    excerpt: "Câu chuyện về một quyết định dũng cảm ở tuổi 18...",
    thumbnail_url: "https://picsum.photos/seed/yenha-18/800/600"
  },
  {
    title: "Mỗi cột mốc, một dấu vết âm thầm",
    date: "15.01.2026",
    category: "Tản mạn",
    excerpt: "Những mốc son trong cuộc đời dù nhỏ đều có ý nghĩa...",
    thumbnail_url: "https://picsum.photos/seed/yenha-milestone/800/600"
  },
  {
    title: "Một đời bình thường",
    date: "28.12.2025",
    category: "Suy nghĩ",
    excerpt: "Điều gì làm cho một cuộc đời trở nên ý nghĩa?",
    thumbnail_url: "https://picsum.photos/seed/yenha-normal/800/600"
  },
  {
    title: "Nếu cuộc đời chỉ có 60 năm thì sao?",
    date: "12.12.2025",
    category: "Hồi ức",
    excerpt: "Một bài viết về cách nhìn nhận cuộc đời từ một góc độ khác...",
    thumbnail_url: "https://picsum.photos/seed/yenha-60/800/600"
  }
];

console.log('Starting migration...');

try {
  const checkCount = db.prepare('SELECT COUNT(*) as count FROM posts').get().count;

  if (checkCount > 0) {
    console.log(`Database already has ${checkCount} posts. Skipping migration.`);
    process.exit(0);
  }

  posts.forEach(post => {
    const slug = post.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

    db.prepare(`
      INSERT INTO posts (title, slug, date, category, excerpt, thumbnail_url, content, published)
      VALUES (?, ?, ?, ?, ?, ?, ?, 1)
    `).run(
      post.title,
      slug,
      post.date,
      post.category,
      post.excerpt,
      post.thumbnail_url,
      `# ${post.title}\n\n${post.excerpt}\n\n(Nội dung đầy đủ sẽ được thêm qua admin panel)`
    );
  });

  console.log(`✅ Migration completed! Inserted ${posts.length} posts.`);
  process.exit(0);
} catch (err) {
  console.error('❌ Migration failed:', err.message);
  process.exit(1);
}
