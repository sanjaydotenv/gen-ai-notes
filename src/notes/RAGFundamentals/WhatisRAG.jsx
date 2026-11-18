import React from "react";
import CodeBlock from "../../components/CodeBlock";

const WhatisRAG = () => {
  return (
    <div className="space-y-8 text-[#E3E3E3]">
      {/* Header */}
      <div>
        <p className="text-sm font-semibold tracking-widest text-[#FC6C26]">
          RAG FUNDAMENTALS / 01
        </p>

        <h1 className="mt-2 text-3xl font-bold">What is RAG?</h1>

        <p className="mt-3 text-[#999] leading-7">
          RAG (Retrieval-Augmented Generation) is a technique that allows an AI
          model to retrieve relevant information from external sources before
          generating an answer.
        </p>
      </div>

      {/* 1 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          1. What is RAG?
        </h2>

        <p className="leading-7 text-[#bbb]">
          RAG stands for{" "}
          <strong className="text-white">Retrieval-Augmented Generation</strong>
          . It combines two main capabilities:
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-white/10 bg-[#1A1A1A] p-5">
            <h3 className="font-semibold text-white">Retrieval</h3>
            <p className="mt-2 text-sm leading-6 text-[#999]">
              Finding relevant information from external sources such as
              documents, PDFs, databases, or knowledge bases.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-[#1A1A1A] p-5">
            <h3 className="font-semibold text-white">Generation</h3>
            <p className="mt-2 text-sm leading-6 text-[#999]">
              Using an LLM to understand the retrieved information and generate
              a natural language response.
            </p>
          </div>
        </div>

        <p className="leading-7 text-[#bbb]">
          In simple words, RAG first searches for useful information and then
          gives that information to an AI model to generate a better answer.
        </p>
      </section>

      {/* 2 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          2. Why Do We Need RAG?
        </h2>

        <p className="leading-7 text-[#bbb]">
          An LLM has learned from its training data, but it does not
          automatically know your private documents, internal company data, or
          information created after its training.
        </p>

        <div className="rounded-xl border border-white/10 bg-[#1A1A1A] p-5 space-y-3">
          <h3 className="font-semibold text-white">
            Example: Company Knowledge
          </h3>

          <p className="text-sm leading-6 text-[#999]">
            Imagine you have a company chatbot. An employee asks:
          </p>

          <div className="rounded-lg bg-white/[0.04] p-4">
            <p className="text-sm text-white">
              "What is our company's leave policy?"
            </p>
          </div>

          <p className="text-sm leading-6 text-[#999]">
            A general LLM does not know your company's private leave policy. But
            with RAG, the application can search company documents, retrieve the
            relevant policy, and provide it to the LLM.
          </p>

          <div className="rounded-lg border border-green-500/20 bg-green-500/[0.05] p-4">
            <p className="text-sm text-green-400 font-medium">
              Result: The AI can answer using your company's actual information
              instead of guessing.
            </p>
          </div>
        </div>
      </section>

      {/* 3 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          3. How Does RAG Work?
        </h2>

        <p className="leading-7 text-[#bbb]">
          A basic RAG system works in two major phases: indexing and retrieval.
        </p>

        <h3 className="font-semibold text-white">A. Indexing Phase</h3>

        <p className="text-sm leading-6 text-[#999]">
          Before users ask questions, we prepare our documents so that the
          system can search them efficiently.
        </p>

        <CodeBlock
          code={`Documents (PDF, TXT, etc.)
        |
        v
Document Loading
        |
        v
Text Splitting (Chunking)
        |
        v
Embedding Generation
        |
        v
Store Vectors in Vector Database`}
        />

        <h3 className="font-semibold text-white">
          B. Retrieval and Generation Phase
        </h3>

        <p className="text-sm leading-6 text-[#999]">
          When a user asks a question, the system searches for relevant
          information and sends it to the LLM.
        </p>

        <CodeBlock
          code={`User Question
      |
      v
Generate Query Embedding
      |
      v
Search Vector Database
      |
      v
Retrieve Relevant Chunks
      |
      v
Add Retrieved Context to Prompt
      |
      v
Send Prompt to LLM
      |
      v
Generate Final Answer`}
        />

        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <p className="text-sm font-semibold text-[#FC6C26]">Important</p>
          <p className="mt-2 text-sm leading-6 text-[#bbb]">
            Indexing happens when we prepare or update our knowledge base.
            Retrieval happens when a user asks a question. These are two
            different stages of a RAG system.
          </p>
        </div>
      </section>

      {/* 4 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          4. Simple RAG Example
        </h2>

        <p className="leading-7 text-[#bbb]">
          Suppose we have a document containing this information:
        </p>

        <CodeBlock
          code={`Document:
"Node.js is a JavaScript runtime built on Chrome's V8 engine."`}
        />

        <p className="text-sm text-[#999]">A user asks:</p>

        <CodeBlock
          code={`Question:
"What is Node.js?"`}
        />

        <p className="text-sm text-[#999]">
          RAG retrieves the relevant document and creates a prompt containing
          both the context and the user's question.
        </p>

        <CodeBlock
          code={`Context:
Node.js is a JavaScript runtime built on Chrome's V8 engine.

Question:
What is Node.js?

Instruction:
Answer the question using the provided context.`}
        />

        <p className="text-sm text-[#999]">
          The LLM uses this context to generate the final answer:
        </p>

        <div className="rounded-xl border border-green-500/20 bg-green-500/[0.05] p-4">
          <p className="text-sm font-semibold text-green-400">
            Generated Answer
          </p>
          <p className="mt-2 text-sm leading-6 text-[#bbb]">
            Node.js is a JavaScript runtime built on Chrome's V8 engine. It
            allows JavaScript to run outside the browser.
          </p>
        </div>
      </section>

      {/* 5 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          5. RAG vs Fine-Tuning
        </h2>

        <p className="leading-7 text-[#bbb]">
          RAG and Fine-Tuning both help customize AI applications, but they
          solve different problems.
        </p>

        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full min-w-[500px] text-left text-sm">
            <thead className="bg-white/[0.05] text-white">
              <tr>
                <th className="p-3">RAG</th>
                <th className="p-3">Fine-Tuning</th>
              </tr>
            </thead>
            <tbody className="text-[#aaa]">
              <tr className="border-t border-white/10">
                <td className="p-3">Retrieves external information.</td>
                <td className="p-3">Trains a model further on examples.</td>
              </tr>
              <tr className="border-t border-white/10">
                <td className="p-3">
                  Knowledge can be updated by updating the data source.
                </td>
                <td className="p-3">
                  Requires another fine-tuning process to update learned
                  behavior.
                </td>
              </tr>
              <tr className="border-t border-white/10">
                <td className="p-3">
                  Useful for private and frequently changing data.
                </td>
                <td className="p-3">
                  Useful for adapting style, format, or task behavior.
                </td>
              </tr>
              <tr className="border-t border-white/10">
                <td className="p-3">Does not require model weight updates.</td>
                <td className="p-3">Updates model weights.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm leading-6 text-[#999]">
          Remember: RAG provides information at query time, while fine-tuning
          changes how a model behaves through additional training.
        </p>
      </section>

      {/* 6 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          6. Where Is RAG Used?
        </h2>

        <div className="grid gap-3 sm:grid-cols-2">
          {[
            ["AI Chatbots", "Answer questions using private knowledge."],
            ["PDF Chat Applications", "Ask questions about uploaded PDFs."],
            [
              "Customer Support",
              "Retrieve answers from product documentation.",
            ],
            ["Company Knowledge Bases", "Search internal company information."],
            [
              "Research Assistants",
              "Find relevant information from research papers.",
            ],
            [
              "Documentation Search",
              "Answer developer questions using project docs.",
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

      {/* 7 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          7. Limitations of RAG
        </h2>

        <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-[#bbb]">
          <li>
            <strong className="text-white">Wrong Retrieval:</strong> If the
            system retrieves irrelevant chunks, the answer may also be
            incorrect.
          </li>
          <li>
            <strong className="text-white">Poor Documents:</strong> Bad or
            incomplete source data leads to poor answers.
          </li>
          <li>
            <strong className="text-white">Hallucinations:</strong> An LLM can
            still generate incorrect information even when context is provided.
          </li>
          <li>
            <strong className="text-white">Latency:</strong> Searching databases
            and processing context adds extra processing time.
          </li>
          <li>
            <strong className="text-white">Context Limits:</strong> Sending too
            much retrieved information can exceed the model's context window or
            reduce answer quality.
          </li>
        </ul>
      </section>

      {/* 8 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          8. Interview Questions & Answers
        </h2>

        <div className="space-y-4">
          {[
            {
              q: "What is RAG?",
              a: "RAG stands for Retrieval-Augmented Generation. It retrieves relevant external information and provides it to an LLM to generate an informed answer.",
            },
            {
              q: "Why do we use RAG?",
              a: "We use RAG to let an LLM answer questions using external, private, or frequently updated data that may not be present in its training data.",
            },
            {
              q: "What are the two main phases of RAG?",
              a: "Indexing and retrieval-generation. Indexing prepares and stores document representations. Retrieval-generation finds relevant information and uses it to generate an answer.",
            },
            {
              q: "What is the difference between RAG and Fine-Tuning?",
              a: "RAG retrieves external information at query time. Fine-tuning further trains a model to adapt its behavior or task performance.",
            },
            {
              q: "Does RAG eliminate hallucinations?",
              a: "No. RAG can reduce hallucinations by providing relevant context, but it cannot guarantee that every generated answer is correct.",
            },
            {
              q: "Does RAG require fine-tuning an LLM?",
              a: "No. A RAG system can work with an existing LLM without changing its model weights.",
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

export default WhatisRAG;
