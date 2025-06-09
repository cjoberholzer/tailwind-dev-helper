# Tailwind Dev Helper - Chrome Extension

A Chrome extension that displays the current Tailwind CSS breakpoint indicator on any website, making responsive development easier and more efficient.

![Tailwind Dev Helper](https://img.shields.io/badge/Tailwind%20CSS-Helper-38BDF8?style=flat-square&logo=tailwindcss)

## Features

- 📱 **Real-time Breakpoint Display**: Shows the active Tailwind CSS breakpoint (XS, SM, MD, LG, XL, 2XL) in the bottom-right corner of any webpage
- 🌐 **Flexible Domain Control**: Enable/disable the indicator globally or on specific domains
- 💾 **Persistent Settings**: Your preferences are saved and synced across devices
- 🎯 **Non-intrusive Design**: The indicator doesn't interfere with page interactions
- ⚡ **SPA Compatible**: Works seamlessly with single-page applications

## Installation

### From Source

1. Clone this repository or download the source code
   ```bash
   git clone https://github.com/cjoberholzer/tailwind-dev-helper.git
   ```

2. Open Chrome and navigate to `chrome://extensions/`

3. Enable "Developer mode" in the top right corner

4. Click "Load unpacked" and select the `tailwind-dev-helper` folder

5. The extension icon will appear in your extensions bar!

### Creating Icons

You'll need three icon files: `icon16.png`, `icon48.png`, and `icon128.png`. 

Quick method:
1. Create a 128x128px image with a blue background (#3B82F6) and white "TW" text
2. Save it as `icon128.png`
3. Resize copies to 48x48px and 16x16px for the other sizes

## Usage

### Enable/Disable on Current Site
1. Click the extension icon in your toolbar
2. Toggle "Enable on this site" to show/hide the indicator on the current domain

### Enable Globally
1. Click the extension icon
2. Toggle "Enable globally" to show the indicator on all websites

### Manage Specific Domains
1. Click the extension icon
2. Add domains using the input field (e.g., `localhost:3000`, `myapp.com`)
3. Remove domains by clicking the "Remove" button next to each domain

## Breakpoint Reference

The indicator shows the following Tailwind CSS breakpoints:

- **XS**: < 640px (default/mobile)
- **SM**: ≥ 640px
- **MD**: ≥ 768px
- **LG**: ≥ 1024px
- **XL**: ≥ 1280px
- **2XL**: ≥ 1536px

## File Structure

```
tailwind-dev-helper/
├── manifest.json      # Extension configuration
├── popup.html         # Popup interface HTML
├── popup.js           # Popup functionality
├── content.js         # Main script injected into pages
├── styles.css         # Indicator styles
├── icon16.png         # 16x16 icon
├── icon48.png         # 48x48 icon
└── icon128.png        # 128x128 icon
```

## Development

### Modifying the Extension

1. Make your changes to the source files
2. Go to `chrome://extensions/`
3. Click the refresh icon on the Tailwind Dev Helper card
4. Reload any tabs where you want to see the changes

### Key Files

- **content.js**: Controls when and how the indicator is injected
- **styles.css**: Defines the indicator appearance and breakpoint logic
- **popup.js**: Handles the extension popup logic and settings management

## Troubleshooting

**Indicator not showing?**
- Ensure the extension is enabled for the current domain
- Check that the page has fully loaded
- Try refreshing the page

**Settings not saving?**
- Make sure you have Chrome sync enabled
- Check the browser console for any errors

**Conflicts with page styles?**
- The extension uses `!important` flags to ensure visibility
- If issues persist, try disabling other extensions

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Built for developers using [Tailwind CSS](https://tailwindcss.com/)
- Inspired by the need for better responsive development tools

---

Made with ❤️ for the Tailwind CSS community
