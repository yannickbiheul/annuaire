const urlPrenom = "http://127.0.0.1:8000/api/personnes/prenom/";
const urlId = "http://127.0.0.1:8000/api/personnes/id/";
const result = document.querySelector("#result");
const liste = document.querySelector("#liste");
const champ = document.querySelector("#champ");
const liens = document.getElementsByTagName("a");
let first = "";

champ.addEventListener("keyup", appuie);

function appuie() {
    if (champ.value.length >= 1) {
        result.style.display = 'flex';
        first = champ.value[0].toUpperCase();
        recupererPersonnes(first);
    } else {
        result.style.display = 'none';
        first = "";
        champ.addEventListener("keyup", appuie);
    }
}

function recupererPersonnes(prenom) {
    let requete = new XMLHttpRequest();
    requete.open("GET", urlPrenom + prenom);
    requete.responseType = "json";
    requete.send();

    requete.onload = function () {
        if (requete.readyState === XMLHttpRequest.DONE) {
            if (requete.status === 200) {
                let reponse = requete.response;
                for (let i = 0; i < reponse.length; i++) {
                    let el = document.createElement("li");
                    el.innerHTML =
                        '<p style="cursor: pointer;" onclick="getPersonne(' +
                        reponse[i].id +
                        ')">' +
                        reponse[i].prenom +
                        " " +
                        reponse[i].nom +
                        "</p>";
                    liste.appendChild(el);
                }
                result.style.border = "1px solid #ccc";
                result.style.width = "300px";
                result.style.paddingLeft = "5px";
                result.style.overflowY = "scroll";
            } else {
                alert("ERREUR !!!");
            }
        }
    };
}

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