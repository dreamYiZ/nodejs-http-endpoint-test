const tape = require('tape')
const jsonist = require('jsonist')

const PORT = process.env.PORT = process.env.PORT || require('get-PORT-sync')()
const server = require('./server')

const urlBase = `http://localhost:${PORT}`

tape('should respond hello', (t) => {
  jsonist.get(urlBase, (err, body) => {
    if (err) t.error(err)

    t.equal(body.msg, 'hello')
    t.end()
  })
})


tape('should respond user-agent', (t) => {
  const userAgent = 'Mozilla/5.0'
  const options = {
    headers: { 'User-Agent': userAgent }
  }
  jsonist.get(`${urlBase}/user-agent`, options, (err, body) => {
    if (err) t.error(err)

    t.equal(body.msg, userAgent)
    t.end()
  })
})

tape('should respond base64', (t) => {
  const str = '123456'
  jsonist.get(`${urlBase}/base64?str=${str}`, (err, body) => {
    if (err) t.error(err)
    t.equal(body.msg, Buffer.from(str).toString('base64'))
    t.end()
  })
})

tape('cleanup', function (t) {
  server.close()
  t.end()
})
