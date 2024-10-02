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
loadCatagories();

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
// displayCatagories();