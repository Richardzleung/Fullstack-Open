const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

morgan.token('POST', req => {
    const person = req.body
    // console.log(typeof person , person.length)
    if (JSON.stringify(person) === '{}') return null

    return JSON.stringify(`{name: ${person.name}, number: ${person.number}}` )
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :POST'))

let phonebook = [
    {   
        id: 1,
        name: 'Arto Hellas' , 
        number: '040-1234567'
    },
    { 
        id: 2,
        name: 'Ada Lovelace', 
        number: '39-44-5323523' 
    },
    { 
        id: 3,
        name: 'Dan Abramov', 
        number: '12-43-234345' 
    },
    { 
        id: 4,
        name: 'Mary Poppendieck', 
        number: '39-23-6423122' 
    } 
]
// Root
app.get('/', (req, res) => res.send('<h1>Hello World!</h1>'))

app.get('/api/persons', (req, res) => res.json(phonebook))

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = phonebook.find(person => person.id === id)

    if (person) {
        response.json(person)
    } 
    response.status(404).end()
})

app.get('/api/info', (request, response) => {
    const date = new Date()
    response.send(`Phonebook has info for ${phonebook.length} people <br> ${date}`)
})

// Delete & Create entrys 
app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    phonebook = phonebook.filter(person => person.id !== id)
    response.status(204).end()
})

const generateId = () => phonebook.length > 0 
        ? Math.floor(Math.random() * Math.floor(100))
        : 0

app.post('/api/persons', (request, response) => {
    const body = request.body
    const findName = phonebook.find(person => person.name === body.name)
    if (!body.name || !body.number) {
        return response.status(400).json({ 
          error: 'data missing' 
        })
    } else if (findName) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    const name = body.name
    const number = body.number
    const id = generateId()
    const person = {
        name,
        number,
        id,
    }
    console.log('POST' , person)
    phonebook = phonebook.concat(person)
    response.json(person)
})

app.put('/api/persons/:id', (request, response) => {
    const body = request.body
    if (!body.name || !body.number) {
        return response.status(400).json({ 
          error: 'data missing' 
        })
    }
    
    const findPerson = phonebook.find(n => n.name === body.name)
    const index = phonebook.indexOf(findPerson)

    const name = body.name
    const number = body.number
    const id = findPerson.id
    const person = {
        name,
        number,
        id,
    }

    console.log('PUT' , person)
    phonebook[index] = person
    response.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
