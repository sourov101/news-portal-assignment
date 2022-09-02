const loadCatagory = () => {

    const url = `https://openapi.programming-hero.com/api/news/categories`;
    fetch(url)
        .then(response => response.json())
        .then(data => displayCatagory(data.data.news_category))
        .catch(err => alert(err))

}

const displayCatagory = (data) => {
    const catagorySection = document.getElementById('catagory-div');
    for (const info of data) {
        const catagoryDiv = document.createElement('div');
        catagoryDiv.innerHTML = `
        <ul class="list-unstyled">
            <li><a onclick="catagoryFunction(${info.category_id})" class="text-decoration-none text-secondary px-3 link-primary" href="#">${info.category_name}</a></li>
        </ul>
`

        catagorySection.appendChild(catagoryDiv);
    }


}


const loadCardId = async (value) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${value}`
    const res = await fetch(url);
    const data = await res.json();
    displayCard(data.data);
}



const displayCard = (data) => {
    const cardContainer = document.getElementById('card-section');
    cardContainer.textContent = '';
    data.forEach(info => {
        const cardDiv = document.createElement('div');
        cardDiv.innerHTML = `
        <div class="card mb-3 g-4 shadow" style="max-width: 1500px;">
        <div class="row g-0">
        <div class="col-md-4 ">
            <img src="${info.thumbnail_url}" class="img-fluid rounded-start p-2" alt="...">
        </div>
        <div class="col-md-8">
            <div class="card-body">
                <h5 class="card-title mb-4">${info.title}</h5>
                <p  class="card-text">${info.details.slice(0, 200)} ...</p>   
            </div>
            <div class="card-body">
            <img src="${info.author.img}" class="img-fluid rounded-circle p-2" style="max-width: 70px;alt="...">
            <small class="card-text me-5">${info.author.name}</small> 
            
            <button class="btn"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right text-primary" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
          </svg></button>
            
            </div>

        </div>
        </div> 
        </div>`;

        cardContainer.appendChild(cardDiv);
    });


}
function catagoryFunction(id) {

    const value = '0' + id;
    loadCardId(value);
}



loadCardId('08');

loadCatagory();