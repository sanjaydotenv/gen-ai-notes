import CodeBlock from "../../components/CodeBlock";

const Temperature = () => {
  return (
    <div className="space-y-8 text-[#E3E3E3]">
      {/* HEADER */}
      <div>
        <p className="text-xs font-bold tracking-widest text-[#FC6C26]">
          LLM FUNDAMENTALS / 06
        </p>
        <h1 className="text-3xl font-bold mt-3">Temperature in LLMs</h1>
        <p className="text-white/50 mt-3 leading-7">
          Temperature is a generation parameter that controls the randomness of
          token selection, affecting how predictable or varied an LLM's
          responses can be.
        </p>
      </div>

      {/* 1. WHAT IS TEMPERATURE */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">1. What is Temperature?</h2>

        <p className="text-white/60 leading-7">
          An LLM predicts probabilities for possible next tokens. Temperature
          adjusts the probability distribution before the model selects its next
          token.
        </p>

        <div className="rounded-xl border border-white/10 bg-[#121212] p-5">
          <div className="flex flex-col items-center gap-2 text-center text-sm">
            {[
              "Input Prompt",
              "Model Predicts Token Probabilities",
              "Temperature Adjusts Probabilities",
              "Next Token Selection",
              "Generated Response",
            ].map((item, i, arr) => (
              <div key={item} className="flex flex-col items-center gap-2">
                <div
                  className={`w-full max-w-sm rounded-lg border p-3 ${
                    i === 2
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

      {/* 2. LOW TEMPERATURE */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">2. Low Temperature</h2>

        <p className="text-white/60 leading-7">
          Low temperature makes the probability distribution more concentrated
          around higher-probability tokens. Responses generally become more
          predictable and consistent.
        </p>

        <div className="rounded-xl border border-white/10 bg-[#121212] p-4">
          <div className="flex justify-between text-sm mb-3">
            <span className="text-white/50">Temperature</span>
            <span className="text-green-400 font-bold">0.1</span>
          </div>
          <div className="h-2 rounded-full bg-white/10 overflow-hidden">
            <div className="h-full w-[10%] rounded-full bg-green-500" />
          </div>

          <div className="mt-4 space-y-2">
            {[
              ["Correct answer", "90%"],
              ["Alternative A", "7%"],
              ["Alternative B", "3%"],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between text-sm">
                <span className="text-white/60">{label}</span>
                <span>{value}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-white/30 mt-3">
            Illustrative probabilities, not actual model output.
          </p>
        </div>

        <p className="text-sm text-white/50">
          Useful for factual answers, structured output and predictable tasks.
        </p>
      </section>

      {/* 3. HIGH TEMPERATURE */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">3. High Temperature</h2>

        <p className="text-white/60 leading-7">
          High temperature makes the probability distribution flatter, giving
          lower-probability tokens a greater chance of being selected. Responses
          can become more varied and less predictable.
        </p>

        <div className="rounded-xl border border-white/10 bg-[#121212] p-4">
          <div className="flex justify-between text-sm mb-3">
            <span className="text-white/50">Temperature</span>
            <span className="text-orange-400 font-bold">1.5</span>
          </div>
          <div className="h-2 rounded-full bg-white/10 overflow-hidden">
            <div className="h-full w-[75%] rounded-full bg-orange-500" />
          </div>

          <div className="mt-4 space-y-2">
            {[
              ["Option A", "40%"],
              ["Option B", "35%"],
              ["Option C", "25%"],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between text-sm">
                <span className="text-white/60">{label}</span>
                <span>{value}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-white/30 mt-3">
            Illustrative probabilities, not actual model output.
          </p>
        </div>

        <p className="text-sm text-white/50">
          Useful for creative writing, brainstorming and generating varied
          ideas.
        </p>
      </section>

      {/* 4. COMPARISON */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">4. Low vs High Temperature</h2>

        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full text-sm text-left">
            <thead className="bg-white/[0.04] text-white/70">
              <tr>
                <th className="p-3">Feature</th>
                <th className="p-3">Low</th>
                <th className="p-3">High</th>
              </tr>
            </thead>
            <tbody className="text-white/50">
              {[
                ["Randomness", "Lower", "Higher"],
                ["Predictability", "Higher", "Lower"],
                ["Consistency", "Generally higher", "Generally lower"],
                ["Use Case", "Factual tasks", "Creative tasks"],
              ].map(([a, b, c]) => (
                <tr key={a} className="border-t border-white/10">
                  <td className="p-3 text-white/80">{a}</td>
                  <td className="p-3">{b}</td>
                  <td className="p-3">{c}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 5. HOW IT WORKS */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">
          5. How Temperature Works Internally
        </h2>

        <p className="text-white/60 leading-7">
          Temperature modifies token scores (logits) before softmax converts
          them into probabilities.
        </p>

        <div className="rounded-xl border border-white/10 bg-[#121212] p-4 space-y-3">
          <div className="text-sm text-white/50">Formula</div>
          <div className="rounded-lg bg-white/[0.04] p-4 text-center font-mono text-lg text-[#FC6C26]">
            P(token) = softmax(logits / T)
          </div>
          <div className="text-sm text-white/50 leading-6">
            <p>
              <strong className="text-white">Logits:</strong> Raw scores
              produced by the model.
            </p>
            <p className="mt-2">
              <strong className="text-white">T:</strong> Temperature value.
            </p>
            <p className="mt-2">
              <strong className="text-white">Softmax:</strong> Converts scores
              into probabilities.
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="rounded-xl border border-green-500/20 bg-green-500/[0.05] p-4">
            <h3 className="text-green-400 font-semibold">T &lt; 1</h3>
            <p className="text-sm text-white/50 mt-1">
              Sharpens the probability distribution.
            </p>
          </div>
          <div className="rounded-xl border border-[#FC6C26]/20 bg-[#FC6C26]/[0.05] p-4">
            <h3 className="text-[#FC6C26] font-semibold">T &gt; 1</h3>
            <p className="text-sm text-white/50 mt-1">
              Flattens the probability distribution.
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
            <h3 className="font-semibold">T = 1</h3>
            <p className="text-sm text-white/50 mt-1">
              Keeps the original softmax distribution unchanged.
            </p>
          </div>
        </div>
      </section>

      {/* 6. API EXAMPLE */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">6. Temperature in API</h2>

        <p className="text-white/60 leading-7">
          We can control temperature while sending requests to an LLM API. The
          following is an illustrative OpenAI-compatible chat completion
          example.
        </p>

        <CodeBlock
          code={`const response = await client.chat.completions.create({
  model: "your-model",

  messages: [
    {
      role: "user",
      content: "Write a creative story about AI."
    }
  ],

  temperature: 0.7,
});

console.log(response.choices[0].message.content);`}
        />

        <p className="text-sm text-white/50 leading-6">
          A temperature of 0.7 allows some variation while generally keeping
          responses reasonably focused. Supported ranges and parameter behavior
          depend on the model and provider.
        </p>
      </section>

      {/* 7. IMPORTANT */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">7. Important Things to Remember</h2>

        {[
          "Temperature controls randomness during token selection.",
          "Low temperature generally produces more predictable responses.",
          "High temperature generally produces more varied responses.",
          "Temperature modifies logits before softmax.",
          "Temperature does not directly control model intelligence.",
          "Temperature alone cannot guarantee factual accuracy.",
        ].map((item, i) => (
          <div key={i} className="flex gap-3 text-sm text-white/60">
            <span className="text-[#FC6C26]">✦</span>
            <p>{item}</p>
          </div>
        ))}
      </section>

      {/* INTERVIEW */}
      <section className="space-y-4 border-t border-white/10 pt-6">
        <h2 className="text-xl font-bold">Interview Questions</h2>

        {[
          {
            q: "What is temperature in LLMs?",
            a: "Temperature is a generation parameter that controls the randomness of next-token selection.",
          },
          {
            q: "What happens when temperature is low?",
            a: "The probability distribution becomes sharper, making high-probability tokens more likely.",
          },
          {
            q: "What happens when temperature is high?",
            a: "The probability distribution becomes flatter, allowing less likely tokens to be selected more often.",
          },
          {
            q: "What is the role of softmax in temperature?",
            a: "Softmax converts temperature-adjusted logits into a probability distribution.",
          },
          {
            q: "Does temperature affect model training?",
            a: "In normal API usage, temperature affects inference-time generation, not the model's trained parameters.",
          },
          {
            q: "Which temperature is suitable for creative writing?",
            a: "A relatively higher temperature can help produce varied and creative responses, depending on the model.",
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

export default Temperature;
