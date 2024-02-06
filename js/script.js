import tabs from "./modules/tabs";
import timer from "./modules/timer";
import cards from "./modules/cards";
import modal, { modalOpen } from "./modules/modal";
import forms from "./modules/forms";
import slider from "./modules/slider";
import calculator from "./modules/calculator";

const modalTimerId = setTimeout(() => modalOpen(".modal", modalTimerId), 30000);

tabs(
  ".tabheader__item",
  ".tabcontent",
  ".tabheader__items",
  "tabheader__item_active"
);
timer(".timer", "2024-03-10");
cards();
modal("[data-modal]", ".modal", modalTimerId);
forms("form", modalTimerId);
slider({
  container: ".offer__slider",
  slide: ".offer__slide",
  nextArrow: ".offer__slider-next",
  prevArrow: ".offer__slider-prev",
  totalCounter: "#total",
  currentCounter: "#current",
  wrapper: ".offer__slider-wrapper",
  field: ".offer__slider-inner",
});
calculator();
