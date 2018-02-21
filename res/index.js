(function startHeroScaling() {
  let lastHeroWidth;

  function updateHero() {
    const image = document.getElementById("hero-image");
    const newHeroWidth = image.offsetWidth;

    if (newHeroWidth === lastHeroWidth) {
      return;
    }

    lastHeroWidth = newHeroWidth;

    const imageOriginalSize = { width: 1286, height: 544 };
    const overlayContainer = document.getElementById("hero-overlay-container");
    const scale = newHeroWidth / imageOriginalSize.width;

    overlayContainer.style.transform = "scale(" + scale + ")";
  }

  updateHero();
  setInterval(updateHero, 100);
})();

(async function startHeroAnimation() {
  function byId(id) {
    return document.getElementById(id);
  }

  const screen = byId("screen-overlay");
  const txtOverlay = byId("text-overlay");

  async function showCmd(txt) {
    byId("hero-command").innerText = txt;
    txtOverlay.style.opacity = 1;
    txtOverlay.style.transform = "translateY(0px)";

    await wait(0.4);
    byId("echo-bright").style.opacity = 1;
    await wait(1);
  }

  async function hideCmd() {
    txtOverlay.style.opacity = 0;
    txtOverlay.style.transform = "translateY(30px)";
    byId("echo-bright").style.opacity = 0;
    await wait(1);
  }

  async function setImage(url, yOffset) {
    screen.style.opacity = 1;
    screen.style.transition = "none";
    screen.style.backgroundImage = `url(res/${url})`;
    screen.style.backgroundPositionY = yOffset + "px";
    await wait(2);
    screen.style.transition = "";
  }

  async function scrollTo(yOffset) {
    screen.style.backgroundPositionY = yOffset + "px";
    await wait(1);
  }

  function wait(durationSeconds) {
    return new Promise((resolve) => {
      setTimeout(resolve, durationSeconds * 1000);
    });
  }


  await wait(2);
  while (true) {
    await showCmd("browse amazon");
    await setImage("page.jpg", 0);
    await hideCmd();

    await showCmd("scroll down");
    await scrollTo(-300);
    await hideCmd();

    await showCmd("click mario");
    await setImage("mario.jpg", 0);
    await hideCmd();

    await showCmd("scroll to top customer reviews");
    await scrollTo(-1782);
    await hideCmd();

    await showCmd("open bookmark pizza recipe");
    await setImage("pizza.jpg", 0);
    await hideCmd();

    await showCmd("scroll down");
    await scrollTo(-300);
    await hideCmd();

    await showCmd("go back");
    await setImage("mario.jpg", -1782);
    await hideCmd();    
  }
})();

(function registerInstallExtensionBtn() {
  document.getElementById("enable-browser-btn").addEventListener("click", (e) => {
    e.preventDefault();

    if (typeof chrome == "object") {
      chrome.webstore.install();
    } else {
      alert("This browser is not supported, try Chrome.");
    }
  });
})();
