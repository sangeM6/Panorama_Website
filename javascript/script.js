//Category function
function goToCategory(category) {
    document.getElementById(category).scrollIntoView({
        behavior: "smooth",
        block: "start"
    })
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