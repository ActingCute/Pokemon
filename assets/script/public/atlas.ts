const { ccclass, property } = cc._decorator;

@ccclass
export default class _atlas extends cc.Component {

    @property([cc.SpriteAtlas])
    atlas: cc.SpriteAtlas = null;

    frames: cc.SpriteFrame[] = [];
    sprite: cc.Sprite = null;//精灵组件
    index: number = 0; //当前显示第n张图片
    interval: number = 0.2;//定时器间隔

    statrIndex: number = 0;//开始显示的key
    endIndex: number = 0;//结束的key

    defaultIndex: number = 0;//停止计时器时候显示的key

    callBack: Function = null; //动画执行后再执行的函数

    onLoad() {
        this.sprite = this.node.getComponent(cc.Sprite);
        //从图集中获取所有帧图片
        if (this.atlas && this.sprite) {
            this.frames = this.atlas.getSpriteFrames();
            this.schedule(this.onTimer, this.interval);
        }
    }

    onTimer() {
        if (this.frames.length == 0) return;
        if (this.index > this.endIndex) this.index = this.statrIndex;
        this.sprite.spriteFrame = this.frames[this.index++];
        if (this.callBack) {
            this.callBack();
        }
    }

    stopTimer() {
        this.unschedule(this.onTimer);
        this.sprite.spriteFrame = this.frames[this.defaultIndex];
    }

    onDestroy() {
        this.unschedule(this.onTimer);
    }

    startAtlas(start: number, end: number, defaultIndex: number, interval: number, callBack) {
        if (interval) this.interval = interval;
        this.defaultIndex = defaultIndex;
        this.statrIndex = start;
        this.index = start;
        this.endIndex = end;
        if (start == end) {
            //只显示一帧
            this.stopTimer();
        } else {
            this.schedule(this.onTimer, this.interval);
        }
        this.callBack = callBack;
    }

    // update (dt) {}
}
