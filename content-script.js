// listen for events from the extension popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.theme) {
    applyTheme(request.theme);
  }
});

function applyTheme(theme) {
  if (theme === "light") {
    document.body.style.backgroundColor = "white";
    document.body.style.color = "black";
  } else if (theme === "dark") {
    document.body.style.backgroundColor = "black";
    document.body.style.color = "white";
  } else {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      document.body.style.backgroundColor = "black";
      document.body.style.color = "white";
    } else {
      document.body.style.backgroundColor = "white";
      document.body.style.color = "black";
    }
  }
}
