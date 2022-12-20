var heroSlider = new Swiper(".heroSlider", {
  slidesPerView: 'auto',

  navigation: {
    nextEl: ".hero__next",
    prevEl: ".hero__prev",
  },

  breakpoints: {
    992: {
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