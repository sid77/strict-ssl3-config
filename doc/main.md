strict-ssl3-config
==================

This add-on toggles security.ssl3 and safe negotiation references between
default and strict mode.

In default mode, all preferences are reset to their default value.
In strict mode, whitelisted preferences are flipped to "true" while everything
else goes to "false".

Websites requiring a blacklisted preference or unsafe negotiation will break.

The padlock icon is a modified Tango! "emblem-readonly" icon.
