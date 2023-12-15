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
    <h3 class="menu__item-subtitle">${this.title}</h3>
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

const getResources = async (url) => {
  const result = await fetch(url);

  if (!result.ok) {
    throw new Error(`Could not fetch ${url}, status ${result.status}`);
  }

  return await result.json();
};

axios.get("http://localhost:3000/menu").then((data) => {
  data.data.forEach(({ img, altimg, title, descr, price }) => {
    new MenuCard(img, altimg, title, descr, price, ".menu__field .container");
  });
});

// forms
const forms = document.querySelectorAll("form");

const message = {
  loading: "img/form/loader.svg",
  success: "Спасибо! Мы свяжемся с Вами в ближайшее время",
  failure: "Что-то пошло не так",
};

const postData = async (url, data) => {
  const result = await fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: data,
  });

  return await result.json();
};

function bindPostData(form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const statusMesssage = document.createElement("img");
    statusMesssage.src = message.loading;
    statusMesssage.style.cssText = `
      display: block;
      margin: 0 auto;
    `;
    form.insertAdjacentElement("afterend", statusMesssage);

    const formData = new FormData(form);

    const json = JSON.stringify(Object.fromEntries(formData.entries()));

    postData("http://localhost:3000/requests", json)
      .then((data) => {
        console.log(data);
        showThanksModal(message.success);
        statusMesssage.remove();
      })
      .catch(() => showThanksModal(message.failure))
      .finally(() => form.reset());
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

forms.forEach((item) => bindPostData(item));

fetch("http://localhost:3000/menu")
  .then((data) => data.json())
  .then((res) => console.log(res));

// slider
const slidesWrapper = document.querySelector(".offer__slider-wrapper"),
  slides = slidesWrapper.querySelectorAll(".offer__slide"),
  slidePrevArrow = document.querySelector(".offer__slider-prev"),
  slideNextArrow = document.querySelector(".offer__slider-next"),
  sliderCounterCurrent = document.querySelector("#current"),
  sliderCounterTotal = document.querySelector("#total"),
  slidesField = slidesWrapper.querySelector(".offer__slider-inner"),
  widthOfSlidesWrapper = window.getComputedStyle(slidesWrapper).width;

let activeIndex = 0,
  offset = 0;

function initSlider() {
  sliderCounterCurrent.textContent = getZero(activeIndex + 1);
  sliderCounterTotal.textContent = getZero(slides.length);

  slidesField.style.width = 100 * slides.length + "%";
  slidesField.style.display = "flex";
  slidesField.style.transition = "0.5s all";

  slidesWrapper.style.overflow = "hidden";

  slides.forEach((slide) => {
    slide.style.width = widthOfSlidesWrapper;
  });
}

function navSlider(next = true) {
  if (next) {
    if (offset == parseFloat(widthOfSlidesWrapper) * (slides.length - 1)) {
      offset = 0;
    } else {
      offset += parseFloat(widthOfSlidesWrapper);
    }

    if (activeIndex === slides.length - 1) {
      activeIndex = 0;
    } else {
      activeIndex++;
    }
  } else {
    if (offset == 0) {
      offset = parseFloat(widthOfSlidesWrapper) * (slides.length - 1);
    } else {
      offset -= parseFloat(widthOfSlidesWrapper);
    }

    if (activeIndex === 0) {
      activeIndex = slides.length - 1;
    } else {
      activeIndex--;
    }
  }

  slidesField.style.transform = `translateX(-${offset}px)`;
  sliderCounterCurrent.textContent = getZero(activeIndex + 1);
}

initSlider();

slideNextArrow.addEventListener("click", () => {
  navSlider();
});

slidePrevArrow.addEventListener("click", () => {
  navSlider(false);
});
