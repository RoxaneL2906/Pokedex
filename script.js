let pokemons = [];

async function getData() {
  const response = await fetch(
    "https://pokebuildapi.fr/api/v1/pokemon/limit/151"
  );
  pokemons = await response.json();

  showList(pokemons);
}

function showList(filtered_pokemons) {
  const list = document.getElementById("list");
  // Quand on a toute la liste affiché et qu'on recherche un pokémon en particulier, la liste à gauche doit se vider pour n'afficher que celui demandé
  list.innerHTML = "";

  filtered_pokemons.forEach(function (pokemon) {
    // data_id -> cf cours Massi
    list.innerHTML += `
      <div class='pokemon' data-id='${pokemon.pokedexId}'>
            <p>${pokemon.pokedexId}</p>
            <p>${pokemon.name}</p>
            <img src="${pokemon.image}">
        </div>`;
  });

  // On récupère tous les pokémons et on affiche les détails d'un pokémon au moment du clic
  // dataset -> cf cours Massi
  const pokemonDivs = document.querySelectorAll(".pokemon");
  pokemonDivs.forEach(function (pokemonDiv) {
    pokemonDiv.addEventListener("click", function () {
      showDetails(pokemonDiv.dataset.id);
    });
  });
}

// keyup -> L'évènement keyup se déclenche lorsque qu'une touche du clavier qui a été pressée est relâchée
// Filtre la liste de pokémon suivant le nom
// toLowerCase -> Ignore les majuscules
function initSearch() {
  const input = document.getElementById("search-input");
  input.addEventListener("keyup", function () {
    const searchedPokemons = pokemons.filter(function (pokemon) {
      return pokemon.name.toLowerCase().includes(input.value.toLowerCase());
    });
    showList(searchedPokemons);
    // Affiche les détails du pokémon si la recherche est égale à 1 élément trouvé
    if (searchedPokemons.length == 1) {
      showDetails(searchedPokemons[0].pokedexId);
    }
  });
}

function showDetails(pokemonId) {
  // Recherche dans le tableau des pokémons celui qui a l'id pokédex égal à l'id du pokémon sélectionné
  const pokemon = pokemons.find(function (pokemon) {
    return pokemon.pokedexId == pokemonId;
  });

  const detail = document.getElementById("detail");
  detail.innerHTML = `
    <p class="number">n°${pokemon.pokedexId}</p>
    <img class="picture" src="${pokemon.image}">
    <p class="name">${pokemon.name}</p>
    <p>Types</p>
    <div id="types"></div>
    `;

  const types = document.getElementById("types");
  pokemon.apiTypes.forEach(function (type) {
    types.innerHTML += `<img class="type" src="${type.image}">`;
  });

  const evolution = document.getElementById("evolution");
  // Si le pokemon sélectionné à une évolution...
  if (pokemon.apiEvolutions.length > 0) {
    // .. On recherche le pokémon dans le tableau
    const evolutionId = pokemon.apiEvolutions[0].pokedexId;
    const pokemonEvolution = pokemons.find(function (pokemon) {
      return pokemon.pokedexId == evolutionId;
    });

    // SI on trouve une évolution dans notre tableau -> Affiche le cadre d'évolution en bas
    // Condition créée car on ne récupère que les 151 premiers pokémons (ex: Leveinard a une évolution mais pas dans les 151 premiers -> Evite erreur dans la console)
    if (pokemonEvolution) {
      evolution.innerHTML = `
            <p>Evolution</p>
            <div id="show-evol" class='pokemon' data-id='${pokemonEvolution.pokedexId}'>
                <p>${pokemonEvolution.pokedexId}</p>
                <p>${pokemonEvolution.name}<p>
                <img src="${pokemonEvolution.image}">
            </div>`;

      const showEvol = document.getElementById("show-evol");
      showEvol.addEventListener("click", function () {
        showDetails(evolutionId);
      });
      // Si on ne trouve pas le pokémon dans le tableau (ex : Lephorie)
    } else {
      evolution.innerHTML = "";
    }

    // S'il n'y a pas d'évolution tout court (ex : Florizarre)
  } else {
    evolution.innerHTML = "";
  }
}

// On appelle les fonctions une fois que le code a été lu
getData();
initSearch();
