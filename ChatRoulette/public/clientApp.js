angular.module("clientApp", ['btford.socket-io'])

    .controller("chatController", function (socket) {
        socket.connect();


        var scope = this;


        scope.tester = "You will see some sausages today";

        scope.messageList = [];
        scope.userList = [];

        socket.on('init', function (data) {
            scope.userList = data.users;
        });

        socket.on('msg', function(msg){
          console.log("back again");
           scope.messageList.push(msg);
        });

        socket.on('users', function(userList){
            scope.userList = userList;
        })

        scope.sendMessage = function(){
            socket.emit('sendMsg', {
                msg: scope.msg
            });
        }

        scope.changeUsername = function(){
            socket.emit('changeUsername', scope.newUsername);
        }
    })
    .factory('socket', function (socketFactory) {
       return socketFactory();
    });