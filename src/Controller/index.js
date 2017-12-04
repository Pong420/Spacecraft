import './index.scss'
import _Controller from './TouchPad/TouchPad.js';
import UI from './UI/UI.js'

const room = location.pathname.split("/")[2];
const nickname = location.hash.split("/")[1];

let socket, Controller;

let ui = new UI();

if (!nickname) {

    ui.register(room);

} else {

    init();

}

function init() {

    socket = io();

    socket.emit('new player', {
        room,
        nickname
    });

    socket.on("connected", function () {

        ["resize", "orientationchange"].forEach(function (event) {
            addEventListener(event, function () {
                Controller.reset();
            });
        });

        Controller = new _Controller({
            width: outerWidth,
            height: outerHeight,
            callbacks: {
                fire,
                start: touchEvent,
                move: touchEvent,
                end: touchEvent,
            }
        });

        console.log("connceted");

    });

    socket.on("ctrl error", ({
        msg
    }) => {
        console.log(msg);
    })

}

function touchEvent(evt, touches) {
    socket.emit(prefix(evt.type), touches);
}

function fire() {
    socket.emit(prefix("open fire"));
}

function prefix(eventName) {
    return nickname + "-" + eventName;
}