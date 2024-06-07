var position_Combat = 0 ;
const dep_rouge =  1 ;
const dep_bleu = -1 ;
var equipeRougeSurPlateau = false ;
var equipeBleuSurPlateau = false ;


var LBleu = [];
var LRouge = [];
var combat = false;




class Plateau {
    constructor() {
        this.carreaux = [[], [], [], [], []];
    }

    ajouterGuerrierEquipe(chateau) { 
        ParcourirFileAttente(chateau);
        console.log("guerriers ajoutés a l equipe" , chateau.equipe);
    }


    ajouterGuerrierPlateau(chateau, index) {
        if( (equipeRougeSurPlateau == false && chateau.equipe[0] == "rouge") || (equipeBleuSurPlateau == false && chateau.equipe[0] == "bleu")){
            this.ajouterGuerrierEquipe(chateau);
            this.carreaux[index].push(chateau.equipe);
            if(chateau.equipe[0] == "rouge"){
                equipeRougeSurPlateau = true ;
            }else{
                equipeBleuSurPlateau = true ;
            }
        }else{
            this.carreaux[index][0] = [];
            this.carreaux[index][0][0] = chateau.equipe[0];
            PlacerSurPlateau(this.carreaux[index],chateau);
        }
       
        console.log('carreau',this.carreaux);
    }


    retirerGuerrier(index) {
        return this.carreaux[index].pop();
    }


    afficherGuerriers(index) {
        let carreauDiv = document.getElementById(`carreau-${index}`);
        carreauDiv.innerHTML = '';
        for (let guerrier of this.carreaux[index]) {
          if(guerrier != null && guerrier.length > 1){
            for (let i = 1; i < guerrier.length ; i++) {
                let guerrierImg = document.createElement('img');
                guerrierImg.src = guerrier[i].image;
                guerrierImg.alt = guerrier[i].type;
                carreauDiv.appendChild(guerrierImg);
            } 
          }
        }


        console.log('le carreau',this.carreaux[index]);
     
    }


    afficherDepGuerriers(index,dep){
        this.afficherGuerriers(index);
        let carreauDiv2 = document.getElementById(`carreau-${index + dep}`);
        while(carreauDiv2.firstChild){
            carreauDiv2.removeChild(carreauDiv2.firstChild);
        }}


    GetPositionEquipe(){
        LBleu=[];
        LRouge=[];
        for (let i = 0; i < this.carreaux.length  ; i++) {
            // Check if there are blue warriors in the current position
            if ( ( Array.isArray(this.carreaux[i][0]) && this.carreaux[i][0][0]=="bleu" ) || ( Array.isArray(this.carreaux[i][1]) && this.carreaux[i][1][0]=="bleu" )) {LBleu.push(i); }
            if (( Array.isArray(this.carreaux[i][0]) && this.carreaux[i][0][0]=="rouge" ) || ( Array.isArray(this.carreaux[i][1]) && this.carreaux[i][1][0]=="rouge" )) {LRouge.push(i);}}  
         }


    MouvementGuerrier(positionInitial,pas,equipeB,equipeR,couleur,couleurAdv){
        const nextPosition = positionInitial + pas;    
        if (nextPosition < 0 || nextPosition > 4) return;
        if ( Array.isArray(this.carreaux[positionInitial + pas])) {
         
          for (let i = 0; i < this.carreaux[positionInitial + pas].length; i++) {
            if ( Array.isArray(this.carreaux[positionInitial + pas ][i]) && this.carreaux[positionInitial + pas ][i][0] === couleurAdv ){
                //this.Tour(equipeB,equipeR);
                combat = true;
                //equipe.push(this.carreaux[positionInitial][i].slice(1)[0]);
                position_Combat = positionInitial + pas;
                console.log("Position combaaaaaaaaat ................... ",position_Combat);
            }
            if (Array.isArray(this.carreaux[positionInitial + pas][i]) && this.carreaux[positionInitial + pas][i][0] === couleur) {
                if (this.carreaux[positionInitial][i] && this.carreaux[positionInitial][i].length > 1) {
                    this.carreaux[positionInitial + pas][i].push(this.carreaux[positionInitial][i].slice(1)[0]);
                }}}
        }
       // Move the blue warrior to the next position
        if( Array.isArray(this.carreaux[positionInitial + pas]) ){
            this.carreaux[positionInitial + pas]= this.carreaux[positionInitial + pas].concat(this.carreaux[positionInitial]);  
        }
        else{
            this.carreaux[positionInitial + pas]= this.carreaux[positionInitial];
        }
        this.carreaux[positionInitial] = [];
        this.afficherDepGuerriers(positionInitial + pas , -pas);
    }


   
    deplacerGuerriers(equipeB, equipeR) {
        try {
            console.log('Starting to move warriors...');
            let warriorsMoved = false;
            do {
                warriorsMoved = false;
                console.log('Checking for combat...');
                this.GetPositionEquipe();
   
                // Move blue warriors
                for (let j = LBleu.length-1 ; j >= 0 ; j-- ) {
                   
                   if(!combat){
                        /* if(LBleu[j] == position_Combat){


                    }else{*/
                    if(LBleu[j] == 4 ){
                        console.log('Le  bleu a gagnée !! ...');
                    }else{
                        if(LBleu[j] == 3  ){
                            console.log('cobat false et l indice .....' );
                            this.MouvementGuerrier(LBleu[j], 1, equipeB,equipeR, "bleu", "rouge");
                            console.log('Le bleu a bien deplacer dans l indice 3 .....',LBleu[j]+1 );
                        }
                        this.MouvementGuerrier(LBleu[j], 1, equipeB,equipeR, "bleu", "rouge");
                        warriorsMoved = true;
                    }
                //}
                   }if(combat && LBleu[j]+1 != position_Combat){
                        this.MouvementGuerrier(LBleu[j], 1, equipeB,equipeR, "bleu", "rouge");

                        this.Tour(equipeB , equipeR);
                        //combat = false ;
                        warriorsMoved = true;
                   }
                 
                }
   
                // Move red warriors
                for (let j = 0; j < LRouge.length; j++) {
                  if(!combat ){
                 
                    if(LRouge[j] == 0 ){
                        console.log('Le  Rouge a gagnée !! ...');
                    }else{
                       
                            console.log("................Combat avant mouv",combat,LRouge[j]);
                            this.MouvementGuerrier(LRouge[j], -1, equipeB,equipeR, "rouge", "bleu");
                            console.log("................Combat apres mouv",combat,LRouge[j]-1);
                            warriorsMoved = true;   
                    }
                   }
                   if(combat && LRouge[j]-1 != position_Combat){
                        this.MouvementGuerrier(LRouge[j], -1,equipeB, equipeR, "rouge", "bleu");
                        this.Tour(equipeB , equipeR);
                        //combat = false ;
                        warriorsMoved = true;
                   }
                   
                }


            } while (!combat && warriorsMoved);
            combat = false ;


        } catch (error) {
            //console.error('Error occurred while moving warriors:', error);
        }
    }


