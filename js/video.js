function getTimeString(time) {
    // Get Hour and Rest Seconds 
    const hour = parseInt(time / 3600);
    let remainingSeconds = time % 3600;
    const minute = parseInt(remainingSeconds / 60);
    remainingSeconds = remainingSeconds % 60;
    return `${hour} hour ${minute} minute ${remainingSeconds} seconds ago`;
}

const removeActiveClass = () =>{
    const buttons = document.getElementsByClassName("category-btn");
    console.log(buttons);
    for (let button of buttons) {
        button.classList.remove("active");
    }
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


const loadVideos = (searchText = "") => {
    // Fetch The Data
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
        .then(res => res.json())
        .then((data) => displayVideos(data.videos))
        .catch((error) => console.log(error))
};

const loadCategoryVideos = (id) => {
    // alert(id);
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
        .then(res => res.json())
        .then((data) => {
            // Remove Active Class From All
            removeActiveClass();
            // Active the id Class
            const activeButton = document.getElementById(`btn-${id}`);
            activeButton.classList.add("active");
            displayVideos(data.category);
        })
        .catch((error) => console.log(error))
}


const loadDetails = async(videoId) => {
    console.log(videoId);
    const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
    const res = await fetch(url);
    const data = await res.json();
    displayDetails(data.video);
}


const displayDetails = (video) => {
    console.log(video);
    const detailsContainer = document.getElementById("modal-content");
    detailsContainer.innerHTML = `
    <img src="${video.thumbnail}">
    <p>${video.description}</p>
    `
    // way-1
    // document.getElementById("ShowModalData").click();
    // way-2
    document.getElementById("customModal").showModal();
}


const displayVideos = (videos) =>{
    const videosContainer = document.getElementById("videos-container");
    videosContainer.innerHTML = "";

    if (videos.length === 0) {
        videosContainer.classList.remove("grid");
        videosContainer.innerHTML = `
        <div class="min-h-[300px] w-full mx-auto flex flex-col gap-5 justify-center items-center">
        <img src="assets/Icon.png" alt="No Content Icon">
        <h2 class="text-center text-2xl font-extrabold">
        Oops!! Sorry, There is no content here
        </h2>
        </div>
        `;
        return;
    }
    else {
        videosContainer.classList.add("grid");
    }

    videos.forEach((video) => {        
        // console.log(video);
        const card = document.createElement("div");
        card.classList = "card card-compact"
        card.innerHTML = `
        <figure class="h-[200px] w-[312px]">
            <img class="w-full h-full object-cover" src=${video.thumbnail} alt="Thumbnails" />
            ${
                video.others.posted_date?.length === 0 
                ? "" 
                : `<span class="absolute text-xs right-6 bottom-28 bg-black text-white rounded p-1">${getTimeString(video.others.posted_date)}</span>`
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
                <button onclick="loadDetails('${video.video_id}')" class="btn btn-sm btn-error">
                Details
                </button>
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
            <button id="btn-${item.category_id}" onclick="loadCategoryVideos(${item.category_id})" class="btn category-btn">
            ${item.category}
            </button>
        `;

        // Add Button to Category Container
        categoryContainer.append(buttonContainer);
    });  
};

document.getElementById("search-input").addEventListener("keyup", (e) => {
    loadVideos(e.target.value);
});
loadCategories();
loadVideos();