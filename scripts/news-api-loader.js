let container = document.getElementById("container");

//Создаём функцию для рендера новости.
function renderItem(item) {
    //Контейнер новости:
    let newsCont = document.createElement("div");
    //Контейнер изображения с изображением:
    let newsImgCont = document.createElement("div");
    let newsSrc = document.createElement("a");
    let newsSrc2 = document.createElement("a");
    let newsSrc3 = document.createElement("a");
    let image = document.createElement("img");
    //Контейнер для текста с текстовыми элементами:
    let newsTextCont = document.createElement("div");
    let newsTitle = document.createElement("h1");
    let newsText = document.createElement("p");
    //Контейнер для даты публикации и Read more
    let newsDataCont = document.createElement("div");
    let newsData = document.createElement("span");
    let readMore = document.createElement("span");
    //Общий контейнер для создания новостей:

    // Задаём классы всем элементам.
    newsCont.classList.add("news-cont");
    newsImgCont.classList.add("news-img-cont");
    newsSrc.classList.add("news-src");
    newsSrc2.classList.add("news-src");
    newsSrc3.classList.add("news-src");
    image.classList.add("news-img");
    newsTextCont.classList.add("news-text-cont");
    newsTitle.classList.add("news-title");
    newsText.classList.add("news-text");
    newsDataCont.classList.add("news-theme-readm-cont");
    newsData.classList.add("news-data");
    readMore.classList.add("read-more");

    // Форматируем дату до DD-MM:
    let date = new Date(item.webPublicationDate);
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
    //Сортируем название новости по длине.
    function sortTitleLength() {
        if (item.webTitle.length > 50) {
            return item.webTitle.substring(0, 50) + "...";
        } else {
            return item.webTitle;
        }
    }

    //Генерируем контент внутри элементов
    newsData.innerHTML = `${month} ${day} ${year}`;
    newsTitle.innerHTML = sortTitleLength();
    // newsTitle.innerHTML = item.webTitle.substring(0, 50) + "...";
    newsText.innerHTML = item.fields.bodyText.substring(0, 80) + "...";
    image.src = item.fields.thumbnail;
    newsSrc3.innerHTML = "Read more";
    newsSrc.href = `news_app/inner.html?post=${item.id}`;
    newsSrc2.href = `news_app/inner.html?post=${item.id}`;
    newsSrc3.href = `news_app/inner.html?post=${item.id}`;

    // Собираем дивы
    // Див с картинкой
    newsSrc.appendChild(image);
    newsImgCont.appendChild(newsSrc);
    // Див с текстом
    newsSrc2.appendChild(newsTitle);
    newsTextCont.appendChild(newsSrc2);
    newsTextCont.appendChild(newsText);
    // Див с ридми и датой
    readMore.appendChild(newsSrc3);
    newsDataCont.appendChild(newsData);
    newsDataCont.appendChild(readMore);
    newsTextCont.appendChild(newsDataCont);
    // Соединяем все дивы в контейнере для новости:
    newsCont.appendChild(newsImgCont);
    newsCont.appendChild(newsTextCont);
    //Передаём созданный новостной-контейнер в app:
    container.appendChild(newsCont);
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

// Функция граба обьектов из API с выбраной категорией. По дефолту кат. = тренды
// Pagesize- кол-во новостей.
function fetchPosts(category = "trending", pagesize = "19") {
    let url = `https://content.guardianapis.com/search?q=${category}&show-tags=all&page-size=${pagesize}&show-fields=all&order-by=relevance&api-key=0cc1c5bc-7fe4-47bc-80cc-f17c13be193c`;
    loaderOn();
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((result) => {
            //Создаём массив data из результатов response с key: results
            let data = result?.response?.results;
            //Очищаем контейнер
            container.replaceChildren();
            // Сортируем массив по дате:
            data.sort(function (a, b) {
                var c = new Date(a.webPublicationDate);
                var d = new Date(b.webPublicationDate);
                return d - c;
            });
            console.log(data);
            //Сохраняем данные data в localstorage.
            saveToLocalStorage(data);
            //рендерим новости из data.
            data.forEach(renderItem);
            //Делаем первую новость - главной.
            data.forEach((value, index = 0) => {
                document.querySelector(".news-cont").classList.add("hot-news");
            });
            loaderOff();
        });
}
//Грабим 'category' из текущей URL и сохраняем
const category = new URL(window.location.href).searchParams.get("category");

//Фетчим новости и генерируем нужное кол-во постов
fetchPosts(category, 49);

// + отдельная страница с деталкой поста
// + поиск по категориям
// поиск текстовый
