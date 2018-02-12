/*! JSMaps v3.1.3, 2017-11-28 */

!function () {
    "use strict";
    function o(o) {
        for (var e = o.offsetLeft, t = o.offsetTop; o.offsetParent && o !== document.getElementsByTagName("body")[0];)e += o.offsetParent.offsetLeft, t += o.offsetParent.offsetTop, o = o.offsetParent;
        return [e, t]
    }

    function e(e, t) {
        var r, n, i;
        return e.pageX || e.pageY ? (r = e.pageX, n = e.pageY) : (r = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft, n = e.clientY + document.body.scrollTop + document.documentElement.scrollTop), i = o(t), r -= i[0], n -= i[1], {
            x: r,
            y: n
        }
    }

    var t = {
        enable: function () {
            this.enabled = !0
        }, disable: function () {
            this.enabled = !1
        }, zoomIn: function (o) {
            this.applyZoom(o)
        }, zoomOut: function (o) {
            this.applyZoom(o > 0 ? -1 * o : o)
        }, zoomReset: function () {
            this.resetZoom()
        }, pan: function (o, e) {
            this.applyPan(-1 * o, -1 * e)
        }, isDragging: function () {
            return this.dragTime > this.dragThreshold
        }, getCurrentPosition: function () {
            return this.currPos
        }, getCurrentZoom: function () {
            return this.currZoom
        }
    }, r = function (o, t) {
        function r() {
            l.currPos.x = l.currPos.x + f, l.currPos.y = l.currPos.y + p;
            var o = h.originWidth * (1 - l.currZoom * h.zoomStep), e = h.originHeight * (1 - l.currZoom * h.zoomStep);
            l.currPos.x < 0 ? l.currPos.x = 0 : l.currPos.x > h.originWidth * l.currZoom * h.zoomStep && (l.currPos.x = h.originWidth * l.currZoom * h.zoomStep), l.currPos.y < 0 ? l.currPos.y = 0 : l.currPos.y > s.height * l.currZoom * h.zoomStep && (l.currPos.y = s.height * l.currZoom * h.zoomStep), s.setViewBox(l.currPos.x, l.currPos.y, o, e), h.displayViewBox && (c.parentNode.querySelector(".jsmaps-viewbox-data .xPos").innerHTML = "X: " + Math.round(l.currPos.x), c.parentNode.querySelector(".jsmaps-viewbox-data .yPos").innerHTML = "Y: " + Math.round(l.currPos.y), c.parentNode.querySelector(".jsmaps-viewbox-data .zoom").innerHTML = "Zoom: " + l.currZoom)
        }

        function n(o) {
            if (!l.enabled)return !1;
            var t = window.event || o, n = s.width * (1 - l.currZoom * h.zoomStep),
                i = s.height * (1 - l.currZoom * h.zoomStep), u = e(t, c);
            return f = n * (u.x - d.x) / s.width * -1, p = i * (u.y - d.y) / s.height * -1, d = u, r(), l.dragTime += 1, t.preventDefault ? t.preventDefault() : t.returnValue = !1, !1
        }

        function i(o, e) {
            if (!l.enabled)return !1;
            l.currZoom += o, l.currZoom < h.minZoom ? l.currZoom = h.minZoom : l.currZoom > h.maxZoom ? l.currZoom = h.maxZoom : (e = e || {
                    x: s.width / 2,
                    y: s.height / 2
                }, f = s.width * h.zoomStep * (e.x / s.width) * o, p = s.height * h.zoomStep * (e.y / s.height) * o, r())
        }

        function u() {
            if (!l.enabled)return !1;
            l.currZoom = f = p = 0, r()
        }

        function a(o) {
            if (!l.enabled)return !1;
            var t = window.event || o, r = t.detail || -1 * t.wheelDelta, n = e(t, c);
            return r > 0 ? r = -1 : r < 0 && (r = 1), i(r, n), t.preventDefault ? t.preventDefault() : t.returnValue = !1, !1
        }

        function m(o, e) {
            f = o, p = e, r()
        }

        var s = o, c = s.canvas.parentNode, l = this, h = {}, d = {x: 0, y: 0}, f = 0, p = 0,
            g = /Firefox/i.test(navigator.userAgent) ? "DOMMouseScroll" : "mousewheel";
        this.enabled = !1, this.dragThreshold = 5, this.dragTime = 0, t = t || {}, h.displayViewBox = t.displayViewBox || !1, h.maxZoom = t.maxZoom || 9, h.minZoom = t.minZoom || 0, h.zoomStep = t.zoomStep || .1, h.initialZoom = t.initialZoom || 0, h.initialPosition = t.initialPosition || {
                x: 0,
                y: 0
            }, h.originWidth = t.originSize.width || s.width, h.originHeight = t.originSize.height || s.height, this.currZoom = h.initialZoom, this.currPos = h.initialPosition, this.applyZoom = i, this.resetZoom = u, r(), c.onmousedown = function (o) {
            var t = window.event || o;
            return !!l.enabled && (l.dragTime = 0, d = e(t, c), c.className += " grabbing", c.onmousemove = n, document.onmousemove = function () {
                    return !1
                }, document.onmouseup = c.onmouseup, t.preventDefault ? t.preventDefault() : t.returnValue = !1, !1)
        }, c.onmouseup = function (o) {
            document.onmousemove = null, c.className = c.className.replace(/(?:^|\s)grabbing(?!\S)/g, ""), c.onmousemove = null
        }, c.attachEvent ? c.attachEvent("on" + g, a) : c.addEventListener && c.addEventListener(g, a, !1), this.applyPan = m
    };
    r.prototype = t, Raphael.fn.panzoom = {}, Raphael.fn.panzoom = function (o) {
        return new r(this, o)
    }
}();
