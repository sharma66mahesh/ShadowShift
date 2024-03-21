// load and apply saved theme for the webpage
chrome.storage.sync.get("theme", function (data) {
  if (data.theme) {
    applyTheme(data.theme);
  }
});

// listen for events from the extension popup
chrome.runtime.onMessage.addListener((request) => {
  if (request.theme) {
    applyTheme(request.theme);
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
