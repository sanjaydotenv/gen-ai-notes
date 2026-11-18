import React from "react";
import CodeBlock from "../../components/CodeBlock";

const LCEL = () => {
  return (
    <div className="space-y-8 text-[#E3E3E3]">
      {/* Header */}
      <div>
        <p className="text-sm font-semibold tracking-widest text-[#FC6C26]">
          LANGCHAIN FUNDAMENTALS / 06
        </p>
        <h1 className="mt-2 text-3xl font-bold">
          LCEL (LangChain Expression Language)
        </h1>
        <p className="mt-3 leading-7 text-[#999]">
          LCEL is a declarative way to compose LangChain components into
          reusable workflows. It allows us to connect prompts, models, parsers,
          and other Runnables using a simple syntax.
        </p>
      </div>

      {/* Introduction */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">1. What is LCEL?</h2>

        <p className="leading-7 text-[#aaa]">
          LCEL stands for LangChain Expression Language. It provides a standard
          way to connect different LangChain components and execute them as a
          single workflow.
        </p>

        <p className="leading-7 text-[#aaa]">
          For example, we can connect a prompt, an LLM, and an output parser
          using the pipe operator.
        </p>

        <CodeBlock
          code={`const chain = prompt
  .pipe(model)
  .pipe(parser);`}
        />

        <p className="text-sm leading-6 text-[#aaa]">
          Each component receives the output of the previous component and
          processes it.
        </p>

        <CodeBlock
          code={`User Input
    |
    v
Prompt Template
    |
    v
Chat Model
    |
    v
Output Parser
    |
    v
Final Response`}
        />
      </section>

      {/* Why */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">2. Why Do We Need LCEL?</h2>

        <p className="leading-7 text-[#aaa]">
          Without LCEL, we manually execute every component and pass data
          between them.
        </p>

        <h3 className="font-semibold text-[#FC6C26]">Without LCEL</h3>

        <CodeBlock
          code={`const promptValue = await prompt.invoke({
  topic: "Node.js"
});

const modelResponse = await model.invoke(promptValue);

const finalResponse = await parser.invoke(modelResponse);

console.log(finalResponse);`}
        />

        <h3 className="font-semibold text-[#FC6C26]">With LCEL</h3>

        <CodeBlock
          code={`const chain = prompt
  .pipe(model)
  .pipe(parser);

const result = await chain.invoke({
  topic: "Node.js"
});

console.log(result);`}
        />

        <p className="text-sm leading-6 text-[#aaa]">
          LCEL makes workflows easier to read, reuse, compose, and execute.
        </p>
      </section>

      {/* Runnable */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">3. LCEL and Runnables</h2>

        <p className="leading-7 text-[#aaa]">
          LCEL is built around the Runnable interface. A Runnable is a component
          that follows a common execution interface provided by LangChain.
        </p>

        <p className="leading-7 text-[#aaa]">
          Models, prompt templates, output parsers, and Runnable compositions
          can all be used as Runnables.
        </p>

        <CodeBlock
          code={`PromptTemplate  -> Runnable
ChatModel       -> Runnable
OutputParser    -> Runnable
RunnableSequence -> Runnable
RunnableParallel -> Runnable`}
        />

        <p className="text-sm leading-6 text-[#aaa]">
          Because these components share a common interface, we can connect them
          using pipe().
        </p>
      </section>

      {/* Pipe */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">4. The pipe() Method</h2>

        <p className="leading-7 text-[#aaa]">
          pipe() connects one Runnable to another Runnable. The output of the
          first component becomes the input of the next component.
        </p>

        <CodeBlock
          code={`const chain = prompt
  .pipe(model)
  .pipe(parser);`}
        />

        <h3 className="font-semibold text-[#FC6C26]">Example</h3>

        <CodeBlock
          code={`import { ChatOpenAI } from "@langchain/openai";

import {
  ChatPromptTemplate
} from "@langchain/core/prompts";

import {
  StringOutputParser
} from "@langchain/core/output_parsers";

const prompt = ChatPromptTemplate.fromTemplate(
  "Explain {topic} in simple words."
);

const model = new ChatOpenAI({
  model: "gpt-4o-mini"
});

const parser = new StringOutputParser();

const chain = prompt
  .pipe(model)
  .pipe(parser);

const result = await chain.invoke({
  topic: "JavaScript"
});

console.log(result);`}
        />

        <p className="text-sm leading-6 text-[#aaa]">
          The chain accepts an object, creates a prompt, sends it to the model,
          and finally extracts plain text.
        </p>
      </section>

      {/* Invoke */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">5. invoke() Method</h2>

        <p className="leading-7 text-[#aaa]">
          invoke() executes a Runnable or complete chain with the provided input
          and returns its final output.
        </p>

        <CodeBlock
          code={`const result = await chain.invoke({
  topic: "Artificial Intelligence"
});

console.log(result);`}
        />

        <p className="text-sm leading-6 text-[#aaa]">
          invoke() is useful when we want to execute a workflow and wait for its
          complete result.
        </p>
      </section>

      {/* Batch */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">6. batch() Method</h2>

        <p className="leading-7 text-[#aaa]">
          batch() executes a Runnable with multiple inputs. It returns an array
          containing the corresponding outputs.
        </p>

        <CodeBlock
          code={`const results = await chain.batch([
  { topic: "Node.js" },
  { topic: "React" },
  { topic: "MongoDB" }
]);

console.log(results);`}
        />

        <p className="text-sm leading-6 text-[#aaa]">
          Instead of calling invoke() separately for every input, we can use
          batch() to process multiple inputs together.
        </p>
      </section>

      {/* Stream */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">7. stream() Method</h2>

        <p className="leading-7 text-[#aaa]">
          stream() allows us to receive output incrementally instead of waiting
          for the entire response.
        </p>

        <CodeBlock
          code={`const stream = await chain.stream({
  topic: "Artificial Intelligence"
});

for await (const chunk of stream) {
  process.stdout.write(chunk);
}`}
        />

        <p className="text-sm leading-6 text-[#aaa]">
          This is useful for AI chat applications where users should see
          responses as they are generated.
        </p>

        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <p className="font-semibold text-[#FC6C26]">Important</p>
          <p className="mt-2 text-sm leading-6 text-[#aaa]">
            Streaming behavior depends on the components in the chain. Some
            components may buffer or transform chunks before passing them
            forward.
          </p>
        </div>
      </section>

      {/* Sequence */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">8. RunnableSequence</h2>

        <p className="leading-7 text-[#aaa]">
          RunnableSequence executes multiple Runnables sequentially. It is one
          of the ways LCEL represents a step-by-step workflow.
        </p>

        <CodeBlock
          code={`import {
  RunnableSequence
} from "@langchain/core/runnables";

const chain = RunnableSequence.from([
  prompt,
  model,
  parser
]);

const result = await chain.invoke({
  topic: "Express.js"
});

console.log(result);`}
        />

        <p className="text-sm leading-6 text-[#aaa]">
          Both pipe() composition and RunnableSequence can create sequential
          workflows.
        </p>
      </section>

      {/* Parallel */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">9. RunnableParallel</h2>

        <p className="leading-7 text-[#aaa]">
          RunnableParallel executes multiple independent Runnables using the
          same input and combines their outputs into one object.
        </p>

        <CodeBlock
          code={`import {
  RunnableParallel
} from "@langchain/core/runnables";

const summaryChain = summaryPrompt
  .pipe(model)
  .pipe(parser);

const translationChain = translationPrompt
  .pipe(model)
  .pipe(parser);

const parallelChain = RunnableParallel.from({
  summary: summaryChain,
  translation: translationChain
});

const result = await parallelChain.invoke({
  topic: "Artificial Intelligence"
});

console.log(result.summary);
console.log(result.translation);`}
        />

        <CodeBlock
          code={`             Input
               |
       -----------------
       |               |
       v               v
  Summary Chain   Translation Chain
       |               |
       v               v
    Summary        Translation
       |               |
       -----------------
               |
               v
         Final Object`}
        />

        <p className="text-sm leading-6 text-[#aaa]">
          Both branches run independently. They do not wait for one another's
          output.
        </p>
      </section>

      {/* Assign */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">
          10. RunnablePassthrough and RunnablePassthrough.assign()
        </h2>

        <p className="leading-7 text-[#aaa]">
          RunnablePassthrough allows input data to pass through a workflow
          without changing it.
        </p>

        <CodeBlock
          code={`import {
  RunnablePassthrough
} from "@langchain/core/runnables";

const chain = RunnablePassthrough;

const result = await chain.invoke({
  topic: "Node.js",
  level: "Beginner"
});

console.log(result);

// {
//   topic: "Node.js",
//   level: "Beginner"
// }`}
        />

        <h3 className="font-semibold text-[#FC6C26]">Using assign()</h3>

        <p className="leading-7 text-[#aaa]">
          assign() adds new calculated fields to an existing input object while
          preserving its original fields.
        </p>

        <CodeBlock
          code={`import {
  RunnablePassthrough,
  RunnableLambda
} from "@langchain/core/runnables";

const chain = RunnablePassthrough.assign({
  message: RunnableLambda.from(
    async (input) => \`Learning \${input.topic}\`
  )
});

const result = await chain.invoke({
  topic: "LangChain"
});

console.log(result);

// {
//   topic: "LangChain",
//   message: "Learning LangChain"
// }`}
        />

        <p className="text-sm leading-6 text-[#aaa]">
          This is useful when we need to preserve existing input and add extra
          information during a workflow.
        </p>
      </section>

      {/* Benefits */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">11. Benefits of LCEL</h2>

        <div className="grid gap-3 sm:grid-cols-2">
          {[
            [
              "Readable Workflows",
              "Connect components with a simple pipe() syntax.",
            ],
            [
              "Streaming",
              "Support incremental output from compatible components.",
            ],
            ["Batching", "Process multiple inputs using batch()."],
            ["Parallel Execution", "Run independent branches concurrently."],
            [
              "Reusability",
              "Create workflows that can be reused in different parts of an application.",
            ],
            ["Composition", "Combine smaller Runnables into larger workflows."],
          ].map(([title, desc]) => (
            <div
              key={title}
              className="rounded-xl border border-white/10 bg-[#1A1A1A] p-4"
            >
              <h3 className="font-semibold text-[#FC6C26]">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#aaa]">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Important */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">12. Important Points</h2>

        <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-[#aaa]">
          <li>LCEL stands for LangChain Expression Language.</li>
          <li>LCEL is used to compose LangChain components into workflows.</li>
          <li>Runnable is the common interface behind LCEL components.</li>
          <li>pipe() connects Runnables sequentially.</li>
          <li>invoke() executes a workflow with one input.</li>
          <li>batch() executes a workflow with multiple inputs.</li>
          <li>stream() provides incremental output.</li>
          <li>RunnableSequence executes steps one after another.</li>
          <li>RunnableParallel executes independent branches concurrently.</li>
          <li>RunnablePassthrough passes input through unchanged.</li>
          <li>
            RunnablePassthrough.assign() adds new fields to existing input.
          </li>
        </ul>
      </section>

      {/* Interview */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold">13. Interview Questions & Answers</h2>

        {[
          {
            q: "What is LCEL?",
            a: "LCEL stands for LangChain Expression Language. It is a declarative way to compose Runnables into workflows.",
          },
          {
            q: "Why do we use LCEL?",
            a: "It makes workflows easier to compose, reuse, execute, and maintain.",
          },
          {
            q: "What is a Runnable?",
            a: "A Runnable is a LangChain component that follows a common interface for execution.",
          },
          {
            q: "What does pipe() do?",
            a: "It connects one Runnable to another, passing the first Runnable's output as the next Runnable's input.",
          },
          {
            q: "What is invoke()?",
            a: "invoke() executes a Runnable with a single input and returns its output.",
          },
          {
            q: "What is batch()?",
            a: "batch() executes a Runnable with multiple inputs and returns an array of outputs.",
          },
          {
            q: "What is stream()?",
            a: "stream() allows a Runnable to return output incrementally as chunks.",
          },
          {
            q: "What is RunnableSequence?",
            a: "It executes multiple Runnables sequentially, passing outputs from one step to the next.",
          },
          {
            q: "What is RunnableParallel?",
            a: "It executes multiple independent Runnables concurrently and combines their outputs into an object.",
          },
          {
            q: "What is RunnablePassthrough?",
            a: "It passes input data through a workflow without changing it.",
          },
          {
            q: "What is RunnablePassthrough.assign()?",
            a: "It preserves existing input fields and adds new fields calculated by other Runnables.",
          },
          {
            q: "What is the difference between invoke() and stream()?",
            a: "invoke() returns the completed output, while stream() provides output incrementally when supported.",
          },
        ].map((item, index) => (
          <div
            key={index}
            className="rounded-xl border border-white/10 bg-white/[0.03] p-4 space-y-2"
          >
            <p className="text-sm font-semibold">
              <span className="mr-2 text-[#FC6C26]">Q{index + 1}.</span>
              {item.q}
            </p>
            <p className="text-sm leading-6 text-[#aaa]">
              <span className="font-semibold text-green-400">Answer: </span>
              {item.a}
            </p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default LCEL;
