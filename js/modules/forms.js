import { modalOpen, modalClose } from "./modal";
import { postData } from "../services/sevices";

function forms(formSelector, modalTimerId) {
  const forms = document.querySelectorAll(formSelector);

  const message = {
    loading: "img/form/loader.svg",
    success: "Спасибо! Мы свяжемся с Вами в ближайшее время",
    failure: "Что-то пошло не так",
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
    modalOpen(".modal", modalTimerId);

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
      modalClose(".modal");
    }, 4000);
  }

  forms.forEach((item) => bindPostData(item));

  fetch("http://localhost:3000/menu")
    .then((data) => data.json())
    .then((res) => console.log(res));
}

export default forms;
