import CodeBlock from "../../components/CodeBlock";

const WhatisGenerativeAI = () => {
  return (
    <div className="space-y-8 text-[#E3E3E3]">
      <div>
        <p className="text-xs font-bold tracking-widest text-[#FC6C26]">
          LLM FUNDAMENTALS / 01
        </p>
        <h1 className="text-3xl font-bold mt-3">What is Generative AI?</h1>
        <p className="text-white/50 mt-3 leading-7">
          Generative AI is a type of artificial intelligence that creates new
          content such as text, images, audio, video and code by learning
          patterns from existing data.
        </p>
      </div>

      {/* 1. INTRODUCTION */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">1. How Does It Work?</h2>

        <p className="text-white/60 leading-7">
          Generative AI models are trained on large amounts of data. They learn
          patterns, relationships and structures from that data. When a user
          provides a prompt, the model generates new content based on what it
          has learned.
        </p>

        <div className="rounded-xl border border-white/10 bg-[#121212] p-5">
          <div className="flex flex-col items-center gap-3 text-center text-sm">
            <div className="rounded-lg border border-[#FC6C26]/30 bg-[#FC6C26]/10 px-5 py-3 text-[#FC6C26]">
              Training Data
            </div>

            <span className="text-white/30">↓</span>

            <div className="rounded-lg border border-white/10 bg-white/[0.04] px-5 py-3">
              AI Model Training
            </div>

            <span className="text-white/30">↓</span>

            <div className="rounded-lg border border-white/10 bg-white/[0.04] px-5 py-3">
              Learned Patterns
            </div>

            <span className="text-white/30">↓</span>

            <div className="rounded-lg border border-[#FC6C26]/30 bg-[#FC6C26]/10 px-5 py-3 text-[#FC6C26]">
              User Prompt
            </div>

            <span className="text-white/30">↓</span>

            <div className="rounded-lg border border-green-500/30 bg-green-500/10 px-5 py-3 text-green-400">
              Generated Output
            </div>
          </div>
        </div>
      </section>

      {/* 2. TYPES */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">2. What Can Generative AI Create?</h2>

        <div className="grid sm:grid-cols-2 gap-3">
          {[
            ["Text", "Articles, summaries, answers and stories."],
            ["Images", "Realistic images, illustrations and designs."],
            ["Audio", "Speech, music and sound effects."],
            ["Video", "AI-generated videos and animations."],
            ["Code", "Functions, applications and code suggestions."],
            ["3D Content", "3D objects and virtual environments."],
          ].map(([title, description]) => (
            <div
              key={title}
              className="rounded-xl border border-white/10 bg-white/[0.02] p-4"
            >
              <h3 className="font-semibold text-[#FC6C26]">{title}</h3>
              <p className="text-sm text-white/50 mt-2">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. GENERATIVE VS TRADITIONAL */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">
          3. Traditional AI vs Generative AI
        </h2>

        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full text-sm text-left">
            <thead className="bg-white/[0.04] text-white/80">
              <tr>
                <th className="p-3">Traditional AI</th>
                <th className="p-3">Generative AI</th>
              </tr>
            </thead>
            <tbody className="text-white/55">
              <tr className="border-t border-white/10">
                <td className="p-3">Analyzes existing data.</td>
                <td className="p-3">Generates new content.</td>
              </tr>
              <tr className="border-t border-white/10">
                <td className="p-3">Classifies and predicts.</td>
                <td className="p-3">Creates text, images and more.</td>
              </tr>
              <tr className="border-t border-white/10">
                <td className="p-3">Spam detection.</td>
                <td className="p-3">ChatGPT response generation.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. EXAMPLE */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">4. Real-World Example</h2>

        <p className="text-white/60 leading-7">Suppose you ask an AI model:</p>

        <div className="rounded-xl bg-[#FC6C26]/10 border border-[#FC6C26]/20 p-4">
          <p className="text-xs text-[#FC6C26] font-bold mb-2">USER PROMPT</p>
          <p className="text-white/80">
            "Write a JavaScript function to add two numbers."
          </p>
        </div>

        <p className="text-white/60">The model may generate:</p>

        <CodeBlock
          code={`function add(a, b) {
  return a + b;
}

console.log(add(10, 20)); // 30`}
        />

        <p className="text-white/50 text-sm leading-6">
          This output is generated by the model based on patterns learned during
          training. It is not simply retrieving a previously stored answer.
        </p>
      </section>

      {/* 5. IMPORTANT CONCEPT */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">5. Important Things to Remember</h2>

        <div className="space-y-2">
          {[
            "Generative AI learns patterns from training data.",
            "It generates new content based on user prompts.",
            "It can work with multiple data types (text, image, audio, video).",
            "Its output is not always correct or reliable.",
            "LLMs are one important category of Generative AI models.",
          ].map((item, index) => (
            <div key={index} className="flex gap-3 text-sm text-white/60">
              <span className="text-[#FC6C26]">✦</span>
              <p>{item}</p>
            </div>
          ))}
        </div>
      </section>

      {/* INTERVIEW QUESTIONS */}
      <section className="space-y-4 border-t border-white/10 pt-6">
        <h2 className="text-xl font-bold">Interview Questions</h2>

        {[
          {
            q: "What is Generative AI?",
            a: "Generative AI is a type of AI that creates new content such as text, images, audio, video and code.",
          },
          {
            q: "How does Generative AI work?",
            a: "It learns patterns from training data and uses those patterns to generate content based on a prompt.",
          },
          {
            q: "What is the difference between Traditional AI and Generative AI?",
            a: "Traditional AI mainly analyzes, classifies or predicts, whereas Generative AI creates new content.",
          },
          {
            q: "Are LLMs a part of Generative AI?",
            a: "Yes. LLMs are Generative AI models primarily designed to understand and generate human language.",
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

export default WhatisGenerativeAI;
