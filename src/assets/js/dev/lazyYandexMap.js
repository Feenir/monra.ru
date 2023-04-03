//Переменная для включения/отключения индикатора загрузки
let spinner = $('.ymap-container').children('.loader');
//Переменная для определения была ли хоть раз загружена Яндекс.Карта (чтобы избежать повторной загрузки при наведении)
let check_if_load = false;
//Необходимые переменные для того, чтобы задать координаты на Яндекс.Карте
let myMap, myPlacemarkTemp

//Функция создания карты сайта и затем вставки ее в блок с идентификатором &#34;map-yandex&#34;
function init () {
  myMap = new ymaps.Map('map-yandex', {
      center: [55.776573, 37.573851],
      zoom: 10
    })
  objectManager = new ymaps.ObjectManager({
      clusterize: true,
      gridSize: 32
    });
  myMap.geoObjects.add(objectManager);
  objectManager.objects.options.set('preset', 'islands#redDotIcon');
  myMap.geoObjects.add(objectManager);
  objectManager.add({
    type: "FeatureCollection",
    features: [
      {
        type:  "Feature",
        id: 1,
        geometry: {
          type:  "Point",
          coordinates: [55.776573, 37.573851]
        },
        properties: {
          balloonContent:  'Скаковая улица, 36, 4 этаж, оф.423',
          iconCaption:  'Москва Офис',
        },
        options: {
          iconLayout:  'default#imageWithContent',
          iconImageHref:  'https://liori.ru/wp-content/themes/theme-liori/img/pin.svg',
          iconImageSize:  [76, 76],
          iconImageOffset:  [-54, -54],
          iconContentOffset:  [15, 15],
        }
      },
      {
        type:  "Feature",
        id: 2,
        geometry: {
          type:  "Point",
          coordinates: [55.725595, 37.449677]
        },
        properties: {
          balloonContent:  "Кутузовский проспект, 88, 2 этаж",
          iconCaption:  "Москва Шоурум"
        },
        options: {
          iconLayout:  'default#imageWithContent',
          iconImageHref:  'https://liori.ru/wp-content/themes/theme-liori/img/pin.svg',
          iconImageSize:  [76, 76],
          iconImageOffset:  [-54, -54],
          iconContentOffset:  [15, 15],
        },
      }, {
        type:  "Feature",
        id: 4,
        geometry: {
          type:  "Point",
          coordinates: [55.675951, 37.913091]
        },
        properties: {
          balloonContent:  "Дальняя улица, 6 Люберцы, Московская область",
          iconCaption:  "Люберцы"
        },
        options: {
          iconLayout:  'default#imageWithContent',
          iconImageHref:  'https://liori.ru/wp-content/themes/theme-liori/img/pin.svg',
          iconImageSize:  [76, 76],
          iconImageOffset:  [-54, -54],
          iconContentOffset:  [15, 15],
        },
      }, {
        type:  "Feature",
        id: 3,
        geometry: {
          type:  "Point",
          coordinates: [56.741830, 37.183803]
        },
        properties: {
          balloonContent:  "Дачная улица, 1с10 Дубна, Московская область",
          iconCaption:  "Дубна"
        },
        options: {
          iconLayout:  'default#imageWithContent',
          iconImageHref:  'https://liori.ru/wp-content/themes/theme-liori/img/pin.svg',
          iconImageSize:  [76, 76],
          iconImageOffset:  [-54, -54],
          iconContentOffset:  [15, 15],
        },
      }
    ]
  });
  /* 2. Обработка списка и меток */
  //Клик по метке в карте
  objectManager.objects.events.add('click', function (e) {
    let objectId=e.get('objectId');
    viewObject(objectId);
  });
  //Клик в списке
  [].forEach.call(document.querySelectorAll('[data-objectId]'), function(el) {
    el.addEventListener('click', function() {
      let objectId=el.getAttribute("data-objectId");
      viewObject(objectId);
    });
  });
  // Что происходит при выборе метки или варианта из списка
  function viewObject(objectId){
    // Удаляем со всего списка класс active затем добавляем к выбранному
    for (let object of document.querySelectorAll('[data-objectId]')) {
      object.classList.remove('active');
    }
    document.querySelector('[data-objectId="'+objectId+'"]').classList.add('active');
    // Выделяем все метки в синий, затем выбранную в красную
    /*
    objectManager.objects.each(function (item) {
      objectManager.objects.setObjectOptions(item.id, {
        preset: 'islands#blueIcon'
      });
    });
    objectManager.objects.setObjectOptions(objectId, {
      preset: 'islands#redDotIcon'
    });
    */
    // Центрирование по метке
    myMap.setCenter(objectManager.objects.getById(objectId).geometry.coordinates, 10, {
      checkZoomRange: true
    });
  }
}
// Решение по callback-у для определения полной загрузки карты
/* myMapTemp.geoObjects.add(myPlacemarkTemp); // помещаем флажок на карту

// Получаем первый экземпляр коллекции слоев, потом первый слой коллекции
var layer = myMapTemp.layers.get(0).get(0);

// Решение по callback-у для определения полной загрузки карты
waitForTilesLoad(layer).then(function() {
  // Скрываем индикатор загрузки после полной загрузки карты
  spinner.removeClass('is-active');
});
}
*/


