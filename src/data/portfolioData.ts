export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  metrics: {
    label: string;
    value: string;
  }[];
  position: [number, number, number]; // 3D coordinates for Knowledge Graph
  links: {
    github?: string;
    blog?: string;
    demo?: string;
  };
  details: string[];
}

export interface TimelineStage {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  details: string;
}

export interface CommitExperience {
  id: string;
  role: string;
  company: string;
  period: string;
  branch: string;
  commitHash: string;
  achievements: string[];
  tech: string[];
}

export interface BlogPaper {
  id: string;
  title: string;
  authors: string;
  journal: string;
  date: string;
  readTime: string;
  abstract: string;
  slug: string;
}

export const projects: Project[] = [
  {
    id: "forge",
    title: "DYN-EYE",
    subtitle: "Autonomous Defect Discovery Pipeline",
    description: "An end-to-end self-improving visual inspection system. Uses YOLO for detecting known defects, DINOv2 and FAISS to filter novel anomalies, HDBSCAN to group them, and Gemini VLM to auto-label them, enabling automated closed-loop model retraining.",
    tech: ["LangGraph", "YOLOv8/v10/v11", "DINOv2 Embeddings", "FAISS Filter", "HDBSCAN", "Gemini VLM", "Python"],
    metrics: [
      { label: "Inspection Images", value: "137" },
      { label: "Review Reduction", value: "94%" },
      { label: "Cluster Cohesion", value: "0.80" }
    ],
    position: [-2.5, 1.5, 0],
    links: {
      github: "https://github.com/Ghnkrk",
      blog: "#research",
      demo: "#"
    },
    details: [
      "Led a team of 6 as Project & Tech Lead to deploy DYN-EYE, an autonomous anomaly discovery pipeline.",
      "Engineered a cache-aware closed-loop retraining workflow using dynamic VLM prompting to auto-label novel defect clusters.",
      "Reduced manual review units by 94% (103 novel crops down to 6 representative clusters) while maintaining structural model integrity."
    ]
  },
  {
    id: "autoagent",
    title: "AutoAgenticML",
    subtitle: "Agent-Driven ML Automation Framework",
    description: "A hierarchical multi-agent AutoML system (L0/L1/L2) orchestrating the end-to-end ML lifecycle—data ingestion, profiling, preprocessing, model selection, training, evaluation, and inference—with human-in-the-loop decision checkpoints.",
    tech: ["LangGraph", "FastAPI", "Docker", "scikit-learn", "Python"],
    metrics: [
      { label: "Multi-Agent System", value: "L0/L1/L2" },
      { label: "ML Pipeline Type", value: "Automated" },
      { label: "Classification Acc", value: "77.27%" }
    ],
    position: [2.5, 1.2, 0.5],
    links: {
      github: "https://github.com/Ghnkrk",
      demo: "#"
    },
    details: [
      "Designed a hierarchical multi-agent AutoML architecture for containerized deployment.",
      "Orchestrated dataset profiling, automatic scaling, model training, hyperparameter tuning, and container staging.",
      "Validated performance against benchmarks, securing high accuracy with zero manual parameter adjustments."
    ]
  },
  {
    id: "tinyllm",
    title: "TinyLLM",
    subtitle: "Autoregressive Transformer Training",
    description: "Built and trained a 2.75M-parameter decoder-only Transformer from scratch in PyTorch, implementing RoPE positional embeddings, SwiGLU feed-forward layers, and SentencePiece tokenization.",
    tech: ["PyTorch", "Weights & Biases", "SentencePiece", "Transformers", "Python"],
    metrics: [
      { label: "Total Parameters", value: "2.75M" },
      { label: "Validation Perplexity", value: "7.55" },
      { label: "Inference Throughput", value: "83.2 T/s" }
    ],
    position: [0, 2.5, -1],
    links: {
      github: "https://github.com/Ghnkrk",
      blog: "#"
    },
    details: [
      "Implemented low-level attention mechanisms, Rotary Positional Embeddings (RoPE), SwiGLU activation, and KV caching.",
      "Configured custom tokenizer vocabulary mapping using SentencePiece library.",
      "Tracked training runs on Weights & Biases to analyze loss convergence curves and gradient stability."
    ]
  },
  {
    id: "qsystem",
    title: "QSystem",
    subtitle: "Leakage-Aware Forecasting & Backtesting",
    description: "A hybrid machine learning quantitative trading pipeline integrating HMM regime detection, news sentiment analysis, and strict walk-forward validation to eliminate data leakage in noisy time-series environments.",
    tech: ["PyTorch", "HuggingFace", "hmmlearn", "CatBoost", "FAISS", "Python"],
    metrics: [
      { label: "Annualized Sharpe", value: "1.64" },
      { label: "Buy-Side Win Rate", value: "70%" },
      { label: "Max Drawdown", value: "0.06%" }
    ],
    position: [-1.8, -1.5, 0.8],
    links: {
      github: "https://github.com/Ghnkrk"
    },
    details: [
      "Built HMM-based regime detectors to identify shifts in market volatility.",
      "Integrated FinBERT models for semantic sentiment scoring of daily news pipelines.",
      "Engineered fee-aware temporal walk-forward backtesting, executing 18 simulated trades across 4,711 market intervals."
    ]
  },
  {
    id: "medcomply",
    title: "MedComply",
    subtitle: "Deterministic AI Compliance Engine",
    description: "A compliance assessment platform mapping healthcare organisation Standard Operating Procedures (SOPs) against National Accreditation Board for Hospitals (NABH) standards using Natural Language Inference (NLI).",
    tech: ["HuggingFace", "NLTK", "NLI", "FastAPI", "PostgreSQL", "Python"],
    metrics: [
      { label: "NABH Clauses", value: "10" },
      { label: "Structured Artifacts", value: "30+" },
      { label: "Compliance Scores", value: "25–85%" }
    ],
    position: [1.8, -1.8, -0.5],
    links: {
      github: "https://github.com/Ghnkrk",
      demo: "#"
    },
    details: [
      "Developed clause-level explainable analysis to cross-reference SOP documents with medical standards.",
      "Generated detailed gap-analysis reports containing 30+ automated compliance recommendation cards.",
      "Reduced manual auditing overhead by an estimated 70-90% for first-pass compliance checks."
    ]
  }
];

