//Category function
function goToCategory(category) {
    const sections = document.querySelectorAll("main section");
    //if 'all' is clicked show every section
    if(category === "all") {
        sections.forEach(function(section){
            section.style.display ="block";
        });
        window.scrollTo({
            top:0,
            behavior: "smooth"
        });
        return;
    }
    //show only the selected category
    sections.forEach(function(section){
        if(section.id === category) {
            section.style.display = "block";
            section.scrollIntoView({
                behavior: "smooth",
                block: "start"
            })
        } else{
            section.style.display = "none";
        }
    });
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