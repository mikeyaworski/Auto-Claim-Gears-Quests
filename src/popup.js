getPreferences([{
  key: 'autoClickEverything',
  cb: val => {
    document.getElementById('auto-click-everything').checked = val;
  },
}, {
  key: 'autoRefresh',
  cb: val => {
    document.getElementById('auto-refresh').checked = val;
  },
}]);

document.getElementById('auto-click-everything').addEventListener('change', function() {
  setPreference('autoClickEverything', this.checked);
});

document.getElementById('auto-refresh').addEventListener('change', function() {
  setPreference('autoRefresh', this.checked);
});
