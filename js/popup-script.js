(function onPageReady() {
  syncTheme();
  updateCheckbox();

  // Setup event listener on toggle click
  document.getElementById("switch").onclick = () => {
    toggleTheme(true);
    sendToggleMessage();
  }
})();

function sendToggleMessage() {
  console.log("TOGGLING...");

  // Trigger tab UI to toggle it's UI too
  chrome.tabs.query({ active: true, currentWindow: true }, async function (tabs) {
    await chrome.tabs.sendMessage(tabs[0].id, {
      toggle: true,
    });
  });
}

function updateCheckbox() {
  const checkbox = document.getElementById(checkboxId);
  const checkStatus = localStorage.getItem(THEME_STATUS_KEY);
  checkbox.checked = checkStatus == "1" ? true : false;
}