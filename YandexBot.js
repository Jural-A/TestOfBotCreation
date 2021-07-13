// ==UserScript==
// @name         YandexBot
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Me
// @match        https://yandex.ru/*
// @match        http://www.p-o-s-t.ru/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

let yandexInput = document.getElementsByName("text")[0];
let button = document.getElementsByClassName("button_theme_search")[0];

if(button != undefined){ // Проверяем, что мы на главной странице
    yandexInput.value = "p.o.s.t."; // Пишем фразу в поисковую строку
    setTimeout(function(){
        button.click();// Клик по кнопке поиска
    }, 1000);
}else if(location.hostname === "https://yandex.ru/"){ // Если страница с поисковой выдачей --> https://yandex.ru/search/?lr=213&text=p.o.s.t.%20
    let links = document.links; // Собираем коллекцию ссылок
    let goNext = true;
    for(let i=0; i<links.length; i++){ // Перебираем ссылки
        let link = links[i];
        if(link.href.indexOf("https://yandex.ru/search/?lr=213&text=p.o.s.t.") != -1){ // Ищем ссылку с нужным сайтом
            setTimeout(function(){
                link.click(); // Кликаем по ссылке с нужным сайтом
            }, 3000);
            goNext = false; // запрещаем идти дальше по страницам поисковика
            break; // Останавливаем цикл
        }
    }
    if(goNext){ // Проверяем, можно ли идти далее по страницам поисковика
        let next = document.getElementsByClassName("pager__item pager__item_kind_next")[0]; // Находим кнопку "Следующая"
        setTimeout(function(){
            next.click(); // Кликаем по кнопке следующая
        }, 3000);
    }
}else{ // Любой другой сайт
    let links = document.links; // Коллекция ссылок
    let randomIndex = getIntRandom(0, links.length);
    let link = links[randomIndex];
    if(link.href.indexOf(location.hostname) != -1){ // Если переход внутри сайта
        setTimeout(function(){
            links[randomIndex].click();
        }, 2000);
    }else{ // Если переход на другой сайт, то мы ссылаем браузер на главную страницу нашего сайта
        location.href = "http://www.p-o-s-t.ru/";
    }
}

function getIntRandom(min, max){
    return Math.floor(Math.random()*(max-min)+min);
}
