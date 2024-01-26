function tabs() {
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
}

export default tabs;
