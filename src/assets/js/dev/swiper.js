/*
========================================
      Слайдер на главном экране
========================================
*/

const heroSlider = new Swiper(".heroSlider", {
  navigation: {
    nextEl: ".hero__next",
    prevEl: ".hero__prev",
  },

  breakpoints: {
    319: {
      slidesPerView: 2.1,
      spaceBetween: 10,
    },
    561: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    1024: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    1240: {
      slidesPerView: 1.25,
      spaceBetween: 20,
    },
  },
});


/*
=====================================================
      Повышаем качество отделки древесины слайдер
======================================================
*/


const raiseSwiper = new Swiper(".raiseSwiper", {
  centeredSlides: true,
  scrollbar: {
    el: ".raise__scrollbar",
    hide: false,
  },
  navigation: {
    nextEl: ".raise__next",
    prevEl: ".raise__prev",
  },
  breakpoints: {
    320: {
      spaceBetween: 15,
      centeredSlides: false,
      slidesPerView: 1,
    },
    991: {
      spaceBetween: 25,
      centeredSlides: false,
      slidesPerView: 2,
    },
    1440: {
      spaceBetween: 25,
      centeredSlides: true,
      slidesPerView: 1.2,
    },
  }

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
  effect: "fade",
});

const jsDecisionLeft = new Swiper(".jsDecisionLeft", { // Левый слайдер
  slidesPerView: 1,
  loop: false,
  navigation: {
    nextEl: ".decision__button-next",
    prevEl: ".decision__button-prev",
  },
  breakpoints: {
    661: {
      navigation: {
        nextEl: ".decision__button-next",
        prevEl: ".decision__button-prev",
      },
    },
    320: {
      navigation: {
        nextEl: ".decision__button-next-mob",
        prevEl: ".decision__button-prev-mob",
      },
    },
   },
  thumbs: {
    swiper: jsDecisionRight,
  },
});




