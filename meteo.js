const apiKey = 'YourApiKey';

const btn = document.getElementById('btn');
const inputText = document.getElementById('textInput');
const divInfo = document.getElementById('info');

const titreVille = document.getElementById('ville');
const tempActuelle = document.getElementById('tempActuelle');
const tempMax = document.getElementById('tempMax');
const tempMin = document.getElementById('tempMin');

async function recupDonees(city, callback) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        const data = await response.json();
        console.log(data);
        return callback(data);
    } catch {
        console.log("error");
    }
}

function contenue(dt) {
    let date = new Date(dt.dt * 1000);
    console.log(dt.weather[0].description);
    divInfo.classList.remove('reveal');
    titreVille.innerText = dt.name +' le '+ date.toLocaleString() ;
    tempActuelle.innerText = dt.main.temp;
    tempMax.innerText = dt.main.temp_max;
    tempMin.innerText = dt.main.temp_min;
    changeBackground(dt.main.temp);
}

function afficherMeteo() {
    if(inputText.value === ''){
        alert('Il faut ajouter le nom d\'une ville');
    }else{
        recupDonees(inputText.value.trim(), contenue);
    }
}

function changeBackground(temperature){
   if(temperature > 15){
    document.body.style.background = "linear-gradient(#e66465, #9198e5)";
   }else if(temperature < 15){
    document.body.style.background = "linear-gradient(#9198e5, #e66465)";
   }
}

btn.addEventListener('click', afficherMeteo)
