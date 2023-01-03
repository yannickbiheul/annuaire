const url = "http://127.0.0.1:8000/api/personnes";
const result = document.querySelector("#result");
const liste = document.querySelector("#liste");
const champ = document.querySelector("#champ");
const liens = document.getElementsByTagName("a");

champ.addEventListener("keyup", () => {
    if (champ.value.length >= 1) {
        recupererPersonnes(champ.value);
    }
});

function recupererPersonnes(prenom) {
    let requete = new XMLHttpRequest();
    requete.open("GET", "http://127.0.0.1:8000/api/personnes/" + prenom);
    requete.responseType = "json";
    requete.send();

    requete.onload = function () {
        if (requete.readyState === XMLHttpRequest.DONE) {
            if (requete.status === 200) {
                let reponse = requete.response;
                for (let i = 0; i < reponse.length; i++) {
                    let el = document.createElement("li");
                    el.innerHTML =
                        '<a href="http://127.0.0.1:8000' +
                        reponse[i].id +
                        '" style="text-decoration: none; color: #000;" onclick="getPersonne(' +
                        reponse[i].id +
                        ')" disabled>' +
                        reponse[i].prenom +
                        " " +
                        reponse[i].nom +
                        "</a>";
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

    let requete = new XMLHttpRequest();
    requete.open("GET", "http://127.0.0.1:8000/api/personnes/" + id);
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
