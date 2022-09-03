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
                   <li><a onclick="catagoryFunction('${info.category_id}')" class="text-decoration-none text-secondary mx-3 py-4 link-primary" href="#">${info.category_name}</a></li>
        </ul >
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
    console.log(data)
    const itemFound = document.getElementById('item-found');
    itemFound.innerHTML = `<p>${data.length} items found </span></p>`



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
                <h5 class="card-title mb-4 fw-semibold">${info.title}</h5>
                <p  class="card-text">${info.details.slice(0, 200)} ...</p>   
            </div>
            <div class="card-body">
            <img src="${info.author.img}" class="img-fluid rounded-circle p-2" style="max-width: 70px;alt="...">
            <small class="card-text me-5">${info.author.name}</small> 
            
            <small class="card-text me-5">
            <svg class="me-2 " xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
          </svg>  
          ${info.total_view}
          </small> 
            
            <button id="arrow-button" class="btn"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right text-primary" viewBox="0 0 16 16">
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


    loadCardId(id);





}



loadCardId('08');

loadCatagory();