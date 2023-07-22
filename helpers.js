const jsonwebtoken = require("jsonwebtoken")

const generateJWT = (payload) => {
    const token = jsonwebtoken.sign(
        { payload },
        process.env.JWT_SECRET_KEY,
        { expiresIn: '1d' }
    )
    return token
}

function normalizeDocuments(docs) {
    return docs.map((doc) => {
        if (typeof doc.pageContent === "string") {
            return doc.pageContent;
        } else if (Array.isArray(doc.pageContent)) {
            return doc.pageContent.join("\n");
        }
    })
}

module.exports = {
    generateJWT,
    normalizeDocuments
}