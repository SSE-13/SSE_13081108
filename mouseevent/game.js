var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var human = new render.DisplayObjectContainer();
human.x = -100;
human.y - 100;
var humanContainer = new render.DisplayObjectContainer();
var head = new render.Bitmap();
head.x = 10;
head.y = -60;
var trunk = new render.Bitmap();
trunk.x = 10;
trunk.y = -40;
var left_arm = new render.Bitmap();
left_arm.x = 10;
left_arm.y = -30;
var right_arm = new render.Bitmap();
right_arm.x = 10;
right_arm.y = -30;
var left_leg = new render.Bitmap();
left_leg.x = 10;
left_leg.y = -30;
var right_leg = new render.Bitmap();
right_leg.x = 10;
right_leg.y = -30;
head.source = "head.png";
trunk.source = "trunk.png";
left_arm.source = "left_arm.png";
right_arm.source = "right_arm.png";
left_leg.source = "left_leg.png";
right_leg.source = "right_leg.png";
humanContainer.addChild(human);
human.addChild(head);
human.addChild(left_arm);
human.addChild(right_arm);
human.addChild(left_leg);
human.addChild(right_leg);
human.addChild(trunk);
var renderCore = new render.RenderCore();
renderCore.start(humanContainer, ["head.png", "left_arm.png", "right_arm.png", "left_leg.png", "right_leg.png", "trunk.png"]);
var HumanBody = (function (_super) {
    __extends(HumanBody, _super);
    function HumanBody() {
        _super.apply(this, arguments);
        this.vx = 5;
        this.srotation = Math.PI / 2;
    }
    HumanBody.prototype.onTicker = function (duringTime) {
        this.x += this.vx * duringTime;
        this.rotation += this.srotation * duringTime;
    };
    return HumanBody;
}(Body));
var ticker = new Ticker();
var body = new HumanBody(humanContainer);
body.vx = 4;
body.y = 200;
ticker.start([body]);
var eventCore = new events.EventCore();
eventCore.init();
var isHead = 0;
var ClickedHead = false;
var isLeg = 0;
var ClickedLeg = false;
var HeadHitTest = function (localPoint, displayObject) {
    console.log(localPoint.x, localPoint.y);
    if (localPoint.x >= 100 && localPoint.x <= 400 && localPoint.y >= 0 && localPoint.y <= 200) {
        ClickedHead == true;
        isHead += 1;
    }
    return ClickedHead;
};
var LegHitTest = function (localPoint, displayObject) {
    // alert (`点击位置为${localPoint.x},${localPoint.y}`);
    if (localPoint.x >= 100 && localPoint.x <= 280 && localPoint.y >= 300 && localPoint.y <= 480 || localPoint.x >= 260 && localPoint.x <= 400 && localPoint.y >= 300 && localPoint.y < +480) {
        isLeg += 1;
        ClickedLeg = true;
    }
    return ClickedLeg;
};
var HeadOnClick = function () {
    if (isHead == 1) {
        if (body.vx != 0) {
            body.vx *= -1;
            body.rotation *= -1;
        }
        if (body.vx == 0) {
            isHead = 0;
        }
    }
    if (isHead != 1) {
        body.vx = 5;
        body.rotation = Math.PI / 2;
        isHead = 0;
    }
    ClickedHead = false;
    console.log("clickhead:" + isHead);
};
var LegOnClick = function () {
    if (isLeg == 1) {
        body.vx = 0;
        body.rotation = 0;
    }
    if (isLeg >= 1) {
        isLeg = 0;
    }
    ClickedLeg = false;
    console.log("clickleg" + isLeg);
};
eventCore.register(head, HeadHitTest, HeadOnClick);
eventCore.register(left_leg, LegHitTest, LegOnClick);
eventCore.register(right_leg, LegHitTest, LegOnClick);
//# sourceMappingURL=game.js.map