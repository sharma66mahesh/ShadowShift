// Listen for user actions
chrome.runtime.onMessage.addListener(async (msg, sender, sendResponse) => {
  if (msg.toggle) {
    toggleTheme(true);
  }
});
