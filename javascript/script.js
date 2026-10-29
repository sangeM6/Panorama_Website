function goToCategory(category) {
    const categoryIds = [
        "dogs",
        "cats",
        "birds",
        "fish",
        "small-animals",
        "accessories"
    ];

    categoryIds.forEach(function(id) {
        const section = document.getElementById(id);

        if (section) {
            if (category === "all" || id === category) {
                section.style.display = "block";
            } else {
                section.style.display = "none";
            }
        }
    });

    if (category === "all") {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    } else {
        const selectedSection = document.getElementById(category);

        if (selectedSection) {
            selectedSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    }
}

//get the hamburger button and navigation menu
const menuButton= document.querySelector(".nav-toggle");
const navigation = document.querySelector("nav");

//opening or closing the menu when button is clicked
if(menuButton && navigation) {
    menuButton.addEventListener("click", function() {
        navigation.classList.toggle("dropdown-open")
    })
}

// Product search functionality
document.addEventListener("DOMContentLoaded", function() {
    const searchInput = document.getElementById("product-search");
    const searchButton = document.getElementById("search-button");
    const searchMessage = document.getElementById("search-message");

    const categoryIds = [
        "dogs",
        "cats",
        "birds",
        "fish",
        "small-animals",
        "accessories"
    ];

    function searchProducts() {
        const searchText = searchInput.value.trim().toLowerCase();
        let matchingProducts = 0;

        categoryIds.forEach(function(id) {
            const section = document.getElementById(id);

            if (!section) {
                return;
            }

            const products = section.querySelectorAll(".product");
            let sectionHasMatch = false;

            products.forEach(function(product) {
                const matches = product.textContent
                    .toLowerCase()
                    .includes(searchText);

                product.style.display = matches ? "" : "none";

                if (matches) {
                    matchingProducts++;
                    sectionHasMatch = true;
                }
            });

            section.style.display = sectionHasMatch ? "block" : "none";
        });

        if (searchMessage) {
            searchMessage.textContent = matchingProducts === 0
                ? "No matching products found."
                : matchingProducts + " product(s) found.";
        }
    }

    if (searchButton) {
        searchButton.addEventListener("click", searchProducts);
    }

    if (searchInput) {
        searchInput.addEventListener("keydown", function(event) {
            if (event.key === "Enter") {
                searchProducts();
            }
        });
    }
});