import React from "react";
import CodeBlock from "../../components/CodeBlock";

const Chunking = () => {
  return (
    <div className="space-y-8 text-[#E3E3E3]">
      {/* Header */}
      <div>
        <p className="text-sm font-semibold tracking-widest text-[#FC6C26]">
          RAG FUNDAMENTALS / 04
        </p>

        <h1 className="mt-2 text-3xl font-bold">Chunking</h1>

        <p className="mt-3 leading-7 text-[#999]">
          Chunking is the process of dividing large documents into smaller
          pieces of text called chunks. These chunks are easier to embed, store,
          retrieve, and provide to an LLM.
        </p>
      </div>

      {/* 1 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          1. What is Chunking?
        </h2>

        <p className="leading-7 text-[#bbb]">
          Imagine you have a 100-page PDF containing information about Node.js.
          If a user asks a question about the Event Loop, sending the entire PDF
          to the LLM is inefficient.
        </p>

        <p className="leading-7 text-[#bbb]">
          Instead, we divide the document into smaller parts. Each part is
          called a chunk.
        </p>

        <CodeBlock
          code={`Original Document
        |
        v
+---------------------------+
| Complete 100-page PDF     |
+---------------------------+
        |
        v
      Chunking
        |
        +----------+----------+----------+
        |          |          |          |
        v          v          v          v
     Chunk 1    Chunk 2    Chunk 3    Chunk 4
     Intro      Modules    Events     Streams`}
        />

        <div className="rounded-xl border border-white/10 bg-[#1A1A1A] p-4">
          <p className="font-semibold text-[#FC6C26]">Simple Definition</p>
          <p className="mt-2 text-sm leading-6 text-[#bbb]">
            Chunking = Breaking a large document into smaller, manageable pieces
            of text.
          </p>
        </div>
      </section>

      {/* 2 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          2. Why Do We Need Chunking?
        </h2>

        <p className="leading-7 text-[#bbb]">
          Chunking solves several problems when building RAG applications.
        </p>

        <div className="grid gap-3 sm:grid-cols-2">
          {[
            [
              "Better Retrieval",
              "The system can find specific information instead of retrieving an entire document.",
            ],
            [
              "Less Context Usage",
              "Only relevant chunks are sent to the LLM instead of complete documents.",
            ],
            [
              "Better Embeddings",
              "Smaller text sections can represent individual topics more clearly.",
            ],
            [
              "Efficient Storage",
              "Documents can be indexed and searched as separate units.",
            ],
            [
              "Faster Search",
              "The retriever can search through smaller pieces of information.",
            ],
            [
              "Focused Answers",
              "The LLM receives more relevant context for answering questions.",
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

      {/* 3 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#FC6C26]">3. Chunk Size</h2>

        <p className="leading-7 text-[#bbb]">
          Chunk Size defines how much text a single chunk can contain. It is
          commonly measured in characters or tokens, depending on the splitter
          configuration.
        </p>

        <CodeBlock
          code={`Original Text:
"Node.js is a JavaScript runtime.
It uses the V8 engine.
It supports asynchronous operations."

Chunk Size = 50 characters (illustrative)

Chunk 1:
"Node.js is a JavaScript runtime."

Chunk 2:
"It uses the V8 engine."

Chunk 3:
"It supports asynchronous operations."`}
        />

        <h3 className="font-semibold text-white">Small vs Large Chunks</h3>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-white/10 bg-[#1A1A1A] p-4">
            <h3 className="font-semibold text-white">Small Chunks</h3>
            <p className="mt-2 text-sm leading-6 text-[#999]">Advantages:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-[#bbb]">
              <li>More focused retrieval.</li>
              <li>Less irrelevant information.</li>
              <li>Smaller context per result.</li>
            </ul>
            <p className="mt-3 text-sm text-red-400">
              Disadvantage: Important context may get separated.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-[#1A1A1A] p-4">
            <h3 className="font-semibold text-white">Large Chunks</h3>
            <p className="mt-2 text-sm leading-6 text-[#999]">Advantages:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-[#bbb]">
              <li>More surrounding context.</li>
              <li>Related information stays together.</li>
              <li>Fewer individual chunks.</li>
            </ul>
            <p className="mt-3 text-sm text-red-400">
              Disadvantage: Retrieval may include irrelevant content.
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/[0.05] p-4">
          <p className="font-semibold text-yellow-400">Important</p>
          <p className="mt-2 text-sm leading-6 text-[#bbb]">
            There is no universally perfect chunk size. It depends on the
            document type, retrieval strategy, embedding model, and application
            requirements. Always evaluate it using real queries.
          </p>
        </div>
      </section>

      {/* 4 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          4. Chunk Overlap
        </h2>

        <p className="leading-7 text-[#bbb]">
          Chunk Overlap means repeating some text from the previous chunk in the
          next chunk.
        </p>

        <p className="leading-7 text-[#bbb]">
          Why? Because splitting text can separate related sentences. Overlap
          helps preserve context across chunk boundaries.
        </p>

        <CodeBlock
          code={`Original Text:
"A server receives requests.
It processes each request.
Then it sends a response."

Without Overlap:

Chunk 1:
"A server receives requests."

Chunk 2:
"It processes each request."

Chunk 3:
"Then it sends a response."


With Overlap (illustrative):

Chunk 1:
"A server receives requests.
It processes each request."

Chunk 2:
"It processes each request.
Then it sends a response."`}
        />

        <h3 className="font-semibold text-white">
          Chunk Size vs Chunk Overlap
        </h3>

        <CodeBlock
          code={`chunkSize = 500
chunkOverlap = 100

Chunk 1: Characters 0 - 499
Chunk 2: Characters 400 - 899
Chunk 3: Characters 800 - 1299`}
        />

        <p className="text-sm leading-6 text-[#999]">
          Here, 100 characters from one chunk are repeated in the next chunk.
        </p>

        <div className="rounded-xl border border-white/10 bg-[#1A1A1A] p-4">
          <p className="font-semibold text-[#FC6C26]">Too Much Overlap?</p>
          <p className="mt-2 text-sm leading-6 text-[#bbb]">
            Excessive overlap creates duplicate content, increases storage
            requirements, and may produce repeated retrieval results.
          </p>
        </div>
      </section>

      {/* 5 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          5. Types of Chunking Strategies
        </h2>

        <p className="leading-7 text-[#bbb]">
          Different documents need different chunking strategies. Here are some
          commonly used approaches.
        </p>

        {/* Fixed */}
        <div className="space-y-2">
          <h3 className="font-semibold text-white">A. Fixed-Size Chunking</h3>

          <p className="text-sm leading-6 text-[#bbb]">
            Divides text into chunks using a fixed number of characters or
            tokens.
          </p>

          <CodeBlock
            code={`Text:
ABCDEFGHIJKLMNOPQRSTUVWXYZ

Chunk Size = 5

Chunk 1: ABCDE
Chunk 2: FGHIJ
Chunk 3: KLMNO
Chunk 4: PQRST
Chunk 5: UVWXY
Chunk 6: Z`}
          />

          <p className="text-sm text-[#999]">
            Simple and predictable, but it can split sentences or paragraphs.
          </p>
        </div>

        {/* Recursive */}
        <div className="space-y-2">
          <h3 className="font-semibold text-white">
            B. Recursive Character Chunking
          </h3>

          <p className="text-sm leading-6 text-[#bbb]">
            Attempts to split text using larger structural boundaries first,
            then smaller separators if needed.
          </p>

          <CodeBlock
            code={`Typical separator order:

1. Paragraph: \\n\\n
2. Line:      \\n
3. Sentence:  .
4. Word:      " "
5. Character: ""

The splitter tries to preserve larger text units
before splitting them into smaller pieces.`}
          />

          <p className="text-sm leading-6 text-[#999]">
            This is a common general-purpose strategy and is available in
            LangChain.
          </p>
        </div>

        {/* Sentence */}
        <div className="space-y-2">
          <h3 className="font-semibold text-white">
            C. Sentence-Based Chunking
          </h3>

          <p className="text-sm leading-6 text-[#bbb]">
            Splits documents at sentence boundaries instead of cutting text at
            an arbitrary character position.
          </p>

          <CodeBlock
            code={`Original:
"Node.js is a runtime. It uses V8.
It supports asynchronous operations."

Chunks:
1. "Node.js is a runtime."
2. "It uses V8."
3. "It supports asynchronous operations."`}
          />

          <p className="text-sm text-[#999]">
            Useful when preserving complete sentences is important.
          </p>
        </div>

        {/* Semantic */}
        <div className="space-y-2">
          <h3 className="font-semibold text-white">D. Semantic Chunking</h3>

          <p className="text-sm leading-6 text-[#bbb]">
            Groups sentences according to their meaning rather than using only
            fixed character boundaries.
          </p>

          <CodeBlock
            code={`Document:
"Node.js uses V8."
"Node.js supports asynchronous I/O."
"Express is a web framework."
"Express provides routing."

Semantic Groups:

Chunk 1:
Node.js concepts

Chunk 2:
Express concepts`}
          />

          <p className="text-sm text-[#999]">
            Useful when topic boundaries matter, but it may require embedding
            comparisons and additional processing.
          </p>
        </div>

        {/* Structure */}
        <div className="space-y-2">
          <h3 className="font-semibold text-white">
            E. Structure-Based Chunking
          </h3>

          <p className="text-sm leading-6 text-[#bbb]">
            Splits content according to its existing structure, such as
            headings, sections, paragraphs, or HTML elements.
          </p>

          <CodeBlock
            code={`# Node.js

## Introduction
Node.js is a JavaScript runtime.

## Features
Node.js supports asynchronous I/O.

## Modules
Node.js uses a module system.

Each section can become a separate chunk.`}
          />

          <p className="text-sm text-[#999]">
            Particularly useful for documentation, Markdown, HTML, and
            structured content.
          </p>
        </div>
      </section>

      {/* 6 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          6. Chunking in LangChain
        </h2>

        <p className="leading-7 text-[#bbb]">
          LangChain provides text splitters to divide documents into smaller
          pieces.
        </p>

        <h3 className="font-semibold text-white">
          RecursiveCharacterTextSplitter
        </h3>

        <p className="text-sm leading-6 text-[#999]">
          It tries to keep paragraphs, lines, and other larger text units
          together before splitting into smaller units.
        </p>

        <h3 className="font-semibold text-white">Installation</h3>

        <CodeBlock
          language="bash"
          code={`npm install @langchain/core @langchain/textsplitters`}
        />

        <h3 className="font-semibold text-white">Example</h3>

        <CodeBlock
          language="javascript"
          code={`import { RecursiveCharacterTextSplitter } from
  "@langchain/textsplitters";

const text = \`
Node.js is a JavaScript runtime.

It uses the V8 JavaScript engine.

It supports asynchronous I/O.
\`;

const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 100,
  chunkOverlap: 20,
});

const chunks = await splitter.splitText(text);

console.log(chunks);`}
        />

        <h3 className="font-semibold text-white">Splitting Document Objects</h3>

        <CodeBlock
          language="javascript"
          code={`import { Document } from "@langchain/core/documents";
import { RecursiveCharacterTextSplitter } from
  "@langchain/textsplitters";

const documents = [
  new Document({
    pageContent: "Node.js is a JavaScript runtime...",
    metadata: {
      source: "nodejs.pdf",
      page: 1,
    },
  }),
];

const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 500,
  chunkOverlap: 50,
});

const chunks = await splitter.splitDocuments(documents);

console.log(chunks);`}
        />

        <p className="text-sm leading-6 text-[#999]">
          splitText() splits a text string. splitDocuments() splits Document
          objects and carries their metadata into the resulting chunks.
        </p>
      </section>

      {/* 7 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          7. What Happens After Chunking?
        </h2>

        <p className="leading-7 text-[#bbb]">
          Once documents are divided into chunks, each chunk is converted into
          an embedding and stored in a vector database.
        </p>

        <CodeBlock
          code={`Processed Documents
        |
        v
      Chunking
        |
        v
   Multiple Chunks
        |
        v
  Embedding Model
        |
        v
   Vector Database
        |
        v
    Retrieval`}
        />

        <p className="text-sm leading-6 text-[#999]">
          We will explore embedding generation in the next topic.
        </p>
      </section>

      {/* 8 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          8. Common Chunking Mistakes
        </h2>

        <div className="space-y-3">
          {[
            [
              "Very Small Chunks",
              "Can separate important context and produce incomplete retrieval results.",
            ],
            [
              "Very Large Chunks",
              "Can include irrelevant information and consume more context.",
            ],
            [
              "No Overlap",
              "May lose useful context between neighboring chunks.",
            ],
            [
              "Excessive Overlap",
              "Creates repeated content and increases storage.",
            ],
            [
              "Ignoring Document Structure",
              "Can separate headings from their related content.",
            ],
            [
              "Using the Same Settings Everywhere",
              "Different document types may need different chunking strategies.",
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

      {/* 9 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          9. Important Points to Remember
        </h2>

        <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-[#bbb]">
          <li>A chunk is a smaller piece of a larger document.</li>
          <li>Chunk size defines the maximum size of a chunk.</li>
          <li>
            Chunk overlap repeats some content between neighboring chunks.
          </li>
          <li>Small chunks improve focus but may lose context.</li>
          <li>
            Large chunks preserve context but may include irrelevant text.
          </li>
          <li>Recursive splitting tries to preserve larger text boundaries.</li>
          <li>Semantic chunking groups content based on meaning.</li>
          <li>
            Chunking happens before embedding generation in a typical RAG
            indexing pipeline.
          </li>
        </ul>
      </section>

      {/* 10 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          10. Interview Questions & Answers
        </h2>

        <div className="space-y-4">
          {[
            {
              q: "What is Chunking in RAG?",
              a: "Chunking is the process of dividing large documents into smaller text pieces so they can be embedded, stored, and retrieved efficiently.",
            },
            {
              q: "Why is Chunking important?",
              a: "It improves retrieval focus, reduces unnecessary context, and makes large documents easier to process.",
            },
            {
              q: "What is Chunk Size?",
              a: "Chunk size defines the maximum size of a text chunk, commonly measured in characters or tokens.",
            },
            {
              q: "What is Chunk Overlap?",
              a: "Chunk overlap is the repeated text shared between neighboring chunks to preserve context across chunk boundaries.",
            },
            {
              q: "What happens if Chunk Size is too small?",
              a: "Related information may get separated, causing the retriever to return incomplete context.",
            },
            {
              q: "What happens if Chunk Size is too large?",
              a: "Chunks may contain irrelevant information, use more context, and reduce retrieval precision.",
            },
            {
              q: "What is Recursive Character Chunking?",
              a: "It is a splitting strategy that tries larger separators such as paragraphs and newlines before using smaller separators such as spaces or characters.",
            },
            {
              q: "What is Semantic Chunking?",
              a: "It groups text according to semantic meaning or topic boundaries rather than relying only on fixed text lengths.",
            },
            {
              q: "What is the difference between splitText() and splitDocuments()?",
              a: "splitText() splits a string into text chunks. splitDocuments() splits Document objects and preserves their metadata in the resulting documents.",
            },
            {
              q: "What happens after Chunking in a basic RAG pipeline?",
              a: "The chunks are converted into embeddings and stored in a vector database for retrieval.",
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

export default Chunking;
