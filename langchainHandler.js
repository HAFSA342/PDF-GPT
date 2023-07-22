// langchainHandler.js
const { OpenAI, RetrievalQAChain, HNSWLib, OpenAIEmbeddings, RecursiveCharacterTextSplitter } = require("langchain/llms");
const fs = require('fs');

const VECTOR_STORE_PATH = 'vector_store.index';

const processFileAndAnswer = async (file, question) => {
  // Save the uploaded file to a temporary location
  const filePath = path.join(__dirname, 'temp', file.name);
  file.mv(filePath, (err) => {
    if (err) {
      throw err;
    }
  });

  // Text processing with Langchain
  const text = fs.readFileSync(filePath, 'utf8');
  const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000 });
  const docs = await textSplitter.createDocuments([text]);
  const vectorStore = await HNSWLib.fromDocuments(docs, new OpenAIEmbeddings());

  // Question answering
  const model = new OpenAI({});
  const chain = RetrievalQAChain.fromLLM(model, vectorStore.asRetriever());
  const res = await chain.call({ query: question });

  // Delete the temporary file
  fs.unlinkSync(filePath);

  return res;
};

module.exports = { processFileAndAnswer };
