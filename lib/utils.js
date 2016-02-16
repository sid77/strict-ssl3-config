/**
 * Requires
 *
 */
var prefs = require("sdk/preferences/service");
var self = require("sdk/self");

/**
 * Current status
 *
 */
var strictModeDisabled = true;

/**
 * Modified preferences
 *
 */
var preferences = [];

/**
 * User set preferences
 *
 */
var userPreferences = {};

/**
 * Whitelisted preferences, as a POC I'm using:
 * 1) no 128 bit (except for ECDHE)
 * 2) no RC4
 * 3) no ECDSA
 *
 * Plus, I'm enabling secure renegotiation as well.
 *
 * This list has been updated for FF 38.0a1
 *
 */
var whitelist = [
  "security.ssl.require_safe_negotiation",
  "security.ssl.treat_unsafe_negotiation_as_broken",
  "security.ssl3.rsa_aes_256_sha",
  "security.ssl3.ecdhe_rsa_aes_256_sha",
  "security.ssl3.rsa_des_ede3_sha",
  "security.ssl3.ecdhe_rsa_aes_128_gcm_sha256",
];

/**
 * Retrieve full list of modifiable preferences
 *
 */
function storeAllPreferences() {
  // Get security.ssl3 keys
  preferences = prefs.keys("security.ssl3.");
  // Also concatenate secure renegotiation preferences
  preferences = preferences.concat(prefs.keys("security.ssl.require_safe_negotiation"));
  preferences = preferences.concat(prefs.keys("security.ssl.treat_unsafe_negotiation_as_broken"));
}

/**
 * Store current preference status
 *
 * @param name {String|Object}
 *        the preference to store
 */
function storeSingleUserPreference(name) {
  userPreferences[name] = prefs.get(name);
}

/**
 * Store current preferences status
 *
 */
function storeAllUserPreferences() {
  preferences.forEach(storeSingleUserPreference);
}

/**
 * Toggle a single preference.
 *
 * In default mode, it will reset the preference to its default (or previously
 * user set) value.
 * In strict mode, it will flip whitelisted entries to true and everything else
 * to false.
 *
 * @param name {String|Object}
 *        the preference to flip
 *
 */
function toggleSinglePreference(name) {
  if(strictModeDisabled) {
    // Default mode
    prefs.set(name, userPreferences[name]);
  } else {
    // Strict mode
    prefs.set(name, !(whitelist.indexOf(name) === -1));
  }
}

/**
 * Toggle all preferences
 *
 */
function toggleAllPreferences() {
  // Flip current status
  strictModeDisabled = !strictModeDisabled;

  // Flip not whitelisted entries
  preferences.forEach(toggleSinglePreference);
}

/**
 * Initialise data structure and toggle into strict mode
 *
 */
function initPreferences() {
  // Retrieve list of interesting preferences
  storeAllPreferences();
  // Store default status
  storeAllUserPreferences();
  // Flip into strict mode
  toggleAllPreferences();
}

/**
 * Reset all preferences.
 *
 */
function resetAllPreferences() {
  strictModeDisabled = true;
  preferences.forEach(toggleSinglePreference);
}

/**
 * Return a path to the current button icon.
 *
 */
function getIcon() {
  if(strictModeDisabled) {
    return self.data.url("lock-unlocked-8x.png");
  } else {
    return self.data.url("lock-locked-8x.png");
  }
}

/**
 * Export public functions
 *
 */
exports.initPreferences = initPreferences;
exports.toggleAllPreferences = toggleAllPreferences;
exports.resetAllPreferences = resetAllPreferences;
exports.getIcon = getIcon;
