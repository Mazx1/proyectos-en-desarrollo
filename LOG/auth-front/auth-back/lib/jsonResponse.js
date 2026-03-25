exports.jsonResponse = (statusCode, body) => {
    return {
        statusCode: statusCode,
        body: JSON.stringify(body)
    }       
}   