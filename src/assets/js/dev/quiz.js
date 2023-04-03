
/*
============================
      Шаги в квизе
============================
 */
let buttonNext = $('.steps__button--next')
let buttonPrev = $('.steps__button--prev')
let stepsInput = $('.steps__input')
let stepsLabel = $('.steps__label')
let stepsLabelSecond = $('.steps__second-label')

buttonNext.click(function () {

  let id = $(this).attr('data-stage'),
    content = $('.steps__stage[data-stage="' + id + '"]');

  $('.steps__stage.steps__stage--active').removeClass('steps__stage--active').hide()
  content.addClass('steps__stage--active').fadeIn()


});
buttonPrev.click(function () {
  let id = $(this).attr('data-stage'),
    content = $('.steps__stage[data-stage="' + id + '"]');

  $('.steps__stage.steps__stage--active').removeClass('steps__stage--active').hide()
  content.addClass('steps__stage--active').fadeIn();
});

stepsInput.change(function(){
    if ($(this).is(':checked')) {
      buttonNext.prop('disabled', false)
    }
  });

// let buttonNext = $('.steps__button--next')
// let buttonPrev = $('.steps__button--prev')
// let currentNumber = $('.quiz__current').text()
//
// let id = 1
// buttonNext.prop('disabled', false)
//
//
// buttonNext.click(function () {
//   $('.quiz__current').text(currentNumber++)
//   $('.steps__stage[data-stage="' + id +++'"]')
//   if ($('input[name="steps-one"]').is(':checked')) {
//
//   }
//
//   $('.steps__stage.steps__stage--active').removeClass('steps__stage--active')
//   $('.steps__stage').addClass('steps__stage--active')



// else  {
//   buttonNext.prop('disabled', true)
// }


// $('.steps__label').click(function () {
//   buttonNext.prop('disabled', false)
//   $('.steps__stage[data-stage="' + id +++'"]')
//   console.log('следующий steps__stage id ' + id)
// })








