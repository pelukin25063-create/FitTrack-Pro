import {
  WebPlugin
} from "./chunk-56TUUZA4.js";
import {
  __async
} from "./chunk-NU7Y5T6J.js";

// node_modules/@capgo/capacitor-nfc/dist/esm/web.js
var CapacitorNfcWeb = class extends WebPlugin {
  unsupported(method) {
    throw this.unimplemented(`CapacitorNfc.${method} is not available in a browser environment.`);
  }
  startScanning(_options) {
    return __async(this, null, function* () {
      this.unsupported("startScanning");
    });
  }
  stopScanning() {
    return __async(this, null, function* () {
      this.unsupported("stopScanning");
    });
  }
  write(_options) {
    return __async(this, null, function* () {
      this.unsupported("write");
    });
  }
  erase() {
    return __async(this, null, function* () {
      this.unsupported("erase");
    });
  }
  makeReadOnly() {
    return __async(this, null, function* () {
      this.unsupported("makeReadOnly");
    });
  }
  share(_options) {
    return __async(this, null, function* () {
      this.unsupported("share");
    });
  }
  unshare() {
    return __async(this, null, function* () {
      this.unsupported("unshare");
    });
  }
  getStatus() {
    return __async(this, null, function* () {
      return { status: "NO_NFC" };
    });
  }
  showSettings() {
    return __async(this, null, function* () {
      this.unsupported("showSettings");
    });
  }
  getPluginVersion() {
    return __async(this, null, function* () {
      return { version: "0.0.0-web" };
    });
  }
  isSupported() {
    return __async(this, null, function* () {
      return { supported: false };
    });
  }
  addListener(eventName, _listenerFunc) {
    return __async(this, null, function* () {
      this.unsupported(`addListener(${eventName})`);
    });
  }
};
export {
  CapacitorNfcWeb
};
//# sourceMappingURL=web-2PK52HYC.js.map
