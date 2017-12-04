!function(){"use strict";function t(t,e){a.emit(n(t.type),e)}function e(){a.emit(n("open fire"))}function n(t){return p+"-"+t}var i=function(t){t=t||{},this.width=t.width||innerWidth,this.height=t.height||innerHeight,this.halfWidth=innerWidth/2,this.halfHeight=innerHeight/2;var e=this.canvas=document.createElement("canvas"),n=this.container=document.createElement("div"),i=this.context=e.getContext("2d");i.strokeStyle="#ffffff",i.lineWidth=2,n.appendChild(e),this.reset(),document.body.appendChild(n)};i.prototype.reset=function(){this.dimension();this.canvas.width=this.width,this.canvas.height=this.height,scrollTo(0,0)},i.prototype.dimension=function(){return Math.min(innerWidth,innerHeight)};var o=function(t,e){this.x=t||0,this.y=e||0};o.prototype.reset=function(t,e){return this.x=t,this.y=e,this},o.prototype.toString=function(t){t=t||3;var e=Math.pow(10,t);return"["+Math.round(this.x*e)/e+", "+Math.round(this.y*e)/e+"]"},o.prototype.clone=function(){return new o(this.x,this.y)},o.prototype.copyTo=function(t){t.x=this.x,t.y=this.y},o.prototype.copyFrom=function(t){this.x=t.x,this.y=t.y},o.prototype.magnitude=function(){return Math.sqrt(this.x*this.x+this.y*this.y)},o.prototype.magnitudeSquared=function(){return this.x*this.x+this.y*this.y},o.prototype.normalise=function(){var t=this.magnitude();return this.x=this.x/t,this.y=this.y/t,this},o.prototype.reverse=function(){return this.x=-this.x,this.y=-this.y,this},o.prototype.plusEq=function(t){return this.x+=t.x,this.y+=t.y,this},o.prototype.plusNew=function(t){return new o(this.x+t.x,this.y+t.y)},o.prototype.minusEq=function(t){return this.x-=t.x,this.y-=t.y,this},o.prototype.minusNew=function(t){return new o(this.x-t.x,this.y-t.y)},o.prototype.multiplyEq=function(t){return this.x*=t,this.y*=t,this},o.prototype.multiplyNew=function(t){return this.clone().multiplyEq(t)},o.prototype.divideEq=function(t){return this.x/=t,this.y/=t,this},o.prototype.divideNew=function(t){return this.clone().divideEq(t)},o.prototype.dot=function(t){return this.x*t.x+this.y*t.y},o.prototype.angle=function(t){return Math.atan2(this.y,this.x)*(t?1:r.TO_DEGREES)},o.prototype.rotate=function(t,e){var n=Math.cos(t*(e?1:r.TO_RADIANS)),i=Math.sin(t*(e?1:r.TO_RADIANS));return r.temp.copyFrom(this),this.x=r.temp.x*n-r.temp.y*i,this.y=r.temp.x*i+r.temp.y*n,this},o.prototype.equals=function(t){return this.x==t.x&&this.y==t.x},o.prototype.isCloseTo=function(t,e){return!!this.equals(t)||(r.temp.copyFrom(this),r.temp.minusEq(t),r.temp.magnitudeSquared()<e*e)},o.prototype.rotateAroundPoint=function(t,e,n){r.temp.copyFrom(this),r.temp.minusEq(t),r.temp.rotate(e,n),r.temp.plusEq(t),this.copyFrom(r.temp)},o.prototype.isMagLessThan=function(t){return this.magnitudeSquared()<t*t},o.prototype.isMagGreaterThan=function(t){return this.magnitudeSquared()>t*t};var r={TO_DEGREES:180/Math.PI,TO_RADIANS:Math.PI/180,temp:new o},s=function(t){function e(e){t.call(this,e),this.leftTouchID=-1,this.leftTouchPos=new o(0,0),this.leftTouchStartPos=new o(0,0),this.leftVector=new o(0,0),this.touchable=!0,this.touches=[],this.callbacks=e.callbacks,this.canvas.addEventListener("touchstart",this.onTouchStart.bind(this),!1),this.canvas.addEventListener("touchmove",this.onTouchMove.bind(this),!1),this.canvas.addEventListener("touchend",this.onTouchEnd.bind(this),!1),setInterval(this.draw.bind(this),1e3/35)}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.draw=function(){var t=this,e=this,n=e.canvas,i=e.context;if(i.clearRect(0,0,n.width,n.height),this.touchable)for(var o=0;o<this.touches.length;o++){var r=t.touches[o];r.identifier==t.leftTouchID?(i.beginPath(),i.strokeStyle="#FFF",i.lineWidth=6,i.arc(t.leftTouchStartPos.x,t.leftTouchStartPos.y,40,0,2*Math.PI,!0),i.stroke(),i.beginPath(),i.strokeStyle="#FFF",i.lineWidth=2,i.arc(t.leftTouchStartPos.x,t.leftTouchStartPos.y,60,0,2*Math.PI,!0),i.stroke(),i.beginPath(),i.strokeStyle="#FFF",i.arc(t.leftTouchPos.x,t.leftTouchPos.y,40,0,2*Math.PI,!0),i.stroke()):(i.beginPath(),i.beginPath(),i.strokeStyle="red",i.lineWidth="6",i.arc(r.clientX,r.clientY,40,0,2*Math.PI,!0),i.stroke())}},e.prototype.onTouchStart=function(t){for(var e=this,n=0;n<t.changedTouches.length;n++){var i=t.changedTouches[n];e.leftTouchID<0&&i.clientX<e.halfWidth?(e.leftTouchID=i.identifier,e.leftTouchStartPos.reset(i.clientX,i.clientY),e.leftTouchPos.copyFrom(e.leftTouchStartPos),e.leftVector.reset(0,0)):e.callbacks.fire()}this.touches=t.touches,this.callbacks.start(t,{x:this.leftVector.x,y:this.leftVector.y})},e.prototype.onTouchMove=function(t){var e=this;t.preventDefault();for(var n=0;n<t.changedTouches.length;n++){var i=t.changedTouches[n];if(e.leftTouchID==i.identifier){e.leftTouchPos.reset(i.clientX,i.clientY),e.leftVector.copyFrom(e.leftTouchPos),e.leftVector.minusEq(e.leftTouchStartPos);break}}this.touches=t.touches,this.callbacks.move(t,{x:this.leftVector.x,y:this.leftVector.y})},e.prototype.onTouchEnd=function(t){var e=this;this.touches=t.touches;for(var n=0;n<t.changedTouches.length;n++){var i=t.changedTouches[n];if(e.leftTouchID==i.identifier){e.leftTouchID=-1,e.leftVector.reset(0,0);break}}this.callbacks.end(t,{x:this.leftVector.x,y:this.leftVector.y})},e}(i),h={parse:function(t){var e=document.createElement("div");return e.innerHTML=t,e.firstElementChild}},c=function(t){var e=this.navigation=h.parse('<div class="navigation"></div>');e.appendChild(this.fullscreen()),e.appendChild(this.refersh()),document.body.appendChild(e)};c.prototype.fullscreen=function(){var t=h.parse('<div class="toggle__fullscreen">\n                <svg height="100%" version="1.1" viewBox="0 0 36 36" width="100%">\n                    <path d="m 10,16 2,0 0,-4 4,0 0,-2 L 10,10 l 0,6 0,0 z"></path>\n                    <path d="m 20,10 0,2 4,0 0,4 2,0 L 26,10 l -6,0 0,0 z"></path>\n                    <path d="m 24,24 -4,0 0,2 L 26,26 l 0,-6 -2,0 0,4 0,0 z"></path>\n                    <path d="M 12,20 10,20 10,26 l 6,0 0,-2 -4,0 0,-4 0,0 z"></path>\n                    <path d="m 14,14 -4,0 0,2 6,0 0,-6 -2,0 0,4 0,0 z"></path>\n                    <path d="m 22,14 0,-4 -2,0 0,6 6,0 0,-2 -4,0 0,0 z"></path>\n                    <path d="m 20,26 2,0 0,-4 4,0 0,-2 -6,0 0,6 0,0 z"></path>\n                    <path d="m 10,22 4,0 0,4 2,0 0,-6 -6,0 0,2 0,0 z"></path>\n                </svg>\n            </div>'),e=window.document,n=e.documentElement,i=n.requestFullscreen||n.mozRequestFullScreen||n.webkitRequestFullScreen||n.msRequestFullscreen,o=e.exitFullscreen||e.mozCancelFullScreen||e.webkitExitFullscreen||e.msExitFullscreen;return i?t.addEventListener("click",function(){e.fullscreenElement||e.mozFullScreenElement||e.webkitFullscreenElement||e.msFullscreenElement?(this.classList.remove("on"),o.call(e)):(this.classList.add("on"),i.call(n))}):t.style.display="none",t},c.prototype.refersh=function(){var t=h.parse('<div class="refersh">F5</div>');return t.addEventListener("click",function(){location.reload()}),t},c.prototype.register=function(t){var e=h.parse('<div class="register__container">\n                <form onsumit="window.location.href = \'/controller/0lL573~NyL/#/qweqweqweqwe/\'; return false;">\n                    <div class="input">\n                        <label>Nick Name : </label>\n                        <input type="text" name="nickname" required/>\n                    </div>\n                    <button type="submit" class="button">Submit</button>\n                </form>\n            </div>');e.querySelector("form").onsubmit=function(n){n.preventDefault();var i=e.querySelector('input[name="nickname"]').value;if(i){var o="/"===location.href.slice(-1);location.href="/controller/"+t+"/#/"+i+"/",o&&location.reload()}return!1},document.body.appendChild(e)};var a,u,l=location.pathname.split("/")[2],p=location.hash.split("/")[1],d=new c;p?function(){a=io(),a.emit("new player",{room:l,nickname:p}),a.on("connected",function(){["resize","orientationchange"].forEach(function(t){addEventListener(t,function(){u.reset()})}),u=new s({width:outerWidth,height:outerHeight,callbacks:{fire:e,start:t,move:t,end:t}}),console.log("connceted")}),a.on("ctrl error",function(t){var e=t.msg;console.log(e)})}():d.register(l)}();
