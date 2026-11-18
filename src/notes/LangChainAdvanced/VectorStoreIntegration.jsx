import React from "react";
import CodeBlock from "../../components/CodeBlock";

const VectorStoreIntegration = () => {
  return (
    <div className="space-y-8 text-[#E3E3E3]">

      {/* HEADER */}
      <div>
        <p className="text-sm font-semibold tracking-widest text-[#FC6C26]">
          LANGCHAIN ADVANCED / 05
        </p>
        <h1 className="text-3xl font-bold mt-2">Vector Store Integration</h1>
        <p className="text-[#999] mt-3 leading-7">
          Vector Stores store document embeddings and allow applications to
          search for relevant information using vector similarity.
        </p>
      </div>

      {/* 1 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">1. What is a Vector Store?</h2>

        <p className="text-[#aaa] leading-7">
          A Vector Store is a storage system designed to store and search
          numerical vectors (embeddings).
        </p>

        <p className="text-[#aaa] leading-7">
          In RAG applications, document chunks are converted into embeddings
          and stored in a Vector Store. When a user asks a question, the system
          searches for similar vectors and retrieves relevant documents.
        </p>

        <CodeBlock code={`Document Chunks
      |
      v
Embedding Model
      |
      v
Numerical Vectors
      |
      v
Vector Store
      |
      v
Similarity Search
      |
      v
Relevant Documents`} />
      </section>

      {/* 2 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">2. Why do we need Vector Stores?</h2>

        <div className="grid sm:grid-cols-2 gap-3">
          {[
            ["Store Embeddings", "Store numerical vectors generated from documents."],
            ["Semantic Search", "Find information based on meaning."],
            ["Fast Retrieval", "Search large document collections efficiently using suitable indexes."],
            ["Metadata Filtering", "Filter documents using information like source, category, or user ID."]
          ].map(([title, desc]) => (
            <div key={title} className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
              <h3 className="font-semibold text-[#FC6C26]">{title}</h3>
              <p className="text-sm text-[#aaa] mt-2 leading-6">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">3. Popular Vector Databases</h2>

        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full text-sm text-left">
            <thead className="bg-white/[0.05] text-[#FC6C26]">
              <tr>
                <th className="p-3">Database</th>
                <th className="p-3">Purpose</th>
              </tr>
            </thead>
            <tbody className="text-[#aaa] divide-y divide-white/10">
              <tr>
                <td className="p-3 text-[#E3E3E3]">Pinecone</td>
                <td className="p-3">Managed vector database.</td>
              </tr>
              <tr>
                <td className="p-3 text-[#E3E3E3]">Chroma</td>
                <td className="p-3">Open-source vector database.</td>
              </tr>
              <tr>
                <td className="p-3 text-[#E3E3E3]">Qdrant</td>
                <td className="p-3">Vector search database with filtering support.</td>
              </tr>
              <tr>
                <td className="p-3 text-[#E3E3E3]">MongoDB Atlas</td>
                <td className="p-3">Vector search with MongoDB data.</td>
              </tr>
              <tr>
                <td className="p-3 text-[#E3E3E3]">FAISS</td>
                <td className="p-3">Library for efficient vector similarity search.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 4 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">4. Vector Store in LangChain</h2>

        <p className="text-[#aaa] leading-7">
          LangChain provides a common interface for working with different
          vector stores. This makes it easier to switch storage providers
          without rewriting your entire retrieval workflow.
        </p>

        <p className="text-[#aaa] leading-7">
          Important methods:
        </p>

        <div className="space-y-3">
          {[
            ["addDocuments()", "Embeds and stores documents."],
            ["similaritySearch()", "Finds documents similar to a query."],
            ["asRetriever()", "Converts a vector store into a retriever."],
            ["delete()", "Deletes documents using supported criteria."]
          ].map(([title, desc]) => (
            <div key={title} className="bg-white/[0.03] border border-white/10 rounded-lg p-3">
              <p className="font-semibold text-[#FC6C26]">{title}</p>
              <p className="text-sm text-[#aaa] mt-1">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">5. Integrating MemoryVectorStore</h2>

        <p className="text-[#aaa] leading-7">
          MemoryVectorStore is an in-memory vector store provided by LangChain.
          It is useful for learning, testing, and small demos.
        </p>

        <CodeBlock code={`npm install @langchain/openai langchain`} />

        <CodeBlock code={`import { OpenAIEmbeddings } from "@langchain/openai";

import { MemoryVectorStore } from
  "@langchain/classic/vectorstores/memory";

// 1. Initialize embeddings
const embeddings = new OpenAIEmbeddings({
  model: "text-embedding-3-small",
});

// 2. Create vector store
const vectorStore = new MemoryVectorStore(embeddings);`} />

        <p className="text-[#aaa] leading-7">
          The embedding model is passed to the vector store. It uses this
          model to generate vectors when documents are added or queries
          are searched.
        </p>
      </section>

      {/* 6 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">6. Adding Documents</h2>

        <p className="text-[#aaa] leading-7">
          Use addDocuments() to generate embeddings for documents and store
          them in the vector store.
        </p>

        <CodeBlock code={`import { Document } from "@langchain/core/documents";

const documents = [
  new Document({
    pageContent: "Node.js is a JavaScript runtime.",
    metadata: { topic: "Node.js" },
  }),

  new Document({
    pageContent: "Express.js is a Node.js web framework.",
    metadata: { topic: "Express" },
  }),

  new Document({
    pageContent: "MongoDB is a NoSQL database.",
    metadata: { topic: "MongoDB" },
  }),
];

// Store documents
await vectorStore.addDocuments(documents);`} />

        <p className="text-sm text-[#999]">
          LangChain generates embeddings for these documents using the
          configured embedding model.
        </p>
      </section>

      {/* 7 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">7. Searching Documents</h2>

        <p className="text-[#aaa] leading-7">
          similaritySearch() converts the query into an embedding and searches
          for similar document vectors.
        </p>

        <CodeBlock code={`const results = await vectorStore.similaritySearch(
  "What is Node.js?",
  2
);

console.log(results);`} />

        <p className="text-[#aaa] leading-7">
          The second argument specifies how many documents to return.
        </p>

        <p className="text-sm text-[#999]">
          Output: An array of matching Document objects containing pageContent
          and metadata.
        </p>
      </section>

      {/* 8 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">8. Converting Vector Store into Retriever</h2>

        <p className="text-[#aaa] leading-7">
          Instead of searching directly, you can convert a vector store into
          a Retriever using asRetriever().
        </p>

        <CodeBlock code={`const retriever = vectorStore.asRetriever({
  k: 2,
});

const results = await retriever.invoke(
  "Explain Node.js"
);

console.log(results);`} />

        <div className="bg-[#1A1A1A] border border-white/10 rounded-xl p-4">
          <p className="font-semibold text-[#FC6C26]">Remember</p>
          <p className="text-sm text-[#aaa] mt-2 leading-6">
            Vector Store handles storage and search. Retriever provides a
            standard interface for retrieving documents.
          </p>
        </div>
      </section>

      {/* 9 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">9. Complete Practical Example</h2>

        <p className="text-[#aaa] leading-7">
          Let's connect embeddings, document storage, and retrieval in one
          practical example.
        </p>

        <CodeBlock code={`import { Document } from "@langchain/core/documents";

import { OpenAIEmbeddings } from "@langchain/openai";

import { MemoryVectorStore } from
  "@langchain/classic/vectorstores/memory";

// 1. Create documents
const documents = [
  new Document({
    pageContent: "Node.js runs JavaScript outside the browser.",
    metadata: { source: "nodejs.txt" },
  }),

  new Document({
    pageContent: "Express.js simplifies building APIs with Node.js.",
    metadata: { source: "express.txt" },
  }),

  new Document({
    pageContent: "MongoDB stores data in flexible documents.",
    metadata: { source: "mongodb.txt" },
  }),
];

// 2. Initialize embedding model
const embeddings = new OpenAIEmbeddings({
  model: "text-embedding-3-small",
});

// 3. Create vector store and store documents
const vectorStore = await MemoryVectorStore.fromDocuments(
  documents,
  embeddings
);

// 4. Create retriever
const retriever = vectorStore.asRetriever({
  k: 2,
});

// 5. Search
const results = await retriever.invoke(
  "How can I build a backend API?"
);

// 6. Display results
for (const doc of results) {
  console.log(doc.pageContent);
  console.log(doc.metadata);
}`} />

        <p className="text-[#aaa] leading-7">
          fromDocuments() creates a vector store and adds the supplied
          documents using the embedding model.
        </p>
      </section>

      {/* 10 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">10. Important Production Points</h2>

        <div className="space-y-3">
          {[
            ["Persistence", "MemoryVectorStore loses its data when the process ends. Use a persistent database for production."],
            ["Metadata", "Store source IDs and useful metadata to identify and filter documents."],
            ["Embedding Dimensions", "Use compatible embedding models and dimensions for indexing and querying."],
            ["Security", "Apply user-level access filters so users cannot retrieve another user's private documents."],
            ["Indexing", "Choose a database and index suitable for your data size and search requirements."]
          ].map(([title, desc]) => (
            <div key={title} className="border-l-2 border-[#FC6C26] bg-white/[0.03] p-4 rounded-r-lg">
              <h3 className="font-semibold">{title}</h3>
              <p className="text-sm text-[#aaa] mt-1 leading-6">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 11 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">11. Interview Questions & Answers</h2>

        {[
          ["What is a Vector Store?", "A storage system that stores embeddings and supports similarity-based document search."],
          ["Why do we need a Vector Store in RAG?", "It stores document embeddings and helps retrieve relevant context for user queries."],
          ["What is MemoryVectorStore?", "An in-memory vector store useful for development, testing, and demos."],
          ["What does addDocuments() do?", "It generates embeddings for documents and adds them to the vector store."],
          ["What does similaritySearch() do?", "It searches for documents whose embeddings are similar to the query embedding."],
          ["What does asRetriever() do?", "It creates a retriever interface from a vector store."],
          ["What is the difference between a Vector Store and a Vector Database?", "Vector Store is a general abstraction for storing and searching vectors. A vector database is a database system designed to provide vector storage and search capabilities."],
          ["Does MemoryVectorStore provide persistence?", "No. Its data is stored in memory and is lost when the process ends."],
          ["Can we change vector databases in LangChain?", "Yes. LangChain provides a common interface for many vector store integrations, although provider-specific configuration may change."],
          ["Does a Vector Store generate the final AI answer?", "No. It retrieves relevant documents. An LLM uses those documents to generate an answer."]
        ].map(([q, a], i) => (
          <div key={i} className="bg-[#1A1A1A] border border-white/10 rounded-xl p-4">
            <p className="font-semibold">
              <span className="text-[#FC6C26]">Q{i + 1}.</span> {q}
            </p>
            <p className="text-sm text-green-400 mt-2 leading-6">
              {a}
            </p>
          </div>
        ))}
      </section>

    </div>
  );
};

export default VectorStoreIntegration;