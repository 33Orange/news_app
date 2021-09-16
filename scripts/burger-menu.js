let burgerBtn = document.getElementById("burger-btn");
let burgerCloseBtn = document.getElementById("burger-close-btn");
let themeCont = document.querySelector(".navigation-theme-cont");

function openBurgerMenu() {
    themeCont.style.display = "flex";
    burgerBtn.style.display = "none";
    burgerCloseBtn.style.display = "block";
}
function closeBurgerMenu() {
    themeCont.style.display = "none";
    burgerCloseBtn.style.display = "none";
    burgerBtn.style.display = "block";
}

burgerBtn.addEventListener("click", openBurgerMenu);
burgerCloseBtn.addEventListener("click", closeBurgerMenu);
