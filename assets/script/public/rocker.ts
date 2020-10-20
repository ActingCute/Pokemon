const { ccclass, property } = cc._decorator;

@ccclass
export default class _masterMove extends cc.Component {

    brendan: cc.TypeScript = null;
    resource: cc.SpriteFrame = null;
    key: number = 0; //第几帧动画

    speed: number = 3; //移动速度
    direstion: cc.Vec2 = null;
    stop: boolean = true;

    runSpirit: cc.Scheduler = null;

    masterScript: cc.Node = null;//猪脚  

    onLoad() {
        let master = cc.find("Canvas/master");
        this.masterScript = master.getComponent("main");
        this.node.on(cc.Node.EventType.TOUCH_START, this.onKeyDwn, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onKeyDwn, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onKeyUp, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onKeyUp, this);
        //cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDwn, this);
        //cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }

    onKeyUp(e: cc.Event.EventTouch) {
        this.stop = true;
        cc.log("清除定时器")
        //this.unschedule(this.addSpirit);
    }

    onKeyDwn(e: cc.Event.EventTouch) {
        cc.log("ok 2", e.getLocation());
        this.stop = false;
        let localPos = this.node.convertToNodeSpaceAR(e.getLocation());
        this.masterScript.addSpirit(localPos);

        // if (e.keyCode == cc.macro.KEY.left) {
        //     //向左走
        //     this.direstion = cc.v2(-1, 0);
        // } else if (e.keyCode == cc.macro.KEY.right) {
        //     //向右走
        //     this.direstion = cc.v2(1, 0);
        // } else if (e.keyCode == cc.macro.KEY.down) {
        //     //向下走
        //     this.direstion = cc.v2(0, -1);
        // } else {
        //     //向上走
        //     this.direstion = cc.v2(0, 1);
        // }
    }

    start() {

    }



    update(dt) {
        // if (!this.direstion || this.stop) return;
        // let pos: cc.Vec2 = this.node.getPosition();
        // pos.x += this.direstion.x * this.speed;
        // pos.y += this.direstion.y * this.speed;
        // this.node.setPosition(pos);
    }
}
