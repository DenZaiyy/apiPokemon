const app = document.querySelector("#app");

const pagination = {
    previous: "",
    current: "https://pokeapi.co/api/v2/pokemon?limit=10&offset=0",
    next: "",
};

async function getPokeList(url) {
    await axios.get(url).then(async (res) => {
        pagination.previous = res.data.previous;
        pagination.current = url;
        pagination.next = res.data.next;
        // console.log(res.data);

        app.innerHTML = "";
        for (const element of res.data.results) {
            await axios.get(element.url).then((reslt) => {
                let div = document.createElement("div");
                div.classList.add("card");
                div.classList.add(reslt.data.types[0].type.name);
                div.innerHTML = `<div class="names"><p>#${reslt.data.id}</p><h2>${reslt.data.name}</h2></div><div class="types"><p>${reslt.data.types[0].type.name}</p></div><div class="img"><img src="${reslt.data.sprites.other["official-artwork"].front_default}" alt="${reslt.data.name}"></div>`;
                app.appendChild(div);
            });
        }
    });
}

getPokeList(pagination.current);

prev.addEventListener("click", () => {
    pagination.previous ? getPokeList(pagination.previous) : null;
});

next.addEventListener("click", () => {
    pagination.next ? getPokeList(pagination.next) : null;
});

// async function fetchPokemonData() {
//     const pokemons = [];

//     try {
//         const response = await axios({
//             method: "get",
//             url: "https://pokeapi.co/api/v2/pokemon?limit=100&offset=0",
//         });

//         const results = response.data.results;

//         for (const element of results) {
//             const pokemonResponse = await axios({
//                 method: "get",
//                 url: element.url,
//             });

//             const pokemon = {
//                 name: element.name,
//                 image: pokemonResponse.data.sprites.other["official-artwork"]
//                     .front_default,
//             };

//             pokemons.push(pokemon);
//         }

//         const numberOfPokemons = pokemons.length;
//         const numberPerPage = 10;
//         const currentPage = 1;
//         const numberOfPages = Math.ceil(numberOfPokemons / numberPerPage);

//         const paginationNumbers = document.querySelector(".pages");

//         const appendPageNumber = (index) => {
//             const pageNumber = document.createElement("button");
//             pageNumber.className = "pagination-number";
//             pageNumber.innerHTML = index;
//             pageNumber.setAttribute("page-index", index);
//             pageNumber.setAttribute("aria-label", "Page " + index);
//             paginationNumbers.appendChild(pageNumber);
//         };
//         const getPaginationNumbers = () => {
//             for (let i = 1; i <= pageCount; i++) {
//                 appendPageNumber(i);
//             }
//         };

//         pokemons.forEach((el) => {
//             // console.log(el);
//             let div = document.createElement("div");
//             div.classList.add("card");
//             div.innerHTML = `<img src="${el.image}" alt="${el.name}" width="100"><h2>${el.name}</h2>`;
//             app.appendChild(div);
//         });
//     } catch (error) {
//         console.error("Error fetching data:", error);
//     }
// }

// fetchPokemonData();
