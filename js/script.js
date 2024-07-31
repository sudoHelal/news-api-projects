const apiKey = "9025c4ac8b1746a586042edeacc95de6";
const cardContainer = document.getElementById("card-container");
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById("search-button");

const fetchRandomNews = async(query) =>{
    try{
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apiKey=${apiKey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;


    }catch(error){
        console.error("Error fetching random news",error);
        return [];
    }
}
searchButton.addEventListener("click", async() =>{
    const query = searchInput.value.trim();
    console.log(query);
    if(query !== ""){
        try{
            const articles = await fetchNewsQuery(query);
            displayCard(articles);
        }catch(error){
            console.error("Error fetching news by query",error);
        }
    }


});
const fetchNewsQuery = async (query) =>{
    try{
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=10&apiKey=${apiKey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;


    }catch(error){
        console.error("Error fetching random news",error);
        return [];
    }
}
const displayCard = (articles) =>{
    cardContainer.innerHTML = "";
    articles.forEach((article)=>{

        const card = document.createElement("div");
        card.classList.add("card");
        const img = document.createElement("img");
         img.src = article.urlToImage;
         img.alt = article.title;
         const title = document.createElement("h4");
         const truncatedTitle = article.title.length > 30? 
         article.title.slice(0, 30) +"...." : article.title;
         title.textContent = truncatedTitle;
         const description = document.createElement("p");
        description.textContent = article.description;
        card.appendChild(img);
        card.appendChild(title);
        card.appendChild(description);
        card.addEventListener("click", () =>{
            window.open(article.url, "_blank");
        }),
        cardContainer.appendChild(card);


    })
}

(async() =>{
   try{
    const articles  = await  fetchRandomNews();
    displayCard(articles);
   } catch(error){
    console.log("Error fetching random news",error);
   }
})()