var prefs = require("sdk/preferences/service");
var main = require("./main");

/**
 * Test that whitelisted preferences are set true upon starting Firefox.
 *
 */
exports["test main"] = function(assert) {
  var whitelist = [
    "security.ssl.require_safe_negotiation",
    "security.ssl.treat_unsafe_negotiation_as_broken",
    "security.ssl3.rsa_aes_256_sha",
    "security.ssl3.ecdhe_rsa_aes_256_sha",
    "security.ssl3.rsa_des_ede3_sha",
    "security.ssl3.dhe_rsa_aes_256_sha",
    "security.ssl3.ecdhe_rsa_aes_128_gcm_sha256",
  ];
  whitelist.forEach(function(preference) {
    assert.equal(prefs.get(preference), true);
  });
};

require("sdk/test").run(exports);
