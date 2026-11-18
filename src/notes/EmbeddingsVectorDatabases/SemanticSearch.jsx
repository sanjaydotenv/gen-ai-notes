import React from "react";
import CodeBlock from "../../components/CodeBlock";

const SemanticSearch = () => {
  return (
    <div className="space-y-8 text-[#E3E3E3]">
      {/* Header */}
      <div>
        <p className="text-sm font-semibold tracking-widest text-[#FC6C26]">
          EMBEDDINGS & VECTOR DATABASES / 04
        </p>
        <h1 className="mt-2 text-3xl font-bold">Semantic Search</h1>
        <p className="mt-3 leading-7 text-[#999]">
          Semantic Search is a search technique that understands the meaning and
          intent behind a query instead of relying only on exact keyword
          matches.
        </p>
      </div>

      {/* Introduction */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">1. What is Semantic Search?</h2>

        <p className="leading-7 text-[#aaa]">
          Traditional search looks for matching words, whereas Semantic Search
          converts queries and documents into embeddings and compares their
          semantic similarity.
        </p>

        <div className="rounded-xl border border-white/10 bg-[#1A1A1A] p-4 space-y-3">
          <p className="text-xs font-semibold text-[#FC6C26]">USER QUERY</p>
          <p className="font-semibold">"How can I develop websites?"</p>
          <div className="border-t border-white/10 pt-3">
            <p className="text-xs font-semibold text-green-400">
              SEMANTIC RESULT
            </p>
            <p className="mt-1 text-sm text-[#aaa]">
              "Learn HTML, CSS, JavaScript and React to build websites."
            </p>
          </div>
        </div>

        <p className="text-sm text-[#aaa]">
          Even though the exact words are different, both sentences have similar
          meanings.
        </p>
      </section>

      {/* Traditional vs Semantic */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">
          2. Traditional Search vs Semantic Search
        </h2>

        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full text-sm text-left">
            <thead className="bg-white/5 text-[#FC6C26]">
              <tr>
                <th className="p-3">Traditional Search</th>
                <th className="p-3">Semantic Search</th>
              </tr>
            </thead>
            <tbody className="text-[#aaa]">
              <tr className="border-t border-white/10">
                <td className="p-3">Matches keywords.</td>
                <td className="p-3">Matches meaning.</td>
              </tr>
              <tr className="border-t border-white/10">
                <td className="p-3">Uses text matching.</td>
                <td className="p-3">Uses embeddings and similarity.</td>
              </tr>
              <tr className="border-t border-white/10">
                <td className="p-3">May miss synonyms.</td>
                <td className="p-3">Can identify related expressions.</td>
              </tr>
              <tr className="border-t border-white/10">
                <td className="p-3">Example: keyword search.</td>
                <td className="p-3">Example: vector search.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Working */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">3. How Semantic Search Works</h2>

        <CodeBlock
          code={`             User Query
                  |
                  v
           Embedding Model
                  |
                  v
           Query Vector
                  |
                  v
        Compare with Stored Vectors
                  |
                  v
          Similarity Calculation
                  |
                  v
          Rank Matching Results
                  |
                  v
          Return Relevant Documents`}
        />

        <p className="text-sm leading-7 text-[#aaa]">
          Documents are usually converted into embeddings and stored beforehand.
          When a user searches, the query is embedded and compared against those
          stored vectors.
        </p>
      </section>

      {/* Example */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">4. Practical Example</h2>

        <p className="leading-7 text-[#aaa]">
          Suppose a knowledge base contains these documents:
        </p>

        <div className="space-y-2">
          {[
            ["Document A", "Node.js is a JavaScript runtime."],
            ["Document B", "React is used to build user interfaces."],
            ["Document C", "Express helps build backend APIs."],
          ].map(([title, desc]) => (
            <div
              key={title}
              className="rounded-xl border border-white/10 bg-[#1A1A1A] p-4"
            >
              <p className="text-xs font-semibold text-[#FC6C26]">{title}</p>
              <p className="mt-1 text-sm text-[#aaa]">{desc}</p>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-4">
          <p className="text-xs font-semibold text-green-400">USER QUERY</p>
          <p className="mt-2 font-semibold">
            "How can I create server-side APIs using JavaScript?"
          </p>
          <p className="mt-3 text-sm text-[#aaa]">
            Semantic Search can identify Document C as a relevant result even
            though the exact words are different.
          </p>
        </div>
      </section>

      {/* Implementation */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">5. Implementing Semantic Search</h2>

        <p className="leading-7 text-[#aaa]">
          We can generate embeddings for documents and a search query, then
          compare their vectors using Cosine Similarity.
        </p>

        <CodeBlock
          language="javascript"
          code={`// Documents stored in our application
const documents = [
  "Node.js is a JavaScript runtime.",
  "React is a frontend library.",
  "Express is used to build backend APIs."
];

// Generate embeddings beforehand
const documentVectors = await Promise.all(
  documents.map(async (text) => {
    const result = await client.embeddings.create({
      model: "text-embedding-3-small",
      input: text
    });

    return result.data[0].embedding;
  })
);

// Generate query embedding
const query = "How to build backend APIs?";

const queryResult = await client.embeddings.create({
  model: "text-embedding-3-small",
  input: query
});

const queryVector = queryResult.data[0].embedding;

// Compare vectors
const results = documents.map((text, index) => ({
  text,
  score: cosineSimilarity(
    queryVector,
    documentVectors[index]
  )
}));

// Rank by similarity
results.sort((a, b) => b.score - a.score);

console.log(results);`}
        />

        <p className="text-sm text-[#aaa]">
          Here, <span className="text-[#FC6C26]">cosineSimilarity()</span>
          is the function implemented in our previous topic. In production,
          document embeddings should be stored and reused instead of regenerated
          for every search.
        </p>
      </section>

      {/* Vector Database */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">6. Role of Vector Databases</h2>

        <p className="leading-7 text-[#aaa]">
          When applications contain thousands or millions of documents, storing
          and comparing every vector manually becomes inefficient. Vector
          databases provide specialized storage and similarity search
          capabilities.
        </p>

        <CodeBlock
          code={`Documents
    |
    v
Embedding Model
    |
    v
Document Vectors
    |
    v
Vector Database
    |
    |             User Query
    |                  |
    |                  v
    |            Query Embedding
    |                  |
    +-------> Similarity Search
                       |
                       v
                Relevant Results`}
        />
      </section>

      {/* RAG */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">7. Semantic Search in RAG</h2>

        <p className="leading-7 text-[#aaa]">
          Semantic Search is an important part of Retrieval-Augmented Generation
          (RAG). It retrieves relevant information that is provided to an LLM as
          context.
        </p>

        <CodeBlock
          code={`User Question
      |
      v
Semantic Search
      |
      v
Retrieve Relevant Documents
      |
      v
Add Documents to Prompt
      |
      v
       LLM
      |
      v
Generate Answer`}
        />

        <p className="text-sm text-[#aaa]">
          The LLM uses retrieved information to generate a more context-aware
          answer.
        </p>
      </section>

      {/* Hybrid Search */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">8. What is Hybrid Search?</h2>

        <p className="leading-7 text-[#aaa]">
          Hybrid Search combines keyword-based search with semantic search to
          improve retrieval quality.
        </p>

        <CodeBlock
          code={`             User Query
                  |
          +-------+-------+
          |               |
          v               v
     Keyword Search  Semantic Search
          |               |
          v               v
      Text Results    Vector Results
          |               |
          +-------+-------+
                  |
                  v
             Combine Results
                  |
                  v
            Final Ranked Results`}
        />

        <p className="text-sm text-[#aaa]">
          It is useful when both exact terms and semantic meaning are important,
          such as searching technical documentation.
        </p>
      </section>

      {/* Important */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">9. Important Points</h2>

        <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-[#aaa]">
          <li>
            Semantic Search focuses on meaning rather than exact keywords.
          </li>
          <li>It uses embedding models to generate vectors.</li>
          <li>Cosine Similarity can compare query and document vectors.</li>
          <li>Relevant documents are ranked by similarity scores.</li>
          <li>Vector databases make large-scale vector retrieval easier.</li>
          <li>Semantic Search is widely used in RAG applications.</li>
          <li>Hybrid Search combines keyword and vector search.</li>
        </ul>
      </section>

      {/* Interview */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold">10. Interview Questions & Answers</h2>

        {[
          {
            q: "What is Semantic Search?",
            a: "Semantic Search finds information based on the meaning and intent of a query instead of relying only on exact keyword matches.",
          },
          {
            q: "How does Semantic Search work?",
            a: "It converts queries and documents into embeddings, compares their vectors, and retrieves the most relevant results.",
          },
          {
            q: "What is the difference between keyword search and semantic search?",
            a: "Keyword search matches exact terms, while semantic search identifies conceptually related information.",
          },
          {
            q: "What is the role of embeddings in Semantic Search?",
            a: "Embeddings convert text into numerical vectors that can be compared mathematically.",
          },
          {
            q: "Why is Cosine Similarity used?",
            a: "It measures the directional similarity between query and document vectors.",
          },
          {
            q: "What is Hybrid Search?",
            a: "It combines keyword-based search and semantic search to retrieve relevant results.",
          },
          {
            q: "Why do we need Vector Databases?",
            a: "They efficiently store, index, and search high-dimensional vectors.",
          },
          {
            q: "How is Semantic Search used in RAG?",
            a: "It retrieves relevant document chunks that are added to the LLM's context before generating an answer.",
          },
          {
            q: "Does Semantic Search always return correct results?",
            a: "No. Results depend on embedding quality, document content, retrieval settings, and similarity ranking.",
          },
        ].map((item, index) => (
          <div
            key={index}
            className="rounded-xl border border-white/10 bg-white/[0.03] p-4 space-y-2"
          >
            <p className="text-sm font-semibold">
              <span className="mr-2 text-[#FC6C26]">Q{index + 1}.</span>
              {item.q}
            </p>

            <p className="text-sm leading-6 text-[#aaa]">
              <span className="font-semibold text-green-400">Answer: </span>
              {item.a}
            </p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default SemanticSearch;
