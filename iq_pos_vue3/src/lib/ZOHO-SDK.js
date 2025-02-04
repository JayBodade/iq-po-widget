// var ZSDKUtil = (function (c) {
//     function f() {}
//     function g(a) {
//         var b = {};
//         a = a || window.location.href;
//         return (
//             a
//                 .substr(a.indexOf("?") + 1)
//                 .split("\x26")
//                 .forEach(function (a) {
//                     a = a.split("\x3d");
//                     b[a[0]] = a[1];
//                 }),
//             b.hasOwnProperty("serviceOrigin") && (b.serviceOrigin = decodeURIComponent(b.serviceOrigin)),
//             b
//         );
//     }
//     var d,
//         a = g();
//     return (
//         (f.prototype.Info = function () {
//             (c.isDevMode() || c.isLogEnabled()) && console.info.apply(console, arguments);
//         }),
//         (f.prototype.Error = console.error),
//         (c.GetQueryParams = g),
//         (c.isDevMode = function () {
//             return a && a.isDevMode;
//         }),
//         (c.isLogEnabled = function () {
//             return a && a.isLogEnabled;
//         }),
//         (c.getLogger = function () {
//             return (d && d instanceof f) || (d = new f()), d;
//         }),
//         c
//     );
// })(window.ZSDKUtil || {}),
// ZSDKMessageManager = (function (c) {
//     function f(b) {
//         try {
//             var d = "string" == typeof b.data ? JSON.parse(b.data) : b.data;
//         } catch (u) {
//             d = b.data;
//         }
//         var c = d.type;
//         try {
//             var f;
//             if (!(f = "__REGISTER__" === c)) {
//                 var k = b.source,
//                     r = b.origin;
//                 f = !(!h.isRegistered() || n !== k || v !== r) || Error("Un-Authorized Message.");
//             }
//             if (f)
//                 switch (c) {
//                     case "__REGISTER__":
//                         b = d;
//                         n = window.parent;
//                         v = w.serviceOrigin;
//                         h.dcType = window.location.origin.split(".").pop().toUpperCase();
//                         "COM" === h.dcType && (h.dcType = "US");
//                         h.key = b.uniqueID;
//                         h.parentWindow = n;
//                         h._isRegistered = !0;
//                         e({ type: "__REGISTER__", widgetOrigin: p(), uniqueID: h.key }, h);
//                         a(h, "Load", b.data);
//                         break;
//                     case "__EVENT_RESPONSE__":
//                         var m = d.promiseID,
//                             q = d.data,
//                             t = d.isSuccess;
//                         l.hasOwnProperty(m) && (t ? l[m].resolve(q) : l[m].reject(q), (l[m] = void 0), delete l[m]);
//                         break;
//                     default:
//                         g(b, d);
//                 }
//         } catch (u) {
//             x.Error("[SDK.MessageHandler] \x3d\x3e ", u.stack);
//         }
//     }
//     function g(b, c) {
//         var e = c.widgetID;
//         b = c.eventName;
//         if (h.key === e) var f = a(h, b, c.data);
//         else {
//             var k = h._childWidgets[e];
//             k && (f = a(k, b, c.data));
//         }
//         if (c.isPromise) {
//             var g = {};
//             Promise.all(f)
//                 .then(function (b) {
//                     g.response = b;
//                     g.widgetID = e;
//                     g.sourceWidgetID = h.key;
//                     d(c, g);
//                 })
//                 .catch(function (b) {
//                     g.response = b;
//                     g.widgetID = e;
//                     g.sourceWidgetID = h.key;
//                     d(c, g);
//                 });
//         }
//     }
//     function d(b, a) {
//         e({ type: "__EVENT_RESPONSE__", widgetOrigin: p(), uniqueID: h.key, eventName: b.eventName, data: a, promiseID: b.promiseID }, h);
//     }
//     function a(b, a, d) {
//         a = b.eventHandlers[a];
//         var c = [];
//         if (Array.isArray(a))
//             for (var e = 0; e < a.length; e++) {
//                 try {
//                     var f = a[e].call(b, d);
//                     var g =
//                         f instanceof Promise
//                             ? f
//                                   .then(function (b) {
//                                       return { isSuccess: !0, response: b };
//                                   })
//                                   .catch(function (b) {
//                                       return { isSuccess: !1, response: b };
//                                   })
//                             : { isSuccess: !0, response: f };
//                 } catch (q) {
//                     g = { isSuccess: !1, response: q };
//                 }
//                 c.push(g);
//             }
//         return c;
//     }
//     function e(a, d) {
//         var c,
//             e = a.isPromise;
//         if ((e && ((c = "Promise" + t++), (a.promiseID = c)), d && ((a.uniqueID = (d.parentWidget || d).key), (a.widgetID = d.key)), (a.time = new Date().getTime()), r(a), e)) return b(c);
//     }
//     function b(b) {
//         return new Promise(function (a, d) {
//             l[b] = { resolve: a, reject: d, time: new Date().getTime() };
//         });
//     }
//     function k() {
//         r({ type: "__DEREGISTER__", uniqueID: h.key });
//     }
//     function r(b) {
//         if (("object" == typeof b && (b.widgetOrigin = encodeURIComponent(p())), !n)) throw Error("Parentwindow reference not found.");
//         n.postMessage(b, w.serviceOrigin);
//     }
//     function p() {
//         return window.location.protocol + "//" + window.location.host + window.location.pathname;
//     }
//     var h,
//         n,
//         v,
//         x = ZSDKUtil.getLogger(),
//         t = 100,
//         l = {},
//         w = ZSDKUtil.GetQueryParams();
//     return (
//         (c.Init = function (b) {
//             h = b;
//             window.addEventListener("message", f);
//             window.addEventListener("unload", k);
//         }),
//         (c.SendEvent = e),
//         c
//     );
// })(window.ZSDKMessageManager || {});
// window.ZSDK = (function () {
// function c(d) {
//     this.serviceOrigin = d.serviceOrigin || g.serviceOrigin;
//     this.parentWidget = d.parentWidget;
//     this.key = d.key;
//     this._isRegistered = !1;
//     this._childWidgets = {};
//     this.eventHandlers = Object.create(null);
//     this.meta;
// }
// var f,
//     g = ZSDKUtil.GetQueryParams();
// return (
//     (c.prototype.on = function (d, a) {
//         if ("string" != typeof d) throw Error("Invalid eventname parameter passed.");
//         if ("function" != typeof a) throw Error("Invalid function parameter passed.");
//         var c = this.eventHandlers[d];
//         if ((Array.isArray(c) || (this.eventHandlers[d] = c = []), c.push(a), "Load" !== d)) {
//             var b = { type: "__EVENT_BIND__", eventName: d, count: c.length };
//             (this.parentWidget && !this.parentWidget.isRegistered()) || (!this.parentWidget && !this.isRegistered())
//                 ? (this.parentWidget || this).on("Load", function () {
//                       ZSDKMessageManager.SendEvent(b, this);
//                   })
//                 : ZSDKMessageManager.SendEvent(b, this);
//         }
//     }),
//     (c.prototype.off = function (d, a) {
//         if ("string" != typeof d) throw Error("Invalid eventname parameter passed.");
//         if ("function" != typeof a) throw Error("Invalid function parameter passed.");
//         d = this.eventHandlers[d];
//         if (Array.isArray(d)) {
//             var c,
//                 b = [];
//             for (c = 0; c < d.length; c++) d[c] === a && b.push(c);
//             for (; b.length; ) d.splice(b.pop(), 1);
//         }
//     }),
//     (c.prototype._sendEvent = function (c, a, e) {
//         return ZSDKMessageManager.SendEvent({ type: "__EVENT__", eventName: c, data: a, isPromise: e }, this);
//     }),
//     (c.prototype.emit = function (c, a) {
//         ZSDKMessageManager.SendEvent({ type: "__EMIT__", eventName: c, data: a }, this);
//     }),
//     (c.prototype.isRegistered = function () {
//         return this._isRegistered;
//     }),
//     (c.prototype.fetch = function (c) {
//         return ZSDKMessageManager.SendEvent({ eventName: "__HTTP__", isPromise: !0, options: c }, this);
//     }),
//     (c.prototype.createInstance = function (c) {
//         return ZSDKMessageManager.SendEvent({ eventName: "__CREATE_INSTANCE__", isPromise: !0, options: c }, this);
//     }),
//     (c.prototype.modal = function (c) {
//         return "object" == typeof c && (c.location = "__MODAL__"), this.createInstance(c);
//     }),
//     (c.prototype.getWidgets = function () {
//         return ZSDKMessageManager.SendEvent({ eventName: "__WIDGETS_INFO__", isPromise: !0 }, this);
//     }),
//     (c.prototype.getWidgetInstance = function (d) {
//         if ("string" != typeof d) throw Error("Invalid WidgetID passed");
//         if (this.parentWidget) return this.parentWidget.getWidgetInstance(d);
//         var a = this._childWidgets[d];
//         return a || (this._childWidgets[d] = a = new c({ key: d, parentWidget: this })), a;
//     }),
//     (c.prototype.getFileObject = function (c) {
//         return new File([c.slice(0, c.size)], c.name, { type: c.type });
//     }),
//     {
//         Init: function () {
//             return f || ((f = new c({ serviceOrigin: g.serviceOrigin })), ZSDKMessageManager.Init(f), f);
//         },
//         _getRootInstance: function () {
//             return f;
//         },
//     }
// );
// })();
// window.SigmaSDK = (function () {
// function c(b) {
//     this._serviceName = b;
// }
// var f,
//     g = function () {
//         if (!f.isRegistered()) throw Error("App not registered.");
//     },
//     d = function (b, a) {
//         return f._sendEvent("SIGMA_" + b + "_EVENT", a, !0);
//     },
//     a = function (b, a) {
//         return Promise.reject({ type: b, message: a });
//     };
// c.prototype.isRegistered = function () {
//     return f.isRegistered();
// };
// c.prototype.context = function () {
//     return g(), f;
// };
// c.prototype.createWidget = function (b) {
//     return g(), f.createInstance(b);
// };
// c.prototype.getWidget = function (b) {
//     return f.getWidgetInstance(b);
// };
// c.prototype.widgetsMeta = function () {
//     return g(), f.getWidgets();
// };
// c.prototype.on = function (b, a) {
//     return f.on(b, a);
// };
// c.prototype.off = function (b, a) {
//     return f.off(b, a);
// };
// c.prototype.trigger = function (b, a) {
//     return g(), f.emit(b, a);
// };
// c.prototype.modal = function (b) {
//     return g(), f.modal(b);
// };
// c.prototype.fetch = function (b) {
//     return g(), f.fetch(b);
// };
// c.prototype.get = function (b) {
//     if ((g(), "string" != typeof b && !Array.isArray(b))) return a("VALIDATION_ERROR", "The get method accepts String or Array of Strings only.");
//     b = "string" == typeof b ? [b] : b;
//     return 0 >= b.length ? a("VALIDATION_ERROR", "The get method should not accept empty Array of Strings.") : d(this._serviceName, { event_type: "get", properties: b });
// };
// c.prototype.getAll = function (b, c) {
//     return (g(), "string" != typeof b) ? a("VALIDATION_ERROR", "The getAll method accepts module_name as String only.") : d(this._serviceName, { event_type: "get_all", module_name: b, options: c });
// };
// c.prototype.set = function (b, c) {
//     if ((g(), "string" != typeof b && "object" != typeof b && Array.isArray(b))) return a("VALIDATION_ERROR", "The set method accepts key-value pair or Object of key-value pairs only.");
//     var e;
//     return ("string" == typeof b ? ((e = {}), (e[b] = c)) : (e = b), 0 >= e.keys.length) ? a("VALIDATION_ERROR", "The set method should not accept empty Object.") : d(this._serviceName, { event_type: "get_all", properties: e });
// };
// c.prototype.remove = function (b) {
//     if ((g(), "string" != typeof b && !Array.isArray(b))) return a("VALIDATION_ERROR", "The remove method accepts String or Array of Strings only.");
//     b = "string" == typeof b ? [b] : b;
//     return 0 >= b.length ? a("VALIDATION_ERROR", "The remove method should not accept empty Array of Strings.") : d(this._serviceName, { event_type: "remove", properties: b });
// };
// c.prototype.request = function (b) {
//     if ((g(), !b.url || 0 >= b.url.trim().length)) return a("VALIDATION_ERROR", "The parameter url should not be empty");
//     if ("string" != typeof b.url) return a("VALIDATION_ERROR", "The parameter url should be type of string");
//     if ((b.method || (b.method = "GET"), b.params && "object" != typeof b.params && Array.isArray(b.params))) return a("VALIDATION_ERROR", "The parameter params should be type of object");
//     if (b.headers && "object" != typeof b.headers && Array.isArray(b.headers)) return a("VALIDATION_ERROR", "The parameter headers should be type of object");
//     if (b.files) {
//         if ("object" != typeof b.files || Array.isArray(b.files)) return a("VALIDATION_ERROR", "The parameter files should be type of object");
//         if (5 < Object.keys(b.files).length) return a("VALIDATION_ERROR", "You can upload a maximum of 5 files at a time.");
//         for (var c = 0; c < b.files.length; c++) b.files[c] = f.getFileObject(b.files[c]);
//     }
//     return d(this._serviceName, { event_type: "request", options: b });
// };
// c.prototype.dispatch = function (b, a) {
//     g();
//     return d(this._serviceName, { event_type: b, options: a });
// };
// var e = function (b) {
//     return (f = window.ZSDK.Init()), "function" == typeof b && (f.isRegistered() ? b.call() : f.on("Load", b)), new c(this._serviceName);
// };
// return {
//     CRM: { init: e.bind({ _serviceName: "CRM" }) },
//     DESK: { init: e.bind({ _serviceName: "DESK" }) },
//     PROJECTS: { init: e.bind({ _serviceName: "PROJECTS" }) },
//     ORCHESTLY: { init: e.bind({ _serviceName: "ORCHESTLY" }) },
//     MAIL: { init: e.bind({ _serviceName: "MAIL" }) },
//     SHOW: { init: e.bind({ _serviceName: "SHOW" }) },
//     SDP: { init: e.bind({ _serviceName: "SDP" }) },
//     IOT: { init: e.bind({ _serviceName: "IOT" }) },
//     CATALYST: { init: e.bind({ _serviceName: "CATALYST" }) },
//     FINANCE: { init: e.bind({ _serviceName: "FINANCE" }) },
//     CONNECT: { init: e.bind({ _serviceName: "CONNECT" }) },
//     TEAMINBOX: { init: e.bind({ _serviceName: "TEAMINBOX" }) },
//     SPRINTS: { init: e.bind({ _serviceName: "SPRINTS" }) },
//     BUGTRACKER: { init: e.bind({ _serviceName: "BUGTRACKER" }) },
//     CREATOR: { init: e.bind({ _serviceName: "CREATOR" }) },
//     PEOPLE: { init: e.bind({ _serviceName: "PEOPLE" }) },
//     COMMERCE: { init: e.bind({ _serviceName: "COMMERCE" }) },
//     SITES: { init: e.bind({ _serviceName: "SITES" }) },
//     RECRUIT: { init: e.bind({ _serviceName: "RECRUIT" }) },
//     WORKDRIVE: { init: e.bind({ _serviceName: "WORKDRIVE" }) },
//     WRITER: { init: e.bind({ _serviceName: "WRITER" }) },
// };
// })();
// var ZCSDK = new (function () {
//     var c = !1,
//         f,
//         g = void 0,
//         d = {};
//     this._init = function () {
//         if (!c) {
//             c = !0;
//             f = new ZSDK();
//             d.appSDK = f;
//             var a;
//             g = new Promise(function (c, b) {
//                 a = c;
//             });
//             f.OnLoad(function () {
//                 f.getContext()
//                     .Event.Trigger("GET_INIT_PARAMS", !0, !0)
//                     .then(function (c) {
//                         d.initParams = c;
//                         f.getContext()
//                             .Event.Trigger("GET_QUERY_PARAMS", !0, !0)
//                             .then(function (b) {
//                                 d.queryParams = b;
//                                 a();
//                             });
//                     });
//             });
//         }
//         return g;
//     };
//     this._getInitParams = function () {
//         return d.initParams;
//     };
//     this._getQueryParams = function () {
//         return d.queryParams;
//     };
//     this._getApi = function () {
//         return { API: { RECORDS: new Records(d) }, UTIL: new Util(d) };
//     };
// })(),
//  ZOHO = new (function () {
//     var c = !1,
//         f = new ZSDK.Init(),
//         g = void 0,
//         d = void 0,
//         a = {},
//         e;
//     g = new Promise(function (b, a) {
//         e = b;
//     });
//     f.on("Load", function () {
//         e();
//     });
//     return {
//         CREATOR: {
//             API: new Records(a),
//             UTIL: new Util(a),
//             init: function () {
//                 if (!c) {
//                     var b;
//                     d = new Promise(function (a, c) {
//                         b = a;
//                     });
//                     g.then(function () {
//                         c = !0;
//                         a.appSDK = f;
//                         f._sendEvent("GET_INIT_PARAMS", !0, !0).then(function (c) {
//                             a.initParams = c;
//                             f._sendEvent("GET_QUERY_PARAMS", !0, !0).then(function (c) {
//                                 a.queryParams = c;
//                                 b();
//                             });
//                         });
//                     }).catch(function () {});
//                 }
//                 return d;
//             },
//         },
//     };
// })();
// function Records(c) {
// function f(a) {
//     a.scope || (a.scope = c.initParams.scope);
//     a.envUrlFragment || (a.envUrlFragment = c.initParams.envUrlFragment.substr(1));
//     a.appName || (a.appName = c.initParams.appLinkName);
// }
// function g(a, c) {
//     var b = !1,
//         d;
//     for (d in a) {
//         var e;
//         if ((e = !(c && c.includes(d)))) {
//             e = a[d];
//             var f = !1,
//                 g;
//             if (!(g = !e || null == e || "" === e || ("string" == typeof e && 0 == e.trim().length)) && (g = "object" == typeof e))
//                 a: {
//                     g = void 0;
//                     for (g in e) {
//                         g = !1;
//                         break a;
//                     }
//                     g = !0;
//                 }
//             g && (f = !0);
//             e = f;
//         }
//         e && (b = !0);
//     }
//     return b;
// }
// function d(a) {
//     return new Promise(function (c, b) {
//         var e = new FileReader();
//         e.readAsDataURL(a);
//         e.onload = function () {
//             c(e.result);
//         };
//         e.onerror = function (a) {
//             b(a);
//         };
//     });
// }
// return {
//     addRecord: function (a) {
//         if (g(a))
//             return new Promise(function (a, b) {
//                 b("Improper Configuration..!!");
//             });
//         f(a);
//         return c.appSDK._sendEvent("ADD_RECORD", { appLinkName: a.appName, formLinkName: a.formName, body: a.data }, !0);
//     },
//     updateRecord: function (a) {
//         if (g(a))
//             return new Promise(function (b, a) {
//                 a("Improper Configuration..!!");
//             });
//         var e = a.id.toString().split(",");
//         f(a);
//         return c.appSDK._sendEvent("EDIT_RECORDS", { appLinkName: a.appName, viewLinkName: a.reportName, body: a.data, listOfRecords: e }, !0);
//     },
//     deleteRecord: function (a) {
//         if (g(a))
//             return new Promise(function (a, b) {
//                 b("Improper Configuration..!!");
//             });
//         f(a);
//         return c.appSDK._sendEvent("DELETE_RECORDS", { appLinkName: a.appName, viewLinkName: a.reportName, criteria: a.criteria }, !0);
//     },
//     getRecordById: function (a) {
//         if (g(a))
//             return new Promise(function (a, b) {
//                 b("Improper Configuration..!!");
//             });
//         f(a);
//         return c.appSDK._sendEvent("GET_RECORD", { appLinkName: a.appName, viewLinkName: a.reportName, id: a.id }, !0);
//     },
//     getAllRecords: function (a) {
//         if (g(a, ["criteria", "page", "pageSize"]))
//             return new Promise(function (a, b) {
//                 b("Improper Configuration..!!");
//             });
//         f(a);
//         return c.appSDK._sendEvent("GET_RECORDS", { appLinkName: a.appName, viewLinkName: a.reportName, criteria: a.criteria, page: a.page, pageSize: a.pageSize }, !0);
//     },
//     uploadFile: function (a) {
//         if (g(a, ["file", "parentId"]))
//             return new Promise(function (a, b) {
//                 b("Improper Configuration..!!");
//             });
//         f(a);
//         return a.file
//             ? a.file.size && 50 < a.file.size / 1024 / 1024
//                 ? new Promise(function (a, b) {
//                       b("Improper Configuration..!!");
//                   })
//                 : new Promise(function (e, b) {
//                       var f = d(a.file),
//                           g = "",
//                           p = a.file.name;
//                       f.then(function (d) {
//                           g = d;
//                           d = { appLinkName: a.appName, viewLinkName: a.reportName, id: a.id, fieldName: a.fieldName, file: g, fileName: p };
//                           a.parentId && (d.parentId = a.parentId);
//                           c.appSDK
//                               ._sendEvent("UPLOAD_FILE", d, !0)
//                               .then(function (b) {
//                                   e(b);
//                               })
//                               .catch(function (a) {
//                                   b(a);
//                               });
//                       }).catch(function (a) {
//                           b(a);
//                       });
//                   })
//             : new Promise(function (a, b) {
//                   b("Improper Configuration..!!");
//               });
//     },
// };
// }
// function Util(c) {
// return {
//     setImageData: function (f, g, d) {
//         if (g.startsWith("/api/v2/")) {
//             var a = {};
//             a.src = g;
//             c.appSDK
//                 ._sendEvent("IMAGE_LOAD", a, !0)
//                 .then(function (a) {
//                     f.setAttribute("src", a);
//                     d({ status: "200", statusText: "success" });
//                 })
//                 .catch(function (a) {
//                     if (d) d(a);
//                     else {
//                         var b = window.console;
//                         b.log("Error: Unable to set image data");
//                         b.log(a);
//                     }
//                 });
//         } else f.setAttribute("src", g);
//     },
//     getInitParams: function () {
//         return c.initParams;
//     },
//     getQueryParams: function () {
//         return c.queryParams;
//     },
// };
// }
// // module.exports = {
// //     ZOHO
// //   }
// // var ZSDKUtil=function(c){function f(){}function g(b){var a={};b=b||window.location.href;return b.substr(b.indexOf("?")+1).split("\x26").forEach(function(b){b=b.split("\x3d");a[b[0]]=b[1]}),a.hasOwnProperty("serviceOrigin")&&(a.serviceOrigin=decodeURIComponent(a.serviceOrigin)),a}var e,b=g();return f.prototype.Info=function(){(c.isDevMode()||c.isLogEnabled())&&console.info.apply(console,arguments)},f.prototype.Error=console.error,c.GetQueryParams=g,c.isDevMode=function(){return b&&b.isDevMode},c.isLogEnabled=
// // function(){return b&&b.isLogEnabled},c.getLogger=function(){return e&&e instanceof f||(e=new f),e},c}(window.ZSDKUtil||{}),ZSDKMessageManager=function(c){function f(a){try{var e="string"==typeof a.data?JSON.parse(a.data):a.data}catch(u){e=a.data}var c=e.type;try{var f;if(!(f="__REGISTER__"===c)){var l=a.source,k=a.origin;f=!(!h.isRegistered()||p!==l||v!==k)||Error("Un-Authorized Message.")}if(f)switch(c){case "__REGISTER__":a=e;p=window.parent;v=w.serviceOrigin;h.dcType=window.location.origin.split(".").pop().toUpperCase();
// // "COM"===h.dcType&&(h.dcType="US");h.key=a.uniqueID;h.parentWindow=p;h._isRegistered=!0;d({type:"__REGISTER__",widgetOrigin:q(),uniqueID:h.key},h);b(h,"Load",a.data);break;case "__EVENT_RESPONSE__":var n=e.promiseID,r=e.data,t=e.isSuccess;m.hasOwnProperty(n)&&(t?m[n].resolve(r):m[n].reject(r),m[n]=void 0,delete m[n]);break;default:g(a,e)}}catch(u){x.Error("[SDK.MessageHandler] \x3d\x3e ",u.stack)}}function g(a,d){var c=d.widgetID;a=d.eventName;if(h.key===c)var f=b(h,a,d.data);else{var l=h._childWidgets[c];
// // l&&(f=b(l,a,d.data))}if(d.isPromise){var k={};Promise.all(f).then(function(a){k.response=a;k.widgetID=c;k.sourceWidgetID=h.key;e(d,k)}).catch(function(a){k.response=a;k.widgetID=c;k.sourceWidgetID=h.key;e(d,k)})}}function e(a,b){d({type:"__EVENT_RESPONSE__",widgetOrigin:q(),uniqueID:h.key,eventName:a.eventName,data:b,promiseID:a.promiseID},h)}function b(a,b,d){b=a.eventHandlers[b];var e=[];if(Array.isArray(b))for(var c=0;c<b.length;c++){try{var f=b[c].call(a,d);var l=f instanceof Promise?f.then(function(a){return{isSuccess:!0,
// // response:a}}).catch(function(a){return{isSuccess:!1,response:a}}):{isSuccess:!0,response:f}}catch(r){l={isSuccess:!1,response:r}}e.push(l)}return e}function d(b,d){var e,c=b.isPromise;if(c&&(e="Promise"+t++,b.promiseID=e),d&&(b.uniqueID=(d.parentWidget||d).key,b.widgetID=d.key),b.time=(new Date).getTime(),k(b),c)return a(e)}function a(a){return new Promise(function(b,d){m[a]={resolve:b,reject:d,time:(new Date).getTime()}})}function l(){k({type:"__DEREGISTER__",uniqueID:h.key})}function k(a){if("object"==
// // typeof a&&(a.widgetOrigin=encodeURIComponent(q())),!p)throw Error("Parentwindow reference not found.");p.postMessage(a,w.serviceOrigin)}function q(){return window.location.protocol+"//"+window.location.host+window.location.pathname}var h,p,v,x=ZSDKUtil.getLogger(),t=100,m={},w=ZSDKUtil.GetQueryParams();return c.Init=function(a){h=a;window.addEventListener("message",f);window.addEventListener("unload",l)},c.SendEvent=d,c}(window.ZSDKMessageManager||{});
// // window.ZSDK=function(){function c(e){this.serviceOrigin=e.serviceOrigin||g.serviceOrigin;this.parentWidget=e.parentWidget;this.key=e.key;this._isRegistered=!1;this._childWidgets={};this.eventHandlers=Object.create(null);this.meta}var f,g=ZSDKUtil.GetQueryParams();return c.prototype.on=function(e,b){if("string"!=typeof e)throw Error("Invalid eventname parameter passed.");if("function"!=typeof b)throw Error("Invalid function parameter passed.");var d=this.eventHandlers[e];if(Array.isArray(d)||(this.eventHandlers[e]=
// // d=[]),d.push(b),"Load"!==e){var a={type:"__EVENT_BIND__",eventName:e,count:d.length};this.parentWidget&&!this.parentWidget.isRegistered()||!this.parentWidget&&!this.isRegistered()?(this.parentWidget||this).on("Load",function(){ZSDKMessageManager.SendEvent(a,this)}):ZSDKMessageManager.SendEvent(a,this)}},c.prototype.off=function(e,b){if("string"!=typeof e)throw Error("Invalid eventname parameter passed.");if("function"!=typeof b)throw Error("Invalid function parameter passed.");e=this.eventHandlers[e];
// // if(Array.isArray(e)){var d,a=[];for(d=0;d<e.length;d++)e[d]===b&&a.push(d);for(;a.length;)e.splice(a.pop(),1)}},c.prototype._sendEvent=function(e,b,d){return ZSDKMessageManager.SendEvent({type:"__EVENT__",eventName:e,data:b,isPromise:d},this)},c.prototype.emit=function(e,b){ZSDKMessageManager.SendEvent({type:"__EMIT__",eventName:e,data:b},this)},c.prototype.isRegistered=function(){return this._isRegistered},c.prototype.fetch=function(e){return ZSDKMessageManager.SendEvent({eventName:"__HTTP__",isPromise:!0,
// // options:e},this)},c.prototype.createInstance=function(e){return ZSDKMessageManager.SendEvent({eventName:"__CREATE_INSTANCE__",isPromise:!0,options:e},this)},c.prototype.modal=function(e){return"object"==typeof e&&(e.location="__MODAL__"),this.createInstance(e)},c.prototype.getWidgets=function(){return ZSDKMessageManager.SendEvent({eventName:"__WIDGETS_INFO__",isPromise:!0},this)},c.prototype.getWidgetInstance=function(e){if("string"!=typeof e)throw Error("Invalid WidgetID passed");if(this.parentWidget)return this.parentWidget.getWidgetInstance(e);
// // var b=this._childWidgets[e];return b||(this._childWidgets[e]=b=new c({key:e,parentWidget:this})),b},c.prototype.getFileObject=function(e){return new File([e.slice(0,e.size)],e.name,{type:e.type})},{Init:function(){return f||(f=new c({serviceOrigin:g.serviceOrigin}),ZSDKMessageManager.Init(f),f)},_getRootInstance:function(){return f}}}();
// // window.SigmaSDK=function(){function c(a){this._serviceName=a}var f,g=function(){if(!f.isRegistered())throw Error("App not registered.");},e=function(a,b){return f._sendEvent("SIGMA_"+a+"_EVENT",b,!0)},b=function(a,b){return Promise.reject({type:a,message:b})};c.prototype.isRegistered=function(){return f.isRegistered()};c.prototype.context=function(){return g(),f};c.prototype.createWidget=function(a){return g(),f.createInstance(a)};c.prototype.getWidget=function(a){return f.getWidgetInstance(a)};c.prototype.widgetsMeta=
// // function(){return g(),f.getWidgets()};c.prototype.on=function(a,b){return f.on(a,b)};c.prototype.off=function(a,b){return f.off(a,b)};c.prototype.trigger=function(a,b){return g(),f.emit(a,b)};c.prototype.modal=function(a){return g(),f.modal(a)};c.prototype.fetch=function(a){return g(),f.fetch(a)};c.prototype.get=function(a,d){if(g(),"string"!=typeof a&&!Array.isArray(a))return b("VALIDATION_ERROR","The get method accepts String or Array of Strings only.");a="string"==typeof a?[a]:a;if(0>=a.length)return b("VALIDATION_ERROR",
// // "The get method should not accept empty Array of Strings.");a={event_type:"get",properties:a};return"function"==typeof d&&f.on("get",d),e(this._serviceName,a)};c.prototype.getAll=function(a,d,c){if(g(),"string"!=typeof a)return b("VALIDATION_ERROR","The getAll method accepts module_name as String only.");a={event_type:"get_all",module_name:a,options:d};return"function"==typeof c&&f.on("get_all",c),e(this._serviceName,a)};c.prototype.set=function(a,d,c){if(g(),"string"!=typeof a&&"object"!=typeof a&&
// // Array.isArray(a))return b("VALIDATION_ERROR","The set method accepts key-value pair or Object of key-value pairs only.");var k;if("string"==typeof a?(k={},k[a]=d):k=a,0>=k.length)return b("VALIDATION_ERROR","The set method should not accept empty Object.");a={event_type:"set",properties:k};return"function"==typeof c&&f.on("set",c),e(this._serviceName,a)};c.prototype.remove=function(a,d){if(g(),"string"!=typeof a&&!Array.isArray(a))return b("VALIDATION_ERROR","The remove method accepts String or Array of Strings only.");
// // a="string"==typeof a?[a]:a;if(0>=a.length)return b("VALIDATION_ERROR","The remove method should not accept empty Array of Strings.");a={event_type:"remove",properties:a};return"function"==typeof d&&f.on("remove",d),e(this._serviceName,a)};c.prototype.request=function(a,d){if(g(),!a.url||0>=a.url.trim().length)return b("VALIDATION_ERROR","The parameter url should not be empty");if("string"!=typeof a.url)return b("VALIDATION_ERROR","The parameter url should be type of string");if(a.method||(a.method=
// // "GET"),a.params&&"object"!=typeof a.params&&Array.isArray(a.params))return b("VALIDATION_ERROR","The parameter params should be type of object");if(a.headers&&"object"!=typeof a.headers&&Array.isArray(a.headers))return b("VALIDATION_ERROR","The parameter headers should be type of object");if(a.files)if(Array.isArray(a.files))for(var c=0;c<a.files.length;c++)a.files[c]=f.getFileObject(a.files[c]);else{if("object"!=typeof a.files)return b("VALIDATION_ERROR","The parameter files should be type of object");
// // if(5<Object.keys(a.files).length)return b("VALIDATION_ERROR","You can upload a maximum of 5 files at a time.")}a={event_type:"request",options:a};return"function"==typeof d&&f.on("request",d),e(this._serviceName,a)};c.prototype.requestapiconnection=function(a,d){if(g(),!a.api_namespace||0>=a.api_namespace.trim().length)return b("VALIDATION_ERROR","The parameter api_namespace should not be empty");if("string"!=typeof a.api_namespace)return b("VALIDATION_ERROR","The parameter api_namespace should be type of string");
// // if(!a.url||0>=a.url.trim().length)return b("VALIDATION_ERROR","The parameter url should not be empty");if("string"!=typeof a.url)return b("VALIDATION_ERROR","The parameter url should be type of string");if(a.method||(a.method="GET"),a.params&&"object"!=typeof a.params&&Array.isArray(a.params))return b("VALIDATION_ERROR","The parameter params should be type of object");if(a.headers&&"object"!=typeof a.headers&&Array.isArray(a.headers))return b("VALIDATION_ERROR","The parameter headers should be type of object");
// // if(a.files)if(Array.isArray(a.files))for(var c=0;c<a.files.length;c++)a.files[c]=f.getFileObject(a.files[c]);else{if("object"!=typeof a.files)return b("VALIDATION_ERROR","The parameter files should be type of object");if(5<Object.keys(a.files).length)return b("VALIDATION_ERROR","You can upload a maximum of 5 files at a time.")}a={event_type:"requestapiconnection",options:a};return"function"==typeof d&&f.on("requestapiconnection",d),e(this._serviceName,a)};c.prototype.dispatch=function(a,b,d){g();
// // b={event_type:a,options:b};return"function"==typeof d&&f.on(a,d),e(this._serviceName,b)};var d=function(a){return f=window.ZSDK.Init(),"function"==typeof a&&(f.isRegistered()?a.call():f.on("Load",a)),new c(this._serviceName)};return{CRM:{init:d.bind({_serviceName:"CRM"})},DESK:{init:d.bind({_serviceName:"DESK"})},PROJECTS:{init:d.bind({_serviceName:"PROJECTS"})},ORCHESTLY:{init:d.bind({_serviceName:"ORCHESTLY"})},MAIL:{init:d.bind({_serviceName:"MAIL"})},SHOW:{init:d.bind({_serviceName:"SHOW"})},
// // SDP:{init:d.bind({_serviceName:"SDP"})},IOT:{init:d.bind({_serviceName:"IOT"})},ZAPPS:{init:d.bind({_serviceName:"ZAPPS"})},CATALYST:{init:d.bind({_serviceName:"CATALYST"})},FINANCE:{init:d.bind({_serviceName:"FINANCE"})},CONNECT:{init:d.bind({_serviceName:"CONNECT"})},TEAMINBOX:{init:d.bind({_serviceName:"TEAMINBOX"})},SPRINTS:{init:d.bind({_serviceName:"SPRINTS"})},BUGTRACKER:{init:d.bind({_serviceName:"BUGTRACKER"})},CREATOR:{init:d.bind({_serviceName:"CREATOR"})},PEOPLE:{init:d.bind({_serviceName:"PEOPLE"})},
// // COMMERCE:{init:d.bind({_serviceName:"COMMERCE"})},SITES:{init:d.bind({_serviceName:"SITES"})},RECRUIT:{init:d.bind({_serviceName:"RECRUIT"})},WORKDRIVE:{init:d.bind({_serviceName:"WORKDRIVE"})},WRITER:{init:d.bind({_serviceName:"WRITER"})},INVOICE:{init:d.bind({_serviceName:"INVOICE"})},INVENTORY:{init:d.bind({_serviceName:"INVENTORY"})},SUBSCRIPTIONS:{init:d.bind({_serviceName:"SUBSCRIPTIONS"})},CAMPAIGNS:{init:d.bind({_serviceName:"CAMPAIGNS"})},CHARMHEALTHEHR:{init:d.bind({_serviceName:"CHARMHEALTHEHR"})},
// // BIGIN:{init:d.bind({_serviceName:"BIGIN"})},EXPENSE:{init:d.bind({_serviceName:"EXPENSE"})},FSM:{init:d.bind({_serviceName:"FSM"})}}}();var ZCSDK=new function(){var c=!1,f,g=void 0,e={};this._init=function(){if(!c){c=!0;f=new ZSDK;e.appSDK=f;var b;g=new Promise(function(d,a){b=d});f.OnLoad(function(){f.getContext().Event.Trigger("GET_INIT_PARAMS",!0,!0).then(function(d){e.initParams=d;f.getContext().Event.Trigger("GET_QUERY_PARAMS",!0,!0).then(function(a){e.queryParams=a;b()})})})}return g};this._getInitParams=function(){return e.initParams};this._getQueryParams=function(){return e.queryParams};this._getApi=function(){return{API:{RECORDS:new Records(e)},
// // UTIL:new Util(e)}}},ZOHO=new function(){var c=!1,f=new ZSDK.Init,g=void 0,e=void 0,b={},d;g=new Promise(function(a,b){d=a});f.on("Load",function(){d()});return{CREATOR:{API:new Records(b),UTIL:new Util(b),init:function(){if(!c){var a;e=new Promise(function(b,d){a=b});g.then(function(){c=!0;b.appSDK=f;f._sendEvent("GET_INIT_PARAMS",!0,!0).then(function(d){b.initParams=d;f._sendEvent("GET_QUERY_PARAMS",!0,!0).then(function(d){b.queryParams=d;a()})})}).catch(function(){})}return e}}}};
// // function Records(c){function f(b){b.scope||(b.scope=c.initParams.scope);b.envUrlFragment||(b.envUrlFragment=c.initParams.envUrlFragment.substr(1));b.appName||(b.appName=c.initParams.appLinkName)}function g(b,d){var a=!1,c;for(c in b){var e;if(e=!(d&&d.includes(c))){e=b[c];var f=!1,g;if(!(g=!e||null==e||""===e||"string"==typeof e&&0==e.trim().length)&&(g="object"==typeof e))a:{g=void 0;for(g in e){g=!1;break a}g=!0}g&&(f=!0);e=f}e&&(a=!0)}return a}function e(b){return new Promise(function(d,a){var c=
// // new FileReader;c.readAsDataURL(b);c.onload=function(){d(c.result)};c.onerror=function(b){a(b)}})}return{addRecord:function(b){if(g(b))return new Promise(function(b,a){a("Improper Configuration..!!")});f(b);return c.appSDK._sendEvent("ADD_RECORD",{appLinkName:b.appName,formLinkName:b.formName,body:b.data},!0)},updateRecord:function(b){if(g(b))return new Promise(function(a,b){b("Improper Configuration..!!")});var d=b.id.toString().split(",");f(b);return c.appSDK._sendEvent("EDIT_RECORDS",{appLinkName:b.appName,
// // viewLinkName:b.reportName,body:b.data,listOfRecords:d},!0)},deleteRecord:function(b){if(g(b))return new Promise(function(b,a){a("Improper Configuration..!!")});f(b);return c.appSDK._sendEvent("DELETE_RECORDS",{appLinkName:b.appName,viewLinkName:b.reportName,criteria:b.criteria},!0)},getRecordById:function(b){if(g(b))return new Promise(function(b,a){a("Improper Configuration..!!")});f(b);return c.appSDK._sendEvent("GET_RECORD",{appLinkName:b.appName,viewLinkName:b.reportName,id:b.id},!0)},getAllRecords:function(b){if(g(b,
// // ["criteria","page","pageSize"]))return new Promise(function(b,a){a("Improper Configuration..!!")});f(b);return c.appSDK._sendEvent("GET_RECORDS",{appLinkName:b.appName,viewLinkName:b.reportName,criteria:b.criteria,page:b.page,pageSize:b.pageSize},!0)},uploadFile:function(b){if(g(b,["file","parentId"]))return new Promise(function(b,a){a("Improper Configuration..!!")});f(b);return b.file?b.file.size&&50<b.file.size/1024/1024?new Promise(function(b,a){a("Improper Configuration..!!")}):new Promise(function(d,
// // a){var f=e(b.file),g="",q=b.file.name;f.then(function(e){g=e;e={appLinkName:b.appName,viewLinkName:b.reportName,id:b.id,fieldName:b.fieldName,file:g,fileName:q};b.parentId&&(e.parentId=b.parentId);c.appSDK._sendEvent("UPLOAD_FILE",e,!0).then(function(a){d(a)}).catch(function(b){a(b)})}).catch(function(b){a(b)})}):new Promise(function(b,a){a("Improper Configuration..!!")})},getRecordCount:function(b){if(g(b))return new Promise(function(b,a){a("Improper Configuration..!!")});f(b);return c.appSDK._sendEvent("GET_COUNT",
// // {appLinkName:b.appName,viewLinkName:b.reportName,criteria:b.criteria},!0)},readFile:function(b){if(g(b))return new Promise(function(a,b){b("Improper Configuration..!!")});f(b);var d={appLinkName:b.appName,viewLinkName:b.reportName,id:b.id,fieldName:b.fieldName};b.parentId&&(d.parentId=b.parentId);return c.appSDK._sendEvent("READ_FILE",d,!0)}}}
// // function Util(c){return{setImageData:function(f,g,e){if(g.startsWith("/api/v2/")){var b={};b.src=g;c.appSDK._sendEvent("IMAGE_LOAD",b,!0).then(function(b){f.setAttribute("src",b);e({status:"200",statusText:"success"})}).catch(function(b){if(e)e(b);else{var a=window.console;a.log("Error: Unable to set image data");a.log(b)}})}else f.setAttribute("src",g)},getInitParams:function(){return c.initParams},getQueryParams:function(){return c.queryParams},navigateParentURL:function(f){return f&&f.action?c.appSDK._sendEvent("PARENT_NAVIGATION",
// // f,!0):new Promise(function(c,e){e("Improper Configuration..!!")})}}};

