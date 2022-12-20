
$( document ).ready(function() {
  /*
  ============================
   Кастомный ползунок в квизе
  ============================
   */
  let stepsRangeSlider = document.getElementById('range-steps-fake');
  if (stepsRangeSlider) {
    noUiSlider.create(stepsRangeSlider, {
      start: 500,
      step: 1,
      tooltips: wNumb({decimals: 0}),
      connect: 'lower',
      range: {
        'min': [0],
        'max': [1000]
      },
    });
    const inputRoom = document.getElementById('range-steps-input');
    stepsRangeSlider.noUiSlider.on('update', function (values, handle) {
      inputRoom.value = Math.round(values);
    });
  }
  /*
  ============================
        Шаги в квизе
  ============================
   */
  $('#steps__button--next1').on('click', function () {
    if ($('input[name="steps-one"]').is(':checked')) {
      $('#step-stage1').removeClass('steps__stage--active')
      $('#step-stage2').addClass('steps__stage--active')
      $('.quiz__current').text('2')
      $('.quiz__progress-bar').css('width', '50%')
    } else {
      $(this).prop('disabled', true)
    }
  })

  $('.steps__label').click(function () {
    $('#steps__button--next1').prop('disabled', false)
  })


  $('#steps__button--next2').click(function () {
    if ($('.steps__second-input').is(':checked')) {
      $('#step-stage2').removeClass('steps__stage--active')
      $('#step-stage3').addClass('steps__stage--active')
      $('.quiz__current').text('3')
      $('.quiz__progress-bar').css('width', '75%')
    } else {
      $(this).prop('disabled', true)
    }
  })

  $('.steps__second-label').click(function () {
    $('#steps__button--next2').prop('disabled', false)
  })


  $('#steps__button--next3').click(function () {
    $('#step-stage3').removeClass('steps__stage--active')
    $('#step-stage4').addClass('steps__stage--active')
    $('.quiz__current').text('4')
    $('.quiz__progress-bar').css('width', '100%')
    $('.quiz__wrapper').addClass('remove-padding').removeClass('add-padding')
    $('.table-padding').addClass('table-padding--add')
  })

  $('#steps__button--prev3').click(function () {
    $('#step-stage4').removeClass('steps__stage--active')
    $('#step-stage3').addClass('steps__stage--active')
    $('.quiz__current').text('3')
    $('.quiz__progress-bar').css('width', '75%')
    $('.quiz__wrapper').addClass('add-padding').removeClass('remove-padding')
    $('.table-padding').removeClass('table-padding--add')
  })

  $('#steps__button--prev2').click(function () {
    $('#step-stage3').removeClass('steps__stage--active')
    $('#step-stage2').addClass('steps__stage--active')
    $('.quiz__current').text('2')
    $('.quiz__progress-bar').css('width', '50%')
  })

  $('#steps__button--prev1').click(function () {
    $('#step-stage2').removeClass('steps__stage--active')
    $('#step-stage1').addClass('steps__stage--active')
    $('.quiz__current').text('1')
    $('.quiz__progress-bar').css('width', '25%')
  })


  /*
  =====================================
        Ползунок меняет положение
  ====================================
   */


  $('.noUi-tooltip').on('DOMSubtreeModified', function () {
    const rateVal = $(".noUi-tooltip").text();

    $('.jstooltipNumber').val(rateVal ).attr("value", rateVal)


    if (rateVal >= 840) {
      $('.noUi-handle .noUi-tooltip').addClass('tooltip-position')
    } else if ((rateVal <= 120)) {
      $('.noUi-handle .noUi-tooltip').addClass('tooltip-position')
    } else {
      $('.noUi-handle .noUi-tooltip').removeClass('tooltip-position')
    }
  });


  /*
=====================================
      Привязка input к noUi-tooltip
====================================
 */
  let toolTipnumber = $('.jstooltipNumber')

  toolTipnumber.on("input", function (ev) {

    if (toolTipnumber.val() > 1000) {

      stepsRangeSlider.noUiSlider.reset();
      $('.steps__warning').show()

      setTimeout(function () {
        $('.steps__warning').fadeOut('fast');
      }, 5000);

    } else {
      $(".noUi-tooltip").text(toolTipnumber.val());
      $('.noUi-handle ').attr('aria-valuenow', toolTipnumber.val()).attr('aria-valuetext', toolTipnumber.val());
      stepsRangeSlider.noUiSlider.set(toolTipnumber.val());
    }
  });

// ===============================================
// 			Всплыващка
// ===============================================

  $('.jsPopup-open').click(function () {
    $('.js-popup').fadeIn().css('display', 'flex');
    return false;
  });

  $('.jsPopup-close').click(function () {
    $(this).parents('.popup').fadeOut();

    return false;
  });

  $(document).keydown(function (e) {
    if (e.keyCode === 27) {
      e.stopPropagation();
      $('.popup').fadeOut();

    }
  });

  $('.popup').click(function (e) {
    if ($(e.target).closest('.popup__body').length == 0) {
      $(this).fadeOut();
    }
  });


  /*
  ============================
        Маска на телефон
  ============================
   */

  $(".phone-mask").mask("+9(999) 999-9999");


  /*
==========================================
   Страница спасибо при отправки формы
==========================================
 */
  $('.steps__four-button').click(function () { // задаем функцию при нажатиии на элемент <button>

      if ($('.steps__four-input').val().length === 0) {
        $('.steps__four-label').addClass('warning');
      }


    else if ($('.name').val().length <= 1 ) {
      $('.steps__four-label--phone').removeClass('warning');
      $('.steps__four-label--name').addClass('warning');
    }


    else if ($('.phone-mask').val().length <= 12) {
        $('.steps__four-label').removeClass('warning');
        $('.steps__four-label--phone').addClass('warning');
      }


    else {
      $('.quiz__steps').submit(function (event) { // задаем функцию при срабатывании события "submit" на элементе <form>
        event.preventDefault(); // действие события по умолчанию не будет срабатывать
        $('.popup-thanks').css('display', 'flex').fadeIn();
        $('#steps__button--prev3').prop('disabled', true).css('opacity', '.2')
        $('.steps__four-button').prop('disabled', true).css('opacity', '.2')
      });
    }
  });



  $('.name').on('keypress', function () {
    const that = this;
    setTimeout(function () {
      const res = /[^а-яА-ЯїЇєЄіІёЁ ]/g.exec(that.value);
      that.value = that.value.replace(res, '');
    }, 0);

  });

  $('.steps__four-input').click(function () {
    $('.steps__four-label').removeClass('warning');
  })

// ==============================================
// Плавный скролл к якорю c закрытием меню
// ==============================================


  $('.js-scroll').on('click', function () {

    let href = $(this).attr('href');
    $('html, body').animate({
      scrollTop: $(href).offset().top  - 40 + 'px'
    }, {
      duration: 500,
      easing: "linear"
    });
  })



  $('.js-tab-trigger').click(function() {
    let id = $(this).attr('data-tab'),
      content = $('.js-tab-content[data-tab="'+ id +'"]');

    $('.js-tab-trigger.tab-header__item--active').removeClass('tab-header__item--active'); // 1
    $(this).addClass('tab-header__item--active'); // 2

    $('.js-tab-content.active').removeClass('active'); // 3
    content.addClass('active'); // 4
  });


});