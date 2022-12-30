/*
========================================
      Слайдер на главном экране
========================================
*/

const heroSlider = new Swiper(".heroSlider", {
  slidesPerView: 1.35,

  navigation: {
    nextEl: ".hero__next",
    prevEl: ".hero__prev",
  },

  breakpoints: {
    1024: {
      slidesPerView: 1.25,
      spaceBetween: 20,
    },


    561: {
      slidesPerView: 2,
      spaceBetween: 10,
    },

    319: {
      slidesPerView: 2.1,
      spaceBetween: 10,
    },
  },
});


/*
=====================================================
      Повышаем качество отделки древесины слайдер
======================================================
*/


const raiseSwiper = new Swiper(".raiseSwiper", {
  slidesPerView: 'auto',
  scrollbar: {
    el: ".raise__scrollbar",
    hide: false,
  },

  navigation: {
    nextEl: ".raise__next",
    prevEl: ".raise__prev",
  },

});


/*
==========================================================================================================
      Для каждого клиента у нас есть решение слайдер(связанный слайдер)
===========================================================================================================
*/

const jsDecisionRight = new Swiper(".jsDecisionRight", { // Правый слайдер
  slidesPerView: 'auto',
  spaceBetween: 10,
  freeMode: true,
  loop: false,
  loopedSlides: 1, //Связанный слайдеры (обязательный параметр)
  watchSlidesProgress: true,
  watchSlidesVisibility: true,
  allowTouchMove: false,
});

const jsDecisionLeft = new Swiper(".jsDecisionLeft", { // Левый слайдер
  slidesPerView: 1,
  loop: false,
  navigation: {
    nextEl: ".decision__button-next",
    prevEl: ".decision__button-prev",
  },
  thumbs: {
    swiper: jsDecisionRight,
  },
});




