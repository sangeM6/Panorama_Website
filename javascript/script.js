function goToCategory(category) {
    const categoryIds = [
        "dogs",
        "cats",
        "birds",
        "fish",
        "small-animals",
        "accessories"
    ];

    // Clear the search field and previous search message.
    const searchInput = document.getElementById("product-search");
    const searchMessage = document.getElementById("search-message");

    if (searchInput) {
        searchInput.value = "";
    }

    if (searchMessage) {
        searchMessage.textContent = "";
    }

    // Reset products hidden by the previous search.
    categoryIds.forEach(function(id) {
        const section = document.getElementById(id);

        if (!section) {
            return;
        }

        section.querySelectorAll(".product").forEach(function(product) {
            product.style.display = "";
        });

        section.querySelectorAll(".product-list").forEach(function(group) {
            group.style.display = "";

            const heading = group.previousElementSibling;

            if (heading && heading.tagName === "H3") {
                heading.style.display = "";
            }
        });

        // Show all categories or only the selected category.
        section.style.display = (category === "all" || id === category)
            ? "block"
            : "none";
    });

    // Scroll to the selected category.
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


// Homepage product search
const homeSearch = document.getElementById("home-search");
const homeSearchButton = document.getElementById("home-search-button");

if (homeSearch && homeSearchButton) {

    function searchFromHome() {
        const searchTerm = homeSearch.value.trim();

        if (searchTerm !== "") {
            window.location.href = "html/Products.html?search=" + encodeURIComponent(searchTerm);
        }
    }

    homeSearchButton.addEventListener("click", searchFromHome);

    homeSearch.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            searchFromHome();
        }
    });
}

// Get search term from homepage
document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTerm = urlParams.get("search");

    const searchInput = document.getElementById("product-search");
    const searchButton = document.getElementById("search-button");

    if (searchTerm && searchInput && searchButton) {
        searchInput.value = searchTerm;
        searchButton.click();
    }
});

//FAQ Accordion functionality

document.addEventListener("DOMContentLoaded", function() {

    const faqQuestions = document.querySelectorAll(".faq-question");

    faqQuestions.forEach(function(question) {

        question.addEventListener("click", function() {

            const answer = document.getElementById(
                question.getAttribute("aria-controls")
            );

            const isExpanded = question.getAttribute("aria-expanded") === "true";

            if (!answer) {
                return;
            }

            // Close all FAQ answers.
            faqQuestions.forEach(function(item) {

                item.setAttribute("aria-expanded", "false");

                const itemAnswer = document.getElementById(
                    item.getAttribute("aria-controls")
                );

                if (itemAnswer) {
                    itemAnswer.hidden = true;
                }
            });

            // Open the selected answer.
            if (!isExpanded) {
                question.setAttribute("aria-expanded", "true");
                answer.hidden = false;
            }
        });
    });
});


// Inquiry form functionality

document.addEventListener("DOMContentLoaded", function() {

    const inquiryForm = document.getElementById("inquiry-form");

    // Only run on the inquiry page.
    if (!inquiryForm) {
        return;
    }

    const inquiryType = document.getElementById("inquiry-type");
    const response = document.getElementById("inquiry-response");

    // Get the inquiry sections.
    const inquirySections = {
        product: document.getElementById("product-fields"),
        service: document.getElementById("service-fields"),
        volunteer: document.getElementById("volunteer-fields"),
        sponsor: document.getElementById("sponsor-fields")
    };

    // Hide all inquiry sections initially.
    Object.values(inquirySections).forEach(function(section) {
        section.querySelectorAll("input, select, textarea").forEach(function(field) {
            field.disabled = true;
            field.required = false;
        });
    });

    // Display the selected inquiry section.
    inquiryType.addEventListener("change", function() {

        Object.values(inquirySections).forEach(function(section) {
            section.hidden = true;

            section.querySelectorAll("input, select, textarea").forEach(function(field) {
                field.disabled = true;
                field.required = false;
            });
        });

        const activeSection = inquirySections[inquiryType.value];

        if (activeSection) {
            activeSection.hidden = false;

            activeSection.querySelectorAll("input, select, textarea").forEach(function(field) {
                field.disabled = false;
            });

            if (inquiryType.value === "product") {
                document.getElementById("product-name").required = true;
                document.getElementById("quantity").required = true;
            }

            if (inquiryType.value === "service") {
                document.getElementById("service-name").required = true;
            }

            if (inquiryType.value === "volunteer") {
                document.getElementById("volunteer-interest").required = true;
                document.getElementById("volunteer-availability").required = true;
            }

            if (inquiryType.value === "sponsor") {
                document.getElementById("sponsor-interest").required = true;
            }
        }

        response.textContent = "";
    });


    // Validate and process the inquiry.
    inquiryForm.addEventListener("submit", function(event) {

        event.preventDefault();

        if (!inquiryForm.reportValidity()) {
            return;
        }

        const name = document.getElementById("full-name").value.trim();

        let message = "";

        // Product inquiry.
        if (inquiryType.value === "product") {

            const product = document.getElementById("product-name").value.trim();
            const quantity = document.getElementById("quantity").value;

            message = "Thank you, " + name + "! Your inquiry about " +
                product + " (quantity: " + quantity +
                ") has been received. We will confirm the current price and product availability with you.";
        }

        // Service inquiry.
        else if (inquiryType.value === "service") {

            const serviceSelect = document.getElementById("service-name");
            const service = serviceSelect.options[serviceSelect.selectedIndex].text;
            const date = document.getElementById("preferred-date").value;

            message = "Thank you, " + name + "! Your inquiry about " +
                service + " has been received. " +
                (date ? "Your preferred date is " + date + ". " : "") +
                "We will confirm the service cost and appointment availability with you.";
        }

        // Volunteer inquiry.
        else if (inquiryType.value === "volunteer") {

            message = "Thank you, " + name +
                "! Your volunteering inquiry has been received. We will contact you with more information about possible opportunities.";
        }

        // Sponsorship inquiry.
        else if (inquiryType.value === "sponsor") {

            message = "Thank you, " + name +
                "! Your sponsorship inquiry has been received. We will contact you to discuss possible sponsorship opportunities.";
        }

        // Display the response.
        response.textContent = message;

        // Reset the form.
        inquiryForm.reset();

        // Hide all inquiry sections again.
        Object.values(inquirySections).forEach(function(section) {
            section.hidden = true;

            section.querySelectorAll("input, select, textarea").forEach(function(field) {
                field.disabled = true;
                field.required = false;
            });
        });

    });

});