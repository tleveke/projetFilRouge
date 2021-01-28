import {configGame} from './config'

class Object_FR {

	name=null;
	image=null;
	etat=null;
	
	constructor(cName,cImage) {
		this.name = cName;
		this.image = cImage;
	}
	
	setEtat(sEtat) {
		this.etat = sEtat;
	}
	removeEtat() {
		this.etat = null;
	}
	
}

export class Weapon extends Object_FR {
	
	
	power=null;
	speed=null;
	durability=null;
	constructor(cName, cPower, cSpeed,cImage) {
		super(cName,cImage);
		this.durability = 3;
		this.power = cPower
		this.speed = cSpeed;
	}
	
	looseDurability() {
		this.durability--;
		return this.durability;
	}
}
export class Armor extends Object_FR{
	
	armor = null;
	speed = null;
	
	constructor(cName, cArmor, cSpeed,cImage) {
		super(cName,cImage);
		this.armor = cArmor;
		this.speed = cSpeed;
	}
}
export class Life extends Object_FR {
	
	vie = null;
	
	constructor(cName, cVie,cImage) {
		super(cName,cImage);
		this.vie = cVie;
	}
}
export class Other extends Object_FR {
	constructor(cName,cImage) {
		super(cName,cImage);
	}
}