class Chateau {
    constructor(imageNain , imageElfe , imageChefNain , imageChefElfe) {
        this.ressources = 3;
        this.guerriersNovices = [];
        this.fileAttente = [];
        this.equipe = [];
        this.initialiserGuerriers(imageNain , imageElfe , imageChefNain , imageChefElfe);

    }

    initialiserGuerriers(imageNain , imageElfe , imageChefNain , imageChefElfe) {
        for (let i = 0; i < 4; i++) {
            this.guerriersNovices.push({guerrier: new Nain(imageNain), entrainement: 1});
            this.guerriersNovices.push({guerrier: new Elfe(imageElfe), entrainement: 2});
        }
        this.guerriersNovices.push({guerrier: new ChefNain(imageChefNain), entrainement: 3});
        this.guerriersNovices.push({guerrier: new ChefElfe(imageChefElfe), entrainement: 4});

    }

    entrainer() {
        let i = 0 ;
        console.log("longeur file",this.fileAttente.length);
        while (i < this.fileAttente.length  && this.ressources > 0) {
            do{
                this.ressources -- ;
                this.fileAttente[i].entrainement -- ;
                console.log(i + this.fileAttente[i] + this.fileAttente[i].entrainement)

            }while ( this.fileAttente[i].entrainement > 0 && this.ressources > 0 );
            i++;
        }
        
        if (this.ressources == 0) {
            alert("Ressources épuisées !");
        }
    }

}

