/**
 * Requires
 *
 */
var ui = require("sdk/ui");
var utils = require("./utils");

/**
 * Save current preferences and start in strict mode
 *
 */
utils.toggleAllPreferences();

/**
 * Display button
 *
 */
var button = ui.ActionButton({
  id: "strict-ssl3-config",
  label: "Toggle strict security.ssl3 configuration",
  icon: utils.getIcon(),
  onClick: function() {
    utils.toggleAllPreferences();
    this.icon = utils.getIcon();
  }
});

/**
 * Registers for the onUnload event and reset preferences
 *
 */
function onUnload(reason) {
  //utils.resetAllPreferences()
};

/**
 * Export public functions
 *
 */
exports.onUnload = onUnload;
