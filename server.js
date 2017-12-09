var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var nanoid = require("nanoid");

var store = {

}

io.sockets.on('connection', function (client) {

    client.on('new player', function ({
        room,
        nickname
    }) {

        if (store[room]) {

            client.join(room);

            client.on("disconnect", function () {

                client.leave(room);
                delete store[room][nickname]

                io.sockets.in(room).emit(prefix("disconnect"));

            });

            var prefix = (eventName) => {
                return nickname + "-" + eventName;
            }

            ['start', 'move', 'end'].forEach(function (tail) {
                var eventName = "touch" + tail;
                client.on(prefix(eventName), function (touches) {
                    io.sockets.in(room).emit(prefix(eventName), touches);
                });
            })

            client.on(prefix("open fire"), function () {
                io.sockets.in(room).emit(prefix("open fire"));
            })

            // prefix ?
            client.emit("connected");


            if (store[room][nickname]) {
                // io.sockets.in(room).emit("player reconnected", nickname, {
                //     pos,
                //     angle
                // } = store[room][nickname]);
            } else {
                store[room][nickname] = {};
                io.sockets.in(room).emit("new player", nickname);
            }

        } else {

            client.emit("ctrl error", {
                msg: "room does not exists"
            });

        }

    });

    client.on('new viewer', function (room) {

        // if (store[room]) {

        //     client.emit("view error", {
        //         msg: "this room id used"
        //     });

        // } else {

        client.join(room);

        client.on("disconnect", function () {
            // console.log("remove", room)
            // delete store[room]
            // client.leave(room);
        });

        store[room] = store[room] || {};

        // console.log(room, store[room])

        client.emit("viewer conntected", store[room])

        client.on('update pos & angle', function (nickname, {
            pos,
            angle
        }) {

            Object.assign(store[room][nickname] || {}, {
                pos,
                angle
            });

        })

        // }

    });

    // client.on('join', function (room, identity) {

    //     store[room] = store[room] || {};
    //     store[room][identity] = store[room][identity] ? store[room][identity] + 1 : 1;

    //     client.emit(identity + " - connected", {
    //         pos: store[room].pos,
    //         angle: store[room].angle
    //     });



    // })

    // client.on("leave", function (room) {
    //     console.log("a user leave", room);
    //     client.leave(room);
    // });

});


app.use(/^[^<view|controller>]+$/, function (req, res) {

    // res.sendFile(`${__dirname}/assets/index.html`);
    res.redirect("/view/" + nanoid(10))

});

app.use("/assets", express.static('assets'));


app.use('/view/:room/', function (req, res) {

    var room = req.params.room;

    res.sendFile(`${__dirname}/assets/view.html`);

});

app.use('/controller/:room/', function (req, res) {

    var room = req.params.room;

    res.sendFile(`${__dirname}/assets/controller.html`);

});


http.listen(process.env.PORT || 8080, function () {
    console.log('listening on *:' + (process.env.PORT || 8080));
});