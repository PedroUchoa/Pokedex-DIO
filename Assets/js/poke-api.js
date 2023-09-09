const pokeApi = {}


function converteEmModel(pokemonDetail) {
    const pokemon = new Pokemon()
    pokemon.name = pokemonDetail.name
    pokemon.value = pokemonDetail.order
    pokemon.types = pokemonDetail.types.map((typeSlot) => typeSlot.type.name)
    pokemon.type = pokemon.types[0]
    pokemon.image = pokemonDetail.sprites.other.dream_world.front_default
    pokemon.hp = pokemonDetail.stats[0].base_stat
    pokemon.attack = pokemonDetail.stats[1].base_stat
    pokemon.defense = pokemonDetail.stats[2].base_stat
    pokemon.specialAttack = pokemonDetail.stats[3].base_stat
    pokemon.specialDefense = pokemonDetail.stats[4].base_stat
    pokemon.speed = pokemonDetail.stats[5].base_stat
    

    return pokemon;
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(converteEmModel)
}

pokeApi.getPokemons = (offset = 0, limit = 12) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}=&limit=${limit}`
    return fetch(url)
        .then(response => response.json())
        .then(data => data.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonDetails) => pokemonDetails)
        .catch(err => console.log(err))
}

pokeApi.getAnPokemon = (pokemonName) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    return fetch(url)
        .then(response => response.json())
        .then(data => converteEmModel(data))
        .then(details => details)
}