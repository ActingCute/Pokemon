//加载切图

const { ccclass } = cc._decorator;

@ccclass
export default class _spirit extends cc.Component {

    resource: cc.SpriteFrame = null;
    prefab: cc.Prefab = null;

    loadLmg(imgSrc: string, x: number, y: number, w: number, h: number, size: number, resource: cc.SpriteFrame, callback: Function) {
        this.resource = resource;
        if (this.resource) {
            //已经加载了，不需要再加载了
            // cc.log("已经加载了，不需要再加载了")
            this.createSprite(x, y, w, h, size, callback);
        } else {
            // cc.log("没加载，需要再加载")
            cc.resources.load(imgSrc, cc.SpriteFrame, function (err, spriteFrame) {
                if (!err) {
                    this.resource = spriteFrame;
                    this.createSprite(x, y, w, h, size, callback);
                } else {
                    cc.error(err);
                    if (callback) {
                        callback(err);
                    }
                }
            }.bind(this));
        }
    }

    createSprite(x: number, y: number, w: number, h: number, size: number, callback: Function) {//新建节点
        var node = new cc.Node();
        var sprite = node.addComponent(cc.Sprite);
        sprite.spriteFrame = this.getSprite(x, y, w, h, size);
        node.setScale(size);
        this.node.addChild(node);
        if (callback) {
            callback(false, this.resource);
        }
    }

    // 获取贴图
    getSprite(x: number, y: number, w: number, h: number, size: number) {
        var sprite = this.resource.clone(); // 克隆一张图片
        var tmpRect = new cc.Rect(x, y, w, h);
        sprite.setRect(tmpRect);   // 设置 SpriteFrame 的纹理矩形区域
        return sprite;
    }
}
