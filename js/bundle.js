/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calculator.js":
/*!**********************************!*\
  !*** ./js/modules/calculator.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calculator() {
  const result = document.querySelector(".calculating__result span");
  let gender, height, weight, age, ratio;
  if (localStorage.getItem("gender")) {
    gender = localStorage.getItem("gender");
  } else {
    gender = "female";
    localStorage.setItem("gender", "female");
  }
  if (localStorage.getItem("ratio")) {
    ratio = localStorage.getItem("ratio");
  } else {
    ratio = 1.375;
    localStorage.setItem("ratio", 1.375);
  }
  function calcCalories() {
    if (!gender || !height || !weight || !age || !ratio) {
      result.textContent = "____";
      return;
    }
    if (gender === "female") {
      result.textContent = Math.round((447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio);
    } else {
      result.textContent = Math.round((88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio);
    }
  }
  function initLocalSettings(selector, activeClass) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => {
      element.classList.remove(activeClass);
      if (element.getAttribute("id") === localStorage.getItem("gender")) element.classList.add(activeClass);
      if (element.getAttribute("data-ratio") === localStorage.getItem("ratio")) element.classList.add(activeClass);
    });
  }
  function getStaticInfo(selector, activeClass) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => {
      element.addEventListener("click", e => {
        if (e.target.getAttribute("data-ratio")) {
          ratio = +e.target.getAttribute("data-ratio");
          localStorage.setItem("ratio", ratio);
        } else {
          gender = e.target.getAttribute("id");
          localStorage.setItem("gender", gender);
        }
        elements.forEach(element => {
          e.target === element ? element.classList.add(activeClass) : element.classList.remove(activeClass);
        });
        calcCalories();
      });
    });
  }
  function getDynamicInfo(selector) {
    const input = document.querySelector(selector);
    input.addEventListener("input", () => {
      if (input.value.match(/\D/g)) {
        input.style.border = "1px solid red";
      } else {
        input.style.border = "none";
      }
      switch (input.getAttribute("id")) {
        case "height":
          height = +input.value;
          break;
        case "weight":
          weight = +input.value;
          break;
        case "age":
          age = +input.value;
          break;
      }
      calcCalories();
    });
  }
  calcCalories();
  initLocalSettings("#gender div", "calculating__choose-item_active");
  initLocalSettings("#ratio div", "calculating__choose-item_active");
  getDynamicInfo("#height");
  getDynamicInfo("#weight");
  getDynamicInfo("#age");
  getStaticInfo("#gender div", "calculating__choose-item_active");
  getStaticInfo("#ratio div", "calculating__choose-item_active");
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calculator);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_sevices__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/sevices */ "./js/services/sevices.js");

