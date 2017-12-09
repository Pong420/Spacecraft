import './UI.scss'
import html from '../../Common/Html/Html.js'

export default class UI {

    constructor(config) {

        var navigation = this.navigation = html.parse(`<div class="navigation"></div>`);

        navigation.appendChild(this.fullscreen());
        navigation.appendChild(this.refersh());

        document.body.appendChild(navigation);

    }

    fullscreen() {

        var trigger = html.parse(
            `<div class="toggle__fullscreen">
                <svg height="100%" version="1.1" viewBox="0 0 36 36" width="100%">
                    <path d="m 10,16 2,0 0,-4 4,0 0,-2 L 10,10 l 0,6 0,0 z"></path>
                    <path d="m 20,10 0,2 4,0 0,4 2,0 L 26,10 l -6,0 0,0 z"></path>
                    <path d="m 24,24 -4,0 0,2 L 26,26 l 0,-6 -2,0 0,4 0,0 z"></path>
                    <path d="M 12,20 10,20 10,26 l 6,0 0,-2 -4,0 0,-4 0,0 z"></path>
                    <path d="m 14,14 -4,0 0,2 6,0 0,-6 -2,0 0,4 0,0 z"></path>
                    <path d="m 22,14 0,-4 -2,0 0,6 6,0 0,-2 -4,0 0,0 z"></path>
                    <path d="m 20,26 2,0 0,-4 4,0 0,-2 -6,0 0,6 0,0 z"></path>
                    <path d="m 10,22 4,0 0,4 2,0 0,-6 -6,0 0,2 0,0 z"></path>
                </svg>
            </div>`
        );

        var doc = window.document;
        var docEl = doc.documentElement;

        var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
        var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

        if (requestFullScreen) {
            trigger.addEventListener("click", function () {

                if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
                    this.classList.add("on");
                    requestFullScreen.call(docEl);
                } else {
                    this.classList.remove("on");
                    cancelFullScreen.call(doc);
                }

            });
        } else {
            trigger.style.display = "none";
        }

        return trigger;

    }

    refersh() {

        var trigger = html.parse(
            `<div class="refersh">F5</div>`
        );

        trigger.addEventListener("click", function () {
            location.reload();
        });

        return trigger;

    }

    register(room) {

        var container = html.parse(
            `<div class="register__container">
                <form onsumit="window.location.href = '/controller/0lL573~NyL/#/qweqweqweqwe/'; return false;">
                    <div class="input">
                        <label>Nick Name : </label>
                        <input type="text" name="nickname" required/>
                    </div>
                    <button type="submit" class="button">Submit</button>
                </form>
            </div>`
        );

        container.querySelector("form").onsubmit = function (evt) {

            evt.preventDefault();

            var nickname = container.querySelector('input[name="nickname"]').value;
            if (nickname) {

                var endWidthSlash = location.href.slice(-1) === "/"
                location.href = "/controller/" + room + "/#/" + nickname + "/";
                endWidthSlash && location.reload();

            }

            return false;

        }

        document.body.appendChild(container);

    }

}