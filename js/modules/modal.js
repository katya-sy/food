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
    if (
      window.scrollY + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight
    ) {
      modalOpen(modalSelector, modalTimerId);
      window.removeEventListener("scroll", modalShowByScroll);
    }
  }

  modalTrigger.forEach((btn) => {
    btn.addEventListener("click", () => modalOpen(modalSelector, modalTimerId));
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal || e.target.getAttribute("data-close") == "")
      modalClose(modalSelector);
  });

  document.addEventListener("keydown", (e) => {
    if (e.code === "Escape" && modal.style.display === "block")
      modalClose(modalSelector);
  });

  window.addEventListener("scroll", modalShowByScroll);
}

export default modal;
export { modalOpen, modalClose };
