import React from "react";
import CodeBlock from "../../components/CodeBlock";

const StructuredPrompting = () => {
  return (
    <div className="space-y-8 text-[#E3E3E3]">
      {/* Header */}
      <div>
        <p className="text-sm font-semibold tracking-widest text-[#FC6C26]">
          PROMPT ENGINEERING / 04
        </p>
        <h1 className="mt-2 text-3xl font-bold">Structured Prompting</h1>
        <p className="mt-3 text-[#999]">
          Structured prompting means organizing instructions, context, rules,
          and expected output clearly so an LLM can understand exactly what we
          want.
        </p>
      </div>

      {/* Introduction */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">1. What is Structured Prompting?</h2>
        <p className="text-[#aaa] leading-7">
          Structured prompting is a technique where we divide a prompt into
          clear sections instead of writing everything in one paragraph. Each
          section has a specific purpose.
        </p>

        <CodeBlock
          code={`You are an expert JavaScript teacher.

Task:
Explain JavaScript Closures.

Context:
The student is a beginner.

Instructions:
- Use simple English.
- Explain step by step.
- Give one practical example.

Output:
Use headings and code examples.`}
        />

        <p className="text-sm text-[#999]">
          A structured prompt makes instructions easier to understand and
          follow.
        </p>
      </section>

      {/* Components */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">2. Main Components</h2>

        <div className="grid gap-3 sm:grid-cols-2">
          {[
            ["Role", "Defines who the AI should act as."],
            ["Task", "Explains what the AI needs to do."],
            ["Context", "Provides background information."],
            ["Instructions", "Defines rules and requirements."],
            ["Constraints", "Specifies limitations."],
            ["Output Format", "Defines how the answer should look."],
          ].map(([title, desc], index) => (
            <div
              key={index}
              className="rounded-xl border border-white/10 bg-white/[0.03] p-4"
            >
              <h3 className="font-semibold text-[#FC6C26]">{title}</h3>
              <p className="mt-1 text-sm text-[#aaa]">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bad vs Good */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">
          3. Unstructured vs Structured Prompt
        </h2>

        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4 space-y-2">
            <h3 className="font-semibold text-red-400">Unstructured Prompt</h3>
            <CodeBlock code={`Explain React and give examples.`} />
            <p className="text-sm text-[#aaa]">
              Very general. The expected detail and output format are unclear.
            </p>
          </div>

          <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-4 space-y-2">
            <h3 className="font-semibold text-green-400">Structured Prompt</h3>
            <CodeBlock
              code={`Role: React teacher

Task: Explain React Hooks.

Level: Beginner

Instructions:
- Use simple English.
- Explain useState and useEffect.
- Give practical code examples.

Output: Use headings and bullet points.`}
            />
            <p className="text-sm text-[#aaa]">
              Clear instructions help the model produce a more relevant answer.
            </p>
          </div>
        </div>
      </section>

      {/* Flow */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">4. How Structured Prompting Works</h2>

        <div className="rounded-xl border border-white/10 bg-[#1A1A1A] p-4 text-center space-y-2">
          {[
            ["Role", "Who should the AI act as?"],
            ["Task", "What should the AI do?"],
            [
              "Context & Instructions",
              "What information and rules should it follow?",
            ],
            ["Output Format", "How should the response look?"],
          ].map(([title, desc], index) => (
            <React.Fragment key={title}>
              <div className="rounded-lg bg-white/5 p-3">
                <p className="font-semibold text-[#FC6C26]">{title}</p>
                <p className="text-xs text-[#888]">{desc}</p>
              </div>
              {index !== 3 && <div className="text-[#FC6C26]">↓</div>}
            </React.Fragment>
          ))}
          <div className="text-[#FC6C26]">↓</div>
          <div className="rounded-lg border border-green-500/30 bg-green-500/5 p-3">
            <p className="font-semibold text-green-400">LLM Response</p>
          </div>
        </div>
      </section>

      {/* Delimiters */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">5. Using Delimiters</h2>
        <p className="text-[#aaa] leading-7">
          Delimiters are markers used to separate different sections of a
          prompt. They help distinguish instructions from input data.
        </p>

        <CodeBlock
          code={`Summarize the following text.

Text:
"""
Artificial Intelligence helps machines
perform tasks that normally require
human intelligence.
"""

Instructions:
- Use simple English.
- Keep the summary under 30 words.`}
        />

        <p className="text-sm text-[#aaa]">
          Common delimiters include:
          <span className="text-[#FC6C26]"> """ """, ###, XML tags </span>
          and other clear section markers.
        </p>
      </section>

      {/* Practical Example */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">6. Practical Example with LLM API</h2>
        <p className="text-[#aaa]">
          We can create structured prompts directly inside our application and
          send them to an LLM API.
        </p>

        <CodeBlock
          code={`const prompt = \`
Role: You are a programming teacher.

Task: Explain Node.js Streams.

Context:
The student knows basic JavaScript.

Instructions:
- Use simple English.
- Explain step by step.
- Give a practical example.

Output Format:
1. Definition
2. Working
3. Example
4. Summary
\`;

const response = await client.chat.completions.create({
  model: "your-model",
  messages: [
    {
      role: "user",
      content: prompt
    }
  ]
});`}
        />
      </section>

      {/* Important */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">7. Important Points</h2>
        <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-[#aaa]">
          <li>Divide prompts into clear and meaningful sections.</li>
          <li>Define the role and task clearly.</li>
          <li>Provide relevant context and specific instructions.</li>
          <li>Specify the expected output format.</li>
          <li>Use delimiters to separate instructions from input data.</li>
          <li>
            Structured prompts improve clarity but do not guarantee correct
            answers.
          </li>
        </ul>
      </section>

      {/* Interview Questions */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold">8. Interview Questions & Answers</h2>

        {[
          {
            q: "What is structured prompting?",
            a: "Structured prompting is a technique of organizing prompts into clear sections such as role, task, context, instructions, and output format.",
          },
          {
            q: "Why do we use structured prompting?",
            a: "It makes instructions clearer, reduces ambiguity, and helps the model generate more relevant and consistent responses.",
          },
          {
            q: "What are the main components of a structured prompt?",
            a: "The main components are role, task, context, instructions, constraints, and output format.",
          },
          {
            q: "What are delimiters in prompt engineering?",
            a: "Delimiters are markers such as triple quotes, XML tags, or headings used to separate different parts of a prompt.",
          },
          {
            q: "What is the difference between structured and unstructured prompting?",
            a: "Unstructured prompting gives instructions in a general way, while structured prompting organizes instructions into clearly defined sections.",
          },
          {
            q: "Does structured prompting guarantee correct responses?",
            a: "No. It improves clarity and consistency, but the model can still misunderstand instructions or generate incorrect information.",
          },
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

export default StructuredPrompting;
