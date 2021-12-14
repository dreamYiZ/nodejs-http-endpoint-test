const http = require('http')

const PORT = process.env.PORT || 3000


var params=function(req){
  let q=req.url.split('?'),result={};
  if(q.length>=2){
      q[1].split('&').forEach((item)=>{
           try {
             result[item.split('=')[0]]=item.split('=')[1];
           } catch (e) {
             result[item.split('=')[0]]='';
           }
      })
  }
  return result;
}

const server = http.createServer((req, res) => {
  if (req.url === '/') return respondHello(req, res)
  if (req.url === '/user-agent') return useAgent(req, res)
  if (new RegExp('^/base64').test( req.url )) return base64(req, res)

  res.end()
})

function respondHello (req, res) {
  res.end(JSON.stringify({ msg: 'hello' }))
}

function useAgent (req, res) {
  res.end(JSON.stringify({ msg: req.headers['user-agent'] }))
}

function base64 (req, res) {
  req.params=params(req); 
  res.end(JSON.stringify({ msg: Buffer.from(req.params.str).toString('base64')}))
}

server.listen(PORT)
console.log(`Server listening on port ${PORT}`)

if (require.main !== module) module.exports = server
