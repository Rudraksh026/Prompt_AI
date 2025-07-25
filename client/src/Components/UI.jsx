import { useState } from "react";
import "./styles/UI.css";
export const UI = () => {
  const [prompt, setPrompt] = useState();
  const [responseText, setResponseText] = useState(
    "AI's response will appear here."
  );

  const handleChange = (e) => {
    setPrompt(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponseText("Thinking .........");
    try {
      const response = await fetch("http://localhost:5000/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      const cleaned = data.replace(/"/g, "");
      const html = cleaned
        .replace(/^### (.*$)/gim, "<h3>$1</h3>")
        .replace(
          /^```c([\s\S]*?)```/gm,
          '<pre><code class="language-c">$1</code></pre>'
        )
        .replace(
          /^```bash([\s\S]*?)```/gm,
          '<pre><code class="language-bash">$1</code></pre>'
        )
        .replace(/^```([\s\S]*?)```/gm, "<pre><code>$1</code></pre>")
        .replace(/^\d+\. (.*$)/gm, "<li>$1</li>") // number list
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // bold
        .replace(/\n{2,}/g, "</p><p>") // paragraphs
        .replace(/\n/g, "<br>") // single line breaks
        .replace(/^/, "<p>")
        .concat("</p>");
      setResponseText(`${html}`);
    } catch (error) {}
  };

  return (
    <>
      <div className="container">
        <h1>Talk to AI 🤖</h1>
        <form onSubmit={handleSubmit} id="promptForm">
          <textarea
            id="promptInput"
            placeholder="Type your prompt here..."
            onChange={handleChange}
            value={prompt}
            required
          ></textarea>
          <button type="submit">Ask AI</button>
        </form>
        <div id="responseBox">
          <div className="placeholder" dangerouslySetInnerHTML={{ __html: responseText }}></div>
        </div>
      </div>
    </>
  );
};
