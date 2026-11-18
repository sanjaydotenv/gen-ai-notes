import React from "react";
import CodeBlock from "../../components/CodeBlock";

const HybridSearch = () => {
  return (
    <div className="space-y-8 text-[#E3E3E3]">
      {/* Header */}
      <div className="space-y-2">
        <p className="text-sm font-semibold tracking-widest text-[#FC6C26]">
          ADVANCED RAG / 01
        </p>
        <h1 className="text-3xl font-bold">Hybrid Search</h1>
        <p className="text-[#aaa] leading-7">
          Hybrid Search combines Keyword Search and Semantic Search to retrieve
          relevant documents using both exact word matching and meaning-based
          matching.
        </p>
      </div>

      {/* 1 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          1. What is Hybrid Search?
        </h2>
        <p className="text-[#aaa] leading-7">
          Hybrid Search is a retrieval technique that combines two search
          methods:
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-white/10 bg-[#1A1A1A] p-4 space-y-2">
            <h3 className="font-semibold text-white">Keyword Search</h3>
            <p className="text-sm text-[#aaa]">
              Finds documents by matching exact words or related terms.
            </p>
            <p className="text-sm text-green-400">
              Example: Searching for "Node.js"
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-[#1A1A1A] p-4 space-y-2">
            <h3 className="font-semibold text-white">Semantic Search</h3>
            <p className="text-sm text-[#aaa]">
              Finds documents based on meaning and contextual similarity.
            </p>
            <p className="text-sm text-green-400">
              Example: "JavaScript runtime environment"
            </p>
          </div>
        </div>

        <p className="text-[#aaa] leading-7">
          Hybrid Search combines their results so that the retriever can find
          documents through both exact keyword matches and semantic
          relationships.
        </p>
      </section>

      {/* 2 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          2. Why Do We Need Hybrid Search?
        </h2>

        <p className="text-[#aaa] leading-7">
          Keyword Search and Semantic Search have different strengths and
          weaknesses.
        </p>

        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full text-sm text-left">
            <thead className="bg-white/[0.05] text-white">
              <tr>
                <th className="p-3">Search Type</th>
                <th className="p-3">Strength</th>
                <th className="p-3">Limitation</th>
              </tr>
            </thead>
            <tbody className="text-[#aaa]">
              <tr className="border-t border-white/10">
                <td className="p-3 text-white">Keyword</td>
                <td className="p-3">Exact words, IDs, names</td>
                <td className="p-3">May miss different wording</td>
              </tr>
              <tr className="border-t border-white/10">
                <td className="p-3 text-white">Semantic</td>
                <td className="p-3">Meaning and context</td>
                <td className="p-3">May miss exact identifiers</td>
              </tr>
              <tr className="border-t border-white/10">
                <td className="p-3 text-white">Hybrid</td>
                <td className="p-3">Combines both strengths</td>
                <td className="p-3">Needs score or rank fusion</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 space-y-2">
          <p className="font-semibold text-white">Example</p>
          <p className="text-sm text-[#aaa]">Suppose a user searches:</p>
          <p className="text-green-400">
            "How does Node.js handle asynchronous operations?"
          </p>
          <ul className="list-disc pl-5 text-sm text-[#aaa] space-y-1">
            <li>
              Keyword Search can find documents containing "Node.js" and
              "asynchronous".
            </li>
            <li>
              Semantic Search can find documents discussing the Event Loop,
              non-blocking I/O, and callbacks.
            </li>
            <li>Hybrid Search combines both result sets.</li>
          </ul>
        </div>
      </section>

      {/* 3 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          3. How Hybrid Search Works
        </h2>

        <p className="text-[#aaa] leading-7">
          Hybrid Search sends the same query to two different retrieval systems
          and then combines their results.
        </p>

        <CodeBlock
          language="text"
          code={`                 User Query
                      |
             "Explain Node.js Event Loop"
                      |
              +-------+-------+
              |               |
              v               v
         Keyword Search   Semantic Search
              |               |
              v               v
          BM25 Results    Vector Results
              |               |
              +-------+-------+
                      |
                      v
                Result Fusion
                      |
                      v
               Ranked Documents
                      |
                      v
                Top-K Results
                      |
                      v
                 LLM Context
                      |
                      v
                 Final Answer`}
        />

        <div className="space-y-2">
          <h3 className="font-semibold text-white">Step-by-step process</h3>
          <ol className="list-decimal pl-5 space-y-2 text-[#aaa]">
            <li>User submits a search query.</li>
            <li>Keyword Search retrieves documents using word matching.</li>
            <li>Semantic Search retrieves documents using embeddings.</li>
            <li>Both result sets are combined using a fusion technique.</li>
            <li>
              Documents are ranked and the most relevant results are selected.
            </li>
            <li>Selected documents are passed to the LLM as context.</li>
          </ol>
        </div>
      </section>

      {/* 4 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          4. Keyword Search with BM25
        </h2>

        <p className="text-[#aaa] leading-7">
          BM25 (Best Matching 25) is a ranking algorithm used in information
          retrieval. It ranks documents based on how well their terms match the
          search query.
        </p>

        <p className="text-[#aaa] leading-7">BM25 considers factors such as:</p>

        <ul className="list-disc pl-5 space-y-2 text-[#aaa]">
          <li>
            <strong className="text-white">Term Frequency (TF):</strong> How
            often a query word appears in a document.
          </li>
          <li>
            <strong className="text-white">
              Inverse Document Frequency (IDF):
            </strong>{" "}
            How rare or informative a word is across the document collection.
          </li>
          <li>
            <strong className="text-white">Document Length:</strong> Adjusts for
            the length of a document.
          </li>
        </ul>

        <CodeBlock
          language="text"
          code={`Query: "Node.js Event Loop"

Documents:

Document A:
"Node.js uses an Event Loop to handle asynchronous operations."

Document B:
"Python uses an event-driven programming model."

Document C:
"Node.js is a JavaScript runtime."

BM25:
- Matches query terms
- Calculates relevance scores
- Returns ranked documents`}
        />

        <p className="text-sm text-[#aaa]">
          BM25 is a lexical retrieval method. It does not understand meaning
          like an embedding-based search system.
        </p>
      </section>

      {/* 5 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          5. Combining Search Results
        </h2>

        <p className="text-[#aaa] leading-7">
          Keyword Search and Semantic Search produce separate result lists. We
          need a technique to combine them into one ranked list.
        </p>

        <h3 className="font-semibold text-white">
          Reciprocal Rank Fusion (RRF)
        </h3>

        <p className="text-[#aaa] leading-7">
          RRF combines results using their positions (ranks) in different result
          lists instead of directly comparing their raw scores.
        </p>

        <CodeBlock
          language="text"
          code={`RRF Score Formula:

              1
RRF(d) = ---------
          k + rank(d)

For multiple result lists:

                   1
RRF(d) =  Sum  -----------
                 k + rank(d)

Where:
- d    = Document
- k    = Constant, commonly 60
- rank = Position of document in a result list`}
        />

        <p className="text-[#aaa] leading-7">
          A document appearing near the top of multiple result lists receives a
          higher combined score.
        </p>

        <div className="rounded-xl border border-white/10 bg-[#1A1A1A] p-4 space-y-3">
          <h3 className="font-semibold text-white">Example</h3>

          <div className="grid md:grid-cols-2 gap-3">
            <div className="rounded-lg bg-white/[0.03] p-3">
              <p className="text-sm text-[#FC6C26] font-semibold mb-2">
                Keyword Results
              </p>
              <p className="text-sm text-[#aaa]">1. Document A</p>
              <p className="text-sm text-[#aaa]">2. Document B</p>
              <p className="text-sm text-[#aaa]">3. Document C</p>
            </div>

            <div className="rounded-lg bg-white/[0.03] p-3">
              <p className="text-sm text-[#FC6C26] font-semibold mb-2">
                Semantic Results
              </p>
              <p className="text-sm text-[#aaa]">1. Document B</p>
              <p className="text-sm text-[#aaa]">2. Document A</p>
              <p className="text-sm text-[#aaa]">3. Document D</p>
            </div>
          </div>

          <p className="text-sm text-[#aaa]">
            Documents A and B appear in both lists, so RRF combines their ranks
            to calculate their final scores. The final order depends on the
            calculated scores.
          </p>
        </div>
      </section>

      {/* 6 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          6. Weighted Score Fusion
        </h2>

        <p className="text-[#aaa] leading-7">
          Another approach is Weighted Score Fusion. It combines the scores from
          Keyword Search and Semantic Search using configurable weights.
        </p>

        <CodeBlock
          language="text"
          code={`Final Score =
    (Keyword Score × Keyword Weight)
  + (Semantic Score × Semantic Weight)

Example:

Keyword Weight  = 0.4
Semantic Weight = 0.6

Keyword Score   = 0.80
Semantic Score  = 0.90

Final Score =
    (0.80 × 0.4) + (0.90 × 0.6)

Final Score = 0.86`}
        />

        <p className="text-[#aaa] leading-7">
          Important: Raw scores from different search systems may use different
          scales. They should be normalized or calibrated before combining them
          directly.
        </p>

        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <p className="font-semibold text-white mb-2">
            RRF vs Weighted Fusion
          </p>
          <ul className="list-disc pl-5 text-sm text-[#aaa] space-y-2">
            <li>
              <strong className="text-white">RRF:</strong> Combines document
              ranks. It does not require raw scores to share the same scale.
            </li>
            <li>
              <strong className="text-white">Weighted Fusion:</strong> Combines
              numerical scores using weights. Score normalization may be
              necessary.
            </li>
          </ul>
        </div>
      </section>

      {/* 7 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          7. Hybrid Search in LangChain
        </h2>

        <p className="text-[#aaa] leading-7">
          In LangChain, we can create separate retrievers for keyword-based and
          vector-based search, then combine their results.
        </p>

        <p className="text-[#aaa] leading-7">
          For example, a BM25 retriever can perform keyword search, while a
          vector store retriever can perform semantic search.
        </p>

        <CodeBlock
          language="javascript"
          code={`// Install:
// npm install @langchain/community @langchain/core
// npm install @langchain/openai

import { BM25Retriever } from
  "@langchain/community/retrievers/bm25";

import { MemoryVectorStore } from
  "@langchain/classic/vectorstores/memory";

import { OpenAIEmbeddings } from
  "@langchain/openai";

// Example documents
const documents = [
  {
    pageContent:
      "Node.js uses an Event Loop to handle asynchronous operations.",
    metadata: { id: "doc-1" },
  },
  {
    pageContent:
      "Node.js is a JavaScript runtime built on the V8 engine.",
    metadata: { id: "doc-2" },
  },
  {
    pageContent:
      "Python supports asynchronous programming using async and await.",
    metadata: { id: "doc-3" },
  },
];

// 1. Create keyword retriever
const keywordRetriever = BM25Retriever.fromDocuments(
  documents,
  { k: 3 }
);

// 2. Create vector store
const embeddings = new OpenAIEmbeddings({
  model: "text-embedding-3-small",
});

const vectorStore = await MemoryVectorStore.fromDocuments(
  documents,
  embeddings
);

// 3. Create semantic retriever
const semanticRetriever = vectorStore.asRetriever({
  k: 3,
});

// 4. Search using both retrievers
const query = "How does Node.js handle async tasks?";

const [keywordResults, semanticResults] =
  await Promise.all([
    keywordRetriever.invoke(query),
    semanticRetriever.invoke(query),
  ]);

console.log("Keyword Results:", keywordResults);
console.log("Semantic Results:", semanticResults);

// Both result lists can now be combined
// using RRF or another fusion strategy.`}
        />

        <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/[0.05] p-4">
          <p className="font-semibold text-yellow-400 mb-2">Important Note</p>
          <p className="text-sm text-[#aaa] leading-6">
            This example performs both searches but does not implement the final
            fusion step. It also uses an in-memory vector store for learning.
            For production, choose a persistent vector database and implement or
            configure a proper fusion strategy.
          </p>
        </div>
      </section>

      {/* 8 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          8. Advantages of Hybrid Search
        </h2>

        <ul className="list-disc pl-5 space-y-2 text-[#aaa]">
          <li>Combines exact keyword matching with semantic understanding.</li>
          <li>Can retrieve documents that either search method might miss.</li>
          <li>
            Works well with technical terms, names, IDs, and natural-language
            queries.
          </li>
          <li>
            Can improve retrieval quality when configured and evaluated
            properly.
          </li>
          <li>Useful for large document collections and knowledge bases.</li>
        </ul>
      </section>

      {/* 9 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          9. Where is Hybrid Search Used?
        </h2>

        <div className="grid md:grid-cols-2 gap-3">
          {[
            "RAG applications",
            "AI-powered document search",
            "E-commerce product search",
            "Enterprise knowledge bases",
            "Technical documentation search",
            "Customer support chatbots",
          ].map((item, index) => (
            <div
              key={index}
              className="rounded-lg border border-white/10 bg-white/[0.03] p-3 text-sm text-[#ccc]"
            >
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* 10 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          10. Interview Questions & Answers
        </h2>

        {[
          {
            q: "What is Hybrid Search?",
            a: "Hybrid Search combines Keyword Search and Semantic Search to retrieve relevant documents.",
          },
          {
            q: "What is BM25?",
            a: "BM25 is a lexical ranking algorithm that ranks documents based on query-term matching, term importance, and document length.",
          },
          {
            q: "What is Reciprocal Rank Fusion?",
            a: "RRF is a rank-based fusion technique that combines multiple ranked result lists into one list.",
          },
          {
            q: "What is the difference between Keyword and Semantic Search?",
            a: "Keyword Search matches terms, while Semantic Search uses embeddings to find content with similar meaning.",
          },
          {
            q: "Why do we use Hybrid Search in RAG?",
            a: "It combines exact keyword matching and semantic retrieval, which can improve the relevance of retrieved context.",
          },
          {
            q: "What is Weighted Score Fusion?",
            a: "It combines search scores using configurable weights. Scores may need normalization before combining.",
          },
          {
            q: "Is Hybrid Search always better than Semantic Search?",
            a: "No. It depends on the dataset, query type, retrieval configuration, and evaluation results.",
          },
        ].map((item, index) => (
          <div
            key={index}
            className="rounded-xl border border-white/10 bg-white/[0.03] p-4 space-y-2"
          >
            <p className="font-semibold text-white">
              {index + 1}. {item.q}
            </p>
            <p className="text-sm text-green-400 leading-6">{item.a}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default HybridSearch;
