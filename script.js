
const PLAYERX = ["fas fa-times", "X"];                   // Definit le jeton x
const PLAYERO = ["fas fa-circle", "O"];                  // Pareil pour le jeton O

var score;
var scoreX= 0;                                 // On définit le premier joueur par la constante PLAYERX                          
var scoreY= 0;

var joueurEnCours = PLAYERX;  

var gagne = [           
    ["#c1","#c2","#c3"],
    ["#c4","#c5","#c6"],
    ["#c7","#c8","#c9"],
    ["#c1","#c4","#c7"],                                    // Les pattern gagnants 
    ["#c3","#c6","#c9"],
    ["#c1","#c4","#c7"],
    ["#c1","#c5","#c9"],
    ["#c2","#c5","#c8"],
    ["#c3","#c5","#c7"],
];

function afficherGagnant(symbol) {
    if(joueurEnCours == PLAYERX){
        scoreX += 1;
        score = scoreX;                                                                              // Fonctions scoring
        $("#player"+symbol).children(".msg").append("Unlimited Power !").fadeOut(500).fadeIn(500).fadeOut(500).fadeIn(500).fadeOut(500).fadeIn(500).fadeOut(500).fadeIn(500);
    }
    else{
        scoreY+= 1; 
        score = scoreY;                                                                                 // Fonctions scoring
        $("#player"+symbol).children(".msg").append("May The Force Be With You").fadeOut(500).fadeIn(500).fadeOut(500).fadeIn(500).fadeOut(500).fadeIn(500).fadeOut(500).fadeIn(500);
        $("#player"+symbol).children(".msg").css("font-size","20px");
    }    
    $("#score"+symbol).html(score);
    $("#player"+symbol).addClass("win"+symbol);                                              // + Affiche le gagnant + message de victoire
    $("body").fadeOut(300).fadeIn(2000);
    $(".carre").unbind("click");

       
};

function jouer(){
    
    $(".carre").bind("click", function(){
        $(this).addClass("desactive");                                                              //  Un seul pion par carré 
        $(this).children("i").addClass(joueurEnCours[0]);                                          // Au click rajoute la class desactive, le symbole et la classe du joueur en cours
        $(this).addClass(joueurEnCours[1]);
        $(this).unbind("click");
                                                                         
        
        $.each(gagne, function(index, tab){
            if($(tab[0]).hasClass(joueurEnCours[1]) &&                                                 // Pour chaque pattern gagnant, si chaque pattern
               $(tab[1]).hasClass(joueurEnCours[1]) &&                                                 // est " texté" a l'interieur du i 
               $(tab[2]).hasClass(joueurEnCours[1])){
                   $(tab[0]).addClass("win"+joueurEnCours[1]);                                         // alors on ajoute la classe win
                   $(tab[1]).addClass("win"+joueurEnCours[1]);
                   $(tab[2]).addClass("win"+joueurEnCours[1]);
                                                                                                        // Qui permet de surligner le pattern gagnant
                    afficherGagnant(joueurEnCours[1]); 
                    return false;            
            }
        });

        if ($(".carre.desactive").length == 9){                                    // Sinon si les carré sont tous désactivé = égalité
            $('#egalite').html("Egalité !");
            $('#egalite').fadeOut(500).fadeIn(500).fadeOut(500).fadeIn(500).fadeOut(500).fadeIn(500);
        }

        if(joueurEnCours == PLAYERX){                                                  // Au click retourne le html du joueur( si joueur = X retourne le joueur O)
           joueurEnCours = PLAYERO;
        }
        else{
            joueurEnCours = PLAYERX;
        }
            
    });
};

$("#retry").on("click", function(){
    $('.carre').html("<i></i>")
            .removeClass("winX")
            .removeClass("winO")
            .removeClass("X")
            .removeClass("O")
            .removeClass("desactive");  
    $(".msg").html("");
    $(".box div").removeClass("winX")
                .removeClass("winO");
    $('#egalite').html("");
    jouer()                                                            // Enleve le contenu html du carré au click du retry, et on remove les carré gagnants
});


$(document).ready(function(){
    jouer();
});
   
$("#restart").on("click", function(){
    location.reload();                                                              // Raffraichit la page ET le score
});             