// Déclaration de la clé API pour l'accès aux données météo
const apiKey = 'ApiKey';

// Sélection des éléments du DOM
const btn = document.getElementById('btn');
const inputText = document.getElementById('textInput');
const divInfo = document.getElementById('info');

const titreVille = document.getElementById('ville');
const tempActuelle = document.getElementById('tempActuelle');
const tempMax = document.getElementById('tempMax');
const tempMin = document.getElementById('tempMin');

// Fonction asynchrone pour récupérer les données météo d'une ville
async function recupDonees(city, callback) {
    try {
        // Requête à l'API OpenWeather pour obtenir les données météo au format JSON
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        const data = await response.json();
       // Appel du callback avec les données récupérées
        return callback(data);
    } catch {
        // Affichage d'une erreur dans la console en cas de problème
        console.log("error");
    }
}

// Fonction pour traiter et afficher les données météo
function contenue(dt) {
    // Conversion de la date UNIX en format lisible
    let date = new Date(dt.dt * 1000);
    // Affichage de la div contenant les résultats
    divInfo.classList.remove('reveal');
    // Affichage du nom de la ville et de la date
    titreVille.innerText = dt.name +' le '+ date.toLocaleString() ;
    // Affichage de la température actuelle
    tempActuelle.innerText = dt.main.temp;
    // Affichage de la température maximale
    tempMax.innerText = dt.main.temp_max;
    // Affichage de la température minimale
    tempMin.innerText = dt.main.temp_min;
    // Changement du fond en fonction de la température
    changeBackground(dt.main.temp);
}

// Fonction pour vérifier l'entrée de l'utilisateur et récupérer les données météo
function afficherMeteo() {
    if(inputText.value === ''){
        // Affichage d'une alerte si le champ est vide
        alert('Il faut ajouter le nom d\'une ville');
    }else{
        // Appel de la fonction pour récupérer les données météo
        recupDonees(inputText.value.trim(), contenue);
    }
}

// Fonction pour changer le fond de la page en fonction de la température
function changeBackground(temperature){
   if(temperature > 15){
    // Fond pour températures au-dessus de 15°C
    document.body.style.background = "linear-gradient(#e66465, #9198e5)";
   }else if(temperature < 15){
    // Fond pour températures en dessous de 15°C
    document.body.style.background = "linear-gradient(#9198e5, #e66465)";
   }
}

// Ajout d'un écouteur d'événement pour le clic sur le bouton
btn.addEventListener('click', afficherMeteo)
