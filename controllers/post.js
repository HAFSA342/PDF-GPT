const { DirectoryLoader } = require("langchain/document_loaders/fs/directory")
const { TextLoader } = require("langchain/document_loaders/fs/text")
const { PDFLoader } = require("langchain/document_loaders/fs/pdf")
const { OpenAI } = require("langchain/llms/openai")
const { RetrievalQAChain } = require("langchain/chains")
const { HNSWLib } = require("langchain/vectorstores/hnswlib")
const { OpenAIEmbeddings } = require("langchain/embeddings/openai")
const { RecursiveCharacterTextSplitter } = require("langchain/text_splitter")
const { normalizeDocuments } = require('../helpers')
const fs = require('fs')
const VECTOR_STORE_PATH = "documents.index"

const chatWithDocs = async (req, res) => {
    try {
        const { body } = req
        const { question } = body

        if (!question) {
            return res.send({ success: false, message: 'Please Provide Question Against These File.' })
        }


        const loader = new DirectoryLoader("./documents", {
            ".pdf": (path) => new PDFLoader(path),
            ".txt": (path) => new TextLoader(path)
        })

        console.log("Loading docs...")
        const docs = await loader.load()
        console.log("Docs loaded.")

        const model = new OpenAI({
            modelName: "gpt-3.5-turbo",
            max_tokens: 150,
            top_p: 1,
            temperature: 0.5,
            frequency_penalty: 0.2,
            presence_penalty: 0,
            n: 1,
            stream: false,
            openAIApiKey: process.env.OPENAI_API_KEY
        })

        let vectorStore

        if (fs.existsSync(VECTOR_STORE_PATH)) {
            vectorStore = await HNSWLib.load(
                VECTOR_STORE_PATH,
                new OpenAIEmbeddings()
            )
        } else {
            const textSplitter = new RecursiveCharacterTextSplitter({
                chunkSize: 1000,
            })
            const normalizedDocs = normalizeDocuments(docs)
            const splitDocs = await textSplitter.createDocuments(normalizedDocs)

            vectorStore = await HNSWLib.fromDocuments(
                splitDocs,
                new OpenAIEmbeddings()
            )

            await vectorStore.save(VECTOR_STORE_PATH)

        }

        const chain = RetrievalQAChain.fromLLM(model, vectorStore.asRetriever())

        const langChainRes = await chain.call({ query: question })

        let quesAndAns = { question: question, answer: langChainRes?.text }

        console.log('quesAndAns,', quesAndAns)

        return res.send({ success: true, data: quesAndAns })

    } catch (e) {
        console.log('e', e)
        return res.send({ success: false, message: 'Something went wrong', e })
    }
}

module.exports = {
    chatWithDocs
}