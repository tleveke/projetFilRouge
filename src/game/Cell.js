export class Cell {

    x=null;
    y=null;
    type='';
    value='';
    player='';
    player=null;

    constructor(cX,cY) {
        this.x = cX;
        this.y = cY;
        this.setVideCell()
    }

    setVideCell() {
        this.type = 'vide';
        this.value = '';
        this.player = false;
        this.object = false;
    }
    setPlayer(player) {
        this.type = 'player'
        this.value = ''
        this.player = player
        this.object = false;
    }
    setOpponent() {
        this.type = 'opponent'
        this.value = ''
        this.player = false;
        this.object = false;
    }
    setMoveCell() {
        this.type = 'move';
        this.value = '';
        this.player = false;
        this.object = false;
    }
    setBlockCell() {
        this.type = 'block';
        this.value = '';
        this.player = false;
        this.object = false;
    }
    
    setObjectCell(object) {
        this.type = 'object';
        this.value = '';
        this.player = false;
        this.object = object;
    }


}