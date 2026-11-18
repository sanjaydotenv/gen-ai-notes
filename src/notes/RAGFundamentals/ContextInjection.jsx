import React from "react";
import CodeBlock from "../../components/CodeBlock";

const ContextInjection = () => {
  return (
    <div className="space-y-8 text-[#E3E3E3]">
      {/* Header */}
      <div>
        <p className="text-sm font-semibold tracking-widest text-[#FC6C26]">
          RAG FUNDAMENTALS / 07
        </p>

        <h1 className="mt-2 text-3xl font-bold">Context Injection</h1>

        <p className="mt-3 leading-7 text-[#999]">
          Context Injection is the process of adding relevant information
          retrieved from external sources into an LLM prompt so that the model
          can use that information while generating an answer.
        </p>
      </div>

      {/* 1 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          1. What is Context Injection?
        </h2>

        <p className="leading-7 text-[#bbb]">
          An LLM generates answers using the information it learned during
          training and the context provided in its current prompt.
        </p>

        <p className="leading-7 text-[#bbb]">
          But an LLM may not know our private documents, latest information, or
          application-specific data.
        </p>

        <p className="leading-7 text-[#bbb]">
          Context Injection solves this problem by adding retrieved information
          directly to the prompt before sending it to the LLM.
        </p>

        <CodeBlock
          code={`Retrieved Documents
        |
        v
Extract Relevant Text
        |
        v
Build Prompt with Context
        |
        v
Send Prompt to LLM
        |
        v
Generate Answer`}
        />

        <div className="rounded-xl border border-white/10 bg-[#1A1A1A] p-4">
          <p className="font-semibold text-[#FC6C26]">Simple Definition</p>
          <p className="mt-2 text-sm leading-6 text-[#bbb]">
            Context Injection = Adding relevant external information to an LLM
            prompt so the model can answer using that information.
          </p>
        </div>
      </section>

      {/* 2 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          2. Why Do We Need Context Injection?
        </h2>

        <p className="leading-7 text-[#bbb]">
          Imagine you have built a chatbot for your company's internal
          documentation.
        </p>

        <p className="leading-7 text-[#bbb]">A user asks:</p>

        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <p className="text-sm text-[#999]">User Question</p>
          <p className="mt-2 font-medium text-white">
            "What is our company's work-from-home policy?"
          </p>
        </div>

        <p className="leading-7 text-[#bbb]">
          The LLM probably does not know your company's private policy. But your
          RAG system can retrieve that information and inject it into the
          prompt.
        </p>

        <CodeBlock
          code={`Without Context:

User -> LLM
        |
        v
LLM may not know company policy.


With Context:

User Question
      |
      v
Retrieve Company Policy
      |
      v
Inject Policy into Prompt
      |
      v
LLM Generates Answer`}
        />
      </section>

      {/* 3 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          3. How Context Injection Works
        </h2>

        <p className="leading-7 text-[#bbb]">
          Let's understand the complete process with an example.
        </p>

        <h3 className="font-semibold text-white">
          Step 1: User asks a question
        </h3>

        <CodeBlock
          language="javascript"
          code={`const question =
  "What is Node.js?";`}
        />

        <h3 className="font-semibold text-white">
          Step 2: Retriever finds relevant documents
        </h3>

        <CodeBlock
          language="javascript"
          code={`const retrievedDocs = [
  "Node.js is a JavaScript runtime.",
  "Node.js uses the V8 JavaScript engine.",
  "Node.js supports asynchronous I/O."
];`}
        />

        <h3 className="font-semibold text-white">
          Step 3: Combine retrieved documents
        </h3>

        <CodeBlock
          language="javascript"
          code={`const context = retrievedDocs.join("\\n\\n");

console.log(context);`}
        />

        <h3 className="font-semibold text-white">
          Step 4: Inject context into the prompt
        </h3>

        <CodeBlock
          language="javascript"
          code={`const prompt = \`
Answer the question using the context below.

Context:
\${context}

Question:
\${question}

Answer:
\`;`}
        />

        <h3 className="font-semibold text-white">
          Step 5: Send the prompt to the LLM
        </h3>

        <CodeBlock
          language="javascript"
          code={`const response = await model.invoke(prompt);

console.log(response);`}
        />

        <p className="text-sm leading-6 text-[#999]">
          Here, the retrieved documents become part of the input prompt. The
          model can use them while generating its response.
        </p>
      </section>

      {/* 4 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          4. Anatomy of a RAG Prompt
        </h2>

        <p className="leading-7 text-[#bbb]">
          A RAG prompt usually contains instructions, retrieved context, and the
          user's question.
        </p>

        <CodeBlock
          language="text"
          code={`You are a helpful assistant.

Instructions:
Answer the question using only the provided context.
If the answer is not available in the context,
say that you don't have enough information.

Context:
Node.js is a JavaScript runtime.
It uses the V8 engine.
It supports asynchronous I/O.

Question:
What is Node.js?

Answer:`}
        />

        <div className="space-y-2">
          {[
            ["System Instructions", "Tell the model how it should behave."],
            ["Context", "Contains information retrieved from documents."],
            ["Question", "Contains the user's actual query."],
            ["Answer", "The place where the model generates its response."],
          ].map(([title, desc], index) => (
            <div
              key={index}
              className="rounded-xl border border-white/10 bg-[#1A1A1A] p-3"
            >
              <p className="font-semibold text-white">{title}</p>
              <p className="mt-1 text-sm text-[#999]">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          5. Context Formatting
        </h2>

        <p className="leading-7 text-[#bbb]">
          A retriever generally returns Document objects containing pageContent
          and metadata.
        </p>

        <CodeBlock
          language="javascript"
          code={`const docs = [
  {
    pageContent: "Node.js is a JavaScript runtime.",
    metadata: { source: "nodejs.pdf", page: 1 }
  },
  {
    pageContent: "Node.js uses the V8 engine.",
    metadata: { source: "nodejs.pdf", page: 2 }
  }
];`}
        />

        <p className="leading-7 text-[#bbb]">
          We can format these documents into readable context before injecting
          them into the prompt.
        </p>

        <CodeBlock
          language="javascript"
          code={`const context = docs
  .map((doc, index) => {
    return \`
Document \${index + 1}:
Source: \${doc.metadata.source}
Page: \${doc.metadata.page}

Content:
\${doc.pageContent}
    \`;
  })
  .join("\\n\\n");

console.log(context);`}
        />

        <p className="text-sm leading-6 text-[#999]">
          Including source metadata can help the model produce source-aware
          answers and can help your application show citations. Metadata itself
          does not guarantee accurate citations.
        </p>
      </section>

      {/* 6 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          6. Context Window and Token Limit
        </h2>

        <p className="leading-7 text-[#bbb]">
          Every LLM has a context window. It defines how much input and output
          the model can handle in a request.
        </p>

        <p className="leading-7 text-[#bbb]">
          If we inject too many documents, the prompt may become too large and
          exceed the model's context limit.
        </p>

        <CodeBlock
          code={`LLM Context Window
        |
        +-- System Instructions
        |
        +-- User Question
        |
        +-- Retrieved Context
        |
        +-- Conversation History
        |
        +-- Available Output Space`}
        />

        <div className="rounded-xl border border-white/10 bg-[#1A1A1A] p-4">
          <p className="font-semibold text-[#FC6C26]">Important</p>
          <p className="mt-2 text-sm leading-6 text-[#bbb]">
            More context does not always mean better answers. Irrelevant or
            excessive context can increase cost, consume tokens, and sometimes
            distract the model.
          </p>
        </div>
      </section>

      {/* 7 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          7. Context Selection and Optimization
        </h2>

        <p className="leading-7 text-[#bbb]">
          Before injecting documents into the prompt, we should make sure the
          context is useful and within the model's token budget.
        </p>

        <div className="space-y-3">
          {[
            {
              title: "Relevant Retrieval",
              desc: "Retrieve documents that actually answer the user's question.",
            },
            {
              title: "Top-K Selection",
              desc: "Choose a suitable number of relevant chunks instead of adding everything.",
            },
            {
              title: "Deduplication",
              desc: "Remove repeated or highly overlapping information where appropriate.",
            },
            {
              title: "Context Compression",
              desc: "Reduce unnecessary text while preserving important information.",
            },
            {
              title: "Token Budget",
              desc: "Keep the final prompt within the model's context window.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="rounded-xl border border-white/10 bg-[#1A1A1A] p-4"
            >
              <p className="font-semibold text-white">
                {index + 1}. {item.title}
              </p>
              <p className="mt-2 text-sm leading-6 text-[#999]">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 8 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          8. Context Injection in LangChain
        </h2>

        <p className="leading-7 text-[#bbb]">
          LangChain provides PromptTemplate and other runnable components to
          build prompts dynamically.
        </p>

        <h3 className="font-semibold text-white">
          Step 1: Create a Prompt Template
        </h3>

        <CodeBlock
          language="javascript"
          code={`import { PromptTemplate } from "@langchain/core/prompts";

const promptTemplate = PromptTemplate.fromTemplate(\`
Answer the question using the context below.

Context:
{context}

Question:
{question}

Answer:
\`);`}
        />

        <h3 className="font-semibold text-white">
          Step 2: Get Documents from Retriever
        </h3>

        <CodeBlock
          language="javascript"
          code={`const docs = await retriever.invoke(
  "What is Node.js?"
);`}
        />

        <h3 className="font-semibold text-white">
          Step 3: Format the Documents
        </h3>

        <CodeBlock
          language="javascript"
          code={`const context = docs
  .map((doc) => doc.pageContent)
  .join("\\n\\n");`}
        />

        <h3 className="font-semibold text-white">
          Step 4: Build the Final Prompt
        </h3>

        <CodeBlock
          language="javascript"
          code={`const formattedPrompt = await promptTemplate.format({
  context,
  question: "What is Node.js?"
});

console.log(formattedPrompt);`}
        />

        <h3 className="font-semibold text-white">Step 5: Send it to the LLM</h3>

        <CodeBlock
          language="javascript"
          code={`const answer = await model.invoke(formattedPrompt);

console.log(answer);`}
        />

        <p className="text-sm leading-6 text-[#999]">
          This example assumes that model and retriever have already been
          initialized. The retrieved text is inserted into the prompt through
          the context variable.
        </p>
      </section>

      {/* 9 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          9. Context Injection vs Retrieval
        </h2>

        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full min-w-[460px] text-left text-sm">
            <thead className="bg-white/[0.05] text-white">
              <tr>
                <th className="p-3">Retrieval</th>
                <th className="p-3">Context Injection</th>
              </tr>
            </thead>
            <tbody className="text-[#bbb]">
              <tr className="border-t border-white/10">
                <td className="p-3">Finds relevant documents.</td>
                <td className="p-3">
                  Adds retrieved information to the prompt.
                </td>
              </tr>
              <tr className="border-t border-white/10">
                <td className="p-3">Works with the knowledge base.</td>
                <td className="p-3">Works with the LLM input.</td>
              </tr>
              <tr className="border-t border-white/10">
                <td className="p-3">Returns documents.</td>
                <td className="p-3">Prepares context for generation.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 10 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          10. Common Problems
        </h2>

        <div className="space-y-3">
          {[
            {
              title: "Irrelevant Context",
              desc: "The retriever may return documents that do not answer the question.",
            },
            {
              title: "Too Much Context",
              desc: "Excessive documents can consume the token budget and introduce noise.",
            },
            {
              title: "Missing Context",
              desc: "Important information may not be retrieved or may be missing from the knowledge base.",
            },
            {
              title: "Prompt Injection from Documents",
              desc: "Retrieved content may contain malicious instructions. Treat retrieved documents as untrusted data, not system instructions.",
            },
            {
              title: "Hallucination",
              desc: "The LLM may still generate unsupported information even when context is provided.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="rounded-xl border border-white/10 bg-[#1A1A1A] p-4"
            >
              <p className="font-semibold text-white">
                {index + 1}. {item.title}
              </p>
              <p className="mt-2 text-sm leading-6 text-[#999]">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 11 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          11. Complete Context Injection Flow
        </h2>

        <CodeBlock
          code={`User Question
      |
      v
Query Embedding
      |
      v
Retriever
      |
      v
Relevant Documents
      |
      v
Format Retrieved Context
      |
      v
Build Prompt
      |
      +---- System Instructions
      |
      +---- Retrieved Context
      |
      +---- User Question
      |
      v
Send Prompt to LLM
      |
      v
Generate Final Answer`}
        />
      </section>

      {/* 12 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          12. Important Points to Remember
        </h2>

        <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-[#bbb]">
          <li>Context Injection adds external information to an LLM prompt.</li>
          <li>Retrieved documents become part of the model's input.</li>
          <li>
            A RAG prompt usually contains instructions, context, and a question.
          </li>
          <li>Context must fit within the model's context window.</li>
          <li>More context does not always produce better answers.</li>
          <li>Document formatting makes context easier to organize.</li>
          <li>Context compression can reduce unnecessary tokens.</li>
          <li>Retrieved documents should be treated as untrusted input.</li>
          <li>
            Context Injection does not guarantee that the LLM will always answer
            correctly.
          </li>
        </ul>
      </section>

      {/* 13 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-[#FC6C26]">
          13. Interview Questions & Answers
        </h2>

        <div className="space-y-4">
          {[
            {
              q: "What is Context Injection?",
              a: "It is the process of adding retrieved external information to an LLM prompt so the model can use it while generating an answer.",
            },
            {
              q: "Why is Context Injection important in RAG?",
              a: "It provides the LLM with relevant information from external knowledge sources that may not be available in its training data.",
            },
            {
              q: "What does a RAG prompt contain?",
              a: "It commonly contains system instructions, retrieved context, and the user's question.",
            },
            {
              q: "What is a context window?",
              a: "It is the amount of input and output tokens a model can handle in a request, according to its model-specific limits.",
            },
            {
              q: "Does more context always improve answers?",
              a: "No. Too much irrelevant context can introduce noise, increase cost, and reduce the space available for output.",
            },
            {
              q: "What is Context Compression?",
              a: "It reduces unnecessary information in retrieved context while preserving information relevant to the question.",
            },
            {
              q: "What is the difference between Retrieval and Context Injection?",
              a: "Retrieval finds relevant documents, while Context Injection places their content into the LLM prompt.",
            },
            {
              q: "Does Context Injection prevent hallucinations?",
              a: "No. It can ground answers in external information, but the LLM may still generate unsupported or incorrect information.",
            },
            {
              q: "Why should retrieved documents be treated as untrusted data?",
              a: "Documents may contain malicious instructions or prompt injection attempts. They should be used as information, not trusted instructions.",
            },
            {
              q: "How is Context Injection implemented in LangChain?",
              a: "A retriever fetches documents, their pageContent is formatted, and a PromptTemplate inserts that context into the prompt sent to the LLM.",
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

export default ContextInjection;
