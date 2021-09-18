// Забераем данные из localStorage в котором у нас подгрузились новости
const dataFromStorage = localStorage.getItem("data");
/** @type [] */
const data = JSON.parse(dataFromStorage); // парсим в обьекты
//Создаём URL для поста с нужным ID
const postId = new URL(window.location.href).searchParams.get("post");
const post = data.find((post) => post.id === postId);
//Создаём контейнер для рендера контента.
const container = document.getElementById("container");
//Создаём функцию рендера контента
function createNewsPage(item) {
    // Форматируем дату до DD-MM:
    let date = new Date(item.webPublicationDate);
    let day = date.getDate().toString();
    let month = date.toLocaleString("en-US", { month: "long" });
    let year = date.getFullYear();

    //генерируем контент внутри элементов:
    const newsItemDate = `${month} ${day} ${year}`;
    const author = `Writen by ${post.fields.byline}`;
    const newsItem = `
        <div class="news-cont">
                <div class="img-cont">
                   <img class="news-image" src="${post.fields.thumbnail}">
                </div>
                <div class="main-info">
                    <h1 class="main-title">${post.webTitle}</h1>
                    <span class="author">${author}</span>
                    <span class="news-data">${newsItemDate}</span>
                </div>
            </div>
        </div>
    `;

    const newsFragment = document.createRange().createContextualFragment(newsItem);
    container.appendChild(newsFragment);
}
//Рендерим нужный нам пост.
createNewsPage(post);
