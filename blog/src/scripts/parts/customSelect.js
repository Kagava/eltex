const list = document.querySelector(".custom-select");
const listContainer = document.querySelector(".custom-select__content");
const listArrow = document.querySelector(".custom-select__arrow");
const listTennis = document.querySelector(".custom-select__tennis");
const listFrontend = document.querySelector(".custom-select__frontend");
const spanChoice = document.querySelector(".custom-select__choice");
const select = document.querySelector(".create-article__input-type");

list.addEventListener("click", (event) => {
  const target = event.target;
  if (target.classList.contains("custom-select__item")) {
    spanChoice.textContent = target.textContent;
    spanChoice.setAttribute(
      "data-choice",
      `${target.getAttribute("data-choice")}`,
    );
    changeSelect();
  }
  if (listArrow.classList.contains("rotate")) {
    listArrow.classList.remove("rotate");
    listTennis.classList.remove("rotate");
    listFrontend.classList.remove("rotate");
    for (item of list.children) {
      if (item.classList.contains("custom-select__item")) {
        item.style.transform = "translateY(-75%)";
      }
    }
  } else {
    listArrow.classList.add("rotate");
    dropingList();
    setTimeout(() => {
      listTennis.classList.add("rotate");
      listFrontend.classList.add("rotate");
    }, 500);
  }
});

function dropingList() {
  let length = 42;
  for (item of list.children) {
    if (item.classList.contains("custom-select__item")) {
      item.style.transform = `translateY(${length}%)`;
      length += 100;
    }
  }
}

function changeSelect() {
  select.value = spanChoice.getAttribute("data-choice");
  console.log(select.value);
}
