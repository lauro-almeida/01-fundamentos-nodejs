import http from 'node:http'
import { json } from './middlewares/json.js'
import { routes } from './routes.js'
import { extractQueryParameters } from './utils/extract-query-parameters.js'


const server = http.createServer(async (req, res) => {
    const { method, url } = req

    console.log(url)

    await json(req, res)

    const route = routes.find(route => {
        return route.method === method && route.path.test(url)
    })

    if (route) {
        const routeParams = req.url.match(route.path)
        console.log(routeParams)

        const { query, ...params } =  routeParams.groups

        req.params = params
        req.query = query ? extractQueryParameters(query) : {}

        console.log(req.query)

        return route.handler(req, res)
    }

    return res
        .writeHead(404)
        .end()
})

server.listen(3334)