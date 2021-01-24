//Server
const http = require('http')

const server = http.createServer((request, response) => {
  // функция handler
  console.log(request.url)

  response.write('<h1>Hello from NodeJS</h1>')
  response.write('<h2>Hello from NodeJS</h2>')
  response.write('<h3>Hello from NodeJS</h3>')
  response.end(`
    <div style='background: red; width: 200px; height: 200px'>
      <h1>test 1</h1>
    </div>
  `)
})

server.listen(3000, () => {
  console.log('Server is running')
})

///next server example
const server = http.createServer((request, response) => {
  if(request.method === 'GET') {
    response.writeHead(200, {
      'Content-Type': 'text/html'
    })
    response.end(`
      <h1>Form</h1>
      <form method='post' action='/'>
        <input name='title' type='text' />
        <button type='submit'>Send</button>
      </form>
    `)
  } else if(request.method === 'POST') {
    const body = []

    response.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8'
    })
    //данные поступают в виде чанков (буфер)
    //добавим слушатель
    request.on('data', data => {
      body.push(Buffer.from(data))
    })
    //когда данные полностью придут
    request.on('end', () => {
      const message = body.toString().split('=')[1]

      response.end(`
      <h1>Your message: ${message}</h1>
    `)
    })
  }
})

server.listen(3000, () => {
  console.log('Server is running')
})


//another server example
const http = require('http')
const fs = require('fs')
const path = require('path')

const server = http.createServer((request, response) => {
  if(request.method === 'GET') {
    response.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8'
    })

    if(request.url === '/') {
      fs.readFile(
        path.join(__dirname, 'views', 'index.html'),
        'utf-8',
        (error, content) => {
          if(error) throw error

          response.end(content)
        }
      )
    } else if(request.url === '/about') {
      fs.readFile(
        path.join(__dirname, 'views', 'about.html'),
        'utf-8',
        (error, content) => {
          if(error) throw error

          response.end(content)
        }
      )
    } else if(request.url === '/api/users') {
      response.writeHead(200, {
        'Content-Type': 'text/json'
      })

      const users = [
        {name: 'bob', age: 10},
        {name: 'chaki', age: 12}
      ]

      response.end(JSON.stringify(users))
    }

  } else if(request.method === 'POST') {
    const body = []

    response.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8'
    })
    //данные поступают в виде чанков (буфер)
    //добавим слушатель
    request.on('data', data => {
      body.push(Buffer.from(data))
    })
    //когда данные полностью придут
    request.on('end', () => {
      const message = body.toString().split('=')[1]

      response.end(`
      <h1>Your message: ${message}</h1>
    `)
    })
  }
})

server.listen(3000, () => {
  console.log('Server is running')
})