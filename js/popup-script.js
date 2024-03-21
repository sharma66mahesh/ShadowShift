function applyTheme(theme) {
  // send message to the active tab's content script to apply the selected theme
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { theme: theme });
  });

  // save the theme preference in chrome.storage
  chrome.storage.sync.set({ theme: theme }, function () {
    console.log("Theme is set to " + theme);
  });
}

document
  .getElementById("light-theme-button")
  .addEventListener("click", function () {
    applyTheme("light");
  });
document
  .getElementById("dark-theme-button")
  .addEventListener("click", function () {
    applyTheme("dark");
  });
document
  .getElementById("system-theme-button")
  .addEventListener("click", function () {
    applyTheme("system");
  });
