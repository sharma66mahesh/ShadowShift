function loadAndApplyPopupTheme() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length === 0) return;

    chrome.tabs.sendMessage(
      tabs[0].id,
      { action: ACTIONS_POPUP.GET_THEME },
      (response) => {
        if (response && response.theme) {
          updateSelectedButtonStyle(response.theme);
        }
      }
    );
  });
}

// send message to content script to apply theme to the webpage and,
// update the theme/style of the selected popup button
function applyPopupTheme(theme) {
  // send message to the active tab's content script to apply the selected theme
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, {
      action: ACTIONS_POPUP.APPLY_THEME,
      theme: theme,
    });
  });

  // save the theme preference in chrome.storage
  chrome.storage.sync.set({ theme: theme }, function () {
    console.log("Theme is set to " + theme);
  });

  updateSelectedButtonStyle(theme);
}

function updateSelectedButtonStyle(selectedTheme) {
  const themes = Object.values(THEMES);

  for (const theme of themes) {
    const selectedButton = document.getElementById(`${theme}-theme-button`);

    if (theme === selectedTheme) {
      selectedButton.classList.add("selected-button");
    } else {
      selectedButton.classList.remove("selected-button");
    }
  }
}

document
  .getElementById("light-theme-button")
  .addEventListener("click", function () {
    applyPopupTheme(THEMES.light);
  });
document
  .getElementById("dark-theme-button")
  .addEventListener("click", function () {
    applyPopupTheme(THEMES.dark);
  });
document
  .getElementById("system-theme-button")
  .addEventListener("click", function () {
    applyPopupTheme(THEMES.system);
  });

document.addEventListener("DOMContentLoaded", loadAndApplyPopupTheme);
