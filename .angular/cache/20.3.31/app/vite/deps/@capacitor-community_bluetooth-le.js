import {
  dataViewToHexString,
  dataViewToNumbers,
  dataViewToText,
  hexStringToDataView,
  mapToObject,
  numberToUUID,
  numbersToDataView,
  textToDataView,
  toArrayBufferDataView,
  toHexString,
  toUint8Array,
  webUUIDToString
} from "./chunk-LNJR2XNJ.js";
import {
  Capacitor,
  registerPlugin
} from "./chunk-56TUUZA4.js";
import {
  __async
} from "./chunk-NU7Y5T6J.js";

// node_modules/@capacitor-community/bluetooth-le/dist/esm/definitions.js
var ScanMode;
(function(ScanMode2) {
  ScanMode2[ScanMode2["SCAN_MODE_LOW_POWER"] = 0] = "SCAN_MODE_LOW_POWER";
  ScanMode2[ScanMode2["SCAN_MODE_BALANCED"] = 1] = "SCAN_MODE_BALANCED";
  ScanMode2[ScanMode2["SCAN_MODE_LOW_LATENCY"] = 2] = "SCAN_MODE_LOW_LATENCY";
})(ScanMode || (ScanMode = {}));
var ConnectionPriority;
(function(ConnectionPriority2) {
  ConnectionPriority2[ConnectionPriority2["CONNECTION_PRIORITY_BALANCED"] = 0] = "CONNECTION_PRIORITY_BALANCED";
  ConnectionPriority2[ConnectionPriority2["CONNECTION_PRIORITY_HIGH"] = 1] = "CONNECTION_PRIORITY_HIGH";
  ConnectionPriority2[ConnectionPriority2["CONNECTION_PRIORITY_LOW_POWER"] = 2] = "CONNECTION_PRIORITY_LOW_POWER";
})(ConnectionPriority || (ConnectionPriority = {}));

// node_modules/@capacitor-community/bluetooth-le/dist/esm/plugin.js
var BluetoothLe = registerPlugin("BluetoothLe", {
  web: () => import("./web-EVVBTYQ6.js").then((m) => new m.BluetoothLeWeb())
});

// node_modules/@capacitor-community/bluetooth-le/dist/esm/queue.js
var makeQueue = () => {
  let currentTask = Promise.resolve();
  return (fn) => new Promise((resolve, reject) => {
    currentTask = currentTask.then(() => fn()).then(resolve).catch(reject);
  });
};
function getQueue(enabled) {
  if (enabled) {
    return makeQueue();
  }
  return (fn) => fn();
}

// node_modules/@capacitor-community/bluetooth-le/dist/esm/validators.js
function parseUUID(uuid) {
  if (typeof uuid !== "string") {
    throw new Error(`Invalid UUID type ${typeof uuid}. Expected string.`);
  }
  uuid = uuid.toLowerCase();
  const is128BitUuid = uuid.search(/^[0-9a-f]{8}\b-[0-9a-f]{4}\b-[0-9a-f]{4}\b-[0-9a-f]{4}\b-[0-9a-f]{12}$/) >= 0;
  if (!is128BitUuid) {
    throw new Error(`Invalid UUID format ${uuid}. Expected 128 bit string (e.g. "0000180d-0000-1000-8000-00805f9b34fb").`);
  }
  return uuid;
}