var ZSDKUtil=function(c){function f(){}function g(b){var a={};b=b||window.location.href;return b.substr(b.indexOf("?")+1).split("\x26").forEach(function(b){b=b.split("\x3d");a[b[0]]=b[1]}),a.hasOwnProperty("serviceOrigin")&&(a.serviceOrigin=decodeURIComponent(a.serviceOrigin)),a}var e,b=g();return f.prototype.Info=function(){(c.isDevMode()||c.isLogEnabled())&&console.info.apply(console,arguments)},f.prototype.Error=console.error,c.GetQueryParams=g,c.isDevMode=function(){return b&&b.isDevMode},c.isLogEnabled=
function(){return b&&b.isLogEnabled},c.getLogger=function(){return e&&e instanceof f||(e=new f),e},c}(window.ZSDKUtil||{}),ZSDKMessageManager=function(c){function f(a){try{var e="string"==typeof a.data?JSON.parse(a.data):a.data}catch(u){e=a.data}var c=e.type;try{var f;if(!(f="__REGISTER__"===c)){var l=a.source,k=a.origin;f=!(!h.isRegistered()||p!==l||v!==k)||Error("Un-Authorized Message.")}if(f)switch(c){case "__REGISTER__":a=e;p=window.parent;v=w.serviceOrigin;h.dcType=window.location.origin.split(".").pop().toUpperCase();
"COM"===h.dcType&&(h.dcType="US");h.key=a.uniqueID;h.parentWindow=p;h._isRegistered=!0;d({type:"__REGISTER__",widgetOrigin:q(),uniqueID:h.key},h);b(h,"Load",a.data);break;case "__EVENT_RESPONSE__":var n=e.promiseID,r=e.data,t=e.isSuccess;m.hasOwnProperty(n)&&(t?m[n].resolve(r):m[n].reject(r),m[n]=void 0,delete m[n]);break;default:g(a,e)}}catch(u){x.Error("[SDK.MessageHandler] \x3d\x3e ",u.stack)}}function g(a,d){ var c=d.widgetID;a=d.eventName;if(h.key===c)var f=b(h,a,d.data);else{var l=h._childWidgets[c];l&&(f=b(l,a,d.data))}if(d.isPromise){var k={};Promise.all(f).then(function(a){k.response=a;k.widgetID=c;k.sourceWidgetID=h.key;e(d,k)}).catch(function(a){k.response=a;k.widgetID=c;k.sourceWidgetID=h.key;e(d,k)})}}function e(a,b){d({type:"__EVENT_RESPONSE__",widgetOrigin:q(),uniqueID:h.key,eventName:a.eventName,data:b,promiseID:a.promiseID},h)}function b(a,b,d){
b=a.eventHandlers[b];var e=[];if(Array.isArray(b))for(var c=0;c<b.length;c++){try{var f=b[c].call(a,d);var l=f instanceof Promise?f.then(function(a){return{isSuccess:!0,
response:a}}).catch(function(a){return{isSuccess:!1,response:a}}):{isSuccess:!0,response:f}}catch(r){l={isSuccess:!1,response:r}}e.push(l)}return e}function d(b,d){var e,c=b.isPromise;if(c&&(e="Promise"+t++,b.promiseID=e),d&&(b.uniqueID=(d.parentWidget||d).key,b.widgetID=d.key),b.time=(new Date).getTime(),k(b),c)return a(e)}function a(a){return new Promise(function(b,d){m[a]={resolve:b,reject:d,time:(new Date).getTime()}})}function l(){k({type:"__DEREGISTER__",uniqueID:h.key})}function k(a){if("object"==
typeof a&&(a.widgetOrigin=encodeURIComponent(q())),!p)throw Error("Parentwindow reference not found.");p.postMessage(a,w.serviceOrigin)}function q(){return window.location.protocol+"//"+window.location.host+ '/'}var h,p,v,x=ZSDKUtil.getLogger(),t=100,m={},w=ZSDKUtil.GetQueryParams();return c.Init=function(a){h=a;window.addEventListener("message",f);window.addEventListener("unload",l)},c.SendEvent=d,c}(window.ZSDKMessageManager||{});
window.ZSDK=function(){function c(e){this.serviceOrigin=e.serviceOrigin||g.serviceOrigin;this.parentWidget=e.parentWidget;this.key=e.key;this._isRegistered=!1;this._childWidgets={};this.eventHandlers=Object.create(null);this.meta}var f,g=ZSDKUtil.GetQueryParams();return c.prototype.on=function(e,b){if("string"!=typeof e)throw Error("Invalid eventname parameter passed.");if("function"!=typeof b)throw Error("Invalid function parameter passed.");var d=this.eventHandlers[e];if(Array.isArray(d)||(this.eventHandlers[e]=
d=[]),d.push(b),"Load"!==e){var a={type:"__EVENT_BIND__",eventName:e,count:d.length};this.parentWidget&&!this.parentWidget.isRegistered()||!this.parentWidget&&!this.isRegistered()?(this.parentWidget||this).on("Load",function(){ZSDKMessageManager.SendEvent(a,this)}):ZSDKMessageManager.SendEvent(a,this)}},c.prototype.off=function(e,b){if("string"!=typeof e)throw Error("Invalid eventname parameter passed.");if("function"!=typeof b)throw Error("Invalid function parameter passed.");e=this.eventHandlers[e];
if(Array.isArray(e)){var d,a=[];for(d=0;d<e.length;d++)e[d]===b&&a.push(d);for(;a.length;)e.splice(a.pop(),1)}},c.prototype._sendEvent=function(e,b,d){return ZSDKMessageManager.SendEvent({type:"__EVENT__",eventName:e,data:b,isPromise:d},this)},c.prototype.emit=function(e,b){ZSDKMessageManager.SendEvent({type:"__EMIT__",eventName:e,data:b},this)},c.prototype.isRegistered=function(){return this._isRegistered},c.prototype.fetch=function(e){return ZSDKMessageManager.SendEvent({eventName:"__HTTP__",isPromise:!0,
options:e},this)},c.prototype.createInstance=function(e){return ZSDKMessageManager.SendEvent({eventName:"__CREATE_INSTANCE__",isPromise:!0,options:e},this)},c.prototype.modal=function(e){return"object"==typeof e&&(e.location="__MODAL__"),this.createInstance(e)},c.prototype.getWidgets=function(){return ZSDKMessageManager.SendEvent({eventName:"__WIDGETS_INFO__",isPromise:!0},this)},c.prototype.getWidgetInstance=function(e){if("string"!=typeof e)throw Error("Invalid WidgetID passed");if(this.parentWidget)return this.parentWidget.getWidgetInstance(e);
var b=this._childWidgets[e];return b||(this._childWidgets[e]=b=new c({key:e,parentWidget:this})),b},c.prototype.getFileObject=function(e){return new File([e.slice(0,e.size)],e.name,{type:e.type})},{Init:function(){return f||(f=new c({serviceOrigin:g.serviceOrigin}),ZSDKMessageManager.Init(f),f)},_getRootInstance:function(){return f}}}();
window.SigmaSDK=function(){function c(a){this._serviceName=a}var f,g=function(){if(!f.isRegistered())throw Error("App not registered.");},e=function(a,b){return f._sendEvent("SIGMA_"+a+"_EVENT",b,!0)},b=function(a,b){return Promise.reject({type:a,message:b})};c.prototype.isRegistered=function(){return f.isRegistered()};c.prototype.context=function(){return g(),f};c.prototype.createWidget=function(a){return g(),f.createInstance(a)};c.prototype.getWidget=function(a){return f.getWidgetInstance(a)};c.prototype.widgetsMeta=
function(){return g(),f.getWidgets()};c.prototype.on=function(a,b){return f.on(a,b)};c.prototype.off=function(a,b){return f.off(a,b)};c.prototype.trigger=function(a,b){return g(),f.emit(a,b)};c.prototype.modal=function(a){return g(),f.modal(a)};c.prototype.fetch=function(a){return g(),f.fetch(a)};c.prototype.get=function(a,d){if(g(),"string"!=typeof a&&!Array.isArray(a))return b("VALIDATION_ERROR","The get method accepts String or Array of Strings only.");a="string"==typeof a?[a]:a;if(0>=a.length)return b("VALIDATION_ERROR",
"The get method should not accept empty Array of Strings.");a={event_type:"get",properties:a};return"function"==typeof d&&f.on("get",d),e(this._serviceName,a)};c.prototype.getAll=function(a,d,c){if(g(),"string"!=typeof a)return b("VALIDATION_ERROR","The getAll method accepts module_name as String only.");a={event_type:"get_all",module_name:a,options:d};return"function"==typeof c&&f.on("get_all",c),e(this._serviceName,a)};c.prototype.set=function(a,d,c){if(g(),"string"!=typeof a&&"object"!=typeof a&&
Array.isArray(a))return b("VALIDATION_ERROR","The set method accepts key-value pair or Object of key-value pairs only.");var k;if("string"==typeof a?(k={},k[a]=d):k=a,0>=k.length)return b("VALIDATION_ERROR","The set method should not accept empty Object.");a={event_type:"set",properties:k};return"function"==typeof c&&f.on("set",c),e(this._serviceName,a)};c.prototype.remove=function(a,d){if(g(),"string"!=typeof a&&!Array.isArray(a))return b("VALIDATION_ERROR","The remove method accepts String or Array of Strings only.");
a="string"==typeof a?[a]:a;if(0>=a.length)return b("VALIDATION_ERROR","The remove method should not accept empty Array of Strings.");a={event_type:"remove",properties:a};return"function"==typeof d&&f.on("remove",d),e(this._serviceName,a)};c.prototype.request=function(a,d){if(g(),!a.url||0>=a.url.trim().length)return b("VALIDATION_ERROR","The parameter url should not be empty");if("string"!=typeof a.url)return b("VALIDATION_ERROR","The parameter url should be type of string");if(a.method||(a.method=
"GET"),a.params&&"object"!=typeof a.params&&Array.isArray(a.params))return b("VALIDATION_ERROR","The parameter params should be type of object");if(a.headers&&"object"!=typeof a.headers&&Array.isArray(a.headers))return b("VALIDATION_ERROR","The parameter headers should be type of object");if(a.files)if(Array.isArray(a.files))for(var c=0;c<a.files.length;c++)a.files[c]=f.getFileObject(a.files[c]);else{if("object"!=typeof a.files)return b("VALIDATION_ERROR","The parameter files should be type of object");
if(5<Object.keys(a.files).length)return b("VALIDATION_ERROR","You can upload a maximum of 5 files at a time.")}a={event_type:"request",options:a};return"function"==typeof d&&f.on("request",d),e(this._serviceName,a)};c.prototype.requestapiconnection=function(a,d){if(g(),!a.api_namespace||0>=a.api_namespace.trim().length)return b("VALIDATION_ERROR","The parameter api_namespace should not be empty");if("string"!=typeof a.api_namespace)return b("VALIDATION_ERROR","The parameter api_namespace should be type of string");
if(!a.url||0>=a.url.trim().length)return b("VALIDATION_ERROR","The parameter url should not be empty");if("string"!=typeof a.url)return b("VALIDATION_ERROR","The parameter url should be type of string");if(a.method||(a.method="GET"),a.params&&"object"!=typeof a.params&&Array.isArray(a.params))return b("VALIDATION_ERROR","The parameter params should be type of object");if(a.headers&&"object"!=typeof a.headers&&Array.isArray(a.headers))return b("VALIDATION_ERROR","The parameter headers should be type of object");
if(a.files)if(Array.isArray(a.files))for(var c=0;c<a.files.length;c++)a.files[c]=f.getFileObject(a.files[c]);else{if("object"!=typeof a.files)return b("VALIDATION_ERROR","The parameter files should be type of object");if(5<Object.keys(a.files).length)return b("VALIDATION_ERROR","You can upload a maximum of 5 files at a time.")}a={event_type:"requestapiconnection",options:a};return"function"==typeof d&&f.on("requestapiconnection",d),e(this._serviceName,a)};c.prototype.dispatch=function(a,b,d){g();
b={event_type:a,options:b};return"function"==typeof d&&f.on(a,d),e(this._serviceName,b)};var d=function(a){return f=window.ZSDK.Init(),"function"==typeof a&&(f.isRegistered()?a.call():f.on("Load",a)),new c(this._serviceName)};return{CRM:{init:d.bind({_serviceName:"CRM"})},DESK:{init:d.bind({_serviceName:"DESK"})},PROJECTS:{init:d.bind({_serviceName:"PROJECTS"})},ORCHESTLY:{init:d.bind({_serviceName:"ORCHESTLY"})},MAIL:{init:d.bind({_serviceName:"MAIL"})},SHOW:{init:d.bind({_serviceName:"SHOW"})},
SDP:{init:d.bind({_serviceName:"SDP"})},IOT:{init:d.bind({_serviceName:"IOT"})},ZAPPS:{init:d.bind({_serviceName:"ZAPPS"})},CATALYST:{init:d.bind({_serviceName:"CATALYST"})},FINANCE:{init:d.bind({_serviceName:"FINANCE"})},CONNECT:{init:d.bind({_serviceName:"CONNECT"})},TEAMINBOX:{init:d.bind({_serviceName:"TEAMINBOX"})},SPRINTS:{init:d.bind({_serviceName:"SPRINTS"})},BUGTRACKER:{init:d.bind({_serviceName:"BUGTRACKER"})},CREATOR:{init:d.bind({_serviceName:"CREATOR"})},PEOPLE:{init:d.bind({_serviceName:"PEOPLE"})},
COMMERCE:{init:d.bind({_serviceName:"COMMERCE"})},SITES:{init:d.bind({_serviceName:"SITES"})},RECRUIT:{init:d.bind({_serviceName:"RECRUIT"})},WORKDRIVE:{init:d.bind({_serviceName:"WORKDRIVE"})},WRITER:{init:d.bind({_serviceName:"WRITER"})},INVOICE:{init:d.bind({_serviceName:"INVOICE"})},INVENTORY:{init:d.bind({_serviceName:"INVENTORY"})},SUBSCRIPTIONS:{init:d.bind({_serviceName:"SUBSCRIPTIONS"})},CAMPAIGNS:{init:d.bind({_serviceName:"CAMPAIGNS"})},CHARMHEALTHEHR:{init:d.bind({_serviceName:"CHARMHEALTHEHR"})},
BIGIN:{init:d.bind({_serviceName:"BIGIN"})},EXPENSE:{init:d.bind({_serviceName:"EXPENSE"})},FSM:{init:d.bind({_serviceName:"FSM"})}}}();var ZCSDK=new function(){var c=!1,f,g=void 0,e={};this._init=function(){if(!c){c=!0;f=new ZSDK;e.appSDK=f;var b;g=new Promise(function(d,a){b=d});f.OnLoad(function(){f.getContext().Event.Trigger("GET_INIT_PARAMS",!0,!0).then(function(d){e.initParams=d;f.getContext().Event.Trigger("GET_QUERY_PARAMS",!0,!0).then(function(a){e.queryParams=a;b()})})})}return g};this._getInitParams=function(){return e.initParams};this._getQueryParams=function(){return e.queryParams};this._getApi=function(){return{API:{RECORDS:new Records(e)},
UTIL:new Util(e)}}},ZOHO=new function(){var c=!1,f=new ZSDK.Init,g=void 0,e=void 0,b={},d;g=new Promise(function(a,b){d=a});f.on("Load",function(){d()});return{CREATOR:{API:new Records(b),UTIL:new Util(b),init:function(){if(!c){var a;e=new Promise(function(b,d){a=b});g.then(function(){c=!0;b.appSDK=f;f._sendEvent("GET_INIT_PARAMS",!0,!0).then(function(d){b.initParams=d;f._sendEvent("GET_QUERY_PARAMS",!0,!0).then(function(d){b.queryParams=d;a()})})}).catch(function(){})}return e}}}};
function Records(c){function f(b){b.scope||(b.scope=c.initParams.scope);b.envUrlFragment||(b.envUrlFragment=c.initParams.envUrlFragment.substr(1));b.appName||(b.appName=c.initParams.appLinkName)}function g(b,d){var a=!1,c;for(c in b){var e;if(e=!(d&&d.includes(c))){e=b[c];var f=!1,g;if(!(g=!e||null==e||""===e||"string"==typeof e&&0==e.trim().length)&&(g="object"==typeof e))a:{g=void 0;for(g in e){g=!1;break a}g=!0}g&&(f=!0);e=f}e&&(a=!0)}return a}function e(b){return new Promise(function(d,a){var c=
new FileReader;c.readAsDataURL(b);c.onload=function(){d(c.result)};c.onerror=function(b){a(b)}})}return{addRecord:function(b){if(g(b))return new Promise(function(b,a){a("Improper Configuration..!!")});f(b);return c.appSDK._sendEvent("ADD_RECORD",{appLinkName:b.appName,formLinkName:b.formName,body:b.data},!0)},updateRecord:function(b){if(g(b))return new Promise(function(a,b){b("Improper Configuration..!!")});var d=b.id.toString().split(",");f(b);return c.appSDK._sendEvent("EDIT_RECORDS",{appLinkName:b.appName,
viewLinkName:b.reportName,body:b.data,listOfRecords:d},!0)},deleteRecord:function(b){if(g(b))return new Promise(function(b,a){a("Improper Configuration..!!")});f(b);return c.appSDK._sendEvent("DELETE_RECORDS",{appLinkName:b.appName,viewLinkName:b.reportName,criteria:b.criteria},!0)},getRecordById:function(b){if(g(b))return new Promise(function(b,a){a("Improper Configuration..!!")});f(b);return c.appSDK._sendEvent("GET_RECORD",{appLinkName:b.appName,viewLinkName:b.reportName,id:b.id},!0)},getAllRecords:function(b){if(g(b,["criteria","page","pageSize"]))return new Promise(function(b,a){a("Improper Configuration..!!")});f(b);return c.appSDK._sendEvent("GET_RECORDS",{appLinkName:b.appName,viewLinkName:b.reportName,criteria:b.criteria,page:b.page,pageSize:b.pageSize},!0)},uploadFile:function(b){if(g(b,["file","parentId"]))return new Promise(function(b,a){a("Improper Configuration..!!")});f(b);return b.file?b.file.size&&50<b.file.size/1024/1024?new Promise(function(b,a){a("Improper Configuration..!!")}):new Promise(function(d,
a){var f=e(b.file),g="",q=b.file.name;f.then(function(e){g=e;e={appLinkName:b.appName,viewLinkName:b.reportName,id:b.id,fieldName:b.fieldName,file:g,fileName:q};b.parentId&&(e.parentId=b.parentId);c.appSDK._sendEvent("UPLOAD_FILE",e,!0).then(function(a){d(a)}).catch(function(b){a(b)})}).catch(function(b){a(b)})}):new Promise(function(b,a){a("Improper Configuration..!!")})},getRecordCount:function(b){if(g(b))return new Promise(function(b,a){a("Improper Configuration..!!")});f(b);return c.appSDK._sendEvent("GET_COUNT",
{appLinkName:b.appName,viewLinkName:b.reportName,criteria:b.criteria},!0)},readFile:function(b){if(g(b))return new Promise(function(a,b){b("Improper Configuration..!!")});f(b);var d={appLinkName:b.appName,viewLinkName:b.reportName,id:b.id,fieldName:b.fieldName};b.parentId&&(d.parentId=b.parentId);return c.appSDK._sendEvent("READ_FILE",d,!0)}}}
function Util(c){return{setImageData:function(f,g,e){if(g.startsWith("/api/v2/")){var b={};b.src=g;c.appSDK._sendEvent("IMAGE_LOAD",b,!0).then(function(b){f.setAttribute("src",b);e({status:"200",statusText:"success"})}).catch(function(b){if(e)e(b);else{var a=window.console;a.log("Error: Unable to set image data");a.log(b)}})}else f.setAttribute("src",g)},getInitParams:function(){return c.initParams},getQueryParams:function(){return c.queryParams},navigateParentURL:function(f){return f&&f.action?c.appSDK._sendEvent("PARENT_NAVIGATION",
f,!0):new Promise(function(c,e){e("Improper Configuration..!!")})}}};

module.exports={ZOHO};

// export default ZOHO;
