const loadCatagory = () => {

    const url = `https://openapi.programming-hero.com/api/news/categories`;
    fetch(url)
        .then(response => response.json())
        .then(data => displayCatagory(data.data.news_category))
        .catch(err => alert(err))

}

const displayCatagory = (data) => {
    console.log(data)

}


loadCatagory();