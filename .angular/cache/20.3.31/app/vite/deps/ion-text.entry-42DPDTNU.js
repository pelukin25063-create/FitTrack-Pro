import {
  createColorClasses
} from "./chunk-3HUDDGKC.js";
import {
  getIonMode
} from "./chunk-JDDVIETK.js";
import {
  Host,
  h,
  registerInstance
} from "./chunk-FF3KQHI5.js";
import "./chunk-NU7Y5T6J.js";

// node_modules/@ionic/core/dist/esm/ion-text.entry.js
var textCss = () => `:host(.ion-color){color:var(--ion-color-base)}`;
var Text = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    const mode = getIonMode(this);
    return h(Host, { key: "bfaa49d35f43b8036725ae8a322c716fc6e43bdf", class: createColorClasses(this.color, {
      [mode]: true
    }) }, h("slot", { key: "c04880cd1935b42cbe60f58fd523b4d8a96072dc" }));
  }
};
Text.style = textCss();
export {
  Text as ion_text
};
//# sourceMappingURL=ion-text.entry-42DPDTNU.js.map
