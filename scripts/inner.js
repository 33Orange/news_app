// Забераем данные из localStorage в котором у нас подгрузились новости
const dataFromStorage = localStorage.getItem("data");
/** @type [] */
const data = JSON.parse(dataFromStorage); // парсим в обьекты
//Создаём URL для поста с нужным ID
const postId = new URL(window.location.href).searchParams.get("post");
console.log("Post id:", postId);
const post = data.find((post) => post.id === postId);
console.log("post:", post);
//Создаём контейнер для рендера контента.
const container = document.getElementById("container");
//Создаём функцию рендера контента
function createNewsPage(item) {
    let imgCont = document.createElement("div");
    let mainImage = document.createElement("img");
    let mainInfoCont = document.createElement("div");
    let mainTitle = document.createElement("h1");
    let author = document.createElement("span");
    let newsData = document.createElement("span");

    //Задаём классы элементам
    imgCont.classList.add("img-cont");
    mainImage.classList.add("news-image");
    mainInfoCont.classList.add("main-info");
    mainTitle.classList.add("main-title");
    author.classList.add("author");
    newsData.classList.add("news-data");

    // Форматируем дату до DD-MM:
    let date = new Date(post.webPublicationDate);
    let day = date.getDate().toString();
    let month = "";
    let monthNum = date.getMonth();
    let year = date.getFullYear();

    if (monthNum === 0) {
        month = "January";
    } else if (monthNum === 1) {
        month = "February";
    } else if (monthNum === 2) {
        month = "March";
    } else if (monthNum === 3) {
        month = "April";
    } else if (monthNum === 4) {
        month = "May";
    } else if (monthNum === 5) {
        month = "June";
    } else if (monthNum === 6) {
        month = "July";
    } else if (monthNum === 7) {
        month = "August";
    } else if (monthNum === 8) {
        month = "September";
    } else if (monthNum === 9) {
        month = "October";
    } else if (monthNum === 10) {
        month = "November";
    } else if (monthNum === 11) {
        month = "December";
    }

    //генерируем контент внутри элементов:
    newsData.innerHTML = `${month} ${day} ${year}`;
    mainTitle.innerHTML = post.webTitle;
    mainImage.src = post.fields.thumbnail;
    author.innerHTML = `Writen by ${post.fields.byline}`;

    //Собираем дивы
    imgCont.appendChild(mainImage);
    mainInfoCont.appendChild(mainTitle);
    mainInfoCont.appendChild(author);
    mainInfoCont.appendChild(newsData);
    container.appendChild(imgCont);
    container.appendChild(mainInfoCont);
}
//Рендерим нужный нам пост.
createNewsPage(post);
