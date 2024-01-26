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
      result.textContent = Math.round(
        (447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio
      );
    } else {
      result.textContent = Math.round(
        (88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio
      );
    }
  }

  function initLocalSettings(selector, activeClass) {
    const elements = document.querySelectorAll(selector);

    elements.forEach((element) => {
      element.classList.remove(activeClass);
      if (element.getAttribute("id") === localStorage.getItem("gender"))
        element.classList.add(activeClass);
      if (element.getAttribute("data-ratio") === localStorage.getItem("ratio"))
        element.classList.add(activeClass);
    });
  }

  function getStaticInfo(selector, activeClass) {
    const elements = document.querySelectorAll(selector);

    elements.forEach((element) => {
      element.addEventListener("click", (e) => {
        if (e.target.getAttribute("data-ratio")) {
          ratio = +e.target.getAttribute("data-ratio");
          localStorage.setItem("ratio", ratio);
        } else {
          gender = e.target.getAttribute("id");
          localStorage.setItem("gender", gender);
        }

        elements.forEach((element) => {
          e.target === element
            ? element.classList.add(activeClass)
            : element.classList.remove(activeClass);
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

export default calculator;
