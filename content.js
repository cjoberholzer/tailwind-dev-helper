// Create the indicator element
function createIndicator() {
  const indicator = document.createElement('div');
  indicator.id = 'tailwind-breakpoint-indicator';
  indicator.innerHTML = `
    <span class="twi-xs">XS (<640px)</span>
    <span class="twi-sm">SM (≥640px)</span>
    <span class="twi-md">MD (≥768px)</span>
    <span class="twi-lg">LG (≥1024px)</span>
    <span class="twi-xl">XL (≥1280px)</span>
    <span class="twi-2xl">2XL (≥1536px)</span>
  `;
  return indicator;
}

// Check if indicator should be visible
async function shouldShowIndicator() {
  const domain = window.location.hostname;
  const data = await chrome.storage.sync.get(['globalEnabled', 'enabledDomains']);

  const globalEnabled = data.globalEnabled || false;
  const enabledDomains = data.enabledDomains || [];

  return globalEnabled || enabledDomains.includes(domain);
}

// Update indicator visibility
async function updateIndicatorVisibility() {
  const shouldShow = await shouldShowIndicator();
  let indicator = document.getElementById('tailwind-breakpoint-indicator');

  if (shouldShow && !indicator) {
    indicator = createIndicator();
    document.body.appendChild(indicator);
  } else if (!shouldShow && indicator) {
    indicator.remove();
  }
}

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'updateVisibility') {
    updateIndicatorVisibility();
  }
});

// Initialize on page load
updateIndicatorVisibility();

// Re-check when navigating within SPA
let lastUrl = location.href;
new MutationObserver(() => {
  const url = location.href;
  if (url !== lastUrl) {
    lastUrl = url;
    updateIndicatorVisibility();
  }
}).observe(document, { subtree: true, childList: true });