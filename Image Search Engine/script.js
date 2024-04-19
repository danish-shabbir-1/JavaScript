let accessKey = 'cbc23JuUPLN6VUgOTFZ-2VR-drvtRNJ1vuKphq583Xs'
let searchForm = document.getElementById('Search-form')
let searchBox = document.getElementById('Search-Box')
let searchResult = document.getElementById('Search-result')
let showMoreBtn = document.getElementById('show-more-btn')

let keyword = ''
let page = 1

async function searchImages() {
    keyword = searchBox.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`    

    const respone = await fetch(url);
    const data = await respone.json()

if (page === 1) {
    searchResult.innerHTML = ''
}

    const result = data.results;

    result.map((item) => {
        const image = document.createElement("img")
        image.src = item.urls?.small
        const imageLink = document.createElement("a")
        imageLink.href = item.links?.html
        imageLink.target = "_blank"
        imageLink.appendChild(image)
        searchResult.appendChild(image)
    })
    showMoreBtn.style.display = 'block'
}

searchForm.addEventListener("submit" , (e) => {
    e.preventDefault()
    page = 1
    searchImages()
})

showMoreBtn.addEventListener("click" , () => {
    page++
    searchImages()
})