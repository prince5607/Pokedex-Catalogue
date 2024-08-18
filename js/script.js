
var buttn = document.getElementById('button');

buttn.addEventListener('click', () => {
    document.getElementById('pokedex').classList.toggle('open');
    buttn.style.visibility = 'hidden';
});
var poweroffBtn = document.getElementById('powerButtn');

poweroffBtn.addEventListener('click', () => {
    document.getElementById('pokedex').classList.toggle('open');
    setTimeout(() => {
        buttn.style.visibility = 'visible';
    }, 1000);

});


var pokeDex = {};  //{1 : {name : , type: , img: , desc: ,animation: }}

window.onload = async function () {
    let html = "";
    for (let i = 1; i <= 150; i++) {
        await getPokemon(i);

        let pokemon = document.createElement("div");
        pokemon.className = "pokemon-name";  
        pokemon.id = i;                     

        let indexDiv = document.createElement("div");
        indexDiv.textContent = `${i}.`;     

        let imgDiv = document.createElement("div");
        let img = document.createElement("img");
        img.src = pokeDex[i]["img"];        
        img.width = 80;                      
        img.height = 80;                    
        imgDiv.appendChild(img);             // Append the image to the div

        // Create the third child div for the name
        let nameDiv = document.createElement("div");
        nameDiv.textContent = pokeDex[i]["name"].toUpperCase(); 

        // Append the child divs to the main div
        pokemon.appendChild(indexDiv);
        pokemon.appendChild(imgDiv);
        pokemon.appendChild(nameDiv);
        pokemon.addEventListener("click",()=>{displayPokemon(pokemon.id)});
        document.querySelector(".lower-left").appendChild(pokemon);
    }

}



async function getPokemon(num) {
    let url = "https://pokeapi.co/api/v2/pokemon/" + num.toString();

    let res = await fetch(url);
    let pokemon = await res.json();

    let name = pokemon['name'];
    let animation = pokemon["sprites"]["other"]["showdown"]["front_default"];
    let img = pokemon["sprites"]["front_default"];
    let type = pokemon["types"];

    res = await fetch(pokemon.species.url);
    let pokemonDesc = await res.json();

    pokemonDesc = pokemonDesc["flavor_text_entries"][14]["flavor_text"];
    pokeDex[num] = { "name": name, "img": img, "type": type, "Desc": pokemonDesc, "animation": animation };

}

function displayPokemon(id) {
    let html = `
        <div class="poke-disp">
            <div class="pokemon-img">
                <div class="poke-img">
                <img src="${pokeDex[id]["animation"]}"></div>
                
            </div>
                   
            <div class="pokemon-desc">
            <div class = "pokemon-types"> 
                ${updateTypes(id)}
                </div>
            <div class = "desc-content">
            <pre >${pokeDex[id]["Desc"]}</pre>
            </div>
            </div>

        </div>
    `;
    document.querySelector(".disp-outer-layer").innerHTML = html;

}

function updateTypes(id) {

    let types = pokeDex[id]["type"];
    let html = ``;
    for (let i = 0; i < types.length; i++) {
        let type = `<span class="type-box ${types[i]["type"]["name"]}">${types[i]["type"]["name"].toUpperCase()}</span>`;
        html += type;
    }
    return html;
}

const SearchBtn = document.getElementById('searchBtn');
SearchBtn.addEventListener("click", ()=>{
    let searchInput = document.getElementById('pokeSearch');
    let pokemonName = searchInput.value;
    searchPokemon(pokemonName);
    searchInput.value = "";
});

const searchbtn = document.getElementById('srchBtn');
searchbtn.addEventListener("click", ()=>{
    let searchInput = document.getElementById('pokeSrch');
    let pokemonName = searchInput.value;
    searchPokemon(pokemonName);
    searchInput.value = "";
});


function searchPokemon(pokemonName) {
    if (pokemonName === "") {
        return;
    }
    for (let i = 1; i <= Object.keys(pokeDex).length; i++) {
        if (pokemonName === pokeDex[i]["name"] || pokemonName.toLowerCase() === pokeDex[i]["name"]) {
            displayPokemon(i);
            return;
        }
    }
    document.querySelector(".disp-outer-layer").innerHTML = `<h3 style = "text-align:center;">Could not find the Pokemon with name : ${pokemonName} </h3>`;
}

let menuBtn = document.querySelector(".menuBtn");
const menuOptions = document.querySelector(".menu-options");
menuBtn.addEventListener("click",()=>{
    menuBtn.classList.toggle("bx-x");
    menuOptions.style.display = menuOptions.style.display === 'flex' ? 'none' : 'flex';
});

document.addEventListener('click', (event) =>{
    if (!menuBtn.contains(event.target) && !menuOptions.contains(event.target)) {
      menuOptions.style.display = 'none';
      menuBtn.classList.remove("bx-x");
    }

  });

const powerBtn = document.getElementById("powerBtn");
powerBtn.addEventListener("click",()=>{
    document.getElementById('pokedex').classList.toggle('open');
    setTimeout(() => {
        buttn.style.visibility = 'visible';
    }, 1000);
    menuOptions.style.display = 'none';
      menuBtn.classList.remove("bx-x");

});