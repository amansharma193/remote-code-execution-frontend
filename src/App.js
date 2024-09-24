import { useState, } from "react";
import "./App.css";
import Editor from "@monaco-editor/react";

function App() {
  const [code, setCode] = useState("// some comment");
  const [language, setLanguage] = useState("javascript");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  
  const submitCode = async () => {
    setLoading(true);
    setOutput("");
    const bodyData = {
      language: language,
      code: code,
      userInput: input, // Capturing the input from textarea
    };
    
    try {
      const response = await fetch("https://zvste435li.execute-api.us-east-1.amazonaws.com/prod-24-sep-2024/remote-code-execution/code-compiler", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
      });
  
      const result = await response.json();
      const cleanedOutput = result.body?.replace(/\\n/g, '\n').replace(/^"/, '').replace(/"$/, '');
      
      setOutput(cleanedOutput);
    } catch (error) {
      console.error("Error while submitting code:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <button disabled={loading}
        onClick={() => {
          setLanguage("python");
        }}
        style={{
          background: language === "python" ? "black" : "white",
          color: language === "python" ? "white" : "black",
        }}
      >
        Python
      </button>
      <button disabled={loading}
        onClick={() => {
          setLanguage("java");
        }}
        style={{
          background: language === "java" ? "black" : "white",
          color: language === "java" ? "white" : "black",
        }}
      >
        Java
      </button>
      <button disabled={loading}
        onClick={() => {
          setLanguage("cpp");
        }}
        style={{
          background: language === "cpp" ? "black" : "white",
          color: language === "cpp" ? "white" : "black",
        }}
      >
        C++
      </button>
      <button disabled={loading}
        onClick={() => {
          setLanguage("javascript");
        }}
        style={{
          background: language === "javascript" ? "black" : "white",
          color: language === "javascript" ? "white" : "black",
        }}
      >
        Javascript
      </button>

      <button disabled={loading} onClick={submitCode}>SUBMIT</button>
      {loading && (
        <div className="loader-overlay">
          <div className="loader"></div>
        </div>
      )}
      <div className="overlay">
        <Editor
          value={code}
          height="96vh"
          width="80vw"
          onChange={(e) => setCode(e)}
          language={language}
          defaultValue=""
          theme="vs-dark"
        />
        <div className="sidebar">
          <div className="input-overlay">
            <span className="label monaco-editor">Input</span>
            <textarea
              className="text-area"
              id="input"
              name="input"
              placeholder="Enter Input here ... "
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          <div className="output-overlay">
            <span className="label monaco-editor">Output</span>
            <textarea
              className="text-area"
              readOnly={true}
              placeholder="output here ..."
              value={output.toString()}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
