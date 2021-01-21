import {configGame} from './config'

export class Player {
    position = null;
    name = null;
    life = null;
    power = null;
    speed = null;
    classCss = null;
    etat = null

    constructor(cPosition, cName,cClassCss) {
        this.position = cPosition;
        this.name = cName;
        this.numero = cClassCss;
        this.life = configGame.lifeDefault;
        this.power = configGame.powerDefault;
        this.speed = configGame.speedDefault;
        this.classCss = `player${cClassCss}`;
        this.setThreathless();
    }

    setPosition(sPosition) {
        this.position = sPosition;
    }
    setPower(sPower) {
        this.power = sPower;
    }
    setSpeed(sSpeed) {
        this.speed = sSpeed;
    }
    setLife(sLife) {
        this.life = sLife;
    }
    setEtat(sEtat) {
        this.etat = sEtat;
    }
    setThreathless() {
        this.etat = 'threathless';
    }

    setDeadPlayer() {
        this.position = null;
        this.power = null;
        this.etat = 'dead';
    }


    setParameters(object) {
        this.position = object.position;
        this.name = object.name;
        this.life = object.life;
        this.power = object.power;
        this.speed = object.speed;
        this.classCss = object.classCss;
        this.etat = object.etat
    }

}