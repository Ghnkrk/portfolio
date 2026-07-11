import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Calendar, Clock, X, ArrowUpRight } from "lucide-react";
import { blogPapers } from "../../data/portfolioData";
import type { BlogPaper } from "../../data/portfolioData";

export const ArxivBlogs: React.FC = () => {
  const [selectedPaper, setSelectedPaper] = useState<BlogPaper | null>(null);
  const [activeLightboxImage, setActiveLightboxImage] = useState<string | null>(null);

  const openReader = (paper: BlogPaper) => {
    setSelectedPaper(paper);
  };

  const closeReader = () => {
    setSelectedPaper(null);
  };

  // Local card mouse coordinate tracker for reflections
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    e.currentTarget.style.setProperty("--mouse-x", `${x}%`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}%`);
  };

  // Reusable inline research paper image loader with clickable lightbox trigger
  const PaperImage: React.FC<{ src: string; alt: string; caption?: React.ReactNode; maxH?: string }> = ({ 
    src, 
    alt, 
    caption,
    maxH = "max-h-64"
  }) => {
    return (
      <div className="border border-white/5 bg-black/40 rounded-xl p-4 flex flex-col items-center space-y-2 select-none my-4">
        <img
          src={src}
          alt={alt}
          className={`${maxH} object-contain opacity-90 hover:opacity-100 transition-opacity rounded-lg border border-white/10 cursor-zoom-in`}
          onClick={() => setActiveLightboxImage(src)}
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
        {caption && (
          <div className="text-[10px] font-mono text-center text-white/50 leading-tight max-w-lg">
            {caption}
          </div>
        )}
      </div>
    );
  };

  return (
    <section id="research" className="relative max-w-5xl mx-auto px-6 py-16 md:py-28 select-none">
      
      {/* Module Title */}
      <div className="mb-16 text-center md:text-left">
        <div className="text-xs font-mono text-accent-cyan tracking-wider uppercase mb-1">
          Module // Research // arXiv_Papers
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight font-sans">
          Scientific Explorations & Papers
        </h2>
        <div className="h-[1px] w-24 bg-gradient-to-r from-accent-cyan to-transparent mt-2 mx-auto md:mx-0" />
      </div>

      {/* Blog Cards List */}
      <div className="space-y-6">
        {blogPapers.map((paper, idx) => (
          <motion.div
            key={paper.id}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="relative glass-panel rounded-2xl p-6 md:p-8 card-reflection overflow-hidden group"
            onMouseMove={handleMouseMove}
          >
            {/* arXiv Stamp Header */}
            <div className="flex flex-wrap items-center justify-between font-mono text-[10px] text-white/40 border-b border-white/5 pb-3 mb-4 gap-2">
              <div className="flex items-center space-x-2">
                <FileText className="w-3.5 h-3.5 text-accent-cyan" />
                <span className="font-bold text-accent-cyan">{paper.journal}</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="flex items-center"><Calendar className="w-3 h-3 mr-1" /> {paper.date}</span>
                <span className="flex items-center"><Clock className="w-3 h-3 mr-1" /> {paper.readTime}</span>
              </div>
            </div>

            {/* Paper Title */}
            <h3 className="text-base md:text-lg font-bold text-white font-serif tracking-tight leading-snug group-hover:text-accent-cyan transition-colors">
              {paper.title}
            </h3>

            {/* Authors */}
            <div className="font-serif italic text-xs text-secondary/80 mt-1">
              {paper.authors}
            </div>

            {/* Abstract preview */}
            <div className="mt-3 space-y-1">
              <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-secondary/60">Abstract:</span>
              <p className="text-xs text-secondary/70 leading-relaxed font-sans line-clamp-3">
                {paper.abstract}
              </p>
            </div>

            {/* Footer triggers */}
            <div className="mt-5 flex justify-end">
              <button
                onClick={() => openReader(paper)}
                className="flex items-center space-x-1 py-1.5 px-3 bg-white/5 border border-white/5 rounded-lg text-[10px] font-mono text-white hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer"
              >
                <span>READ FULL ARTICLE</span>
                <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* LaTeX LaTeX arXiv Reader Window (AnimatePresence Overlay) */}
      <AnimatePresence>
        {selectedPaper && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-[200] overflow-y-auto pointer-events-auto p-4 sm:p-6 md:p-10 flex justify-center"
            data-lenis-prevent
          >
            {/* Paper Container (arXiv style) */}
            <motion.div
              initial={{ scale: 0.95, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 30 }}
              transition={{ type: "spring", damping: 30, stiffness: 200 }}
              className="relative w-full max-w-4xl bg-[#09090b] border border-white/10 shadow-2xl rounded-2xl p-6 md:p-12 text-[#e4e4e7] overflow-hidden select-text flex flex-col font-serif"
            >
              
              {/* LaTeX Header Controls */}
              <div className="absolute top-4 right-4 z-50 flex items-center space-x-2 pointer-events-auto">
                <button
                  onClick={closeReader}
                  className="p-1.5 bg-white/5 border border-white/10 rounded-lg text-secondary hover:text-white hover:bg-white/10 transition-all cursor-pointer"
                  title="Close Paper"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* PDF Header bar */}
              <div className="border-b border-white/5 pb-4 mb-6 font-mono text-[9px] text-white/30 flex justify-between items-center select-none">
                <span>arXiv Document Reader v1.0.1</span>
                <span>STATUS: SECURE_FETCH_OK</span>
              </div>

              {/* Full Scrollable LaTeX Paper Body */}
              <div 
                className="flex-1 overflow-y-auto pr-1 md:pr-4 space-y-8 font-serif leading-relaxed text-sm text-secondary/90 antialiased selection:bg-accent-blue/30 max-h-[85vh]"
                data-lenis-prevent
              >
                
                {/* Paper Front Matter */}
                <div className="text-center space-y-4 pb-6 border-b border-white/5">
                  <span className="font-mono text-[10px] tracking-widest text-accent-cyan font-bold uppercase select-none block">
                    arXiv Research Preprint
                  </span>
                  <h1 className="text-xl md:text-3xl font-bold text-white tracking-tight leading-tight max-w-2xl mx-auto">
                    {selectedPaper.title}
                  </h1>
                  <div className="text-sm font-semibold text-white/90">
                    {selectedPaper.authors}
                  </div>
                  <div className="text-xs text-white/40 font-mono">
                    Department of Electrical and Electronics Engineering<br />
                    Kumaraguru College of Technology, Coimbatore, India
                  </div>
                </div>

                {/* Abstract Section */}
                <div className="bg-white/[0.01] border border-white/5 rounded-xl p-5 font-sans leading-relaxed text-xs">
                  <h4 className="font-mono text-[10px] font-bold text-white uppercase tracking-wider mb-2 select-none">
                    Abstract
                  </h4>
                  <p className="italic text-secondary/90">
                    {selectedPaper.abstract}
                  </p>
                </div>

                {/* 1. INTRODUCTION */}
                <div className="space-y-3 font-serif">
                  <h3 className="text-base font-bold text-white tracking-tight border-b border-white/5 pb-1">
                    1. Introduction
                  </h3>
                  <p>
                    Modern Retrieval-Augmented Generation (RAG) systems have witnessed a significant inflation in structural complexity. Standard configurations now routinely layer multiple processing steps—including query rewrites, semantic splitters, dual dense-sparse vector storage, cross-attention reranking, and fine-tuned graph index structures. While these expansions are frequently motivated by hypothetical performance improvements, their empirical validation is rarely conducted in isolated settings.
                  </p>
                  <p>
                    In this work, we dissect the RAG complexity trajectory. We establish a strict baseline system and evaluate the isolated impact of each component. Our evaluations analyze the trade-off curves of key performance indicators (Recall@5, Precision@5, Mean Reciprocal Rank, and latency profiles).
                  </p>
                </div>

                {/* 2. BASELINE DESIGN */}
                <div className="space-y-3">
                  <h3 className="text-base font-bold text-white tracking-tight border-b border-white/5 pb-1">
                    2. Baseline Experimental Architecture
                  </h3>
                  <p>
                    Our baseline system follows a linear chain: document parsing, standard recursive chunking (512 token window, 0 overlap), embedding vector generation, indexing inside a local vector database, Top-5 retrieval, and prompt injection inside a Groq-hosted Llama-3.1-8B-Instant LLM.
                  </p>
                  <p>
                    The evaluation dataset comprises 44 specialized question-answer sets designed across Bloom's taxonomy levels. The source corpus is constructed from three seminal research preprints: <i>Attention Is All You Need</i>, <i>FlashAttention</i>, and <i>Mixture of Experts</i>. Ground-truth relevance links are verified using validator-generator LLM pairs.
                  </p>
                </div>

                {/* 3. CHUNKING CALIBRATION */}
                <div className="space-y-3">
                  <h3 className="text-base font-bold text-white tracking-tight border-b border-white/5 pb-1">
                    3. Chunking Calibration: Recursive vs. Semantic Splitting
                  </h3>
                  <p>
                    We compared standard recursive chunking against semantic-similarity based splitting. While semantic splitting is theoretically superior as it isolates coherent ideas, our tests showed a significant drop in retrieval indicators in this setup.
                  </p>
                  
                  {/* Figure 1 */}
                  <PaperImage
                    src="/images/recursiveVSsemantic.png"
                    alt="Recursive vs Semantic Chunking performance"
                    caption={
                      <>
                        <b>Figure 1:</b> Evaluation characteristics of Recursive vs Semantic chunking. Semantic chunking resulted in massive chunks containing highly chained academic text, degrading recall metrics.
                      </>
                    }
                  />

                  <p>
                    The primary driver behind this degradation is the nature of academic research papers. These documents feature highly chained arguments, which cause semantic similarity calculators to merge extensive paragraphs together. The resulting oversized blocks (often 1500+ tokens) reduce the resolution of the vector space compared to precise 512-token recursive splits.
                  </p>

                  <p>
                    For recursive splitting, window size and overlapping is the main weighting features. Below is a sweep of possible combinations and their performance and latency heatmaps:
                  </p>

                  {/* Figure 2 & 3 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4 select-none">
                    <div className="border border-white/5 bg-black/40 rounded-xl p-4 flex flex-col items-center space-y-2">
                      <img
                        src="/images/recallANDmrrOfChunkParams.png"
                        alt="Recall and MRR of Chunk Parameters"
                        className="max-h-48 object-contain opacity-90 hover:opacity-100 transition-opacity rounded border border-white/10 cursor-zoom-in"
                        onClick={() => setActiveLightboxImage("/images/recallANDmrrOfChunkParams.png")}
                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                      />
                      <div className="text-[10px] font-mono text-center text-white/50 leading-tight mt-2">
                        <b>Figure 2:</b> Retrieval Recall@5 and MRR metrics heatmap for varying window sizes and overlaps.
                      </div>
                    </div>
                    <div className="border border-white/5 bg-black/40 rounded-xl p-4 flex flex-col items-center space-y-2">
                      <img
                        src="/images/latencyOfChunkParams.png"
                        alt="Latency of Chunk Parameters"
                        className="max-h-48 object-contain opacity-90 hover:opacity-100 transition-opacity rounded border border-white/10 cursor-zoom-in"
                        onClick={() => setActiveLightboxImage("/images/latencyOfChunkParams.png")}
                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                      />
                      <div className="text-[10px] font-mono text-center text-white/50 leading-tight mt-2">
                        <b>Figure 3:</b> Retrieval latency profile across chunking parameter sweeps.
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4. EMBEDDING TRANSLATION */}
                <div className="space-y-3">
                  <h3 className="text-base font-bold text-white tracking-tight border-b border-white/5 pb-1">
                    4. Embedding Model Dimensional Sensitivity
                  </h3>
                  <p>
                    Embedding models act as translators mapping unstructured texts to numerical vector coords. We benchmarked four open-source models: BGE-base (768d), BGE-large (1024d), Qwen-Embedding-0.6B (1536d), and llama-nemotron-embed-1b-v2 (4096d).
                  </p>

                  {/* Figure 4 */}
                  <PaperImage
                    src="/images/embeddingModels.png"
                    alt="Embedding Models recall sweep"
                    caption={
                      <>
                        <b>Figure 4:</b> Retrieval Recall@5 sweep across open-source embedding models. Nemotron-Embed-1b-v2 (4096 dimensions) achieved the highest recall at +0.09.
                      </>
                    }
                  />

                  <p>
                    As illustrated in Figure 4, the high-dimensional llama-nemotron-embed-1b-v2 model outclassed other candidates, registering a +0.09 improvement in Recall@5. Despite a moderate latency overhead of approximately 100ms, the return on investment in retrieval accuracy was highly significant.
                  </p>
                </div>

                {/* 5. HNSW INDEX TUNING */}
                <div className="space-y-3">
                  <h3 className="text-base font-bold text-white tracking-tight border-b border-white/5 pb-1">
                    5. Hierarchical Navigable Small World (HNSW) Calibration
                  </h3>
                  <p>
                    We tested Qdrant HNSW indexing parameters: index search depth (hnsw_ef_search), linkage complexity (hnsw_m), and index build complexity (hnsw_ef_construct).
                  </p>

                  {/* Figure 5 (Multi Image Grid) */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4 select-none">
                    <div className="border border-white/5 bg-black/40 rounded-xl p-3 flex flex-col items-center space-y-1">
                      <img
                        src="/images/hnsw_ef_search.png"
                        alt="hnsw_ef_search"
                        className="max-h-28 object-contain opacity-90 hover:opacity-100 transition-opacity rounded border border-white/10 cursor-zoom-in"
                        onClick={() => setActiveLightboxImage("/images/hnsw_ef_search.png")}
                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                      />
                      <span className="text-[8px] font-mono text-white/40">ef_search calibration</span>
                    </div>
                    <div className="border border-white/5 bg-black/40 rounded-xl p-3 flex flex-col items-center space-y-1">
                      <img
                        src="/images/hnsw_m.png"
                        alt="hnsw_m"
                        className="max-h-28 object-contain opacity-90 hover:opacity-100 transition-opacity rounded border border-white/10 cursor-zoom-in"
                        onClick={() => setActiveLightboxImage("/images/hnsw_m.png")}
                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                      />
                      <span className="text-[8px] font-mono text-white/40">linkage complexity (M)</span>
                    </div>
                    <div className="border border-white/5 bg-black/40 rounded-xl p-3 flex flex-col items-center space-y-1">
                      <img
                        src="/images/hnsw_ef_construct.png"
                        alt="hnsw_ef_construct"
                        className="max-h-28 object-contain opacity-90 hover:opacity-100 transition-opacity rounded border border-white/10 cursor-zoom-in"
                        onClick={() => setActiveLightboxImage("/images/hnsw_ef_construct.png")}
                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                      />
                      <span className="text-[8px] font-mono text-white/40">ef_construct calibration</span>
                    </div>
                  </div>
                  <div className="text-[10px] font-mono text-center text-white/50 leading-tight mb-4">
                    <b>Figure 5:</b> Relative query performance across HNSW parameter calibrations. Under small corpus sizes, Approximate Nearest Neighbor (ANN) index partitions default to exact linear sweeps, yielding constant recall lines.
                  </div>

                  <p>
                    Tuning these parameters showed zero impact on retrieval accuracy. HNSW tuning behaves as an asymptotic efficiency curve that only yields results when document volumes exceed 100k+ records. For small collections (e.g. 3 source papers), approximate search degrades to exact flat search, rendering parameter tweaks redundant.
                  </p>
                </div>

                {/* 6. RERANKING ANALYSIS */}
                <div className="space-y-3">
                  <h3 className="text-base font-bold text-white tracking-tight border-b border-white/5 pb-1">
                    6. Reranker Calibration: Top-M / Top-N Sweep
                  </h3>
                  <p>
                    Reranker models recalculate the similarity match of the query against candidate vectors using cross-attention mechanisms. We compared BGE-reranker-base and llama-nemotron-rerank-1b-v2.
                  </p>

                  {/* Figure 6 & 7 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4 select-none">
                    <div className="border border-white/5 bg-black/40 rounded-xl p-4 flex flex-col items-center space-y-2">
                      <img
                        src="/images/rerankers.png"
                        alt="Reranker Comparison"
                        className="max-h-48 object-contain opacity-90 hover:opacity-100 transition-opacity rounded border border-white/10 cursor-zoom-in"
                        onClick={() => setActiveLightboxImage("/images/rerankers.png")}
                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                      />
                      <div className="text-[10px] font-mono text-center text-white/50 leading-tight mt-2">
                        <b>Figure 6:</b> Reranking model performance comparisons (BGE-Reranker vs Llama-Nemotron-Rerank).
                      </div>
                    </div>
                    <div className="border border-white/5 bg-black/40 rounded-xl p-4 flex flex-col items-center space-y-2">
                      <img
                        src="/images/topN-topM.png"
                        alt="Top M vs Top N Sweep"
                        className="max-h-48 object-contain opacity-90 hover:opacity-100 transition-opacity rounded border border-white/10 cursor-zoom-in"
                        onClick={() => setActiveLightboxImage("/images/topN-topM.png")}
                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                      />
                      <div className="text-[10px] font-mono text-center text-white/50 leading-tight mt-2">
                        <b>Figure 7:</b> Performance matrix sweep mapping candidate vector generation (Top-M) to cross-attention output counts (Top-N).
                      </div>
                    </div>
                  </div>

                  <p>
                    The cross-attention model Nemotron-1B reranker outperformed BGE and the un-reranked baseline. In our sweep of standard configurations, routing 20 candidates (Top-M) into the cross-attention block and extracting 5 nodes (Top-N) provided the optimal recall and precision metrics.
                  </p>
                </div>

                {/* 7. HYBRID RETRIEVAL AND DILUTION */}
                <div className="space-y-3">
                  <h3 className="text-base font-bold text-white tracking-tight border-b border-white/5 pb-1">
                    7. Hybrid Ingestion: Dense Vector and BM25 Dilution
                  </h3>
                  <p>
                    Hybrid retrieval fuses semantic dense vectors with sparse keyword frequencies (BM25) using Reciprocal Rank Fusion (RRF). Our experiments showed that hybrid retrieval actually degraded retrieval quality by introducing lexical noise.
                  </p>

                  {/* Figure 8 */}
                  <PaperImage
                    src="/images/denseVsHybrid.png"
                    alt="Dense vs Hybrid BM25 Dilution"
                    caption={
                      <>
                        <b>Figure 8:</b> Recall and Precision differences between Dense-only retrieval and BM25 RRF Hybrid fusion. Overlapping vocabulary creates lexical noise, reducing overall Precision.
                      </>
                    }
                  />

                  <p>
                    Since our custom corpus was highly homogeneous (three closely related machine learning papers), dense retrieval was already capable of capturing matching semantic nodes. Introducing BM25 keyword matching diluted the context with overlapping vocabulary, leading to lexical noise and a drop in Precision@5.
                  </p>
                </div>

                {/* 8. SCIFACT BENCHMARK */}
                <div className="space-y-3">
                  <h3 className="text-base font-bold text-white tracking-tight border-b border-white/5 pb-1">
                    8. SciFact Benchmark Validation
                  </h3>
                  <p>
                    To validate our pipeline on an industrial-grade dataset, we evaluated it against the BeIR/SciFact dataset.
                  </p>

                  {/* Figure 9 */}
                  <PaperImage
                    src="/images/sciFactMetric.png"
                    alt="SciFact Benchmark Performance"
                    caption={
                      <>
                        <b>Figure 9:</b> SciFact Benchmark evaluations. Recall rates maintain stability while Precision@5 drops due to sparse positive annotations.
                      </>
                    }
                  />

                  <p>
                    SciFact highlights a key challenge: it contains very few ground-truth annotations per question (often 1-3 documents). Although our dense retriever successfully pulled semantically related documents, they were marked as false positives in the ground truth, resulting in a lower Precision@5 despite high recall metrics.
                  </p>
                </div>

                {/* 9. GENERATION */}
                <div className="space-y-3">
                  <h3 className="text-base font-bold text-white tracking-tight border-b border-white/5 pb-1">
                    9. Generation Performance
                  </h3>
                  <p>
                    We used Ragas for LLM generation evaluation, utilising the LLM-as-a-Judge framework as our metric model.
                  </p>

                  {/* Figure 10 */}
                  <PaperImage
                    src="/images/ragasMetric.png"
                    alt="Ragas Generation Metrics"
                    caption={
                      <>
                        <b>Figure 10:</b> Ragas LLM-as-a-Judge generation metrics (Faithfulness, Answer Relevance, Context Recall).
                      </>
                    }
                  />

                  <p>
                    The generation seems to work really work well given our source is homogenous and small. The other RAG engineering experimentations like Query rewriting, Context engineering, Prompt engineering, etc - could not possibly make much difference given the baseline right now itself has reached 0.95+ in metrics.
                  </p>
                </div>

                {/* 10. CONCLUSION */}
                <div className="space-y-3 pb-8">
                  <h3 className="text-base font-bold text-white tracking-tight border-b border-white/5 pb-1">
                    10. Conclusions and Key Takeaways
                  </h3>
                  <p>
                    The principal lesson from these experiments is that <b>architectural complexity does not automatically yield search improvement</b>. Adding components such as semantic splitters or hybrid BM25 pipelines without testing can lead to performance degradation. Every addition introduces processing costs that must be validated empirically rather than assumed. Systematic validation remains far more important than architectural complexity.
                  </p>
                </div>

                {/* Reference list */}
                <div className="border-t border-white/5 pt-4 font-mono text-[9px] text-white/40 space-y-1 select-none">
                  <div>[1] Vaswani, et al. "Attention Is All You Need." NeurIPS 2017.</div>
                  <div>[2] Dao, Tri. "FlashAttention: Fast and Memory-Efficient Exact Attention." NeurIPS 2022.</div>
                  <div>[3] Shazeer, Noam, et al. "Outrageously Large Neural Networks: The Sparsely-Gated Mixture-of-Experts Layer." arXiv 2017.</div>
                  <div>[4] Thakur, Nandan, et al. "BEIR: A Heterogeneous Benchmark for Systematic Evaluation of Information Retrieval Models." arXiv 2021.</div>
                </div>

              </div>
              
              {/* LaTeX citation footer */}
              <div className="mt-6 border-t border-white/5 pt-4 flex justify-between items-center text-[10px] font-mono text-white/30 select-none">
                <span>Published: July 2026</span>
                <span>arXiv:2607.08942 [cs.IR]</span>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox modal overlay for detailed image analysis */}
      <AnimatePresence>
        {activeLightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveLightboxImage(null)}
            className="fixed inset-0 bg-black/90 z-[300] flex items-center justify-center p-4 cursor-zoom-out select-none"
            data-lenis-prevent
          >
            <button
              onClick={() => setActiveLightboxImage(null)}
              className="absolute top-4 right-4 p-2 bg-white/10 rounded-full text-white hover:bg-white/20 transition-all cursor-pointer border border-white/10"
              title="Close Image View"
            >
              <X className="w-5 h-5" />
            </button>
            
            <motion.img
              initial={{ scale: 0.92 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.92 }}
              src={activeLightboxImage}
              alt="Enlarged research chart"
              className="max-w-full max-h-[85vh] object-contain rounded-xl border border-white/15 shadow-neon-glow"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
export default ArxivBlogs;
