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

    try {

        const res = await fetch(url);
        const data = await res.json();
        displayCard(data.data);
    }
    catch (e) {
        console.log(e);
    }
}



const displayCard = (data) => {

    const processData = () => {
        const cardContainer = document.getElementById('card-section');
        cardContainer.textContent = '';


        data.forEach(info => {

            const cardDiv = document.createElement('div');
            cardDiv.innerHTML = `
        <div class="card mb-3 g-4 shadow" style="max-width: 1500px;">
        <div class="row g-0">
        <div class="col-md-4 ">
            <img src="${info.thumbnail_url}" class="img-fluid rounded-start p-2 " alt="...">
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
          <small class="card-text me-5">${info.rating.number}</small>
            <button onclick="newsDetails('${info._id}')" class="btn"  data-bs-toggle="modal" data-bs-target="#detailModal"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right text-primary" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
          </svg></button>
            
            </div>

        </div>
        </div> 
        </div>`;

            cardContainer.appendChild(cardDiv);



        });

        toggleSpinner(false);
    }


    const itemFound = document.getElementById('item-found');
    if (data.length === 0) {
        itemFound.innerHTML = `<p> No News Found </p>`
    }
    else {
        itemFound.innerHTML = `<p>${data.length} items found </p>`
    }

    data.sort((a, b) => {

        return b.total_view - a.total_view;
    });
    data.forEach((e) => {
        processData();
    });
    document.getElementById('view').addEventListener('click', function () {
        data.sort((a, b) => {

            return b.total_view - a.total_view;
        });
        data.forEach((e) => {
            processData();
        });
    })

    document.getElementById('rating').addEventListener('click', function () {
        data.sort((a, b) => {

            return b.rating.number - a.rating.number;
        });
        data.forEach((e) => {
            processData();
        });

    })






}

function newsDetails(id) {
    const url = `https://openapi.programming-hero.com/api/news/${id}`
    fetch(url)
        .then(response => response.json())
        .then(data => displayNewsDetails(data.data[0]))
        .catch(err => alert(err))
}


const displayNewsDetails = (info) => {
    const newsDetails = document.getElementById('card-details');
    newsDetails.innerHTML = ``;
    const newsDiv = document.createElement('div');
    newsDiv.innerHTML = `
    <div class="col">
                    <div class="card h-100">
                        <img src="${info.thumbnail_url}" class="card-img-top p-5" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${info.title}</h5>
                            <p class="card-text">${info.details}</p>
                            <img src="${info.author.img}" class="img-fluid rounded-circle p-2" style="max-width: 70px;alt="...">
                            <p class="card-text">Author: ${info.author.name}</p>
                            <p class="card-text">Publish Date: ${info.author.published_date}</p>
                            <p class="card-text">Rating: ${info.rating.number}</p>
                            <p class="card-text">Badge: ${info.rating.badge}</p>
                            <p class="card-text">Views: ${info.total_view}</p>
                        </div>
                    </div>
                </div>
    `;
    newsDetails.appendChild(newsDiv);
}

function catagoryFunction(id) {
    toggleSpinner(true);
    loadCardId(id);

}

const toggleSpinner = isLoading => {
    const loader = document.getElementById('loader');
    if (isLoading) {
        loader.classList.remove('d-none');
    }
    else {
        loader.classList.add('d-none');
    }
}

loadCardId('08');

loadCatagory();