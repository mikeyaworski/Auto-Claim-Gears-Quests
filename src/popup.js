chrome.storage.sync.get(['autoClickQuests'], ({ autoClickQuests }) => {
  document.getElementById('auto-click-quests').checked = autoClickQuests;
});

document.getElementById('auto-click-quests').addEventListener('change', function() {
  chrome.storage.sync.set({ autoClickQuests: this.checked });
});
