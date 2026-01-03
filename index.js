// API: http://www.omdbapi.com/?i=tt3896198&apikey=9a6fa048


const resultsEl = document.querySelector('.results__grid');
const id = localStorage.getItem("id");

function onSearchChange(event) {
    const query = document.querySelector('.search__input').value;
    console.log(event.target.value);
    renderResults(query);
}

async function renderResults(query) {
    const results = await fetch(`https://www.omdbapi.com/?s=${encodeURIComponent(query)}&apikey=9a6fa048`);
    const resultsData = await results.json();
    console.log(resultsData);
    resultsEl.innerHTML = resultsData.Search.map(resultHTML).join('');
}

function resultHTML(resultsData) {
    if (resultsData.Title === 'Undefined') {
        return;
    }
return `
        <div class="results__card">
            <img src="${resultsData.Poster}" alt="" class="results__card--img">
            <div class="results__card--info">
                <h3 class="results__card--title">${resultsData.Title}</h3>
                <p class="results__card--year"><em>(${resultsData.Year})</em></p>

            </div>
        </div>
    `
}


renderResults();


