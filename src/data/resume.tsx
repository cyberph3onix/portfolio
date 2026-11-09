import { Icons } from "@/components/icons";
import { HomeIcon, FileTextIcon, NotebookIcon } from "lucide-react";

export const RESUME_PDF = "/27octcv.pdf";

export const DATA = {
  name: "Shreshta Raaj Gupta",
  initials: "SRG",
  url: "http://localhost:3000",
  location: "Kolkata, India",
  locationLink: "https://www.google.com/maps/place/kolkata",
  tagline: "AI, Systems & Web3 Builder",
  description:
    "Computer Science student building AI, systems and Web3 products. 4x hackathon winner, researching post-quantum security at ISI Kolkata.",
  summary:
    "I'm a Computer Science and Engineering student at the [Institute of Engineering & Management, Kolkata](https://iem.edu.in/). I work across AI, systems and Web3: from hybrid RAG pipelines and voice assistants to zero-knowledge credentials and non-custodial smart wallets on Stellar. Right now I'm a research intern at the Indian Statistical Institute, working on making 5G authentication quantum-safe for constrained IoT devices. Outside research, I'm a Stellar Ambassador and the Tech Lead at GDG IEM. I've won four hackathons and I'm always looking for something new to build.",
  avatarUrl: "/me.png",
  skills: [
    {
      category: "Languages",
      items: ["Python", "TypeScript", "Rust", "Java", "C++", "Solidity"],
    },
    {
      category: "AI / ML",
      items: [
        "Machine Learning",
        "RAG",
        "Information Retrieval",
        "LLM Applications",
        "Zero-Knowledge Proofs",
        "FAISS",
        "BM25",
        "LangChain",
        "ChromaDB",
        "scikit-learn",
        "FastF1",
      ],
    },
    {
      category: "Web / Backend",
      items: ["React", "Next.js", "Node.js", "FastAPI"],
    },
    {
      category: "Web3 & Tools",
      items: ["Soroban", "Smart Contracts", "Docker", "Git", "Linux"],
    },
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
    { href: "/resume", icon: FileTextIcon, label: "Resume" },
  ],
  contact: {
    email: "guptaraaj0505@gmail.com",
    tel: "+91 9038312273",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/cyberph3onix",
        icon: Icons.github,
        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/shreshta-raaj-gupta",
        icon: Icons.linkedin,
        navbar: true,
      },
      X: {
        name: "X",
        url: "https://dub.sh/Qp4vDYc",
        icon: Icons.x,
        navbar: true,
      },
      Youtube: {
        name: "Youtube",
        url: "https://dub.sh/srestube",
        icon: Icons.youtube,
        navbar: false,
      },
      email: {
        name: "Send Email",
        url: "mailto:guptaraaj0505@gmail.com",
        icon: Icons.email,
        navbar: true,
      },
    },
  },

  work: [
    {
      company: "GDG IEM",
      location: "Kolkata",
      title: "Tech Lead",
      logoUrl: "/logos/gdg-iem.webp",
      start: "",
      end: "Present",
    },
    {
      company: "Stellar Development Foundation",
      location: "Kolkata",
      title: "Stellar Ambassador",
      logoUrl: "/logos/stellar.png",
      start: "",
      end: "Present",
    },
    {
      company: "Indian Statistical Institute (ISI), Kolkata",
      location: "Kolkata",
      title: "Research Intern, Post-Quantum 5G Authentication",
      logoUrl: "/logos/isi-kolkata.webp",
      start: "2026",
      end: "Present",
    },
    {
      company: "IEEE EMBS Pune Chapter",
      location: "Remote",
      title: "AI/ML Intern, Smart Pharmacy Inventory Prediction",
      logoUrl: "/logos/ieee-embs-pune.webp",
      start: "June 2026",
      end: "July 2026",
    },
    {
      company: "Ambrosia Restaurant (Family Business)",
      location: "Baranagar, Kolkata",
      title: "IT and Operations Assistant",
      logoUrl: "",
      start: "June 2017",
      end: "Present",
    },
  ],
  education: [
    {
      school: "Institute of Engineering & Management",
      href: "https://iem.edu.in/",
      degree: "B.Tech in Computer Science and Engineering",
      logoUrl: "/iem_logo.jpg",
      start: "2024",
      end: "2028",
    },
    {
      school: "St. Xavier's Institution, Panihati",
      href: "https://sxipanihati.org/sxip/",
      degree: "Higher Secondary Education (CISCE) · Sodepur",
      logoUrl: "/sxi_logo.jpg",
      start: "",
      end: "2024",
    },
  ],
  projects: [
    {
      slug: "kairos",
      title: "Kairos",
      subtitle: "Intent-Based Non-Custodial Capital Delegation",
      href: "https://kairos.x7710.xyz/",
      dates: "July 2026 - August 2026",
      active: true,
      description:
        "Intent-based, non-custodial capital delegation on Stellar Soroban where AI proposes and on-chain policies dispose. Scoped, revocable delegations keep funds under user custody.",
      bullets: [
        "Built a non-custodial delegation system where an AI reasoning engine proposes trades while on-chain policies enforce spend limits, asset whitelists and time windows.",
        "Designed a Soroban smart-wallet architecture with scoped, revocable delegations so funds remain under user custody.",
        "Implemented a deterministic Market → Context → Memory → Strategy → Reasoning → Verification → Execution pipeline with only one LLM-dependent stage.",
        "Shipped deployed Soroban contracts, a TypeScript SDK, Next.js dashboard and Node/Express backend with wallet-signature authentication.",
      ],
      technologies: ["TypeScript", "Rust", "Soroban", "Next.js", "Node.js"],
      links: [
        {
          type: "Website",
          href: "https://kairos.x7710.xyz/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/wolf1276/kairos",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/kairos.png",
      imageClassName: "object-contain bg-black",
    },
    {
      slug: "doodle",
      title: "Doodle",
      subtitle: "On-chain freelance marketplace · Hexafalls (MLH × Solana)",
      href: "https://github.com/wolf1276/doodle-hexafalls",
      dates: "2026",
      active: true,
      description:
        "A non-custodial, milestone-based freelance payment protocol on Solana with escrow vaults and a recomputable on-chain reputation score. Built as a team at Hexafalls, where it won the MLH × Solana track and placed 3rd overall.",
      bullets: [
        "Freelance platforms hold client funds, take large fees and own each freelancer's reputation. Doodle holds funds in program-derived vaults with no private key and releases them by milestone under fixed on-chain rules.",
        "Clients and creators agree on milestones, fund an escrow vault, and release payment on-chain as each milestone is delivered.",
        "Reputation is derived deterministically from on-chain history that anyone can recompute.",
        "Won the MLH × Solana track and placed 3rd overall at Hexafalls.",
      ],
      technologies: ["Solana", "Anchor", "Rust", "Next.js"],
      links: [
        {
          type: "Source",
          href: "https://github.com/wolf1276/doodle-hexafalls",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/projects/doodle-banner.webp",
    },
    {
      slug: "jigyasa",
      title: "Jigyasa",
      subtitle: "Voice-Enabled Hindi RAG Assistant",
      href: "https://hhgoa-ragtask.vercel.app/",
      dates: "August 2026",
      active: true,
      description:
        "A voice-first Hindi RAG assistant over the ~7.77M-passage MS MARCO-XI corpus using hybrid dense (FAISS HNSW) and sparse (BM25) retrieval with cross-encoder reranking and strict grounding guardrails.",
      bullets: [
        "Built a voice-first Hindi RAG assistant over a ~7.77M-passage MS MARCO-XI corpus using Sarvam STT, hybrid dense+sparse retrieval, cross-encoder reranking and grounded generation.",
        "Designed four length-routed chunking strategies, FAISS HNSW + BM25 retrieval with Reciprocal Rank Fusion, and an explicit abstention path for unsupported questions.",
        "Evaluated on 1,000 held-out queries with Recall@10 of 0.637, NDCG@10 of 0.465 and MRR of 0.259; guardrails produced 0 false positives across 1,000 in-domain queries and 0 false negatives across 16 off-topic/unsafe cases.",
        "Optimized and benchmarked the local pipeline at P50/P70/P100 latencies of 114.0/122.6/142.5 ms; a controlled K=10 configuration reduced latency by 44–48% without observed quality loss.",
      ],
      technologies: [
        "Python",
        "FastAPI",
        "FAISS",
        "BM25",
        "Cross-Encoder",
        "Sarvam",
        "Gemini",
      ],
      links: [
        {
          type: "Website",
          href: "https://hhgoa-ragtask.vercel.app/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/cyberph3onix/hhgoa_ragtask",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/jigyasa.png",
    },
    {
      slug: "crcs",
      title: "CRCS",
      subtitle: "Collusion-Resistant Credential System",
      href: "https://github.com/cyberph3onix/crcs-zkp",
      dates: "2026",
      active: true,
      description:
        "A zero-knowledge credential system enabling selective disclosure of attributes without revealing the underlying data, with proofs that can't be linked across verifiers.",
      bullets: [
        "Contributed to a zero-knowledge credential system enabling selective disclosure of attributes without revealing underlying data.",
        "Used Poseidon commitments and Circom/Groth16 circuits to prevent verifiers from colluding to link separate proofs to the same credential holder.",
      ],
      technologies: ["Circom", "Groth16", "Poseidon", "Zero-Knowledge Proofs"],
      links: [
        {
          type: "Source",
          href: "https://github.com/cyberph3onix/crcs-zkp",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/projects/crcs-zkp.png",
    },
    {
      slug: "ragged",
      title: "Ragged",
      subtitle: "Hybrid Retrieval-Augmented Generation Framework",
      href: "https://github.com/cyberph3onix/ragged",
      dates: "June 2026 - Present",
      active: true,
      description:
        "A modular RAG framework that works online and offline: BM25 + dense retrieval fused with Reciprocal Rank Fusion, cross-encoder reranking, and a provider-agnostic LLM layer.",
      bullets: [
        "Built a modular RAG framework combining BM25 sparse retrieval and dense vector search through Reciprocal Rank Fusion with cross-encoder reranking.",
        "Added RAGAS-based evaluation for faithfulness, relevancy and correctness, with quality gates integrated into CI.",
        "Designed a provider-agnostic LLM layer supporting local Ollama models and cloud providers without application-level changes.",
      ],
      technologies: ["Python", "LangChain", "ChromaDB", "BM25", "Ollama", "Groq"],
      links: [
        {
          type: "Source",
          href: "https://github.com/cyberph3onix/ragged",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/projects/ragged.png",
    },
    {
      slug: "f1-race-prediction",
      title: "F1 Race Outcome Prediction",
      subtitle: "Pre-race machine learning pipeline",
      href: "https://github.com/cyberph3onix/ProjectF1",
      dates: "December 2025 - Present",
      active: true,
      description:
        "An ML pipeline that predicts Formula 1 race classification using only pre-race features, with strict prevention of data leakage.",
      bullets: [
        "Built an ML pipeline predicting F1 race classification using only pre-race features such as grid position, qualifying delta and constructor strength, with strict prevention of data leakage.",
      ],
      technologies: ["Python", "pandas", "scikit-learn", "FastF1"],
      links: [
        {
          type: "Source",
          href: "https://github.com/cyberph3onix/ProjectF1",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image:
        "https://media.formula1.com/image/upload/t_16by9Centre/c_fit,w_3200,h_1800/q_auto/v1740000001/fom-website/2026/Red%20Bull/SI202601150722.webp",
    },
    {
      slug: "injective-token-sender",
      title: "Injective Token Sender",
      subtitle: "Keplr-powered INJ transfers on Injective Testnet",
      href: "https://injective-token-sender.vercel.app",
      dates: "2026",
      active: true,
      description:
        "A deliberately small Next.js dApp that connects a Keplr wallet, reads your INJ balance on Injective Testnet and sends INJ to another address. Built for the HackQuest India × Injective Co-Learning Camp #22.",
      bullets: [
        "Connects to Keplr on injective-888, shows the wallet address and the native INJ balance converted from base units.",
        "Builds a MsgSend, has Keplr sign it, broadcasts it and shows the transaction hash with an explorer link.",
        "No backend, database or authentication: the browser talks to a public Injective LCD node and the app never sees a private key.",
      ],
      technologies: ["TypeScript", "Next.js", "Injective SDK", "Keplr", "Cosmos SDK"],
      links: [
        {
          type: "Website",
          href: "https://injective-token-sender.vercel.app",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/cyberph3onix/injective-token-sender",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/projects/injective-token-sender.png",
    },
  ],
  achievements: [
    {
      title: "Hexafalls (MLH × Solana)",
      dates: "2026",
      location: "",
      description:
        "Solana Track Winner and 3rd Runner-up overall, with Doodle, an on-chain freelance marketplace with milestone escrow.",
      image: "/logos/hexafalls.webp",
      links: [
        {
          title: "Doodle",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/wolf1276/doodle-hexafalls",
        },
      ],
    },
    {
      title: "ISEA 2026 Hackathon",
      dates: "March 2026",
      location: "Indian Statistical Institute, Kolkata",
      description:
        "Winner. Built CRCS, a collusion-resistant zero-knowledge credential system for private identity verification.",
      image: "/logos/isea.webp",
      links: [],
    },
    {
      title: "Converge Ideathon",
      dates: "March 2026",
      location: "Kolkata, India",
      description:
        "Winner. Zero-knowledge proof based verification system for secure and private identity confirmation.",
      image: "/logos/converge.webp",
      links: [],
    },
    {
      title: "TCS TechDays Hackathon",
      dates: "September 28th, 2026",
      location: "",
      description: "Winner, Cybersecurity Track.",
      image: "/logos/tcs-techdays.webp",
      links: [],
    },
    {
      title: "Stellar Ambassador",
      dates: "Present",
      location: "Stellar Development Foundation",
      description: "Ambassador for the Stellar developer ecosystem.",
      image: "/logos/stellar.png",
      links: [],
    },
    {
      title: "Stellar Inner Circle",
      dates: "2026",
      location: "Stellar Buildstation, Kolkata",
      description: "Selected participant in the Stellar Inner Circle.",
      image: "/logos/stellar.png",
      links: [],
    },
    {
      title: "Smart Make-a-thon",
      dates: "September 6th - 7th, 2025",
      location: "Kolkata, India",
      description:
        "Built a browser extension that detects AI-generated content on the web and gives a confidence score. It runs locally in the browser for extra privacy.",
      image:
        "https://smf-smart-makeathon.devfolio.co/_next/image?url=https%3A%2F%2Fassets.devfolio.co%2Fhackathons%2Fe4b801dae041434e9656a41101a48550%2Fassets%2Ffavicon%2F873.jpeg&w=1024&q=75",
      links: [
        {
          title: "Devfolio",
          icon: <Icons.globe className="h-4 w-4" />,
          href: "https://smf-smart-makeathon.devfolio.co/overview",
        },
      ],
    },
  ],
} as const;
