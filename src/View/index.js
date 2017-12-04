import './index.scss'
import _PlayGround from './PlayGround/PlayGround.js'
import _Player from './Player/Player.js'
import Vector2 from '../Common/Vector2/Vector2.js'
import UI from './UI/UI.js'

const socket = io();
const room = location.pathname.split("/")[2];

var {
    container,
    canvas,
    context,
    halfWidth,
    halfHeight,
} = new _PlayGround();

var players = [];

socket.emit('new viewer', room);

socket.on("view error", function ({
    msg
}) {
    console.log(msg)
});

socket.on("viewer conntected", function (_players) {

    var ui = new UI();

    for (var nickname in _players) {
        createPlayer(nickname, _players[nickname]);
    }

    setInterval(players.forEach.bind(players, draw), 1000 / 35);

});

socket.on("new player", createPlayer);

function createPlayer(nickname, savedState) {

    var index = players.length;
    var prefix = (eventName) => {
        return nickname + "-" + eventName;
    }

    var player = Object.keys(savedState || {}).length ?
        new _Player(savedState.pos, savedState.angle) :
        new _Player({
            x: halfWidth,
            y: halfHeight
        });

    player.tempPos = Object.assign({}, player.pos);
    player.tempAngle = player.angle;
    player.canvas.id = player.nickname.textContent = nickname;
    player.leftVector = new Vector2(0, 0);

    ["start", "move", "end"].forEach(function (event) {
        var eventName = "touch" + event;
        socket.on(prefix(eventName), function (touches) {
            player.leftVector = new Vector2(touches.x, touches.y);
        })
    });

    socket.on(prefix("open fire"), function () {
        player.fire();
    })

    socket.on(prefix("disconnect"), function () {
        player.container.remove();
        players.splice(index, 1);
    });

    players.push(player);

    document.body.appendChild(player.container);

}

function draw(player) {

    context.clearRect(0, 0, canvas.width, canvas.height);

    player.targetVel.copyFrom(player.leftVector);
    player.targetVel.multiplyEq(0.2);

    player.update();

    if (player.pos.x < 0) {
        player.pos.x = canvas.width;
    } else if (player.pos.x > canvas.width) {
        player.pos.x = 0;
    };

    if (player.pos.y < 0) {
        player.pos.y = canvas.height;
    } else if (player.pos.y > canvas.height) {
        player.pos.y = 0;
    };

    player.draw();

    if (
        player.tempPos.x !== player.pos.x &&
        player.tempPos.y !== player.pos.y &&
        player.tempAngle !== player.angle) {

        player.tempPos = Object.assign({}, player.pos);
        player.tempAngle = player.angle;

        socket.emit('update pos & angle', player.canvas.id, {
            pos: player.pos,
            angle: player.angle
        });

    }

    for (var i = 0; i < player.bullets.length; i++) {

        var bullet = player.bullets[i];

        if (bullet.enabled) {
            bullet.update();
            bullet.draw(context);
        } else {
            player.spareBullets.push(bullet);
        }
        
    }

}