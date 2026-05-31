// Polyfill crypto.randomUUID for jsdom test environment
const { webcrypto } = require('crypto')
if (!globalThis.crypto?.randomUUID) {
  globalThis.crypto = webcrypto
}
