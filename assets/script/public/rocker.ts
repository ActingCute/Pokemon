const { ccclass, property } = cc._decorator;

@ccclass
export default class _masterMove extends cc.Component {

    brendan: cc.TypeScript = null;
    resource: cc.SpriteFrame = null;
    key: number = 0; //第几帧动画

    speed: number = 3; //移动速度
    direstion: cc.Vec2 = null;
    stop: boolean = true;

    masterScript: cc.Node = null;//猪脚  

    onLoad() {
        let master = cc.find("Canvas/master");
        this.masterScript = master.getComponent("main");
        this.node.on(cc.Node.EventType.TOUCH_START, this.onKeyDwn, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onKeyDwn, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onKeyUp, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onKeyUp, this);
    }

    onKeyUp(e: cc.Event.EventTouch) {
        this.masterScript.stopSpirit();
    }

    onKeyDwn(e: cc.Event.EventTouch) {

        this.stop = false;
        let localPos = this.node.convertToNodeSpaceAR(e.getLocation());
        let { x, y } = localPos;

        let startPos: cc.Vec2 = this.node.convertToWorldSpaceAR(new cc.Vec2(0, 0));
        let endPos: cc.Vec2 = e.getLocation();

        let dirVec = endPos.sub(startPos);//获得从startPos指向endPos的方向向量
        let comVec = new cc.Vec2(1, 0);//计算夹角的参考方向，这里选择x轴正方向
        let radian = dirVec.signAngle(comVec);//获得带方向的夹角弧度值(参考方向顺时针为正值，逆时针为负值)
        let degree = -(Math.floor(cc.misc.radiansToDegrees(radian)));

        cc.log("x角度：", degree)

        if (degree < 0)
            degree = 360 + degree
        cc.log("x角度：", degree)

        //判断方向
        if (45 <= degree && degree <= 135) {
            //向上
            cc.log("向上");
            this.direstion = cc.v2(0, 1);
        } else if (135 <= degree && degree <= 225) {
            //向左
            cc.log("向左");
            this.direstion = cc.v2(-1, 0);
        } else if (225 <= degree && degree <= 315) {
            //向下
            cc.log("向下");
            this.direstion = cc.v2(0, -1);
        } else {
            //向右
            cc.log("向右");
            this.direstion = cc.v2(1, 0);
        }
        this.masterScript.addSpirit(degree, this.direstion);

    }

    start() {

    }
}
