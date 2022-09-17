const poke_container = document.getElementById("container")
var poke_count = 100
// out of 905 counts 

const colors = {
    fire: '#fddfdf',
    grass: '#defde0',
    electric: '#fcf7de',
    water: '#def3fd',
    ground: '#f4e7da',
    rock: '#d5d5d4',
    fairy: '#fceaff',
    poison: '#98d7a5',
    bug: '#f8d7a5',
    dragon: '#97b3e6',
    psychic: '#eaeda1',
    flying: '#9dbfcc',
    fighting: '#e6e0d4',
    normal: '#f5f5f5'
}

const type_colors = Object.keys(colors)


const fetchPokemon = async () => {
    for (let i = 1; i <= poke_count; i++) {
        await getPokemon(i)
    }
}


const getPokemon = async (id) => {
    const base_url = `https://pokeapi.co/api/v2/pokemon/${id}`
    const result = await fetch(base_url)
    const data = await result.json()
    createPokemonCard(data)
        
}
// pagination - not working - Sorry -!!! 
// var allpokemon = 900 
// var cardsPerPage = 20
// var currentPage = 1

// function noOfPages() {
//     return Math.ceil(allpokemon/cardsPerPage);
// }
    
// function prevPage() {
//     if(currentPage > 1) {
//         currentPage -- ;
//         changePage(currentPage);
//     }
// }

// function nextPage() {
//     if(currentPage < noOfPages()) {
//         currentPage ++ ;
//         changePage(currentPage);
//     }
// }

// function changePage(arrOfObject,page) {
//     const prevBtn = document.getElementById("prevBtn");
//     const nextBtn = document.getElementById("nextBtn");
//     const listOfCards = document.getElementById("container");
//     let pageSpan = document.getElementById("page");
    
//     if (page < 1) {
//         page = 1;
//     }
//     if (page > noOfPages()) {
//         page = noOfPages()
//     }


//     for(var i= ( page -1) * cardsPerPage ; i < (page * cardsPerPage) && i < arrOfObject.length; i++) {
//         listOfCards.innerHTML += `${arrOfObject[i].id}<br>` 
//     }

//     pageSpan.innerHtml = `${page}/${noOfPages()}`;

//     if(page === 1) {
//         prevBtn.style.visibility = "hidden";
//     } else {
//         prevBtn.style.visibility = "visible"
//     }

//     if(page === noOfPages()) {
//         nextBtn.style.visibility = "hidden";
//     } else {
//         nextBtn.style.visibility = "visible"
//     }

// }

// window.onload = () => {
//     document.getElementById('prevBtn').addEventListener('click', (e) => {
//         e.preventDefault();
//         prevPage();
//     });

//     document.getElementById('nextBtn').addEventListener('click', (e) => {
//         e.preventDefault();
//         nextPage();
//     });

//     noOfPages(1);
// }





const createPokemonCard = (poke) => {
    const PokeEle = document.createElement("div")
    PokeEle.classList.add("pokemon")

    let name = poke.name[0].toUpperCase() + poke.name.slice(1)

    let Numb = poke.id.toString().padStart(3, '0')

    let poke_abiity = poke.abilities.map(ability => ability.ability.name)

    let poke_mov = poke.moves.map(move => move.move.name)

    let top_ten = poke_mov.slice(0, 9)
    
    let pokemon_type = poke.types.map(type => type.type.name)

    let type_poke = type_colors.find(type => pokemon_type.indexOf(type) > -1)

    let Pokemon_color = colors[type_poke]

    PokeEle.style.backgroundColor = Pokemon_color

    const pokeHtml = `
    <div class="img-container">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.id}.png" alt="">
        
    </div>  
    <div class="info">
        <span class="idNo">${Numb}</span> 
        <h3 class="name">${name}</h3>  
      <div id="details" class="details">
        <span class="type">Type: ${pokemon_type}</span>      
        <h6 class="weight">Weighing : ${poke.weight} </h6>
        <span class="Ability">Ability : ${poke_abiity} </span><br>
        <span id= "mov" class="moves"> Moves : ${top_ten} </span><br>
        
      </div> 
    </div>
   
    `

    PokeEle.innerHTML = pokeHtml

    poke_container.appendChild(PokeEle)
}




fetchPokemon()