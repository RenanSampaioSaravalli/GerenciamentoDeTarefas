import fs  from 'node:fs/promises'

const databasePath = new URL('../db.json', import.meta.url)

type databaseSchema = {
    [key:string]: any[]
}

export class Database {
    private database: databaseSchema = {} 

    constructor () {
        fs.readFile(databasePath, 'utf-8')
            .then(data => this.database = JSON.parse(data))
            .catch(() => this.persist())
    }

    private insert<T extends object>(table: string, data: T) {
        this.database[table] ??= []

        this.database[table].push(data)

        this.persist()

        return data
    }

    private select(table: string, search: any) {
        let data = this.database[table] ?? []
        
        if (search) {
            const searchEntries = Object.entries(search)
            data = data.filter(row => {
                return searchEntries.some(([key, value]) => {
                    return String(row[key]).toLowerCase().includes(String(value).toLowerCase())
                })
            })
        }

        return data

    }

    private persist() {
        fs.writeFile(databasePath, JSON.stringify(this.database))
    }
}