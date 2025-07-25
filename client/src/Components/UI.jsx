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
    e.preventDefault()
    setResponseText("Thinking .........")
    try{
        const response = await fetch("http://localhost:5000/",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify({prompt})
        })
        setResponseText(await response.json())
    } catch(error){

    }
  }

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
          <p className="placeholder">{responseText}</p>
        </div>
      </div>
    </>
  );
};
