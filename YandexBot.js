// ==UserScript==
// @name         YandexBot
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Me
// @match        https://yandex.ru/*
// @match        http://yanmar-engine.ru/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

let yandexInput = document.getElementsByName("text")[0];
let button = document.getElementsByClassName("button_theme_search")[0];

if(button != undefined){ // Проверяем, что мы на главной странице
    yandexInput.value = "запасные части для двигателей yanmar в санкт-петербурге"; // Пишем фразу в поисковую строку
    setTimeout(function(){
        button.click();// Клик по кнопке поиска
    }, 1000);
}else if(location.hostname === "https://yandex.ru/search/?text=%D0%B7%D0%B0%D0%BF%D0%B0%D1%81%D0%BD%D1%8B%D0%B5%20%D1%87%D0%B0%D1%81%D1%82%D0%B8%20%D0%B4%D0%BB%D1%8F%20%D0%B4%D0%B2%D0%B8%D0%B3%D0%B0%D1%82%D0%B5%D0%BB%D0%B5%D0%B9%20yanmar%20%D0%B2%20%D1%81%D0%B0%D0%BD%D0%BA%D1%82-%D0%BF%D0%B5%D1%82%D0%B5%D1%80%D0%B1%D1%83%D1%80%D0%B3%D0%B5&lr=213&p=0"){ // Если страница с поисковой выдачей
    let links = document.links; // Собираем коллекцию ссылок
    let goNext = true;
    for(let i=0; i<links.length; i++){ // Перебираем ссылки
        let link = links[i];
        if(link.href.indexOf("http://yanmar-engine.ru/") != -1){ // Ищем ссылку с нужным сайтом
            setTimeout(function(){
                link.click(); // Кликаем по ссылке с нужным сайтом
            }, 3000);
            goNext = false; // запрещаем идти дальше по страницам поисковика
            break; // Останавливаем цикл
        }
    }
    if(goNext){ // Проверяем, можно ли идти далее по страницам поисковика
        let next = document.getElementsByClassName("link_target_serp pager__item pager__item_kind_next")[0]; // Находим кнопку "Следующая" link link_theme_none link_target_serp pager__item pager__item_kind_next i-bem link_js_inited
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
        location.href = "http://yanmar-engine.ru/";
    }
}

function getIntRandom(min, max){
    return Math.floor(Math.random()*(max-min)+min);
}
