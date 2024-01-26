function cards() {
  class MenuCard {
    constructor(
      imgUrl,
      imgAlt,
      title,
      desc,
      price,
      parentSelector,
      ...classes
    ) {
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
        this.classes.forEach((className) => item.classList.add(className));
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

  const getResources = async (url) => {
    const result = await fetch(url);

    if (!result.ok) {
      throw new Error(`Could not fetch ${url}, status ${result.status}`);
    }

    return await result.json();
  };

  axios.get("http://localhost:3000/menu").then((data) => {
    data.data.forEach(({ img, altimg, title, descr, price }) => {
      new MenuCard(img, altimg, title, descr, price, ".menu__field .container");
    });
  });
}

export default cards;
