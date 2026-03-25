
chrome.webNavigation.onCommitted.addListener((details) => {
  const url = new URL(details.url);
  const query = url.searchParams.get("q");
  const hostname = url.hostname;

  chrome.storage.local.get("redirects", (data) => {
    const redirects = data.redirects || {};
    let target = null;

    if (query && redirects[query]) {
      target = redirects[query];
    } else if (redirects[hostname]) {
      target = redirects[hostname];
    }

    if (target) {
      const redirectUrl = /^https?:\/\//.test(target)
        ? target
        : /^[\w-]+(\.[\w-]+)+$/.test(target)
          ? "https://" + target
          : "https://www.google.com/search?q=" + encodeURIComponent(target);

      chrome.tabs.update(details.tabId, { url: redirectUrl });
    }
  });
}, {
  url: [{ schemes: ["http", "https"] }]
});
