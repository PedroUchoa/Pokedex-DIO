const lista = document.getElementById("pokemonList")
const loadMoreButton = document.getElementById("loadMoreButton")
let fade = document.getElementById("fade")
let modal = document.getElementById("modal")
let body = document.getElementsByTagName("BODY")[0]
const limit = 12
let offset = 0


function convertPokemonToLi(pokemon) {
    return
}

function loadPokemon(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        lista.innerHTML += pokemons.map((pokemon) => `       
            <li class="pokemon ${pokemon.type}" >
                <span  class="number">#${pokemon.value}</span>
                <span class="name">${pokemon.name}</span>
                <div class="details">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${pokemon.type}" >${type}</li>`).join('')}
                      
                    </ol>
                    <img src="${pokemon.image}"
                    alt="${pokemon.name}">
                </div>
                  <button onclick="showModal('${pokemon.name}')">Details</button>
            </li>
        `).join('')
    })
}

loadPokemon(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    loadPokemon(offset, limit);
})

function closeModal() {
    modal.className = "";
    fade.classList.add("hide")
    modal.classList.add("hide")
    
    body.style.overflow = null
}


function showModal(pokemonName) {

    pokeApi.getAnPokemon(pokemonName).then(pokemon => {
        console.log
        modal.innerHTML = `
         <div class="modal-header">
            <h2>Pokemon Status</h2>
            <button id="close-modal" onclick="closeModal()">X</button>
        </div>
        <div class="modal-body">
            <div class="progress-header">
                <span class="progress-name">${pokemon.name}</span>
                <span class="progress-number">#${pokemon.value}</span>
            </div>
            <img src=${pokemon.image}
                alt="">
            <section class="progress-container">
                <ul>
                    <li>
                        <h3>Hp:</h3>
                        <span>${pokemon.hp}</span>
                        <div class="progress-principal">
                            <div class="progress ${pokemon.type}" style="width: ${pokemon.hp}%"></div>
                        </div>
                    </li>
                    <li>
                        <h3>attack:</h3>
                        <span>${pokemon.attack}</span>
                        <div class="progress-principal">
                            <div class="progress ${pokemon.type}" style="width: ${pokemon.attack}%"></div>
                        </div>
                    </li>
                    <li>
                        <h3>defense:</h3>
                        <span>${pokemon.defense}</span>
                        <div class="progress-principal">
                            <div class="progress ${pokemon.type}" style="width: ${pokemon.defense}%"></div>
                        </div>
                    </li>
                    <li>
                        <h3>sp-attack:</h3>
                        <span>${pokemon.specialAttack}</span>
                        <div class="progress-principal">
                            <div class="progress ${pokemon.type}" style="width: ${pokemon.specialAttack}%"></div>
                        </div>
                    </li>
                    <li>
                        <h3>sp-defense:</h3>
                        <span>${pokemon.specialDefense}</span>
                        <div class="progress-principal">
                            <div class="progress ${pokemon.type}" style="width: ${pokemon.specialDefense}%"></div>
                        </div>
                    </li>
                    <li>
                        <h3>speed:</h3>
                        <span>${pokemon.speed}</span>
                        <div class="progress-principal">
                            <div class="progress ${pokemon.type}" style="width: ${pokemon.speed}%"></div>
                        </div>
                    </li>
                </ul>
            </section>`
        modal.classList.add(pokemon.type)
    })
    fade.classList.remove("hide")
    modal.classList.remove("hide")

    body.style.overflow = "hidden"

}

