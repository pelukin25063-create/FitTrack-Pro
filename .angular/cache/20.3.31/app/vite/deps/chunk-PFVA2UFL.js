// node_modules/@ionic/core/components/p-CHqRYvYm.js
var t = class {
  constructor() {
    this.m = /* @__PURE__ */ new Map();
  }
  reset(t4) {
    this.m = new Map(Object.entries(t4));
  }
  get(t4, n3) {
    const e2 = this.m.get(t4);
    return void 0 !== e2 ? e2 : n3;
  }
  getBoolean(t4, n3 = false) {
    const e2 = this.m.get(t4);
    return void 0 === e2 ? n3 : "string" == typeof e2 ? "true" === e2 : !!e2;
  }
  getNumber(t4, n3) {
    const e2 = parseFloat(this.m.get(t4));
    return isNaN(e2) ? void 0 !== n3 ? n3 : NaN : e2;
  }
  set(t4, n3) {
    this.m.set(t4, n3);
  }
};
var n = new t();
var c;
!(function(t4) {
  t4.OFF = "OFF", t4.ERROR = "ERROR", t4.WARN = "WARN";
})(c || (c = {}));
var u = (t4, ...e2) => {
  const o2 = n.get("logLevel", c.WARN);
  if ([c.WARN].includes(o2)) return console.warn(`[Ionic Warning]: ${t4}`, ...e2);
};
var f = (t4, ...e2) => {
  const o2 = n.get("logLevel", c.ERROR);
  if ([c.ERROR, c.WARN].includes(o2)) return console.error(`[Ionic Error]: ${t4}`, ...e2);
};
var h = ((t4) => (t4.Undefined = "undefined", t4.Null = "null", t4.String = "string", t4.Number = "number", t4.SpecialNumber = "number", t4.Boolean = "boolean", t4.BigInt = "bigint", t4))(h || {});
var p = ((t4) => (t4.Array = "array", t4.Date = "date", t4.Map = "map", t4.Object = "object", t4.RegularExpression = "regexp", t4.Set = "set", t4.Channel = "channel", t4.Symbol = "symbol", t4))(p || {});
var w = (t4) => {
  if (t4.__stencil__getHostRef) return t4.__stencil__getHostRef();
};
var O = (t4, n3) => (0, console.error)(t4, n3);
var M = "undefined" != typeof window ? window : {};
var I = M.HTMLElement || class {
};
var L = { i: 0, u: "", jmp: (t4) => t4(), raf: (t4) => requestAnimationFrame(t4), ael: (t4, n3, e2, o2) => t4.addEventListener(n3, e2, o2), rel: (t4, n3, e2, o2) => t4.removeEventListener(n3, e2, o2), ce: (t4, n3) => new CustomEvent(t4, n3) };
var R = (() => {
  var t4;
  let n3 = false;
  try {
    null == (t4 = M.document) || t4.addEventListener("e", null, Object.defineProperty({}, "passive", { get() {
      n3 = true;
    } }));
  } catch (t5) {
  }
  return n3;
})();
var A = (() => {
  try {
    return !!M.document.adoptedStyleSheets && (new CSSStyleSheet(), "function" == typeof new CSSStyleSheet().replaceSync);
  } catch (t4) {
  }
  return false;
})();
var _ = !!A && (() => !!M.document && Object.getOwnPropertyDescriptor(M.document.adoptedStyleSheets, "length").writable)();
var B = false;
var F = [];
var T = [];
var U = (t4, n3) => (e2) => {
  t4.push(e2), B || (B = true, n3 && 4 & L.i ? V(W) : L.raf(W));
};
var D = (t4) => {
  for (let n3 = 0; n3 < t4.length; n3++) try {
    t4[n3](performance.now());
  } catch (t5) {
    O(t5);
  }
  t4.length = 0;
};
var W = () => {
  D(F), D(T), (B = F.length > 0) && L.raf(W);
};
var V = (t4) => Promise.resolve(void 0).then(t4);
var H = U(F, false);
var P = U(T, true);
var Vt = (t4) => {
  var n3;
  return null == (n3 = w(t4)) ? void 0 : n3.R;
};
var tn = "Capture";
var nn = new RegExp(tn + "$");

