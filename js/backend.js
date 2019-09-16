'use strict';

(function () {

    function errorStatus (xhr, onError) {
        switch (xhr.status) {
            case 400: 
                onError('Неверный запрос');
                break;
            case 401:
                onError('Пользователь не авторизован');
                break;
            case 404:
                onError('Ничего не найдено');
                break;
            default:
                onError('Статус ответа: '+ xhr.status + ' ' + xhr.statusText);
        }
    }

    function jsonHandler (xhr, onLoad, onError) {
        xhr.addEventListener('load', function () {
            if (xhr.status == '200') {
                onLoad(xhr.response);
            } else errorStatus(xhr, onError)
        })

        xhr.addEventListener('error', function () {
            onError('Произошла ошибка');
        })

        xhr.addEventListener('timeout', function () {
            onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
        })

        xhr.timeout = 10000; 
    }

    function backendLoad (onLoad, onError) {
        var URL = 'https://js.dump.academy/code-and-magick/data';
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'json';

        xhr.open('GET', URL);

        jsonHandler(xhr, onLoad, onError)

        xhr.send();
    }

    function backendSave (data, onLoad, onError) {
        var URL = 'https://js.dump.academy/code-and-magick';
        var xhr = new XMLHttpRequest();

        xhr.responseType = 'json';
        
        jsonHandler(xhr, onLoad, onError)

        xhr.open('POST', URL); // открыть запрос
        xhr.send(data); // отправить запрос   
    }

    window.backend = {
        load: backendLoad,
        save: backendSave
    }
})()