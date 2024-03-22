const SITE_KEY = getUniqueIdForCurrentSite();

// load and apply saved theme for the current site
chrome.storage.sync.get(SITE_KEY, function (data) {
  const siteTheme = data[SITE_KEY];

  if (siteTheme) {
    applyTheme(siteTheme);
  }
});

// listen for events from the extension popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.theme) {
    applyTheme(request.theme);
  }

  if (request.action === "getTheme") {
    chrome.storage.sync.get(SITE_KEY, function (data) {
      sendResponse({ theme: data[SITE_KEY] });
    });

    // indicates to chrome that the response will be asynchronous since chrome.storage.sync.get is async
    return true;
  }
});

function applyTheme(theme) {
  const existingOverlay = document.getElementById(OVERLAY_ID);

  if (theme === THEMES.dark) {
    // apply dark theme
    if (!existingOverlay) {
      document.body.appendChild(createOverlay());
    }
  } else {
    // for light or system theme, remove the overlay if it exists
    if (existingOverlay) {
      existingOverlay.parentNode.removeChild(existingOverlay);
    }
  }

  // save the theme preference in chrome.storage
  chrome.storage.sync.set({ [SITE_KEY]: theme }, function () {
    console.log("Theme is set to " + theme);
  });
}

function createOverlay() {
  const overlay = document.createElement("div");
  const css = `
        position: fixed;
        pointer-events: none;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: white;
        mix-blend-mode: difference;
        z-index: 9999;
    `;

  overlay.setAttribute("style", css);
  overlay.setAttribute("id", OVERLAY_ID);

  return overlay;
}

// note: please do not make this function non-deterministic (eg: using random numbers, timestamps etc)
// this should return the same id each time for the current hostname
function getUniqueIdForCurrentSite() {
  return `shadow-shift-theme-${window.location.hostname}`;
}
