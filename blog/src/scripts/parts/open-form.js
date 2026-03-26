const openFormButton = document.querySelector(".admin-panel__open-form");
const curtainForm = document.querySelector(".create-article__curtain");
const headerForm = document.querySelector(".create-article__header");
const formForm = document.querySelector(".create-article__form");
const rejectButton = document.querySelector(".create-article__refresh-button");

openFormButton.addEventListener("click", () => {
  if (openFormButton._timeOut === true) return;
  makeButtonDisabled();
  const flagOpenForm = openFormButton.getAttribute("data-clicked");
  if (flagOpenForm) {
    closeForm();
  } else {
    openForm();
  }
});

async function closeForm() {
  openFormButton.removeAttribute("data-clicked");
  curtainForm.style.display = "block";
  await toggleCurtainOpacity(0);
  curtainForm.style.position = "relative";
  headerForm.style.display = "none";
  formForm.style.display = "none";
  await closeCurtain();
}

async function openForm() {
  openFormButton.setAttribute("data-clicked", "true");
  await openCurtain();
  curtainForm.style.position = "absolute";
  headerForm.style.display = "flex";
  formForm.style.display = "flex";
  await toggleCurtainOpacity(10);
  curtainForm.style.display = "none";
}

function makeButtonDisabled() {
  openFormButton._timeOut = true;
  openFormButton.classList.add("disabled");
  setTimeout(() => {
    openFormButton._timeOut = false;
    openFormButton.classList.remove("disabled");
  }, 2500);
}

function openCurtain() {
  return new Promise((resolve) => {
    let height = 0;
    const tickMs = 10;
    curtainForm.style.display = "block";
    let timerId = setTimeout(function tick() {
      height += 10;
      if (height >= 475) {
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
    let height = parseInt(curtainForm.style.height);
    const tickMs = 10;
    let timerId = setTimeout(function tick() {
      height -= 10;
      if (height === 0) {
        clearTimeout(timerId);
        curtainForm.style.display = "none";
        resolve();
      } else {
        curtainForm.style.height = `${height}px`;
        timerId = setTimeout(tick, tickMs);
      }
    }, tickMs);
  });
}

function toggleCurtainOpacity(defOpacity) {
  return new Promise((resolve) => {
    let stepOpacity = 1;
    let endOpacity = 10;
    if (defOpacity === 10) {
      stepOpacity = -1;
      endOpacity = 0;
    }
    let opacity = defOpacity;
    let tickMs = 20;
    let timerId = setTimeout(function tick() {
      opacity += stepOpacity;
      if (opacity === endOpacity) {
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

rejectButton.addEventListener("click", closeForm);
