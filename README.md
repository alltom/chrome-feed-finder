# Feed Finder

A Chrome extension that finds RSS and Atom feeds on any webpage by searching for `<link rel="alternate">` tags in the DOM.

## Features

- Automatically scans the current page for feed links
- Displays all found feeds with their titles and types
- One-click copy to clipboard for each feed URL
- Clean, modern UI
- Shows feed type (RSS, Atom, etc.)

## Usage

1. Navigate to any webpage
2. Click the Feed Finder extension icon in your toolbar
3. The extension will display all RSS/Atom feeds found on the page
4. Click the "Copy" button next to any feed to copy its URL to your clipboard

## Notes

- Supports all feed types that use `<link rel="alternate">` tags

## Files

- `manifest.json` - Chrome extension configuration
- `popup.html` - Extension popup UI
- `popup.js` - UI logic and clipboard handling
- `popup.css` - Styling for the popup
- `content.js` - Script that searches the DOM for feed links
