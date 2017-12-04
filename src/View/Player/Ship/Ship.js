import './Ship.scss'
import Vector2 from '../../../Common/Vector2/Vector2.js';
import html from '../../../Common/Html/html.js'

export default class Ship {

    constructor({
        x,
        y
    }, angle) {

        var container = this.container = html.parse(
            `<div class="player">
                <canvas></canvas>
                <div class="nickname"></div>
            </div>`
        );
        var canvas = this.canvas = container.querySelector("canvas");
        var nickname = this.nickname = container.querySelector(".nickname");
        var size = this.size = 48;

        this.counter = 0;

        this.angle = angle || 0;

        this.pos = new Vector2(x, y);
        this.vel = new Vector2(0, 0);
        this.targetVel = new Vector2(0, 0);
        this.temp = new Vector2(0, 0);
        this.thrustSize = 0;

        canvas.classList.add("ship");

        canvas.width = size;
        canvas.height = size;
        container.style.zIndex = 1;

        this.context = canvas.getContext('2d');

    }

    update() {

        var {
            pos
        } = this;

        let maxSpeed = 30;

        if (this.targetVel.isMagGreaterThan(maxSpeed)) {
            this.targetVel.normalise();
            this.targetVel.multiplyEq(maxSpeed);
        }

        if (!this.targetVel.equals(this.vel)) {

            this.temp.copyFrom(this.targetVel);
            this.temp.minusEq(this.vel);

            if (this.temp.isMagGreaterThan(0.001)) {
                this.temp.multiplyEq(0.3)
            }

            this.vel.plusEq(this.temp);

        }

        pos.plusEq(this.vel);

        this.pos = pos;

        if (this.vel.isMagGreaterThan(0)) {
            this.angle = this.vel.angle()
        }

        //if(thrustSize>0) thrustSize--; 
        this.thrustSize = this.vel.magnitude();

    }

    draw(x, y) {

        let {
            container,
            canvas,
            context,
            thrustSize,
            size
        } = this;

        context.clearRect(0, 0, size, size);
        context.fillStyle = "rgba(255,255,255,0.5)";
        context.save();
        context.translate(size / 2, size / 2);

        context.strokeStyle = "#fff";
        context.lineWidth = 2;

        context.beginPath();
        context.moveTo(-10, -10);
        context.lineTo(-10, 10);
        context.lineTo(16, 0);
        context.closePath();
        context.stroke();

        if (thrustSize > 0) {

            context.beginPath();
            context.moveTo(-10, -6);

            context.lineTo(-10 - (thrustSize / ((this.counter % 2) + 1)), 0);

            context.lineTo(-10, 6);
            context.stroke();

            this.counter++;

        }

        context.restore();

        var posx = (typeof x == 'undefined') ? Math.round(this.pos.x - (size / 2)) : Math.round(x - (size / 2));
        var posy = (typeof y == 'undefined') ? Math.round(this.pos.y - (size / 2)) : Math.round(y - (size / 2));

        if (typeof x !== 'undefined' && typeof y !== 'undefined') {
            this.pos.x = x;
            this.pos.y = y;
        }

        trasnform(container, "translate3d(" + posx + "px, " + posy + "px, 0px)")
        trasnform(canvas, "rotate(" + this.angle + "deg)")

        container.style.display = "block";

    }

}

function trasnform(el, value) {
    el.style.webkitTransform = el.style.transform = value;
}