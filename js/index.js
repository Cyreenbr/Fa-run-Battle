function ParcourirFileAttente(chateau)
{
for (let i = 0; i < chateau.fileAttente.length; i++) {
    if (chateau.fileAttente[i].entrainement === 0) {
        chateau.equipe.push(chateau.fileAttente[i].guerrier);
        chateau.fileAttente.splice(i, 1);
        i--;
    }
}

}
function PlacerSurPlateau(carreau,chateau)
{
for (let i = 0; i < chateau.fileAttente.length; i++) {
    if (chateau.fileAttente[i].entrainement === 0) {
        carreau[0].push(chateau.fileAttente[i].guerrier);
        chateau.fileAttente.splice(i, 1);
       i--;
    }
  }
}

function rencontrAd(posCareau,nextPosition,couleurAdv)
{
    if ( Array.isArray(posCareau) && posCareau[0] === couleurAdv ){
       // this.Tour(equipeB,equipeR);
        combat = true;
        position_Combat = nextPosition;
    }
}
function MoveBleu(plateau,LBleu,equipeB,equipeR)
{
    for (let j = LBleu.length-1 ; j >= 0 ; j-- ) {
                   
        if(!combat){
         if(LBleu[j] == 4 ){
             console.log('Le  bleu a gagnée !! ...');
         }else{
             if(LBleu[j] == 3  ){
                 console.log('cobat false et l indice .....' );
                 plateau.MouvementGuerrier(LBleu[j], 1, equipeB,equipeR, "bleu", "rouge");
                 console.log('Le bleu a bien deplacer dans l indice 3 .....',LBleu[j]+1 );
             }
             plateau.MouvementGuerrier(LBleu[j], 1, equipeB,equipeR, "bleu", "rouge");
       //    warriorsMoved = true;
         }

        }if(combat && LBleu[j]+1 != position_Combat){
         //    plateau.Tour(equipeB , equipeR);
             plateau.MouvementGuerrier(LBleu[j], 1, equipeB,equipeR, "bleu", "rouge");
           // warriorsMoved = true;
        }}
}

function MoveRouge(plateau,LRouge,equipeB,equipeR)
{
    for (let j = 0; j < LRouge.length; j++) {
        if(!combat ){
          if(LRouge[j] == 0 ){
              console.log('Le  Rouge a gagnée !! ...');
          }else{
                  plateau.MouvementGuerrier(LRouge[j], -1, equipeB,equipeR, "rouge", "bleu");
               //   warriorsMoved = true;  
          }
         }if(combat && LRouge[j]-1 != position_Combat){
             // plateau.Tour(equipeB , equipeR);
              //combat = false ;
              plateau.MouvementGuerrier(LRouge[j], -1, equipeR, "rouge", "bleu");
           //   warriorsMoved = true; 
            }
  }
}
