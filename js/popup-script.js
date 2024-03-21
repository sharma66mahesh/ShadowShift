const THEMES = {
  light: "light",
  dark: "dark",
  system: "system",
};

function applyTheme(theme) {
  // send message to the active tab's content script to apply the selected theme
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { theme: theme });
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
    applyTheme(THEMES.light);
  });
document
  .getElementById("dark-theme-button")
  .addEventListener("click", function () {
    applyTheme(THEMES.dark);
  });
document
  .getElementById("system-theme-button")
  .addEventListener("click", function () {
    applyTheme(THEMES.system);
  });

document.addEventListener("DOMContentLoaded", function () {
  chrome.storage.sync.get("theme", function (data) {
    // set selected button style on load
    if (data.theme) {
      updateSelectedButtonStyle(data.theme);
    }
  });
});
