import React from "react";
import CodeBlock from "../../components/CodeBlock";

const TextSplitters = () => {
  return (
    <div className="space-y-8 text-[#E3E3E3]">

      {/* HEADER */}
      <div>
        <p className="text-sm font-semibold tracking-widest text-[#FC6C26]">
          LANGCHAIN ADVANCED / 02
        </p>
        <h1 className="text-3xl font-bold mt-2">Text Splitters</h1>
        <p className="text-[#999] mt-3 leading-7">
          Text Splitters divide large documents into smaller pieces called
          chunks. These chunks are easier to process, embed, store, and retrieve
          in a RAG application.
        </p>
      </div>

      {/* 1 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">1. What are Text Splitters?</h2>
        <p className="text-[#aaa] leading-7">
          Imagine you have a PDF containing 100 pages. Sending the entire
          document to an embedding model or an LLM may be inefficient or exceed
          the model's context limit.
        </p>
        <p className="text-[#aaa] leading-7">
          A Text Splitter breaks this large document into smaller chunks.
          Each chunk can then be converted into an embedding and stored in a
          vector database.
        </p>

        <div className="bg-[#1A1A1A] border border-white/10 rounded-xl p-5 space-y-3">
          <p className="font-semibold text-[#FC6C26]">Example</p>
          <div className="bg-white/[0.04] rounded-lg p-3 text-center">
            <p className="font-medium">Large Document</p>
            <p className="text-xs text-[#999] mt-1">100 pages of content</p>
          </div>
          <div className="text-center text-[#FC6C26] text-xl">↓</div>
          <div className="bg-white/[0.04] rounded-lg p-3 text-center">
            <p className="font-medium">Text Splitter</p>
            <p className="text-xs text-[#999] mt-1">Divides the document</p>
          </div>
          <div className="text-center text-[#FC6C26] text-xl">↓</div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {["Chunk 1", "Chunk 2", "Chunk 3", "Chunk 4", "Chunk 5", "Chunk 6"].map((item) => (
              <div key={item} className="bg-[#FC6C26]/10 border border-[#FC6C26]/20 rounded-lg p-3 text-center text-sm">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">2. Why do we need Text Splitters?</h2>
        <p className="text-[#aaa] leading-7">
          Text splitting improves how documents are processed and searched in
          RAG systems.
        </p>

        <div className="grid sm:grid-cols-2 gap-3">
          {[
            ["Context Limits", "Large documents may exceed an LLM's context window."],
            ["Better Retrieval", "Small chunks help retrieve only the relevant information."],
            ["Embedding Efficiency", "Smaller pieces can be embedded independently."],
            ["Reduced Token Usage", "The application can send only relevant chunks to the LLM."]
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
        <h2 className="text-2xl font-semibold">3. Important Concepts</h2>

        <div className="space-y-4">
          <div className="bg-[#1A1A1A] border border-white/10 rounded-xl p-4">
            <h3 className="font-semibold text-[#FC6C26]">Chunk Size</h3>
            <p className="text-[#aaa] mt-2 leading-7">
              Chunk size defines the maximum size of each chunk. In the
              RecursiveCharacterTextSplitter, it is measured in characters
              by default, not tokens.
            </p>
            <CodeBlock code={`const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 500,
});`} />
            <p className="text-sm text-[#999] mt-2">
              Each chunk will contain approximately 500 characters or fewer.
            </p>
          </div>

          <div className="bg-[#1A1A1A] border border-white/10 rounded-xl p-4">
            <h3 className="font-semibold text-[#FC6C26]">Chunk Overlap</h3>
            <p className="text-[#aaa] mt-2 leading-7">
              Chunk overlap defines how much content is repeated between
              consecutive chunks. It helps preserve context when a sentence
              or idea is divided between chunks.
            </p>
            <CodeBlock code={`const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 500,
  chunkOverlap: 50,
});`} />
            <p className="text-sm text-[#999] mt-2">
              Approximately 50 characters from one chunk can overlap with
              the next chunk.
            </p>
          </div>
        </div>

        <CodeBlock code={`Chunk 1: [A B C D E F]
Chunk 2:           [E F G H I J]
                      ↑
                 Overlap`} />
      </section>

      {/* 4 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">4. Types of Text Splitters</h2>
        <p className="text-[#aaa] leading-7">
          LangChain provides different splitters for different types of
          content.
        </p>

        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full text-sm text-left">
            <thead className="bg-white/[0.05] text-[#FC6C26]">
              <tr>
                <th className="p-3">Splitter</th>
                <th className="p-3">Purpose</th>
              </tr>
            </thead>
            <tbody className="text-[#aaa] divide-y divide-white/10">
              <tr>
                <td className="p-3 font-medium text-[#E3E3E3]">CharacterTextSplitter</td>
                <td className="p-3">Splits text using a specified separator.</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-[#E3E3E3]">RecursiveCharacterTextSplitter</td>
                <td className="p-3">Tries multiple separators to preserve text structure.</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-[#E3E3E3]">TokenTextSplitter</td>
                <td className="p-3">Splits text according to token limits.</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-[#E3E3E3]">MarkdownTextSplitter</td>
                <td className="p-3">Splits Markdown content using Markdown structure.</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-[#E3E3E3]">HTMLTextSplitter</td>
                <td className="p-3">Splits HTML content using HTML structure.</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-[#E3E3E3]">Language-specific Splitters</td>
                <td className="p-3">Split code using language-aware separators.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 5 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">5. CharacterTextSplitter</h2>
        <p className="text-[#aaa] leading-7">
          CharacterTextSplitter divides text using a specified separator.
          For example, you can split text at every paragraph or newline.
        </p>

        <CodeBlock code={`import { CharacterTextSplitter } from "@langchain/textsplitters";

const text = \`
LangChain is a framework for building LLM applications.

It provides tools for working with models, prompts, and chains.

It also supports RAG and AI agents.
\`;

const splitter = new CharacterTextSplitter({
  separator: "\\\\n\\\\n",
  chunkSize: 100,
  chunkOverlap: 0,
});

const chunks = await splitter.splitText(text);

console.log(chunks);`} />

        <p className="text-sm text-[#999]">
          Here, double newlines separate paragraphs. If a paragraph is too
          large, it may be split further to respect the configured size.
        </p>
      </section>

      {/* 6 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">6. RecursiveCharacterTextSplitter</h2>
        <p className="text-[#aaa] leading-7">
          RecursiveCharacterTextSplitter is one of the most commonly used
          splitters in RAG applications.
        </p>
        <p className="text-[#aaa] leading-7">
          Instead of immediately cutting text at a fixed position, it tries
          different separators in order. This helps keep paragraphs and
          sentences together whenever possible.
        </p>

        <CodeBlock code={`import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

const text = \`
LangChain helps developers build applications with LLMs.

It provides integrations for models, prompts, and tools.

RAG allows applications to retrieve relevant external information.
\`;

const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 100,
  chunkOverlap: 20,
});

const chunks = await splitter.splitText(text);

console.log(chunks);`} />

        <h3 className="font-semibold text-[#FC6C26]">How does it work?</h3>
        <p className="text-[#aaa] leading-7">
          By default, it tries separators in this order:
        </p>

        <CodeBlock code={`[
  "\\\\n\\\\n",  // Paragraph breaks
  "\\\\n",    // Line breaks
  " ",      // Spaces
  ""        // Individual characters (last option)
]`} />

        <p className="text-[#aaa] leading-7">
          It first tries paragraph boundaries. If a piece is still too large,
          it tries smaller separators. This process continues until the chunks
          fit the configured size as closely as possible.
        </p>
      </section>

      {/* 7 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">7. TokenTextSplitter</h2>
        <p className="text-[#aaa] leading-7">
          LLMs process text as tokens, not simply characters. TokenTextSplitter
          divides text based on token limits.
        </p>

        <CodeBlock code={`import { TokenTextSplitter } from "@langchain/textsplitters";

const splitter = new TokenTextSplitter({
  encodingName: "cl100k_base",
  chunkSize: 100,
  chunkOverlap: 10,
});

const chunks = await splitter.splitText(text);

console.log(chunks);`} />

        <div className="bg-[#FC6C26]/10 border border-[#FC6C26]/20 rounded-xl p-4">
          <p className="font-semibold text-[#FC6C26]">Important</p>
          <p className="text-sm text-[#aaa] mt-2 leading-6">
            TokenTextSplitter uses a tokenizer encoding. The correct encoding
            depends on the model or tokenizer you are working with. Token
            counts are not the same as character counts.
          </p>
        </div>
      </section>

      {/* 8 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">8. MarkdownTextSplitter</h2>
        <p className="text-[#aaa] leading-7">
          MarkdownTextSplitter is useful when your source documents contain
          Markdown headings, paragraphs, and other Markdown syntax.
        </p>

        <CodeBlock code={`import { MarkdownTextSplitter } from "@langchain/textsplitters";

const markdown = \`
# Introduction

LangChain is used to build LLM applications.

## RAG

RAG retrieves external information for an LLM.

## Agents

Agents can use tools to complete tasks.
\`;

const splitter = new MarkdownTextSplitter({
  chunkSize: 100,
  chunkOverlap: 10,
});

const chunks = await splitter.splitText(markdown);

console.log(chunks);`} />

        <p className="text-[#aaa] leading-7">
          Note: MarkdownTextSplitter uses Markdown-related separators. If you
          need to preserve heading levels as structured metadata, consider
          MarkdownHeaderTextSplitter.
        </p>
      </section>

      {/* 9 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">9. Splitting Documents</h2>
        <p className="text-[#aaa] leading-7">
          So far, we have used splitText() to split a normal string.
          But in RAG applications, we usually work with Document objects
          returned by document loaders.
        </p>

        <p className="text-[#aaa] leading-7">
          For this purpose, LangChain provides splitDocuments().
        </p>

        <CodeBlock code={`import { TextLoader } from "@langchain/classic/document_loaders/fs/text";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

const loader = new TextLoader("./data.txt");

const documents = await loader.load();

const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 500,
  chunkOverlap: 50,
});

const splitDocs = await splitter.splitDocuments(documents);

console.log(splitDocs);`} />

        <p className="text-[#aaa] leading-7">
          splitDocuments() splits the pageContent of Document objects and
          generally carries their metadata into the resulting chunks.
        </p>
      </section>

      {/* 10 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">10. splitText() vs splitDocuments()</h2>

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
                <td className="p-3 text-[#E3E3E3]">splitText()</td>
                <td className="p-3">String</td>
                <td className="p-3">Array of strings</td>
              </tr>
              <tr>
                <td className="p-3 text-[#E3E3E3]">splitDocuments()</td>
                <td className="p-3">Document[]</td>
                <td className="p-3">Document[]</td>
              </tr>
            </tbody>
          </table>
        </div>

        <CodeBlock code={`// String input
const chunks = await splitter.splitText("Large text...");

// Document input
const splitDocs = await splitter.splitDocuments(documents);`} />
      </section>

      {/* 11 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">11. Text Splitting in RAG Pipeline</h2>
        <p className="text-[#aaa] leading-7">
          Text splitting happens after document loading and before embedding
          generation.
        </p>

        <CodeBlock code={`Documents
    |
    v
Document Loaders
    |
    v
Text Splitters
    |
    v
Small Chunks
    |
    v
Embedding Model
    |
    v
Vector Database
    |
    v
Retriever
    |
    v
LLM Response`} />

        <p className="text-[#aaa] leading-7">
          During a user query, the retriever searches for relevant chunks.
          Those chunks are then passed to the LLM as context.
        </p>
      </section>

      {/* 12 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">12. How to Choose Chunk Size?</h2>
        <p className="text-[#aaa] leading-7">
          There is no perfect chunk size for every application. It depends on
          the document type, retrieval requirements, and embedding model.
        </p>

        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full text-sm text-left">
            <thead className="bg-white/[0.05] text-[#FC6C26]">
              <tr>
                <th className="p-3">Chunk Size</th>
                <th className="p-3">Possible Use</th>
              </tr>
            </thead>
            <tbody className="text-[#aaa] divide-y divide-white/10">
              <tr>
                <td className="p-3">Small</td>
                <td className="p-3">Precise retrieval of short facts.</td>
              </tr>
              <tr>
                <td className="p-3">Medium</td>
                <td className="p-3">General-purpose RAG applications.</td>
              </tr>
              <tr>
                <td className="p-3">Large</td>
                <td className="p-3">Content requiring more surrounding context.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-[#1A1A1A] border border-white/10 rounded-xl p-4">
          <p className="font-semibold text-[#FC6C26]">Practical Tip</p>
          <p className="text-sm text-[#aaa] mt-2 leading-6">
            Start with a moderate chunk size and overlap, then evaluate retrieval
            quality using your actual documents and queries. Do not choose
            values only by following a fixed rule.
          </p>
        </div>
      </section>

      {/* 13 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">13. Common Mistakes</h2>

        <div className="space-y-3">
          {[
            ["Very Small Chunks", "Important context may be separated across too many chunks."],
            ["Very Large Chunks", "Retrieval may return unnecessary information."],
            ["No Overlap", "Context can be lost when an idea crosses a chunk boundary."],
            ["Wrong Splitting Strategy", "Plain character splitting may break code, tables, or structured content."],
            ["Ignoring Metadata", "Losing source information makes it harder to identify where a chunk came from."]
          ].map(([title, desc]) => (
            <div key={title} className="border-l-2 border-[#FC6C26] bg-white/[0.03] p-4 rounded-r-lg">
              <h3 className="font-semibold">{title}</h3>
              <p className="text-sm text-[#aaa] mt-1">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 14 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">14. Interview Questions & Answers</h2>

        {[
          ["What is a Text Splitter?", "A component that divides large text or documents into smaller chunks."],
          ["Why do we need text splitting in RAG?", "It makes documents easier to embed and helps retrieve relevant portions instead of processing entire documents."],
          ["What is chunk size?", "The maximum target size of a chunk, measured according to the splitter's configured length function."],
          ["What is chunk overlap?", "The amount of content shared between consecutive chunks to help preserve context."],
          ["What is RecursiveCharacterTextSplitter?", "A splitter that tries multiple separators, from larger text boundaries to smaller ones, to create chunks."],
          ["CharacterTextSplitter vs RecursiveCharacterTextSplitter?", "CharacterTextSplitter uses a specified separator, while RecursiveCharacterTextSplitter tries a sequence of separators."],
          ["splitText() vs splitDocuments()?", "splitText() accepts a string and returns strings. splitDocuments() accepts Document objects and returns Document objects."],
          ["Does chunkSize mean tokens?", "Not always. RecursiveCharacterTextSplitter measures characters by default. Token-based splitting requires a token-aware splitter or length function."],
          ["Does splitting generate embeddings?", "No. Splitting only creates chunks. An embedding model converts those chunks into vectors in a separate step."],
          ["Which splitter is commonly used in RAG?", "RecursiveCharacterTextSplitter is a common general-purpose choice because it tries to preserve natural text boundaries."]
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

export default TextSplitters;