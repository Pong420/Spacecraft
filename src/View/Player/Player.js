import './Player.scss';
import Ship from './Ship/Ship.js'
import Bullet from './Bullet/Bullet.js'

export default class Player extends Ship {

    constructor(pos, angle) {

        super(pos, angle);

        this.bullets = [];
        this.spareBullets = [];

    }

    fire() {

        var bullet;

        if (this.spareBullets.length > 0) {

            bullet = this.spareBullets.pop();
            bullet.reset(this.pos.x, this.pos.y, this.angle);

        } else {

            bullet = new Bullet(this.pos.x, this.pos.y, this.angle);
            this.bullets.push(bullet);
        }

        bullet.vel.plusEq(this.vel);

    }

}