export const timelineStages: TimelineStage[] = [
  {
    id: "eee",
    title: "EEE",
    subtitle: "Electrical & Electronics Foundation",
    description: "Acquired core engineering analytical skills at Kumaraguru College of Technology.",
    details: "Built the foundation in signal processing, linear algebra, circuit analysis, and mathematics, which paved the way for deep neural network calculations."
  },
  {
    id: "cv",
    title: "Computer Vision",
    subtitle: "Spatial Features & Image Pipelines",
    description: "Evaluated facial pipelines and video activity classifiers.",
    details: "Trained violence detection networks (MultiViT-v2 + BiGRU) and worked on landmark-based facial quality-check filters to block low-quality video frames before recognition."
  },
  {
    id: "transformers",
    title: "Transformers",
    subtitle: "Low-level Network Architectures",
    description: "Coded self-attention modules and tokenization logic from scratch.",
    details: "Studied decoder-only designs, implementing RoPE positional embeddings, SwiGLU activations, and SentencePiece encoders in PyTorch."
  },
  {
    id: "llms",
    title: "LLMs",
    subtitle: "Prompting, Quantization & Fine-Tuning",
    description: "Structured medical compliance systems using NLP models.",
    details: "Analyzed model inference characteristics and worked with NLI methods, prompt parsing, and offline quantization profiles."
  },
  {
    id: "agentic",
    title: "Agentic AI",
    subtitle: "Multi-Agent Graphs & Decision Loops",
    description: "Built task orchestration engines using state-chart graphs.",
    details: "Engineered multi-agent AutoML frameworks using LangGraph, adding human-in-the-loop gateways and self-improving error feedback loops."
  },
  {
    id: "rag",
    title: "RAG",
    subtitle: "Context Ingestion & Retrieval Evaluation",
    description: "Conducted systematic sweeps of retrieval performance.",
    details: "Evaluated recursive/semantic chunking, dimensions of open-source embedding vectors (Nemotron, BGE), HNSW indexing, and reranker ROI."
  },
  {
    id: "systems",
    title: "AI Systems",
    subtitle: "Production Deployment & Retraining",
    description: "Deployed closed-loop pipelines with offline caching.",
    details: "Structured DYN-EYE's autonomous labelling and self-improving training loop, coordinating YOLO and VLMs inside production pipelines."
  }
];

