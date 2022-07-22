const API = "https://jikan1.p.rapidapi.com/top/anime/1/upcoming";

const content = null || document.getElementById("content");

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "fe9acaebdfmsh53c5162b46651b7p149331jsn27f8e1b846ef",
    "X-RapidAPI-Host": "jikan1.p.rapidapi.com",
  },
};

// fetch(API, options)
//   .then((response) => response.json())
//   .then((response) => console.log(response))
//   .catch((err) => console.error(err));

async function fetchData(urlApi) {
  const response = await fetch(urlApi, options);
  const data = await response.json();
  return data;
}

console.log(fetchData(API));

(async () => {
  try {
    const animes = await fetchData(API);
    let view = `
        ${animes.top
          .map(
            (anime) => `
        <div class="group relative">
        <div
          class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none"
        >
          <img src="${anime.image_url}" alt="${anime.title}" class="w-full" />
        </div>
        <div class="mt-4 flex justify-between">
          <h3 class="text-sm text-gray-700">
            <span aria-hidden="true" class="absolute inset-0"></span>
            ${anime.title}
          </h3>
        </div>
      </div>
        `
          )
          .slice(0, 4)
          .join("")}        
        `;
    content.innerHTML = view;
  } catch (error) {
    console.log(error);
    content.innerHTML = `<h1>${error}</h1>`;
  }
})();
