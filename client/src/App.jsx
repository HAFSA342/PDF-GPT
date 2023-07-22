import "./App.css";
import Home from "./Component/Home";
import { pdfjs } from "react-pdf";
import "./App.css";

if (process.env.NODE_ENV === "production") {
  pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.12.313/pdf.worker.min.js`;
} else {
  pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.12.313/pdf.worker.min.js`;
}

function App() {
  return (
    <div className="">
      <Home />
    </div>
  );
}

export default App;
