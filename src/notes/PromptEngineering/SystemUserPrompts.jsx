import CodeBlock from "../../components/CodeBlock";

const SystemUserPrompts = () => {
  return (
    <div className="space-y-8 text-[#E3E3E3]">
      {/* HEADER */}
      <div>
        <p className="text-xs font-bold tracking-widest text-[#FC6C26]">
          PROMPT ENGINEERING / 01
        </p>
        <h1 className="text-3xl font-bold mt-3">System & User Prompts</h1>
        <p className="text-white/50 mt-3 leading-7">
          System and User Prompts are instructions provided to an LLM. They help
          define how the model should behave and what task it should perform.
        </p>
      </div>

      {/* 1. WHAT IS A PROMPT */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">1. What is a Prompt?</h2>

        <p className="text-white/60 leading-7">
          A prompt is the input or instruction given to an LLM to generate a
          response. It can contain questions, instructions, context or data.
        </p>

        <div className="rounded-xl border border-white/10 bg-[#121212] p-4">
          <p className="text-xs text-white/40 mb-2">EXAMPLE PROMPT</p>
          <p className="text-sm text-white/80">
            Explain JavaScript closures with a simple example.
          </p>
        </div>
      </section>

      {/* 2. SYSTEM PROMPT */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">2. What is a System Prompt?</h2>

        <p className="text-white/60 leading-7">
          A System Prompt provides high-level instructions that define the
          assistant's role, behavior, rules and response style.
        </p>

        <div className="rounded-xl border border-[#FC6C26]/20 bg-[#FC6C26]/[0.05] p-4">
          <p className="text-xs text-[#FC6C26] font-bold mb-2">SYSTEM PROMPT</p>
          <p className="text-sm text-white/70 leading-6">
            You are an expert JavaScript teacher. Explain every concept in
            simple English with practical code examples.
          </p>
        </div>

        <p className="text-sm text-white/50">
          System prompts are commonly used to control an AI application's
          overall behavior.
        </p>
      </section>

      {/* 3. USER PROMPT */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">3. What is a User Prompt?</h2>

        <p className="text-white/60 leading-7">
          A User Prompt contains the actual question, request or task submitted
          by the user.
        </p>

        <div className="rounded-xl border border-blue-500/20 bg-blue-500/[0.05] p-4">
          <p className="text-xs text-blue-400 font-bold mb-2">USER PROMPT</p>
          <p className="text-sm text-white/70 leading-6">
            Explain JavaScript closures with an example.
          </p>
        </div>
      </section>

      {/* 4. DIFFERENCE */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">4. System Prompt vs User Prompt</h2>

        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full text-sm text-left">
            <thead className="bg-white/[0.04] text-white/70">
              <tr>
                <th className="p-3">Feature</th>
                <th className="p-3">System</th>
                <th className="p-3">User</th>
              </tr>
            </thead>
            <tbody className="text-white/50">
              {[
                ["Purpose", "Defines behavior", "Defines task"],
                ["Created by", "Application / developer", "End user"],
                ["Content", "Rules and role", "Question and request"],
                ["Example", "Act as a teacher", "Explain React"],
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

      {/* 5. HOW THEY WORK */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">5. How Do They Work Together?</h2>

        <p className="text-white/60 leading-7">
          The system message provides instructions, while the user message
          provides the current task. The model uses both when generating its
          response.
        </p>

        <div className="rounded-xl border border-white/10 bg-[#121212] p-5">
          <div className="flex flex-col items-center gap-2 text-center text-sm">
            <div className="w-full max-w-sm rounded-lg border border-[#FC6C26]/30 bg-[#FC6C26]/10 p-3 text-[#FC6C26]">
              System Prompt
              <p className="text-xs text-white/50 mt-1">Defines behavior</p>
            </div>

            <span className="text-white/30">+</span>

            <div className="w-full max-w-sm rounded-lg border border-blue-500/30 bg-blue-500/10 p-3 text-blue-400">
              User Prompt
              <p className="text-xs text-white/50 mt-1">Provides task</p>
            </div>

            <span className="text-white/30">↓</span>

            <div className="w-full max-w-sm rounded-lg border border-white/10 bg-white/[0.04] p-3">
              LLM Processes Both Messages
            </div>

            <span className="text-white/30">↓</span>

            <div className="w-full max-w-sm rounded-lg border border-green-500/30 bg-green-500/10 p-3 text-green-400">
              Final Response
            </div>
          </div>
        </div>
      </section>

      {/* 6. MESSAGE ROLES */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">6. Common Message Roles</h2>

        <div className="space-y-3">
          {[
            {
              role: "system",
              desc: "Defines the assistant's overall behavior and instructions.",
              color: "text-[#FC6C26]",
            },
            {
              role: "user",
              desc: "Contains the user's question or task.",
              color: "text-blue-400",
            },
            {
              role: "assistant",
              desc: "Contains the assistant's generated response.",
              color: "text-green-400",
            },
            {
              role: "tool",
              desc: "Contains the result returned by a tool after tool execution.",
              color: "text-purple-400",
            },
          ].map((item) => (
            <div
              key={item.role}
              className="rounded-xl border border-white/10 bg-white/[0.02] p-4"
            >
              <h3 className={`font-mono font-semibold ${item.color}`}>
                {item.role}
              </h3>
              <p className="text-sm text-white/50 mt-2">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. API EXAMPLE */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">7. Practical API Example</h2>

        <p className="text-white/60 leading-7">
          In chat-based LLM APIs, messages are commonly sent as an array
          containing different roles.
        </p>

        <CodeBlock
          code={`const response = await client.chat.completions.create({
  model: "your-model",

  messages: [
    {
      role: "system",
      content: "You are a helpful JavaScript teacher."
    },
    {
      role: "user",
      content: "Explain closures with an example."
    }
  ]
});

console.log(response.choices[0].message.content);`}
        />

        <div className="rounded-xl border border-[#FC6C26]/20 bg-[#FC6C26]/[0.05] p-4">
          <h3 className="text-[#FC6C26] font-semibold text-sm">
            Understanding the Code
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-white/50">
            <li>
              • <code className="text-white">role: "system"</code> defines
              assistant behavior.
            </li>
            <li>
              • <code className="text-white">role: "user"</code> provides the
              actual question.
            </li>
            <li>
              • <code className="text-white">messages</code> sends both messages
              to the model.
            </li>
            <li>
              • The assistant generates a response based on the conversation
              context.
            </li>
          </ul>
        </div>
      </section>

      {/* 8. IMPORTANT */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">8. Important Things to Remember</h2>

        {[
          "System prompts define the assistant's behavior and instructions.",
          "User prompts contain the actual task or question.",
          "Assistant messages contain generated responses.",
          "Tool messages contain tool execution results.",
          "System and developer instructions are not identical across every API; follow the provider's message-role documentation.",
          "A prompt does not guarantee that the model will always follow every instruction.",
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
            q: "What is a prompt in GenAI?",
            a: "A prompt is an input or instruction given to an LLM to generate a response.",
          },
          {
            q: "What is a System Prompt?",
            a: "It defines the assistant's role, behavior, rules and response style.",
          },
          {
            q: "What is a User Prompt?",
            a: "It contains the actual question, request or task submitted by the user.",
          },
          {
            q: "What is the difference between System and User Prompts?",
            a: "System prompts define how the assistant should behave, while user prompts define what the assistant should do.",
          },
          {
            q: "What are common message roles in chat APIs?",
            a: "Common roles include system, developer, user, assistant and tool. Availability depends on the API.",
          },
          {
            q: "Can a System Prompt guarantee correct AI responses?",
            a: "No. It guides model behavior but cannot guarantee perfect accuracy or instruction following.",
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

export default SystemUserPrompts;
