import CodeBlock from "../../components/CodeBlock";

const ContextWindow = () => {
  return (
    <div className="space-y-8 text-[#E3E3E3]">
      {/* HEADER */}
      <div>
        <p className="text-xs font-bold tracking-widest text-[#FC6C26]">
          LLM FUNDAMENTALS / 05
        </p>
        <h1 className="text-3xl font-bold mt-3">Context Window</h1>
        <p className="text-white/50 mt-3 leading-7">
          A context window defines how much information an LLM can process at
          one time, including conversation history, input and generated output.
        </p>
      </div>

      {/* 1. WHAT IS CONTEXT WINDOW */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">1. What is a Context Window?</h2>

        <p className="text-white/60 leading-7">
          A context window is the maximum amount of tokens a model can consider
          during a single interaction. It includes the input provided to the
          model and the tokens generated in its response.
        </p>

        <div className="rounded-xl border border-white/10 bg-[#121212] p-5">
          <p className="text-xs text-white/40 mb-4">
            ILLUSTRATIVE CONTEXT WINDOW
          </p>

          <div className="h-4 flex overflow-hidden rounded-full bg-white/10">
            <div className="w-[55%] bg-[#FC6C26]" />
            <div className="w-[25%] bg-blue-500" />
            <div className="w-[20%] bg-green-500" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 text-xs">
            <div>
              <span className="inline-block w-2 h-2 rounded-full bg-[#FC6C26] mr-2" />
              Input Tokens
            </div>
            <div>
              <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mr-2" />
              Output Tokens
            </div>
            <div>
              <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2" />
              Available Space
            </div>
          </div>
        </div>
      </section>

      {/* 2. HOW IT WORKS */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">2. How Does It Work?</h2>

        <p className="text-white/60 leading-7">
          Every time an application sends a request, the model receives the
          relevant context. This can include system instructions, conversation
          history and the latest user message.
        </p>

        <div className="rounded-xl border border-white/10 bg-[#121212] p-5">
          <div className="flex flex-col items-center gap-2 text-center text-sm">
            {[
              "System Instructions",
              "Conversation History",
              "Current User Prompt",
              "Combined Context",
              "LLM Generates Response",
            ].map((item, i, arr) => (
              <div key={item} className="flex flex-col items-center gap-2">
                <div
                  className={`w-full max-w-xs rounded-lg border p-3 ${
                    i === 4
                      ? "border-green-500/30 bg-green-500/10 text-green-400"
                      : i === 3
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

      {/* 3. TOKEN LIMIT */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">3. Context Window Limit</h2>

        <p className="text-white/60 leading-7">
          Every model has a context capacity. For example, imagine a model with
          a context window of 100,000 tokens.
        </p>

        <div className="rounded-xl border border-white/10 bg-[#121212] p-4 space-y-4">
          <div className="flex justify-between text-sm">
            <span className="text-white/50">Total Context Capacity</span>
            <span className="font-bold text-[#FC6C26]">100,000 tokens</span>
          </div>

          <div className="space-y-3">
            {[
              ["System + History + User Input", "60,000", "60%"],
              ["Generated Output", "10,000", "10%"],
              ["Remaining Capacity", "30,000", "30%"],
            ].map(([label, count, width]) => (
              <div key={label}>
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-white/60">{label}</span>
                  <span>{count}</span>
                </div>
                <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[#FC6C26]"
                    style={{ width }}
                  />
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-white/40">
            Example only. Actual limits and output reservations depend on the
            model and API.
          </p>
        </div>

        <p className="text-sm text-white/50 leading-6">
          If the request exceeds the model's supported context limit, the API
          may return an error. Applications often need to shorten or restructure
          the context.
        </p>
      </section>

      {/* 4. CONVERSATION MEMORY */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">4. Context Window vs Memory</h2>

        <p className="text-white/60 leading-7">
          Context window and memory are not the same thing. The context window
          holds information available to the model in the current request.
          Memory is a mechanism used by applications to preserve or retrieve
          useful information across interactions.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="rounded-xl border border-white/10 bg-[#121212] p-4">
            <h3 className="text-[#FC6C26] font-semibold">Context Window</h3>
            <p className="text-sm text-white/50 mt-2 leading-6">
              Information currently included in the model's context.
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-[#121212] p-4">
            <h3 className="text-green-400 font-semibold">Memory</h3>
            <p className="text-sm text-white/50 mt-2 leading-6">
              Information stored or retrieved by an application for future use.
            </p>
          </div>
        </div>
      </section>

      {/* 5. CONTEXT MANAGEMENT */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">
          5. What Happens When Context Gets Full?
        </h2>

        <p className="text-white/60 leading-7">
          In long conversations, the accumulated history can consume most of the
          available context. Applications use context management techniques to
          handle this problem.
        </p>

        {[
          {
            title: "Truncation",
            desc: "Remove older or less important messages to reduce context size.",
          },
          {
            title: "Summarization",
            desc: "Convert a long conversation into a shorter summary and keep important details.",
          },
          {
            title: "Retrieval",
            desc: "Retrieve only relevant information from stored documents or conversation history.",
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

      {/* 6. PRACTICAL EXAMPLE */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">6. Practical Example</h2>

        <p className="text-white/60 leading-7">
          When building an AI chatbot, we often send previous messages along
          with the latest prompt to maintain conversation context.
        </p>

        <CodeBlock
          code={`const messages = [
  {
    role: "system",
    content: "You are a helpful assistant."
  },
  {
    role: "user",
    content: "My name is Mayur."
  },
  {
    role: "assistant",
    content: "Nice to meet you, Mayur!"
  },
  {
    role: "user",
    content: "What is my name?"
  }
];

// Send conversation context to an LLM API
const response = await client.chat.completions.create({
  model: "your-model",
  messages,
});

console.log(response.choices[0].message.content);`}
        />

        <div className="rounded-xl border border-[#FC6C26]/20 bg-[#FC6C26]/[0.05] p-4">
          <h3 className="text-[#FC6C26] font-semibold text-sm">Important</h3>
          <p className="text-sm text-white/60 mt-2 leading-6">
            The model can answer "What is my name?" because the previous message
            containing the name is included in the current request. The API does
            not automatically remember every previous request.
          </p>
        </div>
      </section>

      {/* 7. BEST PRACTICES */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">7. Context Window Best Practices</h2>

        {[
          "Avoid sending unnecessary conversation history.",
          "Summarize long conversations when appropriate.",
          "Retrieve only relevant documents in RAG applications.",
          "Monitor input and output token usage.",
          "Keep enough capacity for the model's response.",
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
            q: "What is a context window?",
            a: "It is the maximum number of tokens a model can consider in a single request, including input and generated output.",
          },
          {
            q: "What happens when the context window is full?",
            a: "The request may exceed the model's context limit. Applications can truncate, summarize or retrieve relevant information to manage context.",
          },
          {
            q: "What is the difference between context window and memory?",
            a: "Context window is information available in the current request, while memory is information stored or retrieved across interactions.",
          },
          {
            q: "Does a larger context window always mean a better model?",
            a: "No. A larger context window allows more information to be processed, but output quality also depends on model capabilities and how well it uses the context.",
          },
          {
            q: "How can we manage long conversations?",
            a: "We can use truncation, summarization and retrieval to keep relevant information within the context limit.",
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

export default ContextWindow;
