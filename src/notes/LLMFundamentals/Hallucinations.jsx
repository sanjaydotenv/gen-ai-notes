import CodeBlock from "../../components/CodeBlock";

const Hallucinations = () => {
  return (
    <div className="space-y-8 text-[#E3E3E3]">
      {/* HEADER */}
      <div>
        <p className="text-xs font-bold tracking-widest text-[#FC6C26]">
          LLM FUNDAMENTALS / 07
        </p>
        <h1 className="text-3xl font-bold mt-3">LLM Hallucinations</h1>
        <p className="text-white/50 mt-3 leading-7">
          Hallucination occurs when an LLM generates information that sounds
          believable but is incorrect, fabricated or unsupported.
        </p>
      </div>

      {/* 1. WHAT IS HALLUCINATION */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">1. What are Hallucinations?</h2>

        <p className="text-white/60 leading-7">
          LLMs generate responses by predicting likely next tokens. They do not
          automatically verify whether every generated statement is factually
          correct.
        </p>

        <div className="rounded-xl border border-white/10 bg-[#121212] p-4 space-y-3">
          <div className="text-xs text-white/40">EXAMPLE</div>

          <div className="rounded-lg bg-white/[0.04] p-3">
            <p className="text-xs text-white/40 mb-2">USER</p>
            <p className="text-sm">
              Who invented the fictional programming language ZetaScript in
              1820?
            </p>
          </div>

          <div className="rounded-lg border border-red-500/20 bg-red-500/[0.05] p-3">
            <p className="text-xs text-red-400 mb-2">HALLUCINATED RESPONSE</p>
            <p className="text-sm text-white/70">
              ZetaScript was invented by John Smith in 1820.
            </p>
          </div>

          <p className="text-xs text-white/40">
            The language and historical claim are fictional. The model has
            fabricated an answer instead of identifying the false premise.
          </p>
        </div>
      </section>

      {/* 2. WHY IT HAPPENS */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">2. Why Do LLMs Hallucinate?</h2>

        {[
          {
            title: "Next-Token Prediction",
            desc: "LLMs predict likely next tokens, not guaranteed factual answers.",
          },
          {
            title: "Missing Information",
            desc: "The model may not have enough information to answer a question correctly.",
          },
          {
            title: "Outdated Knowledge",
            desc: "The model may generate outdated information about recent events.",
          },
          {
            title: "Ambiguous Prompts",
            desc: "Unclear questions can lead to incorrect assumptions and fabricated details.",
          },
          {
            title: "Training Data Issues",
            desc: "Incorrect, inconsistent or incomplete training data can affect response quality.",
          },
        ].map((item, i) => (
          <div
            key={item.title}
            className="rounded-xl border border-white/10 bg-white/[0.02] p-4"
          >
            <h3 className="font-semibold">
              {i + 1}. {item.title}
            </h3>
            <p className="text-sm text-white/50 mt-2 leading-6">{item.desc}</p>
          </div>
        ))}
      </section>

      {/* 3. TYPES */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">3. Types of Hallucinations</h2>

        <div className="rounded-xl border border-white/10 bg-[#121212] p-4 space-y-4">
          <div>
            <h3 className="text-[#FC6C26] font-semibold">
              Factual Hallucination
            </h3>
            <p className="text-sm text-white/50 mt-1">
              Generating incorrect facts, dates, names or statistics.
            </p>
          </div>

          <div className="border-t border-white/10 pt-4">
            <h3 className="text-[#FC6C26] font-semibold">
              Fabricated References
            </h3>
            <p className="text-sm text-white/50 mt-1">
              Creating fake research papers, URLs, citations or sources.
            </p>
          </div>

          <div className="border-t border-white/10 pt-4">
            <h3 className="text-[#FC6C26] font-semibold">
              Contextual Hallucination
            </h3>
            <p className="text-sm text-white/50 mt-1">
              Providing information that contradicts the supplied context or
              user-provided documents.
            </p>
          </div>
        </div>
      </section>

      {/* 4. REDUCE HALLUCINATIONS */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">4. How to Reduce Hallucinations?</h2>

        {[
          {
            title: "Better Prompting",
            desc: "Give clear instructions and tell the model not to invent information.",
          },
          {
            title: "RAG (Retrieval-Augmented Generation)",
            desc: "Retrieve relevant information from trusted documents and provide it as context.",
          },
          {
            title: "Grounding",
            desc: "Base responses on reliable external information instead of relying only on model knowledge.",
          },
          {
            title: "Output Validation",
            desc: "Validate generated JSON, data, calculations and important claims using appropriate checks.",
          },
          {
            title: "Human Verification",
            desc: "Verify critical information through trusted sources or domain experts.",
          },
        ].map((item, i) => (
          <div
            key={item.title}
            className="rounded-xl border border-white/10 bg-white/[0.02] p-4"
          >
            <h3 className="font-semibold">
              {i + 1}. {item.title}
            </h3>
            <p className="text-sm text-white/50 mt-2 leading-6">{item.desc}</p>
          </div>
        ))}
      </section>

      {/* 5. RAG FLOW */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">
          5. How RAG Helps Prevent Hallucinations
        </h2>

        <p className="text-white/60 leading-7">
          RAG retrieves relevant information from an external knowledge source
          and provides it to the LLM before generating an answer.
        </p>

        <div className="rounded-xl border border-white/10 bg-[#121212] p-5">
          <div className="flex flex-col items-center gap-2 text-center text-sm">
            {[
              "User Question",
              "Retrieve Relevant Documents",
              "Add Retrieved Context to Prompt",
              "LLM Generates Grounded Answer",
              "Final Response",
            ].map((item, i, arr) => (
              <div key={item} className="flex flex-col items-center gap-2">
                <div
                  className={`w-full max-w-sm rounded-lg border p-3 ${
                    i === 3 || i === 4
                      ? "border-green-500/20 bg-green-500/[0.05] text-green-400"
                      : "border-white/10 bg-white/[0.04] text-white/80"
                  }`}
                >
                  {item}
                </div>
                {i !== arr.length - 1 && (
                  <span className="text-white/30">↓</span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-[#FC6C26]/20 bg-[#FC6C26]/[0.05] p-4">
          <h3 className="text-[#FC6C26] font-semibold text-sm">Important</h3>
          <p className="text-sm text-white/60 mt-2 leading-6">
            RAG reduces hallucination risk but does not eliminate it. Retrieved
            documents can also be incomplete, outdated or incorrect.
          </p>
        </div>
      </section>

      {/* 6. PRACTICAL PROMPT */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">6. Practical Prompt Example</h2>

        <p className="text-white/60 leading-7">
          We can instruct an LLM to avoid making unsupported claims.
        </p>

        <CodeBlock
          code={`const messages = [
  {
    role: "system",
    content: \`
      Answer using only the provided context.

      If the answer is not available in the context,
      clearly say "I don't know".

      Never invent facts, sources or references.
    \`
  },
  {
    role: "user",
    content: \`
      Context: Node.js uses the V8 JavaScript engine.

      Question: Which engine does Node.js use?
    \`
  }
];`}
        />

        <p className="text-sm text-white/50 leading-6">
          This instruction encourages grounded responses, but prompts alone
          cannot guarantee that hallucinations will never occur.
        </p>
      </section>

      {/* 7. IMPORTANT */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">7. Important Things to Remember</h2>

        {[
          "Hallucinations are incorrect or unsupported AI-generated information.",
          "LLMs predict tokens; they do not automatically verify facts.",
          "Missing context and unreliable data can increase hallucination risk.",
          "RAG provides external knowledge to ground responses.",
          "Prompting and validation help reduce hallucinations.",
          "Always verify critical AI-generated information.",
        ].map((item, i) => (
          <div key={i} className="flex gap-3 text-sm text-white/60">
            <span className="text-[#FC6C26]">✦</span>
            <p>{item}</p>
          </div>
        ))}
      </section>

      {/* INTERVIEW QUESTIONS */}
      <section className="space-y-4 border-t border-white/10 pt-6">
        <h2 className="text-xl font-bold">Interview Questions</h2>

        {[
          {
            q: "What is an LLM hallucination?",
            a: "It occurs when an LLM generates information that is incorrect, fabricated or unsupported but sounds believable.",
          },
          {
            q: "Why do LLMs hallucinate?",
            a: "Possible causes include next-token prediction, missing context, ambiguous prompts and unreliable training data.",
          },
          {
            q: "How can we reduce hallucinations?",
            a: "Use clear prompts, RAG, trusted sources, output validation and human verification.",
          },
          {
            q: "What is grounding in GenAI?",
            a: "Grounding means basing AI responses on reliable information, such as retrieved documents or verified external sources.",
          },
          {
            q: "Does RAG completely eliminate hallucinations?",
            a: "No. RAG can reduce hallucinations, but incorrect retrieval or model interpretation can still produce wrong answers.",
          },
          {
            q: "Can low temperature eliminate hallucinations?",
            a: "No. Low temperature can make output more predictable, but it does not guarantee factual correctness.",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="rounded-xl border border-white/10 bg-white/[0.02] p-4"
          >
            <h3 className="font-semibold text-sm">
              {i + 1}. {item.q}
            </h3>
            <p className="text-sm text-white/50 mt-2 leading-6">{item.a}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Hallucinations;
