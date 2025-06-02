const blogData = [
  {
    id: 1,
    title: "The Rise of Bitcoin in 2025: A New Era for Digital Currency",
    excerpt:
      "The year 2025 has marked a historic turning point for Bitcoin and the broader cryptocurrency market. With increased institutional adoption...",
    link: "/blog-post.html?id=1",
    image: "/assets/images/crypto1.jpg",
  },
  {
    id: 2,
    title: "Crypto Security Tips: Protecting Your Digital Wealth in 2025",
    excerpt:
      "In the ever-evolving landscape of cryptocurrency, one thing remains constant: security is everything. With over $2 billion lost to crypto hacks and scams in 2024 alone...",
    link: "/blog-post.html?id=2",
    image: "/assets/images/hero1.jpg",
  },
  {
    id: 3,
    title: "Top 5 Altcoins to Watch in 2025",
    excerpt:
      "While Bitcoin and Ethereum continue to dominate headlines, savvy investors know that many of the most exciting innovations are happening in the altcoin space. Here are five altcoins to watch closely in 2025",
    link: "blog-post.html?id=3",
    image: "/assets/images/hero2.jpg",
  },
];

const blogGrid = document.querySelector(".blogGrid");

blogData.forEach((blog) => {
  const blogItem = document.createElement("div");
  blogItem.classList.add("blogCard"); // style with CSS

  blogItem.innerHTML = `
  <img src="${blog.image}" alt="${blog.title}" class="blogImage">
  <div class="blogContent">
    <h3>${blog.title}</h3>
    <p>${blog.excerpt}</p>
    <a href="${blog.link}" class="readMore">Read More →</a>
  </div>
`;

  blogGrid.appendChild(blogItem);
});
