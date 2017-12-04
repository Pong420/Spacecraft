import './TouchPad.scss'
import Canvas from '../../Common/Canvas/Canvas.js';
import Vector2 from '../../Common/Vector2/Vector2.js';

export default class Controller extends Canvas {

    constructor(config) {

        super(config);

        this.leftTouchID = -1;
        this.leftTouchPos = new Vector2(0, 0);
        this.leftTouchStartPos = new Vector2(0, 0);
        this.leftVector = new Vector2(0, 0);

        this.touchable = true;
        this.touches = [];

        this.callbacks = config.callbacks;

        this.canvas.addEventListener('touchstart', this.onTouchStart.bind(this), false);
        this.canvas.addEventListener('touchmove', this.onTouchMove.bind(this), false);
        this.canvas.addEventListener('touchend', this.onTouchEnd.bind(this), false);

        setInterval(this.draw.bind(this), 1000 / 35);

    }

    draw() {

        let {
            canvas,
            context
        } = this;

        context.clearRect(0, 0, canvas.width, canvas.height);

        if (this.touchable) {

            for (var i = 0; i < this.touches.length; i++) {

                var touch = this.touches[i];

                if (touch.identifier == this.leftTouchID) {
                    context.beginPath();
                    context.strokeStyle = "#FFF";
                    context.lineWidth = 6;
                    context.arc(this.leftTouchStartPos.x, this.leftTouchStartPos.y, 40, 0, Math.PI * 2, true);
                    context.stroke();
                    context.beginPath();
                    context.strokeStyle = "#FFF";
                    context.lineWidth = 2;
                    context.arc(this.leftTouchStartPos.x, this.leftTouchStartPos.y, 60, 0, Math.PI * 2, true);
                    context.stroke();
                    context.beginPath();
                    context.strokeStyle = "#FFF";
                    context.arc(this.leftTouchPos.x, this.leftTouchPos.y, 40, 0, Math.PI * 2, true);
                    context.stroke();

                } else {

                    context.beginPath();
                    context.beginPath();
                    context.strokeStyle = "red";
                    context.lineWidth = "6";
                    context.arc(touch.clientX, touch.clientY, 40, 0, Math.PI * 2, true);
                    context.stroke();

                }

            }
        }

    }

    onTouchStart(evt) {

        for (var i = 0; i < evt.changedTouches.length; i++) {

            var touch = evt.changedTouches[i];

            // console.log(touch)

            if ((this.leftTouchID < 0) && (touch.clientX < this.halfWidth)) {
                this.leftTouchID = touch.identifier;
                this.leftTouchStartPos.reset(touch.clientX, touch.clientY);
                this.leftTouchPos.copyFrom(this.leftTouchStartPos);
                this.leftVector.reset(0, 0);
                continue;

            } else {

                this.callbacks.fire();

            }

        }

        this.touches = evt.touches;

        this.callbacks.start(evt, {
            x: this.leftVector.x,
            y: this.leftVector.y
        });

    }

    onTouchMove(evt) {

        evt.preventDefault();

        for (var i = 0; i < evt.changedTouches.length; i++) {
            var touch = evt.changedTouches[i];
            if (this.leftTouchID == touch.identifier) {
                this.leftTouchPos.reset(touch.clientX, touch.clientY);
                this.leftVector.copyFrom(this.leftTouchPos);
                this.leftVector.minusEq(this.leftTouchStartPos);
                break;
            }
        }

        this.touches = evt.touches;

        this.callbacks.move(evt, {
            x: this.leftVector.x,
            y: this.leftVector.y
        });

    }

    onTouchEnd(evt) {

        this.touches = evt.touches;

        for (var i = 0; i < evt.changedTouches.length; i++) {
            var touch = evt.changedTouches[i];
            if (this.leftTouchID == touch.identifier) {
                this.leftTouchID = -1;
                this.leftVector.reset(0, 0);
                break;
            }
        }

        this.callbacks.end(evt, {
            x: this.leftVector.x,
            y: this.leftVector.y
        });

    }

}