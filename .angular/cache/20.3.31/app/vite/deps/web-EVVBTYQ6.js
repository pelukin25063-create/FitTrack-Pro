import {
  hexStringToDataView,
  mapToObject,
  toArrayBufferDataView,
  webUUIDToString
} from "./chunk-LNJR2XNJ.js";
import {
  WebPlugin
} from "./chunk-56TUUZA4.js";
import {
  __async
} from "./chunk-NU7Y5T6J.js";

// node_modules/@capacitor-community/bluetooth-le/dist/esm/timeout.js
function runWithTimeout(promise, time, exception) {
  return __async(this, null, function* () {
    let timer;
    return Promise.race([
      promise,
      new Promise((_, reject) => {
        timer = setTimeout(() => reject(exception), time);
      })
    ]).finally(() => clearTimeout(timer));
  });
}

// node_modules/@capacitor-community/bluetooth-le/dist/esm/web.js
var BluetoothLeWeb = class extends WebPlugin {
  constructor() {
    super(...arguments);
    this.deviceMap = /* @__PURE__ */ new Map();
    this.discoveredDevices = /* @__PURE__ */ new Map();
    this.scan = null;
    this.DEFAULT_CONNECTION_TIMEOUT = 1e4;
    this.onAdvertisementReceivedCallback = this.onAdvertisementReceived.bind(this);
    this.onDisconnectedCallback = this.onDisconnected.bind(this);
    this.onCharacteristicValueChangedCallback = this.onCharacteristicValueChanged.bind(this);
  }
  initialize() {
    return __async(this, null, function* () {
      if (typeof navigator === "undefined" || !navigator.bluetooth) {
        throw this.unavailable("Web Bluetooth API not available in this browser.");
      }
      const isAvailable = yield navigator.bluetooth.getAvailability();
      if (!isAvailable) {
        throw this.unavailable("No Bluetooth radio available.");
      }
    });
  }
  isEnabled() {
    return __async(this, null, function* () {
      return { value: true };
    });
  }
  requestEnable() {
    return __async(this, null, function* () {
      throw this.unavailable("requestEnable is not available on web.");
    });
  }
  enable() {
    return __async(this, null, function* () {
      throw this.unavailable("enable is not available on web.");
    });
  }
  disable() {
    return __async(this, null, function* () {
      throw this.unavailable("disable is not available on web.");
    });
  }
  startEnabledNotifications() {
    return __async(this, null, function* () {
    });
  }
  stopEnabledNotifications() {
    return __async(this, null, function* () {
    });
  }
  isLocationEnabled() {
    return __async(this, null, function* () {
      throw this.unavailable("isLocationEnabled is not available on web.");
    });
  }
  openLocationSettings() {
    return __async(this, null, function* () {
      throw this.unavailable("openLocationSettings is not available on web.");
    });
  }
  openBluetoothSettings() {
    return __async(this, null, function* () {
      throw this.unavailable("openBluetoothSettings is not available on web.");
    });
  }
  openAppSettings() {
    return __async(this, null, function* () {
      throw this.unavailable("openAppSettings is not available on web.");
    });
  }
  setDisplayStrings() {
    return __async(this, null, function* () {
    });
  }
  requestDevice(options) {
    return __async(this, null, function* () {
      const filters = this.getFilters(options);
      const device = yield navigator.bluetooth.requestDevice({
        filters: filters.length ? filters : void 0,
        optionalServices: options === null || options === void 0 ? void 0 : options.optionalServices,
        acceptAllDevices: filters.length === 0
      });
      this.deviceMap.set(device.id, device);
      const bleDevice = this.getBleDevice(device);
      return bleDevice;
    });
  }
  requestLEScan(options) {
    return __async(this, null, function* () {
      this.requestBleDeviceOptions = options;
      const filters = this.getFilters(options);
      yield this.stopLEScan();
      this.discoveredDevices = /* @__PURE__ */ new Map();
      navigator.bluetooth.removeEventListener("advertisementreceived", this.onAdvertisementReceivedCallback);
      navigator.bluetooth.addEventListener("advertisementreceived", this.onAdvertisementReceivedCallback);
      this.scan = yield navigator.bluetooth.requestLEScan({
        filters: filters.length ? filters : void 0,
        acceptAllAdvertisements: filters.length === 0,
        keepRepeatedDevices: options === null || options === void 0 ? void 0 : options.allowDuplicates
      });
    });
  }
  onAdvertisementReceived(event) {
    var _a, _b, _c;
    const deviceId = event.device.id;
    this.deviceMap.set(deviceId, event.device);
    const isNew = !this.discoveredDevices.has(deviceId);
    if (((_a = this.requestBleDeviceOptions) === null || _a === void 0 ? void 0 : _a.serviceData) && !this.matchesServiceDataFilter(event)) {
      return;
    }
    if (isNew || ((_b = this.requestBleDeviceOptions) === null || _b === void 0 ? void 0 : _b.allowDuplicates)) {
      this.discoveredDevices.set(deviceId, true);
      const device = this.getBleDevice(event.device);
      const result = {
        device,
        localName: device.name,
        rssi: event.rssi,
        txPower: event.txPower,
        manufacturerData: mapToObject(event.manufacturerData),
        serviceData: mapToObject(event.serviceData),
        uuids: (_c = event.uuids) === null || _c === void 0 ? void 0 : _c.map(webUUIDToString)
      };
      this.notifyListeners("onScanResult", result);
    }
  }
  stopLEScan() {
    return __async(this, null, function* () {
      var _a;
      if ((_a = this.scan) === null || _a === void 0 ? void 0 : _a.active) {
        this.scan.stop();
      }
      this.scan = null;
    });
  }
  getDevices(options) {
    return __async(this, null, function* () {
      const devices = yield navigator.bluetooth.getDevices();
      const bleDevices = devices.filter((device) => options.deviceIds.includes(device.id)).map((device) => {
        this.deviceMap.set(device.id, device);
        const bleDevice = this.getBleDevice(device);
        return bleDevice;
      });
      return { devices: bleDevices };
    });
  }
  getConnectedDevices(_options) {
    return __async(this, null, function* () {
      const devices = yield navigator.bluetooth.getDevices();
      const bleDevices = devices.filter((device) => {
        var _a;
        return (_a = device.gatt) === null || _a === void 0 ? void 0 : _a.connected;
      }).map((device) => {
        this.deviceMap.set(device.id, device);
        const bleDevice = this.getBleDevice(device);
        return bleDevice;
      });
      return { devices: bleDevices };
    });
  }
  getBondedDevices() {
    return __async(this, null, function* () {
      return {};
    });
  }
  connect(options) {
    return __async(this, null, function* () {
      var _a, _b;
      const device = this.getDeviceFromMap(options.deviceId);
      device.removeEventListener("gattserverdisconnected", this.onDisconnectedCallback);
      device.addEventListener("gattserverdisconnected", this.onDisconnectedCallback);
      const timeoutError = /* @__PURE__ */ Symbol();
      if (device.gatt === void 0) {
        throw new Error("No gatt server available.");
      }
      try {
        const timeout = (_a = options.timeout) !== null && _a !== void 0 ? _a : this.DEFAULT_CONNECTION_TIMEOUT;
        yield runWithTimeout(device.gatt.connect(), timeout, timeoutError);
      } catch (error) {
        yield (_b = device.gatt) === null || _b === void 0 ? void 0 : _b.disconnect();
        if (error === timeoutError) {
          throw new Error("Connection timeout");
        } else {
          throw error;
        }
      }
    });
  }
  onDisconnected(event) {
    const deviceId = event.target.id;
    const key = `disconnected|${deviceId}`;
    this.notifyListeners(key, null);
  }
  createBond(_options) {
    return __async(this, null, function* () {
      throw this.unavailable("createBond is not available on web.");
    });
  }
  isBonded(_options) {
    return __async(this, null, function* () {
      throw this.unavailable("isBonded is not available on web.");
    });
  }
  disconnect(options) {
    return __async(this, null, function* () {
      var _a;
      (_a = this.getDeviceFromMap(options.deviceId).gatt) === null || _a === void 0 ? void 0 : _a.disconnect();
    });
  }
  getServices(options) {
    return __async(this, null, function* () {
      var _a, _b;
      const services = (_b = yield (_a = this.getDeviceFromMap(options.deviceId).gatt) === null || _a === void 0 ? void 0 : _a.getPrimaryServices()) !== null && _b !== void 0 ? _b : [];
      const bleServices = [];
      for (const service of services) {
        const characteristics = yield service.getCharacteristics();
        const bleCharacteristics = [];
        for (const characteristic of characteristics) {
          bleCharacteristics.push({
            uuid: characteristic.uuid,
            properties: this.getProperties(characteristic),
            descriptors: yield this.getDescriptors(characteristic)
          });
        }
        bleServices.push({ uuid: service.uuid, characteristics: bleCharacteristics });
      }
      return { services: bleServices };
    });
  }
  getDescriptors(characteristic) {
    return __async(this, null, function* () {
      try {
        const descriptors = yield characteristic.getDescriptors();
        return descriptors.map((descriptor) => ({
          uuid: descriptor.uuid
        }));
      } catch (_a) {
        return [];
      }
    });
  }
  getProperties(characteristic) {
    return {
      broadcast: characteristic.properties.broadcast,
      read: characteristic.properties.read,
      writeWithoutResponse: characteristic.properties.writeWithoutResponse,
      write: characteristic.properties.write,
      notify: characteristic.properties.notify,
      indicate: characteristic.properties.indicate,
      authenticatedSignedWrites: characteristic.properties.authenticatedSignedWrites,
      reliableWrite: characteristic.properties.reliableWrite,
      writableAuxiliaries: characteristic.properties.writableAuxiliaries
    };
  }
  getCharacteristic(options) {
    return __async(this, null, function* () {
      var _a;
      const service = yield (_a = this.getDeviceFromMap(options.deviceId).gatt) === null || _a === void 0 ? void 0 : _a.getPrimaryService(options === null || options === void 0 ? void 0 : options.service);
      return service === null || service === void 0 ? void 0 : service.getCharacteristic(options === null || options === void 0 ? void 0 : options.characteristic);
    });
  }
  getDescriptor(options) {
    return __async(this, null, function* () {
      const characteristic = yield this.getCharacteristic(options);
      return characteristic === null || characteristic === void 0 ? void 0 : characteristic.getDescriptor(options === null || options === void 0 ? void 0 : options.descriptor);
    });
  }
  discoverServices(_options) {
    return __async(this, null, function* () {
      throw this.unavailable("discoverServices is not available on web.");
    });
  }
  getMtu(_options) {
    return __async(this, null, function* () {
      throw this.unavailable("getMtu is not available on web.");
    });
  }
  requestConnectionPriority(_options) {
    return __async(this, null, function* () {
      throw this.unavailable("requestConnectionPriority is not available on web.");
    });
  }
  readRssi(_options) {
    return __async(this, null, function* () {
      throw this.unavailable("readRssi is not available on web.");
    });
  }
  read(options) {
    return __async(this, null, function* () {
      const characteristic = yield this.getCharacteristic(options);
      const value = yield characteristic === null || characteristic === void 0 ? void 0 : characteristic.readValue();
      return { value };
    });
  }
  write(options) {
    return __async(this, null, function* () {
      const characteristic = yield this.getCharacteristic(options);
      let dataView;
      if (typeof options.value === "string") {
        dataView = hexStringToDataView(options.value);
      } else {
        dataView = options.value;
      }
      yield characteristic === null || characteristic === void 0 ? void 0 : characteristic.writeValueWithResponse(toArrayBufferDataView(dataView));
    });
  }
  writeWithoutResponse(options) {
    return __async(this, null, function* () {
      const characteristic = yield this.getCharacteristic(options);
      let dataView;
      if (typeof options.value === "string") {
        dataView = hexStringToDataView(options.value);
      } else {
        dataView = options.value;
      }
      yield characteristic === null || characteristic === void 0 ? void 0 : characteristic.writeValueWithoutResponse(toArrayBufferDataView(dataView));
    });
  }
  readDescriptor(options) {
    return __async(this, null, function* () {
      const descriptor = yield this.getDescriptor(options);
      const value = yield descriptor === null || descriptor === void 0 ? void 0 : descriptor.readValue();
      return { value };
    });
  }
  writeDescriptor(options) {
    return __async(this, null, function* () {
      const descriptor = yield this.getDescriptor(options);
      let dataView;
      if (typeof options.value === "string") {
        dataView = hexStringToDataView(options.value);
      } else {
        dataView = options.value;
      }
      yield descriptor === null || descriptor === void 0 ? void 0 : descriptor.writeValue(toArrayBufferDataView(dataView));
    });
  }
  startNotifications(options) {
    return __async(this, null, function* () {
      const characteristic = yield this.getCharacteristic(options);
      characteristic === null || characteristic === void 0 ? void 0 : characteristic.removeEventListener("characteristicvaluechanged", this.onCharacteristicValueChangedCallback);
      characteristic === null || characteristic === void 0 ? void 0 : characteristic.addEventListener("characteristicvaluechanged", this.onCharacteristicValueChangedCallback);
      yield characteristic === null || characteristic === void 0 ? void 0 : characteristic.startNotifications();
    });
  }
  onCharacteristicValueChanged(event) {
    var _a, _b;
    const characteristic = event.target;
    const key = `notification|${(_a = characteristic.service) === null || _a === void 0 ? void 0 : _a.device.id}|${(_b = characteristic.service) === null || _b === void 0 ? void 0 : _b.uuid}|${characteristic.uuid}`;
    this.notifyListeners(key, {
      value: characteristic.value
    });
  }
  stopNotifications(options) {
    return __async(this, null, function* () {
      const characteristic = yield this.getCharacteristic(options);
      yield characteristic === null || characteristic === void 0 ? void 0 : characteristic.stopNotifications();
    });
  }
  getFilters(options) {
    var _a, _b;
    const filters = [];
    for (const service of (_a = options === null || options === void 0 ? void 0 : options.services) !== null && _a !== void 0 ? _a : []) {
      filters.push({
        services: [service],
        name: options === null || options === void 0 ? void 0 : options.name,
        namePrefix: options === null || options === void 0 ? void 0 : options.namePrefix
      });
    }
    if (((options === null || options === void 0 ? void 0 : options.name) || (options === null || options === void 0 ? void 0 : options.namePrefix)) && filters.length === 0) {
      filters.push({
        name: options.name,
        namePrefix: options.namePrefix
      });
    }
    for (const manufacturerData of (_b = options === null || options === void 0 ? void 0 : options.manufacturerData) !== null && _b !== void 0 ? _b : []) {
      filters.push({
        manufacturerData: [manufacturerData]
      });
    }
    return filters;
  }
  matchesServiceDataFilter(event) {
    var _a;
    const filters = (_a = this.requestBleDeviceOptions) === null || _a === void 0 ? void 0 : _a.serviceData;
    if (!filters || filters.length === 0) {
      return true;
    }
    if (!event.serviceData) {
      return false;
    }
    for (const filter of filters) {
      const serviceData = event.serviceData.get(filter.serviceUuid);
      if (!serviceData) {
        continue;
      }
      if (!filter.dataPrefix) {
        return true;
      }
      const data = new Uint8Array(serviceData.buffer);
      const prefixView = filter.dataPrefix;
      if (data.length < prefixView.byteLength) {
        continue;
      }
      if (filter.mask) {
        const maskView = filter.mask;
        let matches = true;
        for (let i = 0; i < prefixView.byteLength; i++) {
          if ((data[i] & maskView.getUint8(i)) !== (prefixView.getUint8(i) & maskView.getUint8(i))) {
            matches = false;
            break;
          }
        }
        if (matches) {
          return true;
        }
      } else {
        let matches = true;
        for (let i = 0; i < prefixView.byteLength; i++) {
          if (data[i] !== prefixView.getUint8(i)) {
            matches = false;
            break;
          }
        }
        if (matches) {
          return true;
        }
      }
    }
    return false;
  }
  getDeviceFromMap(deviceId) {
    const device = this.deviceMap.get(deviceId);
    if (device === void 0) {
      throw new Error('Device not found. Call "requestDevice", "requestLEScan" or "getDevices" first.');
    }
    return device;
  }
  getBleDevice(device) {
    var _a;
    const bleDevice = {
      deviceId: device.id,
      // use undefined instead of null if name is not available
      name: (_a = device.name) !== null && _a !== void 0 ? _a : void 0
    };
    return bleDevice;
  }
};
export {
  BluetoothLeWeb
};
//# sourceMappingURL=web-EVVBTYQ6.js.map
