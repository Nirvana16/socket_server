/**
 * Created by zedanilo  on 29/06/18.
 */

// Variaveis necessária para o Server,
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

//Criamos um Get para abrir uma pagina HTML caso o Server seja acessado pelo Browser
//Isso não é obrigatório mas é util durante a construção do server.
app.get('/',function(req,res){
    res.sendFile(__dirname+'/index.html');
})

// Criamos uma função io, conforme documentação do Socket.IO ela irá abrir a porta de conexão
// Em nosso server, e podemos atribuir eventos nela enquanto essa porta estiver aberta.
// Esta função atribui uma ID, chamada de Socket.id a todos o clientes que fizerem um request
// no server.
io.on('connection',function(socket){
    //Exibe, no console, qual a ID do usuário que foi conectado
    console.log('Um usuario foi conectado '+socket.id);

    //Esta linha faz a coleta dos dados que foram transmitidos ao servidor
    socket.on('message',function(data){
        //Mostra o ID de quem esta eviando a mensagem
        console.log('O usuario: '+socket.id+' ENVIOU: ');
        //Mostra o que foi enviado no console (enviado para o servidor)
        console.log(data);
        console.log('');

        // A var sockets faz a transmissão para todos os clientes conectados
        // No caso de transmissão de um cliente para outro especifico teriamos de
        // fazer alterações aqui.
        var sockets = io.sockets.sockets;
        socket.broadcast.emit('message', data);
    })
    //Faz o logout do cliente no servidor
    socket.on('disconnect',function(){
        console.log('O usuario '+socket.id+' foi desconectado');
    })
  })

  // Define a porta a qual o servico ficará ativo
  http.listen(3000,function(){
    console.log('Servidor iniciado na porta 3 mil');
})