    Attaquer(equipeAttaquante,equipeAttaquee){
        try {
            if (equipeAttaquante.length > 1 && equipeAttaquee.length > 1)
                {
                  console.log('les deux equipes sont remplis !');
                  var degatPartage = 0 ;
                  for (let i = 1 ; i < equipeAttaquee.length; i++) {
                    console.log('pv de ', i , 'de l equipe attaquee :' , equipeAttaquee[i].pv) ;
                      let j = 1 ;
                      while ( equipeAttaquee[i].pv > 0 && equipeAttaquante.length > j){
                        console.log('l elemet', j ,'de lequipe attaquante frape' ,i)
                         let degat = equipeAttaquante[j].calculerDegats();
                         console.log('le degat que va subir l elem',j,'de la liste attaquante =',degat);
                              if ( degatPartage != 0 ) { // degatPartage <> 0
                                  degat += degatPartage ;
                              }
                              if ( equipeAttaquee[i].pv <= degat ) { // degat = 50  et equipeAttaquee[i].PV = 20
                                  degatPartage = degat -  equipeAttaquee[i].pv;
                                  equipeAttaquee.splice(i,1);
                              }else{ // degat < equipeAttaquee[i].PV
                                equipeAttaquee[i].pv =   equipeAttaquee[i].pv - degat ;  
                                console.log('point de vie restante :',equipeAttaquee[i].pv)


                              }
                          console.log('degatPartage',degatPartage);
                          console.log('equipe bleu',equipeAttaquante);
                         console.log('equipe rouge',equipeAttaquee);
                          j++;
                       }   
                  }  
          }    
        } catch (error) {}        
    }


    Tour(equipe_bleu,equipe_rouge){
              do {
                this.Attaquer(equipe_bleu,equipe_rouge);
                console.log('equipe bleu',equipe_bleu);
                console.log('equipe rouge',equipe_rouge);  
                this.Attaquer(equipe_rouge,equipe_bleu);
                console.log('tour en cours!');
                console.log('.................',equipe_bleu.length,equipe_rouge.length);
              } while (equipe_bleu.length > 1 && equipe_rouge.length > 1);
              chateauBleu.ressources ++ ;   
              chateauRouge.ressources ++ ;
              if(equipe_bleu.length == 1){
                  for (let i = 0; i < this.carreaux[position_Combat].length; i++) {
                    if(this.carreaux[position_Combat][i][0] == "bleu"){
                        this.carreaux[position_Combat].splice(i,1);
                    }
                   
                  }                
              }
              if(equipe_rouge.length == 1){
                for (let i = 0; i < this.carreaux[position_Combat].length; i++) {
                  if(this.carreaux[position_Combat][i][0] == "rouge"){
                      this.carreaux[position_Combat].splice(i,1);
                  }
                 
                }                
              }
              //combat = false ;
              console.log('tour finie!');  
              console.log('Combaaaaaaaaaaaaaaat!',combat);    
              this.afficherGuerriers(position_Combat, -1);  
    }
         
    afficheBtnDep()
    {
            const  btndep=document.getElementById("modal");
  
            if (this.carreaux[0].length > 0 || this.carreaux[4].length > 0) {
                console.log('platu',plateau);
                btndep.style.display='block'  ;
        }
    
}

    afficheEquipeGagnante() {
        const gagante = document.getElementById('equipeGa');
        const texteEquipe = document.getElementById('texteEquipe');
        console.log("bl eq long" ,chateauBleu.equipe.length);
      
       /* if(Array.isArray(plateau.carreaux[4][x]) && ( plateau.carreaux[4][x][0] === "bleu" || plateau.carreaux[4][x][1] === "bleu" )){
    
            texteEquipe.textContent = "L'équipe bleue gagnante de Tour";
           // updateWaitingList(attente,gagnante,chateauBleu);
  
        
      }
      if(Array.isArray(plateau.carreaux[0][x]) && ( plateau.carreaux[0][x][0] === "rouge" || plateau.carreaux[0][x][1] === "rouge" ))
      {
            texteEquipe.textContent = "L'équipe rouge gagnante";
  
      }*/
        gagante.style.display = 'block';
  
  }

   
   
}
