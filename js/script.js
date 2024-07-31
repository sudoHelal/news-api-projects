const apiKey = "9025c4ac8b1746a586042edeacc95de6";
const cardContainer = document.getElementById("card-container");
const fetchRandomNews = async() =>{
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
const displayCard = (articles) =>{
    cardContainer.innerHTML = "";
    articles.forEach((article)=>{

        const card = document.createElement("div");
        card.classList.add("card");
        const img = document.createElement("img");
         img.src = article.urlToImage;
         img.alt = article.title;
         const title = document.createElement("h4");
         title.textContent = article.title;
         const description = document.createElement("p");
        description.textContent = article.description;
        card.appendChild(img);
        card.appendChild(title);
        card.appendChild(description);
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