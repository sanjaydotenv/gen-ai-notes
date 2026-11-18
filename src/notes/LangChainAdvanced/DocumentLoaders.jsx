import React from "react";
import CodeBlock from "../../components/CodeBlock";

const DocumentLoaders = () => {
  return (
    <div className="space-y-8 text-[#E3E3E3]">
      {/* HEADER */}
      <div className="space-y-2">
        <p className="text-sm font-semibold tracking-widest text-[#FC6C26]">
          LANGCHAIN ADVANCED / 01
        </p>
        <h1 className="text-3xl font-bold">Document Loaders</h1>
        <p className="text-[#aaa] leading-7">
          Document Loaders allow LangChain applications to load data from
          different sources such as PDF files, text files, websites, CSV files,
          and databases into a standardized Document format.
        </p>
      </div>

      {/* 1 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          1. What are Document Loaders?
        </h2>

        <p className="text-[#aaa] leading-7">
          In real-world applications, data is available in different formats.
          For example, a company may have PDF documents, text files, websites,
          and CSV files.
        </p>

        <p className="text-[#aaa] leading-7">
          An LLM cannot directly understand every file format. We first need to
          extract readable content from these sources. This is where Document
          Loaders are used.
        </p>

        <div className="rounded-xl border border-white/10 bg-[#1A1A1A] p-4 space-y-3">
          <p className="font-semibold text-white">Example</p>
          <p className="text-sm text-[#aaa]">
            Suppose you are building a chatbot that answers questions from your
            PDF notes.
          </p>

          <CodeBlock
            language="text"
            code={`PDF File
    |
    v
Document Loader
    |
    v
Extract Text
    |
    v
LangChain Document
    |
    v
Ready for Processing`}
          />
        </div>
      </section>

      {/* 2 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          2. What is a Document in LangChain?
        </h2>

        <p className="text-[#aaa] leading-7">
          A Document is a standard data structure used by LangChain to represent
          extracted content along with its metadata.
        </p>

        <p className="text-[#aaa] leading-7">
          A Document mainly contains two important properties:
        </p>

        <div className="grid md:grid-cols-2 gap-3">
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 space-y-2">
            <h3 className="font-semibold text-[#FC6C26]">pageContent</h3>
            <p className="text-sm text-[#aaa]">
              Contains the actual extracted text from the source.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 space-y-2">
            <h3 className="font-semibold text-[#FC6C26]">metadata</h3>
            <p className="text-sm text-[#aaa]">
              Contains additional information such as source, page number,
              author, or document ID.
            </p>
          </div>
        </div>

        <CodeBlock
          language="javascript"
          code={`const document = {
  pageContent: "Node.js is a JavaScript runtime.",

  metadata: {
    source: "nodejs-notes.pdf",
    page: 1,
    category: "Backend"
  }
};

console.log(document.pageContent);
console.log(document.metadata.source);`}
        />

        <p className="text-[#aaa] leading-7">
          The Document object provides a consistent structure regardless of
          whether the original content came from a PDF, text file, or website.
        </p>
      </section>

      {/* 3 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          3. How Document Loaders Work
        </h2>

        <p className="text-[#aaa] leading-7">
          Every loader is designed for a particular data source or file format.
          It reads the source, extracts its content, and returns one or more
          Document objects.
        </p>

        <CodeBlock
          language="text"
          code={`        Different Data Sources
                  |
       +----------+----------+
       |          |          |
       v          v          v
      PDF        TXT       Website
       |          |          |
       v          v          v
   PDFLoader  TextLoader  CheerioLoader
       |          |          |
       +----------+----------+
                  |
                  v
          Document Objects
                  |
                  v
           pageContent
             metadata`}
        />

        <p className="text-[#aaa] leading-7">
          Different loaders can produce the same Document structure. This makes
          it easier to build a common processing pipeline.
        </p>
      </section>

      {/* 4 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          4. Common Types of Document Loaders
        </h2>

        <div className="space-y-3">
          {[
            ["TextLoader", "Loads plain text files (.txt)."],
            ["PDFLoader", "Extracts text and page information from PDF files."],
            ["CSVLoader", "Loads data from CSV files."],
            ["JSONLoader", "Extracts content from JSON files."],
            [
              "DirectoryLoader",
              "Loads multiple files from a directory using configured loaders.",
            ],
            ["CheerioWebBaseLoader", "Extracts webpage content using Cheerio."],
            ["DocxLoader", "Loads content from Microsoft Word documents."],
            ["PPTXLoader", "Extracts content from PowerPoint presentations."],
          ].map(([title, description], index) => (
            <div
              key={index}
              className="rounded-xl border border-white/10 bg-white/[0.03] p-4 space-y-1"
            >
              <h3 className="font-semibold text-white">{title}</h3>
              <p className="text-sm text-[#aaa]">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          5. Loading Text Files with TextLoader
        </h2>

        <p className="text-[#aaa] leading-7">
          TextLoader is used to read plain text files and convert their content
          into LangChain Document objects.
        </p>

        <h3 className="font-semibold text-white">Step 1: Install</h3>

        <CodeBlock
          language="bash"
          code={`npm install @langchain/core langchain`}
        />

        <h3 className="font-semibold text-white">Step 2: Create a text file</h3>

        <CodeBlock
          language="text"
          code={`// data/nodejs.txt

Node.js is a JavaScript runtime.

It allows developers to run JavaScript
outside the browser.

Node.js uses the V8 JavaScript engine.`}
        />

        <h3 className="font-semibold text-white">Step 3: Load the file</h3>

        <CodeBlock
          language="javascript"
          code={`import { TextLoader } from
  "@langchain/classic/document_loaders/fs/text";

// Create loader
const loader = new TextLoader(
  "./data/nodejs.txt"
);

// Load document
const docs = await loader.load();

// Access content
console.log(docs[0].pageContent);

// Access metadata
console.log(docs[0].metadata);`}
        />

        <h3 className="font-semibold text-white">Output</h3>

        <CodeBlock
          language="javascript"
          code={`{
  pageContent: "Node.js is a JavaScript runtime...",

  metadata: {
    source: "./data/nodejs.txt"
  }
}`}
        />

        <p className="text-[#aaa] leading-7">
          Notice that load() returns an array of Documents, even when we load
          only one text file.
        </p>
      </section>

      {/* 6 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          6. Loading PDF Files with PDFLoader
        </h2>

        <p className="text-[#aaa] leading-7">
          PDFLoader extracts readable text from PDF files and converts it into
          Document objects.
        </p>

        <h3 className="font-semibold text-white">Step 1: Install</h3>

        <CodeBlock
          language="bash"
          code={`npm install @langchain/community pdf-parse`}
        />

        <h3 className="font-semibold text-white">Step 2: Load PDF</h3>

        <CodeBlock
          language="javascript"
          code={`import { PDFLoader } from
  "@langchain/community/document_loaders/fs/pdf";

// Create PDF loader
const loader = new PDFLoader(
  "./data/backend-notes.pdf"
);

// Load PDF
const docs = await loader.load();

// Print extracted content
console.log(docs[0].pageContent);

// Print metadata
console.log(docs[0].metadata);`}
        />

        <p className="text-[#aaa] leading-7">
          By default, PDFLoader can return separate Documents for individual PDF
          pages. You can configure its splitPages option to control this
          behavior.
        </p>

        <CodeBlock
          language="javascript"
          code={`const loader = new PDFLoader(
  "./data/backend-notes.pdf",
  {
    splitPages: true
  }
);

const docs = await loader.load();

console.log("Total pages:", docs.length);

docs.forEach((doc, index) => {
  console.log("Page:", index + 1);
  console.log(doc.pageContent);
});`}
        />

        <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/[0.05] p-4 space-y-2">
          <p className="font-semibold text-yellow-400">Important</p>
          <p className="text-sm text-[#aaa] leading-6">
            PDFLoader extracts text from PDFs. If a PDF contains scanned images
            instead of selectable text, you may need OCR (Optical Character
            Recognition) to extract its text.
          </p>
        </div>
      </section>

      {/* 7 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          7. Loading Websites with CheerioWebBaseLoader
        </h2>

        <p className="text-[#aaa] leading-7">
          Sometimes our knowledge source is not a local file. We may want to
          extract information from a website.
        </p>

        <p className="text-[#aaa] leading-7">
          CheerioWebBaseLoader fetches webpage HTML and extracts readable
          content using Cheerio.
        </p>

        <h3 className="font-semibold text-white">Step 1: Install</h3>

        <CodeBlock
          language="bash"
          code={`npm install @langchain/community cheerio`}
        />

        <h3 className="font-semibold text-white">Step 2: Load website</h3>

        <CodeBlock
          language="javascript"
          code={`import { CheerioWebBaseLoader } from
  "@langchain/community/document_loaders/web/cheerio";

// Create loader
const loader = new CheerioWebBaseLoader(
  "https://docs.langchain.com"
);

// Load webpage
const docs = await loader.load();

// Access extracted content
console.log(docs[0].pageContent);

// Access source metadata
console.log(docs[0].metadata);`}
        />

        <div className="rounded-xl border border-white/10 bg-[#1A1A1A] p-4 space-y-2">
          <p className="font-semibold text-white">Important Difference</p>
          <p className="text-sm text-[#aaa] leading-6">
            Cheerio parses HTML without executing JavaScript. If a website loads
            its content dynamically through JavaScript, a browser-based loader
            such as Playwright or Puppeteer may be more suitable.
          </p>
        </div>
      </section>

      {/* 8 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          8. Loading Multiple Files with DirectoryLoader
        </h2>

        <p className="text-[#aaa] leading-7">
          In real-world projects, we may have hundreds of files inside a folder.
          Loading each file manually is not practical.
        </p>

        <p className="text-[#aaa] leading-7">
          DirectoryLoader allows us to load multiple files from a directory by
          mapping file extensions to their respective loader functions.
        </p>

        <h3 className="font-semibold text-white">Folder Structure</h3>

        <CodeBlock
          language="text"
          code={`project/
│
├── data/
│   ├── nodejs.txt
│   ├── backend.pdf
│   └── api-notes.txt
│
└── index.js`}
        />

        <h3 className="font-semibold text-white">Install Dependencies</h3>

        <CodeBlock
          language="bash"
          code={`npm install langchain @langchain/core
npm install @langchain/community pdf-parse`}
        />

        <h3 className="font-semibold text-white">Implementation</h3>

        <CodeBlock
          language="javascript"
          code={`import { DirectoryLoader } from
  "@langchain/classic/document_loaders/fs/directory";

import { TextLoader } from
  "@langchain/classic/document_loaders/fs/text";

import { PDFLoader } from
  "@langchain/community/document_loaders/fs/pdf";

// Create directory loader
const loader = new DirectoryLoader(
  "./data",
  {
    ".txt": (path) => new TextLoader(path),

    ".pdf": (path) => new PDFLoader(path),
  }
);

// Load all supported files
const docs = await loader.load();

console.log("Total documents:", docs.length);

docs.forEach((doc) => {
  console.log(doc.metadata.source);
  console.log(doc.pageContent);
});`}
        />

        <p className="text-[#aaa] leading-7">
          DirectoryLoader checks the file extensions and uses the corresponding
          loader to process each supported file.
        </p>

        <CodeBlock
          language="text"
          code={`              ./data
                 |
        +--------+--------+
        |                 |
        v                 v
    .txt file         .pdf file
        |                 |
        v                 v
    TextLoader        PDFLoader
        |                 |
        +--------+--------+
                 |
                 v
          Document Array`}
        />
      </section>

      {/* 9 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          9. What is load()?
        </h2>

        <p className="text-[#aaa] leading-7">
          load() is the common method used by Document Loaders to load data and
          return Document objects.
        </p>

        <CodeBlock
          language="javascript"
          code={`const loader = new TextLoader(
  "./data/nodejs.txt"
);

const documents = await loader.load();

console.log(documents);`}
        />

        <p className="text-[#aaa] leading-7">
          It returns a Promise that resolves to an array of Documents. That's
          why we use await.
        </p>

        <h3 className="font-semibold text-white">Important Concepts</h3>

        <ul className="list-disc pl-5 space-y-2 text-sm text-[#aaa]">
          <li>load() loads documents and returns them together.</li>
          <li>Its result is an array of Document objects.</li>
          <li>It is asynchronous in LangChain JavaScript.</li>
          <li>Large datasets may require memory-efficient processing.</li>
        </ul>
      </section>

      {/* 10 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          10. What Happens After Document Loading?
        </h2>

        <p className="text-[#aaa] leading-7">
          Document loading is only the first step in a RAG application. The
          extracted documents usually need further processing before they can be
          searched efficiently.
        </p>

        <CodeBlock
          language="text"
          code={`       Original Data
             |
             v
      Document Loaders
             |
             v
       Document Objects
             |
             v
        Text Splitters
             |
             v
          Chunks
             |
             v
         Embeddings
             |
             v
        Vector Store
             |
             v
        Retrieval
             |
             v
       LLM Response`}
        />

        <div className="rounded-xl border border-green-500/20 bg-green-500/[0.04] p-4 space-y-2">
          <p className="font-semibold text-green-400">Remember</p>
          <p className="text-sm text-[#aaa] leading-6">
            Document Loaders extract and structure content. Text Splitters
            divide that content into smaller chunks. Both perform different
            responsibilities.
          </p>
        </div>
      </section>

      {/* 11 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          11. Important Things to Remember
        </h2>

        <div className="space-y-2">
          {[
            "A Document Loader reads data from a particular source.",
            "Different file formats may require different loaders.",
            "load() returns an array of Document objects.",
            "pageContent contains extracted text.",
            "metadata contains source-related information.",
            "DirectoryLoader can process multiple file types from a folder.",
            "Document loading does not automatically create embeddings.",
            "Document loading and text splitting are separate steps.",
            "Some scanned PDFs require OCR.",
            "Many filesystem loaders are Node.js-only and cannot run directly in a browser.",
          ].map((item, index) => (
            <div
              key={index}
              className="flex gap-3 rounded-lg border border-white/10 bg-white/[0.03] p-3"
            >
              <span className="text-[#FC6C26] font-bold">{index + 1}.</span>
              <p className="text-sm text-[#aaa]">{item}</p>
            </div>
          ))}
        </div>
      </section>

      {/* INTERVIEW */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          12. Interview Questions & Answers
        </h2>

        {[
          {
            q: "What are Document Loaders in LangChain?",
            a: "Document Loaders extract data from sources such as PDFs, text files, websites, and CSV files and convert it into LangChain Document objects.",
          },
          {
            q: "What is a Document object?",
            a: "A Document is a standard data structure containing pageContent and metadata.",
          },
          {
            q: "What is pageContent?",
            a: "pageContent contains the actual text extracted from a document.",
          },
          {
            q: "What is metadata?",
            a: "Metadata contains additional information such as source, page number, author, or document ID.",
          },
          {
            q: "What does load() do?",
            a: "load() loads the source data and returns a Promise that resolves to an array of Document objects.",
          },
          {
            q: "What is TextLoader?",
            a: "TextLoader is used to load plain text files and convert their content into Document objects.",
          },
          {
            q: "What is PDFLoader?",
            a: "PDFLoader extracts text from PDF files and can return Documents containing page information.",
          },
          {
            q: "What is DirectoryLoader?",
            a: "DirectoryLoader loads multiple files from a directory using loader functions configured for different file extensions.",
          },
          {
            q: "What is the difference between Document Loaders and Text Splitters?",
            a: "Document Loaders extract and structure content, whereas Text Splitters divide that content into smaller chunks.",
          },
          {
            q: "Do Document Loaders generate embeddings?",
            a: "No. Document Loaders extract content. Embeddings are generated in a separate processing step.",
          },
          {
            q: "Can PDFLoader read scanned PDFs?",
            a: "It can extract available text, but scanned PDFs containing only images generally require OCR.",
          },
          {
            q: "Why do we use metadata in RAG?",
            a: "Metadata helps identify document sources, filter information, track pages, and organize retrieved content.",
          },
        ].map((item, index) => (
          <div
            key={index}
            className="rounded-xl border border-white/10 bg-white/[0.03] p-4 space-y-2"
          >
            <p className="font-semibold text-white">
              {index + 1}. {item.q}
            </p>
            <p className="text-sm text-green-400 leading-6">{item.a}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default DocumentLoaders;
