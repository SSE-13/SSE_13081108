var events;
(function (events) {
    var EventCore = (function () {
        function EventCore() {
            var _this = this;
            this.onStageClick = function (e) {
                //获取舞台坐标
                var stageClickedPoint = new math.Point(e.offsetX, e.offsetY);
                for (var i = 0; i < _this.eventInfos.length; i++) {
                    var info = _this.eventInfos[i];
                    var globalMatrix = info.displayObject.globalMatrix;
                    //思考，invert 是什么意思？对应线性代数的什么概念？为什么要做这一步？
                    var invertGlobalMatrix = math.invertMatrix(globalMatrix);
                    var newPoint = math.pointAppendMatrix(stageClickedPoint, invertGlobalMatrix);
                    //如果检测返回true，则认为点中了
                    if (info.hitTest(newPoint, info.displayObject)) {
                        info.onClick();
                        break;
                    }
                }
            };
        }
        EventCore.prototype.init = function () {
            this.eventInfos = [];
            var canvas = document.getElementById("game");
            canvas.addEventListener("click", this.onStageClick);
        };
        EventCore.prototype.register = function (displayObject, hitTest, onClick) {
            this.eventInfos.push({ displayObject: displayObject, hitTest: hitTest, onClick: onClick }); //加到数组里
        };
        return EventCore;
    }());
    events.EventCore = EventCore;
})(events || (events = {}));
//# sourceMappingURL=events.js.map