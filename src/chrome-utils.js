/**
 * Adds a listener to changed preferences. `prefs`
 * will be updated or the associated callback function (`cb`)
 * will be called whenever a change occurs to preferences.
 * The preferences change when a user interacts with the extension's popup.
 *
 * @param {Array<string | Object>} prefKeys Array of preference "keys" which are hooked.
 *   If the element is a string, it is a preference key.
 *   If the element is an object, it has a `key` field (string) and a `cb` field (function).
 *   `cb` will be called with the new preference and `prefs` will not be set
 *   for this element (that is up to the caller).
 * @param {Object} prefs Object of preferences
 */
function hookPreferences(prefKeys, prefs) {
  chrome.storage.onChanged.addListener(res => {
    prefKeys.forEach(prefKey => {
      // it's either a string or an object of the form { key, cb }
      if (typeof prefKey === 'string') {
        // eslint-disable-next-line no-param-reassign
        if (res[prefKey] !== undefined) prefs[prefKey] = res[prefKey].newValue;
      } else {
        const { key, cb } = prefKey;
        if (res[key] !== undefined) cb(res[key].newValue);
      }
    });
  });
}

/**
 * Similar to hookPreferences, except the preferences are retrieved
 * immediately and only once.
 */
function getPreferences(prefKeys, prefs) {
  chrome.storage.local.get(prefKeys.map(key => (typeof key === 'string' ? key : key.key)), res => {
    prefKeys.forEach(prefKey => {
      // it's either a string or an object of the form { key, cb }
      if (typeof prefKey === 'string') {
        // eslint-disable-next-line no-param-reassign
        if (res[prefKey] !== undefined) prefs[prefKey] = res[prefKey];
      } else {
        const { key, cb } = prefKey;
        cb(res[key]);
      }
    });
  });
}

/**
 * Sets a local preference.
 */
function setPreference(key, val) {
  chrome.storage.local.set({ [key]: val });
}
