import * as fs from 'fs';
import * as path from 'path';
import * as url from 'url';
import { apis, MIME_TYPES } from '../server.mjs';

function countFilesHelper(fPath)
{
    var fileCount = 0;

    // Read the contents of the directory
    var files = fs.readdirSync(fPath);

    // Loop through each file in the directory
    for (const file of files) {
        // Get the full path of the file
        const filePath = path.join(fPath, file);

        // Check if the file is a directory
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            // If the file is a directory, recursively call countFiles on it
                fileCount += countFilesHelper(filePath);
        } else {
        // If the file is a file, increment the file count
            fileCount++;
        }
    }

    return fileCount;
}

export function countFiles(req, res) {
    var fileCount = 0;
    var statusCode = 200;

    var query = url.parse(req.url, true).query;
    //get the directory from the "path" url argument
    var dir = query.path;

    console.log(dir);

    try{
        fileCount = countFilesHelper(dir);
    }
    catch(e){
        console.log(e);
        statusCode = 404;
        res.writeHead(statusCode, { 'Content-Type': MIME_TYPES.json });
        res.end(JSON.stringify({ fileCount }));
        return statusCode;
    }


    res.writeHead(statusCode, { 'Content-Type': MIME_TYPES.json });

    // Return the file count as json
    res.end(JSON.stringify({ fileCount }));

    return statusCode;
}
