import React from "react";
import CodeBlock from "../../components/CodeBlock";

const MultimodalAPIs = () => {
  return (
    <div className="space-y-8 text-[#E3E3E3]">
      {/* Header */}
      <div>
        <p className="text-sm font-semibold tracking-widest text-[#FC6C26]">
          ADVANCED LLM FEATURES / 04
        </p>
        <h1 className="mt-2 text-3xl font-bold">Multimodal APIs</h1>
        <p className="mt-3 leading-7 text-[#999]">
          Multimodal APIs allow developers to build AI applications that can
          process and generate different types of data, including text, images,
          audio, and video.
        </p>
      </div>

      {/* Introduction */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">1. What are Multimodal APIs?</h2>

        <p className="leading-7 text-[#aaa]">
          Traditional language models mainly work with text, while multimodal
          models can understand and work with multiple data types in a single
          application.
        </p>

        <CodeBlock
          code={`             Multimodal AI
                   |
       +-----------+-----------+
       |           |           |
       v           v           v
      Text       Images       Audio
       |           |           |
       +-----------+-----------+
                   |
                   v
               AI Model
                   |
                   v
             Generated Output`}
        />

        <p className="text-sm text-[#aaa]">
          Example: An AI assistant can analyze an uploaded image, answer
          questions about it, and process audio instructions.
        </p>
      </section>

      {/* Modalities */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">2. Different Modalities</h2>

        <div className="grid gap-3 sm:grid-cols-2">
          {[
            ["Text", "Understand questions and generate text responses."],
            ["Images", "Analyze images, objects, and visual information."],
            ["Audio", "Process speech, recognize voice, and generate audio."],
            ["Video", "Analyze video frames and visual events."],
          ].map(([title, desc], index) => (
            <div
              key={index}
              className="rounded-xl border border-white/10 bg-white/[0.03] p-4"
            >
              <h3 className="font-semibold text-[#FC6C26]">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#aaa]">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Image Processing */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">3. Image Processing</h2>

        <p className="leading-7 text-[#aaa]">
          Vision-capable AI models can analyze images and answer questions about
          their visual content.
        </p>

        <CodeBlock
          code={`User Uploads Image
        |
        v
Backend Receives Image
        |
        v
Multimodal AI API
        |
        v
Model Analyzes Image
        |
        v
Generated Description`}
        />

        <p className="text-sm text-[#aaa]">
          Use cases: Image classification, document analysis, object
          identification, and visual question answering.
        </p>
      </section>

      {/* Audio */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">4. Audio Processing</h2>

        <p className="leading-7 text-[#aaa]">
          Audio-capable AI models can convert speech into text, understand
          spoken instructions, and generate speech from text.
        </p>

        <CodeBlock
          code={`        Audio Input
             |
             v
      Speech Recognition
             |
             v
        Text Output
             |
             v
          AI Model
             |
             v
       Generated Response
             |
             v
        Text-to-Speech
             |
             v
         Audio Output`}
        />

        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <h3 className="font-semibold text-[#FC6C26]">Important Concepts</h3>
          <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-[#aaa]">
            <li>
              <strong>Speech-to-Text:</strong> Converts spoken audio into text.
            </li>
            <li>
              <strong>Text-to-Speech:</strong> Converts text into spoken audio.
            </li>
            <li>
              <strong>Audio Understanding:</strong> Analyzes audio content.
            </li>
            <li>
              <strong>Voice Interaction:</strong> Enables voice-based AI
              communication.
            </li>
          </ul>
        </div>
      </section>

      {/* Video */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">5. Video Processing</h2>

        <p className="leading-7 text-[#aaa]">
          Video understanding allows AI systems to analyze visual information
          across video frames and understand events over time.
        </p>

        <CodeBlock
          code={`Video Input
     |
     v
Extract Video Frames
     |
     v
Analyze Frames
     |
     v
Understand Visual Events
     |
     v
Generate Summary`}
        />

        <p className="text-sm text-[#aaa]">
          Example: An AI application can analyze a recorded video and generate a
          summary of important events.
        </p>
      </section>

      {/* API Example */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">6. Multimodal API Example</h2>

        <p className="leading-7 text-[#aaa]">
          Some APIs allow text and image inputs together in a single request.
          The following example uses the OpenAI Responses API.
        </p>

        <CodeBlock
          code={`const response = await client.responses.create({
  model: "YOUR_VISION_MODEL",

  input: [
    {
      role: "user",
      content: [
        {
          type: "input_text",
          text: "Describe this image."
        },
        {
          type: "input_image",
          image_url: "https://example.com/image.jpg"
        }
      ]
    }
  ]
});

console.log(response.output_text);`}
        />

        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <h3 className="font-semibold text-[#FC6C26]">
            Understanding the Code
          </h3>
          <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-[#aaa]">
            <li>
              <strong>model:</strong> Selects a vision-capable model.
            </li>
            <li>
              <strong>input:</strong> Contains the user request.
            </li>
            <li>
              <strong>input_text:</strong> Provides text instructions.
            </li>
            <li>
              <strong>input_image:</strong> Provides image input.
            </li>
            <li>
              <strong>output_text:</strong> Returns generated text.
            </li>
          </ul>
        </div>

        <p className="text-sm text-[#999]">
          Note: Image URL accessibility and supported input formats depend on
          the selected API provider and model.
        </p>
      </section>

      {/* Use Cases */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">7. Real-World Use Cases</h2>

        <div className="grid gap-3 sm:grid-cols-2">
          {[
            ["AI Chatbots", "Understand text, images, and voice messages."],
            [
              "Document Analysis",
              "Extract information from scanned documents.",
            ],
            [
              "Voice Assistants",
              "Understand speech and generate voice responses.",
            ],
            [
              "Image Recognition",
              "Identify objects and analyze visual content.",
            ],
            ["Video Summarization", "Generate summaries from video content."],
            ["Accessibility", "Describe images and convert text into speech."],
          ].map(([title, desc], index) => (
            <div
              key={index}
              className="rounded-xl border border-white/10 bg-white/[0.03] p-4"
            >
              <h3 className="font-semibold text-[#FC6C26]">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#aaa]">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Important */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">8. Important Points</h2>

        <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-[#aaa]">
          <li>Multimodal AI works with multiple data types.</li>
          <li>Vision models can analyze images.</li>
          <li>Audio models can process and generate speech.</li>
          <li>
            Video understanding involves analyzing visual information over time.
          </li>
          <li>Not every AI model supports every modality.</li>
          <li>Input formats and size limits depend on the API provider.</li>
          <li>
            Multimodal APIs are useful for building advanced AI applications.
          </li>
        </ul>
      </section>

      {/* Interview */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold">9. Interview Questions & Answers</h2>

        {[
          {
            q: "What are Multimodal APIs?",
            a: "Multimodal APIs allow applications to process different types of data, such as text, images, audio, and video.",
          },
          {
            q: "What is Multimodal AI?",
            a: "Multimodal AI is an AI system that can understand or generate multiple types of data.",
          },
          {
            q: "What is the difference between Unimodal and Multimodal AI?",
            a: "Unimodal AI works with one type of data, while Multimodal AI can work with multiple data types.",
          },
          {
            q: "What is Vision in AI models?",
            a: "Vision is the ability of an AI model to analyze and understand visual information from images or video frames.",
          },
          {
            q: "What is Speech-to-Text?",
            a: "Speech-to-Text converts spoken audio into written text.",
          },
          {
            q: "What is Text-to-Speech?",
            a: "Text-to-Speech converts written text into spoken audio.",
          },
          {
            q: "Can an AI model process text and images together?",
            a: "Yes. Multimodal models can accept multiple input types together when supported by their API.",
          },
          {
            q: "What is Video Understanding?",
            a: "Video Understanding allows AI systems to analyze video frames and identify events or activities.",
          },
          {
            q: "Does every LLM support multimodal inputs?",
            a: "No. Multimodal capabilities depend on the selected model and API provider.",
          },
        ].map((item, index) => (
          <div
            key={index}
            className="rounded-xl border border-white/10 bg-white/[0.03] p-4 space-y-2"
          >
            <p className="text-sm font-semibold">
              <span className="mr-2 text-[#FC6C26]">Q{index + 1}.</span>
              {item.q}
            </p>

            <p className="text-sm leading-6 text-[#aaa]">
              <span className="font-semibold text-green-400">Answer: </span>
              {item.a}
            </p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default MultimodalAPIs;