// node_modules/@ionic/core/components/p-ZjP4CjeZ.js
var d = "undefined" != typeof window ? window : void 0;
var o = "undefined" != typeof document ? document : void 0;

// node_modules/@ionic/core/components/p-CmR5uXej.js
var t2;
var i = (e2, o2, i2) => {
  const n3 = o2.startsWith("animation") ? (r3 = e2, void 0 === t2 && (t2 = void 0 === r3.style.animationName && void 0 !== r3.style.webkitAnimationName ? "-webkit-" : ""), t2) : "";
  var r3;
  e2.style.setProperty(n3 + o2, i2);
};
var n2 = (e2 = [], o2) => {
  if (void 0 !== o2) {
    const t4 = Array.isArray(o2) ? o2 : [o2];
    return [...e2, ...t4];
  }
  return e2;
};
var r = (t4) => {
  let r3, a, s2, d4, l2, f2, c3, v, m, u2, p2, y = [], g = [], A2 = [], b = false, C = {}, E = [], h2 = [], R2 = {}, S = 0, j = false, k = false, w2 = true, T2 = false, D2 = true, F2 = false;
  const W2 = t4, I2 = [], K = [], M2 = [], P2 = [], Y = [], Z = [], q = [], x = [], H2 = [], z = [], B3 = [], G = "function" == typeof AnimationEffect || void 0 !== d && "function" == typeof d.AnimationEffect, J = "function" == typeof Element && "function" == typeof Element.prototype.animate && G, L2 = () => B3, N = (e2, o2) => {
    const t5 = o2.findIndex(((o3) => o3.c === e2));
    t5 > -1 && o2.splice(t5, 1);
  }, O2 = (e2, o2) => (((null == o2 ? void 0 : o2.oneTimeCallback) ? K : I2).push({ c: e2, o: o2 }), p2), Q = () => {
    J && (B3.forEach(((e2) => {
      e2.cancel();
    })), B3.length = 0);
  }, U2 = () => {
    Z.forEach(((e2) => {
      (null == e2 ? void 0 : e2.parentNode) && e2.parentNode.removeChild(e2);
    })), Z.length = 0;
  }, V2 = () => void 0 !== l2 ? l2 : c3 ? c3.getFill() : "both", X = () => void 0 !== v ? v : void 0 !== f2 ? f2 : c3 ? c3.getDirection() : "normal", $ = () => j ? "linear" : void 0 !== s2 ? s2 : c3 ? c3.getEasing() : "linear", _2 = () => k ? 0 : void 0 !== m ? m : void 0 !== a ? a : c3 ? c3.getDuration() : 0, ee = () => void 0 !== d4 ? d4 : c3 ? c3.getIterations() : 1, oe = () => void 0 !== u2 ? u2 : void 0 !== r3 ? r3 : c3 ? c3.getDelay() : 0, te = () => {
    0 !== S && (S--, 0 === S && ((() => {
      H2.forEach(((e3) => e3())), z.forEach(((e3) => e3()));
      const e2 = w2 ? 1 : 0, o2 = E, t5 = h2, n3 = R2;
      P2.forEach(((e3) => {
        const r4 = e3.classList;
        o2.forEach(((e4) => r4.add(e4))), t5.forEach(((e4) => r4.remove(e4)));
        for (const o3 in n3) n3.hasOwnProperty(o3) && i(e3, o3, n3[o3]);
      })), m = void 0, v = void 0, u2 = void 0, I2.forEach(((o3) => o3.c(e2, p2))), K.forEach(((o3) => o3.c(e2, p2))), K.length = 0, D2 = true, w2 && (T2 = true), w2 = true;
    })(), c3 && c3.animationFinish()));
  }, ie = () => {
    (() => {
      q.forEach(((e3) => e3())), x.forEach(((e3) => e3()));
      const e2 = g, o2 = A2, t5 = C;
      P2.forEach(((n3) => {
        const r4 = n3.classList;
        e2.forEach(((e3) => r4.add(e3))), o2.forEach(((e3) => r4.remove(e3)));
        for (const e3 in t5) t5.hasOwnProperty(e3) && i(n3, e3, t5[e3]);
      }));
    })(), y.length > 0 && J && (P2.forEach(((e2) => {
      const o2 = e2.animate(y, { id: W2, delay: oe(), duration: _2(), easing: $(), iterations: ee(), fill: V2(), direction: X() });
      o2.pause(), B3.push(o2);
    })), B3.length > 0 && (B3[0].onfinish = () => {
      te();
    })), b = true;
  }, ne = (e2) => {
    e2 = Math.min(Math.max(e2, 0), 0.9999), J && B3.forEach(((o2) => {
      o2.currentTime = o2.effect.getComputedTiming().delay + _2() * e2, o2.pause();
    }));
  }, re = (e2) => {
    B3.forEach(((e3) => {
      e3.effect.updateTiming({ delay: oe(), duration: _2(), easing: $(), iterations: ee(), fill: V2(), direction: X() });
    })), void 0 !== e2 && ne(e2);
  }, ae = (e2 = false, o2 = true, t5) => (e2 && Y.forEach(((i2) => {
    i2.update(e2, o2, t5);
  })), J && re(t5), p2), se = () => {
    b && (J ? B3.forEach(((e2) => {
      e2.pause();
    })) : P2.forEach(((e2) => {
      i(e2, "animation-play-state", "paused");
    })), F2 = true);
  }, de = (e2) => new Promise(((o2) => {
    (null == e2 ? void 0 : e2.sync) && (k = true, O2((() => k = false), { oneTimeCallback: true })), b || ie(), T2 && (J && (ne(0), re()), T2 = false), D2 && (S = Y.length + 1, D2 = false);
    const t5 = () => {
      N(i2, K), o2();
    }, i2 = () => {
      N(t5, M2), o2();
    };
    O2(i2, { oneTimeCallback: true }), M2.push({ c: t5, o: { oneTimeCallback: true } }), Y.forEach(((e3) => {
      e3.play();
    })), J ? (B3.forEach(((e3) => {
      e3.play();
    })), 0 !== y.length && 0 !== P2.length || te()) : te(), F2 = false;
  })), le = (e2, o2) => {
    const t5 = y[0];
    return void 0 === t5 || void 0 !== t5.offset && 0 !== t5.offset ? y = [{ offset: 0, [e2]: o2 }, ...y] : t5[e2] = o2, p2;
  };
  return p2 = { parentAnimation: c3, elements: P2, childAnimations: Y, id: W2, animationFinish: te, from: le, to: (e2, o2) => {
    const t5 = y[y.length - 1];
    return void 0 === t5 || void 0 !== t5.offset && 1 !== t5.offset ? y = [...y, { offset: 1, [e2]: o2 }] : t5[e2] = o2, p2;
  }, fromTo: (e2, o2, t5) => le(e2, o2).to(e2, t5), parent: (e2) => (c3 = e2, p2), play: de, pause: () => (Y.forEach(((e2) => {
    e2.pause();
  })), se(), p2), stop: () => {
    Y.forEach(((e2) => {
      e2.stop();
    })), b && (Q(), b = false), j = false, k = false, D2 = true, v = void 0, m = void 0, u2 = void 0, S = 0, T2 = false, w2 = true, F2 = false, M2.forEach(((e2) => e2.c(0, p2))), M2.length = 0;
  }, destroy: (e2) => (Y.forEach(((o2) => {
    o2.destroy(e2);
  })), ((e3) => {
    Q(), e3 && U2();
  })(e2), P2.length = 0, Y.length = 0, y.length = 0, I2.length = 0, K.length = 0, b = false, D2 = true, p2), keyframes: (e2) => {
    const o2 = y !== e2;
    return y = e2, o2 && ((e3) => {
      J && L2().forEach(((o3) => {
        const t5 = o3.effect;
        if (t5.setKeyframes) t5.setKeyframes(e3);
        else {
          const i2 = new KeyframeEffect(t5.target, e3, t5.getTiming());
          o3.effect = i2;
        }
      }));
    })(y), p2;
  }, addAnimation: (e2) => {
    if (null != e2) if (Array.isArray(e2)) for (const o2 of e2) o2.parent(p2), Y.push(o2);
    else e2.parent(p2), Y.push(e2);
    return p2;
  }, addElement: (o2) => {
    if (null != o2) if (1 === o2.nodeType) P2.push(o2);
    else if (o2.length >= 0) for (let e2 = 0; e2 < o2.length; e2++) P2.push(o2[e2]);
    else f("createAnimation - Invalid addElement value.");
    return p2;
  }, update: ae, fill: (e2) => (l2 = e2, ae(true), p2), direction: (e2) => (f2 = e2, ae(true), p2), iterations: (e2) => (d4 = e2, ae(true), p2), duration: (e2) => (J || 0 !== e2 || (e2 = 1), a = e2, ae(true), p2), easing: (e2) => (s2 = e2, ae(true), p2), delay: (e2) => (r3 = e2, ae(true), p2), getWebAnimations: L2, getKeyframes: () => y, getFill: V2, getDirection: X, getDelay: oe, getIterations: ee, getEasing: $, getDuration: _2, afterAddRead: (e2) => (H2.push(e2), p2), afterAddWrite: (e2) => (z.push(e2), p2), afterClearStyles: (e2 = []) => {
    for (const o2 of e2) R2[o2] = "";
    return p2;
  }, afterStyles: (e2 = {}) => (R2 = e2, p2), afterRemoveClass: (e2) => (h2 = n2(h2, e2), p2), afterAddClass: (e2) => (E = n2(E, e2), p2), beforeAddRead: (e2) => (q.push(e2), p2), beforeAddWrite: (e2) => (x.push(e2), p2), beforeClearStyles: (e2 = []) => {
    for (const o2 of e2) C[o2] = "";
    return p2;
  }, beforeStyles: (e2 = {}) => (C = e2, p2), beforeRemoveClass: (e2) => (A2 = n2(A2, e2), p2), beforeAddClass: (e2) => (g = n2(g, e2), p2), onFinish: O2, isRunning: () => 0 !== S && !F2, progressStart: (e2 = false, o2) => (Y.forEach(((t5) => {
    t5.progressStart(e2, o2);
  })), se(), j = e2, b || ie(), ae(false, true, o2), p2), progressStep: (e2) => (Y.forEach(((o2) => {
    o2.progressStep(e2);
  })), ne(e2), p2), progressEnd: (e2, o2, t5) => (j = false, Y.forEach(((i2) => {
    i2.progressEnd(e2, o2, t5);
  })), void 0 !== t5 && (m = t5), T2 = false, w2 = true, 0 === e2 ? (v = "reverse" === X() ? "normal" : "reverse", "reverse" === v && (w2 = false), J ? (ae(), ne(1 - o2)) : (u2 = (1 - o2) * _2() * -1, ae(false, false))) : 1 === e2 && (J ? (ae(), ne(o2)) : (u2 = o2 * _2() * -1, ae(false, false))), void 0 === e2 || c3 || de(), p2) };
};

// node_modules/@ionic/core/components/p-Baq1XyAy.js
var e = (a, i2) => {
  a.componentOnReady ? a.componentOnReady().then(((a2) => i2(a2))) : d2((() => i2(a)));
};
var d2 = (a) => "function" == typeof __zone_symbol__requestAnimationFrame ? __zone_symbol__requestAnimationFrame(a) : "function" == typeof requestAnimationFrame ? requestAnimationFrame(a) : setTimeout(a);

// node_modules/@ionic/core/components/p-CtukzcyX.js
var r2 = "ionViewWillEnter";
var t3 = "ionViewDidEnter";
var s = "ionViewWillLeave";
var c2 = "ionViewDidLeave";
var l = "ionViewWillUnload";
var B2 = (n3) => {
  if (n3.classList.contains("ion-page")) return n3;
  return n3.querySelector(":scope > .ion-page, :scope > ion-nav, :scope > ion-tabs") || n3;
};

export {
  n,
  u,
  Vt,
  o,
  r,
  e,
  r2,
  t3 as t,
  s,
  c2 as c,
  l,
  B2 as B
};
//# sourceMappingURL=chunk-PFVA2UFL.js.map
