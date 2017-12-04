import './Canvas.scss'

export default class Canvas {

    constructor(config) {

        config = config || {};

        this.width = config.width || innerWidth;
        this.height = config.height || innerHeight;

        this.halfWidth = innerWidth / 2;
        this.halfHeight = innerHeight / 2;

        var canvas = this.canvas = document.createElement('canvas');
        var container = this.container = document.createElement('div');
        var context = this.context = canvas.getContext('2d');

        context.strokeStyle = "#ffffff";
        context.lineWidth = 2;

        container.appendChild(canvas);

        this.reset();

        document.body.appendChild(container);

    }

    reset() {

        var dimension = this.dimension();

        this.canvas.width = this.width;
        this.canvas.height = this.height;

        scrollTo(0, 0);

    }

    dimension() {
        return Math.min(innerWidth, innerHeight);
    }

}