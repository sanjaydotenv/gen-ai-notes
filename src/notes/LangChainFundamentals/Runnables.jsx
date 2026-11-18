import React from "react";
import CodeBlock from "../../components/CodeBlock";

const Runnables = () => {
  return (
    <div className="space-y-8 text-[#E3E3E3]">
      {/* Header */}
      <div>
        <p className="text-sm font-semibold tracking-widest text-[#FC6C26]">
          LANGCHAIN FUNDAMENTALS / 07
        </p>
        <h1 className="mt-2 text-3xl font-bold">Runnables in LangChain</h1>
        <p className="mt-3 leading-7 text-[#999]">
          Runnables are the core building blocks of LangChain. They provide a
          common interface for executing, connecting, streaming, and managing
          different components in an AI workflow.
        </p>
      </div>

      {/* Introduction */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">1. What are Runnables?</h2>

        <p className="leading-7 text-[#aaa]">
          A Runnable is an object that follows a standard execution interface
          provided by LangChain.
        </p>

        <p className="leading-7 text-[#aaa]">
          Different LangChain components can work together because they follow
          this common interface.
        </p>

        <CodeBlock
          code={`Prompt Template  ─┐
Chat Model       ─┤
Output Parser    ─┼──> Runnable Interface
Runnable Lambda  ─┤
Runnable Sequence─┘`}
        />

        <p className="text-sm leading-6 text-[#aaa]">
          This common interface allows us to connect different components
          without writing custom execution logic for every component.
        </p>
      </section>

      {/* Why */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">2. Why Do We Need Runnables?</h2>

        <p className="leading-7 text-[#aaa]">
          Imagine building an AI application with prompts, models, parsers, and
          custom functions.
        </p>

        <p className="leading-7 text-[#aaa]">
          Without a common interface, every component might need a different way
          to execute and pass data.
        </p>

        <p className="leading-7 text-[#aaa]">
          Runnables solve this problem by providing common methods such as:
        </p>

        <CodeBlock
          code={`invoke()  -> Execute with one input
batch()   -> Execute with multiple inputs
stream()  -> Receive output incrementally
pipe()    -> Connect Runnables`}
        />
      </section>

      {/* Basic */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">3. Creating a Runnable</h2>

        <p className="leading-7 text-[#aaa]">
          We can create a custom Runnable using RunnableLambda. It allows us to
          convert a normal JavaScript function into a Runnable.
        </p>

        <CodeBlock
          code={`import {
  RunnableLambda
} from "@langchain/core/runnables";

const greet = RunnableLambda.from(
  async (name) => {
    return \`Hello, \${name}!\`;
  }
);

const result = await greet.invoke("Mayur");

console.log(result);

// Hello, Mayur!`}
        />

        <p className="text-sm leading-6 text-[#aaa]">
          RunnableLambda is useful when we want to add our own JavaScript logic
          inside a LangChain workflow.
        </p>
      </section>

      {/* Invoke */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">4. invoke() Method</h2>

        <p className="leading-7 text-[#aaa]">
          invoke() executes a Runnable with a single input and returns its
          completed output.
        </p>

        <CodeBlock
          code={`import {
  RunnableLambda
} from "@langchain/core/runnables";

const doubleNumber = RunnableLambda.from(
  async (number) => number * 2
);

const result = await doubleNumber.invoke(10);

console.log(result);

// 20`}
        />

        <p className="text-sm leading-6 text-[#aaa]">
          Use invoke() when you want to execute a Runnable and wait for the
          complete result.
        </p>
      </section>

      {/* Batch */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">5. batch() Method</h2>

        <p className="leading-7 text-[#aaa]">
          batch() executes a Runnable with multiple inputs and returns an array
          of corresponding outputs.
        </p>

        <CodeBlock
          code={`const doubleNumber = RunnableLambda.from(
  async (number) => number * 2
);

const results = await doubleNumber.batch([
  10,
  20,
  30,
  40
]);

console.log(results);

// [20, 40, 60, 80]`}
        />

        <p className="text-sm leading-6 text-[#aaa]">
          batch() is useful when processing multiple independent inputs through
          the same Runnable.
        </p>
      </section>

      {/* Stream */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">6. stream() Method</h2>

        <p className="leading-7 text-[#aaa]">
          stream() allows us to receive output incrementally instead of waiting
          for the complete result.
        </p>

        <CodeBlock
          code={`const generateText = RunnableLambda.from(
  async function* (input) {
    const words = input.split(" ");

    for (const word of words) {
      yield word + " ";
    }
  }
);

const stream = await generateText.stream(
  "Learning LangChain is interesting"
);

for await (const chunk of stream) {
  process.stdout.write(chunk);
}`}
        />

        <p className="text-sm leading-6 text-[#aaa]">
          A Runnable can produce multiple chunks when its implementation
          supports streaming.
        </p>
      </section>

      {/* Sequence */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">7. RunnableSequence</h2>

        <p className="leading-7 text-[#aaa]">
          RunnableSequence executes multiple Runnables one after another. Each
          Runnable receives the output of the previous Runnable.
        </p>

        <CodeBlock
          code={`import {
  RunnableLambda,
  RunnableSequence
} from "@langchain/core/runnables";

const addFive = RunnableLambda.from(
  async (number) => number + 5
);

const multiplyByTwo = RunnableLambda.from(
  async (number) => number * 2
);

const chain = RunnableSequence.from([
  addFive,
  multiplyByTwo
]);

const result = await chain.invoke(10);

console.log(result);

// 30`}
        />

        <CodeBlock
          code={`Input: 10
   |
   v
Add 5
   |
   v
15
   |
   v
Multiply by 2
   |
   v
Output: 30`}
        />

        <p className="text-sm leading-6 text-[#aaa]">
          RunnableSequence is useful for building step-by-step workflows.
        </p>
      </section>

      {/* Parallel */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">8. RunnableParallel</h2>

        <p className="leading-7 text-[#aaa]">
          RunnableParallel executes multiple Runnables concurrently using the
          same input and combines their outputs into one object.
        </p>

        <CodeBlock
          code={`import {
  RunnableLambda,
  RunnableParallel
} from "@langchain/core/runnables";

const getUppercase = RunnableLambda.from(
  async (text) => text.toUpperCase()
);

const getLength = RunnableLambda.from(
  async (text) => text.length
);

const parallel = RunnableParallel.from({
  uppercase: getUppercase,
  length: getLength
});

const result = await parallel.invoke("LangChain");

console.log(result);

// {
//   uppercase: "LANGCHAIN",
//   length: 9
// }`}
        />

        <CodeBlock
          code={`              Input
                |
        -------------------
        |                 |
        v                 v
   Uppercase           Length
        |                 |
        v                 v
   "LANGCHAIN"            9
        |                 |
        -------------------
                |
                v
           Final Object`}
        />

        <p className="text-sm leading-6 text-[#aaa]">
          Parallel execution is useful when multiple operations do not depend on
          each other's results.
        </p>
      </section>

      {/* Passthrough */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">9. RunnablePassthrough</h2>

        <p className="leading-7 text-[#aaa]">
          RunnablePassthrough passes input data forward without changing it.
        </p>

        <CodeBlock
          code={`import {
  RunnablePassthrough
} from "@langchain/core/runnables";

const result = await RunnablePassthrough
  .invoke({
    name: "Mayur",
    skill: "React"
  });

console.log(result);

// {
//   name: "Mayur",
//   skill: "React"
// }`}
        />

        <p className="text-sm leading-6 text-[#aaa]">
          It is useful when we want to preserve the original input while
          combining it with other workflow results.
        </p>

        <h3 className="font-semibold text-[#FC6C26]">
          RunnablePassthrough.assign()
        </h3>

        <p className="leading-7 text-[#aaa]">
          assign() preserves existing object fields and adds new fields
          calculated by other Runnables.
        </p>

        <CodeBlock
          code={`import {
  RunnableLambda,
  RunnablePassthrough
} from "@langchain/core/runnables";

const chain = RunnablePassthrough.assign({
  greeting: RunnableLambda.from(
    async (input) => \`Hello, \${input.name}!\`
  )
});

const result = await chain.invoke({
  name: "Mayur",
  skill: "React"
});

console.log(result);

// {
//   name: "Mayur",
//   skill: "React",
//   greeting: "Hello, Mayur!"
// }`}
        />
      </section>

      {/* Lambda */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">10. RunnableLambda</h2>

        <p className="leading-7 text-[#aaa]">
          RunnableLambda converts a normal JavaScript function into a Runnable
          so it can be used inside LCEL workflows.
        </p>

        <CodeBlock
          code={`import {
  RunnableLambda
} from "@langchain/core/runnables";

const formatUser = RunnableLambda.from(
  async (user) => {
    return {
      fullName: user.name.toUpperCase(),
      age: user.age
    };
  }
);

const result = await formatUser.invoke({
  name: "Mayur",
  age: 19
});

console.log(result);

// {
//   fullName: "MAYUR",
//   age: 19
// }`}
        />

        <p className="text-sm leading-6 text-[#aaa]">
          Use RunnableLambda when you need custom processing, formatting,
          validation, or business logic in a chain.
        </p>
      </section>

      {/* Config */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">11. RunnableConfig</h2>

        <p className="leading-7 text-[#aaa]">
          RunnableConfig allows us to pass execution settings and metadata to a
          Runnable.
        </p>

        <p className="leading-7 text-[#aaa]">
          Common configuration options include:
        </p>

        <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-[#aaa]">
          <li>
            <span className="text-[#FC6C26]">runName:</span> Gives a name to a
            Runnable execution.
          </li>
          <li>
            <span className="text-[#FC6C26]">tags:</span> Adds tags to identify
            or filter runs.
          </li>
          <li>
            <span className="text-[#FC6C26]">metadata:</span> Attaches
            additional information to a run.
          </li>
          <li>
            <span className="text-[#FC6C26]">maxConcurrency:</span> Controls the
            maximum concurrency for batch execution.
          </li>
          <li>
            <span className="text-[#FC6C26]">callbacks:</span> Provides
            callbacks for observing execution events.
          </li>
        </ul>

        <CodeBlock
          code={`import {
  RunnableLambda
} from "@langchain/core/runnables";

const task = RunnableLambda.from(
  async (input) => {
    return input.toUpperCase();
  }
);

const result = await task.invoke(
  "langchain",
  {
    runName: "TextFormatter",
    tags: ["formatter", "uppercase"],
    metadata: {
      source: "notes-app"
    }
  }
);

console.log(result);

// LANGCHAIN`}
        />

        <p className="text-sm leading-6 text-[#aaa]">
          Configuration is useful for tracing, debugging, monitoring, and
          controlling Runnable execution.
        </p>
      </section>

      {/* Config propagation */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">12. Runnable Methods Comparison</h2>

        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full min-w-[500px] text-left text-sm">
            <thead className="bg-[#1A1A1A] text-[#FC6C26]">
              <tr>
                <th className="p-3">Method</th>
                <th className="p-3">Purpose</th>
                <th className="p-3">Output</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 text-[#aaa]">
              <tr>
                <td className="p-3 font-semibold text-[#E3E3E3]">invoke()</td>
                <td className="p-3">Single execution</td>
                <td className="p-3">One result</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-[#E3E3E3]">batch()</td>
                <td className="p-3">Multiple inputs</td>
                <td className="p-3">Array of results</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-[#E3E3E3]">stream()</td>
                <td className="p-3">Incremental execution</td>
                <td className="p-3">Async iterable chunks</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-[#E3E3E3]">pipe()</td>
                <td className="p-3">Connect Runnables</td>
                <td className="p-3">New Runnable composition</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Important */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">13. Important Points</h2>

        <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-[#aaa]">
          <li>Runnable is the common execution interface in LangChain.</li>
          <li>LCEL is built around Runnable composition.</li>
          <li>invoke() executes one input.</li>
          <li>batch() executes multiple inputs.</li>
          <li>stream() provides incremental output.</li>
          <li>pipe() connects Runnables sequentially.</li>
          <li>RunnableSequence executes components one after another.</li>
          <li>
            RunnableParallel executes independent components concurrently.
          </li>
          <li>RunnablePassthrough forwards input without changing it.</li>
          <li>RunnablePassthrough.assign() adds new fields to an object.</li>
          <li>RunnableLambda converts JavaScript functions into Runnables.</li>
          <li>RunnableConfig provides execution settings and metadata.</li>
        </ul>
      </section>

      {/* Interview */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold">14. Interview Questions & Answers</h2>

        {[
          {
            q: "What is a Runnable in LangChain?",
            a: "A Runnable is a component that follows LangChain's standard execution interface.",
          },
          {
            q: "Why are Runnables important?",
            a: "They allow different LangChain components to be executed and composed using a common interface.",
          },
          {
            q: "What are the main Runnable methods?",
            a: "invoke(), batch(), stream(), and pipe().",
          },
          {
            q: "What is RunnableLambda?",
            a: "It converts a normal JavaScript function into a Runnable.",
          },
          {
            q: "What is RunnableSequence?",
            a: "It executes multiple Runnables sequentially, passing each output to the next.",
          },
          {
            q: "What is RunnableParallel?",
            a: "It executes independent Runnables concurrently and combines their outputs into an object.",
          },
          {
            q: "What is RunnablePassthrough?",
            a: "It passes input data forward without modifying it.",
          },
          {
            q: "What does RunnablePassthrough.assign() do?",
            a: "It preserves existing object fields and adds new fields generated by other Runnables.",
          },
          {
            q: "What is RunnableConfig?",
            a: "It provides execution configuration such as run names, tags, metadata, callbacks, and concurrency settings.",
          },
          {
            q: "What is the difference between invoke() and batch()?",
            a: "invoke() processes one input, while batch() processes multiple inputs.",
          },
          {
            q: "What is the difference between stream() and invoke()?",
            a: "invoke() returns the completed output, while stream() provides output incrementally when supported.",
          },
          {
            q: "How are Runnables related to LCEL?",
            a: "LCEL uses Runnables as building blocks to compose sequential and parallel workflows.",
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

export default Runnables;
