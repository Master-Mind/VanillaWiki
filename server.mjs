import * as fs from 'fs';
import * as http from 'http';
import * as path from 'path';
import { countFiles } from './server/countFiles.mjs';

//taken from https://developer.mozilla.org/en-US/docs/Learn/Server-side/Node_server_without_framework
const PORT = 8000;
const HOSTNAME = '0.0.0.0';

export const MIME_TYPES = {
  default: 'application/octet-stream',
  html: 'text/html; charset=UTF-8',
  js: 'application/javascript',
  json: 'application/json',
  css: 'text/css',
  png: 'image/png',
  jpg: 'image/jpg',
  gif: 'image/gif',
  ico: 'image/x-icon',
  svg: 'image/svg+xml',
};

const STATIC_PATH = path.join(process.cwd(), './static');

const toBool = [() => true, () => false];

const prepareFile = async (url) => {
  const paths = [STATIC_PATH, url];
  if (url.endsWith('/')) paths.push('index.html');
  const filePath = path.join(...paths);
  const pathTraversal = !filePath.startsWith(STATIC_PATH);
  const exists = await fs.promises.access(filePath).then(...toBool);
  const found = !pathTraversal && exists;
  const streamPath = found ? filePath : STATIC_PATH + '/404.html';
  const ext = path.extname(streamPath).substring(1).toLowerCase();
  const stream = fs.createReadStream(streamPath);
  return { found, ext, stream };
};

//I think there's a better way to do this, but I'm not sure how to do it
export var apis = {
  "/api/countFiles": countFiles,
};

http.createServer(async (req, res) => {
  var statusCode = 404;

  if (req.url.match(/\/api\//))
  {
    if (apis[req.url.split('?')[0]])
    {
      try
      {
        statusCode = apis[req.url.split('?')[0]](req, res);
      }
      catch (e)
      {
        console.log(e);
        statusCode = 500;
        res.writeHead(statusCode, { 'Content-Type': MIME_TYPES.json });
      }
    }
    else
    {
      res.writeHead(statusCode, { 'Content-Type': MIME_TYPES.json });
    }
  }
  else
  {
      const file = await prepareFile(req.url);
      statusCode = file.found ? 200 : 404;
      const mimeType = MIME_TYPES[file.ext] || MIME_TYPES.default;
      res.writeHead(statusCode, { 'Content-Type': mimeType });
      file.stream.pipe(res);
  }
  console.log(`${req.method} ${req.url} ${statusCode}`);
}).listen(PORT, HOSTNAME, () => {
  console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
});
