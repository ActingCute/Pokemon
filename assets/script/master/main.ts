//猪脚脚本

const { ccclass } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    brendan: cc.TypeScript = null;

    speed: number = 0.5; //移动速度
    direstion: cc.Vec2 = null;
    stop: boolean = false;

    onLoad() {
        this.brendan = this.node.getComponent("atlas");
        this.brendan.startAtlas(12, 12, 12, 0.2);
    }

    addSpirit(degree: number, direstion: cc.Vec2) {
        this.direstion = direstion;
        //判断方向
        if (45 <= degree && degree <= 135) {
            //向上
            cc.log("master 向上");
            this.brendan.startAtlas(12, 15, 12, 0.2);
        } else if (135 <= degree && degree <= 225) {
            //向左
            cc.log("master 向左");
            this.brendan.startAtlas(4, 7, 4, 0.2);
        } else if (225 <= degree && degree <= 315) {
            //向下
            cc.log("master 向下");
            this.brendan.startAtlas(0, 3, 0, 0.2);
        } else {
            //向右
            cc.log("master 向右");
            this.brendan.startAtlas(8, 11, 8, 0.2);
        }

    }

    start() {

    }

    update(dt) {
        if (this.direstion) {
            if (!this.direstion || this.stop) return;
            let pos: cc.Vec2 = this.node.getPosition();
            pos.x += this.direstion.x * this.speed;
            pos.y += this.direstion.y * this.speed;
            this.node.setPosition(pos);
        }
    }
}
