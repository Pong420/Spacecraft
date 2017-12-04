import Vector2 from '../../../Common/Vector2/Vector2.js';

var speed = 10;

export default class Bullet {

    constructor(x, y, angle) {
        this.reset(x, y, angle);
    }

    update() {

        this.pos.plusEq(this.vel);
        this.life--;

        if (this.life < 0) {
            this.enabled = false
        };

    }

    draw(context) {

        if (!this.enabled) {
            return
        };

        context.lineWidth = 2;
        context.strokeStyle = "#fff";
        context.beginPath();
        context.arc(this.pos.x, this.pos.y, 2, 0, Math.PI * 2, true);
        context.stroke();

    }

    reset(x, y, angle) {

        this.pos = new Vector2(x, y);
        var unitv = new Vector2(1, 0);

        // instead set Vector with speed and rotate
        unitv.rotate(angle);

        this.vel = unitv.clone();
        this.vel.multiplyEq(speed);

        unitv.multiplyEq(10);
        this.pos.plusEq(unitv);

        this.enabled = true;

        this.life = 50;

    }

}