import {configGame} from './config'

export class Player {
    position = null;
    name = null;
    life = null;
    power = null;
    speed = null;
    classCss = null;
    numero = null;
    etat = null;
    
    weapon = null;
    armor = null;

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
        this.numero = object.numero;
        this.life = object.life;
        this.power = object.power;
        this.speed = object.speed;
        this.classCss = object.classCss;
        this.etat = object.etat
    }
    
    
    /* Gain methods */
    
    gainWeapon(weapon) {

        this.weapon = weapon;
    }
    gainArmor(armor) {

        this.armor = armor;
    }
    gainLife(life) {

        this.life = this.life + life.vie;
    }
    
    looseWeaponDurability() {
        if (this.weapon.looseDurability() === 0) {
            this.weapon = null;
        }
    }
    
    loosePV(powerOfPlayer) {
        let looselife = 0
        if (this.armor != null) {
            
            this.armor.armor -= powerOfPlayer
            if (this.armor.armor <= 0) {
                looselife = this.armor.armor * -1;
                this.armor = null
            }
        }
        else {
            looselife = powerOfPlayer;
        }
        this.life -= looselife;
    }

}