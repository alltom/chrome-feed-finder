// This script is a single expression whose value will be returned to the calling popup.
(() =>
  Array.from(document.querySelectorAll('link[rel="alternate"]')).flatMap((link) => {
    const href = link.getAttribute("href") || undefined;
    const type = link.getAttribute("type") || undefined;
    const title = link.getAttribute("title") || undefined;

    if (href) {
      const absoluteUrl = new URL(href, window.location.href).href;
      return [{ url: absoluteUrl, type: type, title: title }];
    } else {
      return [];
    }
  }))();
