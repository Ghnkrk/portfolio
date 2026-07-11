The RAG Complexity Trap: Do More Components Actually Improve Retrieval Performance?

Modern RAG systems often include rerankers, hybrid retrieval, query rewriting, HNSW tuning, and many other components. But how many of these actually improve retrieval quality? I built a baseline RAG pipeline and evaluated each addition independently to measure its real impact on retrieval performance.
A proper experimentation to track the performance needs two important things. An evaluation groundtruth and a metric. Though groundtruth may not be available for all scenarios, we have LLM-as-a-Judge in those cases.
For my experiments, i created a small dataset using 3 scientific papers from arxiv namely - Attention is all you need, Flash Attention, Mixture of experts. I generated a small evaluation dataset using these papers which resulted in 44 sample questions, with designed bloom levels, golden chunks to verify the context from, and the quality of question-answer set is verified by a pair of generator and validator LLMs. 
For the baseline architecture, i chained up the parsing → chunking → embedding → vector store → retrieval → context + prompt → LLM → generation. The architectural details of the baseline are as follows:
Chunking → Recursive chunking with 512(baseline standard) window and no overlap.
Embedding model → BAAI/bge-base-en-v1.5
Vector Database - Qdrant docker → default HNSW params
Top-K → 5 
LLM provider → GROQ (llama-3.1–8b-instant)
I started evaluation as two parts - Retrieval and generation. For retrieval the metrics are Recall@k, Precision@k, Mean Reciprocal Rank (MRR), latency.
Chunking strategy:
First i started on chunking strategy which is very important in making the knowledge base intact relative to each other. I compared recursive and semantic chunking on the dataset i generated. These were the results : 
Recursive vs Semantic chunkingThough semantic chunking is considered to be higher performing than recursive, it's not the case for all scenarios. The reason for the drop of 0.66 to 0.04 is due to the nature of semantic chunking.
Semantic chunking merges the chunks until a valid semantic breakpoint is found. Research papers tend to have largely chained content which together have similar semantic representations. Thus creating very low chunk counts compared to recursive. Though the semantic chunks count can be controlled by varying semantic breakpoint threshold, it doesn't perform better than recursive in this case.
Thus chunking with recursive splitting is better when the source content would have dense semantic representation and semantic breakpoint is non-obvious.
As much as strategy used is important, the parameters of such strategy is also important. For recursive splitting, window size and overlapping is the main weighting features.
Here is a thorough sweep of possible combinations and their performance heatmaps on retrieval at various metrics : 
From the sweep, it is shown that a 512 token window with 128 overlap performs better than other combinations.
Note: These evaluations are not universally relative. These are ran against a small custom generated dataset. The performance may vary depending on source.
Embedding Model:
The next comes embedding model, which is the translator between the human language and the computer's language. There are countless embedding models out there which makes it difficult to pick one. But the pool can be easily downscaled if we look by various features like model size, provider, dimensions, modality, etc,.
For my experiments, i've chosen 4 models which are open source, open weights, consumer GPU friendly.
BAAI/bge-base-en-v1.5
BAAI/bge-large-en-v1.5
Qwen/Qwen3-Embedding-0.6B
nvidia/llama-nemotron-embed-1b-v2

The effects on retrieval by these models are below: 
nemotron-embed-1b seems to perform well above others having higher dimension than others. Though with a +100ms latency, the +0.9 in recall@5 is definitely the highest ROI here.

