// API: http://www.omdbapi.com/?s={searchquery}&apikey=9a6fa048

const resultsBox = document.querySelector('.results');
const resultsEl = document.querySelector('.results__grid');
const resultsTitleEl = document.querySelector('.results__title');


function onSearchChange(event) {
    if (event.key === 'Enter') {
        const query = document.querySelector('.search__input').value;
        showQuery(query);
        renderResults(query);
        onSortChange({target: {value: 'default'}});
    }
}

async function renderResults(query) {
    resultsBox.classList.add('results__loading');
    resultsEl.classList.add('results__grid--loading');
    
    const results = await fetch(`https://www.omdbapi.com/?s=${encodeURIComponent(query)}&apikey=9a6fa048`);
    const resultsData = await results.json();
    
    resultsBox.classList.remove('results__loading');
    resultsEl.classList.remove('results__grid--loading');
    
    console.log(resultsData);
    resultsEl.innerHTML = resultsData.Search.map(resultHTML).join('');
}

function showQuery(query) {
    resultsTitleEl.innerHTML = `Search Results for "${query}"`;
}

function resultHTML(resultsData) {
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

function onSortChange(event) {
    const sortBy = event.target.value;
    const sortedData = [];
    console.log('Sort by:', sortBy);
    if (sortBy === 'title-asc') {
        sortedData = resultsData.sort((a, b) => a.Title.localeCompare(b.Title));
    } else if (sortBy === 'title-desc') {
        sortedData = resultsData.sort((a, b) => b.Title.localeCompare(a.Title));
    } else if (sortBy === 'year-asc') {
        sortedData = resultsData.sort((a, b) => a.Year - b.Year);
    } else if (sortBy === 'year-desc') {
        sortedData = resultsData.sort((a, b) => b.Year - a.Year);
    }
    
    console.log(sortedData);
    resultsEl.innerHTML = sortedData.Search.map(resultHTML).join('');
} 

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}