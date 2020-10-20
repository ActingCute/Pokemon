//猪脚脚本

const { ccclass } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    brendan: cc.TypeScript = null;
    resource: cc.SpriteFrame = null;
    key: number = 0; //第几帧动画


    onLoad() {
        //加载猪脚
        let _this = this;
        this.brendan = this.node.getComponent("spirit");
        cc.log("this.brendan -- ", this.brendan)
        this.brendan.schedule(function () {
            _this.addSpirit();
        }, 1);
    }

    addSpirit() {
        this.key++;
        if (this.key > 2) {
            this.key = 1
        }
        let that = this;
        this.brendan.loadLmg("img/people/brendan", 6 + this.key * 18, 6, 18, 25, 2, that.resource, function (err, resource: cc.SpriteFrame) {
            //cc.log("has err -- ", err)
            if (!err && !that.resource) {
                that.resource = resource;
            }
        })
    }

    start() {

    }

    // update (dt) {}
}
