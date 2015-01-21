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
 * 1) no 128 bit
 * 2) no RC4
 * 3) no ECDSA
 *
 */
var whitelist = [
  "security.ssl3.dhe_dss_aes_256_sha",
  "security.ssl3.dhe_rsa_aes_256_sha",
  "security.ssl3.dhe_rsa_camellia_256_sha",
  "security.ssl3.dhe_rsa_des_ede3_sha",
  "security.ssl3.ecdhe_rsa_aes_256_sha",
  "security.ssl3.ecdhe_rsa_des_ede3_sha",
  "security.ssl3.rsa_aes_256_sha",
  "security.ssl3.rsa_camellia_256_sha",
  "security.ssl3.rsa_des_ede3_sha"
];

/**
 * These preferences have been defaulted to "false" by Mozilla.
 * Do not modify them.
 *
 */
var ignorelist = [
  "security.ssl3.dhe_dss_camellia_128_sha",
  "security.ssl3.dhe_dss_camellia_256_sha",
  "security.ssl3.rsa_fips_des_ede3_sha",
  "security.ssl3.rsa_seed_sha"
];

/**
 * Toggle all current security.ssl3 preferences.
 *
 */
function toggleAllPreferences() {
  // Get security.ssl3 keys
  var keys = prefs.keys("security.ssl3.");

  // Flip current status
  strictModeDisabled = !strictModeDisabled;

  // Flip not whitelisted entries
  keys.forEach(flipSinglePreference);
}

/**
 * Toggle a single security.ssl3 preference.
 *
 * Preferences with a default value of "false" will not be modified.
 * In default mode, it will reset the preference to its default value.
 * In strict mode, it will flip whitelisted entries to true and everything else
 * to false.
 *
 * @param prefName {String|Object}
 *        the preference to flip
 */
function flipSinglePreference(prefName) {
  if(ignorelist.indexOf(prefName) === -1) {
    // Preference can be modified
    if(strictModeDisabled) {
      // Default mode
      prefs.reset(prefName);
    } else {
      // Strict mode
      prefs.set(prefName, !(whitelist.indexOf(prefName) === -1));
    }
  }
}

/**
 * Return a path to the current widget icon.
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
 * Display widget.
 *
 */
var widget = ui.ActionButton({
  id: "strict-ssl3-config",
  label: "Toggle strict security.ssl3 configuration",
  icon: getIcon(),
  onClick: function() {
    toggleAllPreferences();
    this.icon = getIcon();
  }
});
