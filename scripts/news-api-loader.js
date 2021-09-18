let container = document.getElementById("container");
let search = document.getElementById("search");
let lastFetchedPosts;

//Форматируем название новости по длине.
function sortTitleLength(webTitle) {
    return webTitle.length > 50 ? webTitle.substring(0, 50) + "..." : webTitle;
}

//Создаём функцию для рендера новости.
//Создаём функцию для рендера новости.
function renderItem(item) {
    // Форматируем дату до DD-MM:
    let date = new Date(item.webPublicationDate);
    let day = date.getDate().toString();
    let month = date.toLocaleString("en-US", { month: "long" });
    let year = date.getFullYear();

    const newsItemDate = `${month} ${day} ${year}`;
    const newsItemText = item.fields.bodyText.substring(0, 80) + "...";

    const newsItem = `
        <div class="news-cont">
            <div class="news-img-cont">
                <a class="news-src" href="inner.html?post=${item.id}">
                    <img class="news-img" src="${item.fields.thumbnail}"></a>
                </div>
                <div class="news-text-cont">
                    <a class="news-src" href="inner.html?post=${item.id}">
                        <h3 class="news-title">${sortTitleLength(item.webTitle)}</h3>
                    </a>
                    <p class="news-text">${newsItemText}</p>
                    <div class="news-theme-readm-cont"><span class="news-data">${newsItemDate}</span><span class="read-more">
                        <a class="news-src" href="inner.html?post=${item.id}">Read more</a>
                    </span>
                </div>
            </div>
        </div>
    `;
    const newsFragment = document.createRange().createContextualFragment(newsItem);

    container.appendChild(newsFragment);
}

//Функция сохранения данных в localstorage.
function saveToLocalStorage(data) {
    localStorage.setItem("data", JSON.stringify(data));
}

//Функиция активации/деактивации анимации подгрузки:
function loaderOn() {
    document.querySelector(".loader").style.display = "block";
    document.querySelector("footer").style.display = "none";
}
function loaderOff() {
    document.querySelector(".loader").style.display = "none";
    document.querySelector("footer").style.display = "block";
}
//Отслеживаем изменения input в поиске
search.addEventListener("input", (e) => {
    onSearchByInput(e.target.value);
});

//Функция поиска по словам из input
function onSearchByInput(value) {
    lookingPosts = lastFetchedPosts.filter((item) => item.webTitle.includes(value));
    //Если нашли подходящую новость - очищаем контейнер и рендерим подходящую
    if (lookingPosts) {
        container.replaceChildren();
        lookingPosts.forEach((post) => renderItem(post));
    }
    document.querySelector(".news-cont").classList.add("hot-news");
}

// Функция граба обьектов из API с выбраной категорией. По дефолту кат. = тренды
// Pagesize- кол-во новостей.
function fetchPosts(category = "trending", pagesize = "19") {
    let url = `https://content.guardianapis.com/search?q=${category}&show-tags=all&page-size=${pagesize}&show-fields=all&order-by=relevance&api-key=0cc1c5bc-7fe4-47bc-80cc-f17c13be193c`;
    //Добавляем лоадер перед промисом и после. Что бы он отображался во время загрузки
    loaderOn();
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((result) => {
            //Создаём массив data из результатов response с key: results
            let data = result?.response?.results;
            lastFetchedPosts = data;
            // Сортируем массив по дате:
            data.sort((a, b) => {
                var c = new Date(a.webPublicationDate);
                var d = new Date(b.webPublicationDate);
                return d - c;
            });
            //Сохраняем данные data в localstorage.
            saveToLocalStorage(data);
            //Очищаем контейнер
            container.replaceChildren();
            //рендерим новости из data.
            data.forEach(renderItem);
            //Делаем первую новость - главной.
            document.querySelector(".news-cont").classList.add("hot-news");
        })
        .finally(loaderOff);
}
//Грабим 'category' из текущей URL и сохраняем
const category = new URL(window.location.href).searchParams.get("category");

//Фетчим новости и генерируем нужное кол-во постов
fetchPosts(category, 49);
