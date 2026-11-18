import React from "react";
import CodeBlock from "../../components/CodeBlock";

const WhatAreEmbeddings = () => {
  return (
    <div className="space-y-8 text-[#E3E3E3]">
      {/* Header */}
      <div>
        <p className="text-sm font-semibold tracking-widest text-[#FC6C26]">
          EMBEDDINGS & VECTOR DATABASES / 01
        </p>
        <h1 className="mt-2 text-3xl font-bold">What are Embeddings?</h1>
        <p className="mt-3 leading-7 text-[#999]">
          Embeddings are numerical representations of data that capture its
          meaning and relationships. They allow AI systems to understand and
          compare text based on semantic meaning.
        </p>
      </div>

      {/* Introduction */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">1. What are Embeddings?</h2>

        <p className="leading-7 text-[#aaa]">
          Computers cannot directly understand the meaning of human language.
          Embeddings solve this problem by converting text, images, audio, and
          other data into numerical vectors.
        </p>

        <p className="leading-7 text-[#aaa]">
          Similar meanings are generally represented by vectors that are closer
          to each other in a mathematical space.
        </p>

        <CodeBlock
          code={`"I love programming"
          |
          v
   Embedding Model
          |
          v
[0.21, 0.85, 0.43, 0.12, ...]
          |
          v
 Numerical Vector`}
        />
      </section>

      {/* Real World Example */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">2. Real-World Example</h2>

        <p className="leading-7 text-[#aaa]">Consider these three sentences:</p>

        <div className="space-y-2">
          {[
            ["Sentence 1", "I love programming.", "text-green-400"],
            ["Sentence 2", "I enjoy coding.", "text-green-400"],
            ["Sentence 3", "The weather is beautiful.", "text-orange-400"],
          ].map(([label, sentence, color]) => (
            <div
              key={label}
              className="rounded-xl border border-white/10 bg-[#1A1A1A] p-4"
            >
              <p className={`text-xs font-semibold ${color}`}>{label}</p>
              <p className="mt-1 text-sm">{sentence}</p>
            </div>
          ))}
        </div>

        <p className="text-sm leading-7 text-[#aaa]">
          Sentence 1 and Sentence 2 have similar meanings, so their embeddings
          will generally be closer than Sentence 3.
        </p>
      </section>

      {/* Working */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">3. How Embeddings Work</h2>

        <CodeBlock
          code={`Input Text
    |
    v
Embedding Model
    |
    v
Token / Semantic Processing
    |
    v
Numerical Vector
    |
    v
Store or Compare Vector
    |
    v
Find Semantically Similar Data`}
        />

        <p className="text-sm leading-7 text-[#aaa]">
          An embedding model processes the input and generates a fixed-size
          numerical vector for that model.
        </p>
      </section>

      {/* Vector Example */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">4. Embedding Vector Example</h2>

        <p className="leading-7 text-[#aaa]">
          An embedding is represented as an array of floating-point numbers.
          Each number is one dimension of the vector.
        </p>

        <CodeBlock
          language="javascript"
          code={`const embedding = [
  0.21,
  0.85,
  0.43,
  0.12,
  0.67
];

console.log(embedding.length); // 5`}
        />

        <div className="rounded-xl border border-orange-500/20 bg-orange-500/5 p-4">
          <p className="font-semibold text-orange-300 text-sm">Important</p>
          <p className="mt-2 text-sm leading-6 text-[#aaa]">
            This is a simplified example. Real embedding models commonly
            generate hundreds or thousands of dimensions. The numbers do not
            have directly readable meanings.
          </p>
        </div>
      </section>

      {/* Types */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">
          5. Types of Data That Can Be Embedded
        </h2>

        <div className="grid gap-3 sm:grid-cols-2">
          {[
            [
              "Text Embeddings",
              "Convert sentences, documents, and queries into vectors.",
            ],
            ["Image Embeddings", "Represent images as numerical vectors."],
            ["Audio Embeddings", "Represent audio information in vector form."],
            [
              "Multimodal Embeddings",
              "Represent different data types in a shared semantic space when supported.",
            ],
          ].map(([title, desc]) => (
            <div
              key={title}
              className="rounded-xl border border-white/10 bg-white/[0.03] p-4"
            >
              <h3 className="font-semibold text-[#FC6C26]">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#aaa]">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Use Cases */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">6. Where Are Embeddings Used?</h2>

        <div className="space-y-3">
          {[
            [
              "Semantic Search",
              "Find results based on meaning instead of exact keywords.",
            ],
            [
              "RAG Applications",
              "Retrieve relevant documents and provide them to an LLM.",
            ],
            [
              "Recommendation Systems",
              "Find products or content with similar characteristics.",
            ],
            ["Clustering", "Group semantically similar data together."],
            ["Duplicate Detection", "Identify content with similar meanings."],
          ].map(([title, desc], index) => (
            <div
              key={title}
              className="flex gap-3 rounded-xl border border-white/10 bg-[#1A1A1A] p-4"
            >
              <span className="font-bold text-[#FC6C26]">0{index + 1}</span>
              <div>
                <h3 className="font-semibold">{title}</h3>
                <p className="mt-1 text-sm text-[#aaa]">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Practical Example */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">
          7. Generating Embeddings Using JavaScript
        </h2>

        <p className="leading-7 text-[#aaa]">
          We can use an embedding API to convert text into numerical vectors.
          Here is an example using the OpenAI SDK.
        </p>

        <CodeBlock language="bash" code={`npm install openai`} />

        <CodeBlock
          code={`import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const response = await client.embeddings.create({
  model: "text-embedding-3-small",
  input: "I love learning artificial intelligence."
});

const embedding = response.data[0].embedding;

console.log(embedding);
console.log("Dimensions:", embedding.length);`}
        />

        <p className="text-sm leading-7 text-[#aaa]">
          The API returns an embedding vector that can be stored in a vector
          database and used for similarity searches.
        </p>
      </section>

      {/* Important Points */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">8. Important Points</h2>

        <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-[#aaa]">
          <li>Embeddings convert data into numerical vectors.</li>
          <li>They capture semantic relationships between data.</li>
          <li>Similar meanings generally produce closer vectors.</li>
          <li>Each embedding model has a specific vector dimension.</li>
          <li>Embeddings can be stored in vector databases.</li>
          <li>They are widely used in RAG and semantic search.</li>
          <li>
            Different embedding models may produce incompatible vector spaces.
          </li>
        </ul>
      </section>

      {/* Interview Questions */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold">9. Interview Questions & Answers</h2>

        {[
          {
            q: "What are Embeddings?",
            a: "Embeddings are numerical vector representations of data that capture semantic meaning and relationships.",
          },
          {
            q: "Why do we need Embeddings?",
            a: "They allow AI applications to compare and search data based on semantic similarity.",
          },
          {
            q: "What is an embedding vector?",
            a: "It is an array of numerical values generated by an embedding model.",
          },
          {
            q: "What is embedding dimension?",
            a: "It is the number of numerical values present in an embedding vector.",
          },
          {
            q: "Do similar sentences have similar embeddings?",
            a: "Generally yes. Semantically similar sentences tend to have closer vector representations.",
          },
          {
            q: "Where are Embeddings used?",
            a: "They are used in semantic search, RAG, recommendation systems, clustering, and duplicate detection.",
          },
          {
            q: "What is an embedding model?",
            a: "It is a trained AI model that converts input data into numerical vector representations.",
          },
          {
            q: "Are Embeddings and LLMs the same?",
            a: "No. Embedding models generate vectors, while LLMs generate or process language.",
          },
          {
            q: "Can we store Embeddings in MongoDB?",
            a: "Yes. MongoDB supports vector storage and vector search through MongoDB Vector Search.",
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

export default WhatAreEmbeddings;
