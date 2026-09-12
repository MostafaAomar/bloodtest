const http=require('node:http'),fs=require('node:fs'),path=require('node:path');
const files={'/':'index.html','/index.html':'index.html','/app.js':'app.js','/styles.css':'styles.css','/results.json':'results.json'};
http.createServer((req,res)=>{
 const file=files[new URL(req.url,'http://localhost').pathname];
 if(!file){res.writeHead(404);res.end();return;}
 fs.readFile(path.join(__dirname,file),(err,data)=>{if(err){res.writeHead(404);res.end();return;}res.writeHead(200,{'Content-Type':file.endsWith('.json')?'application/json':file.endsWith('.js')?'text/javascript':file.endsWith('.css')?'text/css':'text/html; charset=utf-8','Cache-Control':'no-store'});res.end(data);});
}).listen(8080,'127.0.0.1',()=>console.log('Open http://localhost:8080 — keep this window open.'));
