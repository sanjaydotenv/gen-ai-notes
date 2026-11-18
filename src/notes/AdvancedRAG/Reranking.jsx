import React from "react";
import CodeBlock from "../../components/CodeBlock";

const Reranking = () => {
  return (
    <div className="space-y-8 text-[#E3E3E3]">
      {/* Header */}
      <div className="space-y-2">
        <p className="text-sm font-semibold tracking-widest text-[#FC6C26]">
          ADVANCED RAG / 03
        </p>
        <h1 className="text-3xl font-bold">Reranking</h1>
        <p className="text-[#aaa] leading-7">
          Reranking is a retrieval optimization technique that re-evaluates
          retrieved documents and sorts them according to their relevance to the
          user's query.
        </p>
      </div>

      {/* 1 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          1. What is Reranking?
        </h2>

        <p className="text-[#aaa] leading-7">
          In a RAG system, the retriever searches a large collection of
          documents and returns the Top-K results.
        </p>

        <p className="text-[#aaa] leading-7">
          However, the initial search results may contain documents that are
          only partially relevant. Reranking uses another model to evaluate
          these results more carefully and reorder them.
        </p>

        <div className="rounded-xl border border-white/10 bg-[#1A1A1A] p-4 space-y-3">
          <p className="font-semibold text-white">Example</p>

          <p className="text-sm text-[#FC6C26]">User Query</p>
          <p className="text-[#aaa]">"How does Node.js Event Loop work?"</p>

          <p className="text-sm text-[#FC6C26]">Initial Retrieval Results</p>
          <div className="space-y-2">
            {[
              "Document A - Node.js introduction",
              "Document B - Event Loop and asynchronous execution",
              "Document C - JavaScript variables",
            ].map((item, index) => (
              <div
                key={index}
                className="rounded-lg bg-white/[0.04] p-3 text-sm text-[#aaa]"
              >
                {index + 1}. {item}
              </div>
            ))}
          </div>

          <div className="text-center text-[#FC6C26]">↓ Reranking</div>

          <p className="text-sm text-[#FC6C26]">New Ranking</p>
          <div className="space-y-2">
            {[
              "Document B - Event Loop and asynchronous execution",
              "Document A - Node.js introduction",
              "Document C - JavaScript variables",
            ].map((item, index) => (
              <div
                key={index}
                className="rounded-lg border border-green-500/20 bg-green-500/[0.04] p-3 text-sm text-green-400"
              >
                {index + 1}. {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          2. Why Do We Need Reranking?
        </h2>

        <p className="text-[#aaa] leading-7">
          Initial retrieval systems are designed to search efficiently through
          large collections. Their first ranking is not always the most accurate
          ranking for the user's exact question.
        </p>

        <div className="grid md:grid-cols-2 gap-3">
          {[
            [
              "Improve Relevance",
              "Move the most useful documents toward the top.",
            ],
            [
              "Remove Weak Results",
              "Identify documents that are not sufficiently related to the query.",
            ],
            ["Better Context", "Provide more relevant information to the LLM."],
            [
              "Improve Answer Quality",
              "Better context can help the LLM generate more accurate answers.",
            ],
          ].map(([title, description], index) => (
            <div
              key={index}
              className="rounded-xl border border-white/10 bg-white/[0.03] p-4 space-y-2"
            >
              <h3 className="font-semibold text-white">{title}</h3>
              <p className="text-sm text-[#aaa]">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          3. How Reranking Works
        </h2>

        <CodeBlock
          language="text"
          code={`                 User Query
                      |
                      v
                 Initial Search
                      |
                      v
              Retrieve Top-K Documents
                      |
                      v
                  Reranker
                      |
             Evaluate Query + Documents
                      |
                      v
               Relevance Scores
                      |
                      v
                Sort Documents
                      |
                      v
              Select Best Documents
                      |
                      v
                 LLM Context
                      |
                      v
                 Final Answer`}
        />

        <ol className="list-decimal pl-5 space-y-2 text-[#aaa]">
          <li>User submits a question.</li>
          <li>Retriever searches the document collection.</li>
          <li>It returns an initial set of candidate documents.</li>
          <li>Reranker evaluates each document against the query.</li>
          <li>Each candidate receives a relevance score.</li>
          <li>Documents are sorted according to their scores.</li>
          <li>The best documents are passed to the LLM.</li>
        </ol>
      </section>

      {/* 4 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          4. Retriever vs Reranker
        </h2>

        <p className="text-[#aaa] leading-7">
          Both components improve document retrieval, but they perform different
          jobs.
        </p>

        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full text-sm text-left">
            <thead className="bg-white/[0.05] text-white">
              <tr>
                <th className="p-3">Retriever</th>
                <th className="p-3">Reranker</th>
              </tr>
            </thead>
            <tbody className="text-[#aaa]">
              <tr className="border-t border-white/10">
                <td className="p-3">Finds candidate documents.</td>
                <td className="p-3">Re-evaluates candidate documents.</td>
              </tr>
              <tr className="border-t border-white/10">
                <td className="p-3">Usually optimized for fast search.</td>
                <td className="p-3">
                  Usually performs more detailed relevance scoring.
                </td>
              </tr>
              <tr className="border-t border-white/10">
                <td className="p-3">Searches a large collection.</td>
                <td className="p-3">
                  Usually processes a smaller candidate set.
                </td>
              </tr>
              <tr className="border-t border-white/10">
                <td className="p-3">Produces initial ranking.</td>
                <td className="p-3">Produces a refined ranking.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <CodeBlock
          language="text"
          code={`Retriever:
Search 10,000 documents
       |
       v
Return Top 20 candidates

Reranker:
Evaluate those 20 candidates
       |
       v
Return best 5 documents`}
        />

        <p className="text-sm text-[#aaa]">
          These numbers are only an example. Actual Top-K values depend on the
          application and retrieval quality.
        </p>
      </section>

      {/* 5 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          5. Types of Reranking Models
        </h2>

        {/* Cross Encoder */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white">
            A. Cross-Encoder Reranker
          </h3>

          <p className="text-[#aaa] leading-7">
            A Cross-Encoder takes the query and a document together as input. It
            processes both simultaneously and predicts how relevant that
            document is to the query.
          </p>

          <CodeBlock
            language="text"
            code={`Query:
"How does Node.js Event Loop work?"

Document:
"The Event Loop handles asynchronous callbacks
and coordinates execution in Node.js."

              |
              v
       Cross-Encoder Model
              |
              v
        Relevance Score
              |
              v
             0.94`}
          />

          <p className="text-[#aaa] leading-7">
            The model evaluates the relationship between the query and document
            directly, rather than comparing two independently generated
            embeddings.
          </p>

          <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
            <p className="font-semibold text-green-400 mb-2">Advantages</p>
            <ul className="list-disc pl-5 text-sm text-[#aaa] space-y-1">
              <li>Detailed query-document interaction.</li>
              <li>Often provides strong relevance ranking.</li>
              <li>Useful for reranking a limited candidate set.</li>
            </ul>
            <p className="font-semibold text-red-400 mt-4 mb-2">Limitation</p>
            <p className="text-sm text-[#aaa]">
              Each query-document pair needs model inference, which can be
              expensive for large candidate sets.
            </p>
          </div>
        </div>

        {/* Bi-Encoder */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white">
            B. Bi-Encoder (Embedding-Based Retrieval)
          </h3>

          <p className="text-[#aaa] leading-7">
            A Bi-Encoder independently converts queries and documents into
            vectors. Their similarity is calculated to find relevant documents.
          </p>

          <CodeBlock
            language="text"
            code={`Query
  |
  v
Query Encoder
  |
  v
Query Vector
       \
        \  Similarity
        /  Calculation
       /
Document Vector
  |
  v
Document Encoder
  ^
  |
Document`}
          />

          <p className="text-[#aaa] leading-7">
            Document embeddings can be generated and stored in advance. This
            makes vector search efficient for large collections.
          </p>
        </div>

        {/* LLM Reranker */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white">
            C. LLM-Based Reranking
          </h3>

          <p className="text-[#aaa] leading-7">
            An LLM can evaluate retrieved documents against a query and rank
            them based on relevance.
          </p>

          <CodeBlock
            language="text"
            code={`Query:
"Explain Node.js Event Loop"

Candidate Documents:
- Document A
- Document B
- Document C

LLM evaluates:
- Relevance
- Query coverage
- Information usefulness

Output:
1. Document B
2. Document A
3. Document C`}
          />

          <p className="text-sm text-[#aaa]">
            LLM-based ranking is flexible, but can increase latency and token
            costs. Its output should be validated.
          </p>
        </div>
      </section>

      {/* 6 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          6. Reranking Score
        </h2>

        <p className="text-[#aaa] leading-7">
          A reranker assigns a relevance score to each query-document pair.
          Documents are then sorted by their scores.
        </p>

        <CodeBlock
          language="text"
          code={`Query:
"What is the Node.js Event Loop?"

Document A: "Node.js is a JavaScript runtime."
Score: 0.62

Document B: "The Event Loop handles asynchronous tasks."
Score: 0.95

Document C: "JavaScript supports variables and functions."
Score: 0.21

Final Ranking:
1. Document B
2. Document A
3. Document C`}
        />

        <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/[0.05] p-4">
          <p className="font-semibold text-yellow-400 mb-2">Important</p>
          <p className="text-sm text-[#aaa] leading-6">
            Relevance scores are model-specific. A score of 0.95 does not
            necessarily mean 95% relevance or 95% probability. Always interpret
            scores according to the reranker being used.
          </p>
        </div>
      </section>

      {/* 7 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          7. Reranking with LangChain
        </h2>

        <p className="text-[#aaa] leading-7">
          LangChain provides document compressor interfaces that can integrate
          reranking models into a retrieval pipeline.
        </p>

        <p className="text-[#aaa] leading-7">
          One approach is to use a Cohere reranking model through LangChain's
          Cohere integration.
        </p>

        <CodeBlock
          language="bash"
          code={`npm install @langchain/cohere @langchain/core`}
        />

        <CodeBlock
          language="javascript"
          code={`import { CohereRerank } from "@langchain/cohere";
import { Document } from "@langchain/core/documents";

// Example candidate documents
const documents = [
  new Document({
    pageContent:
      "Node.js is a JavaScript runtime built on V8.",
  }),
  new Document({
    pageContent:
      "The Event Loop handles asynchronous callbacks in Node.js.",
  }),
  new Document({
    pageContent:
      "JavaScript variables store different types of values.",
  }),
];

// Create reranker
const reranker = new CohereRerank({
  apiKey: process.env.COHERE_API_KEY,
  model: "rerank-v3.5",
  topN: 2,
});

// Rerank candidates against a query
const query = "How does the Node.js Event Loop work?";

const rerankedDocuments =
  await reranker.compressDocuments(
    documents,
    query
  );

console.log(rerankedDocuments);`}
        />

        <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/[0.05] p-4 space-y-2">
          <p className="font-semibold text-yellow-400">Important Notes</p>
          <ul className="list-disc pl-5 text-sm text-[#aaa] space-y-2">
            <li>
              Set <code>COHERE_API_KEY</code> in your environment. Never expose
              API keys in frontend code.
            </li>
            <li>
              This example sends candidate documents to an external reranking
              API.
            </li>
            <li>
              <code>topN: 2</code> asks for the top two results.
            </li>
            <li>
              API availability, model names, and package interfaces can change,
              so check the installed package documentation.
            </li>
          </ul>
        </div>
      </section>

      {/* 8 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          8. Reranking in RAG Architecture
        </h2>

        <CodeBlock
          language="text"
          code={`             User Query
                  |
                  v
           Query Transformation
                  |
                  v
               Retriever
                  |
                  v
          Initial Candidate Results
                  |
                  v
               Reranker
                  |
                  v
           Refined Top-K Results
                  |
                  v
            Context Construction
                  |
                  v
                 LLM
                  |
                  v
             Final Answer`}
        />

        <p className="text-[#aaa] leading-7">
          Reranking is placed after initial retrieval and before context
          construction. It helps the RAG system provide better-selected
          documents to the LLM.
        </p>
      </section>

      {/* 9 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          9. Advantages and Limitations
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-green-500/20 bg-green-500/[0.04] p-4 space-y-2">
            <h3 className="font-semibold text-green-400">Advantages</h3>
            <ul className="list-disc pl-5 text-sm text-[#aaa] space-y-2">
              <li>Improves document ordering.</li>
              <li>Can remove less relevant candidates.</li>
              <li>Provides better-selected context to the LLM.</li>
              <li>Works with vector and hybrid retrieval pipelines.</li>
            </ul>
          </div>

          <div className="rounded-xl border border-red-500/20 bg-red-500/[0.04] p-4 space-y-2">
            <h3 className="font-semibold text-red-400">Limitations</h3>
            <ul className="list-disc pl-5 text-sm text-[#aaa] space-y-2">
              <li>Adds extra processing time.</li>
              <li>Can increase API or compute costs.</li>
              <li>Cannot recover documents missed by initial retrieval.</li>
              <li>May rank irrelevant documents highly.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 10 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          10. Interview Questions & Answers
        </h2>

        {[
          {
            q: "What is Reranking?",
            a: "Reranking is a technique that re-evaluates retrieved documents and sorts them according to their relevance to a query.",
          },
          {
            q: "Why is Reranking used in RAG?",
            a: "It helps select more relevant documents from the initial retrieval results before passing context to the LLM.",
          },
          {
            q: "What is the difference between a Retriever and a Reranker?",
            a: "A retriever finds candidate documents, while a reranker evaluates and reorders those candidates.",
          },
          {
            q: "What is a Cross-Encoder?",
            a: "A Cross-Encoder processes a query and document together to calculate their relevance.",
          },
          {
            q: "What is a Bi-Encoder?",
            a: "A Bi-Encoder independently converts queries and documents into vectors, which can be compared using similarity.",
          },
          {
            q: "Can Reranking retrieve missing documents?",
            a: "No. A reranker can only reorder the candidate documents it receives. It cannot recover documents that the initial retriever missed.",
          },
          {
            q: "Does Reranking increase latency?",
            a: "Usually yes, because an additional model must evaluate the candidate documents.",
          },
          {
            q: "What is the difference between Reranking and Hybrid Search?",
            a: "Hybrid Search combines results from different retrieval methods, while Reranking reorders candidate documents based on their relevance.",
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

export default Reranking;
