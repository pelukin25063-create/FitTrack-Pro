import {
  findClosestIonContent,
  scrollToTop
} from "./chunk-GAOEJL64.js";
import {
  componentOnReady
} from "./chunk-TRNENI6K.js";
import {
  readTask,
  writeTask
} from "./chunk-FF3KQHI5.js";
import {
  __async
} from "./chunk-NU7Y5T6J.js";

// node_modules/@ionic/core/dist/esm/status-tap-Kan2W7sh.js
var startStatusTap = () => {
  const win = window;
  win.addEventListener("statusTap", () => {
    readTask(() => {
      const width = win.innerWidth;
      const height = win.innerHeight;
      const el = document.elementFromPoint(width / 2, height / 2);
      if (!el) {
        return;
      }
      const contentEl = findClosestIonContent(el);
      if (contentEl) {
        new Promise((resolve) => componentOnReady(contentEl, resolve)).then(() => {
          writeTask(() => __async(null, null, function* () {
            contentEl.style.setProperty("--overflow", "hidden");
            yield scrollToTop(contentEl, 300);
            contentEl.style.removeProperty("--overflow");
          }));
        });
      }
    });
  });
};
export {
  startStatusTap
};
//# sourceMappingURL=status-tap-Kan2W7sh-QX6QMSU6.js.map
