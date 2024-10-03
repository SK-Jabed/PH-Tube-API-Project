function getTimeString(time) {
    // Get Hour and Rest Seconds 
    const hour = parseInt(time / 3600);
    let remainingSeconds = time % 3600;
    const minute = parseInt(remainingSeconds / 60);
    remainingSeconds = remainingSeconds % 60;
    return `${hour} hour ${minute} minute ${remainingSeconds} seconds ago`;
}

// Fetch, Load and Show Catagories on HTML
// Create loadCatagories 
const loadCategories = () => {
    // Fetch The Data
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then(res => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.log(error))
};


const loadVideos = () => {
    // Fetch The Data
    fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then(res => res.json())
    .then((data) => displayVideos(data.videos))
    .catch((error) => console.log(error))
};

const loadCategoryVideos = (id) => {
    // alert(id);
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then(res => res.json())
    .then((data) => (data.videos))
    .catch((error) => console.log(error))
}

const displayVideos = (videos) =>{
    const videosContainer = document.getElementById("videos-container")
    videos.forEach((video) => {        
        console.log(video);
        const card = document.createElement("div");
        card.classList = "card card-compact"
        card.innerHTML = `
        <figure class="h-[200px] w-[312px]">
            <img class="w-full h-full object-cover" src=${video.thumbnail} alt="Thumbnails" />
            ${
                video.others.posted_date?.length === 0 
                ? "" 
                : `<span class="absolute text-xs right-6 bottom-20 bg-black text-white rounded p-1">${getTimeString(video.others.posted_date)}</span>`
            }
            
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
const displayCategories = (categories) => {
    const categoryContainer = document.getElementById("categories-container");

    categories.forEach((item) => {
        console.log(item);

        // Create Button
        const buttonContainer = document.createElement("div");
        buttonContainer.innerHTML = `
            <button onclick="loadCategoryVideos()" class="btn">
            ${item.category}
            </button>
        `;

        // Add Button to Category Container
        categoryContainer.append(buttonContainer);
    });  
};
loadCategories();
loadVideos();