HNSW tuning:
HNSW - Hierarchical Navigable Small World is an Approximate Nearest Neighbour(ANN) search algorithm used by vector bases like Qdrant, Pinecone, Weaviate, etc,. 
Tuning the parameters of HNSW controls how the retrieval internals are worked to get the most relevant chunks among all the nodes in the database.
I tested the three parameters sequentially : search index sizing (hnsw_ef_search), index complexity (hnsw_m), and build depth (hnsw_ef_construct). The goal is to maximize Recall@5 while maintaining sub-millisecond retrieval query latency.
The metrics doesn't change a bit despite tuning the parameters. The reason behind this is, the HNSW tuning only starts to give varying results when the source contains large quantity of corpus and documents. Typically production-grade RAG systems have knowledge comprising of 100k+ to 1M+ documents. HNSW tuning gives visible ROI in such levels. For less than thousand documents, it's almost the same, not to mention just 3 documents.
Thus it is observed that HNSW tuning is useful only when source has very large number of dense corpus/ documents. Else the result remains the same no matter what parameters are changed.
Reranker and Top-k:
Similar to embedding models, there are reranker models whose purpose is to reorder the given ordered chunks in the order of their relevance to the query it was given.
I tested these reranking models :
BAAI/bge-reranker-base
nvidia/llama-nemotron-rerank-1b-v2

Bge reranker as its the go to baseline for experimentations. nemotron rernaker because of compatibility with same family embedding model being used. As expected nemotron 1b reranker performs well compared to bge reranker and without reranker as well. 
The next calibration is top-k coming into reranker and going out of reranker. For easy understanding we'll call them top-M and top-N. Top-M chunks returned from vectorDB and into reranker. Reranker returns Top-N chunks after reranking. Below is a sweep of all standard combinations and their metrics : 
From above metrics, top-20 over top-10 have small improvement in recall, though latency is more than doubled, in our experimentation case, run-time latency is negligible so i chose top-20 over top-10 for further experiments.
Hybrid retrieval:
Retrieval can be done on two types. Dense content and sparse content. Typical baseline RAG consists only of Dense retrieval as well as our experiments till now. Sparse retrieval consists of keyword retrieval.
BM-25 is a standard keyword retrieval method used widely. 
Production-grade RAG systems use hybrid retrieval which combines dense + keyword retrieval. We experimented dense and hybrid for our case by fusing dense and BM-25 using RRF(Reciprocal Rank Fusion). The metrics are as follow : 
The keyword retrieval seems to dilute the quality of dense context rather than improving it. It is mostly due to the corpus being too small and homogeneous (only 3 related AI papers). Dense retrieval already retrieved nearly all relevant chunks, leaving little complementary information for BM25. RRF therefore mostly introduced lexical noise instead of improving recall, resulting in a slight performance drop while adding extra retrieval overhead.
Thus in our case of trivially simple source which is of homogenically same domain, adding sparse retrieval dilutes the context resulting in degraded scores.
Benchmark:
I felt just using small custom dataset source alone is insufficient. So i wanted to use a industrial grade dataset to evaluate the retrieval performance at this stage. I used BeIR/scifact dataset to evaluate the retrieval at current stage with our experimented features. The metrics are below:
SciFact provides only a small set of annotated relevant documents per query (often 1–3), while dense retrieval returns the top-5 most semantically similar documents. Many retrieved documents are semantically related but are not labeled as relevant in the ground truth, reducing Precision@5 despite achieving high Recall and Hit Rate.

Generation:
Next comes generation. I used Ragas for LLM generation evaluation. It uses LLM-as-a-Judge evaluation as standard framework.
I tested the current pipeline with Ragas on our custom dataset and these were the results:
The generation seems to work really work well given our source is homogenous and small. Actual evaluation metrics not necessarily be as high as 1.0, but that doesn't mean they're bad. 
The unspoken rule of ML is when a model gives 100% you're making a mistake somewhere. Here it's because of the nature of our source not being wide in variety.
The other RAG engineering experimentations like Query rewriting, Context engineering, Prompt engineering, etc - couldn't possibly make much difference given the baseline right now itself has reached 0.95+ in metrics.
The biggest takeaway wasn't whether rerankers, hybrid retrieval, or HNSW tuning are inherently good or bad. It was that every component has a cost, and that cost must be justified through evaluation rather than assumptions. Across these experiments, some additions produced measurable gains, others had negligible impact, and some even degraded retrieval quality. More components did not necessarily translate to a better RAG system. In the end, systematic evaluation proved far more valuable than architectural complexity.
