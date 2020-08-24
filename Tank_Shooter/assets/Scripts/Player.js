// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html


   cc.Class({
    extends: cc.Component,
    

    properties: {
        moveDistance : 5,
        moveSpeed : 2,
        moveLimit : 400,
        fireXPosition : 0,
        fireYPositon : 130,
        fireMoveSeconds : 1,
        playerTotalLife : 3,

        playerDestroyed : false,

        gameOver : {
            default : null,
            type : cc.Node,
        },

        playerFire : {
            default : null,
            type : cc.Prefab,
        },

        gameRoot : {
            default : null,
            type : cc.Node,
        },

        playerLife : {
            default : null,
            type : cc.Label,
        },

        playerFireSound : {
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


    onKeyDown(event ) {
        switch(event.keyCode)
        {
            case cc.macro.KEY.a:
                this.leftMove = true;
                break;
            case cc.macro.KEY.d:
                this.rightMove = true;
                break;
            case cc.macro.KEY.space:
                if(this.isPlayerCanFire) {
                    this.instantiateFire();
                }
                break;
        }
    },

    onKeyUp(event) {
        switch(event.keyCode) {
            case cc.macro.KEY.a:
                this.leftMove = false;
                break;
            case cc.macro.KEY.d:
                this.rightMove = false;
                break;
        }
    },

    instantiateFire() {
        this.isPlayerCanFire = false;
        var newFire = cc.instantiate(this.playerFire);
        cc.audioEngine.playEffect(this.playerFireSound,false);
        this.gameRoot.addChild(newFire);
        newFire.setPosition(cc.v2(this.node.x,this.node.y + 50));
        moveFire = cc.moveBy(this.fireMoveSeconds,0,2000);
        newFire.runAction(moveFire);
    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () {
        this.leftMove = false;
        this.rightMove = false;
        this.spawnFire = false;
        this.gameOver.active = false;
        this.isPlayerCanFire = true;

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
     },


    start () {
        this.scheduleFireDelay();
        cc.director.getCollisionManager().enabled = true;
    },

    scheduleFireDelay() {
        this.schedule(this.playerFireDelay,0.5);
    },

    playerFireDelay() {
        this.isPlayerCanFire = true;
    },

    onCollisionEnter() {
        var instantiateParticle = cc.instantiate(this.explosion);
        this.node.addChild(instantiateParticle);
        cc.log("duration : " +instantiateParticle.active);
        cc.audioEngine.playEffect(this.blastSound,false);
        
        if(this.playerTotalLife > 0) {
            this.playerTotalLife--;
            this.playerLife.string = "X " +this.playerTotalLife;
        }
        
        if(this.playerTotalLife == 0) {
            this.playerLife.string = "X " +this.playerTotalLife;
            this.gameOver.active = true;
            this.playerDestroyed = true;
            this.schedule(this.destroyNode,0.2);
        } 
    },

    destroyNode() {
        this.node.destroy();
    },


    update (dt) {
        if(this.leftMove)
        {
            if(this.node.x > -(this.moveLimit))
            {
                this.node.x -= this.moveDistance * this.moveSpeed;
            }

        } else if(this.rightMove) {
            if (this.node.x < this.moveLimit) {
                this.node.x += this.moveDistance * this.moveSpeed;
            }
        }

    },


     
});





