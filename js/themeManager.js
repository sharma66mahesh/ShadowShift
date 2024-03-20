const THEME_STATUS_KEY = "darkThemeState";

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
var overlayId = "ovrly-398592834928817358";
overlay.setAttribute("id", overlayId);

// Toggle between dark and light theme
async function toggleTheme(shouldUpdate) {
  // 0 -> light, 1 -> dark
  let activeTheme = localStorage.getItem(THEME_STATUS_KEY);

  if (activeTheme === "0" || !activeTheme) {
    document.body.appendChild(overlay);

    activeTheme = "1";
  } else {
    const overlay = document.getElementById(overlayId);
    overlay.parentNode.removeChild(overlay);

    activeTheme = "0";
  }

  if (shouldUpdate) {
    localStorage.setItem(THEME_STATUS_KEY, activeTheme);
  }
}
