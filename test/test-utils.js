var prefs = require("sdk/preferences/service");
var self = require("sdk/self");
var utils = require("./utils");

/**
 * Test that whitelisted preferences are set true and everything else is set
 * false. Then test preferences reset.
 *
 */
exports["test utils"] = function(assert) {
  // test preferences
  var whitelist = [
    "security.ssl.require_safe_negotiation",
    "security.ssl.treat_unsafe_negotiation_as_broken",
    "security.ssl3.rsa_aes_256_sha",
    "security.ssl3.ecdhe_rsa_aes_256_sha",
    "security.ssl3.rsa_des_ede3_sha",
    "security.ssl3.ecdhe_rsa_aes_128_gcm_sha256",
  ];

  preferencesSSL3 = prefs.keys("security.ssl3.");
  preferencesSSL = prefs.keys("security.ssl.require_safe_negotiation");
  preferencesSSL = preferencesSSL.concat(
      prefs.keys("security.ssl.treat_unsafe_negotiation_as_broken")
  );
  preferences = preferencesSSL.concat(preferencesSSL3);

  // test strict mode
  utils.initPreferences();
  preferences.forEach(function(preference) {
    assert.equal(
      prefs.get(preference),
      !(whitelist.indexOf(preference) === -1),
      preference
    );
  });

  // test toggle into default mode
  utils.toggleAllPreferences();
  preferencesSSL.forEach(function(preference) {
    assert.equal(
      prefs.get(preference),
      false,
      preference
    );
  });
  preferencesSSL3.forEach(function(preference) {
    assert.equal(
      prefs.get(preference),
      true,
      preference
    );
  });
};

require("sdk/test").run(exports);