// node_modules/@capacitor-community/bluetooth-le/dist/esm/bleClient.js
var BleClientClass = class {
  constructor() {
    this.scanListener = null;
    this.eventListeners = /* @__PURE__ */ new Map();
    this.queue = getQueue(true);
  }
  enableQueue() {
    this.queue = getQueue(true);
  }
  disableQueue() {
    this.queue = getQueue(false);
  }
  initialize(options) {
    return __async(this, null, function* () {
      yield this.queue(() => __async(this, null, function* () {
        yield BluetoothLe.initialize(options);
      }));
    });
  }
  isEnabled() {
    return __async(this, null, function* () {
      const enabled = yield this.queue(() => __async(this, null, function* () {
        const result = yield BluetoothLe.isEnabled();
        return result.value;
      }));
      return enabled;
    });
  }
  requestEnable() {
    return __async(this, null, function* () {
      yield this.queue(() => __async(this, null, function* () {
        yield BluetoothLe.requestEnable();
      }));
    });
  }
  enable() {
    return __async(this, null, function* () {
      yield this.queue(() => __async(this, null, function* () {
        yield BluetoothLe.enable();
      }));
    });
  }
  disable() {
    return __async(this, null, function* () {
      yield this.queue(() => __async(this, null, function* () {
        yield BluetoothLe.disable();
      }));
    });
  }
  startEnabledNotifications(callback) {
    return __async(this, null, function* () {
      yield this.queue(() => __async(this, null, function* () {
        var _a;
        const key = `onEnabledChanged`;
        yield (_a = this.eventListeners.get(key)) === null || _a === void 0 ? void 0 : _a.remove();
        const listener = yield BluetoothLe.addListener(key, (result) => {
          callback(result.value);
        });
        this.eventListeners.set(key, listener);
        yield BluetoothLe.startEnabledNotifications();
      }));
    });
  }
  stopEnabledNotifications() {
    return __async(this, null, function* () {
      yield this.queue(() => __async(this, null, function* () {
        var _a;
        const key = `onEnabledChanged`;
        yield (_a = this.eventListeners.get(key)) === null || _a === void 0 ? void 0 : _a.remove();
        this.eventListeners.delete(key);
        yield BluetoothLe.stopEnabledNotifications();
      }));
    });
  }
  isLocationEnabled() {
    return __async(this, null, function* () {
      const enabled = yield this.queue(() => __async(this, null, function* () {
        const result = yield BluetoothLe.isLocationEnabled();
        return result.value;
      }));
      return enabled;
    });
  }
  openLocationSettings() {
    return __async(this, null, function* () {
      yield this.queue(() => __async(this, null, function* () {
        yield BluetoothLe.openLocationSettings();
      }));
    });
  }
  openBluetoothSettings() {
    return __async(this, null, function* () {
      yield this.queue(() => __async(this, null, function* () {
        yield BluetoothLe.openBluetoothSettings();
      }));
    });
  }
  openAppSettings() {
    return __async(this, null, function* () {
      yield this.queue(() => __async(this, null, function* () {
        yield BluetoothLe.openAppSettings();
      }));
    });
  }
  setDisplayStrings(displayStrings) {
    return __async(this, null, function* () {
      yield this.queue(() => __async(this, null, function* () {
        yield BluetoothLe.setDisplayStrings(displayStrings);
      }));
    });
  }
  requestDevice(options) {
    return __async(this, null, function* () {
      options = options ? this.validateRequestBleDeviceOptions(options) : void 0;
      const result = yield this.queue(() => __async(this, null, function* () {
        const device = yield BluetoothLe.requestDevice(options);
        return device;
      }));
      return result;
    });
  }
  requestLEScan(options, callback) {
    return __async(this, null, function* () {
      options = this.validateRequestBleDeviceOptions(options);
      yield this.queue(() => __async(this, null, function* () {
        var _a;
        yield (_a = this.scanListener) === null || _a === void 0 ? void 0 : _a.remove();
        this.scanListener = yield BluetoothLe.addListener("onScanResult", (resultInternal) => {
          const result = Object.assign(Object.assign({}, resultInternal), { manufacturerData: this.convertObject(resultInternal.manufacturerData), serviceData: this.convertObject(resultInternal.serviceData), rawAdvertisement: resultInternal.rawAdvertisement ? this.convertValue(resultInternal.rawAdvertisement) : void 0 });
          callback(result);
        });
        yield BluetoothLe.requestLEScan(options);
      }));
    });
  }
  stopLEScan() {
    return __async(this, null, function* () {
      yield this.queue(() => __async(this, null, function* () {
        var _a;
        yield (_a = this.scanListener) === null || _a === void 0 ? void 0 : _a.remove();
        this.scanListener = null;
        yield BluetoothLe.stopLEScan();
      }));
    });
  }
  getDevices(deviceIds) {
    return __async(this, null, function* () {
      if (!Array.isArray(deviceIds)) {
        throw new Error("deviceIds must be an array");
      }
      return this.queue(() => __async(this, null, function* () {
        const result = yield BluetoothLe.getDevices({ deviceIds });
        return result.devices;
      }));
    });
  }
  getConnectedDevices(services) {
    return __async(this, null, function* () {
      if (!Array.isArray(services)) {
        throw new Error("services must be an array");
      }
      services = services.map(parseUUID);
      return this.queue(() => __async(this, null, function* () {
        const result = yield BluetoothLe.getConnectedDevices({ services });
        return result.devices;
      }));
    });
  }
  getBondedDevices() {
    return __async(this, null, function* () {
      return this.queue(() => __async(this, null, function* () {
        const result = yield BluetoothLe.getBondedDevices();
        return result.devices;
      }));
    });
  }
  connect(deviceId, onDisconnect, options) {
    return __async(this, null, function* () {
      yield this.queue(() => __async(this, null, function* () {
        var _a;
        if (onDisconnect) {
          const key = `disconnected|${deviceId}`;
          yield (_a = this.eventListeners.get(key)) === null || _a === void 0 ? void 0 : _a.remove();
          const listener = yield BluetoothLe.addListener(key, () => {
            onDisconnect(deviceId);
          });
          this.eventListeners.set(key, listener);
        }
        yield BluetoothLe.connect(Object.assign({ deviceId }, options));
      }));
    });
  }
  createBond(deviceId, options) {
    return __async(this, null, function* () {
      yield this.queue(() => __async(this, null, function* () {
        yield BluetoothLe.createBond(Object.assign({ deviceId }, options));
      }));
    });
  }
  isBonded(deviceId) {
    return __async(this, null, function* () {
      const isBonded = yield this.queue(() => __async(this, null, function* () {
        const result = yield BluetoothLe.isBonded({ deviceId });
        return result.value;
      }));
      return isBonded;
    });
  }
  disconnect(deviceId) {
    return __async(this, null, function* () {
      yield this.queue(() => __async(this, null, function* () {
        yield BluetoothLe.disconnect({ deviceId });
      }));
    });
  }
  getServices(deviceId) {
    return __async(this, null, function* () {
      const services = yield this.queue(() => __async(this, null, function* () {
        const result = yield BluetoothLe.getServices({ deviceId });
        return result.services;
      }));
      return services;
    });
  }
  discoverServices(deviceId) {
    return __async(this, null, function* () {
      yield this.queue(() => __async(this, null, function* () {
        yield BluetoothLe.discoverServices({ deviceId });
      }));
    });
  }
  getMtu(deviceId) {
    return __async(this, null, function* () {
      const value = yield this.queue(() => __async(this, null, function* () {
        const result = yield BluetoothLe.getMtu({ deviceId });
        return result.value;
      }));
      return value;
    });
  }
  requestConnectionPriority(deviceId, connectionPriority) {
    return __async(this, null, function* () {
      yield this.queue(() => __async(this, null, function* () {
        yield BluetoothLe.requestConnectionPriority({ deviceId, connectionPriority });
      }));
    });
  }
  readRssi(deviceId) {
    return __async(this, null, function* () {
      const value = yield this.queue(() => __async(this, null, function* () {
        const result = yield BluetoothLe.readRssi({ deviceId });
        return parseFloat(result.value);
      }));
      return value;
    });
  }
  read(deviceId, service, characteristic, options) {
    return __async(this, null, function* () {
      service = parseUUID(service);
      characteristic = parseUUID(characteristic);
      const value = yield this.queue(() => __async(this, null, function* () {
        const result = yield BluetoothLe.read(Object.assign({
          deviceId,
          service,
          characteristic
        }, options));
        return this.convertValue(result.value);
      }));
      return value;
    });
  }
  write(deviceId, service, characteristic, value, options) {
    return __async(this, null, function* () {
      service = parseUUID(service);
      characteristic = parseUUID(characteristic);
      return this.queue(() => __async(this, null, function* () {
        if (!(value === null || value === void 0 ? void 0 : value.buffer)) {
          throw new Error("Invalid data.");
        }
        let writeValue = value;
        if (Capacitor.getPlatform() !== "web") {
          writeValue = dataViewToHexString(value);
        }
        yield BluetoothLe.write(Object.assign({
          deviceId,
          service,
          characteristic,
          value: writeValue
        }, options));
      }));
    });
  }
  writeWithoutResponse(deviceId, service, characteristic, value, options) {
    return __async(this, null, function* () {
      service = parseUUID(service);
      characteristic = parseUUID(characteristic);
      yield this.queue(() => __async(this, null, function* () {
        if (!(value === null || value === void 0 ? void 0 : value.buffer)) {
          throw new Error("Invalid data.");
        }
        let writeValue = value;
        if (Capacitor.getPlatform() !== "web") {
          writeValue = dataViewToHexString(value);
        }
        yield BluetoothLe.writeWithoutResponse(Object.assign({
          deviceId,
          service,
          characteristic,
          value: writeValue
        }, options));
      }));
    });
  }
  readDescriptor(deviceId, service, characteristic, descriptor, options) {
    return __async(this, null, function* () {
      service = parseUUID(service);
      characteristic = parseUUID(characteristic);
      descriptor = parseUUID(descriptor);
      const value = yield this.queue(() => __async(this, null, function* () {
        const result = yield BluetoothLe.readDescriptor(Object.assign({
          deviceId,
          service,
          characteristic,
          descriptor
        }, options));
        return this.convertValue(result.value);
      }));
      return value;
    });
  }
  writeDescriptor(deviceId, service, characteristic, descriptor, value, options) {
    return __async(this, null, function* () {
      service = parseUUID(service);
      characteristic = parseUUID(characteristic);
      descriptor = parseUUID(descriptor);
      return this.queue(() => __async(this, null, function* () {
        if (!(value === null || value === void 0 ? void 0 : value.buffer)) {
          throw new Error("Invalid data.");
        }
        let writeValue = value;
        if (Capacitor.getPlatform() !== "web") {
          writeValue = dataViewToHexString(value);
        }
        yield BluetoothLe.writeDescriptor(Object.assign({
          deviceId,
          service,
          characteristic,
          descriptor,
          value: writeValue
        }, options));
      }));
    });
  }
  startNotifications(deviceId, service, characteristic, callback, options) {
    return __async(this, null, function* () {
      service = parseUUID(service);
      characteristic = parseUUID(characteristic);
      yield this.queue(() => __async(this, null, function* () {
        var _a;
        const key = `notification|${deviceId}|${service}|${characteristic}`;
        yield (_a = this.eventListeners.get(key)) === null || _a === void 0 ? void 0 : _a.remove();
        const listener = yield BluetoothLe.addListener(key, (event) => {
          callback(this.convertValue(event === null || event === void 0 ? void 0 : event.value));
        });
        this.eventListeners.set(key, listener);
        yield BluetoothLe.startNotifications(Object.assign({
          deviceId,
          service,
          characteristic
        }, options));
      }));
    });
  }
  stopNotifications(deviceId, service, characteristic) {
    return __async(this, null, function* () {
      service = parseUUID(service);
      characteristic = parseUUID(characteristic);
      yield this.queue(() => __async(this, null, function* () {
        var _a;
        const key = `notification|${deviceId}|${service}|${characteristic}`;
        yield (_a = this.eventListeners.get(key)) === null || _a === void 0 ? void 0 : _a.remove();
        this.eventListeners.delete(key);
        yield BluetoothLe.stopNotifications({
          deviceId,
          service,
          characteristic
        });
      }));
    });
  }
  validateRequestBleDeviceOptions(options) {
    options = Object.assign({}, options);
    if (options.services) {
      options.services = options.services.map(parseUUID);
    }
    if (options.optionalServices) {
      options.optionalServices = options.optionalServices.map(parseUUID);
    }
    if (options.serviceData && Capacitor.getPlatform() !== "web") {
      options.serviceData = options.serviceData.map((filter) => Object.assign(Object.assign({}, filter), { serviceUuid: parseUUID(filter.serviceUuid), dataPrefix: toHexString(filter.dataPrefix), mask: toHexString(filter.mask) }));
    }
    if (options.manufacturerData) {
      if (Capacitor.getPlatform() !== "web") {
        options.manufacturerData = options.manufacturerData.map((filter) => Object.assign(Object.assign({}, filter), { dataPrefix: toHexString(filter.dataPrefix), mask: toHexString(filter.mask) }));
      } else {
        options.manufacturerData = options.manufacturerData.map((filter) => Object.assign(Object.assign({}, filter), { dataPrefix: toUint8Array(filter.dataPrefix), mask: toUint8Array(filter.mask) }));
      }
    }
    return options;
  }
  convertValue(value) {
    if (typeof value === "string") {
      return hexStringToDataView(value);
    } else if (value === void 0) {
      return new DataView(new ArrayBuffer(0));
    }
    return value;
  }
  convertObject(obj) {
    if (obj === void 0) {
      return void 0;
    }
    const result = {};
    for (const key of Object.keys(obj)) {
      result[key] = this.convertValue(obj[key]);
    }
    return result;
  }
};
var BleClient = new BleClientClass();
export {
  BleClient,
  BluetoothLe,
  ConnectionPriority,
  ScanMode,
  dataViewToHexString,
  dataViewToNumbers,
  dataViewToText,
  hexStringToDataView,
  mapToObject,
  numberToUUID,
  numbersToDataView,
  textToDataView,
  toArrayBufferDataView,
  toHexString,
  toUint8Array,
  webUUIDToString
};
//# sourceMappingURL=@capacitor-community_bluetooth-le.js.map
