// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        score : 0,

        scoreDisplay : {
            default : null,
            type : cc.Label,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    //  onLoad () { },

    scoreUpdate(points) {
        this.score += points;
        this.scoreDisplay.string = "Score : " +this.score;
    },

   


    start () {
    },

//    update(dt) {   }
});

