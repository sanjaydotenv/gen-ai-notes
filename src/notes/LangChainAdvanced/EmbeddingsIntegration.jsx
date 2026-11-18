import React from "react";
import CodeBlock from "../../components/CodeBlock";

const EmbeddingsIntegration = () => {
  return (
    <div className="space-y-8 text-[#E3E3E3]">

      {/* HEADER */}
      <div>
        <p className="text-sm font-semibold tracking-widest text-[#FC6C26]">
          LANGCHAIN ADVANCED / 04
        </p>
        <h1 className="text-3xl font-bold mt-2">Embeddings Integration</h1>
        <p className="text-[#999] mt-3 leading-7">
          Embeddings convert text into numerical vectors that represent its
          semantic meaning. These vectors help applications find information
          based on meaning rather than only exact keyword matches.
        </p>
      </div>

      {/* 1 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">1. What are Embeddings?</h2>

        <p className="text-[#aaa] leading-7">
          Computers normally process text as characters and tokens. But to
          perform mathematical operations on text, we can represent it as a
          list of numbers called a vector.
        </p>

        <p className="text-[#aaa] leading-7">
          An embedding model takes text as input and generates a numerical
          representation of that text.
        </p>

        <CodeBlock code={`Input Text:
"JavaScript is a programming language."

          |
          v

Embedding Model

          |
          v

Vector:
[0.21, -0.45, 0.78, 0.12, ...]`} />

        <div className="bg-[#1A1A1A] border border-white/10 rounded-xl p-4">
          <p className="font-semibold text-[#FC6C26]">Simple Understanding</p>
          <p className="text-sm text-[#aaa] mt-2 leading-6">
            An embedding is like a numerical representation of the meaning
            of text. Similar meanings often produce vectors that are close
            to each other in the embedding space.
          </p>
        </div>
      </section>

      {/* 2 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">2. Why do we need Embeddings?</h2>

        <p className="text-[#aaa] leading-7">
          Traditional keyword search looks for matching words. Embeddings
          help retrieve information even when the query uses different words
          with a similar meaning.
        </p>

        <div className="grid sm:grid-cols-2 gap-3">
          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
            <h3 className="font-semibold text-[#FC6C26]">Without Embeddings</h3>
            <p className="text-sm text-[#aaa] mt-2 leading-6">
              Query: "How to make an application faster?"
            </p>
            <p className="text-sm text-[#aaa] mt-2 leading-6">
              Exact keyword search may miss a document titled "Performance
              Optimization".
            </p>
          </div>

          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
            <h3 className="font-semibold text-[#FC6C26]">With Embeddings</h3>
            <p className="text-sm text-[#aaa] mt-2 leading-6">
              Query: "How to make an application faster?"
            </p>
            <p className="text-sm text-[#aaa] mt-2 leading-6">
              Semantic search can find "Performance Optimization" because
              their meanings are related.
            </p>
          </div>
        </div>

        <p className="text-sm text-[#999]">
          Embeddings improve semantic matching, but they do not guarantee
          that every relevant document will be retrieved.
        </p>
      </section>

      {/* 3 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">3. How do Embeddings Work?</h2>

        <CodeBlock code={`Text
 |
 v
Tokenization
 |
 v
Embedding Model
 |
 v
Numerical Vector
 |
 v
Vector Database
 |
 v
Similarity Search`} />

        <div className="space-y-3">
          {[
            ["1. Text Input", "The application provides text to the embedding model."],
            ["2. Tokenization", "The model processes the text as tokens."],
            ["3. Embedding Generation", "The model generates a numerical vector."],
            ["4. Vector Storage", "The vector can be stored in a vector database with its associated document data."],
            ["5. Similarity Search", "The system compares vectors to find semantically related content."]
          ].map(([title, desc]) => (
            <div key={title} className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
              <h3 className="font-semibold text-[#FC6C26]">{title}</h3>
              <p className="text-sm text-[#aaa] mt-2 leading-6">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">4. What is Vector Dimension?</h2>

        <p className="text-[#aaa] leading-7">
          Vector dimension means the number of numerical values present
          in an embedding vector.
        </p>

        <CodeBlock code={`Example:

Vector A = [0.2, 0.5, 0.8]

Dimensions = 3

Vector B = [0.1, 0.4, 0.7, 0.9]

Dimensions = 4`} />

        <p className="text-[#aaa] leading-7">
          Different embedding models can generate vectors with different
          dimensions.
        </p>

        <div className="bg-[#1A1A1A] border border-white/10 rounded-xl p-4">
          <p className="font-semibold text-[#FC6C26]">Example: OpenAI Embeddings</p>
          <p className="text-sm text-[#aaa] mt-2 leading-6">
            The text-embedding-3-small model uses 1536 dimensions by default.
            The text-embedding-3-large model uses 3072 dimensions by default.
            These models also support configurable output dimensions.
          </p>
        </div>
      </section>

      {/* 5 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">5. Embedding Models</h2>

        <p className="text-[#aaa] leading-7">
          An embedding model is responsible for converting text into
          numerical vectors. Different providers offer different embedding
          models.
        </p>

        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full text-sm text-left">
            <thead className="bg-white/[0.05] text-[#FC6C26]">
              <tr>
                <th className="p-3">Provider</th>
                <th className="p-3">Example Model</th>
              </tr>
            </thead>
            <tbody className="text-[#aaa] divide-y divide-white/10">
              <tr>
                <td className="p-3 text-[#E3E3E3]">OpenAI</td>
                <td className="p-3">text-embedding-3-small</td>
              </tr>
              <tr>
                <td className="p-3 text-[#E3E3E3]">Google</td>
                <td className="p-3">gemini-embedding-001</td>
              </tr>
              <tr>
                <td className="p-3 text-[#E3E3E3]">Cohere</td>
                <td className="p-3">embed-v4.0</td>
              </tr>
              <tr>
                <td className="p-3 text-[#E3E3E3]">Hugging Face</td>
                <td className="p-3">Sentence Transformers models</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 6 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">6. Embeddings in LangChain</h2>

        <p className="text-[#aaa] leading-7">
          LangChain provides a standard Embeddings interface. Different
          embedding providers implement this interface, so you can integrate
          their models using a similar approach.
        </p>

        <p className="text-[#aaa] leading-7">
          For OpenAI embeddings, LangChain provides the OpenAIEmbeddings
          class from the @langchain/openai package.
        </p>

        <CodeBlock code={`npm install @langchain/openai`} />

        <p className="text-sm text-[#999]">
          Make sure your OpenAI API key is configured in the environment.
        </p>
      </section>

      {/* 7 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">7. Integrating OpenAI Embeddings</h2>

        <p className="text-[#aaa] leading-7">
          Let's create an embedding model and convert a simple text into
          a vector.
        </p>

        <CodeBlock code={`import { OpenAIEmbeddings } from "@langchain/openai";

// 1. Initialize embedding model
const embeddings = new OpenAIEmbeddings({
  model: "text-embedding-3-small",
});

// 2. Generate embedding
const vector = await embeddings.embedQuery(
  "JavaScript is a programming language."
);

// 3. Print vector
console.log(vector);

// 4. Check dimensions
console.log(vector.length); // 1536 by default`} />

        <p className="text-[#aaa] leading-7">
          The embedQuery() method converts a single query into an embedding
          vector.
        </p>
      </section>

      {/* 8 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">8. embedQuery() vs embedDocuments()</h2>

        <p className="text-[#aaa] leading-7">
          LangChain provides two important methods for generating embeddings.
        </p>

        <div className="space-y-3">
          <div className="bg-[#1A1A1A] border border-white/10 rounded-xl p-4">
            <h3 className="font-semibold text-[#FC6C26]">embedQuery()</h3>
            <p className="text-sm text-[#aaa] mt-2 leading-6">
              Converts a single search query into an embedding vector.
            </p>
            <CodeBlock code={`const queryVector = await embeddings.embedQuery(
  "What is Node.js?"
);

console.log(queryVector);`} />
          </div>

          <div className="bg-[#1A1A1A] border border-white/10 rounded-xl p-4">
            <h3 className="font-semibold text-[#FC6C26]">embedDocuments()</h3>
            <p className="text-sm text-[#aaa] mt-2 leading-6">
              Converts multiple document texts into embedding vectors.
            </p>
            <CodeBlock code={`const texts = [
  "Node.js is a JavaScript runtime.",
  "Express.js is a web framework.",
  "MongoDB is a NoSQL database.",
];

const vectors = await embeddings.embedDocuments(texts);

console.log(vectors);`} />
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full text-sm text-left">
            <thead className="bg-white/[0.05] text-[#FC6C26]">
              <tr>
                <th className="p-3">Method</th>
                <th className="p-3">Input</th>
                <th className="p-3">Output</th>
              </tr>
            </thead>
            <tbody className="text-[#aaa] divide-y divide-white/10">
              <tr>
                <td className="p-3 text-[#E3E3E3]">embedQuery()</td>
                <td className="p-3">Single string</td>
                <td className="p-3">Single vector</td>
              </tr>
              <tr>
                <td className="p-3 text-[#E3E3E3]">embedDocuments()</td>
                <td className="p-3">Array of strings</td>
                <td className="p-3">Array of vectors</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 9 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">9. Document Embeddings vs Query Embeddings</h2>

        <p className="text-[#aaa] leading-7">
          In RAG, embeddings are generated for both stored documents and
          user queries.
        </p>

        <CodeBlock code={`DOCUMENT SIDE

Document Chunks
      |
      v
embedDocuments()
      |
      v
Document Vectors
      |
      v
Vector Database


QUERY SIDE

User Question
      |
      v
embedQuery()
      |
      v
Query Vector
      |
      v
Similarity Search`} />

        <p className="text-[#aaa] leading-7">
          The query vector is compared with stored document vectors to
          retrieve relevant chunks.
        </p>

        <div className="bg-[#FC6C26]/10 border border-[#FC6C26]/20 rounded-xl p-4">
          <p className="font-semibold text-[#FC6C26]">Important</p>
          <p className="text-sm text-[#aaa] mt-2 leading-6">
            Query and document embeddings must belong to compatible vector
            spaces. Some models use different instructions or encoders for
            queries and documents, so always follow the model's requirements.
          </p>
        </div>
      </section>

      {/* 10 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">10. Similarity Between Embeddings</h2>

        <p className="text-[#aaa] leading-7">
          Once text is converted into vectors, we can compare those vectors
          mathematically to measure how closely their meanings are related.
        </p>

        <h3 className="font-semibold text-[#FC6C26]">Cosine Similarity</h3>

        <p className="text-[#aaa] leading-7">
          Cosine similarity measures the angle between two vectors. It is
          commonly used in semantic search.
        </p>

        <CodeBlock code={`Cosine Similarity:

              A . B
Similarity = --------
             |A| |B|

A = First Vector
B = Second Vector`} />

        <p className="text-[#aaa] leading-7">
          For normalized vectors, a higher cosine similarity generally means
          the vectors point in more similar directions.
        </p>

        <div className="bg-[#1A1A1A] border border-white/10 rounded-xl p-4">
          <p className="font-semibold text-[#FC6C26]">Remember</p>
          <p className="text-sm text-[#aaa] mt-2 leading-6">
            Similarity scores are not probabilities. A score of 0.90 does not
            mean there is a 90% chance that the document is correct or relevant.
            Interpretation depends on the model and metric.
          </p>
        </div>
      </section>

      {/* 11 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">11. Complete Embeddings + RAG Example</h2>

        <p className="text-[#aaa] leading-7">
          Now let's connect document loading, text splitting, embeddings,
          and vector storage in one workflow.
        </p>

        <CodeBlock code={`import { TextLoader } from
  "@langchain/classic/document_loaders/fs/text";

import { RecursiveCharacterTextSplitter } from
  "@langchain/textsplitters";

import { OpenAIEmbeddings } from "@langchain/openai";

import { MemoryVectorStore } from
  "@langchain/classic/vectorstores/memory";

// 1. Load documents
const loader = new TextLoader("./data.txt");
const documents = await loader.load();

// 2. Split documents
const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 500,
  chunkOverlap: 50,
});

const chunks = await splitter.splitDocuments(documents);

// 3. Initialize embedding model
const embeddings = new OpenAIEmbeddings({
  model: "text-embedding-3-small",
});

// 4. Generate embeddings and store documents
const vectorStore = await MemoryVectorStore.fromDocuments(
  chunks,
  embeddings
);

// 5. Create retriever
const retriever = vectorStore.asRetriever({
  k: 3,
});

// 6. Search relevant documents
const results = await retriever.invoke(
  "Explain Node.js"
);

// 7. Display results
for (const doc of results) {
  console.log(doc.pageContent);
}`} />

        <p className="text-[#aaa] leading-7">
          fromDocuments() uses the embedding model to generate vectors for
          the supplied documents and adds them to the vector store.
        </p>
      </section>

      {/* 12 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">12. Important Things to Remember</h2>

        <div className="space-y-3">
          {[
            ["Embeddings are vectors", "They represent text as numerical values."],
            ["Similar meaning can produce similar vectors", "This enables semantic search."],
            ["Dimension depends on the model", "Different models can generate different vector sizes."],
            ["Embeddings are not generated automatically by splitters", "A separate embedding model is needed."],
            ["Query and document vectors must be compatible", "Otherwise, similarity search may not work correctly."],
            ["Vector databases store searchable vectors", "They may also store document text and metadata, depending on the database configuration."],
            ["MemoryVectorStore is in-memory", "It is useful for demos, not persistent production storage."]
          ].map(([title, desc]) => (
            <div key={title} className="border-l-2 border-[#FC6C26] bg-white/[0.03] p-4 rounded-r-lg">
              <h3 className="font-semibold">{title}</h3>
              <p className="text-sm text-[#aaa] mt-1 leading-6">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 13 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">13. Interview Questions & Answers</h2>

        {[
          ["What are embeddings?", "Embeddings are numerical vectors generated from text, images, or other data to represent their features and meaning."],
          ["Why are embeddings used in RAG?", "They allow semantic search by comparing query vectors with document vectors."],
          ["What is an embedding model?", "A model that converts input data into numerical vector representations."],
          ["What is vector dimension?", "The number of numerical values in an embedding vector."],
          ["What is semantic search?", "A search technique that finds information based on meaning rather than only exact keyword matches."],
          ["What is OpenAIEmbeddings?", "A LangChain integration that allows applications to generate embeddings using OpenAI embedding models."],
          ["What does embedQuery() do?", "It converts a single query string into an embedding vector."],
          ["What does embedDocuments() do?", "It converts multiple document strings into embedding vectors."],
          ["What is cosine similarity?", "A mathematical measure that compares the direction of two vectors."],
          ["What is the difference between tokens and embeddings?", "Tokens are units of text processed by a model, while embeddings are numerical vector representations generated by an embedding model."],
          ["Do all embedding models have the same dimensions?", "No. Vector dimensions depend on the selected model and its configuration."],
          ["Are embedding similarity scores probabilities?", "No. They are mathematical similarity or distance measurements, not probabilities of correctness."],
          ["Why must query and document embeddings be compatible?", "Similarity search compares vectors in a shared compatible vector space. Incompatible vectors cannot be meaningfully compared."],
          ["Does a Text Splitter generate embeddings?", "No. A Text Splitter divides documents into chunks. An embedding model converts those chunks into vectors."]
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

export default EmbeddingsIntegration;