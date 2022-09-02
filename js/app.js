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
            <li><a class="text-decoration-none text-secondary px-3 link-primary" href="#">${info.category_name}</a></li>
        </ul>
`

        catagorySection.appendChild(catagoryDiv);
    }


}


loadCatagory();