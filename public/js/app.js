// Récupération des éléments
const urlPrenom = "http://127.0.0.1:8000/api/personnes/prenom/";
const urlId = "http://127.0.0.1:8000/api/personnes/id/";
const result = document.querySelector("#result");
const liste = document.querySelector("#liste");
const champ = document.querySelector("#champ");
const liens = document.getElementsByTagName("a");
let value = "";

let timeout;
champ.addEventListener("input", () => {
    clearTimeout(timeout);
    value = champ.value;
    timeout = setTimeout(() => {
        console.log(value);
        if (value.length >= 1) {
            recupererPersonnes(value);
        } else {
            result.style.display = 'none';
            liste.innerHTML = "";
        }
    }, 500);
})

// Récupération des personnes correspondant à la valeur de l'input
function recupererPersonnes(prenom) {
    if (prenom.includes(" ")) {
        console.log(encodeURI(prenom));
    }
    let requete = new XMLHttpRequest();
    requete.open("GET", urlPrenom + encodeURI(prenom));
    requete.responseType = "json";
    requete.send();

    requete.onload = function () {
        if (requete.readyState === XMLHttpRequest.DONE) {
            if (requete.status === 200) {
                let reponse = requete.response;
                if(reponse.length > 0) {
                    // Affichage de la div result
                    result.style.display = 'flex';
                    for (let i = 0; i < reponse.length; i++) {
                        let el = document.createElement("li");
                        el.innerHTML =
                        '<p style="cursor: pointer;" onclick="getPersonne(' +
                        reponse[i].id +
                        ')">' +
                        reponse[i].prenom[0].toUpperCase() + reponse[i].prenom.slice(1) +
                        " " +
                        reponse[i].nom.toUpperCase() +
                        "</p>";
                        liste.appendChild(el);
                    }
                    result.style.border = "1px solid #ccc";
                    result.style.width = "300px";
                    result.style.paddingLeft = "5px";
                    result.style.overflowY = "scroll";
                }
                
            } else {
                alert("ERREUR !!!");
            }
        }
    };
}

// Récupération de la personne choisie dans la liste
function getPersonne(id) {
    result.style.display = "none";
    champ.value = "";
    console.log(id);
    let requete = new XMLHttpRequest();
    requete.open("GET", "http://127.0.0.1:8000/api/personnes/id/" + id);
    requete.responseType = "json";
    requete.send();

    requete.onload = function () {
        if (requete.readyState === XMLHttpRequest.DONE) {
            if (requete.status === 200) {
                console.log(requete.response);
                let reponse = requete.response;
                let card = document.createElement("div");
                card.style.width = "300px";
                document.body.appendChild(card);
                let nom = document.createElement("h2");
                let el = document.createElement("p");
                el.innerHTML = reponse.prenom + ' ' + reponse.nom + ' ' + reponse.tel;
                card.appendChild(el);
            } else {
                alert("ERREUR !!!");
            }
        }
    };
}