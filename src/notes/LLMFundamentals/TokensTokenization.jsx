import CodeBlock from "../../components/CodeBlock";

const TokensTokenization = () => {
  return (
    <div className="space-y-8 text-[#E3E3E3]">
      {/* HEADER */}
      <div>
        <p className="text-xs font-bold tracking-widest text-[#FC6C26]">
          LLM FUNDAMENTALS / 04
        </p>
        <h1 className="text-3xl font-bold mt-3">Tokens & Tokenization</h1>
        <p className="text-white/50 mt-3 leading-7">
          LLMs don't process text directly. They first convert text into smaller
          units called tokens, which are represented as numbers.
        </p>
      </div>

      {/* 1. WHAT ARE TOKENS */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">1. What are Tokens?</h2>
        <p className="text-white/60 leading-7">
          A token is a small unit of text that an LLM processes. It can be a
          complete word, part of a word, a character or punctuation.
        </p>

        <div className="rounded-xl border border-white/10 bg-[#121212] p-5">
          <p className="text-xs text-white/40 mb-3">EXAMPLE</p>
          <p className="text-sm mb-4">"I love Generative AI!"</p>
          <div className="flex flex-wrap gap-2">
            {["I", " love", " Gener", "ative", " AI", "!"].map((token, i) => (
              <span
                key={i}
                className="rounded-lg border border-[#FC6C26]/20 bg-[#FC6C26]/10 px-3 py-2 text-sm text-[#FC6C26]"
              >
                {token}
              </span>
            ))}
          </div>
          <p className="text-xs text-white/40 mt-3">
            Illustrative split. Actual tokens depend on the tokenizer.
          </p>
        </div>
      </section>

      {/* 2. TOKENIZATION */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">2. What is Tokenization?</h2>
        <p className="text-white/60 leading-7">
          Tokenization is the process of converting input text into smaller
          units called tokens so that an LLM can process them.
        </p>

        <div className="rounded-xl border border-white/10 bg-[#121212] p-5">
          <div className="flex flex-col items-center gap-2 text-center text-sm">
            {[
              "Input Text",
              "Tokenizer",
              "Tokens",
              "Token IDs",
              "LLM Model",
            ].map((item, i, arr) => (
              <div key={item} className="flex flex-col items-center gap-2">
                <div
                  className={`rounded-lg border px-5 py-3 ${
                    i === 0 || i === 4
                      ? "border-[#FC6C26]/30 bg-[#FC6C26]/10 text-[#FC6C26]"
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
      </section>

      {/* 3. TOKEN IDS */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">3. What are Token IDs?</h2>
        <p className="text-white/60 leading-7">
          Every token in a model's vocabulary has a numerical ID. The tokenizer
          converts tokens into these IDs before passing them to the model.
        </p>

        <div className="rounded-xl border border-white/10 bg-[#121212] p-4 space-y-3">
          {[
            ["Hello", "15496"],
            ["world", "1917"],
            ["!", "0"],
          ].map(([token, id]) => (
            <div
              key={token}
              className="flex items-center justify-between rounded-lg bg-white/[0.04] p-3"
            >
              <span className="text-[#FC6C26]">{token}</span>
              <span className="font-mono text-white/60">{id}</span>
            </div>
          ))}
          <p className="text-xs text-white/40">
            Illustrative mapping only. Actual IDs depend on the tokenizer and
            vocabulary.
          </p>
        </div>

        <p className="text-white/60 text-sm leading-6">
          The model processes numerical representations rather than raw text
          characters.
        </p>
      </section>

      {/* 4. TOKENIZER */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">4. What is a Tokenizer?</h2>
        <p className="text-white/60 leading-7">
          A tokenizer is a component that converts text into tokens and token
          IDs. It also converts generated token IDs back into readable text.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="rounded-xl border border-white/10 bg-[#121212] p-4">
            <h3 className="text-[#FC6C26] font-semibold">Encoding</h3>
            <p className="text-sm text-white/50 mt-2">
              Text → Tokens → Token IDs
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-[#121212] p-4">
            <h3 className="text-green-400 font-semibold">Decoding</h3>
            <p className="text-sm text-white/50 mt-2">
              Token IDs → Tokens → Text
            </p>
          </div>
        </div>
      </section>

      {/* 5. TOKENIZATION METHODS */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">5. Common Tokenization Approaches</h2>

        <div className="space-y-3">
          {[
            {
              title: "Word-Level Tokenization",
              desc: "Splits text into complete words. Example: 'I love AI' → ['I', 'love', 'AI'].",
            },
            {
              title: "Character-Level Tokenization",
              desc: "Splits text into individual characters. Example: 'CAT' → ['C', 'A', 'T'].",
            },
            {
              title: "Subword Tokenization",
              desc: "Splits words into smaller meaningful or frequent pieces. It balances vocabulary size and handling of rare words.",
            },
          ].map((item, i) => (
            <div
              key={item.title}
              className="rounded-xl border border-white/10 bg-white/[0.02] p-4"
            >
              <h3 className="font-semibold">
                {i + 1}. {item.title}
              </h3>
              <p className="text-sm text-white/50 mt-2 leading-6">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-[#FC6C26]/20 bg-[#FC6C26]/[0.05] p-4">
          <h3 className="text-[#FC6C26] font-semibold text-sm">Important</h3>
          <p className="text-sm text-white/60 mt-2 leading-6">
            Modern LLMs commonly use subword-based tokenization approaches.
            Examples include BPE (Byte Pair Encoding) and WordPiece.
          </p>
        </div>
      </section>

      {/* 6. TOKEN COUNT */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">6. Tokens vs Words</h2>
        <p className="text-white/60 leading-7">
          Tokens and words are not the same. One word can contain multiple
          tokens, and a token can represent only part of a word.
        </p>

        <div className="rounded-xl border border-white/10 bg-[#121212] p-4 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-white/50">Words</span>
            <span>1 word</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-white/50">Tokens</span>
            <span className="text-[#FC6C26]">May be multiple</span>
          </div>
          <div className="border-t border-white/10 pt-3 text-sm text-white/50 leading-6">
            A rough English estimate is 1 token ≈ 4 characters or ¾ of a word,
            but this varies significantly by language and text.
          </div>
        </div>
      </section>

      {/* 7. TOKEN USAGE */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">7. Why Tokenization Matters</h2>

        {[
          [
            "API Cost",
            "Many LLM APIs calculate usage and pricing based on input and output tokens.",
          ],
          [
            "Context Window",
            "The model has a maximum token capacity for its input and generated output.",
          ],
          [
            "Response Speed",
            "Token count and generation speed affect how long responses take.",
          ],
          [
            "Multilingual Text",
            "Different languages can require different numbers of tokens for similar amounts of text.",
          ],
        ].map(([title, desc]) => (
          <div
            key={title}
            className="rounded-xl border border-white/10 bg-white/[0.02] p-4"
          >
            <h3 className="font-semibold text-[#FC6C26]">{title}</h3>
            <p className="text-sm text-white/50 mt-2 leading-6">{desc}</p>
          </div>
        ))}
      </section>

      {/* 8. CODE EXAMPLE */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">8. Tokenization Example</h2>
        <p className="text-white/60 leading-7">
          We can use the <strong className="text-white">js-tiktoken</strong>
          library to encode text into token IDs and decode them back.
        </p>

        <CodeBlock code={`npm install js-tiktoken`} />

        <CodeBlock
          code={`import { getEncoding } from "js-tiktoken";

const encoding = getEncoding("cl100k_base");

const text = "Hello, how are you?";

// Convert text into token IDs
const tokens = encoding.encode(text);

console.log(tokens);
console.log("Token count:", tokens.length);

// Convert token IDs back into text
const decoded = encoding.decode(tokens);

console.log(decoded);`}
        />

        <div className="rounded-xl border border-white/10 bg-[#121212] p-4">
          <h3 className="text-sm font-semibold text-[#FC6C26]">
            Understanding the Code
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-white/50">
            <li>
              • <code className="text-white">getEncoding()</code> selects a
              tokenizer encoding.
            </li>
            <li>
              • <code className="text-white">encode()</code> converts text into
              token IDs.
            </li>
            <li>
              • <code className="text-white">tokens.length</code> gives the
              token count.
            </li>
            <li>
              • <code className="text-white">decode()</code> converts token IDs
              back into text.
            </li>
          </ul>
          <p className="text-xs text-white/40 mt-3">
            cl100k_base is a specific encoding, not a universal tokenizer for
            every modern model.
          </p>
        </div>
      </section>

      {/* INTERVIEW */}
      <section className="space-y-4 border-t border-white/10 pt-6">
        <h2 className="text-xl font-bold">Interview Questions</h2>

        {[
          {
            q: "What is a token?",
            a: "A token is a unit of text processed by an LLM. It can be a word, part of a word or punctuation.",
          },
          {
            q: "What is tokenization?",
            a: "Tokenization is the process of converting text into tokens and then into numerical token IDs.",
          },
          {
            q: "What is a tokenizer?",
            a: "A tokenizer converts text into token IDs and can decode token IDs back into text.",
          },
          {
            q: "What is subword tokenization?",
            a: "It breaks words into smaller pieces, helping models handle common and rare words efficiently.",
          },
          {
            q: "Why do tokens matter in LLM APIs?",
            a: "Tokens affect API pricing, context window usage and response generation.",
          },
          {
            q: "Are tokens and words the same?",
            a: "No. A word can contain multiple tokens, and one token can represent a complete word or part of a word.",
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

export default TokensTokenization;
