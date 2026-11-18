import React from "react";
import CodeBlock from "../../components/CodeBlock";

const MetadataFiltering = () => {
  return (
    <div className="space-y-8 text-[#E3E3E3]">
      {/* Header */}
      <div className="space-y-2">
        <p className="text-sm font-semibold tracking-widest text-[#FC6C26]">
          ADVANCED RAG / 04
        </p>
        <h1 className="text-3xl font-bold">Metadata Filtering</h1>
        <p className="text-[#aaa] leading-7">
          Metadata Filtering is a retrieval technique that filters documents
          using metadata conditions before or during similarity search. It helps
          a RAG system retrieve information from the correct category, source,
          date, or user-specific collection.
        </p>
      </div>

      {/* 1 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          1. What is Metadata?
        </h2>

        <p className="text-[#aaa] leading-7">
          Metadata means data about data. It provides additional information
          about a document without being its main content.
        </p>

        <p className="text-[#aaa] leading-7">
          In RAG, every document can contain two important parts:
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-white/10 bg-[#1A1A1A] p-4 space-y-2">
            <h3 className="font-semibold text-white">Page Content</h3>
            <p className="text-sm text-[#aaa]">
              The actual text or information inside a document.
            </p>
            <p className="text-green-400 text-sm">
              "Node.js uses an Event Loop to handle asynchronous operations."
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-[#1A1A1A] p-4 space-y-2">
            <h3 className="font-semibold text-white">Metadata</h3>
            <p className="text-sm text-[#aaa]">
              Additional information describing that document.
            </p>
            <p className="text-green-400 text-sm">
              category: "Node.js"
              <br />
              author: "Mayur"
              <br />
              type: "tutorial"
            </p>
          </div>
        </div>

        <CodeBlock
          language="javascript"
          code={`const document = {
  pageContent:
    "Node.js uses an Event Loop to handle asynchronous operations.",

  metadata: {
    category: "Node.js",
    author: "Mayur",
    type: "tutorial",
    language: "English",
    difficulty: "beginner",
  },
};`}
        />
      </section>

      {/* 2 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          2. What is Metadata Filtering?
        </h2>

        <p className="text-[#aaa] leading-7">
          Metadata Filtering means applying conditions to document metadata so
          that only documents matching those conditions are considered for
          retrieval.
        </p>

        <div className="rounded-xl border border-white/10 bg-[#1A1A1A] p-4 space-y-3">
          <p className="font-semibold text-white">Example Documents</p>

          {[
            ["Document A", "Node.js", "beginner"],
            ["Document B", "React", "advanced"],
            ["Document C", "Node.js", "advanced"],
            ["Document D", "Python", "beginner"],
          ].map(([name, category, level], index) => (
            <div
              key={index}
              className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-white/[0.04] p-3 text-sm"
            >
              <span className="text-white">{name}</span>
              <span className="text-[#aaa]">{category}</span>
              <span className="text-[#FC6C26]">{level}</span>
            </div>
          ))}

          <div className="border-t border-white/10 pt-3 space-y-2">
            <p className="text-sm text-[#FC6C26] font-semibold">
              Filter Condition
            </p>
            <CodeBlock
              language="javascript"
              code={`{
  category: "Node.js",
  difficulty: "beginner"
}`}
            />
            <p className="text-sm text-[#aaa]">
              Only documents matching both conditions are selected.
            </p>
            <p className="text-green-400 text-sm">Result: Document A</p>
          </div>
        </div>
      </section>

      {/* 3 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          3. Why Do We Need Metadata Filtering?
        </h2>

        <div className="grid md:grid-cols-2 gap-3">
          {[
            [
              "Category-Based Search",
              "Retrieve documents from a particular category.",
            ],
            [
              "User-Based Search",
              "Restrict results to documents belonging to a particular user.",
            ],
            [
              "Date-Based Search",
              "Retrieve documents created within a specific time period.",
            ],
            [
              "Language Filtering",
              "Retrieve documents in a selected language.",
            ],
            ["Access Control", "Restrict retrieval based on user permissions."],
            [
              "Better Retrieval",
              "Reduce irrelevant candidates before similarity ranking.",
            ],
          ].map(([title, description], index) => (
            <div
              key={index}
              className="rounded-xl border border-white/10 bg-white/[0.03] p-4 space-y-2"
            >
              <h3 className="font-semibold text-white">{title}</h3>
              <p className="text-sm text-[#aaa]">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          4. How Metadata Filtering Works
        </h2>

        <CodeBlock
          language="text"
          code={`              User Query
                   |
                   v
            Metadata Conditions
                   |
                   v
             Document Collection
                   |
                   v
             Metadata Filtering
                   |
                   v
             Filtered Documents
                   |
                   v
            Similarity Search
                   |
                   v
             Top-K Documents
                   |
                   v
               LLM Context
                   |
                   v
              Final Answer`}
        />

        <p className="text-[#aaa] leading-7">
          In this example, metadata conditions are applied before similarity
          ranking. The vector database searches only the eligible documents.
          Actual execution can vary depending on the vector database.
        </p>
      </section>

      {/* 5 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          5. Common Metadata Filter Conditions
        </h2>

        <p className="text-[#aaa] leading-7">
          Most vector databases support different types of metadata conditions.
          The exact syntax depends on the database.
        </p>

        <div className="space-y-3">
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 space-y-2">
            <h3 className="font-semibold text-white">A. Equality</h3>
            <p className="text-sm text-[#aaa]">Match an exact value.</p>
            <CodeBlock language="javascript" code={`{ category: "Node.js" }`} />
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 space-y-2">
            <h3 className="font-semibold text-white">B. Comparison</h3>
            <p className="text-sm text-[#aaa]">
              Match numeric or date conditions.
            </p>
            <CodeBlock
              language="javascript"
              code={`{ rating: { $gte: 4 } }

// rating greater than or equal to 4`}
            />
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 space-y-2">
            <h3 className="font-semibold text-white">C. AND Condition</h3>
            <p className="text-sm text-[#aaa]">All conditions must match.</p>
            <CodeBlock
              language="javascript"
              code={`{
  $and: [
    { category: "Node.js" },
    { difficulty: "beginner" }
  ]
}`}
            />
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 space-y-2">
            <h3 className="font-semibold text-white">D. OR Condition</h3>
            <p className="text-sm text-[#aaa]">
              At least one condition must match.
            </p>
            <CodeBlock
              language="javascript"
              code={`{
  $or: [
    { category: "Node.js" },
    { category: "React" }
  ]
}`}
            />
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 space-y-2">
            <h3 className="font-semibold text-white">E. IN Condition</h3>
            <p className="text-sm text-[#aaa]">Match any value from a list.</p>
            <CodeBlock
              language="javascript"
              code={`{
  category: {
    $in: ["Node.js", "React", "Python"]
  }
}`}
            />
          </div>
        </div>

        <p className="text-sm text-yellow-400">
          Note: These examples use MongoDB-style operators for learning. They
          are not universal vector database filter syntax.
        </p>
      </section>

      {/* 6 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          6. Metadata Filtering with LangChain
        </h2>

        <p className="text-[#aaa] leading-7">
          LangChain allows us to pass metadata filters to supported vector store
          search methods.
        </p>

        <CodeBlock
          language="javascript"
          code={`import { Document } from "@langchain/core/documents";
import { MemoryVectorStore } from
  "@langchain/classic/vectorstores/memory";
import { OpenAIEmbeddings } from "@langchain/openai";

// 1. Create documents with metadata
const documents = [
  new Document({
    pageContent: "Node.js Event Loop explained.",
    metadata: {
      category: "Node.js",
      difficulty: "beginner",
    },
  }),

  new Document({
    pageContent: "Advanced React performance optimization.",
    metadata: {
      category: "React",
      difficulty: "advanced",
    },
  }),

  new Document({
    pageContent: "Node.js worker threads and clustering.",
    metadata: {
      category: "Node.js",
      difficulty: "advanced",
    },
  }),
];

// 2. Create embeddings
const embeddings = new OpenAIEmbeddings({
  model: "text-embedding-3-small",
});

// 3. Create vector store
const vectorStore = await MemoryVectorStore.fromDocuments(
  documents,
  embeddings
);

// 4. Search with metadata filter
const results = await vectorStore.similaritySearch(
  "Node.js concepts",
  5,
  {
    category: "Node.js",
  }
);

console.log(results);`}
        />

        <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/[0.05] p-4 space-y-2">
          <p className="font-semibold text-yellow-400">Important</p>
          <ul className="list-disc pl-5 text-sm text-[#aaa] space-y-2">
            <li>The third argument contains the metadata filter.</li>
            <li>This example uses a simple equality filter.</li>
            <li>
              Metadata filter support and operators differ between vector store
              integrations.
            </li>
            <li>
              MemoryVectorStore is an in-memory learning example, not a
              production database.
            </li>
          </ul>
        </div>
      </section>

      {/* 7 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          7. Metadata Filtering vs Similarity Search
        </h2>

        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full text-sm text-left">
            <thead className="bg-white/[0.05] text-white">
              <tr>
                <th className="p-3">Metadata Filtering</th>
                <th className="p-3">Similarity Search</th>
              </tr>
            </thead>
            <tbody className="text-[#aaa]">
              <tr className="border-t border-white/10">
                <td className="p-3">Uses document metadata.</td>
                <td className="p-3">Uses vector similarity.</td>
              </tr>
              <tr className="border-t border-white/10">
                <td className="p-3">Matches explicit conditions.</td>
                <td className="p-3">Finds semantically similar content.</td>
              </tr>
              <tr className="border-t border-white/10">
                <td className="p-3">Filters eligible documents.</td>
                <td className="p-3">Ranks documents by similarity.</td>
              </tr>
              <tr className="border-t border-white/10">
                <td className="p-3">Example: category = Node.js.</td>
                <td className="p-3">Example: meaning similar to Event Loop.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-[#aaa] leading-7">
          These techniques can work together. Metadata filtering narrows down
          the eligible documents, and similarity search finds the most relevant
          ones within that set.
        </p>
      </section>

      {/* 8 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          8. Real-World Example
        </h2>

        <p className="text-[#aaa] leading-7">
          Imagine an AI-powered documentation assistant containing thousands of
          documents about Node.js, React, Python, and databases.
        </p>

        <div className="rounded-xl border border-white/10 bg-[#1A1A1A] p-4 space-y-3">
          <p className="text-sm text-[#FC6C26] font-semibold">User Query</p>
          <p className="text-white">
            "Explain beginner-level Node.js concepts."
          </p>

          <p className="text-sm text-[#FC6C26] font-semibold">
            Metadata Filter
          </p>
          <CodeBlock
            language="javascript"
            code={`{
  category: "Node.js",
  difficulty: "beginner"
}`}
          />

          <p className="text-sm text-[#FC6C26] font-semibold">
            Similarity Search
          </p>
          <p className="text-[#aaa] text-sm">
            Finds documents semantically related to the user's question among
            the filtered documents.
          </p>

          <p className="text-sm text-green-400">
            Final result: Relevant beginner-level Node.js documents.
          </p>
        </div>
      </section>

      {/* 9 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          9. Advantages and Limitations
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-green-500/20 bg-green-500/[0.04] p-4 space-y-2">
            <h3 className="font-semibold text-green-400">Advantages</h3>
            <ul className="list-disc pl-5 text-sm text-[#aaa] space-y-2">
              <li>Reduces irrelevant search results.</li>
              <li>Supports category and date-based retrieval.</li>
              <li>Helps implement user-specific retrieval.</li>
              <li>Can improve retrieval efficiency.</li>
              <li>Works alongside semantic and hybrid search.</li>
            </ul>
          </div>

          <div className="rounded-xl border border-red-500/20 bg-red-500/[0.04] p-4 space-y-2">
            <h3 className="font-semibold text-red-400">Limitations</h3>
            <ul className="list-disc pl-5 text-sm text-[#aaa] space-y-2">
              <li>Requires accurate metadata.</li>
              <li>Incorrect filters can exclude useful documents.</li>
              <li>Filter capabilities vary by vector database.</li>
              <li>Complex filters may affect search performance.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 10 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          10. Interview Questions & Answers
        </h2>

        {[
          {
            q: "What is Metadata?",
            a: "Metadata is additional information that describes a document, such as its category, author, date, or source.",
          },
          {
            q: "What is Metadata Filtering?",
            a: "It filters documents using metadata conditions before or during retrieval.",
          },
          {
            q: "Why is Metadata Filtering used in RAG?",
            a: "It restricts retrieval to eligible documents and helps reduce irrelevant results.",
          },
          {
            q: "What is the difference between Metadata Filtering and Similarity Search?",
            a: "Metadata Filtering matches explicit document attributes, while Similarity Search finds semantically related content.",
          },
          {
            q: "Can Metadata Filtering and Vector Search work together?",
            a: "Yes. Metadata conditions can restrict the searchable documents, and vector similarity can rank the eligible documents.",
          },
          {
            q: "What happens if metadata is incorrect?",
            a: "The system may return incorrect results or exclude relevant documents.",
          },
          {
            q: "Can Metadata Filtering be used for access control?",
            a: "Yes, it can help restrict retrieval by user or permission metadata, but secure access control must also be enforced by the backend and database.",
          },
          {
            q: "Does every vector database support the same filter syntax?",
            a: "No. Filter operators and supported metadata types vary across vector database implementations.",
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

export default MetadataFiltering;
