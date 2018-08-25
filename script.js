import 'shoelace-css/dist/shoelace.css'

import request from 'superagent'

// this is getting the search button from html
let searchForm = document.getElementById('form')
// what happen when you click submit
searchForm.addEventListener('submit', event => {
  event.preventDefault()

  // this is getting the search input from html
  let searchInput = document.getElementById('search-bar')
  let searchTerms = searchInput.value.split(' ').map(searchTerm => searchTerm.trim())
  let userInput = searchTerms.toString().replace(/,/g, '+')

  request.get('https://itunes.apple.com/search?term=' + userInput)
    .then(response => JSON.parse(response.text))
    .then(body => {
    //   document.getElementById('results-list').innerHTML = ''
      for (let item of body.results) {
        displayResults(item)
      }
    })
  searchForm.reset()
})

// write function to display search results on the page
function displayResults (item) {
  if (item.kind === 'song') {
    let resultsList = document.getElementById('results-list')
    let resultsLi = document.createElement('li')
    resultsLi.dataset.previewURL = item.previewURL
    resultsLi.innerHTML = `<img src="${item.artworkUrl100}" alt = "artwork"><br>
                         <p class ="song-name">${item.trackName}</p>
                         <p class ="artist-name">${item.artistName}</p>`
    resultsList.appendChild(resultsLi)
  }
}
