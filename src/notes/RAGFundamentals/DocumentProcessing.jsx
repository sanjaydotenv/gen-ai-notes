import React from "react";
import CodeBlock from "../../components/CodeBlock";

const DocumentProcessing = () => {
  return (
    <div className="space-y-8 text-[#E3E3E3]">
      {/* Header */}
      <div>
        <p className="text-sm font-semibold tracking-widest text-[#FC6C26]">
          RAG FUNDAMENTALS / 03
        </p>

        <h1 className="mt-2 text-3xl font-bold">Document Processing</h1>

        <p className="mt-3 leading-7 text-[#999]">
          Document Processing is the process of extracting, cleaning,
          transforming, and preparing raw documents before converting them into
          chunks and embeddings for a RAG application.
        </p>
      </div>

      {/* 1 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          1. What is Document Processing?
        </h2>

        <p className="leading-7 text-[#bbb]">
          Real-world data is not always ready for an AI application. It may
          contain unnecessary spaces, headers, footers, duplicate content,
          formatting issues, or irrelevant information.
        </p>

        <p className="leading-7 text-[#bbb]">
          Document Processing prepares this raw data into a clean, structured
          format that can be used by the RAG pipeline.
        </p>

        <CodeBlock
          code={`Raw Documents
      |
      v
  Extraction
      |
      v
  Text Cleaning
      |
      v
  Normalization
      |
      v
 Metadata Extraction
      |
      v
 Processed Documents
      |
      v
  Text Chunking`}
        />

        <div className="rounded-xl border border-white/10 bg-[#1A1A1A] p-4">
          <p className="font-semibold text-[#FC6C26]">Simple Example</p>

          <p className="mt-2 text-sm text-[#999]">
            Suppose a PDF contains unnecessary line breaks, repeated page
            numbers, and extra spaces. Document Processing removes or handles
            these issues before the text is stored and indexed.
          </p>
        </div>
      </section>

      {/* 2 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          2. Sources of Documents
        </h2>

        <p className="leading-7 text-[#bbb]">
          A RAG application can collect information from different sources.
        </p>

        <div className="grid gap-3 sm:grid-cols-2">
          {[
            ["PDF Files", "Books, manuals, reports, and research papers."],
            ["Text Files", "Plain text and documentation files."],
            ["Websites", "Articles, blogs, and web documentation."],
            ["Word Documents", "DOC and DOCX files."],
            ["Databases", "Records stored in SQL or NoSQL databases."],
            ["APIs", "External services returning structured data."],
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
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          3. Document Loading and Extraction
        </h2>

        <p className="leading-7 text-[#bbb]">
          First, we need to extract readable content from our original data
          sources.
        </p>

        <p className="leading-7 text-[#bbb]">
          A document loader reads a file or data source and converts its content
          into a common document structure.
        </p>

        <CodeBlock
          code={`PDF / TXT / DOCX / Website
             |
             v
       Document Loader
             |
             v
      Extracted Text
             |
             v
       Document Object`}
        />

        <h3 className="font-semibold text-white">LangChain Document Object</h3>

        <p className="text-sm leading-6 text-[#999]">
          LangChain represents loaded content using a Document object. It mainly
          contains two properties:
        </p>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-white/10 bg-[#1A1A1A] p-4">
            <h3 className="font-semibold text-white">pageContent</h3>
            <p className="mt-2 text-sm text-[#999]">
              Contains the actual extracted text.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-[#1A1A1A] p-4">
            <h3 className="font-semibold text-white">metadata</h3>
            <p className="mt-2 text-sm text-[#999]">
              Contains additional information such as source, page number, or
              document ID.
            </p>
          </div>
        </div>

        <CodeBlock
          code={`Document {
  pageContent: "Node.js is a JavaScript runtime...",
  metadata: {
    source: "nodejs.pdf",
    page: 1
  }
}`}
        />
      </section>

      {/* 4 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          4. Text Cleaning
        </h2>

        <p className="leading-7 text-[#bbb]">
          Extracted text may contain unnecessary characters, repeated spaces,
          blank lines, or formatting problems. Text cleaning removes unwanted
          content.
        </p>

        <h3 className="font-semibold text-white">Before Cleaning</h3>

        <CodeBlock
          code={`"   Node.js    is a runtime.\\n\\n\\n
   It uses the V8 engine.   "`}
        />

        <h3 className="font-semibold text-white">After Cleaning</h3>

        <CodeBlock
          code={`"Node.js is a runtime.
It uses the V8 engine."`}
        />

        <h3 className="font-semibold text-white">JavaScript Example</h3>

        <CodeBlock
          language="javascript"
          code={`function cleanText(text) {
  return text
    .replace(/\\r\\n/g, "\\n")
    .replace(/[ \\t]+/g, " ")
    .replace(/\\n{3,}/g, "\\n\\n")
    .trim();
}

const rawText = "   Node.js    is a runtime.\\n\\n\\n";

const cleanedText = cleanText(rawText);

console.log(cleanedText);`}
        />

        <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/[0.05] p-4">
          <p className="font-semibold text-yellow-400">Important</p>
          <p className="mt-2 text-sm leading-6 text-[#bbb]">
            Cleaning should not remove meaningful content. For example, removing
            all line breaks may destroy paragraph boundaries or code formatting.
            Always clean according to the document type.
          </p>
        </div>
      </section>

      {/* 5 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          5. Text Normalization
        </h2>

        <p className="leading-7 text-[#bbb]">
          Normalization converts text into a consistent format. It helps reduce
          unnecessary differences in how information is represented.
        </p>

        <p className="text-sm text-[#999]">Common normalization operations:</p>

        <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-[#bbb]">
          <li>Standardizing line endings.</li>
          <li>Removing unwanted whitespace.</li>
          <li>Handling Unicode characters consistently.</li>
          <li>Standardizing repeated formatting patterns.</li>
          <li>
            Converting dates or values into a consistent format when required.
          </li>
        </ul>

        <CodeBlock
          language="javascript"
          code={`const text = "Node.js\\r\\n   uses JavaScript.  ";

const normalizedText = text
  .normalize("NFC")
  .replace(/\\r\\n?/g, "\\n")
  .replace(/[ \\t]+/g, " ")
  .trim();

console.log(normalizedText);

// Node.js
// uses JavaScript.`}
        />

        <p className="text-sm leading-6 text-[#999]">
          Unicode normalization is useful when visually identical characters may
          have different underlying representations.
        </p>
      </section>

      {/* 6 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          6. Metadata Extraction
        </h2>

        <p className="leading-7 text-[#bbb]">
          Metadata is additional information about a document. It helps
          identify, filter, organize, and track documents during retrieval.
        </p>

        <CodeBlock
          language="javascript"
          code={`const document = {
  pageContent: "Node.js is a JavaScript runtime.",

  metadata: {
    source: "nodejs-guide.pdf",
    page: 5,
    category: "Backend",
    author: "Technical Team",
    createdAt: "2026-11-18"
  }
};`}
        />

        <h3 className="font-semibold text-white">Why Is Metadata Useful?</h3>

        <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-[#bbb]">
          <li>Identify the original document.</li>
          <li>Track page numbers and document locations.</li>
          <li>Filter search results by category or source.</li>
          <li>Display references or citations with answers.</li>
          <li>Manage document updates and deletion.</li>
        </ul>

        <CodeBlock
          code={`Example Metadata Filter:

{
  category: "Backend",
  source: "nodejs-guide.pdf"
}

Only search documents matching these filters.`}
        />
      </section>

      {/* 7 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          7. Duplicate Detection
        </h2>

        <p className="leading-7 text-[#bbb]">
          Sometimes the same document or content is uploaded multiple times.
          Storing duplicates can waste storage and produce repeated search
          results.
        </p>

        <p className="leading-7 text-[#bbb]">
          We can generate a hash of document content and use it to identify
          exact duplicates.
        </p>

        <CodeBlock
          language="javascript"
          code={`import { createHash } from "node:crypto";

function generateHash(text) {
  return createHash("sha256")
    .update(text)
    .digest("hex");
}

const first = "Node.js is a runtime.";
const second = "Node.js is a runtime.";

console.log(generateHash(first) === generateHash(second));

// true`}
        />

        <p className="text-sm leading-6 text-[#999]">
          A content hash can detect exact duplicates. Detecting similar but
          differently written documents requires additional techniques.
        </p>
      </section>

      {/* 8 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          8. Processed Documents
        </h2>

        <p className="leading-7 text-[#bbb]">
          After extraction, cleaning, normalization, and metadata processing, we
          have a prepared document that can move to the next stage of the RAG
          pipeline.
        </p>

        <CodeBlock
          language="javascript"
          code={`const processedDocument = {
  pageContent: \`
    Node.js is a JavaScript runtime.
    It uses the V8 engine.
  \`,

  metadata: {
    source: "nodejs-guide.pdf",
    page: 1,
    category: "Backend"
  }
};

console.log(processedDocument);`}
        />

        <CodeBlock
          code={`Raw PDF
   |
   v
Document Loader
   |
   v
Text Extraction
   |
   v
Cleaning & Normalization
   |
   v
Metadata Extraction
   |
   v
Duplicate Check
   |
   v
Processed Document
   |
   v
Text Splitting (Next Step)`}
        />
      </section>

      {/* 9 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          9. Document Processing in LangChain
        </h2>

        <p className="leading-7 text-[#bbb]">
          LangChain provides document loaders that help load data from different
          sources into Document objects.
        </p>

        <p className="text-sm text-[#999]">
          Example: Loading a text file using LangChain JS.
        </p>

        <CodeBlock
          language="bash"
          code={`npm install @langchain/community @langchain/core`}
        />

        <CodeBlock
          language="javascript"
          code={`import { TextLoader } from
  "@langchain/classic/document_loaders/fs/text";

const loader = new TextLoader("./data/nodejs.txt");

const documents = await loader.load();

console.log(documents[0].pageContent);
console.log(documents[0].metadata);`}
        />

        <p className="text-sm leading-6 text-[#999]">
          The exact loader package and import path depend on the LangChain JS
          version and the source being loaded. For example, PDF, web, and
          database sources use different loaders or integrations.
        </p>

        <div className="rounded-xl border border-white/10 bg-[#1A1A1A] p-4">
          <p className="font-semibold text-[#FC6C26]">Remember</p>
          <p className="mt-2 text-sm leading-6 text-[#bbb]">
            Document Processing is the overall preparation workflow. Document
            Loaders are one part of that workflow. Loading a document does not
            automatically mean it has been fully cleaned, normalized, or
            deduplicated.
          </p>
        </div>
      </section>

      {/* 10 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          10. Interview Questions & Answers
        </h2>

        <div className="space-y-4">
          {[
            {
              q: "What is Document Processing in RAG?",
              a: "It is the process of extracting, cleaning, normalizing, and preparing raw documents before they are split into chunks and converted into embeddings.",
            },
            {
              q: "What is a Document object in LangChain?",
              a: "It is a common data structure containing pageContent for the actual text and metadata for additional information about the document.",
            },
            {
              q: "Why is text cleaning important?",
              a: "It removes unwanted formatting, extra spaces, and unnecessary content that may negatively affect downstream processing and retrieval.",
            },
            {
              q: "What is metadata extraction?",
              a: "It is the process of collecting additional document information such as source, page number, category, and creation date.",
            },
            {
              q: "What is the difference between cleaning and normalization?",
              a: "Cleaning removes unwanted content or noise. Normalization makes the remaining content consistent in representation and format.",
            },
            {
              q: "Why do we perform duplicate detection?",
              a: "To avoid storing repeated content, reduce unnecessary storage, and prevent duplicate information from appearing in retrieval results.",
            },
            {
              q: "Is Document Loading the same as Document Processing?",
              a: "No. Document Loading extracts content and creates document objects. Document Processing is broader and can also include cleaning, normalization, metadata extraction, and duplicate detection.",
            },
            {
              q: "What happens after Document Processing in a basic RAG pipeline?",
              a: "The processed documents are passed to a text splitter, which divides them into smaller chunks for embedding generation and indexing.",
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

export default DocumentProcessing;
