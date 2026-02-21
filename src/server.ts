
import  http  from 'node:http';
import { routes } from './route.js';

const server = http.createServer((req, res) => {
    const {method, url} = req
    
    const route = routes.find((route) => route.method === method && route.path === url)

    if (route) {
        return route.handler
    }

    return res.writeHead(404).end()
})

const PORT = 3000

server.listen(PORT, () => {
    console.log('RODOU!!')
})