(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
  var __async = (__this, __arguments, generator) => {
    return new Promise((resolve, reject) => {
      var fulfilled = (value) => {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      };
      var rejected = (value) => {
        try {
          step(generator.throw(value));
        } catch (e) {
          reject(e);
        }
      };
      var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
      step((generator = generator.apply(__this, __arguments)).next());
    });
  };

  // ../config/dist/constants.js
  var require_constants = __commonJS({
    "../config/dist/constants.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.VELOCE_DEFAULTS = exports.SERVER_KEY = exports.CACHE_DIR = exports.CONTRACT_KEY = exports.SUPPORT_EXT = exports.FILE_NAME = exports.VELOCE_DEFAULT_URL = void 0;
      exports.VELOCE_DEFAULT_URL = "/veloce";
      exports.FILE_NAME = "veloce.config";
      exports.SUPPORT_EXT = ["js", "cjs"];
      exports.CONTRACT_KEY = "contract";
      exports.CACHE_DIR = "cacheDir";
      exports.SERVER_KEY = "server";
      exports.VELOCE_DEFAULTS = {
        [exports.CONTRACT_KEY]: {
          method: "get",
          path: `${exports.VELOCE_DEFAULT_URL}/${exports.CONTRACT_KEY}`
        },
        [exports.SERVER_KEY]: {
          port: 0
        }
      };
    }
  });

  // node_modules/.pnpm/@jsonql+utils@0.6.8/node_modules/@jsonql/utils/jsonql-utils.min.js
  var require_jsonql_utils_min = __commonJS({
    "node_modules/.pnpm/@jsonql+utils@0.6.8/node_modules/@jsonql/utils/jsonql-utils.min.js"(exports, module) {
      (() => {
        var Mn = typeof global == "object" && global && global.Object === Object && global, Pr = Mn;
        var jn = typeof self == "object" && self && self.Object === Object && self, Bn = Pr || jn || Function("return this")(), d = Bn;
        var Wn = d.Symbol, w = Wn;
        var Tt = Object.prototype, Hn = Tt.hasOwnProperty, Un = Tt.toString, yr = w ? w.toStringTag : void 0;
        function Kn(r) {
          var t = Hn.call(r, yr), e = r[yr];
          try {
            r[yr] = void 0;
            var o = true;
          } catch {
          }
          var n = Un.call(r);
          return o && (t ? r[yr] = e : delete r[yr]), n;
        }
        var Rt = Kn;
        var qn = Object.prototype, zn = qn.toString;
        function Yn(r) {
          return zn.call(r);
        }
        var Lt = Yn;
        var Jn = "[object Null]", $n = "[object Undefined]", It = w ? w.toStringTag : void 0;
        function Xn(r) {
          return r == null ? r === void 0 ? $n : Jn : It && It in Object(r) ? Rt(r) : Lt(r);
        }
        var P = Xn;
        function Zn(r) {
          return r != null && typeof r == "object";
        }
        var x = Zn;
        var Qn = "[object Number]";
        function Vn(r) {
          return typeof r == "number" || x(r) && P(r) == Qn;
        }
        var St = Vn;
        function kn(r) {
          return St(r) && r != +r;
        }
        var Or = kn;
        var ri = Array.isArray, g = ri;
        var ti = "[object String]";
        function ei(r) {
          return typeof r == "string" || !g(r) && x(r) && P(r) == ti;
        }
        var V = ei;
        function oi(r, t) {
          return function(e) {
            return r(t(e));
          };
        }
        var wr = oi;
        var ni = wr(Object.getPrototypeOf, Object), Tr = ni;
        var ii = "[object Object]", ai = Function.prototype, fi = Object.prototype, Ct = ai.toString, pi = fi.hasOwnProperty, si = Ct.call(Object);
        function ui(r) {
          if (!x(r) || P(r) != ii)
            return false;
          var t = Tr(r);
          if (t === null)
            return true;
          var e = pi.call(t, "constructor") && t.constructor;
          return typeof e == "function" && e instanceof e && Ct.call(e) == si;
        }
        var I = ui;
        function mi() {
          this.__data__ = [], this.size = 0;
        }
        var Et = mi;
        function li(r, t) {
          return r === t || r !== r && t !== t;
        }
        var L = li;
        function ci(r, t) {
          for (var e = r.length; e--; )
            if (L(r[e][0], t))
              return e;
          return -1;
        }
        var D = ci;
        var di = Array.prototype, gi = di.splice;
        function hi(r) {
          var t = this.__data__, e = D(t, r);
          if (e < 0)
            return false;
          var o = t.length - 1;
          return e == o ? t.pop() : gi.call(t, e, 1), --this.size, true;
        }
        var Ft = hi;
        function yi(r) {
          var t = this.__data__, e = D(t, r);
          return e < 0 ? void 0 : t[e][1];
        }
        var Dt = yi;
        function _i(r) {
          return D(this.__data__, r) > -1;
        }
        var Gt = _i;
        function xi(r, t) {
          var e = this.__data__, o = D(e, r);
          return o < 0 ? (++this.size, e.push([r, t])) : e[o][1] = t, this;
        }
        var Nt = xi;
        function k(r) {
          var t = -1, e = r == null ? 0 : r.length;
          for (this.clear(); ++t < e; ) {
            var o = r[t];
            this.set(o[0], o[1]);
          }
        }
        k.prototype.clear = Et;
        k.prototype.delete = Ft;
        k.prototype.get = Dt;
        k.prototype.has = Gt;
        k.prototype.set = Nt;
        var G = k;
        function bi() {
          this.__data__ = new G(), this.size = 0;
        }
        var Mt = bi;
        function Ai(r) {
          var t = this.__data__, e = t.delete(r);
          return this.size = t.size, e;
        }
        var jt = Ai;
        function vi(r) {
          return this.__data__.get(r);
        }
        var Bt = vi;
        function Pi(r) {
          return this.__data__.has(r);
        }
        var Wt = Pi;
        function Oi(r) {
          var t = typeof r;
          return r != null && (t == "object" || t == "function");
        }
        var b = Oi;
        var wi = "[object AsyncFunction]", Ti = "[object Function]", Ri = "[object GeneratorFunction]", Li = "[object Proxy]";
        function Ii(r) {
          if (!b(r))
            return false;
          var t = P(r);
          return t == Ti || t == Ri || t == wi || t == Li;
        }
        var rr = Ii;
        var Si = d["__core-js_shared__"], Rr = Si;
        var Ht = function() {
          var r = /[^.]+$/.exec(Rr && Rr.keys && Rr.keys.IE_PROTO || "");
          return r ? "Symbol(src)_1." + r : "";
        }();
        function Ci(r) {
          return !!Ht && Ht in r;
        }
        var Ut = Ci;
        var Ei = Function.prototype, Fi = Ei.toString;
        function Di(r) {
          if (r != null) {
            try {
              return Fi.call(r);
            } catch {
            }
            try {
              return r + "";
            } catch {
            }
          }
          return "";
        }
        var S = Di;
        var Gi = /[\\^$.*+?()[\]{}|]/g, Ni = /^\[object .+?Constructor\]$/, Mi = Function.prototype, ji = Object.prototype, Bi = Mi.toString, Wi = ji.hasOwnProperty, Hi = RegExp("^" + Bi.call(Wi).replace(Gi, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
        function Ui(r) {
          if (!b(r) || Ut(r))
            return false;
          var t = rr(r) ? Hi : Ni;
          return t.test(S(r));
        }
        var Kt = Ui;
        function Ki(r, t) {
          return r?.[t];
        }
        var qt = Ki;
        function qi(r, t) {
          var e = qt(r, t);
          return Kt(e) ? e : void 0;
        }
        var T = qi;
        var zi = T(d, "Map"), N = zi;
        var Yi = T(Object, "create"), C = Yi;
        function Ji() {
          this.__data__ = C ? C(null) : {}, this.size = 0;
        }
        var zt = Ji;
        function $i(r) {
          var t = this.has(r) && delete this.__data__[r];
          return this.size -= t ? 1 : 0, t;
        }
        var Yt = $i;
        var Xi = "__lodash_hash_undefined__", Zi = Object.prototype, Qi = Zi.hasOwnProperty;
        function Vi(r) {
          var t = this.__data__;
          if (C) {
            var e = t[r];
            return e === Xi ? void 0 : e;
          }
          return Qi.call(t, r) ? t[r] : void 0;
        }
        var Jt = Vi;
        var ki = Object.prototype, ra = ki.hasOwnProperty;
        function ta(r) {
          var t = this.__data__;
          return C ? t[r] !== void 0 : ra.call(t, r);
        }
        var $t = ta;
        var ea = "__lodash_hash_undefined__";
        function oa(r, t) {
          var e = this.__data__;
          return this.size += this.has(r) ? 0 : 1, e[r] = C && t === void 0 ? ea : t, this;
        }
        var Xt = oa;
        function tr(r) {
          var t = -1, e = r == null ? 0 : r.length;
          for (this.clear(); ++t < e; ) {
            var o = r[t];
            this.set(o[0], o[1]);
          }
        }
        tr.prototype.clear = zt;
        tr.prototype.delete = Yt;
        tr.prototype.get = Jt;
        tr.prototype.has = $t;
        tr.prototype.set = Xt;
        var at = tr;
        function na() {
          this.size = 0, this.__data__ = { hash: new at(), map: new (N || G)(), string: new at() };
        }
        var Zt = na;
        function ia(r) {
          var t = typeof r;
          return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? r !== "__proto__" : r === null;
        }
        var Qt = ia;
        function aa(r, t) {
          var e = r.__data__;
          return Qt(t) ? e[typeof t == "string" ? "string" : "hash"] : e.map;
        }
        var M = aa;
        function fa(r) {
          var t = M(this, r).delete(r);
          return this.size -= t ? 1 : 0, t;
        }
        var Vt = fa;
        function pa(r) {
          return M(this, r).get(r);
        }
        var kt = pa;
        function sa(r) {
          return M(this, r).has(r);
        }
        var re = sa;
        function ua(r, t) {
          var e = M(this, r), o = e.size;
          return e.set(r, t), this.size += e.size == o ? 0 : 1, this;
        }
        var te = ua;
        function er(r) {
          var t = -1, e = r == null ? 0 : r.length;
          for (this.clear(); ++t < e; ) {
            var o = r[t];
            this.set(o[0], o[1]);
          }
        }
        er.prototype.clear = Zt;
        er.prototype.delete = Vt;
        er.prototype.get = kt;
        er.prototype.has = re;
        er.prototype.set = te;
        var z = er;
        var ma = 200;
        function la(r, t) {
          var e = this.__data__;
          if (e instanceof G) {
            var o = e.__data__;
            if (!N || o.length < ma - 1)
              return o.push([r, t]), this.size = ++e.size, this;
            e = this.__data__ = new z(o);
          }
          return e.set(r, t), this.size = e.size, this;
        }
        var ee = la;
        function or(r) {
          var t = this.__data__ = new G(r);
          this.size = t.size;
        }
        or.prototype.clear = Mt;
        or.prototype.delete = jt;
        or.prototype.get = Bt;
        or.prototype.has = Wt;
        or.prototype.set = ee;
        var j = or;
        var ca = function() {
          try {
            var r = T(Object, "defineProperty");
            return r({}, "", {}), r;
          } catch {
          }
        }(), nr = ca;
        function da(r, t, e) {
          t == "__proto__" && nr ? nr(r, t, { configurable: true, enumerable: true, value: e, writable: true }) : r[t] = e;
        }
        var ir = da;
        function ga(r, t, e) {
          (e !== void 0 && !L(r[t], e) || e === void 0 && !(t in r)) && ir(r, t, e);
        }
        var _r = ga;
        function ha(r) {
          return function(t, e, o) {
            for (var n = -1, i = Object(t), f2 = o(t), a = f2.length; a--; ) {
              var p = f2[r ? a : ++n];
              if (e(i[p], p, i) === false)
                break;
            }
            return t;
          };
        }
        var oe = ha;
        var ya = oe(), Lr = ya;
        var fe = typeof exports == "object" && exports && !exports.nodeType && exports, ne = fe && typeof module == "object" && module && !module.nodeType && module, _a = ne && ne.exports === fe, ie = _a ? d.Buffer : void 0, ae = ie ? ie.allocUnsafe : void 0;
        function xa(r, t) {
          if (t)
            return r.slice();
          var e = r.length, o = ae ? ae(e) : new r.constructor(e);
          return r.copy(o), o;
        }
        var pe = xa;
        var ba = d.Uint8Array, ar = ba;
        function Aa(r) {
          var t = new r.constructor(r.byteLength);
          return new ar(t).set(new ar(r)), t;
        }
        var se = Aa;
        function va(r, t) {
          var e = t ? se(r.buffer) : r.buffer;
          return new r.constructor(e, r.byteOffset, r.length);
        }
        var ue = va;
        function Pa(r, t) {
          var e = -1, o = r.length;
          for (t || (t = Array(o)); ++e < o; )
            t[e] = r[e];
          return t;
        }
        var fr = Pa;
        var me = Object.create, Oa = function() {
          function r() {
          }
          return function(t) {
            if (!b(t))
              return {};
            if (me)
              return me(t);
            r.prototype = t;
            var e = new r();
            return r.prototype = void 0, e;
          };
        }(), B = Oa;
        var wa = Object.prototype;
        function Ta(r) {
          var t = r && r.constructor, e = typeof t == "function" && t.prototype || wa;
          return r === e;
        }
        var pr = Ta;
        function Ra(r) {
          return typeof r.constructor == "function" && !pr(r) ? B(Tr(r)) : {};
        }
        var le = Ra;
        var La = "[object Arguments]";
        function Ia(r) {
          return x(r) && P(r) == La;
        }
        var ft = Ia;
        var ce = Object.prototype, Sa = ce.hasOwnProperty, Ca = ce.propertyIsEnumerable, Ea = ft(function() {
          return arguments;
        }()) ? ft : function(r) {
          return x(r) && Sa.call(r, "callee") && !Ca.call(r, "callee");
        }, E = Ea;
        var Fa = 9007199254740991;
        function Da(r) {
          return typeof r == "number" && r > -1 && r % 1 == 0 && r <= Fa;
        }
        var sr = Da;
        function Ga(r) {
          return r != null && sr(r.length) && !rr(r);
        }
        var R = Ga;
        function Na(r) {
          return x(r) && R(r);
        }
        var de = Na;
        function Ma() {
          return false;
        }
        var ge = Ma;
        var _e = typeof exports == "object" && exports && !exports.nodeType && exports, he = _e && typeof module == "object" && module && !module.nodeType && module, ja = he && he.exports === _e, ye = ja ? d.Buffer : void 0, Ba = ye ? ye.isBuffer : void 0, Wa = Ba || ge, Y = Wa;
        var Ha = "[object Arguments]", Ua = "[object Array]", Ka = "[object Boolean]", qa = "[object Date]", za = "[object Error]", Ya = "[object Function]", Ja = "[object Map]", $a = "[object Number]", Xa = "[object Object]", Za = "[object RegExp]", Qa = "[object Set]", Va = "[object String]", ka = "[object WeakMap]", rf = "[object ArrayBuffer]", tf = "[object DataView]", ef = "[object Float32Array]", of = "[object Float64Array]", nf = "[object Int8Array]", af = "[object Int16Array]", ff = "[object Int32Array]", pf = "[object Uint8Array]", sf = "[object Uint8ClampedArray]", uf = "[object Uint16Array]", mf = "[object Uint32Array]", h = {};
        h[ef] = h[of] = h[nf] = h[af] = h[ff] = h[pf] = h[sf] = h[uf] = h[mf] = true;
        h[Ha] = h[Ua] = h[rf] = h[Ka] = h[tf] = h[qa] = h[za] = h[Ya] = h[Ja] = h[$a] = h[Xa] = h[Za] = h[Qa] = h[Va] = h[ka] = false;
        function lf(r) {
          return x(r) && sr(r.length) && !!h[P(r)];
        }
        var xe = lf;
        function cf(r) {
          return function(t) {
            return r(t);
          };
        }
        var be = cf;
        var Ae = typeof exports == "object" && exports && !exports.nodeType && exports, xr = Ae && typeof module == "object" && module && !module.nodeType && module, df = xr && xr.exports === Ae, pt = df && Pr.process, gf = function() {
          try {
            var r = xr && xr.require && xr.require("util").types;
            return r || pt && pt.binding && pt.binding("util");
          } catch {
          }
        }(), st = gf;
        var ve = st && st.isTypedArray, hf = ve ? be(ve) : xe, ur = hf;
        function yf(r, t) {
          if (!(t === "constructor" && typeof r[t] == "function") && t != "__proto__")
            return r[t];
        }
        var br = yf;
        var _f = Object.prototype, xf = _f.hasOwnProperty;
        function bf(r, t, e) {
          var o = r[t];
          (!(xf.call(r, t) && L(o, e)) || e === void 0 && !(t in r)) && ir(r, t, e);
        }
        var Pe = bf;
        function Af(r, t, e, o) {
          var n = !e;
          e || (e = {});
          for (var i = -1, f2 = t.length; ++i < f2; ) {
            var a = t[i], p = o ? o(e[a], r[a], a, e, r) : void 0;
            p === void 0 && (p = r[a]), n ? ir(e, a, p) : Pe(e, a, p);
          }
          return e;
        }
        var Oe = Af;
        function vf(r, t) {
          for (var e = -1, o = Array(r); ++e < r; )
            o[e] = t(e);
          return o;
        }
        var we = vf;
        var Pf = 9007199254740991, Of = /^(?:0|[1-9]\d*)$/;
        function wf(r, t) {
          var e = typeof r;
          return t = t ?? Pf, !!t && (e == "number" || e != "symbol" && Of.test(r)) && r > -1 && r % 1 == 0 && r < t;
        }
        var W = wf;
        var Tf = Object.prototype, Rf = Tf.hasOwnProperty;
        function Lf(r, t) {
          var e = g(r), o = !e && E(r), n = !e && !o && Y(r), i = !e && !o && !n && ur(r), f2 = e || o || n || i, a = f2 ? we(r.length, String) : [], p = a.length;
          for (var s in r)
            (t || Rf.call(r, s)) && !(f2 && (s == "length" || n && (s == "offset" || s == "parent") || i && (s == "buffer" || s == "byteLength" || s == "byteOffset") || W(s, p))) && a.push(s);
          return a;
        }
        var Ir = Lf;
        function If(r) {
          var t = [];
          if (r != null)
            for (var e in Object(r))
              t.push(e);
          return t;
        }
        var Te = If;
        var Sf = Object.prototype, Cf = Sf.hasOwnProperty;
        function Ef(r) {
          if (!b(r))
            return Te(r);
          var t = pr(r), e = [];
          for (var o in r)
            o == "constructor" && (t || !Cf.call(r, o)) || e.push(o);
          return e;
        }
        var Re = Ef;
        function Ff(r) {
          return R(r) ? Ir(r, true) : Re(r);
        }
        var Sr = Ff;
        function Df(r) {
          return Oe(r, Sr(r));
        }
        var Le = Df;
        function Gf(r, t, e, o, n, i, f2) {
          var a = br(r, e), p = br(t, e), s = f2.get(p);
          if (s) {
            _r(r, e, s);
            return;
          }
          var u = i ? i(a, p, e + "", r, t, f2) : void 0, m = u === void 0;
          if (m) {
            var l = g(p), c = !l && Y(p), y = !l && !c && ur(p);
            u = p, l || c || y ? g(a) ? u = a : de(a) ? u = fr(a) : c ? (m = false, u = pe(p, true)) : y ? (m = false, u = ue(p, true)) : u = [] : I(p) || E(p) ? (u = a, E(a) ? u = Le(a) : (!b(a) || rr(a)) && (u = le(p))) : m = false;
          }
          m && (f2.set(p, u), n(u, p, o, i, f2), f2.delete(p)), _r(r, e, u);
        }
        var Ie = Gf;
        function Se(r, t, e, o, n) {
          r !== t && Lr(t, function(i, f2) {
            if (n || (n = new j()), b(i))
              Ie(r, t, f2, e, Se, o, n);
            else {
              var a = o ? o(br(r, f2), i, f2 + "", r, t, n) : void 0;
              a === void 0 && (a = i), _r(r, f2, a);
            }
          }, Sr);
        }
        var Ce = Se;
        function Nf(r) {
          return r;
        }
        var H = Nf;
        function Mf(r, t, e) {
          switch (e.length) {
            case 0:
              return r.call(t);
            case 1:
              return r.call(t, e[0]);
            case 2:
              return r.call(t, e[0], e[1]);
            case 3:
              return r.call(t, e[0], e[1], e[2]);
          }
          return r.apply(t, e);
        }
        var mr = Mf;
        var Ee = Math.max;
        function jf(r, t, e) {
          return t = Ee(t === void 0 ? r.length - 1 : t, 0), function() {
            for (var o = arguments, n = -1, i = Ee(o.length - t, 0), f2 = Array(i); ++n < i; )
              f2[n] = o[t + n];
            n = -1;
            for (var a = Array(t + 1); ++n < t; )
              a[n] = o[n];
            return a[t] = e(f2), mr(r, this, a);
          };
        }
        var Fe = jf;
        function Bf(r) {
          return function() {
            return r;
          };
        }
        var De = Bf;
        var Wf = nr ? function(r, t) {
          return nr(r, "toString", { configurable: true, enumerable: false, value: De(t), writable: true });
        } : H, Ge = Wf;
        var Hf = 800, Uf = 16, Kf = Date.now;
        function qf(r) {
          var t = 0, e = 0;
          return function() {
            var o = Kf(), n = Uf - (o - e);
            if (e = o, n > 0) {
              if (++t >= Hf)
                return arguments[0];
            } else
              t = 0;
            return r.apply(void 0, arguments);
          };
        }
        var Cr = qf;
        var zf = Cr(Ge), Er = zf;
        function Yf(r, t) {
          return Er(Fe(r, t, H), r + "");
        }
        var Ne = Yf;
        function Jf(r, t, e) {
          if (!b(e))
            return false;
          var o = typeof t;
          return (o == "number" ? R(e) && W(t, e.length) : o == "string" && t in e) ? L(e[t], r) : false;
        }
        var Me = Jf;
        function $f(r) {
          return Ne(function(t, e) {
            var o = -1, n = e.length, i = n > 1 ? e[n - 1] : void 0, f2 = n > 2 ? e[2] : void 0;
            for (i = r.length > 3 && typeof i == "function" ? (n--, i) : void 0, f2 && Me(e[0], e[1], f2) && (i = n < 3 ? void 0 : i, n = 1), t = Object(t); ++o < n; ) {
              var a = e[o];
              a && r(t, a, o, i);
            }
            return t;
          });
        }
        var je = $f;
        var Xf = je(function(r, t, e) {
          Ce(r, t, e);
        }), Fr = Xf;
        var Zf = T(d, "WeakMap"), J = Zf;
        var Qf = J && new J(), lr = Qf;
        var Vf = lr ? function(r, t) {
          return lr.set(r, t), r;
        } : H, Dr = Vf;
        function kf(r) {
          return function() {
            var t = arguments;
            switch (t.length) {
              case 0:
                return new r();
              case 1:
                return new r(t[0]);
              case 2:
                return new r(t[0], t[1]);
              case 3:
                return new r(t[0], t[1], t[2]);
              case 4:
                return new r(t[0], t[1], t[2], t[3]);
              case 5:
                return new r(t[0], t[1], t[2], t[3], t[4]);
              case 6:
                return new r(t[0], t[1], t[2], t[3], t[4], t[5]);
              case 7:
                return new r(t[0], t[1], t[2], t[3], t[4], t[5], t[6]);
            }
            var e = B(r.prototype), o = r.apply(e, t);
            return b(o) ? o : e;
          };
        }
        var F = kf;
        var rp = 1;
        function tp(r, t, e) {
          var o = t & rp, n = F(r);
          function i() {
            var f2 = this && this !== d && this instanceof i ? n : r;
            return f2.apply(o ? e : this, arguments);
          }
          return i;
        }
        var Be = tp;
        var ep = Math.max;
        function op(r, t, e, o) {
          for (var n = -1, i = r.length, f2 = e.length, a = -1, p = t.length, s = ep(i - f2, 0), u = Array(p + s), m = !o; ++a < p; )
            u[a] = t[a];
          for (; ++n < f2; )
            (m || n < i) && (u[e[n]] = r[n]);
          for (; s--; )
            u[a++] = r[n++];
          return u;
        }
        var Gr = op;
        var np = Math.max;
        function ip(r, t, e, o) {
          for (var n = -1, i = r.length, f2 = -1, a = e.length, p = -1, s = t.length, u = np(i - a, 0), m = Array(u + s), l = !o; ++n < u; )
            m[n] = r[n];
          for (var c = n; ++p < s; )
            m[c + p] = t[p];
          for (; ++f2 < a; )
            (l || n < i) && (m[c + e[f2]] = r[n++]);
          return m;
        }
        var Nr = ip;
        function ap(r, t) {
          for (var e = r.length, o = 0; e--; )
            r[e] === t && ++o;
          return o;
        }
        var We = ap;
        function fp() {
        }
        var cr = fp;
        var pp = 4294967295;
        function Mr(r) {
          this.__wrapped__ = r, this.__actions__ = [], this.__dir__ = 1, this.__filtered__ = false, this.__iteratees__ = [], this.__takeCount__ = pp, this.__views__ = [];
        }
        Mr.prototype = B(cr.prototype);
        Mr.prototype.constructor = Mr;
        var dr = Mr;
        function sp() {
        }
        var He = sp;
        var up = lr ? function(r) {
          return lr.get(r);
        } : He, jr = up;
        var mp = {}, ut = mp;
        var lp = Object.prototype, cp = lp.hasOwnProperty;
        function dp(r) {
          for (var t = r.name + "", e = ut[t], o = cp.call(ut, t) ? e.length : 0; o--; ) {
            var n = e[o], i = n.func;
            if (i == null || i == r)
              return n.name;
          }
          return t;
        }
        var Ue = dp;
        function Br(r, t) {
          this.__wrapped__ = r, this.__actions__ = [], this.__chain__ = !!t, this.__index__ = 0, this.__values__ = void 0;
        }
        Br.prototype = B(cr.prototype);
        Br.prototype.constructor = Br;
        var Ar = Br;
        function gp(r) {
          if (r instanceof dr)
            return r.clone();
          var t = new Ar(r.__wrapped__, r.__chain__);
          return t.__actions__ = fr(r.__actions__), t.__index__ = r.__index__, t.__values__ = r.__values__, t;
        }
        var Ke = gp;
        var hp = Object.prototype, yp = hp.hasOwnProperty;
        function Wr(r) {
          if (x(r) && !g(r) && !(r instanceof dr)) {
            if (r instanceof Ar)
              return r;
            if (yp.call(r, "__wrapped__"))
              return Ke(r);
          }
          return new Ar(r);
        }
        Wr.prototype = cr.prototype;
        Wr.prototype.constructor = Wr;
        var qe = Wr;
        function _p(r) {
          var t = Ue(r), e = qe[t];
          if (typeof e != "function" || !(t in dr.prototype))
            return false;
          if (r === e)
            return true;
          var o = jr(e);
          return !!o && r === o[0];
        }
        var ze = _p;
        var xp = Cr(Dr), Hr = xp;
        var bp = /\{\n\/\* \[wrapped with (.+)\] \*/, Ap = /,? & /;
        function vp(r) {
          var t = r.match(bp);
          return t ? t[1].split(Ap) : [];
        }
        var Ye = vp;
        var Pp = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/;
        function Op(r, t) {
          var e = t.length;
          if (!e)
            return r;
          var o = e - 1;
          return t[o] = (e > 1 ? "& " : "") + t[o], t = t.join(e > 2 ? ", " : " "), r.replace(Pp, `{
/* [wrapped with ` + t + `] */
`);
        }
        var Je = Op;
        function wp(r, t) {
          for (var e = -1, o = r == null ? 0 : r.length; ++e < o && t(r[e], e, r) !== false; )
            ;
          return r;
        }
        var $e = wp;
        function Tp(r, t, e, o) {
          for (var n = r.length, i = e + (o ? 1 : -1); o ? i-- : ++i < n; )
            if (t(r[i], i, r))
              return i;
          return -1;
        }
        var Xe = Tp;
        function Rp(r) {
          return r !== r;
        }
        var Ze = Rp;
        function Lp(r, t, e) {
          for (var o = e - 1, n = r.length; ++o < n; )
            if (r[o] === t)
              return o;
          return -1;
        }
        var Qe = Lp;
        function Ip(r, t, e) {
          return t === t ? Qe(r, t, e) : Xe(r, Ze, e);
        }
        var Ve = Ip;
        function Sp(r, t) {
          var e = r == null ? 0 : r.length;
          return !!e && Ve(r, t, 0) > -1;
        }
        var ke = Sp;
        var Cp = 1, Ep = 2, Fp = 8, Dp = 16, Gp = 32, Np = 64, Mp = 128, jp = 256, Bp = 512, Wp = [["ary", Mp], ["bind", Cp], ["bindKey", Ep], ["curry", Fp], ["curryRight", Dp], ["flip", Bp], ["partial", Gp], ["partialRight", Np], ["rearg", jp]];
        function Hp(r, t) {
          return $e(Wp, function(e) {
            var o = "_." + e[0];
            t & e[1] && !ke(r, o) && r.push(o);
          }), r.sort();
        }
        var ro = Hp;
        function Up(r, t, e) {
          var o = t + "";
          return Er(r, Je(o, ro(Ye(o), e)));
        }
        var Ur = Up;
        var Kp = 1, qp = 2, zp = 4, Yp = 8, to = 32, eo = 64;
        function Jp(r, t, e, o, n, i, f2, a, p, s) {
          var u = t & Yp, m = u ? f2 : void 0, l = u ? void 0 : f2, c = u ? i : void 0, y = u ? void 0 : i;
          t |= u ? to : eo, t &= ~(u ? eo : to), t & zp || (t &= ~(Kp | qp));
          var A = [r, t, n, c, m, y, l, a, p, s], v = e.apply(void 0, A);
          return ze(r) && Hr(v, A), v.placeholder = o, Ur(v, r, t);
        }
        var Kr = Jp;
        function $p(r) {
          var t = r;
          return t.placeholder;
        }
        var qr = $p;
        var Xp = Math.min;
        function Zp(r, t) {
          for (var e = r.length, o = Xp(t.length, e), n = fr(r); o--; ) {
            var i = t[o];
            r[o] = W(i, e) ? n[i] : void 0;
          }
          return r;
        }
        var oo = Zp;
        var no = "__lodash_placeholder__";
        function Qp(r, t) {
          for (var e = -1, o = r.length, n = 0, i = []; ++e < o; ) {
            var f2 = r[e];
            (f2 === t || f2 === no) && (r[e] = no, i[n++] = e);
          }
          return i;
        }
        var $ = Qp;
        var Vp = 1, kp = 2, rs = 8, ts = 16, es = 128, os = 512;
        function io(r, t, e, o, n, i, f2, a, p, s) {
          var u = t & es, m = t & Vp, l = t & kp, c = t & (rs | ts), y = t & os, A = l ? void 0 : F(r);
          function v() {
            for (var O = arguments.length, _ = Array(O), Z = O; Z--; )
              _[Z] = arguments[Z];
            if (c)
              var q = qr(v), Q = We(_, q);
            if (o && (_ = Gr(_, o, n, c)), i && (_ = Nr(_, i, f2, c)), O -= Q, c && O < s) {
              var Nn = $(_, q);
              return Kr(r, t, io, v.placeholder, e, _, Nn, a, p, s - O);
            }
            var wt = m ? e : this, it = l ? wt[r] : r;
            return O = _.length, a ? _ = oo(_, a) : y && O > 1 && _.reverse(), u && p < O && (_.length = p), this && this !== d && this instanceof v && (it = A || F(it)), it.apply(wt, _);
          }
          return v;
        }
        var zr = io;
        function ns(r, t, e) {
          var o = F(r);
          function n() {
            for (var i = arguments.length, f2 = Array(i), a = i, p = qr(n); a--; )
              f2[a] = arguments[a];
            var s = i < 3 && f2[0] !== p && f2[i - 1] !== p ? [] : $(f2, p);
            if (i -= s.length, i < e)
              return Kr(r, t, zr, n.placeholder, void 0, f2, s, void 0, void 0, e - i);
            var u = this && this !== d && this instanceof n ? o : r;
            return mr(u, this, f2);
          }
          return n;
        }
        var ao = ns;
        var is = 1;
        function as(r, t, e, o) {
          var n = t & is, i = F(r);
          function f2() {
            for (var a = -1, p = arguments.length, s = -1, u = o.length, m = Array(u + p), l = this && this !== d && this instanceof f2 ? i : r; ++s < u; )
              m[s] = o[s];
            for (; p--; )
              m[s++] = arguments[++a];
            return mr(l, n ? e : this, m);
          }
          return f2;
        }
        var fo = as;
        var po = "__lodash_placeholder__", mt = 1, fs = 2, ps = 4, so = 8, vr = 128, uo = 256, ss = Math.min;
        function us(r, t) {
          var e = r[1], o = t[1], n = e | o, i = n < (mt | fs | vr), f2 = o == vr && e == so || o == vr && e == uo && r[7].length <= t[8] || o == (vr | uo) && t[7].length <= t[8] && e == so;
          if (!(i || f2))
            return r;
          o & mt && (r[2] = t[2], n |= e & mt ? 0 : ps);
          var a = t[3];
          if (a) {
            var p = r[3];
            r[3] = p ? Gr(p, a, t[4]) : a, r[4] = p ? $(r[3], po) : t[4];
          }
          return a = t[5], a && (p = r[5], r[5] = p ? Nr(p, a, t[6]) : a, r[6] = p ? $(r[5], po) : t[6]), a = t[7], a && (r[7] = a), o & vr && (r[8] = r[8] == null ? t[8] : ss(r[8], t[8])), r[9] == null && (r[9] = t[9]), r[0] = t[0], r[1] = n, r;
        }
        var mo = us;
        var ms = /\s/;
        function ls(r) {
          for (var t = r.length; t-- && ms.test(r.charAt(t)); )
            ;
          return t;
        }
        var lo = ls;
        var cs = /^\s+/;
        function ds(r) {
          return r && r.slice(0, lo(r) + 1).replace(cs, "");
        }
        var co = ds;
        var gs = "[object Symbol]";
        function hs(r) {
          return typeof r == "symbol" || x(r) && P(r) == gs;
        }
        var U = hs;
        var go = 0 / 0, ys = /^[-+]0x[0-9a-f]+$/i, _s = /^0b[01]+$/i, xs = /^0o[0-7]+$/i, bs = parseInt;
        function As(r) {
          if (typeof r == "number")
            return r;
          if (U(r))
            return go;
          if (b(r)) {
            var t = typeof r.valueOf == "function" ? r.valueOf() : r;
            r = b(t) ? t + "" : t;
          }
          if (typeof r != "string")
            return r === 0 ? r : +r;
          r = co(r);
          var e = _s.test(r);
          return e || xs.test(r) ? bs(r.slice(2), e ? 2 : 8) : ys.test(r) ? go : +r;
        }
        var ho = As;
        var yo = 1 / 0, vs = 17976931348623157e292;
        function Ps(r) {
          if (!r)
            return r === 0 ? r : 0;
          if (r = ho(r), r === yo || r === -yo) {
            var t = r < 0 ? -1 : 1;
            return t * vs;
          }
          return r === r ? r : 0;
        }
        var _o = Ps;
        function Os(r) {
          var t = _o(r), e = t % 1;
          return t === t ? e ? t - e : t : 0;
        }
        var lt = Os;
        var ws = "Expected a function", xo = 1, Ts = 2, ct = 8, dt = 16, gt = 32, bo = 64, Ao = Math.max;
        function Rs(r, t, e, o, n, i, f2, a) {
          var p = t & Ts;
          if (!p && typeof r != "function")
            throw new TypeError(ws);
          var s = o ? o.length : 0;
          if (s || (t &= ~(gt | bo), o = n = void 0), f2 = f2 === void 0 ? f2 : Ao(lt(f2), 0), a = a === void 0 ? a : lt(a), s -= n ? n.length : 0, t & bo) {
            var u = o, m = n;
            o = n = void 0;
          }
          var l = p ? void 0 : jr(r), c = [r, t, e, o, n, u, m, i, f2, a];
          if (l && mo(c, l), r = c[0], t = c[1], e = c[2], o = c[3], n = c[4], a = c[9] = c[9] === void 0 ? p ? 0 : r.length : Ao(c[9] - s, 0), !a && t & (ct | dt) && (t &= ~(ct | dt)), !t || t == xo)
            var y = Be(r, t, e);
          else
            t == ct || t == dt ? y = ao(r, t, a) : (t == gt || t == (xo | gt)) && !n.length ? y = fo(r, t, e, o) : y = zr.apply(void 0, c);
          var A = l ? Dr : Hr;
          return Ur(A(y, c), r, t);
        }
        var vo = Rs;
        var Ls = 8;
        function ht(r, t, e) {
          t = e ? void 0 : t;
          var o = vo(r, Ls, void 0, void 0, void 0, void 0, void 0, t);
          return o.placeholder = ht.placeholder, o;
        }
        ht.placeholder = {};
        var Po = ht;
        function Is(r, t) {
          for (var e = -1, o = t.length, n = r.length; ++e < o; )
            r[n + e] = t[e];
          return r;
        }
        var Yr = Is;
        var Oo = w ? w.isConcatSpreadable : void 0;
        function Ss(r) {
          return g(r) || E(r) || !!(Oo && r && r[Oo]);
        }
        var wo = Ss;
        function To(r, t, e, o, n) {
          var i = -1, f2 = r.length;
          for (e || (e = wo), n || (n = []); ++i < f2; ) {
            var a = r[i];
            t > 0 && e(a) ? t > 1 ? To(a, t - 1, e, o, n) : Yr(n, a) : o || (n[n.length] = a);
          }
          return n;
        }
        var Ro = To;
        function Cs(r, t) {
          for (var e = -1, o = r == null ? 0 : r.length, n = Array(o); ++e < o; )
            n[e] = t(r[e], e, r);
          return n;
        }
        var Jr = Cs;
        var Es = "__lodash_hash_undefined__";
        function Fs(r) {
          return this.__data__.set(r, Es), this;
        }
        var Lo = Fs;
        function Ds(r) {
          return this.__data__.has(r);
        }
        var Io = Ds;
        function $r(r) {
          var t = -1, e = r == null ? 0 : r.length;
          for (this.__data__ = new z(); ++t < e; )
            this.add(r[t]);
        }
        $r.prototype.add = $r.prototype.push = Lo;
        $r.prototype.has = Io;
        var So = $r;
        function Gs(r, t) {
          for (var e = -1, o = r == null ? 0 : r.length; ++e < o; )
            if (t(r[e], e, r))
              return true;
          return false;
        }
        var Co = Gs;
        function Ns(r, t) {
          return r.has(t);
        }
        var Eo = Ns;
        var Ms = 1, js = 2;
        function Bs(r, t, e, o, n, i) {
          var f2 = e & Ms, a = r.length, p = t.length;
          if (a != p && !(f2 && p > a))
            return false;
          var s = i.get(r), u = i.get(t);
          if (s && u)
            return s == t && u == r;
          var m = -1, l = true, c = e & js ? new So() : void 0;
          for (i.set(r, t), i.set(t, r); ++m < a; ) {
            var y = r[m], A = t[m];
            if (o)
              var v = f2 ? o(A, y, m, t, r, i) : o(y, A, m, r, t, i);
            if (v !== void 0) {
              if (v)
                continue;
              l = false;
              break;
            }
            if (c) {
              if (!Co(t, function(O, _) {
                if (!Eo(c, _) && (y === O || n(y, O, e, o, i)))
                  return c.push(_);
              })) {
                l = false;
                break;
              }
            } else if (!(y === A || n(y, A, e, o, i))) {
              l = false;
              break;
            }
          }
          return i.delete(r), i.delete(t), l;
        }
        var Xr = Bs;
        function Ws(r) {
          var t = -1, e = Array(r.size);
          return r.forEach(function(o, n) {
            e[++t] = [n, o];
          }), e;
        }
        var Fo = Ws;
        function Hs(r) {
          var t = -1, e = Array(r.size);
          return r.forEach(function(o) {
            e[++t] = o;
          }), e;
        }
        var Do = Hs;
        var Us = 1, Ks = 2, qs = "[object Boolean]", zs = "[object Date]", Ys = "[object Error]", Js = "[object Map]", $s = "[object Number]", Xs = "[object RegExp]", Zs = "[object Set]", Qs = "[object String]", Vs = "[object Symbol]", ks = "[object ArrayBuffer]", ru = "[object DataView]", Go = w ? w.prototype : void 0, yt = Go ? Go.valueOf : void 0;
        function tu(r, t, e, o, n, i, f2) {
          switch (e) {
            case ru:
              if (r.byteLength != t.byteLength || r.byteOffset != t.byteOffset)
                return false;
              r = r.buffer, t = t.buffer;
            case ks:
              return !(r.byteLength != t.byteLength || !i(new ar(r), new ar(t)));
            case qs:
            case zs:
            case $s:
              return L(+r, +t);
            case Ys:
              return r.name == t.name && r.message == t.message;
            case Xs:
            case Qs:
              return r == t + "";
            case Js:
              var a = Fo;
            case Zs:
              var p = o & Us;
              if (a || (a = Do), r.size != t.size && !p)
                return false;
              var s = f2.get(r);
              if (s)
                return s == t;
              o |= Ks, f2.set(r, t);
              var u = Xr(a(r), a(t), o, n, i, f2);
              return f2.delete(r), u;
            case Vs:
              if (yt)
                return yt.call(r) == yt.call(t);
          }
          return false;
        }
        var No = tu;
        function eu(r, t, e) {
          var o = t(r);
          return g(r) ? o : Yr(o, e(r));
        }
        var Mo = eu;
        function ou(r, t) {
          for (var e = -1, o = r == null ? 0 : r.length, n = 0, i = []; ++e < o; ) {
            var f2 = r[e];
            t(f2, e, r) && (i[n++] = f2);
          }
          return i;
        }
        var jo = ou;
        function nu() {
          return [];
        }
        var Bo = nu;
        var iu = Object.prototype, au = iu.propertyIsEnumerable, Wo = Object.getOwnPropertySymbols, fu = Wo ? function(r) {
          return r == null ? [] : (r = Object(r), jo(Wo(r), function(t) {
            return au.call(r, t);
          }));
        } : Bo, Ho = fu;
        var pu = wr(Object.keys, Object), Uo = pu;
        var su = Object.prototype, uu = su.hasOwnProperty;
        function mu(r) {
          if (!pr(r))
            return Uo(r);
          var t = [];
          for (var e in Object(r))
            uu.call(r, e) && e != "constructor" && t.push(e);
          return t;
        }
        var Ko = mu;
        function lu(r) {
          return R(r) ? Ir(r) : Ko(r);
        }
        var gr = lu;
        function cu(r) {
          return Mo(r, gr, Ho);
        }
        var _t = cu;
        var du = 1, gu = Object.prototype, hu = gu.hasOwnProperty;
        function yu(r, t, e, o, n, i) {
          var f2 = e & du, a = _t(r), p = a.length, s = _t(t), u = s.length;
          if (p != u && !f2)
            return false;
          for (var m = p; m--; ) {
            var l = a[m];
            if (!(f2 ? l in t : hu.call(t, l)))
              return false;
          }
          var c = i.get(r), y = i.get(t);
          if (c && y)
            return c == t && y == r;
          var A = true;
          i.set(r, t), i.set(t, r);
          for (var v = f2; ++m < p; ) {
            l = a[m];
            var O = r[l], _ = t[l];
            if (o)
              var Z = f2 ? o(_, O, l, t, r, i) : o(O, _, l, r, t, i);
            if (!(Z === void 0 ? O === _ || n(O, _, e, o, i) : Z)) {
              A = false;
              break;
            }
            v || (v = l == "constructor");
          }
          if (A && !v) {
            var q = r.constructor, Q = t.constructor;
            q != Q && "constructor" in r && "constructor" in t && !(typeof q == "function" && q instanceof q && typeof Q == "function" && Q instanceof Q) && (A = false);
          }
          return i.delete(r), i.delete(t), A;
        }
        var qo = yu;
        var _u = T(d, "DataView"), Zr = _u;
        var xu = T(d, "Promise"), Qr = xu;
        var bu = T(d, "Set"), Vr = bu;
        var zo = "[object Map]", Au = "[object Object]", Yo = "[object Promise]", Jo = "[object Set]", $o = "[object WeakMap]", Xo = "[object DataView]", vu = S(Zr), Pu = S(N), Ou = S(Qr), wu = S(Vr), Tu = S(J), X = P;
        (Zr && X(new Zr(new ArrayBuffer(1))) != Xo || N && X(new N()) != zo || Qr && X(Qr.resolve()) != Yo || Vr && X(new Vr()) != Jo || J && X(new J()) != $o) && (X = function(r) {
          var t = P(r), e = t == Au ? r.constructor : void 0, o = e ? S(e) : "";
          if (o)
            switch (o) {
              case vu:
                return Xo;
              case Pu:
                return zo;
              case Ou:
                return Yo;
              case wu:
                return Jo;
              case Tu:
                return $o;
            }
          return t;
        });
        var xt = X;
        var Ru = 1, Zo = "[object Arguments]", Qo = "[object Array]", kr = "[object Object]", Lu = Object.prototype, Vo = Lu.hasOwnProperty;
        function Iu(r, t, e, o, n, i) {
          var f2 = g(r), a = g(t), p = f2 ? Qo : xt(r), s = a ? Qo : xt(t);
          p = p == Zo ? kr : p, s = s == Zo ? kr : s;
          var u = p == kr, m = s == kr, l = p == s;
          if (l && Y(r)) {
            if (!Y(t))
              return false;
            f2 = true, u = false;
          }
          if (l && !u)
            return i || (i = new j()), f2 || ur(r) ? Xr(r, t, e, o, n, i) : No(r, t, p, e, o, n, i);
          if (!(e & Ru)) {
            var c = u && Vo.call(r, "__wrapped__"), y = m && Vo.call(t, "__wrapped__");
            if (c || y) {
              var A = c ? r.value() : r, v = y ? t.value() : t;
              return i || (i = new j()), n(A, v, e, o, i);
            }
          }
          return l ? (i || (i = new j()), qo(r, t, e, o, n, i)) : false;
        }
        var ko = Iu;
        function rn(r, t, e, o, n) {
          return r === t ? true : r == null || t == null || !x(r) && !x(t) ? r !== r && t !== t : ko(r, t, e, o, rn, n);
        }
        var rt = rn;
        var Su = 1, Cu = 2;
        function Eu(r, t, e, o) {
          var n = e.length, i = n, f2 = !o;
          if (r == null)
            return !i;
          for (r = Object(r); n--; ) {
            var a = e[n];
            if (f2 && a[2] ? a[1] !== r[a[0]] : !(a[0] in r))
              return false;
          }
          for (; ++n < i; ) {
            a = e[n];
            var p = a[0], s = r[p], u = a[1];
            if (f2 && a[2]) {
              if (s === void 0 && !(p in r))
                return false;
            } else {
              var m = new j();
              if (o)
                var l = o(s, u, p, r, t, m);
              if (!(l === void 0 ? rt(u, s, Su | Cu, o, m) : l))
                return false;
            }
          }
          return true;
        }
        var tn = Eu;
        function Fu(r) {
          return r === r && !b(r);
        }
        var tt = Fu;
        function Du(r) {
          for (var t = gr(r), e = t.length; e--; ) {
            var o = t[e], n = r[o];
            t[e] = [o, n, tt(n)];
          }
          return t;
        }
        var en = Du;
        function Gu(r, t) {
          return function(e) {
            return e == null ? false : e[r] === t && (t !== void 0 || r in Object(e));
          };
        }
        var et = Gu;
        function Nu(r) {
          var t = en(r);
          return t.length == 1 && t[0][2] ? et(t[0][0], t[0][1]) : function(e) {
            return e === r || tn(e, r, t);
          };
        }
        var on = Nu;
        var Mu = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, ju = /^\w*$/;
        function Bu(r, t) {
          if (g(r))
            return false;
          var e = typeof r;
          return e == "number" || e == "symbol" || e == "boolean" || r == null || U(r) ? true : ju.test(r) || !Mu.test(r) || t != null && r in Object(t);
        }
        var hr = Bu;
        var Wu = "Expected a function";
        function bt(r, t) {
          if (typeof r != "function" || t != null && typeof t != "function")
            throw new TypeError(Wu);
          var e = function() {
            var o = arguments, n = t ? t.apply(this, o) : o[0], i = e.cache;
            if (i.has(n))
              return i.get(n);
            var f2 = r.apply(this, o);
            return e.cache = i.set(n, f2) || i, f2;
          };
          return e.cache = new (bt.Cache || z)(), e;
        }
        bt.Cache = z;
        var nn = bt;
        var Hu = 500;
        function Uu(r) {
          var t = nn(r, function(o) {
            return e.size === Hu && e.clear(), o;
          }), e = t.cache;
          return t;
        }
        var an = Uu;
        var Ku = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, qu = /\\(\\)?/g, zu = an(function(r) {
          var t = [];
          return r.charCodeAt(0) === 46 && t.push(""), r.replace(Ku, function(e, o, n, i) {
            t.push(n ? i.replace(qu, "$1") : o || e);
          }), t;
        }), fn = zu;
        var Yu = 1 / 0, pn = w ? w.prototype : void 0, sn = pn ? pn.toString : void 0;
        function un(r) {
          if (typeof r == "string")
            return r;
          if (g(r))
            return Jr(r, un) + "";
          if (U(r))
            return sn ? sn.call(r) : "";
          var t = r + "";
          return t == "0" && 1 / r == -Yu ? "-0" : t;
        }
        var mn = un;
        function Ju(r) {
          return r == null ? "" : mn(r);
        }
        var ln = Ju;
        function $u(r, t) {
          return g(r) ? r : hr(r, t) ? [r] : fn(ln(r));
        }
        var ot = $u;
        var Xu = 1 / 0;
        function Zu(r) {
          if (typeof r == "string" || U(r))
            return r;
          var t = r + "";
          return t == "0" && 1 / r == -Xu ? "-0" : t;
        }
        var K = Zu;
        function Qu(r, t) {
          t = ot(t, r);
          for (var e = 0, o = t.length; r != null && e < o; )
            r = r[K(t[e++])];
          return e && e == o ? r : void 0;
        }
        var nt = Qu;
        function Vu(r, t, e) {
          var o = r == null ? void 0 : nt(r, t);
          return o === void 0 ? e : o;
        }
        var cn = Vu;
        function ku(r, t) {
          return r != null && t in Object(r);
        }
        var dn = ku;
        function rm(r, t, e) {
          t = ot(t, r);
          for (var o = -1, n = t.length, i = false; ++o < n; ) {
            var f2 = K(t[o]);
            if (!(i = r != null && e(r, f2)))
              break;
            r = r[f2];
          }
          return i || ++o != n ? i : (n = r == null ? 0 : r.length, !!n && sr(n) && W(f2, n) && (g(r) || E(r)));
        }
        var gn = rm;
        function tm(r, t) {
          return r != null && gn(r, t, dn);
        }
        var hn = tm;
        var em = 1, om = 2;
        function nm(r, t) {
          return hr(r) && tt(t) ? et(K(r), t) : function(e) {
            var o = cn(e, r);
            return o === void 0 && o === t ? hn(e, r) : rt(t, o, em | om);
          };
        }
        var yn = nm;
        function im(r) {
          return function(t) {
            return t?.[r];
          };
        }
        var _n = im;
        function am(r) {
          return function(t) {
            return nt(t, r);
          };
        }
        var xn = am;
        function fm(r) {
          return hr(r) ? _n(K(r)) : xn(r);
        }
        var bn = fm;
        function pm(r) {
          return typeof r == "function" ? r : r == null ? H : typeof r == "object" ? g(r) ? yn(r[0], r[1]) : on(r) : bn(r);
        }
        var An = pm;
        function sm(r, t) {
          return r && Lr(r, t, gr);
        }
        var vn = sm;
        function um(r, t) {
          return function(e, o) {
            if (e == null)
              return e;
            if (!R(e))
              return r(e, o);
            for (var n = e.length, i = t ? n : -1, f2 = Object(e); (t ? i-- : ++i < n) && o(f2[i], i, f2) !== false; )
              ;
            return e;
          };
        }
        var Pn = um;
        var mm = Pn(vn), On = mm;
        function lm(r, t) {
          var e = -1, o = R(r) ? Array(r.length) : [];
          return On(r, function(n, i, f2) {
            o[++e] = t(n, i, f2);
          }), o;
        }
        var wn = lm;
        function cm(r, t) {
          var e = g(r) ? Jr : wn;
          return e(r, An(t, 3));
        }
        var Tn = cm;
        function dm(r, t) {
          return Ro(Tn(r, t), 1);
        }
        var At = dm;
        function vt(r, t = false) {
          let e = parseFloat(r);
          if (!Or(e))
            return e;
          if (t)
            throw new Error(`${r} is not number like`);
          return r;
        }
        function gm(r, t = false) {
          let e = r.toLowerCase();
          if (e === "false")
            return false;
          if (e === "true")
            return true;
          if (t)
            throw new Error(`${r} is not boolean like`);
          return r;
        }
        function hm(r, t) {
          if (t.indexOf(".") > -1) {
            let e = t.split(".").map((i) => vt(i)), o = e.length, n = null;
            for (let i = 0; i < o; ++i) {
              let f2 = e[i];
              n !== null ? n = n[f2] : n = r[f2];
            }
            return n;
          }
          return r[t];
        }
        var Rn = (r, t) => !!r.filter((e) => e === t).length, Pt = (r) => Array.isArray(r) ? r : [r], Ln = (r) => r && Object.keys(r).length === 0 && r.constructor === Object, ym = (r, t = true) => {
          try {
            return V(r) ? JSON.parse(r) : JSON.parse(JSON.stringify(r));
          } catch (e) {
            if (t)
              return r;
            throw e;
          }
        }, _m = (r, t) => {
          try {
            let e = Object.keys(r);
            return Rn(e, t);
          } catch (e) {
            return false;
          }
        }, xm = (...r) => r.join("_"), bm = (r, t) => t && I(t) && r in t ? t[r] : void 0, In = (r) => r != null && (r + "").trim() !== "";
        function Sn(r, t = false) {
          return Array.isArray(r) ? t ? !!r.length : false : I(r) ? t ? !Ln(r) : false : In(r);
        }
        var Am = (r, t) => !Sn(r, t), vm = (r) => typeof r == "function" ? true : (console.error(`Expect to be Function type! Got ${typeof r}`), false), Pm = (...r) => Reflect.apply(Object.assign, Object, r), Om = () => false, wm = (r) => Object.freeze(r), Tm = (r) => {
          console.dir(r, { depth: null });
        };
        function Rm(r, ...t) {
          return r.replace(/{([0-9]+)}/g, (e, o) => typeof t[o] == "undefined" ? e : t[o]);
        }
        var Lm = (r, ...t) => (...e) => t.reduce((o, n) => Reflect.apply(n, null, Pt(o)), Reflect.apply(r, null, e));
        function Im(r, t = false) {
          return r.reduce((e, o) => e.then((n) => o.then((i) => t === false ? [...n, i] : Fr(n, i))), Promise.resolve(t === false ? [] : I(t) ? t : {}));
        }
        function Cn(r, ...t) {
          return (...e) => t.reduce((o, n) => o.then((i) => n(i)), Reflect.apply(r, null, e));
        }
        function Sm(r, ...t) {
          let e = At(r), o = Reflect.apply(Cn, null, e);
          return Reflect.apply(o, null, t);
        }
        var Cm = (r) => Em(r.trim().replace(/([A-Z])/g, "-$1").replace(/[-_\s]+/g, "-").toLowerCase()), Em = (r) => {
          let t = r.substring(0, 1);
          return t !== "_" && t !== "-" ? r : r.substring(1);
        };
        function Fm(...r) {
          try {
            window && window.DEBUG && Reflect.apply(console.log, console, r);
          } catch (t) {
          }
        }
        var Dm = (r) => {
          let t = [r];
          return (...e) => {
            try {
              window && window.JSONQL_DEBUG && Reflect.apply(console.info, console, t.concat(e));
            } catch (o) {
            }
          };
        };
        function Gm(r, t, e, o = null) {
          return Object.getOwnPropertyDescriptor(r, t) === void 0 && Object.defineProperty(r, t, { set: e, get: o === null ? function() {
            return null;
          } : o }), r;
        }
        function En(r, t) {
          let e = Object.getOwnPropertyDescriptor(r, t);
          return e !== void 0 && e.value ? e.value : e;
        }
        function Nm(r, t, e, o = false) {
          let n = En(r, t);
          return o === false && n !== void 0 || Object.defineProperty(r, t, { value: e, writable: o }), r;
        }
        function Fn(r) {
          return r instanceof RegExp;
        }
        function Mm(r) {
          switch (true) {
            case Fn(r) === true:
              return r;
            case V(r) === true:
              return new RegExp(r);
            default:
              return false;
          }
        }
        var Ot = (r = false) => {
          let t = Date.now();
          return r ? Math.floor(t / 1e3) : t;
        };
        var Dn = (r, t) => {
          let e = [];
          for (let o in t)
            e.push([o, t[o]].join("="));
          return [r, e.join("&")].join("?");
        }, jm = (r) => Dn(r, Gn()), Gn = () => ({ _cb: Ot() });
      })();
    }
  });

  // node_modules/.pnpm/@jsonql+constants@0.7.2/node_modules/@jsonql/constants/main.js
  var require_main = __commonJS({
    "node_modules/.pnpm/@jsonql+constants@0.7.2/node_modules/@jsonql/constants/main.js"(exports, module) {
      module.exports = {
        "EXPORT_TYPE": "ExportDeclaration",
        "EXPORT_DEFAULT_TYPE": "ExportDefaultDeclaration",
        "DECLARATION_NAME": "declaration",
        "DECLARATION_SHORT_NAME": "decl",
        "ANNOTATION_NAME": "typeAnnotation",
        "PARAMETER_NAME": "Parameter",
        "CLASS_TYPE": "ClassDeclaration",
        "CLASS_METHOD": "ClassMethod",
        "CLASS_EXP": "ClassExpression",
        "FUNC_EXP": "FunctionExpression",
        "ASSIGN_PATTERN": "AssignmentPattern",
        "OBJ_EXP": "ObjectExpression",
        "ARR_EXP": "ArrayExpression",
        "BOO_LIT": "BooleanLiteral",
        "NUM_LIT": "NumericLiteral",
        "STR_LIT": "StringLiteral",
        "ELEM_TYPE": "elemType",
        "TYPE_NAME": "typeName",
        "TYPE_PARAMS": "typeParams",
        "TS_KEY_TYPE": "TsKeywordType",
        "TS_UNION_TYPE": "TsUnionType",
        "TS_ARRAY_TYPE": "TsArrayType",
        "TS_ANNO_NAME": "TsTypeAnnotation",
        "TS_TYPE_LIT": "TsTypeLiteral",
        "TS_TYPE_REF": "TsTypeReference",
        "TS_TYPE_NAME": "tstype",
        "SPREAD_ARG_TYPE": "RestElement",
        "EXT": "js",
        "TS_EXT": "ts",
        "HELLO": "Hello world!",
        "HELLO_FN": "helloWorld",
        "HEADERS_KEY": "headers",
        "JSONQL_PATH": "jsonql",
        "CONTENT_TYPE": "application/vnd.api+json",
        "CHARSET": "charset=utf-8",
        "DEFAULT_HEADER": {
          "Accept": "application/vnd.api+json",
          "Content-Type": "application/vnd.api+jsoncharset=utf-8"
        },
        "DEFAULT_TYPE": "any",
        "DEFAULT_RESOLVER_LIST_FILE_NAME": "resolver.js",
        "DEFAULT_RESOLVER_IMPORT_FILE_NAME": "import.js",
        "MODULE_TYPE": "module",
        "SCRIPT_TYPE": "script",
        "QUERY_NAME": "query",
        "MUTATION_NAME": "mutation",
        "SOCKET_NAME": "socket",
        "SOCKET_AUTH_NAME": "socket-auth",
        "EXTERNAL_NAME": "external",
        "INTERCEPTOR_NAME": "interceptor",
        "PLUGIN_NAME": "plugin",
        "CONTRACT_NAME": "contract",
        "MIDDLEWARE_NAME": "middleware",
        "RESOLVER_TYPES": [
          "query",
          "mutation",
          "socket",
          "socket-auth"
        ],
        "PAYLOAD_PARAM_NAME": "payload",
        "CONDITION_PARAM_NAME": "condition",
        "RESOLVER_PARAM_NAME": "resolverName",
        "QUERY_ARG_NAME": "args",
        "TIMESTAMP_PARAM_NAME": "TS",
        "MUTATION_ARGS": [
          "resolverName",
          "payload",
          "condition"
        ],
        "JSONP_CALLBACK_NAME": "jsonqlJsonpCallback",
        "API_REQUEST_METHODS": [
          "POST",
          "PUT"
        ],
        "CONTRACT_REQUEST_METHODS": [
          "GET",
          "HEAD"
        ],
        "KEY_WORD": "continue",
        "PUBLIC_KEY": "public",
        "PRIVATE_KEY": "private",
        "AUTH_TYPE": "auth",
        "AUTH_NAME": "auth",
        "LOGIN_FN_NAME": "login",
        "LOGOUT_FN_NAME": "logout",
        "VALIDATOR_FN_NAME": "validator",
        "DISCONNECT_FN_NAME": "disconnect",
        "SWITCH_USER_FN_NAME": "switch-user",
        "AUTH_HEADER": "Authorization",
        "AUTH_CHECK_HEADER": "authorization",
        "BEARER": "Bearer",
        "CREDENTIAL_STORAGE_KEY": "jsonqlcredential",
        "CLIENT_STORAGE_KEY": "jsonqlstore",
        "CLIENT_AUTH_KEY": "jsonqlauthkey",
        "INDEX_KEY": "index",
        "CONTRACT_KEY_NAME": "X-JSONQL-CV-KEY",
        "SHOW_CONTRACT_DESC_PARAM": {
          "desc": "y"
        },
        "DEFAULT_RESOLVER_DIR": "resolvers",
        "DEFAULT_CONTRACT_DIR": "contracts",
        "DEFAULT_KEYS_DIR": "keys",
        "CJS_TYPE": "cjs",
        "ES_TYPE": "es",
        "TS_TYPE": "ts",
        "ACCEPTED_JS_TYPES": [
          "cjs",
          "es"
        ],
        "RETURN_AS_FILE": "file",
        "RETURN_AS_JSON": "json",
        "RETURN_AS_ENUM": [
          "file",
          "json"
        ],
        "NO_ERROR_MSG": "No message",
        "NO_STATUS_CODE": -1,
        "SUCCESS_STATUS": 200,
        "UNAUTHORIZED_STATUS": 401,
        "FORBIDDEN_STATUS": 403,
        "NOT_FOUND_STATUS": 404,
        "NOT_ACCEPTABLE_STATUS": 406,
        "SERVER_INTERNAL_STATUS": 500,
        "DEFAULT_PORT_NUM": 6557,
        "CSRF_HEADER_KEY": "X-CSRF-Token",
        "ORIGIN_HEADER_KEYS": [
          "Origin"
        ],
        "WILD_CARD_CHAR": "*",
        "DATA_KEY": "data",
        "ERROR_KEY": "error",
        "META_KEY": "meta",
        "JSONQL_NAME": "jsonql",
        "REST_NAME": "rest",
        "AVAILABLE_FORMATS": [
          "jsonql",
          "rest"
        ],
        "DEFAULT_CONTRACT_FILE_NAME": "contract.json",
        "PUBLIC_CONTRACT_FILE_NAME": "public-contract.json",
        "TYPE_KEY": "type",
        "OPTIONAL_KEY": "optional",
        "ENUM_KEY": "enumv",
        "ARGS_KEY": "args",
        "CHECKER_KEY": "checker",
        "ALIAS_KEY": "alias",
        "CHECKED_KEY": "__checked__",
        "APP_DIR_PROP_KEY": "appDir",
        "AUTH_TO_PROP_KEY": "authTimeout",
        "ENABLE_AUTH_PROP_KEY": "enableAuth",
        "USE_JWT_PROP_KEY": "useJwt",
        "RESOLVER_DIR_PROP_KEY": "resolverDir",
        "CONTRACT_DIR_PROP_KEY": "contractDir",
        "INIT_CONNECTION_FN_NAME_PROP_KEY": "initConnectionHandlerName",
        "LOGIN_FN_NAME_PROP_KEY": "loginHandlerName",
        "LOGOUT_FN_NAME_PROP_KEY": "logoutHandlerName",
        "DISCONNECT_FN_NAME_PROP_KEY": "disconnectHandlerName",
        "SWITCH_USER_FN_NAME_PROP_KEY": "switchUserHandlerName",
        "PUBLIC_FN_DIR_PROP_KEY": "publicResolverDir",
        "PRIVATE_FN_DIR_DROP_KEY": "privateResolverDir",
        "ALGORITHM_PROP_KEY": "algorithm",
        "KEYS_DIR_PROP_KEY": "keysDir",
        "SOCKET_IO_AUTH_TYPE_PROP_KEY": "socketIoAuthType",
        "SERVER_INIT_OPT_PROP_KEY": "serverInitOption",
        "SOCKET_TYPE_PROP_KEY": "serverType",
        "SOCKET_TYPE_CLIENT_ALIAS": "socketClientType",
        "SOCKET_TYPE_SERVER_ALIAS": "socketServerType",
        "CSRF_PROP_KEY": "csrf",
        "ALLOW_ORIGIN_PROP_KEY": "allowOrigin",
        "STANDALONE_PROP_KEY": "standalone",
        "DEBUG_ON_PROP_KEY": "debugOn",
        "HOSTNAME_PROP_KEY": "hostname",
        "NAMESAPCE_PROP_KEY": "namespace",
        "FILE_PROP_KEY": "file",
        "WS_OPT_PROP_KEY": "wsOptions",
        "CONTRACT_PROP_KEY": "contract",
        "TOKEN_PROP_KEY": "token",
        "INIT_CLIENT_PROP_KEY": "nodeClient",
        "INIT_CONTRACT_PROP_KEY": "initContract",
        "CONTENT_TYPE_PROP_KEY": "contentType",
        "RETURN_AS_PROP_KEY": "returnAs",
        "NAME_PROP_KEY": "appName",
        "EXPIRED_PROP_KEY": "expired",
        "APP_ROOT_DIR_PROP_KEY": "appRootDir",
        "JWT_TOKEN_OPT_PROP_KEY": "jwtTokenOption",
        "ENABLE_JSONP_PROP_KEY": "enableJsonp",
        "CONTRACT_WITH_DESC_PROP_KEY": "contractWithDesc",
        "WITH_PUBLIC_CONTRACT_PROP_KEY": "withPublicContract",
        "PUBLIC_KEY_NAME_PROP_KEY": "publicKeyFileName",
        "PRIVATE_KEY_NAME_PROP_KEY": "privateKeyFileName",
        "PUBLIC_NAMESPACE_PROP_KEY": "publicNamespace",
        "PRIVATE_NAMESPACE_PROP_KEY": "privateNamespace",
        "SECRET_PROP_KEY": "secret",
        "NSP_INFO_PROP_KEY": "nspInfo",
        "RSA_MODULE_LEN_PROP_KEY": "rsaModulusLength",
        "JSONQL_PATH_PROP_KEY": "jsonqlPath",
        "CONTRACT_KEY_PROP_KEY": "contractKey",
        "CONTRACT_KEY_NAME_PROP_KEY": "contractKeyName",
        "ENABLE_WEB_CONSOLE_PROP_KEY": "enableWebConsole",
        "JS_TYPE_PROP_KEY": "jsType",
        "EXPOSE_ERR_PROP_KEY": "exposeError",
        "CLIENT_CONFIG_PROP_KEY": "clientConfig",
        "AUTO_CONTRACT_PROP_KEY": "autoCreateContract",
        "VALIDATE_RETURNS_PROP_KEY": "validateReturns",
        "ENABLE_UPLOAD_PROP_KEY": "enableFileUpload",
        "FILE_UPLOAD_NAME_PROP_KEY": "fileUploadName",
        "FILE_UPLOAD_DIST_PROP_KEY": "fileUploadDist",
        "FILE_HANDLER_FN_NAME_PROP_KEY": "fileHandlerName",
        "ENABLE_SPLIT_TASK_PROP_KEY": "enableSplitTask",
        "CONNECTED_PROP_KEY": "connected",
        "CACHE_STORE_PROP_KEY": "cacheStore",
        "EVENT_EMITTER_PROP_KEY": "eventEmitter",
        "SUSPEND_EVENT_PROP_KEY": "suspendOnStart",
        "ENABLE_CACHE_RESOLVER_PROP_KEY": "enableCacheResolver",
        "TOKEN_DELIVER_LOCATION_PROP_KEY": "tokenDeliverLocation",
        "COOKIE_PROP_KEY": "cookie",
        "IS_READY_PROP_KEY": "isReady",
        "IS_LOGIN_PROP_KEY": "isLogin",
        "SOCKET_PING_EVENT_NAME": "__ping__",
        "SWITCH_USER_EVENT_NAME": "__switch__",
        "LOGIN_EVENT_NAME": "__login__",
        "LOGOUT_EVENT_NAME": "__logout__",
        "SA_LOGIN_EVENT_NAME": "__standalone_login__",
        "SOCKET_CLIENT_ID_KEY": "__socket_client_id_key__",
        "SOCKET_CLIENT_TS_KEY": "__socket_client_ts_key__",
        "CONNECT_EVENT_NAME": "__connect__",
        "CONNECTED_EVENT_NAME": "__connected__",
        "DISCONNECT_EVENT_NAME": "__disconnect__",
        "INTERCOM_RESOLVER_NAME": "__intercom__",
        "INTER_COM_EVENT_NAMES": [
          "__connect__",
          "__switch__",
          "__disconnect__"
        ],
        "WS_REPLY_TYPE": "__reply__",
        "WS_EVT_NAME": "__event__",
        "WS_DATA_NAME": "__data__",
        "WS_IS_REPLY_KEYS": [
          "__reply__",
          "__event__",
          "__data__"
        ],
        "ON_MESSAGE_FN_NAME": "onMessage",
        "ON_RESULT_FN_NAME": "onResult",
        "ON_ERROR_FN_NAME": "onError",
        "ON_READY_FN_NAME": "onReady",
        "ON_LOGIN_FN_NAME": "onLogin",
        "SEND_MSG_FN_NAME": "send",
        "EMIT_MSG_FN_NAME": "emit",
        "ON_MSG_FN_NAME": "on",
        "TO_MSG_FN_NAME": "to",
        "CLIENT_PROP_NAME": "client",
        "USERDATA_PROP_NAME": "userdata",
        "EMIT_REPLY_TYPE": "emit_reply",
        "EMIT_SEND_TYPE": "emit_send",
        "ACKNOWLEDGE_REPLY_TYPE": "emit_acknowledge",
        "INTER_EMIT_SEND_TYPE": "inter_emit_send",
        "INTER_EMIT_REPLY_TYPE": "inter_emit_reply",
        "NSP_GROUP": "nspGroup",
        "PUBLIC_NAMESPACE": "publicNamespace",
        "JS_WS_SOCKET_IO_NAME": "socket.io",
        "JS_WS_NAME": "ws",
        "JS_PRIMUS_NAME": "primus",
        "GO_WS_COOLPY7_NAME": "coolpy7",
        "DEFAULT_WS_WAIT_TIME": 5e3,
        "DEFAULT_RETRY_TIME": 3e3,
        "TIMEOUT_ERR_MSG": "timeout",
        "NOT_LOGIN_ERR_MSG": "NOT LOGIN",
        "BASE64_FORMAT": "base64",
        "HEX_FORMAT": "hex",
        "UTF8_FORMAT": "utf8",
        "RSA_FORMATS": [
          "base64",
          "hex"
        ],
        "RSA_ALGO": "RS256",
        "HSA_ALGO": "HS256",
        "JWT_SUPPORT_ALGOS": [
          "RS256",
          "HS256"
        ],
        "RSA_PRIVATE_KEY_HEADER": "BEGIN RSA PRIVATE KEY",
        "RSA_MIN_MODULE_LEN": 1024,
        "RSA_MAX_MODULE_LEN": 4096,
        "TOKEN_PARAM_NAME": "token",
        "IO_ROUNDTRIP_LOGIN": "roundtip",
        "IO_HANDSHAKE_LOGIN": "handshake",
        "IO_LOGIN_METHODS": [
          "roundtip",
          "handshake"
        ],
        "PEM_EXT": "pem",
        "PUBLIC_KEY_NAME": "publicKey",
        "PRIVATE_KEY_NAME": "privateKey",
        "DEFAULT_PUBLIC_KEY_FILE": "publicKey.pem",
        "DEFAULT_PRIVATE_KEY_FILE": "privateKey.pem",
        "NSP_AUTH_CLIENT": "nspAuthClient",
        "NSP_CLIENT": "nspClient",
        "TOKEN_IN_HEADER": "header",
        "TOKEN_IN_URL": "url",
        "OR_SEPERATOR": "|",
        "BOOLEAN_TYPE": "boolean",
        "STRING_TYPE": "string",
        "NUMBER_TYPE": "number",
        "ARRAY_TYPE": "array",
        "OBJECT_TYPE": "object",
        "FUNCTION_TYPE": "function",
        "ANY_TYPE": "any",
        "BASED_PRIMITIVE_TYPES": [
          "number",
          "string",
          "array",
          "object"
        ],
        "NUMBER_TYPES": [
          "int",
          "integer",
          "float",
          "double",
          "decimal"
        ],
        "SUPPORTED_TYPES": [
          "number",
          "string",
          "boolean",
          "array",
          "object",
          "any"
        ],
        "ARRAY_TS_TYPE_LFT": "Array<",
        "ARRAY_TYPE_LFT": "array.<",
        "ARRAY_TYPE_RGT": ">",
        "DEFAULT_VALUE": "defaultvalue"
      };
    }
  });

  // node_modules/.pnpm/@jsonql+contract@0.5.0/node_modules/@jsonql/contract/dist/reader.js
  var require_reader = __commonJS({
    "node_modules/.pnpm/@jsonql+contract@0.5.0/node_modules/@jsonql/contract/dist/reader.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.JsonqlContractReader = void 0;
      var utils_1 = require_jsonql_utils_min();
      var constants_1 = require_main();
      var JsonqlContractReader2 = class {
        constructor(contract) {
          this._contract = (0, utils_1.readOnly)(contract);
        }
        _access(key, path) {
          const d = this._contract[key];
          if (path) {
            return (0, utils_1.accessByPath)(d, path);
          }
          return d;
        }
        data(path) {
          return this._access(constants_1.DATA_KEY, path);
        }
        meta(path) {
          return this._access(constants_1.META_KEY, path);
        }
        error(path) {
          return this._access(constants_1.ERROR_KEY, path);
        }
      };
      exports.JsonqlContractReader = JsonqlContractReader2;
    }
  });

  // src/client.ts
  var import_constants = __toESM(require_constants());
  var import_reader = __toESM(require_reader());
  var import_constants2 = __toESM(require_main());
  var VeloceClient = class {
    constructor(_transportFn, options) {
      this._transportFn = _transportFn;
      this.methods = {};
      this._options = options || {
        host: "/",
        contractUrl: `${import_constants.VELOCE_DEFAULT_URL}/${import_constants.CONTRACT_KEY}`
      };
    }
    _getContract() {
      return __async(this, null, function* () {
        return this._transportFn(this._options.host + this._options.contractUrl, import_constants2.CONTRACT_REQUEST_METHODS[0]).then((json) => new import_reader.JsonqlContractReader(json));
      });
    }
    _createMethod(route, method, params) {
      return (...args) => {
        this._transportFn(route, method, this._createArgs(args, params));
      };
    }
    _createArgs(args, params) {
      return params.map((param, i) => ({ [param.name]: args[i] })).reduce((a, b) => Object.assign(a, b), {});
    }
    build() {
      return __async(this, null, function* () {
        return this._getContract().then((reader) => {
          const data = reader.data();
          return data.map((d) => ({ [d.name]: this._createMethod(d.route, d.method, d.params) })).reduce((a, b) => Object.assign(a, b), this.methods);
        });
      });
    }
  };

  // src/fetch.ts
  function f(url, method, params, options) {
    return __async(this, null, function* () {
      const opts = {
        method,
        headers: { "Content-Type": "application/json" },
        body: ""
      };
      if (method === "get") {
        const query = [];
        for (const key in params) {
          query.push(`${key}=${params[key]}`);
        }
        url = url + "?" + query.join("&");
      } else {
        opts.body = JSON.stringify(params);
      }
      const _opt = options ? Object.assign(opts, options) : opts;
      return fetch(url, _opt).then((res) => res.json());
    });
  }
  var VeloceFetchClient = class extends VeloceClient {
    constructor(options) {
      super(f, options);
    }
  };
})();
//# sourceMappingURL=fetch.js.map
