import { randomUUID } from "node:crypto"
import type {ServerResponse, IncomingMessage} from 'node:http'
import { Database } from "./database.js"

interface Tarefa {
    id: string,
    title: string,
    description: String,
    completed_at: null,
    created_at: Date,
    updated_at: Date
}

const tarefas : Tarefa[] = []

const db = new Database()

export const routes = [
    {
        method: 'POST',
        path: '/tasks',
        handler: (res: ServerResponse<IncomingMessage>) => {
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
        handler: (res: ServerResponse<IncomingMessage>) => {
            res.setHeader('Content-type', 'application/json').end(JSON.stringify(tarefas))
        }
    }
]