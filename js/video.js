console.log("Video Added");
// Fetch, Load and Show Catagories on HTML
// Create loadCatagories 
const loadCatagories = () => {
    // Fetch The Data
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then(res => res.json())
    .then((data) => displayCatagories(data.categories))
    .catch((error) => console.log(error))
};


const loadVideos = () => {
    // Fetch The Data
    fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then(res => res.json())
    .then((data) => displayVideos(data.videos))
    .catch((error) => console.log(error))
};

const displayVideos = (videos) =>{
    const videosContainer = document.getElementById("videos-container")
    videos.forEach((video) => {        
        console.log(video);
        const card = document.createElement("div");
        card.classList = "card card-compact"
        card.innerHTML = `
        <figure class="h-[200px] w-[312px]">
            <img class="w-full h-full object-cover" src=${video.thumbnail} alt="Thumnails" />
            <span class="absolute right-6 bottom-20 bg-black text-white rounded p-1">${video.others.posted_date}</span>
        </figure>
        <div class="px-0 py-2 flex gap-2">
            <div>
                <img class="w-10 h-10 rounded-full object-cover" src=${video.authors[0].profile_picture} alt="" />
            </div>
            <div>
                <h2 class="font-bold">${video.title}</h2>
                <div class="flex items-center gap-1">
                    <p class="text-grey">${video.authors[0].profile_name}</p>
                    ${
                        video.authors[0].verified === true ? 
                        `<img class="w-5" src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png" alt="" />`
                        : ""
                    }
                        
                </div>
                <p></p>
            </div>
        </div>
        `;
        videosContainer.append(card);
    });
};

// Create displayCatagories
const displayCatagories = (categories) => {
    const categoryContainer = document.getElementById("categories-container");

    categories.forEach((item) => {
        console.log(item);

        // Create Button
        const button = document.createElement("button");
        button.classList = "btn";
        button.innerText = item.category;

        // Add Button to Category Container
        categoryContainer.appendChild(button);
    });  
};
loadCatagories();
loadVideos();