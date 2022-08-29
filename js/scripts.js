
let pokemonRepository = function() {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
    function add(pokemon) {
        if (
            typeof pokemon === 'object' && 'name' in pokemon
        ){
            pokemonList.push(pokemon);
        }else{
            console.log('This is not a pokemon!');
        }
    };

    function loadList () {
        return fetch(apiUrl).then(function(response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name, detailsUrl: item.url 
                };
                add(pokemon);
                console.log(pokemon)
            });
        }).catch(function(e) {
            console.error(e);
        })
    }
    
    function getAll() {
        return pokemonList;
    };
    function listItem(pokemon) {
        let pokemonList = document.querySelector(".list-group");
        let listItem = document.createElement("li")
        listItem.classList.add('group-list-item')
        let button = document.createElement("button")
        button.setAttribute('data-toggle', 'modal');
        button.setAttribute('data-target', '#pokemonModal' + pokemon.name);
        // addPokemonListener(button, pokemon);
        addPokemonModal(pokemon);
        button.innerText = pokemon.name;
        button.classList.add("button-class");
        listItem.appendChild(button);
        pokemonList.appendChild(listItem);
        //showDetails(pokemon);
        }
    
    function addPokemonModal (pokemon){
        let $baseModal = $('#baseModal');
        let $pokemonModal = $baseModal.clone();
        loadDetails(pokemon).then(function() {
            $pokemonModal.attr('id', 'pokemonModal' + pokemon.name);
            $pokemonModal.find('.modal-title').text(pokemon.name);
            $pokemonModal.find('.modal-body-image').html('<img src="' + pokemon.imageUrl +'" />');
            $pokemonModal.find('.modal-body-weight').text('Weight: ' +  pokemon.weight);
            $pokemonModal.find('.modal-body-height').text('Height: ' + pokemon.height);
            // $pokemonModal.find('.modal-body-types').text('Types: ' + JSON.stringify(pokemon.types));
            // $pokemonModal.find('.modal-body-abilities').text('Abilities: ' + JSON.stringify(pokemon.abilities));
    
            $pokemonModal.appendTo('body');
        })
 
    }    
   



    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function(response) {
            return response.json();
        }).then(function(details) {
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
            item.weight = details.weight;
            item.abilities = details.abilities;
        }).catch(function(e) {
            console.log(e);
        })
    }
    function showDetails(pokemon) {
        console.log(pokemon);
        loadDetails(pokemon).then(()=> {
            showModal(pokemon);
        })
    }

    return {
        add: add,
        getAll: getAll,
        listItem: listItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails
    };
}();

pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function(pokemon) {
        pokemonRepository.listItem(pokemon);
    });
});
