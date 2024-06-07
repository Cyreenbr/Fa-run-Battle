const FORCE_BASE = 10;
const PV_BASE = 100;


class Guerrier {

    constructor(force, pv ,type ) {
        this.force = force;
        this.pv = pv;
        this.type=type;
    }

    calculerDegats() {
        let degats = 0;

        //Lancement de 3 dés 
        for (let i = 0; i < this.force; i++) {
            degats += Math.floor(Math.random() * 3) + 1; // Lancer un dé à 3 faces
        }

        return degats;
    }

}







