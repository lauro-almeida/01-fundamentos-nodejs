import http from 'node:http'

const server = http.createServer((req, res) => {
    return res.end('Hello ignite')
})

server.listen(3333)
// localhost:3333