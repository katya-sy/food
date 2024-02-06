import { getZero } from "./timer";

function slider({
  container,
  slide,
  nextArrow,
  prevArrow,
  totalCounter,
  currentCounter,
  wrapper,
  field,
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
    sliderCounterCurrent.textContent = getZero(activeIndex + 1);
    sliderCounterTotal.textContent = getZero(slides.length);

    slidesField.style.width = 100 * slides.length + "%";
    slidesField.style.display = "flex";
    slidesField.style.transition = "0.5s all";

    slidesWrapper.style.overflow = "hidden";

    slider.style.position = "relative";

    slides.forEach((slide) => {
      slide.style.width = widthOfSlidesWrapper;
    });

    createSliderIndicators();
  }

  function toActiveSlide() {
    sliderIndicatorDots[activeIndex].style.backgroundColor = "#303030";
    slidesField.style.transform = `translateX(-${offset}px)`;
    sliderCounterCurrent.textContent = getZero(activeIndex + 1);
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

  sliderIndicatorDots.forEach((dot) => {
    dot.addEventListener("click", (e) => {
      sliderIndicatorDots[activeIndex].style.backgroundColor = "#fff";

      const slideTo = e.target.getAttribute("data-slide-to");
      activeIndex = +slideTo;
      offset = parseFloat(widthOfSlidesWrapper) * slideTo;

      toActiveSlide();
    });
  });
}

export default slider;
