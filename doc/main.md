Strict SSL3 Configuration
=========================

This add-on toggles between default and strict configurations for security.ssl3
preferences.

In default mode, all preferences are reset to their default value, while in
strict mode, only whitelisted preferences are activated.
Current behaviour is to avoid 128 bit ciphers (except for ECDHE), RC4 and
ECDSA and to opt-in for secure SSL/TLS renegotiation.

Websites using only weak ciphers or unsafe renegotiation will fail to load.

Using stronger ciphers only will likely help your security posture but, if
anonymity is important for you, please be aware that a website can more easily
fingerprint your browser due to the reduced ciphers suite in use.

The padlock icons are taken from Open Iconic — https://useiconic.com/open they
are released under the MIT license over at https://github.com/iconic/open-iconic
