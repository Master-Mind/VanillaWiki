export function health(req, res) 
{
    var statusCode = 200;
    var message = "OK";

    res.writeHead(statusCode, { 'Content-Type': MIME_TYPES.json });

    // Return the file count as json
    res.end(JSON.stringify({ message }));

    return statusCode;
}