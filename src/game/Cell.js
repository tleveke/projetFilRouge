export class Cell {

    x=null;
    y=null;
    type='';
    value='';
    player='';

    constructor(cX,cY) {
        this.x = cX;
        this.y = cY;
        this.setVideCell()
    }

    setVideCell() {
        this.type = 'vide';
        this.value = '';
        this.player = false;
    }
    setPlayer(player) {
        this.type = 'player'
        this.value = ''
        this.player = player
    }
    setOpponent() {
        this.type = 'opponent'
        this.value = ''
        this.player = false
    }
    setMoveCell() {
        this.type = 'move';
        this.value = '';
        this.player = false;
    }
    setBlockCell() {
        this.type = 'block';
        this.value = '';
        this.player = false;
    }


}