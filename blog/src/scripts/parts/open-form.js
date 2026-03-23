const openFormButton = document.querySelector(".admin-panel__open-form");
const curtainForm = document.querySelector(".create-article__curtain");
const headerForm = document.querySelector(".create-article__header");
const formForm = document.querySelector(".create-article__form");
const body = document.body;

openFormButton.addEventListener("click", async () => {
  if (openFormButton._timeOut === true) return;
  openFormButton._timeOut = true;
  //TOFO
  /*  Сделать отлючение кнопки  
    какой-нить добавить класс
    и в этом классе менять фон 
    на серый
*/
  setTimeout(() => {
    openFormButton._timeOut = false;
  }, 5000);
  const flagOpenedForm = openFormButton.getAttribute("data-clicked");
  if (flagOpenedForm) {
    openFormButton.removeAttribute("data-clicked");
  } else {
    openFormButton.setAttribute("data-clicked", "true");
    await openForm();
    curtainForm.style.position = "absolute";
    headerForm.style.display = "flex";
    formForm.style.display = "flex";
    await closeCurtain();
    curtainForm.style.display = "none";
  }
  //   openFormButton.setAttribute("data-clicked", "");
  //   console.log(openFormButton.getAttribute("data-clicked"));
  //   openFormButton.removeAttribute("data-clicked");
  //   console.log(openFormButton.getAttribute("data-clicked"));
});

function openForm() {
  return new Promise((resolve) => {
    let height = 0;
    let tickMs = 10;
    curtainForm.style.display = "block";
    let timerId = setTimeout(function tick() {
      height += 10;
      if (height >= 420) {
        clearTimeout(timerId);
        resolve();
      } else {
        curtainForm.style.height = `${height}px`;
        timerId = setTimeout(tick, tickMs);
      }
    }, tickMs);
  });
}

function closeCurtain() {
  return new Promise((resolve) => {
    let opacity = 10;
    let tickMs = 20;
    let timerId = setTimeout(function tick() {
      opacity -= 1;
      if (opacity === 0) {
        curtainForm.style.opacity = opacity / 10;
        clearTimeout(timerId);
        resolve();
      } else {
        curtainForm.style.opacity = opacity / 10;
        timerId = setTimeout(tick, tickMs);
      }
    }, tickMs);
  });
}
