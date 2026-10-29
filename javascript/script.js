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
        if (!searchInput) {
            return;
        }

        const searchText = searchInput.value.trim().toLowerCase();
        let matchingProducts = 0;

        categoryIds.forEach(function(id) {
            const section = document.getElementById(id);

            if (!section) {
                return;
            }

            let sectionHasMatch = false;

            // Search each product individually.
            section.querySelectorAll(".product").forEach(function(product) {
                const productText = product.textContent.toLowerCase();
                const image = product.querySelector("img");
                const imageAlt = image ? image.alt.toLowerCase() : "";

                // Find the product's group, such as dog food or dog treats.
                const group = product.closest(".product-list");
                let groupName = "";

                if (group) {
                    groupName = Array.from(group.classList)
                        .filter(function(className) {
                            return className !== "product-list";
                        })
                        .join(" ")
                        .replace(/-/g, " ");

                    const heading = group.previousElementSibling;

                    if (heading && heading.tagName === "H3") {
                        groupName += " " + heading.textContent.toLowerCase();
                    }
                }

                const matches = searchText === "" ||
                    productText.includes(searchText) ||
                    imageAlt.includes(searchText) ||
                    groupName.includes(searchText);

                product.style.display = matches ? "" : "none";

                if (matches && searchText !== "") {
                    matchingProducts++;
                    sectionHasMatch = true;
                } else if (searchText === "") {
                    sectionHasMatch = true;
                }
            });

            // Hide groups with no matching products.
            section.querySelectorAll(".product-list").forEach(function(group) {
                const visibleProducts = Array.from(
                    group.querySelectorAll(".product")
                ).some(function(product) {
                    return product.style.display !== "none";
                });

                group.style.display = visibleProducts ? "" : "none";

                const heading = group.previousElementSibling;

                if (heading && heading.tagName === "H3") {
                    heading.style.display = visibleProducts ? "" : "none";
                }
            });

            section.style.display = sectionHasMatch ? "" : "none";
        });

        if (searchMessage) {
            searchMessage.textContent = searchText === ""
                ? ""
                : matchingProducts === 0
                    ? "No matching products found."
                    : matchingProducts + " matching product(s) found.";
        }
    }

    if (searchButton) {
        searchButton.addEventListener("click", searchProducts);
    }

    if (searchInput) {
        searchInput.addEventListener("keydown", function(event) {
            if (event.key === "Enter") {
                event.preventDefault();
                searchProducts();
            }
        });
    }
});