import React from "react";
import CodeBlock from "../../components/CodeBlock";

const ZeroshotFewshot = () => {
  return (
    <div className="space-y-8 text-[#E3E3E3]">
      <div>
        <p className="text-sm font-semibold tracking-widest text-[#FC6C26]">
          PROMPT ENGINEERING / 02
        </p>
        <h1 className="mt-2 text-3xl font-bold">
          Zero-shot & Few-shot Prompting
        </h1>
        <p className="mt-3 text-[#999]">
          Zero-shot and few-shot prompting are techniques used to guide an
          LLM using instructions and examples.
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="text-xl font-bold">1. What is Zero-shot Prompting?</h2>
        <p className="text-[#aaa] leading-7">
          Zero-shot prompting means asking an LLM to perform a task without
          providing any examples. We simply give the model an instruction.
        </p>

        <CodeBlock code={`Prompt:

Classify the following sentence as Positive or Negative.

Sentence: "I love this product. It works perfectly."

Output:
Positive`} />

        <div className="rounded-xl border border-[#FC6C26]/20 bg-[#FC6C26]/5 p-4">
          <p className="font-semibold text-[#FC6C26]">Key Idea</p>
          <p className="mt-1 text-sm text-[#aaa]">
            Instruction + Input → Output (No examples)
          </p>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold">2. What is Few-shot Prompting?</h2>
        <p className="text-[#aaa] leading-7">
          Few-shot prompting means providing a few input-output examples
          inside the prompt so the model can understand the expected pattern
          before handling a new task.
        </p>

        <CodeBlock code={`Prompt:

Classify each sentence as Positive or Negative.

Sentence: "This movie is amazing."
Output: Positive

Sentence: "The service was terrible."
Output: Negative

Sentence: "I really enjoyed this experience."
Output:`} />

        <p className="text-sm text-[#aaa]">
          Expected Output: <span className="text-green-400">Positive</span>
        </p>

        <div className="rounded-xl border border-[#FC6C26]/20 bg-[#FC6C26]/5 p-4">
          <p className="font-semibold text-[#FC6C26]">Key Idea</p>
          <p className="mt-1 text-sm text-[#aaa]">
            Examples + New Input → Output
          </p>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold">3. Zero-shot vs Few-shot</h2>

        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full min-w-[450px] text-left text-sm">
            <thead className="bg-white/5 text-[#FC6C26]">
              <tr>
                <th className="p-3">Zero-shot</th>
                <th className="p-3">Few-shot</th>
              </tr>
            </thead>
            <tbody className="text-[#aaa]">
              <tr className="border-t border-white/10">
                <td className="p-3">No examples provided</td>
                <td className="p-3">Few examples provided</td>
              </tr>
              <tr className="border-t border-white/10">
                <td className="p-3">Uses instructions only</td>
                <td className="p-3">Uses instructions and examples</td>
              </tr>
              <tr className="border-t border-white/10">
                <td className="p-3">Shorter prompts</td>
                <td className="p-3">Longer prompts</td>
              </tr>
              <tr className="border-t border-white/10">
                <td className="p-3">Good for simple tasks</td>
                <td className="p-3">Useful for specific patterns</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold">4. How Few-shot Prompting Works</h2>

        <div className="rounded-xl border border-white/10 bg-[#1A1A1A] p-4 text-center space-y-2">
          <div className="rounded-lg bg-white/5 p-3">
            <p className="font-semibold">Example 1 + Example 2</p>
            <p className="text-xs text-[#888]">Input-output patterns</p>
          </div>
          <div className="text-[#FC6C26]">↓</div>
          <div className="rounded-lg bg-[#FC6C26]/10 p-3">
            <p className="font-semibold text-[#FC6C26]">
              LLM Understands the Pattern
            </p>
            <p className="text-xs text-[#888]">In-context learning</p>
          </div>
          <div className="text-[#FC6C26]">↓</div>
          <div className="rounded-lg bg-white/5 p-3">
            <p className="font-semibold">New Input</p>
          </div>
          <div className="text-[#FC6C26]">↓</div>
          <div className="rounded-lg border border-green-500/30 bg-green-500/5 p-3">
            <p className="font-semibold text-green-400">Expected Output</p>
          </div>
        </div>

        <p className="text-sm text-[#999]">
          Few-shot examples do not retrain or fine-tune the model. They
          guide its response within the current prompt context.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold">5. When to Use Which?</h2>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
            <h3 className="font-semibold text-[#FC6C26]">Use Zero-shot</h3>
            <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-[#aaa]">
              <li>Simple questions</li>
              <li>Text summarization</li>
              <li>Basic translation</li>
              <li>General instructions</li>
            </ul>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
            <h3 className="font-semibold text-[#FC6C26]">Use Few-shot</h3>
            <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-[#aaa]">
              <li>Specific output formats</li>
              <li>Custom classification</li>
              <li>Consistent writing style</li>
              <li>Complex patterns</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold">6. Few-shot Prompt with LLM API</h2>
        <p className="text-[#aaa]">
          Examples can be included directly in the messages sent to an LLM API.
        </p>

        <CodeBlock code={`const messages = [
  {
    role: "system",
    content: "Classify messages as Positive or Negative."
  },
  {
    role: "user",
    content: \`Message: "Amazing experience!"
Output: Positive

Message: "Very disappointing."
Output: Negative

Message: "I love this service."
Output:\`
  }
];

// Send messages to your LLM API
const response = await client.chat.completions.create({
  model: "your-model",
  messages
});`} />
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold">7. Important Points</h2>
        <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-[#aaa]">
          <li>Zero-shot means no examples.</li>
          <li>Few-shot means providing a few examples.</li>
          <li>Examples should be clear and relevant.</li>
          <li>More examples do not always mean better results.</li>
          <li>Few-shot prompting uses in-context learning, not model training.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold">8. Interview Questions & Answers</h2>

        {[
          {
            q: "What is zero-shot prompting?",
            a: "Zero-shot prompting is a technique where an LLM performs a task using instructions without receiving any examples."
          },
          {
            q: "What is few-shot prompting?",
            a: "Few-shot prompting provides a small number of input-output examples so the LLM can follow the demonstrated pattern."
          },
          {
            q: "What is the difference between zero-shot and few-shot prompting?",
            a: "Zero-shot uses only instructions, whereas few-shot uses instructions along with examples."
          },
          {
            q: "What is in-context learning?",
            a: "In-context learning is the ability of an LLM to use examples or instructions in the current prompt to perform a task without updating its model weights."
          },
          {
            q: "Does few-shot prompting fine-tune an LLM?",
            a: "No. Few-shot prompting does not change model weights. Examples are provided only in the prompt context."
          },
          {
            q: "When would you prefer few-shot prompting over zero-shot?",
            a: "Few-shot is useful when a task requires a specific output format, custom classification rules, or a consistent response pattern."
          }
        ].map((item, index) => (
          <div
            key={index}
            className="rounded-xl border border-white/10 bg-white/[0.03] p-4 space-y-2"
          >
            <p className="font-semibold text-sm">
              <span className="mr-2 text-[#FC6C26]">Q{index + 1}.</span>
              {item.q}
            </p>
            <p className="text-sm leading-6 text-[#aaa]">
              <span className="font-semibold text-green-400"> </span>
              {item.a}
            </p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default ZeroshotFewshot;