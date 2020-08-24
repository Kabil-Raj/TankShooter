// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

var scoreDisplay = require ('ScoreDisplay');
var player = require ('Player');
cc.Class({
    extends: cc.Component,

    properties: {
        enemy_fire : {
            default : null,
            type : cc.Prefab,
        },

        score : {
            default : null,
            type : scoreDisplay,
        },

        playerTank : {
            default : null,
            type : player,
        },

        enemryFireSound : {
            default : null,
            type : cc.AudioClip,
        },

        blastSound : {
            default : null,
            type : cc.AudioClip,
        },

        explosion : {
            default : null,
            type : cc.Prefab,
        },

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {
    // },


    instantiateFire() {
        var fire = cc.instantiate(this.enemy_fire);
        cc.audioEngine.playEffect(this.enemryFireSound,false);
        this.node.addChild(fire);
        fire.setPosition(cc.v2(this.node.x/6,this.node.y));
        var fireMovement = cc.moveBy(1,this.node.x/6,10000);
        fire.runAction(fireMovement);
    },




    timeDelay() {
        this.schedule(this.instantiateFire,3);
    },
    

    start () {
        this.score = cc.find('GameRoot').getComponent('ScoreDisplay');
        this.playerTank = cc.find('GameRoot/player_tank').getComponent('Player');
        this.timeDelay();
        cc.director.getCollisionManager().enabled = true;
    },

    onCollisionEnter () {
        if(!this.playerTank.playerDestroyed) {
            var instantiateParticle = cc.instantiate(this.explosion);
            this.node.addChild(instantiateParticle);
            cc.audioEngine.playEffect(this.blastSound,false);
            this.score.scoreUpdate(1);
            this.scheduleOnce(this.destroyNode,0.2);
        }
        
    },

    destroyNode() {
        this.node.destroy();
    },

    update (dt) {
        if(this.playerTank.playerDestroyed) {
            this.unschedule(this.instantiateFire);
        }
    },
});
