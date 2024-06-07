class Nain extends Guerrier {
    constructor(imageNain) {
        super(FORCE_BASE, PV_BASE ,"Nain"); 
        this.image = imageNain ;
    }

    calculerDegats() {
        return super.calculerDegats() / 2; 
    }
}