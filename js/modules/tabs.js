function tabs(
  tabsSelector,
  tabsContentSelector,
  tabsParentSelector,
  activeClass
) {
  const tabs = document.querySelectorAll(tabsSelector),
    tabsNav = document.querySelector(tabsParentSelector),
    tabsContent = document.querySelectorAll(tabsContentSelector);
  let tabheaderItemActive = document.querySelector(`.${activeClass}`);

  function hideTabsContent() {
    tabsContent.forEach((item) => {
      item.style.display = "none";
    });

    tabs.forEach((item, i) => {
      if (item.classList.contains(activeClass)) {
        tabsContent[i].style.display = "block";
      }
    });
  }

  hideTabsContent();

  tabsNav.addEventListener("click", (e) => {
    if (
      e.target &&
      e.target.classList.contains(tabsSelector.slice(1)) &&
      e.target !== tabheaderItemActive
    ) {
      tabheaderItemActive.classList.remove(activeClass);
      tabheaderItemActive = e.target;
      tabheaderItemActive.classList.add(activeClass);
      hideTabsContent();
    }
  });
}

export default tabs;
