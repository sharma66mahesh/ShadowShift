(function addEventListeners() {
  console.log("LOADED>>>>>>>>>>>>>>>>>>>>>>>>>>");
  document.getElementById("switch").onclick = () => {
    toggleTheme(true);
    sendToggleMessage();
  }
})();

function sendToggleMessage() {
  console.log("TOGGLING...");
  chrome.tabs.query({ active: true, currentWindow: true }, async function (tabs) {
    await chrome.tabs.sendMessage(tabs[0].id, {
      toggle: true,
    });
  });
}
