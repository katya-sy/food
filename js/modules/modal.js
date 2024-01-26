function modal() {
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
}

export default modal;
