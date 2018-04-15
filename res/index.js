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

  const txtOverlay = byId("text-overlay");
  const container = byId("screen-overlay-container");

  async function showCmd(txt2, txt1, noBright) {
    byId("hero-command-1").innerText = txt1 || "Alexa, ask web browser to";
    byId("hero-command-2").innerText = txt2 + ".";
    txtOverlay.style.opacity = 1;
    txtOverlay.style.transform = "translateY(0px)";

    await wait(0.4);
    if (!noBright) {
      byId("echo-bright").style.opacity = 1;
    }
    await wait(1);
  }

  async function hideCmd() {
    txtOverlay.style.opacity = 0;
    txtOverlay.style.transform = "translateY(30px)";
    byId("echo-bright").style.opacity = 0;
    await wait(1);
  }

  async function scrollTo(yOffset) {
    previousImage.style.backgroundPositionY = yOffset + "px";
    await wait(1);
  }

  function wait(durationSeconds) {
    return new Promise((resolve) => {
      setTimeout(resolve, durationSeconds * 1000);
    });
  }

  function createImage(url) {
    const img = document.createElement("div");
    img.className = "screen-overlay";
    img.style.display = "none";
    img.style.backgroundImage = `url(res/screens/${url})`;
    container.appendChild(img);
    return img;
  }

  const images = {
    page: createImage("page.jpg"),
    mario: createImage("mario.jpg"),
    pizza: createImage("pizza.jpg"),
    minecraft: createImage("minecraft.jpg"),
    spotifyLaunch: createImage("spotify-launch.jpg"),
    spotifyNext: createImage("spotify-next.jpg"),
    docLaunch: createImage("doc-launch.jpg"),
    docWriteHW: createImage("doc-write-hello-world.jpg"),
    docWriteH: createImage("doc-write-hello.jpg"),
    docWriteHEEE: createImage("doc-append-exclamation.jpg")
  };

  let previousImage = null;
  async function showImage(now, future, animateIn) {
    if (now) {
      now.style.display = "";
      now.style.zIndex = 10;
      
      if (animateIn) {
        now.style.animationName = "screen-animate-in";
      }
    }
 
    await wait(2);

    now.style.transition = "";

    if (now) {
      now.style.animationName = "";
    }

    if (previousImage) {
      previousImage.style.zIndex = 0;
      previousImage.style.display = "none";
      previousImage.style.backgroundPositionY = "0px";
    }

    previousImage = now;

    if (future) {
      future.style.zIndex = 0;
      future.style.display = "";
    }
  }

  await showCmd("demonstration of Vicki", "Check out this", true);
  await wait(1);
  await hideCmd();

  while (true) {
    await showCmd("browse amazon");
    await showImage(images.page, images.mario, true);
    await hideCmd();

    await showCmd("scroll down");
    await scrollTo(-300);
    await hideCmd();

    await showCmd("click mario");
    await showImage(images.mario, images.pizza);
    await hideCmd();

    await showCmd("open bookmark pizza");
    await showImage(images.pizza, images.minecraft);
    await hideCmd();

    await showCmd("launch Minecraft");
    await showImage(images.minecraft, images.spotifyLaunch, true);
    await hideCmd();

    await showCmd("launch Spotify");
    await showImage(images.spotifyLaunch, images.spotifyNext, true);
    await hideCmd();

    await showCmd("play next song");
    await showImage(images.spotifyNext, images.docLaunch);
    await hideCmd();

    await showCmd("launch Word");
    await showImage(images.docLaunch, images.docWriteHW, true);
    await hideCmd();

    await showCmd("write hello world");
    await showImage(images.docWriteHW, images.docWriteH);
    await hideCmd();

    await showCmd("erase word");
    await showImage(images.docWriteH, images.docWriteHEEE);
    await hideCmd();

    await showCmd("press exclamation");
    await showImage(images.docWriteHEEE, images.page);
    await hideCmd();
  }
})();

function getOS() {
  var userAgent = window.navigator.userAgent,
      platform = window.navigator.platform,
      macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
      windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
      iosPlatforms = ['iPhone', 'iPad', 'iPod'],
      os = null;

  if (macosPlatforms.indexOf(platform) !== -1) {
    os = 'osx';
  } else if (iosPlatforms.indexOf(platform) !== -1) {
    os = 'ios';
  } else if (windowsPlatforms.indexOf(platform) !== -1) {
    os = 'win';
  } else if (/Android/.test(userAgent)) {
    os = 'android';
  } else if (!os && /Linux/.test(platform)) {
    os = 'linux';
  }

  return os;
}

function configureInstallBrowserExtension() {
  document.getElementById("enable-browser-btn").addEventListener("click", (e) => {
    e.preventDefault();

    if (typeof chrome == "object") {
      chrome.webstore.install();
    } else {
      alert("This browser is not supported, try Chrome.");
    }
  });
}

function configureInstallNativeAddon() {
  const downloadUrlPerOs = {
    win: "https://s3.amazonaws.com/heyvicki-public/vicki-native-addon.exe",
    osx: "https://s3.amazonaws.com/heyvicki-public/Vicki+Native+Addon.pkg"
  };
  const downloadUrl = downloadUrlPerOs[getOS()];

  const downloadBtn = document.getElementById("enable-computer-btn");

  if (!downloadUrl) {
    downloadBtn.addEventListener("click", () => {
      alert("Native addon is not supported on your OS. Try Windows or Mac");
    });
  } else {
    downloadBtn.setAttribute("href", downloadUrl);
  }
}

(function registerInstallExtensionBtn() {
  configureInstallBrowserExtension();
  configureInstallNativeAddon();
})();
