const net = require("net")

const server = net.createServer()

const nicknames=[];
const users=[];

function findbyUser(user) {
    for (i=0; i<users.length; i++){
        if (users[i].name===user){
            return i;
        }
    }
}
function findnick(user){
    for (i=0; i<users.length; i++){
        if (users[i].name===user){
            return users[i].nick;
        }
    }
}
function sendMessage(user,mess1, mess2){
    for (i=0; i<users.length; i++){
        if (users[i].name!==user){
            users[i].name.write(mess1)
        }
        else{
            users[i].name.write(mess2)
        }
    }

}
function advice(user,nick) {
    for (i=0; i<users.length; i++){
        if (users[i].name!==user){
            users[i].name.write(nick+ " ha entrado")
        }
    }
}
function exitadvice(nick) {
    for (i=0; i<users.length; i++){
        if (users[i].nick!==nick){
            users[i].name.write(nick+ " ha salido")
        }
    }
}
function newUser(user){
    for (i=0; i<users.length; i++){
        if (users[i].name===user){
            return false
        }
    }
    return true
}

function nickUse(nick){
    for (i=0; i<nicknames.length; i++){
        if (nicknames[i]===nick){
            return true
        }
    }
    return false
}

server.on('connection', (user)=>{

    user.on('data', (data)=>{
        const bool=newUser(user)

        if (users.length===0 ||bool===true){

           const nick=data.toString();

           if(nickUse(nick)===true){

               user.write("Escoja otro nombre")
               return;

           }
            console.log(nick + " ha entrado")
            const obj= {name:user,nick:nick,address:user.remoteAddress+user.remotePort}
            users.push(obj)
            nicknames.push(nick)
            user.write("Bienvenido al chat " + nick + ", escriba EXIT para salir\n")
            advice(user, nick);
        }
        else{
            const userNick=findnick(user);

            if (data.toString()==="EXIT"){

                const findByUser=findbyUser(user);
                const index=nicknames.indexOf(userNick);
                exitadvice(userNick)
                console.log(userNick + " ha salido")
                nicknames.splice(index,1)
                users.splice(findByUser,1)

                user.end()

                return 0

            }

            const messConstructor1= "["+ userNick +  "] -> " + data.toString()
            const messConstructor2= "[ YOU ] -> " + data.toString()
            sendMessage(user,messConstructor1,messConstructor2);
        }
    })
})

server.listen(8000, ()=> {
    console.log('servidor esta escuchando en el puerto', server.address().port)
})