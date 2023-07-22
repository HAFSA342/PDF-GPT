import React, { useState } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import ViewPdf from "./PdfViewer";

function Home() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [userQuestion, setUserQuestion] = useState("");
  const [messages, setMessages] = useState([]);

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles && acceptedFiles?.length > 0) {
      setSelectedFile(acceptedFiles[0]);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ".pdf",
  });

  const handleTextareaKeyPress = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      handleQuestionSubmit(event);
    }
  };

  const handleQuestionChange = (event) => {
    const question = event.target.value;
    setUserQuestion(question);
  };

  const handleQuestionSubmit = async (event) => {
    event.preventDefault();
    if (!userQuestion.trim()) {
      alert("Please enter a question.");
      return;
    }
    const newData = [...messages, { role: "user", content: userQuestion }];
    setMessages(newData);

    let formData = new FormData();
    formData.append("question", userQuestion.trim());
    setUserQuestion("");

    if (selectedFile) {
      formData.append("file", selectedFile);
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/api/post/chat-with-docs",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const { data } = response;
      console.log("data", data.data.answer);

      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "assistant", content: data.data.answer },
      ]);
    } catch (error) {
      console.error(error);
      alert("An error occurred while processing the file.");
    }
  };

  return (
    <div className="App">
      <h1>PDF Reader</h1>
      {selectedFile?.name ? (
        <>
          <ViewPdf file={selectedFile} />
          <div className="buttonWrapper">
            <button onClick={() => setSelectedFile(null)}>Change Pdf</button>
          </div>
        </>
      ) : (
        <div>
          <h2>Upload PDF File</h2>
          <div
            {...getRootProps()}
            className={`dropzone ${isDragActive ? "active" : ""}`}
          >
            <input accept="application/pdf" {...getInputProps()} />
            {selectedFile ? (
              <p>Selected file: {selectedFile?.name}</p>
            ) : (
              <p>Drag and drop a PDF file here, or click to select one.</p>
            )}
          </div>
        </div>
      )}

      <div>
        <h2>Ask a Question</h2>
        <textarea
          rows="4"
          cols="50"
          value={userQuestion}
          onChange={handleQuestionChange}
          placeholder="Ask your question here..."
          onKeyPress={handleTextareaKeyPress}
        />
        {/* <div className="buttonWrapper">
          <button onClick={handleQuestionSubmit}>Submit</button>
        </div> */}
      </div>
      <div className="messageWrapper">
        {messages?.map((message, ind) => (
          <div
            className={`wrapper ${
              message?.role === "user" ? "userMessage" : "assistantMessage"
            }`}
            key={ind}
          >
            <div className="chat">
              <div className="profile"></div>
              <div className="message" id={ind}>
                {message?.content}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
