const net = require('net')
const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
})

const options = {
    port: 3434,
    host: '192.168.89.207'
}

const client= net.createConnection(options)

client.on('connect', ()=>{
    readline.question("Bienvenido, escriba su nombre de usuario:", (username)=>{
        client.write(username)
    })

})

client.on ('data', (data)=>{

    console.log(data.toString())
    waitingMessage()

})

function waitingMessage(){
    readline.question("",(message)=>{


        client.write(message)
    })
}

client.on('error', (err)=>{
    console.log(err.message)

})

client.on("close", ()=>{
    process.exit()
    client.end()
})
