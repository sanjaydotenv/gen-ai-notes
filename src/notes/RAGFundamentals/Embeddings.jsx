import React from "react";
import CodeBlock from "../../components/CodeBlock";

const Embeddings = () => {
  return (
    <div className="space-y-8 text-[#E3E3E3]">
      {/* Header */}
      <div>
        <p className="text-sm font-semibold tracking-widest text-[#FC6C26]">
          RAG FUNDAMENTALS / 05
        </p>

        <h1 className="mt-2 text-3xl font-bold">Embeddings</h1>

        <p className="mt-3 leading-7 text-[#999]">
          Embeddings are numerical representations of data that capture semantic
          meaning. They allow AI applications to compare text based on meaning
          rather than just matching exact words.
        </p>
      </div>

      {/* 1 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          1. What are Embeddings?
        </h2>

        <p className="leading-7 text-[#bbb]">
          Computers work with numbers, but humans communicate using text,
          images, audio, and other forms of data.
        </p>

        <p className="leading-7 text-[#bbb]">
          An embedding model converts this data into a list of numbers called a{" "}
          <strong className="text-white">vector</strong>. This vector represents
          useful features and semantic information about the input.
        </p>

        <CodeBlock
          code={`Input Text:
"JavaScript is a programming language."

             |
             v
       Embedding Model
             |
             v
       Numerical Vector

[0.21, -0.45, 0.78, 0.12, 0.91, ...]`}
        />

        <div className="rounded-xl border border-white/10 bg-[#1A1A1A] p-4">
          <p className="font-semibold text-[#FC6C26]">Simple Definition</p>
          <p className="mt-2 text-sm leading-6 text-[#bbb]">
            An embedding is a numerical vector generated from data that helps
            represent its meaning in a mathematical space.
          </p>
        </div>
      </section>

      {/* 2 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          2. Why Do We Need Embeddings?
        </h2>

        <p className="leading-7 text-[#bbb]">
          Traditional keyword search mainly looks for matching words. But users
          often ask questions using different words that have similar meanings.
        </p>

        <h3 className="font-semibold text-white">
          Example: Keyword Search vs Semantic Search
        </h3>

        <div className="rounded-xl border border-white/10 bg-[#1A1A1A] p-4 space-y-3">
          <div>
            <p className="text-xs font-semibold text-[#999]">DOCUMENT</p>
            <p className="mt-1 text-white">
              "How to improve application performance?"
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold text-[#999]">USER QUERY</p>
            <p className="mt-1 text-white">"How can I make my app faster?"</p>
          </div>

          <div className="border-t border-white/10 pt-3">
            <p className="text-sm text-red-400">
              Keyword Search: May fail to find an exact match.
            </p>
            <p className="mt-2 text-sm text-green-400">
              Semantic Search: Can identify that both sentences express a
              similar meaning.
            </p>
          </div>
        </div>

        <p className="text-sm leading-6 text-[#999]">
          Embeddings make meaning-based search possible by converting text into
          vectors that can be compared mathematically.
        </p>
      </section>

      {/* 3 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          3. How Do Embeddings Work?
        </h2>

        <p className="leading-7 text-[#bbb]">
          An embedding model processes the input and generates a vector with a
          fixed number of dimensions for that model.
        </p>

        <CodeBlock
          code={`Sentence A:
"JavaScript is a programming language."

        |
        v
   Embedding Model
        |
        v
Vector A:
[0.21, 0.45, 0.78, 0.12]


Sentence B:
"JavaScript is used for web development."

        |
        v
   Embedding Model
        |
        v
Vector B:
[0.19, 0.42, 0.81, 0.15]`}
        />

        <p className="leading-7 text-[#bbb]">
          These vectors can be compared using similarity metrics. If two vectors
          are close according to a chosen metric, their corresponding texts may
          have similar meanings.
        </p>

        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <p className="font-semibold text-[#FC6C26]">Important</p>
          <p className="mt-2 text-sm leading-6 text-[#bbb]">
            The vectors shown above are illustrative only. Real embedding models
            generate vectors with their own learned dimensions and numerical
            values.
          </p>
        </div>
      </section>

      {/* 4 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          4. What is Vector Dimension?
        </h2>

        <p className="leading-7 text-[#bbb]">
          Vector dimension means the number of numerical values inside an
          embedding.
        </p>

        <CodeBlock
          code={`Example: 4-Dimensional Vector

[0.21, -0.45, 0.78, 0.12]

   |      |      |     |
   v      v      v     v
  D1     D2     D3    D4


Example: 1536-Dimensional Vector

[0.21, -0.45, 0.78, ... 1536 values]`}
        />

        <p className="leading-7 text-[#bbb]">
          Different embedding models generate vectors with different dimensions.
        </p>

        <p className="text-sm leading-6 text-[#999]">
          For example, the OpenAI text-embedding-3-small model produces 1536
          dimensions by default. Some models also support configuring the output
          dimensions.
        </p>
      </section>

      {/* 5 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          5. Semantic Similarity
        </h2>

        <p className="leading-7 text-[#bbb]">
          Semantic similarity measures how closely two pieces of text are
          related in meaning.
        </p>

        <p className="leading-7 text-[#bbb]">
          Once text is converted into vectors, we can compare those vectors
          using mathematical similarity metrics.
        </p>

        <h3 className="font-semibold text-white">Example</h3>

        <CodeBlock
          code={`Text A:
"How to learn JavaScript?"

Text B:
"Best way to study JavaScript."

Text C:
"How to cook pasta?"

Expected relationship:

A <---- Similar meaning ----> B

A <---- Different meaning ---> C`}
        />

        <p className="text-sm leading-6 text-[#999]">
          Similarity is model-dependent. A high similarity score does not
          guarantee that two texts are factually equivalent.
        </p>
      </section>

      {/* 6 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          6. Similarity Metrics
        </h2>

        <p className="leading-7 text-[#bbb]">
          Similarity metrics help calculate how close two vectors are to each
          other.
        </p>

        {/* Cosine */}
        <div className="space-y-2">
          <h3 className="font-semibold text-white">A. Cosine Similarity</h3>

          <p className="text-sm leading-6 text-[#bbb]">
            Cosine similarity measures the angle between two vectors. It is
            commonly used for semantic similarity search.
          </p>

          <CodeBlock
            code={`Cosine Similarity =

       A . B
-------------------
   ||A|| * ||B||


Where:
A . B  = Dot Product
||A||  = Magnitude of Vector A
||B||  = Magnitude of Vector B`}
          />

          <p className="text-sm leading-6 text-[#999]">
            A larger cosine similarity generally means the vectors point in more
            similar directions.
          </p>
        </div>

        {/* Euclidean */}
        <div className="space-y-2">
          <h3 className="font-semibold text-white">B. Euclidean Distance</h3>

          <p className="text-sm leading-6 text-[#bbb]">
            Euclidean distance calculates the straight-line distance between two
            points in vector space.
          </p>

          <CodeBlock
            code={`For two vectors A and B:

Distance = sqrt(
  (A1 - B1)^2 +
  (A2 - B2)^2 +
  ...
  (An - Bn)^2
)`}
          />

          <p className="text-sm text-[#999]">
            A smaller distance means the vectors are closer together.
          </p>
        </div>

        {/* Dot */}
        <div className="space-y-2">
          <h3 className="font-semibold text-white">C. Dot Product</h3>

          <p className="text-sm leading-6 text-[#bbb]">
            The dot product multiplies corresponding vector values and adds the
            results.
          </p>

          <CodeBlock
            code={`A = [1, 2, 3]
B = [4, 5, 6]

Dot Product:

(1 * 4) + (2 * 5) + (3 * 6)

= 4 + 10 + 18

= 32`}
          />

          <p className="text-sm text-[#999]">
            Dot product is often used for vector retrieval. Its behavior depends
            on vector magnitude and normalization.
          </p>
        </div>

        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full min-w-[450px] text-left text-sm">
            <thead className="bg-white/[0.05] text-white">
              <tr>
                <th className="p-3">Metric</th>
                <th className="p-3">Measures</th>
                <th className="p-3">Better Match</th>
              </tr>
            </thead>
            <tbody className="text-[#bbb]">
              <tr className="border-t border-white/10">
                <td className="p-3">Cosine Similarity</td>
                <td className="p-3">Angle / Direction</td>
                <td className="p-3">Higher score</td>
              </tr>
              <tr className="border-t border-white/10">
                <td className="p-3">Euclidean Distance</td>
                <td className="p-3">Straight-line distance</td>
                <td className="p-3">Lower distance</td>
              </tr>
              <tr className="border-t border-white/10">
                <td className="p-3">Dot Product</td>
                <td className="p-3">Vector alignment and magnitude</td>
                <td className="p-3">Depends on model and setup</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 7 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          7. Types of Embeddings
        </h2>

        <p className="leading-7 text-[#bbb]">
          Embeddings are not limited to text. Different models can convert
          different types of data into vectors.
        </p>

        <div className="grid gap-3 sm:grid-cols-2">
          {[
            [
              "Text Embeddings",
              "Represent sentences, paragraphs, and documents.",
            ],
            [
              "Image Embeddings",
              "Represent visual content and image features.",
            ],
            [
              "Audio Embeddings",
              "Represent audio information and sound features.",
            ],
            [
              "Multimodal Embeddings",
              "Represent information from multiple modalities.",
            ],
          ].map(([title, description]) => (
            <div
              key={title}
              className="rounded-xl border border-white/10 bg-[#1A1A1A] p-4"
            >
              <h3 className="font-semibold text-white">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#999]">
                {description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 8 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          8. Popular Embedding Models
        </h2>

        <p className="leading-7 text-[#bbb]">
          Different providers offer embedding models that can generate vectors
          for AI applications.
        </p>

        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full min-w-[500px] text-left text-sm">
            <thead className="bg-white/[0.05] text-white">
              <tr>
                <th className="p-3">Provider</th>
                <th className="p-3">Model</th>
              </tr>
            </thead>
            <tbody className="text-[#bbb]">
              <tr className="border-t border-white/10">
                <td className="p-3">OpenAI</td>
                <td className="p-3">text-embedding-3-small</td>
              </tr>
              <tr className="border-t border-white/10">
                <td className="p-3">OpenAI</td>
                <td className="p-3">text-embedding-3-large</td>
              </tr>
              <tr className="border-t border-white/10">
                <td className="p-3">Google</td>
                <td className="p-3">Gemini Embedding models</td>
              </tr>
              <tr className="border-t border-white/10">
                <td className="p-3">Cohere</td>
                <td className="p-3">Embed models</td>
              </tr>
              <tr className="border-t border-white/10">
                <td className="p-3">Hugging Face</td>
                <td className="p-3">Sentence Transformers models</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 9 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          9. Embeddings in LangChain
        </h2>

        <p className="leading-7 text-[#bbb]">
          LangChain provides a common embeddings interface so that different
          embedding providers can be used with a similar API.
        </p>

        <h3 className="font-semibold text-white">Install Packages</h3>

        <CodeBlock
          language="bash"
          code={`npm install @langchain/openai @langchain/core`}
        />

        <h3 className="font-semibold text-white">
          Configure OpenAI Embeddings
        </h3>

        <CodeBlock
          language="javascript"
          code={`import { OpenAIEmbeddings } from
  "@langchain/openai";

const embeddings = new OpenAIEmbeddings({
  model: "text-embedding-3-small",
  apiKey: process.env.OPENAI_API_KEY,
});`}
        />

        <h3 className="font-semibold text-white">
          Generate a Single Embedding
        </h3>

        <CodeBlock
          language="javascript"
          code={`const vector = await embeddings.embedQuery(
  "What is Node.js?"
);

console.log(vector);

console.log("Dimensions:", vector.length);`}
        />

        <h3 className="font-semibold text-white">
          Generate Multiple Embeddings
        </h3>

        <CodeBlock
          language="javascript"
          code={`const vectors = await embeddings.embedDocuments([
  "Node.js is a JavaScript runtime.",
  "Express is a Node.js web framework.",
  "MongoDB is a NoSQL database."
]);

console.log(vectors);
console.log("Total vectors:", vectors.length);`}
        />

        <div className="rounded-xl border border-white/10 bg-[#1A1A1A] p-4 space-y-2">
          <p className="font-semibold text-[#FC6C26]">Two Important Methods</p>

          <div>
            <p className="font-medium text-white">embedQuery()</p>
            <p className="text-sm text-[#999]">
              Converts a user query into an embedding vector.
            </p>
          </div>

          <div className="border-t border-white/10 pt-2">
            <p className="font-medium text-white">embedDocuments()</p>
            <p className="text-sm text-[#999]">
              Converts multiple document texts into embedding vectors.
            </p>
          </div>
        </div>
      </section>

      {/* 10 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          10. How Embeddings Work in RAG
        </h2>

        <p className="leading-7 text-[#bbb]">
          In RAG, we generate embeddings for document chunks during indexing and
          for user queries during retrieval.
        </p>

        <CodeBlock
          code={`          INDEXING

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


          RETRIEVAL

       User Question
            |
            v
      Same Embedding Model
            |
            v
        Query Vector
            |
            v
       Similarity Search
            |
            v
      Relevant Documents`}
        />

        <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/[0.05] p-4">
          <p className="font-semibold text-yellow-400">Very Important</p>
          <p className="mt-2 text-sm leading-6 text-[#bbb]">
            Query and document embeddings should be compatible. Generally, use
            the same embedding model and configuration for both. Some retrieval
            models also support different query and document encoding
            instructions, which must follow the model's requirements.
          </p>
        </div>
      </section>

      {/* 11 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          11. Important Points to Remember
        </h2>

        <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-[#bbb]">
          <li>Embeddings convert data into numerical vectors.</li>
          <li>Vectors represent learned features and semantic information.</li>
          <li>
            Vector dimensions define the number of values in an embedding.
          </li>
          <li>Semantic search finds content based on meaning.</li>
          <li>Cosine similarity compares vector directions.</li>
          <li>Euclidean distance measures the distance between vectors.</li>
          <li>
            Embedding models can work with text, images, and other data types.
          </li>
          <li>
            RAG uses embeddings for document indexing and query retrieval.
          </li>
          <li>
            Query and document vectors must be compatible for meaningful
            comparison.
          </li>
        </ul>
      </section>

      {/* 12 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          12. Interview Questions & Answers
        </h2>

        <div className="space-y-4">
          {[
            {
              q: "What are Embeddings?",
              a: "Embeddings are numerical vector representations of data that capture useful semantic information and allow mathematical comparison.",
            },
            {
              q: "Why are embeddings used in RAG?",
              a: "They convert document chunks and user queries into vectors so that semantically relevant information can be retrieved.",
            },
            {
              q: "What is a vector dimension?",
              a: "It is the number of numerical values in an embedding vector.",
            },
            {
              q: "What is Semantic Search?",
              a: "Semantic Search retrieves information based on meaning rather than requiring exact keyword matches.",
            },
            {
              q: "What is Cosine Similarity?",
              a: "It measures the cosine of the angle between two vectors and is commonly used to compare their directions.",
            },
            {
              q: "What is the difference between Cosine Similarity and Euclidean Distance?",
              a: "Cosine similarity compares vector directions, while Euclidean distance measures the straight-line distance between vectors.",
            },
            {
              q: "What is the difference between embedQuery() and embedDocuments()?",
              a: "embedQuery() creates an embedding for a user query, while embedDocuments() creates embeddings for multiple documents.",
            },
            {
              q: "Why should we use compatible embedding models for queries and documents?",
              a: "Their vectors must belong to a compatible embedding space so similarity calculations produce meaningful retrieval results.",
            },
            {
              q: "Does a higher similarity score guarantee identical meaning?",
              a: "No. Similarity scores indicate how closely vectors are related according to a metric, but they do not guarantee factual equivalence.",
            },
            {
              q: "What happens after embeddings are generated in RAG?",
              a: "Document embeddings are stored in a vector database, where they can later be searched using a query embedding.",
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

export default Embeddings;
