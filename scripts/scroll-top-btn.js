//Кнопка скролла
let scrollButton = document.getElementById("scroll-botton");
//Функция скрола всей страницы на нажатие кнопки.
function scrollToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}
scrollButton.addEventListener("click", scrollToTop);
//Функция появления кнопки скрола, когда страница начинает скролиться вниз.
function showScrollBtn() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("scroll-botton").style.display = "flex";
    } else {
        document.getElementById("scroll-botton").style.display = "none";
    }
}
//Привязываем функцию появления кнопки к скролу страницы
window.onscroll = function () {
    showScrollBtn();
};