function cards() {
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
        this.classes.forEach(className => item.classList.add(className));
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
  (0,_services_sevices__WEBPACK_IMPORTED_MODULE_0__.getResources)("http://localhost:3000/menu").then(data => {
    data.forEach(({
      img,
      altimg,
      title,
      descr,
      price
    }) => {
      new MenuCard(img, altimg, title, descr, price, ".menu__field .container");
    });
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_sevices__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/sevices */ "./js/services/sevices.js");


function forms(formSelector, modalTimerId) {
  const forms = document.querySelectorAll(formSelector);
  const message = {
    loading: "img/form/loader.svg",
    success: "Спасибо! Мы свяжемся с Вами в ближайшее время",
    failure: "Что-то пошло не так"
  };
  function bindPostData(form) {
    form.addEventListener("submit", e => {
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
      (0,_services_sevices__WEBPACK_IMPORTED_MODULE_1__.postData)("http://localhost:3000/requests", json).then(data => {
        console.log(data);
        showThanksModal(message.success);
        statusMesssage.remove();
      }).catch(() => showThanksModal(message.failure)).finally(() => form.reset());
    });
  }
  function showThanksModal(message) {
    const prevContentModal = document.querySelector(".modal__content");
    prevContentModal.style.display = "none";
    (0,_modal__WEBPACK_IMPORTED_MODULE_0__.modalOpen)(".modal", modalTimerId);
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
      (0,_modal__WEBPACK_IMPORTED_MODULE_0__.modalClose)(".modal");
    }, 4000);
  }
  forms.forEach(item => bindPostData(item));
  fetch("http://localhost:3000/menu").then(data => data.json()).then(res => console.log(res));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   modalClose: () => (/* binding */ modalClose),
/* harmony export */   modalOpen: () => (/* binding */ modalOpen)
/* harmony export */ });
function modalOpen(modalSelector, modalTimerId) {
  const modal = document.querySelector(modalSelector);
  modal.style.display = "block";
  document.body.style.overflow = "hidden";
  if (modalTimerId) clearTimeout(modalTimerId);
}
function modalClose(modalSelector) {
  const modal = document.querySelector(modalSelector);
  modal.style.display = "none";
  document.body.style.overflow = "";
}
function modal(triggerSelector, modalSelector, modalTimerId) {
  const modalTrigger = document.querySelectorAll(triggerSelector),
    modal = document.querySelector(modalSelector);
  function modalShowByScroll() {
    if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
      modalOpen(modalSelector, modalTimerId);
      window.removeEventListener("scroll", modalShowByScroll);
    }
  }
  modalTrigger.forEach(btn => {
    btn.addEventListener("click", () => modalOpen(modalSelector, modalTimerId));
  });
  modal.addEventListener("click", e => {
    if (e.target === modal || e.target.getAttribute("data-close") == "") modalClose(modalSelector);
  });
  document.addEventListener("keydown", e => {
    if (e.code === "Escape" && modal.style.display === "block") modalClose(modalSelector);
  });
  window.addEventListener("scroll", modalShowByScroll);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);


/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _timer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./timer */ "./js/modules/timer.js");

