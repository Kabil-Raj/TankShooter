// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html


cc.Class({
    extends: cc.Component,

    properties: {

        explosion : {
            default : null,
            type : cc.Prefab,
        },

        
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        cc.director.getCollisionManager().enabled = true;
    },

    onCollisionEnter() {
        var instantiateParticle = cc.instantiate(this.explosion);
        this.node.addChild(instantiateParticle);
        this.scheduleOnce(this.destroyNode,0.2);
    },

    destroyNode() {
        this.node.destroy();
    }

    //  update (dt) {

    //  },
});
