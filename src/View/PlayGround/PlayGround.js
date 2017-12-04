import './PlayGround.scss'
import Canvas from '../../Common/Canvas/Canvas.js';


export default class PlayGround extends Canvas {

    constructor(config) {

        super(config);

        this.container.classList.add("play__ground");

    }

}