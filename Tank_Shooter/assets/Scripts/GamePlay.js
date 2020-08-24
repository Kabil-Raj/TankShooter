// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html


var player = require ('Player');

cc.Class({
    extends: cc.Component,

    properties: {

        score : 0,

        enemy_root : {
            default : null,
            type : cc.Node,
        },
        enemy_car : {
            default : null,
            type : cc.Prefab,
        },

        enemy_tank : {
            default : null,
            type : cc.Prefab,
        },

        enemy_plane : {
            default : null,
            type : cc.Prefab,
        },

        playerTank : {
            default : null,
            type : player,
        },

        playerNode : {
            default : null,
            type : cc.Node,
        },


    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () {
        this.enemies = [this.enemy_car, this.enemy_tank, this.enemy_plane];
        this.instantiateEnemies(this.enemies);

     },

     instantiateEnemies(enemyList) {
         var numberOfEnemiesInAColumn = 3;
         x = -300, y = 350;
        for( i = 0; i < numberOfEnemiesInAColumn; i++) {
            for( j = 0 ; j < enemyList.length; j++) {
                var enemy = cc.instantiate(enemyList[j]);
                this.enemy_root.addChild(enemy);
                enemy.setPosition(cc.v2(x,y));
                y += 175;
            }
            x += 300;
            y = 350;
        }
     },


     enemyMovement() {
         this.x_pos = 300;
         this.y_pos = -20;

         if(this.enemy_root.x < 0) {
            var moveEnemyRight = cc.moveBy(0.8,cc.v2(this.x_pos,this.y_pos));
            this.enemy_root.runAction(moveEnemyRight);
         } else {
            var moveEnemyLeft = cc.moveBy(0.8,cc.v2(-this.x_pos,this.y_pos));
            this.enemy_root.runAction(moveEnemyLeft);
         }

        if(this.enemy_root.getChildByName('enemy_jeep')) {
            this.difBetEnemyAndPlayer = 30;
        } else if(this.enemy_root.getChildByName('enemy_tank')){
            this.difBetEnemyAndPlayer = -100;
        }  else if(this.enemy_root.getChildByName('enemy_plane')) {
            this.difBetEnemyAndPlayer = -200;
        }

          if((this.enemy_root.y - this.playerNode.y) < this.difBetEnemyAndPlayer) {
              this.playerTank.gameOver.active = true;
              this.playerNode.destroy();
              this.playerTank.playerDestroyed = true;
          }
     },

     scheduleEnemyMove() {
         this.schedule(this.enemyMovement,2);
     },



    start () {
        this.scheduleEnemyMove();
    },


     update (dt) {

         if(this.playerTank.playerDestroyed) {
            this.unschedule(this.enemyMovement);
         } else {
             if(this.enemy_root.childrenCount == 0) {
                this.instantiateEnemies(this.enemies);
             }
         }
     },
});
