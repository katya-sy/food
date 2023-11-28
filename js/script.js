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
const deadline = "2023-12-02";

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
