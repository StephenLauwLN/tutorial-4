function pad(num, size) {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
  }
  
  async function fetchPokemon(url) {
    const response = await fetch(url);
    const data = await response.json();

    const pokemonsDiv = document.getElementById("pokemons");

    const pokemonContainer = document.createElement("div");
    pokemonContainer.className = "pokemon-container";
    pokemonsDiv.appendChild(pokemonContainer);

    const pId = document.createElement("p");
    pId.className = "pid";
    pId.appendChild(document.createTextNode(`${pad(data.id, 3)}`));
    pokemonContainer.appendChild(pId);

    const img = document.createElement("img");
    img.src = data.sprites.front_default;
    pokemonContainer.appendChild(img);

    const pName = document.createElement("p");
    pName.className = "name";
    pName.appendChild(document.createTextNode(`${data.name}`));
    pokemonContainer.appendChild(pName);

    const pType = document.createElement("p");
    pType.className = "type";
    const types = data.types.map((type) => type.type.name).join(", ");
    pType.appendChild(document.createTextNode(`${types}`));
    pokemonContainer.appendChild(pType);
  }
  
  async function fetchPokemons() {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1000");
    const data = await response.json();
  
    const pokemonsDiv = document.getElementById("pokemons");
  
    for (const pokemon of data.results) {
      const div = document.createElement("div");
      div.id = pokemon.name;
      div.className = "pokemon";
      pokemonsDiv.appendChild(div);

      await fetchPokemon(pokemon.url);
    }
  }
  
  fetchPokemons();
  
  