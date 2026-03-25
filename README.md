Here's a polished `README.md` you can drop directly into your GitHub repository:

***

```markdown
# 🔗 Custom Redirects — Chrome Extension

A lightweight Chrome extension that lets you define **short trigger phrases** to instantly navigate to your favourite URLs — no more typing long web addresses.

![Custom Redirects UI](screenshot.png)

---

## ✨ Features

- **Custom Trigger Phrases** — Map any keyword or number (e.g. `1`, `mail`, `school`) to any URL
- **Instant Navigation** — Type your trigger phrase in the Chrome address bar and hit Enter to redirect
- **Export & Import** — Save your redirects as a `.json` file and restore them anytime
- **Theme Toggle** — Switch between light and dark mode
- **Simple UI** — Clean, minimal popup interface for managing all your redirects

---

## 🚀 Getting Started

### Installation (Local / Developer Mode)

1. Clone or download this repository:
   ```bash
   git clone https://github.com/daniel-rabin/custom-redirects.git
   ```
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable **Developer Mode** (top-right toggle)
4. Click **Load unpacked** and select the project folder
5. The extension icon will appear in your Chrome toolbar

---

## 🛠️ How to Use

### Adding a Redirect

1. Click the extension icon in your Chrome toolbar
2. Enter a **Trigger Phrase** (e.g. `1`, `mail`, `gh`)
3. Enter the **Target URL** (e.g. `https://gmail.google.com`)
4. Click **Add Redirect**

### Using a Redirect

Type your trigger phrase directly into the **Chrome address bar** (omnibox) and press **Enter** — Chrome will redirect you to the mapped URL instantly.

### Managing Redirects

- Click the **✕** button next to any entry to delete it
- All redirects are saved locally using Chrome's storage API

### Export & Import

- Click **Export** to download all your redirects as a `redirects.json` file
- Click **Import** to load redirects from a previously exported `.json` file — useful for backup or sharing across devices

---

## 📁 Project Structure

```
custom-redirects/
├── manifest.json        # Chrome extension manifest (v3)
├── popup.html           # Extension popup UI
├── popup.js             # Popup logic (add, delete, export, import)
├── background.js        # Handles omnibox redirect logic
├── styles.css           # UI styling + theme support
└── icons/               # Extension icons
```

---

## 🧰 Tech Stack

| Layer | Technology |
|---|---|
| Extension Platform | Chrome Extensions (Manifest V3) |
| Frontend | HTML, CSS, Vanilla JavaScript |
| Storage | Chrome Storage API (`chrome.storage.local`) |
| Navigation | Chrome Omnibox API |

---

## 📦 Export Format

Redirects are exported as a simple JSON array:

```json
[
  { "trigger": "1", "target": "https://www.youtube.com" },
  { "trigger": "mail", "target": "https://gmail.google.com" },
  { "trigger": "gh", "target": "https://github.com" }
]
```

---

## 🔒 Permissions Used

| Permission | Reason |
|---|---|
| `storage` | Save and retrieve redirect mappings locally |
| `omnibox` | Listen for trigger phrases typed in the address bar |
| `tabs` | Navigate the active tab to the target URL |

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you'd like to change.

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a pull request

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

> Built by [Daniel Rabin](https://github.com/daniel-rabin)
```

***

## Notes on Customizing

A few things you should update before publishing :

- **`screenshot.png`** — Replace with an actual screenshot of your extension popup (like the one you shared)
- **Project Structure** — Update the file names if yours differ (e.g. `content.js` vs `background.js`)
- **Omnibox keyword** — In `manifest.json`, you likely set a specific omnibox keyword (like a prefix). Mention it in the "Using a Redirect" section so users know to type e.g. `> 1` instead of just `1`
- **Repo URL** — Swap the clone URL with your actual repo link once created on [your GitHub profile](https://github.com/daniel-rabin)
