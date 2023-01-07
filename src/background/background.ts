let active = false;

function setTitle(active: boolean): void {
  if (active) {
    let title: string =
      prompt("What would you like to name this window?", "Window 1") || "";
    window.document.title = title;
  } else {
    location.reload();
  }
}

chrome.action.onClicked.addListener((tab) => {
  if (!tab.url?.startsWith("chrome://")) {
    console.log("hello?");
    console.log(active);
    active = !active;
    if (active) {
      chrome.action.setIcon({ path: "../icon-enabled.png", tabId: tab.id });
      chrome.action.setTitle({ title: "Disable Custom Title", tabId: tab.id });
    } else {
      chrome.action.setIcon({ path: "../icon.png", tabId: tab.id });
      chrome.action.setTitle({ title: "Enable Custom Title", tabId: tab.id });
    }
    chrome.scripting
      .executeScript({
        target: { tabId: tab.id ? tab.id : -1 },
        func: setTitle,
        args: [active],
      })
      .then();
  }
});
