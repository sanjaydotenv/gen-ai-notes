import React from "react";
import CodeBlock from "../../components/CodeBlock";

const Retrievers = () => {
  return (
    <div className="space-y-8 text-[#E3E3E3]">

      {/* HEADER */}
      <div>
        <p className="text-sm font-semibold tracking-widest text-[#FC6C26]">
          LANGCHAIN ADVANCED / 03
        </p>
        <h1 className="text-3xl font-bold mt-2">Retrievers</h1>
        <p className="text-[#999] mt-3 leading-7">
          Retrievers find and return relevant documents based on a user's
          query. They are an important part of Retrieval-Augmented Generation
          (RAG) applications.
        </p>
      </div>

      {/* 1 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">1. What is a Retriever?</h2>
        <p className="text-[#aaa] leading-7">
          A Retriever is a component that takes a query as input and returns
          relevant documents as output.
        </p>
        <p className="text-[#aaa] leading-7">
          Imagine you have stored 10,000 document chunks in a vector database.
          When a user asks a question, you do not want to send all 10,000
          chunks to the LLM. A Retriever finds only the useful chunks.
        </p>

        <div className="bg-[#1A1A1A] border border-white/10 rounded-xl p-5 space-y-3">
          <div className="bg-white/[0.04] p-3 rounded-lg text-center">
            <p className="font-semibold">User Query</p>
            <p className="text-sm text-[#999] mt-1">
              "What is Node.js?"
            </p>
          </div>
          <div className="text-center text-[#FC6C26] text-xl">↓</div>
          <div className="bg-[#FC6C26]/10 border border-[#FC6C26]/20 p-3 rounded-lg text-center">
            <p className="font-semibold text-[#FC6C26]">Retriever</p>
            <p className="text-sm text-[#aaa] mt-1">
              Searches for relevant document chunks
            </p>
          </div>
          <div className="text-center text-[#FC6C26] text-xl">↓</div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {["Node.js Introduction", "Node.js Runtime", "Node.js Features"].map((item) => (
              <div key={item} className="bg-white/[0.04] rounded-lg p-3 text-center text-xs">
                {item}
              </div>
            ))}
          </div>
          <div className="text-center text-[#FC6C26] text-xl">↓</div>
          <div className="bg-white/[0.04] p-3 rounded-lg text-center">
            <p className="font-semibold">LLM</p>
            <p className="text-sm text-[#999] mt-1">
              Generates an answer using retrieved context
            </p>
          </div>
        </div>
      </section>

      {/* 2 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">2. Why do we need Retrievers?</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            ["Relevant Information", "Finds documents related to the user's question."],
            ["Less Context", "Sends selected chunks instead of the entire document collection."],
            ["Better RAG", "Provides external information that helps the LLM answer questions."],
            ["Flexible Search", "Supports different retrieval strategies and search techniques."]
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
        <h2 className="text-2xl font-semibold">3. How does a Retriever work?</h2>
        <p className="text-[#aaa] leading-7">
          In a vector-based RAG system, a retriever commonly uses the following
          process:
        </p>

        <CodeBlock code={`User Question
      |
      v
Convert Query into an Embedding
      |
      v
Search Similar Vectors
      |
      v
Find Relevant Document Chunks
      |
      v
Return Documents
      |
      v
Pass Context to LLM`} />

        <p className="text-[#aaa] leading-7">
          The query embedding is compared with stored document embeddings.
          The search strategy determines which documents are selected.
        </p>
      </section>

      {/* 4 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">4. Retriever in LangChain</h2>
        <p className="text-[#aaa] leading-7">
          LangChain provides a standard retriever interface. A retriever
          accepts a query and returns an array of Document objects.
        </p>

        <CodeBlock code={`// Basic retriever usage

const retriever = vectorStore.asRetriever({
  k: 3,
});

const documents = await retriever.invoke(
  "What is Node.js?"
);

console.log(documents);`} />

        <p className="text-[#aaa] leading-7">
          Here, vectorStore represents an already-created vector store
          containing embedded documents.
        </p>

        <div className="bg-[#1A1A1A] border border-white/10 rounded-xl p-4 space-y-2">
          <p className="font-semibold text-[#FC6C26]">Important Terms</p>
          <p className="text-sm text-[#aaa]">
            <span className="text-[#E3E3E3] font-medium">asRetriever():</span>{" "}
            Converts a vector store into a retriever.
          </p>
          <p className="text-sm text-[#aaa]">
            <span className="text-[#E3E3E3] font-medium">k:</span>{" "}
            Number of documents to retrieve.
          </p>
          <p className="text-sm text-[#aaa]">
            <span className="text-[#E3E3E3] font-medium">invoke():</span>{" "}
            Sends a query to the retriever and returns matching documents.
          </p>
        </div>
      </section>

      {/* 5 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">5. Complete Retriever Example</h2>
        <p className="text-[#aaa] leading-7">
          Let's create a simple retriever using LangChain, OpenAI embeddings,
          and an in-memory vector store.
        </p>

        <CodeBlock code={`import { Document } from "@langchain/core/documents";
import { OpenAIEmbeddings } from "@langchain/openai";
import { MemoryVectorStore } from
  "@langchain/classic/vectorstores/memory";

// 1. Create documents
const documents = [
  new Document({
    pageContent: "Node.js is a JavaScript runtime.",
    metadata: { topic: "Node.js" },
  }),
  new Document({
    pageContent: "Express.js is a web framework for Node.js.",
    metadata: { topic: "Express" },
  }),
  new Document({
    pageContent: "MongoDB is a NoSQL database.",
    metadata: { topic: "MongoDB" },
  }),
];

// 2. Create embeddings
const embeddings = new OpenAIEmbeddings({
  model: "text-embedding-3-small",
});

// 3. Create vector store
const vectorStore = await MemoryVectorStore
  .fromDocuments(documents, embeddings);

// 4. Create retriever
const retriever = vectorStore.asRetriever({
  k: 2,
});

// 5. Search documents
const results = await retriever.invoke(
  "What is Node.js?"
);

// 6. Print results
for (const doc of results) {
  console.log(doc.pageContent);
  console.log(doc.metadata);
}`} />

        <div className="bg-[#FC6C26]/10 border border-[#FC6C26]/20 rounded-xl p-4">
          <p className="font-semibold text-[#FC6C26]">Remember</p>
          <p className="text-sm text-[#aaa] mt-2 leading-6">
            MemoryVectorStore stores data in memory. It is useful for learning
            and demos, but it does not provide persistent storage like a
            production vector database.
          </p>
        </div>
      </section>

      {/* 6 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">6. Types of Retrievers</h2>
        <p className="text-[#aaa] leading-7">
          Different retrievers use different strategies to find relevant
          documents.
        </p>

        <div className="space-y-4">

          <div className="bg-[#1A1A1A] border border-white/10 rounded-xl p-4 space-y-3">
            <h3 className="font-semibold text-[#FC6C26]">A. Vector Store Retriever</h3>
            <p className="text-sm text-[#aaa] leading-6">
              Uses vector similarity search to find documents whose embeddings
              are close to the query embedding.
            </p>
            <CodeBlock code={`const retriever = vectorStore.asRetriever({
  k: 4,
});

const docs = await retriever.invoke(
  "Explain JavaScript"
);`} />
          </div>

          <div className="bg-[#1A1A1A] border border-white/10 rounded-xl p-4 space-y-3">
            <h3 className="font-semibold text-[#FC6C26]">B. BM25 Retriever</h3>
            <p className="text-sm text-[#aaa] leading-6">
              BM25 is a keyword-based retrieval algorithm. It ranks documents
              based on how well their terms match the query.
            </p>
            <p className="text-sm text-[#aaa] leading-6">
              It is useful when exact words, names, identifiers, or technical
              terms matter.
            </p>
            <CodeBlock code={`import { BM25Retriever } from
  "@langchain/classic/retrievers/bm25";

const retriever = BM25Retriever.fromDocuments(
  documents,
  {
    k: 3,
  }
);

const results = await retriever.invoke(
  "Node.js runtime"
);`} />
          </div>

          <div className="bg-[#1A1A1A] border border-white/10 rounded-xl p-4 space-y-3">
            <h3 className="font-semibold text-[#FC6C26]">C. Multi-Query Retriever</h3>
            <p className="text-sm text-[#aaa] leading-6">
              Generates multiple versions of the user's question and retrieves
              documents for those queries. This can improve recall when one
              query does not find all relevant information.
            </p>
            <CodeBlock code={`import { MultiQueryRetriever } from
  "langchain/retrievers/multi_query";

const retriever = MultiQueryRetriever.fromLLM({
  retriever: vectorStore.asRetriever({ k: 3 }),
  llm,
});

const results = await retriever.invoke(
  "How does Node.js handle asynchronous tasks?"
);`} />
            <p className="text-xs text-[#999]">
              Requires an initialized language model and vector-store retriever.
              Check the installed LangChain version for package export changes.
            </p>
          </div>

          <div className="bg-[#1A1A1A] border border-white/10 rounded-xl p-4 space-y-3">
            <h3 className="font-semibold text-[#FC6C26]">D. Contextual Compression Retriever</h3>
            <p className="text-sm text-[#aaa] leading-6">
              Retrieves documents and then uses a compressor to remove
              information that is not relevant to the user's query.
            </p>
            <p className="text-sm text-[#aaa] leading-6">
              This helps reduce unnecessary context before sending it to the LLM.
            </p>
          </div>

          <div className="bg-[#1A1A1A] border border-white/10 rounded-xl p-4 space-y-3">
            <h3 className="font-semibold text-[#FC6C26]">E. Parent Document Retriever</h3>
            <p className="text-sm text-[#aaa] leading-6">
              Searches using smaller child chunks but can return their larger
              parent documents. This balances precise retrieval with broader
              context.
            </p>
          </div>

        </div>
      </section>

      {/* 7 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">7. Similarity Search</h2>
        <p className="text-[#aaa] leading-7">
          Similarity search finds documents whose vectors are closest to the
          query vector according to a selected similarity or distance metric.
        </p>

        <CodeBlock code={`const retriever = vectorStore.asRetriever({
  searchType: "similarity",
  searchKwargs: {
    k: 4,
  },
});

const results = await retriever.invoke(
  "What is an API?"
);`} />

        <p className="text-[#aaa] leading-7">
          The retriever returns the top matching documents according to the
          vector store's configured search behavior.
        </p>
      </section>

      {/* 8 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">8. Maximum Marginal Relevance (MMR)</h2>
        <p className="text-[#aaa] leading-7">
          Sometimes similarity search returns documents that are very similar
          to each other. This can produce repetitive context.
        </p>
        <p className="text-[#aaa] leading-7">
          Maximum Marginal Relevance (MMR) tries to balance two things:
        </p>

        <ul className="list-disc pl-6 text-sm text-[#aaa] space-y-2">
          <li>Relevance: Documents should match the query.</li>
          <li>Diversity: Selected documents should not be too similar to one another.</li>
        </ul>

        <CodeBlock code={`const retriever = vectorStore.asRetriever({
  searchType: "mmr",
  searchKwargs: {
    k: 4,
    fetchK: 20,
    lambda: 0.5,
  },
});

const results = await retriever.invoke(
  "Explain backend development"
);`} />

        <div className="bg-[#1A1A1A] border border-white/10 rounded-xl p-4 space-y-2">
          <p className="font-semibold text-[#FC6C26]">MMR Parameters</p>
          <p className="text-sm text-[#aaa]">
            <span className="text-[#E3E3E3]">k:</span> Number of final documents.
          </p>
          <p className="text-sm text-[#aaa]">
            <span className="text-[#E3E3E3]">fetchK:</span> Number of candidate
            documents considered before selecting the final results.
          </p>
          <p className="text-sm text-[#aaa]">
            <span className="text-[#E3E3E3]">lambda:</span> Balances relevance
            and diversity. Higher values give more weight to relevance.
          </p>
        </div>
      </section>

      {/* 9 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">9. Metadata Filtering</h2>
        <p className="text-[#aaa] leading-7">
          Sometimes we want to retrieve documents only from a particular
          category, user, date, or source.
        </p>
        <p className="text-[#aaa] leading-7">
          Metadata filtering restricts the search to documents that match
          specified metadata conditions.
        </p>

        <CodeBlock code={`const retriever = vectorStore.asRetriever({
  k: 3,
  filter: (document) =>
    document.metadata.topic === "Node.js",
});

const results = await retriever.invoke(
  "Explain JavaScript runtime"
);`} />

        <p className="text-sm text-[#999]">
          Filter syntax and supported operators depend on the vector store.
          This example uses a JavaScript filter function.
        </p>
      </section>

      {/* 10 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">10. Retriever vs Vector Store</h2>
        <p className="text-[#aaa] leading-7">
          A Vector Store and a Retriever are related, but they are not the same.
        </p>

        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full text-sm text-left">
            <thead className="bg-white/[0.05] text-[#FC6C26]">
              <tr>
                <th className="p-3">Vector Store</th>
                <th className="p-3">Retriever</th>
              </tr>
            </thead>
            <tbody className="text-[#aaa] divide-y divide-white/10">
              <tr>
                <td className="p-3">Stores and searches vectors.</td>
                <td className="p-3">Provides a document retrieval interface.</td>
              </tr>
              <tr>
                <td className="p-3">Can add and delete documents.</td>
                <td className="p-3">Focuses on finding relevant documents.</td>
              </tr>
              <tr>
                <td className="p-3">Provides vector search methods.</td>
                <td className="p-3">Can use different retrieval strategies.</td>
              </tr>
              <tr>
                <td className="p-3">Can create a retriever.</td>
                <td className="p-3">Can be built using a vector store or other search systems.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <CodeBlock code={`// Vector store
const vectorStore = await MemoryVectorStore
  .fromDocuments(documents, embeddings);

// Retriever created from vector store
const retriever = vectorStore.asRetriever({
  k: 3,
});

// Retriever searches documents
const results = await retriever.invoke("Node.js");`} />
      </section>

      {/* 11 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">11. Retriever vs Similarity Search</h2>
        <p className="text-[#aaa] leading-7">
          A vector store can perform similarity search directly. A retriever
          provides a more general interface for document retrieval.
        </p>

        <CodeBlock code={`// Direct vector store search
const docs = await vectorStore.similaritySearch(
  "What is Node.js?",
  3
);

// Retriever interface
const retriever = vectorStore.asRetriever({
  k: 3,
});

const retrievedDocs = await retriever.invoke(
  "What is Node.js?"
);`} />

        <p className="text-[#aaa] leading-7">
          Both can return relevant documents, but the retriever interface
          allows you to use different retrieval implementations through a
          common interface.
        </p>
      </section>

      {/* 12 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">12. Retriever in RAG Pipeline</h2>

        <CodeBlock code={`User Question
      |
      v
Query Embedding
      |
      v
Retriever
      |
      v
Vector Store Search
      |
      v
Relevant Documents
      |
      v
Prompt + Retrieved Context
      |
      v
LLM
      |
      v
Final Answer`} />

        <p className="text-[#aaa] leading-7">
          The retriever connects the knowledge stored in your document
          collection with the user's question.
        </p>
      </section>

      {/* 13 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">13. Important Points</h2>

        <div className="space-y-3">
          {[
            ["Retriever does not generate answers", "It returns documents. The LLM generates the final response."],
            ["Retriever does not always require embeddings", "BM25 and other keyword-based retrievers can work without vector embeddings."],
            ["k controls result count", "It specifies how many documents to retrieve, when supported by the retriever."],
            ["Retrieval quality matters", "Irrelevant documents can reduce the quality of RAG answers."],
            ["Different strategies solve different problems", "Similarity, BM25, MMR, and other approaches have different strengths."]
          ].map(([title, desc]) => (
            <div key={title} className="border-l-2 border-[#FC6C26] bg-white/[0.03] p-4 rounded-r-lg">
              <h3 className="font-semibold">{title}</h3>
              <p className="text-sm text-[#aaa] mt-1 leading-6">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 14 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">14. Interview Questions & Answers</h2>

        {[
          ["What is a Retriever in LangChain?", "A component that accepts a query and returns relevant Document objects."],
          ["Why do we need a Retriever in RAG?", "It finds relevant document chunks so the LLM receives useful context instead of the entire knowledge base."],
          ["What does asRetriever() do?", "It creates a retriever interface from a vector store."],
          ["What does k mean in retrieval?", "It controls the number of documents returned by the retriever, when supported."],
          ["What is BM25?", "A keyword-based ranking algorithm that finds documents based on query-term matching."],
          ["What is Multi-Query Retrieval?", "It creates multiple variations of a query and retrieves documents using those variations."],
          ["What is MMR?", "Maximum Marginal Relevance balances query relevance and diversity when selecting documents."],
          ["What is Contextual Compression?", "A retrieval approach that removes irrelevant information from retrieved documents."],
          ["What is Parent Document Retrieval?", "It searches smaller child chunks but can return their larger parent documents for more context."],
          ["Does every Retriever use embeddings?", "No. Vector-based retrievers use embeddings, but keyword-based retrievers such as BM25 do not require them."],
          ["What is the difference between a Vector Store and a Retriever?", "A vector store manages and searches vectors, while a retriever provides a common interface for retrieving relevant documents."],
          ["Does a Retriever generate the final answer?", "No. It retrieves documents. An LLM uses those documents to generate the final answer."]
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

export default Retrievers;