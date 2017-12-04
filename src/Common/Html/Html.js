export default {
    parse: function (html) {
        var parent = document.createElement("div");
        parent.innerHTML = html;
        return parent.firstElementChild;
    }
}