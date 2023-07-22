import React, { useState, useRef } from "react";
import axios from "axios";

function Home() {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [userQuestion, setUserQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleQuestionChange = (event) => {
    const question = event.target.value;
    setUserQuestion(question);
  };

  const handleQuestionSubmit = async () => {
    if (!userQuestion.trim()) {
      alert("Please enter a question.");
      return;
    }

    let formData = new FormData();
    formData.append("question", userQuestion.trim());

    if (selectedFile) {
      formData.append("file", selectedFile);
    }

    try {
      const response = await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setAnswer(response.data.answer);
    } catch (error) {
      console.error(error);
      alert("An error occurred while processing the file.");
    }
  };

  return (
    <div className="App">
      <h1>PDF Reader</h1>
      <div>
        <h2>Upload PDF File</h2>
        <label htmlFor="fileInput" className="fileInputLabel">
          Choose a PDF file
        </label>
        <input
          type="file"
          id="fileInput"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: "none" }}
          accept=".pdf"
        />
        {selectedFile && <p>Selected file: {selectedFile.name}</p>}
      </div>
      <div>
        <h2>Ask a Question</h2>
        <textarea
          rows="4"
          cols="50"
          value={userQuestion}
          onChange={handleQuestionChange}
          placeholder="Ask your question here..."
        />
        <button onClick={handleQuestionSubmit}>Submit</button>
      </div>
      {answer && (
        <div>
          <h2>Answer</h2>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}

export default Home;
