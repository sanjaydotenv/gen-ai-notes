import CodeBlock from "../../components/CodeBlock";

const HowLLMsWork = () => {
  return (
    <div className="space-y-8 text-[#E3E3E3]">
      {/* HEADER */}
      <div>
        <p className="text-xs font-bold tracking-widest text-[#FC6C26]">
          LLM FUNDAMENTALS / 03
        </p>
        <h1 className="text-3xl font-bold mt-3">How LLMs Work</h1>
        <p className="text-white/50 mt-3 leading-7">
          Large Language Models process user input, understand patterns through
          neural networks and generate responses by predicting the next token
          step by step.
        </p>
      </div>

      {/* 1. WORKING FLOW */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">1. Complete Working Flow</h2>

        <p className="text-white/60 leading-7">
          When you send a prompt to an LLM, it passes through multiple
          processing stages before generating a response.
        </p>

        <div className="rounded-xl border border-white/10 bg-[#121212] p-5">
          <div className="flex flex-col items-center gap-2 text-center text-sm">
            {[
              ["User Prompt", "orange"],
              ["Tokenization", "normal"],
              ["Token Embeddings", "normal"],
              ["Transformer Layers", "normal"],
              ["Next Token Prediction", "normal"],
              ["Generated Response", "green"],
            ].map(([label, type], index, arr) => (
              <div key={label} className="flex flex-col items-center gap-2">
                <div
                  className={`rounded-lg px-5 py-3 border ${
                    type === "orange"
                      ? "border-[#FC6C26]/30 bg-[#FC6C26]/10 text-[#FC6C26]"
                      : type === "green"
                        ? "border-green-500/30 bg-green-500/10 text-green-400"
                        : "border-white/10 bg-white/[0.04] text-white/80"
                  }`}
                >
                  {label}
                </div>
                {index !== arr.length - 1 && (
                  <span className="text-white/30">↓</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. TOKENIZATION */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">2. Tokenization</h2>

        <p className="text-white/60 leading-7">
          First, the input text is divided into smaller units called
          <strong className="text-white"> tokens</strong>. A token can be a
          word, part of a word or punctuation.
        </p>

        <div className="rounded-xl border border-white/10 bg-[#121212] p-4">
          <p className="text-xs text-white/40 mb-3">EXAMPLE</p>
          <div className="flex flex-wrap gap-2">
            {["Generative", " AI", " is", " powerful", "."].map((token, i) => (
              <span
                key={i}
                className="px-3 py-2 rounded-lg bg-[#FC6C26]/10 border border-[#FC6C26]/20 text-sm text-[#FC6C26]"
              >
                {token}
              </span>
            ))}
          </div>
          <p className="text-xs text-white/40 mt-3">
            Illustrative token split. Actual tokenization depends on the model.
          </p>
        </div>
      </section>

      {/* 3. EMBEDDINGS */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">3. Token Embeddings</h2>

        <p className="text-white/60 leading-7">
          Computers process numbers, not words directly. Therefore, each token
          is converted into a numerical vector called an embedding.
        </p>

        <div className="rounded-xl border border-white/10 bg-[#121212] p-4 space-y-3">
          <div className="text-sm text-white/50">Token</div>
          <div className="text-[#FC6C26] font-semibold">"AI"</div>

          <div className="text-white/30">↓</div>

          <div className="text-sm text-white/50">Numerical Vector</div>
          <div className="flex flex-wrap gap-2">
            {["0.21", "-0.45", "0.83", "0.17", "..."].map((n, i) => (
              <span
                key={i}
                className="rounded-lg bg-white/[0.06] px-3 py-2 text-sm"
              >
                {n}
              </span>
            ))}
          </div>
        </div>

        <p className="text-sm text-white/50">
          These vectors represent learned numerical information about tokens.
        </p>
      </section>

      {/* 4. TRANSFORMER */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">4. Transformer Architecture</h2>

        <p className="text-white/60 leading-7">
          Most modern LLMs use the Transformer architecture. Its attention
          mechanism helps the model understand relationships between tokens in
          the input context.
        </p>

        <div className="rounded-xl border border-white/10 bg-[#121212] p-5">
          <div className="flex flex-col items-center gap-2 text-center text-sm">
            {[
              "Input Embeddings + Positional Information",
              "Self-Attention",
              "Feed Forward Neural Network",
              "Repeated Transformer Layers",
            ].map((item, index) => (
              <div
                key={item}
                className="w-full flex flex-col items-center gap-2"
              >
                <div className="w-full max-w-sm rounded-lg border border-white/10 bg-white/[0.04] p-3">
                  {item}
                </div>
                {index !== 3 && <span className="text-white/30">↓</span>}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-[#FC6C26]/20 bg-[#FC6C26]/[0.05] p-4">
          <h3 className="text-[#FC6C26] font-semibold text-sm">
            Self-Attention
          </h3>
          <p className="text-sm text-white/60 mt-2 leading-6">
            Self-attention helps a model determine which other tokens are
            important when processing a particular token.
          </p>
          <p className="text-sm text-white/60 mt-2">
            Example: In "The animal didn't cross the road because it was tired",
            attention helps connect "it" with "animal".
          </p>
        </div>
      </section>

      {/* 5. NEXT TOKEN */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">5. Next Token Prediction</h2>

        <p className="text-white/60 leading-7">
          After processing the context, an autoregressive LLM predicts a
          probability distribution over possible next tokens and selects one
          according to its decoding strategy.
        </p>

        <div className="rounded-xl border border-white/10 bg-[#121212] p-4 space-y-3">
          <p className="text-xs text-white/40">EXAMPLE</p>
          <div className="text-sm text-white/70">
            Prompt: "The capital of India is"
          </div>

          {[
            ["New Delhi", "95%"],
            ["Mumbai", "3%"],
            ["Kolkata", "2%"],
          ].map(([word, percent]) => (
            <div key={word}>
              <div className="flex justify-between text-xs mb-1">
                <span>{word}</span>
                <span className="text-white/40">{percent}</span>
              </div>
              <div className="h-2 rounded-full bg-white/[0.06] overflow-hidden">
                <div
                  className="h-full bg-[#FC6C26] rounded-full"
                  style={{ width: percent }}
                />
              </div>
            </div>
          ))}

          <p className="text-xs text-white/30">
            Illustrative probabilities, not actual model output.
          </p>
        </div>
      </section>

      {/* 6. AUTOREGRESSIVE */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">6. Autoregressive Generation</h2>

        <p className="text-white/60 leading-7">
          The predicted token is added to the existing context. The model then
          predicts the next token. This process repeats until a stopping
          condition is reached.
        </p>

        <div className="rounded-xl border border-white/10 bg-[#121212] p-5">
          <div className="flex flex-wrap items-center gap-2 text-sm mb-4">
            {["AI", "is", "changing", "the", "world"].map((word, i) => (
              <span
                key={i}
                className={`px-3 py-2 rounded-lg border ${
                  i === 4
                    ? "bg-green-500/10 border-green-500/30 text-green-400"
                    : "bg-white/[0.05] border-white/10"
                }`}
              >
                {word}
              </span>
            ))}
          </div>

          <div className="text-xs text-white/40 space-y-2">
            <p>1. Input: AI is</p>
            <p>2. Predict: changing</p>
            <p>3. Updated context: AI is changing</p>
            <p>4. Predict: the</p>
            <p>5. Continue until generation stops.</p>
          </div>
        </div>
      </section>

      {/* 7. IMPORTANT */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">7. Important Things to Remember</h2>

        {[
          "Tokenization converts text into tokens.",
          "Embeddings convert tokens into numerical vectors.",
          "Transformers use attention to process context.",
          "LLMs predict the next token using learned patterns.",
          "Autoregressive generation repeats token prediction.",
          "Generation stops when a stopping condition is reached.",
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
            q: "How does an LLM work?",
            a: "It tokenizes input, converts tokens into embeddings, processes context through Transformer layers and generates output through next-token prediction.",
          },
          {
            q: "What is self-attention?",
            a: "Self-attention helps a model understand relationships and importance between tokens in a sequence.",
          },
          {
            q: "What are embeddings?",
            a: "Embeddings are numerical vector representations of tokens that models can process.",
          },
          {
            q: "What is autoregressive generation?",
            a: "It is a process where a model predicts one token at a time and uses generated tokens as context for subsequent predictions.",
          },
          {
            q: "Why do LLMs generate one token at a time?",
            a: "Autoregressive LLMs condition each next-token prediction on the existing context, including previously generated tokens.",
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

export default HowLLMsWork;
