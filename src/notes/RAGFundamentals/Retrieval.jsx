import React from "react";
import CodeBlock from "../../components/CodeBlock";

const Retrieval = () => {
  return (
    <div className="space-y-8 text-[#E3E3E3]">
      {/* Header */}
      <div>
        <p className="text-sm font-semibold tracking-widest text-[#FC6C26]">
          RAG FUNDAMENTALS / 06
        </p>

        <h1 className="mt-2 text-3xl font-bold">Retrieval</h1>

        <p className="mt-3 leading-7 text-[#999]">
          Retrieval is the process of finding relevant information from a
          knowledge base using a user's query. In RAG, retrieved information is
          provided to the LLM as context to generate an answer.
        </p>
      </div>

      {/* 1 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          1. What is Retrieval?
        </h2>

        <p className="leading-7 text-[#bbb]">
          In previous topics, we learned how documents are processed, divided
          into chunks, and converted into embeddings.
        </p>

        <p className="leading-7 text-[#bbb]">
          Now, when a user asks a question, the system searches through those
          stored chunks and finds the information most relevant to the question.
        </p>

        <CodeBlock
          code={`User Question
      |
      v
Generate Query Embedding
      |
      v
Search Knowledge Base
      |
      v
Find Relevant Chunks
      |
      v
Return Retrieved Documents`}
        />

        <div className="rounded-xl border border-white/10 bg-[#1A1A1A] p-4">
          <p className="font-semibold text-[#FC6C26]">Simple Definition</p>
          <p className="mt-2 text-sm leading-6 text-[#bbb]">
            Retrieval = Finding the most relevant information from stored
            documents based on a user's question.
          </p>
        </div>
      </section>

      {/* 2 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          2. How Retrieval Works
        </h2>

        <p className="leading-7 text-[#bbb]">
          A basic vector retrieval system compares the query embedding with
          document embeddings stored in a vector database.
        </p>

        <CodeBlock
          code={`          INDEXING (Already Done)

Document Chunks
       |
       v
Embedding Model
       |
       v
Document Vectors
       |
       v
Vector Database


          RETRIEVAL (User Query)

User Question
       |
       v
Embedding Model
       |
       v
Query Vector
       |
       v
Vector Similarity Search
       |
       v
Relevant Chunks`}
        />

        <p className="text-sm leading-6 text-[#999]">
          The query and document embeddings must be compatible so that their
          similarity can be meaningfully compared.
        </p>
      </section>

      {/* 3 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          3. Similarity Search
        </h2>

        <p className="leading-7 text-[#bbb]">
          Similarity Search finds documents whose embeddings are closest to the
          user's query embedding according to a selected similarity metric.
        </p>

        <h3 className="font-semibold text-white">Example</h3>

        <CodeBlock
          code={`User Query:
"How does Node.js handle asynchronous tasks?"

Stored Chunks:

Chunk 1: Node.js uses the V8 engine.
Chunk 2: Node.js has an event loop.
Chunk 3: MongoDB is a NoSQL database.
Chunk 4: Express provides routing.

Similarity Search
       |
       v

Most Relevant:
1. Chunk 2 - Event Loop
2. Chunk 1 - Node.js Runtime
3. Chunk 4 - Express Routing (possibly less relevant)`}
        />

        <p className="text-sm leading-6 text-[#999]">
          The actual results depend on the embedding model, similarity metric,
          and stored content.
        </p>
      </section>

      {/* 4 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          4. Top-K Retrieval
        </h2>

        <p className="leading-7 text-[#bbb]">
          Top-K Retrieval means returning the K most relevant documents for a
          query.
        </p>

        <p className="leading-7 text-[#bbb]">
          Here, K represents the number of results we want the retriever to
          return.
        </p>

        <CodeBlock
          code={`User Query:
"What is Node.js?"

Top-K = 3

Search Results:

1. Node.js is a JavaScript runtime.
2. Node.js uses the V8 engine.
3. Node.js supports asynchronous I/O.

Returned Documents = 3`}
        />

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-white/10 bg-[#1A1A1A] p-4">
            <h3 className="font-semibold text-white">Small K</h3>
            <p className="mt-2 text-sm text-[#999]">
              Returns fewer chunks, reducing context size but possibly missing
              useful information.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-[#1A1A1A] p-4">
            <h3 className="font-semibold text-white">Large K</h3>
            <p className="mt-2 text-sm text-[#999]">
              Returns more information but may include irrelevant chunks and
              consume more context.
            </p>
          </div>
        </div>
      </section>

      {/* 5 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          5. Similarity Threshold
        </h2>

        <p className="leading-7 text-[#bbb]">
          Top-K always attempts to return a fixed number of results when enough
          documents are available.
        </p>

        <p className="leading-7 text-[#bbb]">
          But what if all the results are irrelevant? A similarity threshold
          helps filter out results that do not meet a minimum relevance
          requirement.
        </p>

        <CodeBlock
          code={`Example:

Similarity Threshold = 0.75

Chunk 1: 0.95  -> Accepted
Chunk 2: 0.88  -> Accepted
Chunk 3: 0.71  -> Rejected
Chunk 4: 0.42  -> Rejected`}
        />

        <p className="text-sm leading-6 text-[#999]">
          These scores are illustrative. Score direction and threshold behavior
          depend on the vector store and similarity metric. A distance score may
          work in the opposite direction.
        </p>
      </section>

      {/* 6 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          6. Metadata Filtering
        </h2>

        <p className="leading-7 text-[#bbb]">
          Sometimes we don't want to search every document. We may want results
          only from a particular category, user, source, or date.
        </p>

        <p className="leading-7 text-[#bbb]">
          Metadata filtering restricts retrieval using additional document
          information.
        </p>

        <CodeBlock
          code={`Stored Documents:

Chunk 1:
{
  text: "Node.js is a runtime.",
  metadata: { category: "Backend" }
}

Chunk 2:
{
  text: "React is a UI library.",
  metadata: { category: "Frontend" }
}

Filter:
category = "Backend"

Result:
Only Backend documents are searched.`}
        />

        <p className="text-sm leading-6 text-[#999]">
          This is especially useful in multi-user applications and large
          knowledge bases.
        </p>
      </section>

      {/* 7 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          7. Maximum Marginal Relevance (MMR)
        </h2>

        <p className="leading-7 text-[#bbb]">
          Normal similarity search may return multiple chunks containing almost
          the same information.
        </p>

        <p className="leading-7 text-[#bbb]">
          MMR tries to balance two things:
        </p>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-white/10 bg-[#1A1A1A] p-4">
            <h3 className="font-semibold text-white">Relevance</h3>
            <p className="mt-2 text-sm text-[#999]">
              The result should be relevant to the user's query.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-[#1A1A1A] p-4">
            <h3 className="font-semibold text-white">Diversity</h3>
            <p className="mt-2 text-sm text-[#999]">
              The results should avoid unnecessary repetition.
            </p>
          </div>
        </div>

        <CodeBlock
          code={`Query:
"Explain Node.js"

Normal Similarity Search:

1. Node.js is a runtime.
2. Node.js is a JavaScript runtime.
3. Node.js runs JavaScript outside browsers.

Many similar results.


MMR Retrieval:

1. Node.js is a runtime.
2. Node.js uses the V8 engine.
3. Node.js supports asynchronous I/O.

More diverse information.`}
        />

        <p className="text-sm leading-6 text-[#999]">
          MMR is useful when we want relevant but less repetitive context for
          the LLM.
        </p>
      </section>

      {/* 8 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          8. Hybrid Search
        </h2>

        <p className="leading-7 text-[#bbb]">
          Vector search understands semantic meaning, while keyword search finds
          exact words and terms.
        </p>

        <p className="leading-7 text-[#bbb]">
          Hybrid Search combines both approaches to improve retrieval coverage.
        </p>

        <CodeBlock
          code={`             User Query
                  |
          +-------+-------+
          |               |
          v               v
      Vector Search   Keyword Search
          |               |
          v               v
     Semantic Results  Exact Matches
          |               |
          +-------+-------+
                  |
                  v
             Result Fusion
                  |
                  v
           Final Results`}
        />

        <p className="text-sm leading-6 text-[#999]">
          Example: A query containing a specific error code may benefit from
          keyword matching, while a conceptual question may benefit from
          semantic search.
        </p>
      </section>

      {/* 9 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          9. Retriever in LangChain
        </h2>

        <p className="leading-7 text-[#bbb]">
          In LangChain, a retriever is an interface that receives a query and
          returns relevant Document objects.
        </p>

        <p className="leading-7 text-[#bbb]">
          A vector store can be converted into a retriever using
          <code className="mx-1 rounded bg-white/10 px-1.5 py-0.5 text-[#FC6C26]">
            asRetriever()
          </code>
          .
        </p>

        <h3 className="font-semibold text-white">
          Example: Creating a Retriever
        </h3>

        <CodeBlock
          language="javascript"
          code={`// Assume vectorStore is already created
// and documents have already been indexed.

const retriever = vectorStore.asRetriever({
  k: 3,
});

const results = await retriever.invoke(
  "What is Node.js?"
);

console.log(results);`}
        />

        <h3 className="font-semibold text-white">Understanding the Result</h3>

        <CodeBlock
          language="javascript"
          code={`[
  Document {
    pageContent: "Node.js is a JavaScript runtime.",
    metadata: {
      source: "nodejs.pdf",
      page: 1
    }
  },

  Document {
    pageContent: "Node.js uses the V8 engine.",
    metadata: {
      source: "nodejs.pdf",
      page: 2
    }
  }
]`}
        />

        <p className="text-sm leading-6 text-[#999]">
          The retriever returns documents, not the final AI answer. An LLM or
          another processing step can use these documents to generate the
          response.
        </p>
      </section>

      {/* 10 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          10. Similarity Search vs Retriever
        </h2>

        <p className="leading-7 text-[#bbb]">
          These terms are related, but they are not exactly the same.
        </p>

        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full min-w-[480px] text-left text-sm">
            <thead className="bg-white/[0.05] text-white">
              <tr>
                <th className="p-3">Similarity Search</th>
                <th className="p-3">Retriever</th>
              </tr>
            </thead>
            <tbody className="text-[#bbb]">
              <tr className="border-t border-white/10">
                <td className="p-3">A search operation.</td>
                <td className="p-3">A retrieval interface.</td>
              </tr>
              <tr className="border-t border-white/10">
                <td className="p-3">Often uses vector similarity.</td>
                <td className="p-3">
                  Can use vector search, keyword search, or other methods.
                </td>
              </tr>
              <tr className="border-t border-white/10">
                <td className="p-3">Usually implemented by a vector store.</td>
                <td className="p-3">Returns relevant Document objects.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 11 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          11. Complete Retrieval Flow in RAG
        </h2>

        <CodeBlock
          code={`User Question
      |
      v
Query Embedding
      |
      v
Retriever
      |
      v
Vector / Hybrid Search
      |
      v
Metadata Filtering
      |
      v
Top-K Relevant Chunks
      |
      v
Optional Reranking
      |
      v
Retrieved Context
      |
      v
Prompt + LLM
      |
      v
Final Answer`}
        />

        <p className="text-sm leading-6 text-[#999]">
          Reranking is an optional additional step. It reorders retrieved
          candidates using a more detailed relevance model.
        </p>
      </section>

      {/* 12 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          12. Important Points to Remember
        </h2>

        <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-[#bbb]">
          <li>Retrieval finds relevant information from a knowledge base.</li>
          <li>
            Query embeddings are compared with stored document embeddings.
          </li>
          <li>Similarity search finds semantically related vectors.</li>
          <li>Top-K controls how many results are returned.</li>
          <li>Similarity thresholds filter results based on a score.</li>
          <li>
            Metadata filtering restricts search using document attributes.
          </li>
          <li>MMR balances relevance and diversity.</li>
          <li>Hybrid search combines semantic and keyword retrieval.</li>
          <li>LangChain retrievers return Document objects.</li>
          <li>Reranking can improve the ordering of retrieved results.</li>
        </ul>
      </section>

      {/* 13 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          13. Interview Questions & Answers
        </h2>

        <div className="space-y-4">
          {[
            {
              q: "What is Retrieval in RAG?",
              a: "Retrieval is the process of finding relevant documents or chunks from a knowledge base using a user's query.",
            },
            {
              q: "How does vector retrieval work?",
              a: "It converts a query into an embedding and compares it with stored document embeddings using a similarity metric.",
            },
            {
              q: "What is Top-K Retrieval?",
              a: "It returns the K most relevant results for a query, where K represents the requested number of documents.",
            },
            {
              q: "What is a similarity threshold?",
              a: "It is a minimum relevance score used to filter retrieval results. Its behavior depends on the scoring metric and vector store.",
            },
            {
              q: "What is Metadata Filtering?",
              a: "It restricts retrieval using document attributes such as category, source, user ID, or date.",
            },
            {
              q: "What is MMR?",
              a: "Maximum Marginal Relevance balances query relevance with diversity to reduce repetitive retrieval results.",
            },
            {
              q: "What is Hybrid Search?",
              a: "Hybrid Search combines vector-based semantic search with keyword-based search.",
            },
            {
              q: "What is a Retriever in LangChain?",
              a: "A retriever is an interface that receives a query and returns relevant Document objects.",
            },
            {
              q: "What is the difference between a vector store and a retriever?",
              a: "A vector store manages vector storage and search operations. A retriever provides a common interface for fetching relevant documents.",
            },
            {
              q: "What is Reranking?",
              a: "Reranking reorders initially retrieved documents using a relevance model to place the most useful results first.",
            },
            {
              q: "Does a Retriever generate the final answer?",
              a: "No. A retriever returns relevant documents. An LLM uses those documents to generate the final answer.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="rounded-xl border border-white/10 bg-[#1A1A1A] p-4"
            >
              <p className="font-semibold text-white">
                {index + 1}. {item.q}
              </p>
              <p className="mt-2 text-sm leading-6 text-green-400">{item.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Retrieval;
