import React from "react";
import CodeBlock from "../../components/CodeBlock";

const QueryTransformation = () => {
  return (
    <div className="space-y-8 text-[#E3E3E3]">
      {/* Header */}
      <div className="space-y-2">
        <p className="text-sm font-semibold tracking-widest text-[#FC6C26]">
          ADVANCED RAG / 02
        </p>
        <h1 className="text-3xl font-bold">Query Transformation</h1>
        <p className="text-[#aaa] leading-7">
          Query Transformation is a technique in which an original user query is
          rewritten, expanded, or converted into multiple queries to improve
          document retrieval in a RAG system.
        </p>
      </div>

      {/* 1 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          1. What is Query Transformation?
        </h2>

        <p className="text-[#aaa] leading-7">
          Users do not always ask clear or complete questions. Sometimes they
          use short sentences, ambiguous words, or different terminology than
          the documents.
        </p>

        <p className="text-[#aaa] leading-7">
          Query Transformation improves the original query before sending it to
          the retriever.
        </p>

        <div className="rounded-xl border border-white/10 bg-[#1A1A1A] p-4 space-y-3">
          <p className="font-semibold text-white">Example</p>

          <div>
            <p className="text-xs text-[#FC6C26] font-semibold">
              ORIGINAL QUERY
            </p>
            <p className="text-[#aaa]">"How does it work in Node?"</p>
          </div>

          <div className="text-center text-[#FC6C26]">
            ↓ Query Transformation
          </div>

          <div>
            <p className="text-xs text-[#FC6C26] font-semibold">
              TRANSFORMED QUERY
            </p>
            <p className="text-green-400">
              "How does the Node.js Event Loop handle asynchronous operations?"
            </p>
          </div>
        </div>
      </section>

      {/* 2 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          2. Why Do We Need Query Transformation?
        </h2>

        <p className="text-[#aaa] leading-7">
          A retriever can only find useful documents when the search query
          represents the information we actually need.
        </p>

        <div className="grid md:grid-cols-2 gap-3">
          {[
            [
              "Ambiguous Queries",
              "The query does not clearly explain what the user wants.",
            ],
            [
              "Short Queries",
              "A few words may not provide enough search context.",
            ],
            [
              "Different Terminology",
              "The user and documents may use different words for the same concept.",
            ],
            [
              "Complex Questions",
              "A question may contain multiple information needs.",
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

      {/* 3 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          3. How Query Transformation Works
        </h2>

        <CodeBlock
          language="text"
          code={`             User Query
                  |
                  v
          Query Transformer
                  |
         +--------+--------+
         |                 |
         v                 v
    Rewrite Query     Generate Multiple
                           Queries
         |                 |
         +--------+--------+
                  |
                  v
               Retriever
                  |
                  v
          Relevant Documents
                  |
                  v
             LLM Context
                  |
                  v
            Final Answer`}
        />

        <ol className="list-decimal pl-5 space-y-2 text-[#aaa]">
          <li>User submits a question.</li>
          <li>The query transformer analyzes the question.</li>
          <li>It rewrites or expands the query when needed.</li>
          <li>The transformed query is sent to the retriever.</li>
          <li>The retriever finds relevant documents.</li>
          <li>The retrieved context is passed to the LLM.</li>
        </ol>
      </section>

      {/* 4 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          4. Types of Query Transformation
        </h2>

        {/* Query Rewriting */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white">
            A. Query Rewriting
          </h3>

          <p className="text-[#aaa] leading-7">
            Query Rewriting converts the original query into a clearer, more
            specific search query without changing its actual intent.
          </p>

          <CodeBlock
            language="text"
            code={`Original:
"How does it work?"

Rewritten:
"How does the Node.js Event Loop work?

Purpose:
Make an unclear query more specific.`}
          />
        </div>

        {/* Query Expansion */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white">
            B. Query Expansion
          </h3>

          <p className="text-[#aaa] leading-7">
            Query Expansion adds related terms, synonyms, or additional context
            to the original query.
          </p>

          <CodeBlock
            language="text"
            code={`Original:
"Node.js performance"

Expanded:
"Node.js performance, optimization,
event loop latency, memory usage,
CPU profiling and asynchronous operations"

Purpose:
Cover more relevant terminology.`}
          />
        </div>

        {/* Multi Query */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white">
            C. Multi-Query Generation
          </h3>

          <p className="text-[#aaa] leading-7">
            Multi-Query generates multiple alternative queries from one original
            question. Each query explores the same information need from a
            different angle.
          </p>

          <CodeBlock
            language="text"
            code={`Original:
"How does Node.js handle asynchronous tasks?"

Generated Queries:

1. How does the Node.js Event Loop work?

2. How does Node.js handle non-blocking I/O?

3. What role do callbacks and the event queue play?

4. How does libuv manage asynchronous operations?

All queries are sent to the retriever.

Their results are combined and deduplicated.`}
          />

          <p className="text-sm text-[#aaa]">
            Multi-Query can improve retrieval coverage, but it may also increase
            retrieval cost and return duplicate or irrelevant documents.
          </p>
        </div>

        {/* Step Back */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white">
            D. Step-Back Prompting
          </h3>

          <p className="text-[#aaa] leading-7">
            Step-Back Prompting converts a specific question into a broader
            conceptual question. This helps retrieve general principles needed
            to answer the original question.
          </p>

          <CodeBlock
            language="text"
            code={`Original Question:
"Why does Node.js use a single main JavaScript thread?"

Step-Back Question:
"What is the architecture of Node.js and
how does it handle concurrency?"

The broader question retrieves foundational
information needed to answer the original one.`}
          />
        </div>

        {/* Decomposition */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white">
            E. Query Decomposition
          </h3>

          <p className="text-[#aaa] leading-7">
            Query Decomposition breaks a complex question into smaller,
            independent sub-questions. Each sub-question can be retrieved
            separately.
          </p>

          <CodeBlock
            language="text"
            code={`Original:
"Explain how Node.js handles asynchronous
operations and how the Event Loop works."

Decomposed Questions:

1. What are asynchronous operations in Node.js?

2. What is the Event Loop?

3. How does libuv handle asynchronous tasks?

4. How are completed operations processed?

Retrieve documents for each question,
then combine the information to answer.`}
          />

          <p className="text-sm text-[#aaa]">
            Unlike Multi-Query, which creates alternative versions of one
            information need, Decomposition breaks one complex information need
            into smaller questions.
          </p>
        </div>
      </section>

      {/* 5 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          5. Query Transformation Techniques Comparison
        </h2>

        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full text-sm text-left">
            <thead className="bg-white/[0.05] text-white">
              <tr>
                <th className="p-3">Technique</th>
                <th className="p-3">Purpose</th>
              </tr>
            </thead>
            <tbody className="text-[#aaa]">
              {[
                ["Query Rewriting", "Make the query clearer."],
                ["Query Expansion", "Add related terms and context."],
                ["Multi-Query", "Generate alternative queries."],
                ["Step-Back", "Move from specific to broader concepts."],
                ["Decomposition", "Break complex queries into sub-questions."],
              ].map(([name, purpose], index) => (
                <tr key={index} className="border-t border-white/10">
                  <td className="p-3 text-white">{name}</td>
                  <td className="p-3">{purpose}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 6 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          6. Query Transformation with LangChain
        </h2>

        <p className="text-[#aaa] leading-7">
          We can use an LLM with LangChain to rewrite a user's query before
          sending it to a retriever.
        </p>

        <CodeBlock
          language="javascript"
          code={`import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from
  "@langchain/core/output_parsers";

// 1. Create an LLM
const model = new ChatOpenAI({
  model: "gpt-4o-mini",
  temperature: 0,
});

// 2. Create a query rewriting prompt
const prompt = PromptTemplate.fromTemplate(\`
Rewrite the user's question into a clear,
specific search query.

Preserve the original intent.
Do not answer the question.

User Question:
{question}

Rewritten Search Query:
\`);

// 3. Create a transformation chain
const queryTransformer = prompt
  .pipe(model)
  .pipe(new StringOutputParser());

// 4. Transform the original query
const originalQuery =
  "How does it work in Node?";

const transformedQuery =
  await queryTransformer.invoke({
    question: originalQuery,
  });

console.log("Original:", originalQuery);
console.log("Transformed:", transformedQuery);

// 5. Send transformed query to a retriever
const documents = await retriever.invoke(
  transformedQuery
);

console.log(documents);`}
        />

        <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/[0.05] p-4 space-y-2">
          <p className="font-semibold text-yellow-400">Important</p>
          <p className="text-sm text-[#aaa] leading-6">
            This example assumes that <code>retriever</code> has already been
            created. Query Transformation only improves the search query; it
            does not itself retrieve documents or generate the final answer.
          </p>
        </div>
      </section>

      {/* 7 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          7. Query Transformation in RAG
        </h2>

        <p className="text-[#aaa] leading-7">
          Query Transformation is usually added between the user input and the
          retrieval stage.
        </p>

        <CodeBlock
          language="text"
          code={`             User Question
                    |
                    v
            Query Transformation
                    |
                    v
                Retriever
                    |
                    v
             Retrieved Documents
                    |
                    v
             Context Construction
                    |
                    v
                  LLM
                    |
                    v
              Final Answer`}
        />

        <p className="text-[#aaa] leading-7">
          The rest of the RAG pipeline remains the same. The main difference is
          that retrieval receives an improved query.
        </p>
      </section>

      {/* 8 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          8. Advantages and Limitations
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-green-500/20 bg-green-500/[0.04] p-4 space-y-2">
            <h3 className="font-semibold text-green-400">Advantages</h3>
            <ul className="list-disc pl-5 text-sm text-[#aaa] space-y-2">
              <li>Improves unclear search queries.</li>
              <li>Can increase retrieval coverage.</li>
              <li>Handles complex questions better.</li>
              <li>Helps match different terminology.</li>
            </ul>
          </div>

          <div className="rounded-xl border border-red-500/20 bg-red-500/[0.04] p-4 space-y-2">
            <h3 className="font-semibold text-red-400">Limitations</h3>
            <ul className="list-disc pl-5 text-sm text-[#aaa] space-y-2">
              <li>Requires additional LLM calls in many implementations.</li>
              <li>Can increase latency and cost.</li>
              <li>May change the original user's intent.</li>
              <li>Generated queries can retrieve irrelevant documents.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 9 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          9. Interview Questions & Answers
        </h2>

        {[
          {
            q: "What is Query Transformation?",
            a: "It is a retrieval optimization technique that rewrites, expands, or decomposes a user query before document retrieval.",
          },
          {
            q: "Why is Query Transformation used in RAG?",
            a: "It helps improve retrieval by making queries clearer, more specific, or more comprehensive.",
          },
          {
            q: "What is Query Rewriting?",
            a: "It converts an original query into a clearer search query while preserving its intent.",
          },
          {
            q: "What is Multi-Query Generation?",
            a: "It generates multiple alternative queries from one original question and retrieves documents using those queries.",
          },
          {
            q: "What is Query Decomposition?",
            a: "It breaks a complex question into smaller sub-questions that can be retrieved separately.",
          },
          {
            q: "What is Step-Back Prompting?",
            a: "It converts a specific question into a broader conceptual question to retrieve foundational information.",
          },
          {
            q: "Does Query Transformation generate the final answer?",
            a: "No. It improves the query. Retrieval and answer generation happen in later RAG stages.",
          },
          {
            q: "What is the main disadvantage of Query Transformation?",
            a: "It can increase latency and cost, and an incorrect rewrite may change the user's original intent.",
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

export default QueryTransformation;
