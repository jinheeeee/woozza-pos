'use strict';

/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');
window.hangul = require('hangul-js');

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

//Vue.component('example-component', require('./components/ExampleComponent.vue'));

/*
const app = new Vue({
    el: '#app'
});
*/
//실시간 현재시간 추출
var realTimeDate;
//document.ready -> window.ready -> window.onload
//window.onload = function () {}; (페이지 로드가 끝난 다음에 실행)
//$(window).ready(function () {}); (페이지 내의 이미지나 리소스 로드 후 실행)
//$(document).ready(function(){}); (페이지 DOM이 그려지면(태그등이 그려지고) 실행)
$(document).ready(function () {
  realTimeStartDate();
});

function realTimeStartDate() {
  realTimeDate = setInterval(function () {
    var dateString = "";
    var newDate = new Date();
    var weekText = new Array("일", "월", "화", "수", "목", "금", "토");
    var weekDay = newDate.getDay();

    //String.slice(-2) : 문자열을 뒤에서 2자리만 출력한다. (문자열 자르기)
    dateString += newDate.getFullYear() + "-";
    dateString += ("0" + (newDate.getMonth() + 1)).slice(-2) + "-"; //월은 0부터 시작하므로 +1을 해줘야 한다.
    dateString += ("0" + newDate.getDate()).slice(-2) + " ";
    dateString += "("+weekText[weekDay]+") ";
    dateString += ("0" + newDate.getHours()).slice(-2) + ":";
    dateString += ("0" + newDate.getMinutes()).slice(-2) ;
    //document.write(dateString); 문서에 바로 그릴 수 있다.
    $("#realTimeDate").text(dateString);
  }, 1000);
}




$('input').focus(function(){
  $('.keyboard').css({display:"block"});
});

