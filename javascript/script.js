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