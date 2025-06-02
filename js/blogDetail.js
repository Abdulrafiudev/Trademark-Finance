const blogData = [
  {
    id: 1,
    title: "The Rise of Bitcoin in 2025: A New Era for Digital Currency",
    content: `
CONTENT:

The year 2025 has marked a historic turning point for Bitcoin and the broader cryptocurrency market. With increased institutional adoption, improved regulatory clarity, and growing trust among retail investors, Bitcoin is now being seen not just as a speculative asset but as a legitimate store of value.

🚀 INSTITUTIONAL ADOPTION:

Several major financial institutions—including BlackRock, Fidelity, and Goldman Sachs—have launched Bitcoin ETFs (Exchange-Traded Funds), making it easier for traditional investors to gain exposure without needing to manage private keys or wallets. This has led to billions of dollars in new capital flowing into the market.

🔐 IMPROVED SECURITY AND INFRASTRUCTURE:

Thanks to innovations in blockchain security and the emergence of robust custody solutions, concerns around hacking and digital theft have significantly decreased. Leading companies like Ledger, Coinbase Custody, and Fireblocks now offer enterprise-grade protection for digital assets.

🌎 GLOBAL ACCEPTANCE:

Governments that were once skeptical are now considering Bitcoin as part of their national reserves. El Salvador’s early adoption has inspired countries like Argentina and Nigeria to explore Bitcoin-backed economic strategies to combat inflation and currency devaluation.

📈 PRICE AND MARKET SENTIMENT:

Bitcoin's price surged past $100,000 in early 2025, driven by a blend of demand and scarcity. Analysts predict further growth as halving events and limited supply economics push long-term value even higher.`,
    image: "/assets/images/crypto1.jpg",
  },
  {
    id: 2,
    title: "Crypto Security Tips: Protecting Your Digital Wealth in 2025",
    content: `
CONTENT:

In the ever-evolving landscape of cryptocurrency, one thing remains constant: security is everything. With over $2 billion lost to crypto hacks and scams in 2024 alone, it’s essential for every crypto investor—novice or expert—to understand how to safeguard their assets.

🔑 USE COLD WALLET FOR STORAGE:

The best way to protect your cryptocurrencies is by storing them in cold wallets (offline devices). Hardware wallets like Ledger Nano X or Trezor Model T offer bank-level security and eliminate online vulnerabilities.

🛡️ ENABLE 2FA EVERYWHERE:

Two-Factor Authentication (2FA) is a must. Make sure you enable it on all your crypto exchanges, wallets, and associated email accounts. Use apps like Google Authenticator or Authy instead of SMS-based 2FA, which is more vulnerable to SIM swap attacks.

🕵️‍♂️ BE AWARE OF PHISHING SCAMS:

Cybercriminals often mimic exchange websites or send fake emails pretending to be from trusted sources. Always double-check URLs, never share private keys, and verify email addresses before clicking on links.

🧠 EDUCATE YOURSELF CONTINUOUSLY:

Security threats are always changing. Follow trusted sources like Cointelegraph, The Block, and official exchange blogs to stay informed about the latest vulnerabilities and best practices.`,
    image: "assets/images/hero1.jpg",
  },
  {
    id: 3,
    title: "Top 5 Altcoins to Watch in 2025",
    content: `
1. SOLANA (SOL)
Solana continues to lead in the race for high-speed blockchain transactions. With a revamped consensus model and new developer tools, it remains a top choice for DeFi and gaming projects.

2. CHAINLINK (LINK)
Chainlink’s decentralized oracle network is now integrated into hundreds of real-world applications. Its partnerships with banks and governments make it a foundational piece of Web3 infrastructure.

3. ARBITRUM (ARB)
As a layer-2 solution for Ethereum, Arbitrum is bringing faster and cheaper transactions to the network. With the rise of gas-conscious DeFi protocols, Arbitrum is rapidly gaining traction.

4. RENDER NETWORK (RNDR)
With AI and the metaverse demanding massive GPU rendering power, Render Network has created a decentralized solution. RNDR is becoming a critical asset for content creators and AI projects.

5. SUI (SUI)
Developed by former Meta engineers, Sui is redefining smart contracts and transaction parallelism. It’s especially popular among developers for its scalability and unique Move programming language.
      `,
    image: "assets/images/hero2.jpg",
  },
];

// Extract blog ID from URL
const urlParams = new URLSearchParams(window.location.search);
const blogId = parseInt(urlParams.get("id"));

const blog = blogData.find((item) => item.id === blogId);

if (blog) {
  document.querySelector(".blog-figure img").src = blog.image;
  const contentContainer = (document.querySelector(
    ".content-article"
  ).textContent = blog.content);
  const sentences = blog.content.trim().split(".");
  sentences.forEach((sentence) => {
    if (sentence.trim()) {
      const p = document.createElement("p");
      p.textContent = sentence.trim() + ".";
      contentContainer.appendChild(p);
    }
  });
  document.querySelector(".title-head banner-post-title").textContent =
    blog.title;
} else {
  document.querySelector(
    ".blogDetailsContainer"
  ).innerHTML = `<p>Blog post not found.</p>`;
}