$('.keyboard').on('mousedown', function(e) {
  const toggleSpecial = function () {
    if ($(e.target).parents('.keyboard').data('special')) {
      $(e.target).parents('.keyboard').data('special', false);
      $(e.target).parents('.keyboard').find('.key[data-func="special"]').text('?123');

      if ($(e.target).data('func') == 'special') {
        toggleLanguage($(e.target).parents('.keyboard').data('language'));
      } else {
        toggleLanguage('ko');
      }
    } else {
      $(e.target).parents('.keyboard').data('special', true);
      $(e.target).parents('.keyboard').find('.key[data-func="special"]').text($(e.target).parents('.keyboard').data('language') == 'ko' ? '가' : 'a');
      $(e.target).parents('.keyboard').find('.key[data-func="shift"]').each(function (i, e) {
        $(e).text('1/2');
      });
      $(e.target).parents('.keyboard').find('.key[data-func="language"]').html('한/영');
      $(e.target).parents('.keyboard').data('shift', false).find('.key').each(function (i, e) {
        $(e).removeClass('show-etc');
        $(e).removeClass('show-etc-shift');
        $(e).removeClass('show-ko');
        $(e).removeClass('show-ko-shift');
      });
      $(e.target).parents('.keyboard').find('.key[data-special]').each(function (i, e) {
        $(e).text($(e).data('special'));
      });
    }
  };

  const toggleShift = function (set_shift = null) {
    if (set_shift != null) {
      $(e.target).parents('.keyboard').data('shift', ! set_shift);
    }

    if ($(e.target).parents('.keyboard').data('shift')) {
      $(e.target).parents('.keyboard').data('shift', false);

      if ($(e.target).parents('.keyboard').data('special')) {
        $(e.target).parents('.keyboard').find('.key[data-func="shift"]').each(function (i, e) {
          $(e).text('1/2');
        });
        $(e.target).parents('.keyboard').find('.key[data-special]').each(function (i, e) {
          $(e).text($(e).data('special'));
        });
      } else {
        $(e.target).parents('.keyboard').find('.key[data-func="shift"]').each(function (i, e) {
          $(e).html('<img src="/images/shift.png">');
        });

        if ($(e.target).parents('.keyboard').data('language') == 'ko') {
          $(e.target).parents('.keyboard').find('.key[data-etc]').each(function (i, e) {
            $(e).text($(e).data('etc'));
            $(e).removeClass('show-etc');
            $(e).addClass('show-etc-shift');
          });
          $(e.target).parents('.keyboard').find('.key[data-ko]').each(function (i, e) {
            $(e).text($(e).data('ko'));
            $(e).removeClass('show-ko');
            $(e).addClass('show-ko-shift');
          });
        } else {
          $(e.target).parents('.keyboard').find('.key[data-etc]').each(function (i, e) {
            $(e).text($(e).data('etc'));
            $(e).removeClass('show-etc');
            $(e).addClass('show-etc-shift');
          });
          $(e.target).parents('.keyboard').find('.key[data-en]').each(function (i, e) {
            $(e).text($(e).data('en'));
          });
        }
      }
    } else {
      $(e.target).parents('.keyboard').data('shift', true);

      if ($(e.target).parents('.keyboard').data('special')) {
        $(e.target).parents('.keyboard').find('.key[data-func="shift"]').each(function (i, e) {
          $(e).text('2/2');
        });
        $(e.target).parents('.keyboard').find('.key[data-special-shift]').each(function (i, e) {
          console.log($(e).data('special-shift'));
          $(e).text($(e).data('special-shift'));
        });
      } else {
        $(e.target).parents('.keyboard').find('.key[data-func="shift"]').each(function (i, e) {
          $(e).html('<img src="/images/shift_active.png">');
        });

        if ($(e.target).parents('.keyboard').data('language') == 'ko') {
          $(e.target).parents('.keyboard').find('.key[data-etc-shift]').each(function (i, e) {
            $(e).text($(e).data('etc-shift'));
            $(e).removeClass('show-etc-shift');
            $(e).addClass('show-etc');
          });
          $(e.target).parents('.keyboard').find('.key[data-ko-shift]').each(function (i, e) {
            $(e).text($(e).data('ko-shift'));
            $(e).removeClass('show-ko-shift');
            $(e).addClass('show-ko');
          });
        } else {
          $(e.target).parents('.keyboard').find('.key[data-etc-shift]').each(function (i, e) {
            $(e).text($(e).data('etc-shift'));
            $(e).removeClass('show-etc-shift');
            $(e).addClass('show-etc');
          });
          $(e.target).parents('.keyboard').find('.key[data-en-shift]').each(function (i, e) {
            $(e).text($(e).data('en-shift'));
          });
        }
      }
    }
  };

  const toggleLanguage = function (set_language = null) {
    if (set_language != null) {
      $(e.target).parents('.keyboard').data('language', set_language == 'ko' ? 'en' : 'ko');
    }

    toggleShift(false);

    if ($(e.target).parents('.keyboard').data('special')) {
      toggleSpecial();

      return false;
    }

    if ($(e.target).parents('.keyboard').data('language') == 'ko') {
      $(e.target).parents('.keyboard').data('language', 'en');
      $(e.target).parents('.keyboard').find('.key[data-func="language"]').html('한/<span class="ft-dark-sky-blue">영</span>');
      $(e.target).parents('.keyboard').find('.key[data-en]').each(function (i, e) {
        $(e).text($(e).data('en'));
      });
      $(e.target).parents('.keyboard').find('.key[data-ko-shift]').each(function (i, e) {
        $(e).removeClass('show-ko-shift');
      });
    } else {
      $(e.target).parents('.keyboard').data('language', 'ko');
      $(e.target).parents('.keyboard').find('.key[data-func="language"]').html('<span class="ft-dark-sky-blue">한</span>/영');
      $(e.target).parents('.keyboard').find('.key[data-en]').each(function (i, e) {
        $(e).text($(e).data('ko'));
      });
      $(e.target).parents('.keyboard').find('.key[data-ko-shift]').each(function (i, e) {
        $(e).addClass('show-ko-shift');
      });
    }
  };

  if ($(e.target).parents('div').hasClass('key')) {
    e.target = $(e.target).parents('div.key');
  }

  if (! $(':focus').is('input[type=text], input[type=password]') || ! $(e.target).hasClass('key')) {
    return false;
  }

  let func;

  if (func = $(e.target).data('func')) {
    if (func == 'close') {
      // alert('close');
      $('.keyboard').css({display:"none"});
    } else if (func == 'backspace') {
      const start = $(':focus').prop('selectionStart');
      $(':focus').val($(':focus').val().substr(0, start - 1) + $(':focus').val().substr(start, $(':focus').val().length - start));
      $(':focus').prop('selectionStart', start - 1);
      $(':focus').prop('selectionEnd', start - 1);
    } else if (func == 'enter') {
      alert('enter');
    } else if (func == 'shift') {
      toggleShift();
    } else if (func == 'special') {
      toggleSpecial();
    } else if (func == 'space') {
      const start = $(':focus').prop('selectionStart');
      $(':focus').val($(':focus').val().substr(0, start) + ' ' + $(':focus').val().substr(start, $(':focus').val().length - start));
      $(':focus').prop('selectionStart', start + 1);
      $(':focus').prop('selectionEnd', start + 1);
    } else if (func == 'language') {
      toggleLanguage();
    } else if (func == 'left') {
      const start = $(':focus').prop('selectionStart');
      $(':focus').prop('selectionStart', start - 1);
      $(':focus').prop('selectionEnd', start - 1);
    } else if (func == 'right') {
      let start = $(':focus').prop('selectionStart');
      if (start == $(':focus').val().length) {
        start = -1;
      }
      $(':focus').prop('selectionStart', start + 1);
      $(':focus').prop('selectionEnd', start + 1);
    } else {
      alert('?');
    }
  } else {
    $(':focus').val($(':focus').val() + $(e.target).text());
    $(':focus').val(hangul.assemble($(':focus').val()));
  }

  return false;
});
