module.exports = function (io) {

    var userList = new Map();
    var users = [];


    io.on('connection', function (socket) {
        var username = "anonymous" + Math.floor(Math.random() * (100000));
        users.push(username);
        socket.username = username;

        io.emit('init', {
            users: users
        });

        socket.on('sendMsg', function (msg) {
            var d = new Date();
            var i = "Time: "+d.getHours()+":"+ d.getMinutes() + ":"+ d.getSeconds();
                io.emit('msg', {msg: msg.msg, username: socket.username, timestamp: i});

        });

        socket.on('changeUsername', function (username) {
            var index = users.indexOf(socket.username);
            users.splice(index, index + 1, username);
            socket.username = username;
            io.emit('users', users);
        })

        socket.on('disconnect', function () {
            console.log("disconnected");
            var index = users.indexOf(socket.username);
            users.splice(index, index + 1);
            io.emit('users', users);
        });

    });


}
