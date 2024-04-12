
const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');
const maxRecords = 151;
const limit = 10;
let offset = 0;
let addedPokemonNumbers = []; // Lista para armazenar os números dos Pokémons já adicionados

function loadPokemonItems(offset, limit) {
  function convertPokemonToHtml(pokemon) {
    return `
      <li class="pokemon ${pokemon.type}">
        <span class="number">#${pokemon.number}</span>
        <span class="name">${pokemon.name}</span>
  
        <div class="detail">
          <ol class="types">
            ${pokemon.types.map((type) => `<li class="type type${type}">${type}</li>`).join('')}
          </ol>
          <img src="${pokemon.photo}" alt="${pokemon.name}">
        </div>
      </li>
    `;
  }

  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    pokemons.sort((a, b) => a.number - b.number);

    // Verificar cada novo Pokémon se já está na lista
    pokemons.forEach((pokemon) => {
      // Verificar se o número do Pokémon já foi adicionado
      if (!addedPokemonNumbers.includes(pokemon.number)) {
        const newHtml = convertPokemonToHtml(pokemon);
        pokemonList.innerHTML += newHtml;
        addedPokemonNumbers.push(pokemon.number); // Adicionar o número à lista de adicionados
      }
    });
  });
}

loadPokemonItems(offset, limit);

loadMoreButton.addEventListener('click', () => {
  offset += limit;

  const qtdRecordsNexPage = offset + limit

  if (qtdRecordsNexPage >= maxRecords){
    const newLimit = maxRecords - offset
    loadPokemonItems(offset, newLimit);


    loadMoreButton.parentElement.removeChild(loadMoreButton)
  } else {
  loadPokemonItems(offset, limit);
  }
});





   

  