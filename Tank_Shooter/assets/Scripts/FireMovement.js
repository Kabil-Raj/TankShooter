// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

var player = require ('Player');
cc.Class({
    extends: cc.Component,

    properties  : {

        playerTank : {
            default : null,
            type : player,
        }
       
    },



    // LIFE-CYCLE CALLBACKS:

    //  onLoad () {},

    start () {
        this.playerTank = cc.find('GameRoot/player_tank').getComponent('Player');
        cc.director.getCollisionManager().enabled = true;
    },

    onCollisionEnter() {
        this.node.destroy();
    },



    //  update (dt) {

    //  },
});