function slider({
  container,
  slide,
  nextArrow,
  prevArrow,
  totalCounter,
  currentCounter,
  wrapper,
  field
}) {
  const slider = document.querySelector(container),
    slidesWrapper = slider.querySelector(wrapper),
    slides = slidesWrapper.querySelectorAll(slide),
    slidePrevArrow = slider.querySelector(prevArrow),
    slideNextArrow = slider.querySelector(nextArrow),
    sliderCounterCurrent = slider.querySelector(currentCounter),
    sliderCounterTotal = slider.querySelector(totalCounter),
    slidesField = slidesWrapper.querySelector(field),
    widthOfSlidesWrapper = window.getComputedStyle(slidesWrapper).width,
    sliderIndicators = document.createElement("ol"),
    sliderIndicatorDots = [];
  let activeIndex = 0,
    offset = 0;
  function createSliderIndicators() {
    sliderIndicators.classList.add("carousel-indicators");
    slider.append(sliderIndicators);
    slides.forEach((_slide, index) => {
      const dot = document.createElement("li");
      dot.classList.add("dot");
      dot.setAttribute("data-slide-to", index);
      sliderIndicators.append(dot);
      sliderIndicatorDots.push(dot);
    });
    sliderIndicatorDots[activeIndex].style.backgroundColor = "#303030";
  }
  function initSlider() {
    sliderCounterCurrent.textContent = (0,_timer__WEBPACK_IMPORTED_MODULE_0__.getZero)(activeIndex + 1);
    sliderCounterTotal.textContent = (0,_timer__WEBPACK_IMPORTED_MODULE_0__.getZero)(slides.length);
    slidesField.style.width = 100 * slides.length + "%";
    slidesField.style.display = "flex";
    slidesField.style.transition = "0.5s all";
    slidesWrapper.style.overflow = "hidden";
    slider.style.position = "relative";
    slides.forEach(slide => {
      slide.style.width = widthOfSlidesWrapper;
    });
    createSliderIndicators();
  }
  function toActiveSlide() {
    sliderIndicatorDots[activeIndex].style.backgroundColor = "#303030";
    slidesField.style.transform = `translateX(-${offset}px)`;
    sliderCounterCurrent.textContent = (0,_timer__WEBPACK_IMPORTED_MODULE_0__.getZero)(activeIndex + 1);
  }
  function navSlider(next = true) {
    sliderIndicatorDots[activeIndex].style.backgroundColor = "#fff";
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
    toActiveSlide();
  }
  initSlider();
  slideNextArrow.addEventListener("click", () => {
    navSlider();
  });
  slidePrevArrow.addEventListener("click", () => {
    navSlider(false);
  });
  sliderIndicatorDots.forEach(dot => {
    dot.addEventListener("click", e => {
      sliderIndicatorDots[activeIndex].style.backgroundColor = "#fff";
      const slideTo = e.target.getAttribute("data-slide-to");
      activeIndex = +slideTo;
      offset = parseFloat(widthOfSlidesWrapper) * slideTo;
      toActiveSlide();
    });
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
  const tabs = document.querySelectorAll(tabsSelector),
    tabsNav = document.querySelector(tabsParentSelector),
    tabsContent = document.querySelectorAll(tabsContentSelector);
  let tabheaderItemActive = document.querySelector(`.${activeClass}`);
  function hideTabsContent() {
    tabsContent.forEach(item => {
      item.style.display = "none";
    });
    tabs.forEach((item, i) => {
      if (item.classList.contains(activeClass)) {
        tabsContent[i].style.display = "block";
      }
    });
  }
  hideTabsContent();
  tabsNav.addEventListener("click", e => {
    if (e.target && e.target.classList.contains(tabsSelector.slice(1)) && e.target !== tabheaderItemActive) {
      tabheaderItemActive.classList.remove(activeClass);
      tabheaderItemActive = e.target;
      tabheaderItemActive.classList.add(activeClass);
      hideTabsContent();
    }
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   getZero: () => (/* binding */ getZero)
/* harmony export */ });
function getZero(num) {
  if (num >= 0 && num < 10) {
    return `0${num}`;
  } else {
    return num;
  }
}
function timer(id, deadline) {
  function getTimeRemaining(endtime) {
    const t = Date.parse(endtime) - new Date(),
      days = Math.floor(t / (1000 * 60 * 60 * 24)),
      hours = Math.floor(t / (1000 * 60 * 60) % 24),
      minutes = Math.floor(t / 1000 / 60 % 60),
      seconds = Math.floor(t / 1000 % 60);
    return {
      total: t,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds
    };
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
  setClock(id, deadline);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);


/***/ }),

/***/ "./js/services/sevices.js":
/*!********************************!*\
  !*** ./js/services/sevices.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getResources: () => (/* binding */ getResources),
/* harmony export */   postData: () => (/* binding */ postData)
/* harmony export */ });
const postData = async (url, data) => {
  const result = await fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: data
  });
  return await result.json();
};
const getResources = async url => {
  const result = await fetch(url);
  if (!result.ok) {
    throw new Error(`Could not fetch ${url}, status ${result.status}`);
  }
  return await result.json();
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_calculator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/calculator */ "./js/modules/calculator.js");







const modalTimerId = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__.modalOpen)(".modal", modalTimerId), 30000);
(0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])(".tabheader__item", ".tabcontent", ".tabheader__items", "tabheader__item_active");
(0,_modules_timer__WEBPACK_IMPORTED_MODULE_1__["default"])(".timer", "2024-03-10");
(0,_modules_cards__WEBPACK_IMPORTED_MODULE_2__["default"])();
(0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__["default"])("[data-modal]", ".modal", modalTimerId);
(0,_modules_forms__WEBPACK_IMPORTED_MODULE_4__["default"])("form", modalTimerId);
(0,_modules_slider__WEBPACK_IMPORTED_MODULE_5__["default"])({
  container: ".offer__slider",
  slide: ".offer__slide",
  nextArrow: ".offer__slider-next",
  prevArrow: ".offer__slider-prev",
  totalCounter: "#total",
  currentCounter: "#current",
  wrapper: ".offer__slider-wrapper",
  field: ".offer__slider-inner"
});
(0,_modules_calculator__WEBPACK_IMPORTED_MODULE_6__["default"])();
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map