export const commitExperiences: CommitExperience[] = [
  {
    id: "exp1",
    role: "Project & Tech Lead — Innovation Graduate Trainee",
    company: "Forge Innovation and Ventures",
    period: "Jan 2026 – Jun 2026",
    branch: "main",
    commitHash: "f07ge26",
    tech: ["LangGraph", "YOLOv8/v10/v11", "DINOv2", "FAISS", "HDBSCAN", "Gemini VLM", "Docker"],
    achievements: [
      "Led a team of 6 to build DYN-EYE, an autonomous anomaly discovery pipeline.",
      "Engineered cache-aware closed-loop retraining workflows, processing 137 industrial inspection images into 6 high-cohesion clusters.",
      "Reduced manual review requirements by 94% (from 103 novel defect crops down to 6 representative cluster nodes) using dynamic VLM prompting."
    ]
  },
  {
    id: "exp2",
    role: "Machine Learning Engineer Intern",
    company: "The Fusion Apps",
    period: "Jan 2025 – Sep 2025",
    branch: "feat/cv-pipelines",
    commitHash: "c0a2512",
    tech: ["PyTorch", "MultiViT-v2", "BiGRU", "YOLO", "ArcFace", "FastAPI"],
    achievements: [
      "Evaluated facial analysis pipelines including detection, recognition, enhancement, and automated quality assessment.",
      "Proposed a landmark-based facial quality-check layer to intercept blurry or low-light frames before recognition to reduce duplicates.",
      "Trained MultiViT-v2 + BiGRU architectures for temporal video violence detection and explored angular margin loss (ArcFace) adjustments."
    ]
  }
];

export const blogPapers: BlogPaper[] = [
  {
    id: "rag-trap",
    title: "The RAG Complexity Trap: Do More Components Actually Improve Retrieval Performance?",
    authors: "Guhankarthik A G",
    journal: "arXiv:2607.08942 [cs.IR]",
    date: "July 2026",
    readTime: "8 min read",
    abstract: "Modern RAG systems frequently incorporate complex layers such as rerankers, hybrid dense-sparse searches, query expansion, and fine-tuned HNSW indexing parameters. However, the marginal gains of these components are rarely evaluated. In this work, we conduct a systematic independent evaluation of each RAG component against a custom-generated dataset of 44 questions based on modern AI papers (Attention Is All You Need, FlashAttention, and Mixture of Experts). Our findings reveal that additional architectural complexity does not automatically correlate with higher accuracy. We demonstrate instances where semantic chunking degraded recall by 94% compared to simple recursive splitting, and where BM25 hybrid fusion introduced lexical noise, decreasing Precision@5. In contrast, scaling embedding dimensions via nvidia/llama-nemotron-embed-1b-v2 and adding a secondary reranking step yielded the highest Return-on-Investment (ROI) in retrieval metrics.",
    slug: "rag-trap"
  }
];

// Skills mapping for SkillsConstellation.tsx
export interface SkillNode {
  id: string;
  name: string;
  category: "languages" | "ai" | "frameworks" | "databases" | "infrastructure";
  connectedProjects: string[]; // project ids
}

export const skillNodes: SkillNode[] = [
  // Languages
  { id: "python", name: "Python", category: "languages", connectedProjects: ["forge", "autoagent", "tinyllm", "qsystem", "medcomply"] },
  { id: "cpp", name: "C++", category: "languages", connectedProjects: ["tinyllm"] },
  // AI/ML
  { id: "pytorch", name: "PyTorch", category: "ai", connectedProjects: ["tinyllm", "qsystem"] },
  { id: "transformers", name: "Transformers & LLMs", category: "ai", connectedProjects: ["tinyllm", "medcomply", "qsystem"] },
  { id: "finetuning", name: "LLM Fine-Tuning", category: "ai", connectedProjects: ["tinyllm"] },
  { id: "rag", name: "RAG Systems", category: "ai", connectedProjects: ["qsystem", "forge"] },
  { id: "agentic", name: "Agentic Systems (LangGraph)", category: "ai", connectedProjects: ["forge", "autoagent"] },
  { id: "computervision", name: "Computer Vision (YOLO)", category: "ai", connectedProjects: ["forge"] },
  // Frameworks
  { id: "fastapi", name: "FastAPI", category: "frameworks", connectedProjects: ["autoagent", "medcomply"] },
  { id: "scikitlearn", name: "scikit-learn", category: "frameworks", connectedProjects: ["autoagent"] },
  { id: "huggingface", name: "Hugging Face", category: "frameworks", connectedProjects: ["qsystem", "medcomply"] },
  { id: "wandb", name: "Weights & Biases", category: "frameworks", connectedProjects: ["tinyllm"] },
  // Databases
  { id: "postgresql", name: "PostgreSQL", category: "databases", connectedProjects: ["medcomply"] },
  { id: "faiss", name: "FAISS", category: "databases", connectedProjects: ["forge", "qsystem"] },
  { id: "qdrant", name: "Qdrant", category: "databases", connectedProjects: ["qsystem"] },
  // Infrastructure
  { id: "docker", name: "Docker", category: "infrastructure", connectedProjects: ["autoagent", "forge"] },
  { id: "linux", name: "Linux", category: "infrastructure", connectedProjects: ["forge", "autoagent"] },
  { id: "git", name: "Git", category: "infrastructure", connectedProjects: ["forge", "autoagent", "tinyllm", "qsystem", "medcomply"] }
];
