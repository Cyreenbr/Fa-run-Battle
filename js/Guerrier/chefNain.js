class ChefNain extends Nain {
    constructor(imageChefNain) {
        super(FORCE_BASE, PV_BASE,"ChefNain" ); 
        this.image = imageChefNain ;
    }

    calculerDegats() {
        return super.calculerDegats() / 2; 
    }
}