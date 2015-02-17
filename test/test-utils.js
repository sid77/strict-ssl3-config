var prefs = require("sdk/preferences/service");
var self = require("sdk/self");
var utils = require("./utils");

/**
 * Test that whitelisted preferences are set true and everything else is set
 * false. Then test preferences reset.
 *
 */
exports["test utils"] = function(assert) {
  // Get security.ssl3 keys
  var keys = prefs.keys("security.ssl3.");

  // Whitelisted preferences
  var whitelist = [
    "security.ssl.require_safe_negotiation",
    "security.ssl.treat_unsafe_negotiation_as_broken",
    "security.ssl3.rsa_aes_256_sha",
    "security.ssl3.ecdhe_rsa_aes_256_sha",
    "security.ssl3.rsa_des_ede3_sha",
    "security.ssl3.dhe_rsa_aes_256_sha",
    "security.ssl3.ecdhe_rsa_aes_128_gcm_sha256",
  ];

  // Test strict mode
  assert.equal(prefs.get("security.ssl.require_safe_negotiation"), true);
  assert.equal(prefs.get("security.ssl.treat_unsafe_negotiation_as_broken"), true);
  keys.forEach(function(key) {
    assert.equal(prefs.get(key), !(whitelist.indexOf(key) === -1));
  });

  // Reset preferences
  utils.toggleAllPreferences();

  // Test Firefox defaults value
  assert.equal(prefs.get("security.ssl.require_safe_negotiation"), false);
  assert.equal(prefs.get("security.ssl.treat_unsafe_negotiation_as_broken"), false);
  keys.forEach(function(key) {
    assert.equal(prefs.get(key), true);
  });
};

require("sdk/test").run(exports);
