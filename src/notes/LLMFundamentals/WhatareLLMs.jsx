import CodeBlock from "../../components/CodeBlock";

const WhatareLLMs = () => {
  return (
    <div className="space-y-8 text-[#E3E3E3]">
      {/* HEADER */}
      <div>
        <p className="text-xs font-bold tracking-widest text-[#FC6C26]">
          LLM FUNDAMENTALS / 02
        </p>
        <h1 className="text-3xl font-bold mt-3">What are LLMs?</h1>
        <p className="text-white/50 mt-3 leading-7">
          Large Language Models (LLMs) are AI models trained on massive amounts
          of text data to understand and generate human language. They can
          answer questions, write content, summarize text and generate code.
        </p>
      </div>

      {/* 1. WHAT IS LLM */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">1. What is an LLM?</h2>

        <p className="text-white/60 leading-7">
          LLM stands for{" "}
          <strong className="text-white">Large Language Model</strong>. It
          learns language patterns, relationships between words and contextual
          information during training.
        </p>

        <div className="rounded-xl border border-white/10 bg-[#121212] p-5">
          <div className="flex flex-col items-center gap-3 text-center text-sm">
            <div className="rounded-lg bg-[#FC6C26]/10 border border-[#FC6C26]/30 px-5 py-3 text-[#FC6C26]">
              Massive Text Data
            </div>
            <span className="text-white/30">↓</span>
            <div className="rounded-lg bg-white/[0.04] border border-white/10 px-5 py-3">
              Model Training
            </div>
            <span className="text-white/30">↓</span>
            <div className="rounded-lg bg-white/[0.04] border border-white/10 px-5 py-3">
              Learned Language Patterns
            </div>
            <span className="text-white/30">↓</span>
            <div className="rounded-lg bg-green-500/10 border border-green-500/30 px-5 py-3 text-green-400">
              Trained LLM
            </div>
          </div>
        </div>
      </section>

      {/* 2. WHY LARGE */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">2. Why Are They Called Large?</h2>

        <p className="text-white/60 leading-7">
          They are called large because they typically use:
        </p>

        <div className="grid sm:grid-cols-2 gap-3">
          {[
            [
              "Large Datasets",
              "Huge collections of text and other training data.",
            ],
            [
              "Billions of Parameters",
              "Learnable values adjusted during training.",
            ],
            [
              "High Computing Power",
              "GPUs and specialized hardware for training.",
            ],
            [
              "Complex Architecture",
              "Usually based on Transformer architecture.",
            ],
          ].map(([title, desc]) => (
            <div
              key={title}
              className="rounded-xl border border-white/10 bg-white/[0.02] p-4"
            >
              <h3 className="text-[#FC6C26] font-semibold">{title}</h3>
              <p className="text-sm text-white/50 mt-2">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. PARAMETERS */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">3. What Are Parameters?</h2>

        <p className="text-white/60 leading-7">
          Parameters are numerical values inside a model that are learned during
          training. They help the model identify patterns and relationships in
          data.
        </p>

        <div className="rounded-xl border border-[#FC6C26]/20 bg-[#FC6C26]/[0.05] p-4">
          <p className="text-sm text-white/70">
            <strong className="text-[#FC6C26]">Remember:</strong> Parameters are
            adjusted during training to reduce the model's prediction error.
            More parameters do not automatically mean a better model.
          </p>
        </div>
      </section>

      {/* 4. HOW LLM GENERATES TEXT */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">4. How Does an LLM Generate Text?</h2>

        <p className="text-white/60 leading-7">
          Most modern LLMs generate text by predicting the next token based on
          the previous context.
        </p>

        <div className="rounded-xl border border-white/10 bg-[#121212] p-5 space-y-4">
          <div className="text-sm text-white/50">Example prediction:</div>

          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className="rounded-lg bg-white/[0.06] px-3 py-2">The</span>
            <span className="rounded-lg bg-white/[0.06] px-3 py-2">sun</span>
            <span className="rounded-lg bg-white/[0.06] px-3 py-2">rises</span>
            <span className="text-white/30">→</span>
            <span className="rounded-lg bg-[#FC6C26]/10 border border-[#FC6C26]/30 px-3 py-2 text-[#FC6C26]">
              in
            </span>
          </div>

          <p className="text-xs text-white/40">
            The model predicts a likely next token. It then uses the updated
            context to predict another token.
          </p>
        </div>
      </section>

      {/* 5. EXAMPLES */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">5. Popular LLMs</h2>

        <div className="grid sm:grid-cols-2 gap-3">
          {[
            ["GPT", "OpenAI"],
            ["Gemini", "Google"],
            ["Claude", "Anthropic"],
            ["Llama", "Meta"],
            ["DeepSeek", "DeepSeek"],
            ["Qwen", "Alibaba"],
          ].map(([model, company]) => (
            <div
              key={model}
              className="rounded-xl border border-white/10 bg-white/[0.02] p-4 flex justify-between items-center"
            >
              <span className="font-semibold">{model}</span>
              <span className="text-xs text-white/40">{company}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 6. IMPORTANT POINTS */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">6. Important Things to Remember</h2>

        {[
          "LLM stands for Large Language Model.",
          "LLMs learn patterns from large training datasets.",
          "Parameters are the learnable values inside a model.",
          "Most modern LLMs use Transformer-based architectures.",
          "Many LLMs generate text through next-token prediction.",
          "LLMs can produce incorrect or fabricated information.",
        ].map((item, index) => (
          <div key={index} className="flex gap-3 text-sm text-white/60">
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
            q: "What is an LLM?",
            a: "An LLM is an AI model trained on large amounts of data to understand and generate human language.",
          },
          {
            q: "Why are LLMs called Large Language Models?",
            a: "Because they are generally trained on large datasets and use large numbers of learnable parameters.",
          },
          {
            q: "What are parameters in an LLM?",
            a: "Parameters are numerical values learned during training that help the model identify patterns in data.",
          },
          {
            q: "How do LLMs generate text?",
            a: "Many LLMs predict the next token based on previously provided context, repeating this process to generate text.",
          },
          {
            q: "Name some popular LLMs.",
            a: "GPT, Gemini, Claude, Llama, DeepSeek and Qwen.",
          },
        ].map((item, index) => (
          <div
            key={index}
            className="rounded-xl border border-white/10 bg-white/[0.02] p-4"
          >
            <h3 className="font-semibold text-sm">
              {index + 1}. {item.q}
            </h3>
            <p className="text-sm text-white/50 mt-2 leading-6">{item.a}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default WhatareLLMs;
