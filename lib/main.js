/**
 * Requires
 *
 */
var prefs = require("sdk/preferences/service");
var ui = require("sdk/ui");
var self = require("sdk/self");

/**
 * Current status
 *
 */
var strictModeDisabled = true;

/**
 * Whitelisted preferences, as a POC I'm using:
 * 1) no 128 bit (except for ECDHE)
 * 2) no RC4
 * 3) no ECDSA
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
  "security.ssl3.dhe_rsa_aes_256_sha",
  "security.ssl3.ecdhe_rsa_aes_128_gcm_sha256",
];

/**
 * Toggle all current security.ssl3 preferences.
 *
 */
function toggleAllPreferences() {
  // Get security.ssl3 keys
  var keys = prefs.keys("security.ssl3.");
  // Also concatenate secure renegotiation preferences
  keys = keys.concat(prefs.keys("security.ssl.require_safe_negotiation"));
  keys = keys.concat(prefs.keys("security.ssl.treat_unsafe_negotiation_as_broken"));

  // Flip current status
  strictModeDisabled = !strictModeDisabled;

  // Flip not whitelisted entries
  keys.forEach(flipSinglePreference);
}

/**
 * Toggle a single preference.
 *
 * In default mode, it will reset the preference to its default value.
 * In strict mode, it will flip whitelisted entries to true and everything else
 * to false.
 *
 * @param prefName {String|Object}
 *        the preference to flip
 */
function flipSinglePreference(prefName) {
  // Preference can be modified
  if(strictModeDisabled) {
    // Default mode
    prefs.reset(prefName);
  } else {
    // Strict mode
    prefs.set(prefName, !(whitelist.indexOf(prefName) === -1));
  }
}

/**
 * Return a path to the current button icon.
 *
 */
function getIcon() {
  if(strictModeDisabled) {
    return self.data.url("default-16.png");
  } else {
    return self.data.url("strict-16.png");
  }
}

/**
 * Start in strict mode.
 *
 */
toggleAllPreferences();

/**
 * Display button.
 *
 */
var button = ui.ActionButton({
  id: "strict-ssl3-config",
  label: "Toggle strict security.ssl3 configuration",
  icon: getIcon(),
  onClick: function() {
    toggleAllPreferences();
    this.icon = getIcon();
  }
});
