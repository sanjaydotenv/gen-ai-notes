import React from "react";
import CodeBlock from "../../components/CodeBlock";

const RAGArchitecture = () => {
  return (
    <div className="space-y-8 text-[#E3E3E3]">
      {/* Header */}
      <div>
        <p className="text-sm font-semibold tracking-widest text-[#FC6C26]">
          RAG FUNDAMENTALS / 02
        </p>

        <h1 className="mt-2 text-3xl font-bold">RAG Architecture</h1>

        <p className="mt-3 leading-7 text-[#999]">
          RAG Architecture describes how different components work together to
          retrieve relevant information from external data sources and generate
          accurate AI responses.
        </p>
      </div>

      {/* 1 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          1. Overview of RAG Architecture
        </h2>

        <p className="leading-7 text-[#bbb]">
          A typical RAG application has two major workflows:
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-white/10 bg-[#1A1A1A] p-5">
            <h3 className="font-semibold text-white">Indexing Pipeline</h3>
            <p className="mt-2 text-sm leading-6 text-[#999]">
              Processes documents, creates embeddings, and stores them in a
              searchable vector database.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-[#1A1A1A] p-5">
            <h3 className="font-semibold text-white">Retrieval Pipeline</h3>
            <p className="mt-2 text-sm leading-6 text-[#999]">
              Searches relevant information, adds it to the prompt, and
              generates the final response using an LLM.
            </p>
          </div>
        </div>

        <CodeBlock
          code={`              RAG ARCHITECTURE

       INDEXING PIPELINE
       -----------------

 Documents / PDFs / Files
          |
          v
   Document Loader
          |
          v
     Text Splitter
          |
          v
   Embedding Model
          |
          v
    Vector Database
          |
          |
          v
       RETRIEVAL PIPELINE
       ------------------

     User Question
          |
          v
   Query Embedding
          |
          v
    Vector Search
          |
          v
   Relevant Chunks
          |
          v
    Prompt + Context
          |
          v
         LLM
          |
          v
    Final Response`}
        />

        <p className="text-sm leading-6 text-[#999]">
          The indexing pipeline usually runs before users ask questions. The
          retrieval pipeline runs whenever a user submits a question.
        </p>
      </section>

      {/* 2 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          2. Components of RAG Architecture
        </h2>

        {/* Component 1 */}
        <div className="space-y-2">
          <h3 className="font-semibold text-white">A. Data Sources</h3>
          <p className="text-sm leading-6 text-[#bbb]">
            Data sources contain the original information that the RAG
            application will use.
          </p>
          <CodeBlock
            code={`Examples:

- PDF files
- Text files
- Word documents
- Websites
- Databases
- API responses
- Company documentation`}
          />
        </div>

        {/* Component 2 */}
        <div className="space-y-2">
          <h3 className="font-semibold text-white">B. Document Loader</h3>
          <p className="text-sm leading-6 text-[#bbb]">
            A document loader reads data from different sources and converts it
            into a common document format that the application can process.
          </p>
          <CodeBlock
            code={`PDF File
   |
   v
Document Loader
   |
   v
Document Object
{
  pageContent: "Node.js is a runtime...",
  metadata: {
    source: "nodejs.pdf",
    page: 1
  }
}`}
          />
        </div>

        {/* Component 3 */}
        <div className="space-y-2">
          <h3 className="font-semibold text-white">C. Text Splitter</h3>
          <p className="text-sm leading-6 text-[#bbb]">
            Large documents are divided into smaller pieces called chunks. These
            chunks make retrieval more focused and manageable.
          </p>
          <CodeBlock
            code={`Original Document
        |
        v
   Text Splitter
        |
        v
   Chunk 1: Introduction
   Chunk 2: Installation
   Chunk 3: Features
   Chunk 4: Examples`}
          />
          <p className="text-sm text-[#999]">
            Chunk size and overlap affect retrieval quality.
          </p>
        </div>

        {/* Component 4 */}
        <div className="space-y-2">
          <h3 className="font-semibold text-white">D. Embedding Model</h3>
          <p className="text-sm leading-6 text-[#bbb]">
            An embedding model converts text into numerical vectors. These
            vectors represent the semantic meaning of the text.
          </p>
          <CodeBlock
            code={`Text:
"JavaScript is a programming language."

Embedding Model
        |
        v
Vector:
[0.21, -0.45, 0.78, 0.12, ...]`}
          />
          <p className="text-sm text-[#999]">
            Similar meanings can produce vectors that are close to each other in
            vector space.
          </p>
        </div>

        {/* Component 5 */}
        <div className="space-y-2">
          <h3 className="font-semibold text-white">E. Vector Database</h3>
          <p className="text-sm leading-6 text-[#bbb]">
            A vector database stores embeddings along with their associated text
            and metadata. It allows the application to search for semantically
            similar content.
          </p>
          <CodeBlock
            code={`Stored Record:

{
  text: "Node.js uses the V8 engine.",
  embedding: [0.21, -0.45, 0.78, ...],
  metadata: {
    source: "nodejs.pdf",
    page: 4
  }
}`}
          />
          <p className="text-sm text-[#999]">
            Examples: Pinecone, Chroma, Qdrant, and FAISS.
          </p>
        </div>

        {/* Component 6 */}
        <div className="space-y-2">
          <h3 className="font-semibold text-white">F. Retriever</h3>
          <p className="text-sm leading-6 text-[#bbb]">
            A retriever receives a user query and finds relevant documents or
            chunks from a searchable data source.
          </p>
          <CodeBlock
            code={`User Query:
"What is Node.js?"

        |
        v
     Retriever
        |
        v
Relevant Chunks:
- Node.js is a JavaScript runtime.
- Node.js uses the V8 engine.`}
          />
        </div>

        {/* Component 7 */}
        <div className="space-y-2">
          <h3 className="font-semibold text-white">G. Prompt Template</h3>
          <p className="text-sm leading-6 text-[#bbb]">
            The prompt template combines the user's question with the retrieved
            context and instructions for the LLM.
          </p>
          <CodeBlock
            code={`Context:
Node.js is a JavaScript runtime built on V8.

Question:
What is Node.js?

Instruction:
Answer using the provided context.`}
          />
        </div>

        {/* Component 8 */}
        <div className="space-y-2">
          <h3 className="font-semibold text-white">
            H. Large Language Model (LLM)
          </h3>
          <p className="text-sm leading-6 text-[#bbb]">
            The LLM receives the prepared prompt, understands the context, and
            generates a natural language answer.
          </p>
          <CodeBlock
            code={`Prompt + Context
       |
       v
      LLM
       |
       v
  Generated Answer`}
          />
        </div>
      </section>

      {/* 3 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          3. Complete RAG Workflow
        </h2>

        <p className="leading-7 text-[#bbb]">
          Let's understand the complete architecture using a practical example.
        </p>

        <div className="rounded-xl border border-white/10 bg-[#1A1A1A] p-5 space-y-3">
          <h3 className="font-semibold text-white">Scenario: Chat with PDF</h3>

          <p className="text-sm leading-6 text-[#999]">
            Suppose a user uploads a PDF about Node.js and asks:
          </p>

          <div className="rounded-lg bg-white/[0.04] p-3 text-sm text-white">
            "What is the Node.js event loop?"
          </div>

          <CodeBlock
            code={`STEP 1: Upload PDF
        |
STEP 2: Extract PDF Text
        |
STEP 3: Split Text into Chunks
        |
STEP 4: Generate Chunk Embeddings
        |
STEP 5: Store Embeddings in Vector DB
        |
        |  User asks a question
        v
STEP 6: Convert Question into Embedding
        |
STEP 7: Retrieve Relevant Chunks
        |
STEP 8: Build Prompt with Context
        |
STEP 9: Send Prompt to LLM
        |
STEP 10: Return Final Answer`}
          />

          <div className="rounded-lg border border-green-500/20 bg-green-500/[0.05] p-4">
            <p className="text-sm font-semibold text-green-400">Final Result</p>
            <p className="mt-2 text-sm leading-6 text-[#bbb]">
              The AI explains the Node.js event loop using information retrieved
              from the uploaded PDF.
            </p>
          </div>
        </div>
      </section>

      {/* 4 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          4. Important RAG Components vs Their Responsibilities
        </h2>

        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full min-w-[520px] text-left text-sm">
            <thead className="bg-white/[0.05] text-white">
              <tr>
                <th className="p-3">Component</th>
                <th className="p-3">Responsibility</th>
              </tr>
            </thead>
            <tbody className="text-[#bbb]">
              {[
                ["Document Loader", "Loads and extracts documents."],
                ["Text Splitter", "Divides documents into chunks."],
                ["Embedding Model", "Converts text into vectors."],
                ["Vector Database", "Stores and searches vectors."],
                ["Retriever", "Finds relevant documents."],
                ["Prompt Template", "Combines context and question."],
                ["LLM", "Generates the final response."],
              ].map(([component, responsibility]) => (
                <tr key={component} className="border-t border-white/10">
                  <td className="p-3 font-medium text-white">{component}</td>
                  <td className="p-3">{responsibility}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 5 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          5. RAG Architecture vs Normal LLM Architecture
        </h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-white/10 bg-[#1A1A1A] p-4 space-y-3">
            <h3 className="font-semibold text-white">Normal LLM</h3>
            <CodeBlock
              code={`User Question
      |
      v
      LLM
      |
      v
    Answer`}
            />
            <p className="text-sm leading-6 text-[#999]">
              The model generates an answer based on its learned knowledge and
              the input prompt.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-[#1A1A1A] p-4 space-y-3">
            <h3 className="font-semibold text-white">RAG-based LLM</h3>
            <CodeBlock
              code={`User Question
      |
      v
  Retriever
      |
      v
Relevant Context
      |
      v
      LLM
      |
      v
    Answer`}
            />
            <p className="text-sm leading-6 text-[#999]">
              The model receives additional information retrieved from an
              external knowledge source.
            </p>
          </div>
        </div>
      </section>

      {/* 6 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          6. Important Points to Remember
        </h2>

        <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-[#bbb]">
          <li>RAG has two major workflows: indexing and retrieval.</li>
          <li>Documents are split into chunks before embedding generation.</li>
          <li>Embeddings represent the semantic meaning of text as vectors.</li>
          <li>A vector database stores and searches vector representations.</li>
          <li>A retriever finds relevant documents for a user query.</li>
          <li>
            The LLM generates the final answer using the retrieved context.
          </li>
          <li>RAG does not require changing the LLM's model weights.</li>
        </ul>
      </section>

      {/* 7 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          7. Interview Questions & Answers
        </h2>

        <div className="space-y-4">
          {[
            {
              q: "What are the two main pipelines in RAG architecture?",
              a: "The indexing pipeline prepares and stores document representations. The retrieval pipeline finds relevant information and uses it to generate answers.",
            },
            {
              q: "What is the role of a document loader?",
              a: "It loads data from sources such as PDFs, websites, and text files and converts it into a common document format.",
            },
            {
              q: "Why do we need a text splitter?",
              a: "It divides large documents into smaller chunks so that relevant information can be retrieved more effectively.",
            },
            {
              q: "What is the role of an embedding model?",
              a: "It converts text into numerical vectors that represent semantic meaning.",
            },
            {
              q: "What is the difference between a vector database and a retriever?",
              a: "A vector database stores and searches vector representations. A retriever provides an interface for fetching relevant documents from a data source.",
            },
            {
              q: "Does the LLM directly search the vector database?",
              a: "Usually, no. The application uses a retriever or search component to fetch relevant information and then passes that information to the LLM.",
            },
            {
              q: "What happens if retrieval returns irrelevant chunks?",
              a: "The LLM may generate an incorrect or irrelevant answer because it received poor context. Retrieval quality is important for RAG performance.",
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

export default RAGArchitecture;
