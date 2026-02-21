import { randomUUID } from "node:crypto"
import http from 'node:http'

interface Tarefa {
    id: string,
    title: string,
    description: String,
    completed_at: null,
    created_at: Date,
    updated_at: Date
}

const tarefas : Tarefa[] = []

export const routes = [
    {
        method: 'POST',
        path: '/tasks',
        handler: (res: http.ServerResponse<http.IncomingMessage>) => {
            tarefas.push({
                id: randomUUID(),
                title: 'Virar SÊNIOR',
                description: 'Estudar muito para virar SÊNIOR',
                completed_at: null,
                created_at: new Date(),
                updated_at: new Date()
            })
            res.writeHead(201).end()
        }
    },
    {
        method: 'GET',
        path: '/tasks',
        handler: (res: http.ServerResponse<http.IncomingMessage>) => {
            res.setHeader('Content-type', 'application/json').end(JSON.stringify(tarefas))
        }
    }
]