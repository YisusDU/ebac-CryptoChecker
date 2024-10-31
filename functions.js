const creatPokemonCard = (pokemon) => {
    const card = document.createElement('div');
    card.classList.add('card');

    const name = document.createElement("h2");
    name.classList.add("name");
    name.textContent = pokemon.name;

    const typeDiv = document.createElement("div");
    typeDiv.classList.add("pokemon__type");
    pokemon.types.forEach((type) => {
        const typeSpan = document.createElement("span");
        typeSpan.textContent = type.type.name;
        typeDiv.appendChild(typeSpan);
    });

    const imageContainer = document.createElement('div');
    imageContainer.classList.add('image__container');
    const image = document.createElement("img");
    image.classList.add("pokemon__image");
    image.src = pokemon.sprites.front_default;

    imageContainer.appendChild(image);
    card.appendChild(imageContainer);
    card.appendChild(typeDiv);
    card.appendChild(name);

    return card;
};
/*
//-------------------Vamos a refactorizar la parte de la solicitud al servidor
//Vamos a cambiar fetch por  axios.get
//La parte de la url que tiene un ?limit20, se modifica tambien
//Añadimos un segundo parametro a la  función, que es el limite de pokemons
document.addEventListener('DOMContentLoaded', () => {
    axios.get("https://pokeapi.co/api/v2/pokemon", {params: {limit: 20}})
    //Vamos a comentar la conversión de la respuesta a JSON, pues arroja error
    //.then(response => response.json())
    .then((response) => {
        const pokemonGrid = document.querySelector(".pokemon__grid");
        //Vamos a ver que tiene response
        //Parece que en lugar de un array, tiene un objeto con objetos dentro, 
        console.log(response)
        //Hacemos un destructury con  el objeto data
        //Cambiamos la variable unica del then padre por response
        const {data} = response;

        data.results.forEach((pokemon) => {
            fetch(pokemon.url)
                .then(response => response.json())
                .then((pokemonData) => {
                    const pokemonCard = creatPokemonCard(pokemonData);
                    pokemonGrid.appendChild(pokemonCard);
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Algo salio mal, intenta de nuevo');
                });
        });
    });
});
*/
//-----------Vamos a hacer que nuestra función sea asíncrona
const loadPokemos = async () => {
    const pokemonGrid = document.querySelector(".pokemon__grid");
    try{
        const response = await  axios.get("https://pokeapi.co/api/v2/pokemon", {params: {limit:  20}});
        const pokemons = response.data.results;
        //Limpiamos  el grid
        pokemonGrid.innerHTML = "";
        //Recorremos el array de pokemons
        for(pokemon of pokemons){
            //Vamos a ver el error 
            console.log(pokemon);
            const datailResponse =  await axios.get(pokemon.url);
            console.log(datailResponse);
            //En la consola vemos que  datailResponse tiene un objeto con un objeto data
            //Accedemos a el para pasar el argumento a pokemon card
            const pokemonCard = creatPokemonCard(datailResponse.data);
            pokemonGrid.appendChild(pokemonCard);
        }

    }  catch(error){ 
        console.error('Error:', error);
        alert('Algo salio mal, intenta de nuevo');
    }

}

//Nos aseguramos que se ejecute el codigo despues de cargar el dom
document.addEventListener("DOMContentLoaded", loadPokemos);


//Vamos a refactorizar el codigo que busca pokemons y vamos a añadir que se busque el pokemon al preionar enter
//Vamos a aplicar una función asincrona
/*
 searchPokemon = (pokemonName) => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Pokemon no encontrado');
            }
            return response.json();
        })
        .then(pokemonData => {
            const pokemonGrid = document.querySelector(".pokemon__grid");
            pokemonGrid.innerHTML = ''; 
            const pokemonCard = creatPokemonCard(pokemonData);
            pokemonGrid.appendChild(pokemonCard);
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Pokemon no encontrado. Por favor, intenta con otro nombre.');
        });
};
*/
let searchPokemon = async  () => {
    //Apuntamos al input de busqueda, al valor y lo convertimos en minúsculas
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    //Validamos si tiene algo escrito deicho  input
    if(searchInput){
        //e intentamos  buscar el pokemon
        try{
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${searchInput}`);
            //Apuntamos al pokemon grid y lo limpiamos
            const pokemonGrid = document.querySelector(".pokemon__grid");
            pokemonGrid.innerHTML = '';
            //Creamos el pokemon card
            const pokemonCard = creatPokemonCard(response.data);
            //Lo agregamos al pokemon grid
            pokemonGrid.appendChild(pokemonCard);
        } catch(error) {
            console.error('Error:', error);
            alert('Pokemon no encontrado. Por favor, intenta con otro nombre.');
        };

    }

}




document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');

    searchForm.addEventListener('submit', (e) => {
        e.preventDefault(); 
        const pokemonName = searchInput.value.trim();
        if (pokemonName) {
            searchPokemon(pokemonName);
        }
    });
    searchInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            const pokemonName = searchInput.value.toLowerCase();
            searchPokemon(pokemonName);
        }
    })
});