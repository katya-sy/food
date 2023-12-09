// tabs
const tabs = document.querySelectorAll(".tabheader__item"),
  tabsNav = document.querySelector(".tabheader__items"),
  tabsContent = document.querySelectorAll(".tabcontent");
let tabheaderItemActive = document.querySelector(".tabheader__item_active");

function hideTabsContent() {
  tabsContent.forEach((item) => {
    item.style.display = "none";
  });

  tabs.forEach((item, i) => {
    if (item.classList.contains("tabheader__item_active")) {
      tabsContent[i].style.display = "block";
    }
  });
}

hideTabsContent();

tabsNav.addEventListener("click", (e) => {
  if (
    e.target &&
    e.target.classList.contains("tabheader__item") &&
    e.target !== tabheaderItemActive
  ) {
    tabheaderItemActive.classList.remove("tabheader__item_active");
    tabheaderItemActive = e.target;
    tabheaderItemActive.classList.add("tabheader__item_active");
    hideTabsContent();
  }
});

// timer
const deadline = "2023-12-10";

function getTimeRemaining(endtime) {
  const t = Date.parse(endtime) - new Date(),
    days = Math.floor(t / (1000 * 60 * 60 * 24)),
    hours = Math.floor((t / (1000 * 60 * 60)) % 24),
    minutes = Math.floor((t / 1000 / 60) % 60),
    seconds = Math.floor((t / 1000) % 60);

  return {
    total: t,
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
  };
}

function getZero(num) {
  if (num >= 0 && num < 10) {
    return `0${num}`;
  } else {
    return num;
  }
}

function setClock(selector, endtime) {
  const timer = document.querySelector(selector),
    days = timer.querySelector("#days"),
    hours = timer.querySelector("#hours"),
    minutes = timer.querySelector("#minutes"),
    seconds = timer.querySelector("#seconds"),
    timeInterval = setInterval(updateClock, 1000);

  updateClock();

  function updateClock() {
    const t = getTimeRemaining(endtime);

    days.textContent = getZero(t.days);
    hours.textContent = getZero(t.hours);
    minutes.textContent = getZero(t.minutes);
    seconds.textContent = getZero(t.seconds);

    if (t.total <= 0) clearInterval(timeInterval);
  }
}

setClock(".timer", deadline);

// modal
const modalTrigger = document.querySelectorAll("[data-modal]"),
  modal = document.querySelector(".modal"),
  modalTimerId = setTimeout(modalOpen, 30000);

function modalOpen() {
  modal.style.display = "block";
  document.body.style.overflow = "hidden";
  clearTimeout(modalTimerId);
}

function modalClose() {
  modal.style.display = "none";
  document.body.style.overflow = "";
}

function modalShowByScroll() {
  if (
    window.scrollY + document.documentElement.clientHeight >=
    document.documentElement.scrollHeight
  ) {
    modalOpen();
    window.removeEventListener("scroll", modalShowByScroll);
  }
}

modalTrigger.forEach((btn) => {
  btn.addEventListener("click", modalOpen);
});

modal.addEventListener("click", (e) => {
  if (e.target === modal || e.target.getAttribute("data-close") == "")
    modalClose();
});

document.addEventListener("keydown", (e) => {
  if (e.code === "Escape" && modal.style.display === "block") modalClose();
});

window.addEventListener("scroll", modalShowByScroll);

// cards
class MenuCard {
  constructor(imgUrl, imgAlt, title, desc, price, parentSelector, ...classes) {
    this.imgUrl = imgUrl;
    this.imgAlt = imgAlt;
    this.title = title;
    this.desc = desc;
    this.price = price;
    this.parent = document.querySelector(`${parentSelector}`);
    this.classes = classes;
    this.transferCurrency = 80;
    this.changeToRub();
    this.render(this.imgUrl, this.imgAlt, this.title, this.desc, this.price);
  }

  changeToRub() {
    this.price = +this.price * this.transferCurrency;
  }

  render() {
    const item = document.createElement("div");

    if (this.classes.length === 0) {
      this.classes = "menu__item";
      item.classList.add(this.classes);
    } else {
      this.classes.forEach((className) => item.classList.add(className));
    }

    item.innerHTML = `
    <img src="${this.imgUrl}" alt="${this.imgAlt}" />
    <h3 class="menu__item-subtitle">Меню "${this.title}"</h3>
    <div class="menu__item-descr">
      ${this.desc}
    </div>
    <div class="menu__item-divider"></div>
    <div class="menu__item-price">
      <div class="menu__item-cost">Цена:</div>
      <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
    </div>
    `;

    this.parent.append(item);
  }
}

new MenuCard(
  "img/tabs/vegy.jpg",
  "vegy",
  "Фитнес",
  'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
  3.7,
  ".menu__field .container"
);

new MenuCard(
  "img/tabs/elite.jpg",
  "elite",
  "Премиум",
  "В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!",
  7,
  ".menu__field .container"
);

new MenuCard(
  "img/tabs/post.jpg",
  "post",
  "Постное",
  "Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.",
  5.5,
  ".menu__field .container"
);

// forms
const forms = document.querySelectorAll("form");

const message = {
  loading: "img/form/loader.svg",
  success: "Спасибо! Мы свяжемся с Вами в ближайшее время",
  failure: "Что-то пошло не так",
};

function postData(form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const statusMesssage = document.createElement("img");
    statusMesssage.src = message.loading;
    statusMesssage.style.cssText = `
      display: block;
      margin: 0 auto;
    `;
    form.insertAdjacentElement("afterend", statusMesssage);

    const request = new XMLHttpRequest();
    request.open("POST", "server.php");
    request.setRequestHeader("Content-type", "application/json");
    const formData = new FormData(form);

    const object = {};
    formData.forEach((value, key) => {
      object[key] = value;
    });

    request.send(JSON.stringify(object));

    request.addEventListener("load", () => {
      if (request.status === 200) {
        console.log(request.response);
        showThanksModal(message.success);
        form.reset();
        statusMesssage.remove();
      } else {
        showThanksModal(message.failure);
      }
    });
  });
}

function showThanksModal(message) {
  const prevContentModal = document.querySelector(".modal__content");

  prevContentModal.style.display = "none";
  modalOpen();

  const thanksModal = document.createElement("div");
  thanksModal.classList.add("modal__content");
  thanksModal.innerHTML = `
    <div data-close class="modal__close">×</div>
    <div class="modal__title">${message}</div>
  `;

  document.querySelector(".modal__dialog").append(thanksModal);
  setTimeout(() => {
    thanksModal.remove();
    prevContentModal.style.display = "block";
    modalClose();
  }, 4000);
}

forms.forEach((item) => postData(item));
