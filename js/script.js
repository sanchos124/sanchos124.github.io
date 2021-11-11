$(document).ready(function () {
  $(".catalog-item__link").each(function (i) {
    $(this).on("click", function (e) {
      e.preventDefault();
      $(".catalog-item__content")
        .eq(i)
        .toggleClass("catalog-item__content_active");
      $(".catalog-item__list").eq(i).toggleClass("catalog-item__list_active");
    });
  });

  $(".catalog-item__back").each(function (i) {
    $(this).on("click", function (e) {
      e.preventDefault();
      $(".catalog-item__content")
        .eq(i)
        .toggleClass("catalog-item__content_active");
      $(".catalog-item__list").eq(i).toggleClass("catalog-item__list_active");
    });
  });

  $("[data-modal=consultation]").on("click", function () {
    $(".overlay, #consultation").fadeIn("slow");
  });
  $(".modal__close").on("click", function () {
    $(".overlay, #consultation, #order, #thanks").fadeOut("slow");
  });

  $(".button_mini").each(function (i) {
    $(this).on("click", function () {
      $("#order .modal__descr").text($(".catalog-item__subtitle").eq(i).text());
      $(".overlay, #order").fadeIn("slow");
    });
  });

  function valideForm(form) {
    $(form).validate({
      rules: {
        name: {
          required: true,
          minlenght: 2,
        },
        phone: "required",
        email: {
          required: true,
          email: true,
        },
      },
      messages: {
        name: {
          required: "Пожалуйста, введите свое имя",
          minlenght: jQuery.validator.format("Минимум дожно быть {0} символа"),
        },
        phone: "Пожалуйста, введите свой номер телефона",
        email: {
          required: "Пожалуйста, введите свою почту",
          email: "Неправильно введен адрес почты",
        },
      },
    });
  }

  valideForm("#consultation-form form");
  valideForm("#consultation form");
  valideForm("#order form");

  $("input [name=phone]").mask("+7 (999) 999-99-99");
});

// Забираем все обьекты картинок
let slides = document.querySelectorAll(".carousel__single");
// Зарираем текущую ширину слайдера
const slides_width = document.querySelector(".carousel__slider").offsetWidth;
// Заполняем масив ссылками на картинки и удаляем их со страницы
let slider = [];
for (let i = 0; i < slides.length; i++) {
  slider[i] = slides[i].src;
  slides[i].remove();
}

// Создаем переменную текущей отображаемой картинки
let img_draw_naw = 0;

// Функция отрисовки картинки, передаем в нее номер текущей картинки и ширину слайдера
function draw(step, offset) {
  let img = document.createElement("img");
  img.src = slider[step];
  img.classList.add("carousel__single");
  img.style.left = offset + "px";
  document.querySelector(".carousel__slider").appendChild(img);
}

// Отрисовуем первое изображение
draw(0, 0);

// Создаем слушатель и передаем в него блоки кнопок
window.addEventListener("DOMContentLoaded", () => {
  let btn_left = document.querySelector(".carousel__left");
  let btn_right = document.querySelector(".carousel__right");

  btn_right.addEventListener("click", () => {
    //   Проверяем не послеедне ли эта картинка в масиве
    if (img_draw_naw + 1 == slider.length) {
      img_draw_naw = -1;
    }
    // Отрисовуем следующею картику после текущей со смещением в лево
    draw(img_draw_naw + 1, slides_width);
    // Забираем картинки со странице во временный масив для их здвига
    let slider2 = document.querySelectorAll(".carousel__single");
    for (let i = 0; i < slider2.length; i++) {
      // Устанавливаем паузу для нормально отображения онимации
      setTimeout(function () {
        slider2[i].style.left = i * slides_width - slides_width + "px";
      }, 10);
    }
    // Увеличиваем счетчик текущей картинки на один
    img_draw_naw++;
    // Устанавливаем задержку для удаление сдвинутой картинки
    setTimeout(function () {
      slider2[0].remove();
    }, 1000);
  });

  btn_left.addEventListener("click", () => {
    if (img_draw_naw - 1 == -1) {
      img_draw_naw = 3;
    }
    draw(img_draw_naw - 1, slides_width * -1);
    let slider2 = document.querySelectorAll(".carousel__single");
    for (let i = 0; i < slider2.length; i++) {
      setTimeout(function () {
        slider2[i].style.left = i * -1 * slides_width + slides_width + "px";
      }, 10);
    }
    img_draw_naw--;
    setTimeout(function () {
      slider2[0].remove();
    }, 1000);
  });
});

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1
// Табы

const tabsBtn = document.querySelectorAll(".catalog__tab");
const tabsContent = document.querySelectorAll(".catalog__content");

tabsBtn.forEach(function (item) {
  item.addEventListener("click", function () {
    let currentBtn = item;
    let tabId = currentBtn.getAttribute("data-tab");
    let currentTab = document.querySelector(tabId);

    if (!currentBtn.classList.contains("catalog__tab_active")) {
      tabsBtn.forEach(function (item) {
        item.classList.remove("catalog__tab_active");
      });

      tabsContent.forEach(function (item) {
        item.classList.remove("catalog__content_active");
      });

      currentBtn.classList.add("catalog__tab_active");
      currentTab.classList.add("catalog__content_active");
    }
  });
});

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1
// Подробнее
