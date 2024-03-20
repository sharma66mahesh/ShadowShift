(function addEventListeners() {
  console.log("LOADED>>>>>>>>>>>>>>>>>>>>>>>>>>");
  document.getElementById("switch").onclick = toggleTheme;
})();

var currentTheme = 0; // 0 -> light, 1 -> dark
var overlayId = "ovrly-398592834928817358";

function toggleTheme() {
  console.log("Toggling theme...");

  sendToggleMessage(currentTheme);

  if (currentTheme == 0) {
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
      z-index: 1;
  `;
    overlay.setAttribute("style", css);
    overlay.setAttribute("id", overlayId);

    document.body.appendChild(overlay);

    currentTheme = 1;
  } else {
    const overlay = document.getElementById(overlayId);
    overlay.parentNode.removeChild(overlay);

    currentTheme = 0;
  }
}

function sendToggleMessage(currentTheme) {
  console.log("TOGGLING...");
  chrome.tabs.query({ active: true, currentWindow: true }, async function (tabs) {
    await chrome.tabs.sendMessage(tabs[0].id, {
      prevTheme: currentTheme,
      toggle: true,
    });
  });
}
