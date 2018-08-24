import request from 'superagent'

import 'shoelace-css/dist/shoelace.css'

//grab searchBar
let searchBar = document.getElementById('search-bar')
// what happen when you click submit
searchBar.addEventListener('submit', event => {
  event.preventDefault()
})

request.get('https://itunes.apple.com/search?term=james+brown')
  .then(response => {
    let searchResults = response.body
    console.log(response)
  })
