document.addEventListener("DOMContentLoaded", async () => {
  const loadingEl = document.getElementById("loading");
  const noFeedsEl = document.getElementById("no-feeds");
  const feedsContainer = document.getElementById("feeds-container");
  const feedsList = document.getElementById("feeds-list");
  const feedCount = document.getElementById("feed-count");

  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    const results = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["content.js"],
    });
    loadingEl.classList.add("hidden");

    const feeds = results[0]?.result || [];

    if (feeds.length === 0) {
      noFeedsEl.classList.remove("hidden");
    } else {
      feedCount.textContent = feeds.length;
      feedsContainer.classList.remove("hidden");

      for (const feed of feeds) {
        const li = document.createElement("li");
        li.className = "feed-item";

        const infoDiv = document.createElement("div");
        infoDiv.className = "feed-info";

        const titleDiv = document.createElement("div");
        titleDiv.className = "feed-title";
        titleDiv.textContent = feed.title;

        const typeDiv = document.createElement("div");
        typeDiv.className = "feed-type";
        typeDiv.textContent = feed.type;

        const urlDiv = document.createElement("div");
        urlDiv.className = "feed-url";
        urlDiv.textContent = feed.url;
        urlDiv.title = feed.url;

        infoDiv.appendChild(titleDiv);
        infoDiv.appendChild(typeDiv);
        infoDiv.appendChild(urlDiv);

        const copyBtn = document.createElement("button");
        copyBtn.className = "copy-btn";
        copyBtn.textContent = "Copy";
        copyBtn.addEventListener("click", () => {
          copyToClipboard(feed.url, copyBtn);
        });

        li.appendChild(infoDiv);
        li.appendChild(copyBtn);
        feedsList.appendChild(li);
      }
    }
  } catch (error) {
    loadingEl.classList.add("hidden");
    noFeedsEl.textContent = `Error: ${error.message}`;
    noFeedsEl.classList.remove("hidden");
    console.error("Error finding feeds:", error);
  }
});

async function copyToClipboard(text, button) {
  try {
    await navigator.clipboard.writeText(text);
    const originalText = button.textContent;
    button.textContent = "Copied!";
    button.classList.add("copied");

    setTimeout(() => {
      button.textContent = originalText;
      button.classList.remove("copied");
    }, 2000);
  } catch (error) {
    console.error("Failed to copy:", error);
    button.textContent = "Failed";
    setTimeout(() => {
      button.textContent = "Copy";
    }, 2000);
  }
}
