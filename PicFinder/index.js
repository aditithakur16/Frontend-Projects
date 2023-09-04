const accessKey = "vzSYcC5deVVDPZRPVo-6RQMX0zxIrQwZrza6oxCgbZc";

//For input section
const formEl = document.querySelector("form");

//for get input element
const inputEl = document.getElementById("search-input");

//for images
const searchResults = document.querySelector(".search-results");//if we use classname then always use . after that class name

//for import show more button
const showMore = document.getElementById("show-more-button");

//for store all the input data
let inputData = "";
let page = 1;

async function searchImages(){
    inputData = inputEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;
    
    const response = await fetch(url);
    const data = await response.json();

    const results = data.results;

    if(page === 1){
        searchResults.innerHTML = "";
    }

    results.map((result)=>{
        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("search-result");
        const image = document.createElement('img');
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imageLink = document.createElement('a');
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;

        imageLink.appendChild(image);
        //imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        //imageWrapper.appendChild(imageWrapper);
        searchResults.appendChild(imageWrapper);
    });

    page++;
    if(page > 1){
        showMore.style.display = "block";
    }
}

formEl.addEventListener("submit",(event)=>{
    event.preventDefault();
    page = 1;
    searchImages();
});

showMore.addEventListener("click",()=>{
    searchImages();
});