$('.ymap-container, .map__card').bind("DOMSubtreeModified", function() {
  if($('.map-yandex').find('.ymaps-2-1-79-map')) {
    spinner.removeClass('is-active');
  }
});


// Функция для определения полной загрузки карты (на самом деле проверяется загрузка тайлов)
function waitForTilesLoad(layer) {
  return new ymaps.vow.Promise(function (resolve, reject) {
    let tc = getTileContainer(layer), readyAll = true;
    tc.tiles.each(function (tile, number) {
      if (!tile.isReady()) {
        readyAll = false;
      }
    });
    if (readyAll) {
      resolve();
    } else {
      tc.events.once("ready", function() {
        resolve();
      });
    }
  });
}

function getTileContainer(layer) {
  for (let k in layer) {
    if (layer.hasOwnProperty(k)) {
      if (
        layer[k] instanceof ymaps.layer.tileContainer.CanvasContainer
        || layer[k] instanceof ymaps.layer.tileContainer.DomContainer
      ) {
        return layer[k];
      }
    }
  }
  return null;
}

// Функция загрузки API Яндекс.Карт по требованию (в нашем случае при наведении)
function loadScript(url, callback){
  let script = document.createElement("script");

  if (script.readyState){  // IE
    script.onreadystatechange = function(){
      if (script.readyState == "loaded" ||
        script.readyState == "complete"){
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {  // Другие браузеры
    script.onload = function(){
      callback();
    };
  }

  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
}

// Основная функция, которая проверяет когда мы навели на блок с классом &#34;ymap-container&#34;
let ymap = function() {
  $('.ymap-container, .map__card').mouseenter(function(){
      if (!check_if_load) { // проверяем первый ли раз загружается Яндекс.Карта, если да, то загружаем

        // Чтобы не было повторной загрузки карты, мы изменяем значение переменной
        check_if_load = true;

        // Показываем индикатор загрузки до тех пор, пока карта не загрузится
        spinner.addClass('is-active');

        // Загружаем API Яндекс.Карт
        loadScript("https://api-maps.yandex.ru/2.1/?lang=ru_RU&amp;apikey=dd597676-6673-4817-bd32-ffe8b570ac4f;loadByRequire=1", function(){
          // Как только API Яндекс.Карт загрузились, сразу формируем карту и помещаем в блок с идентификатором &#34;map-yandex&#34;

          ymaps.load(init);
        });
      }
    }
  );
}

$(function() {
  //Запускаем основную функцию
  ymap();
});

