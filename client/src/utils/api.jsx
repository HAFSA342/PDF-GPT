let apiUrl

if (process.env.NODE_ENV === 'development') {
    apiUrl = `http://localhost:4000`
}
else {
    apiUrl = window.location.origin
}

const postApi = `${apiUrl}/api/post`


const POST = {
}

export {
    POST
}