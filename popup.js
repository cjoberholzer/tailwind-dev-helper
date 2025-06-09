// Get current tab's domain
async function getCurrentDomain() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const url = new URL(tab.url);
  return url.hostname;
}

// Load settings
async function loadSettings() {
  const domain = await getCurrentDomain();
  const data = await chrome.storage.sync.get(['globalEnabled', 'enabledDomains']);

  const globalEnabled = data.globalEnabled || false;
  const enabledDomains = data.enabledDomains || [];

  document.getElementById('globalToggle').checked = globalEnabled;
  document.getElementById('currentSiteToggle').checked = enabledDomains.includes(domain);

  updateDomainList(enabledDomains);
}

// Update domain list display
function updateDomainList(domains) {
  const listEl = document.getElementById('domainList');
  listEl.innerHTML = '';

  domains.forEach(domain => {
    const item = document.createElement('div');
    item.className = 'domain-item';
    item.innerHTML = `
      <span>${domain}</span>
      <button class="remove-btn" data-domain="${domain}">Remove</button>
    `;
    listEl.appendChild(item);
  });
}

// Save settings and notify content script
async function saveSettings() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.tabs.sendMessage(tab.id, { action: 'updateVisibility' });
}

// Toggle current site
document.getElementById('currentSiteToggle').addEventListener('change', async (e) => {
  const domain = await getCurrentDomain();
  const data = await chrome.storage.sync.get(['enabledDomains']);
  let enabledDomains = data.enabledDomains || [];

  if (e.target.checked) {
    if (!enabledDomains.includes(domain)) {
      enabledDomains.push(domain);
    }
  } else {
    enabledDomains = enabledDomains.filter(d => d !== domain);
  }

  await chrome.storage.sync.set({ enabledDomains });
  updateDomainList(enabledDomains);
  saveSettings();
});

// Toggle global
document.getElementById('globalToggle').addEventListener('change', async (e) => {
  await chrome.storage.sync.set({ globalEnabled: e.target.checked });
  saveSettings();
});

// Add domain
document.getElementById('addDomain').addEventListener('click', async () => {
  const input = document.getElementById('domainInput');
  const domain = input.value.trim().toLowerCase();

  if (domain) {
    const data = await chrome.storage.sync.get(['enabledDomains']);
    const enabledDomains = data.enabledDomains || [];

    if (!enabledDomains.includes(domain)) {
      enabledDomains.push(domain);
      await chrome.storage.sync.set({ enabledDomains });
      updateDomainList(enabledDomains);
      input.value = '';

      // Update current site toggle if needed
      const currentDomain = await getCurrentDomain();
      if (domain === currentDomain) {
        document.getElementById('currentSiteToggle').checked = true;
      }

      saveSettings();
    }
  }
});

// Remove domain
document.addEventListener('click', async (e) => {
  if (e.target.classList.contains('remove-btn')) {
    const domain = e.target.dataset.domain;
    const data = await chrome.storage.sync.get(['enabledDomains']);
    const enabledDomains = data.enabledDomains || [];

    const filtered = enabledDomains.filter(d => d !== domain);
    await chrome.storage.sync.set({ enabledDomains: filtered });
    updateDomainList(filtered);

    // Update current site toggle if needed
    const currentDomain = await getCurrentDomain();
    if (domain === currentDomain) {
      document.getElementById('currentSiteToggle').checked = false;
    }

    saveSettings();
  }
});

// Enter key on input
document.getElementById('domainInput').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    document.getElementById('addDomain').click();
  }
});

// Initialize
loadSettings();