import {
  __commonJS
} from "./chunk-WKYGNSYM.js";

// node_modules/highcharts/indicators/indicators-all.js
var require_indicators_all = __commonJS({
  "node_modules/highcharts/indicators/indicators-all.js"(exports, module) {
    !/**
    * Highstock JS v11.4.0 (2024-03-04)
    *
    * All technical indicators for Highcharts Stock
    *
    * (c) 2010-2024 Pawel Fus
    *
    * License: www.highcharts.com/license
    */
    function(e) {
      "object" == typeof module && module.exports ? (e.default = e, module.exports = e) : "function" == typeof define && define.amd ? define("highcharts/indicators/indicators-all", ["highcharts", "highcharts/modules/stock"], function(t) {
        return e(t), e.Highcharts = t, e;
      }) : e("undefined" != typeof Highcharts ? Highcharts : void 0);
    }(function(e) {
      "use strict";
      var t = e ? e._modules : {};
      function s(e2, t2, s2, i) {
        e2.hasOwnProperty(t2) || (e2[t2] = i.apply(null, s2), "function" == typeof CustomEvent && window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded", { detail: { path: t2, module: e2[t2] } })));
      }
      s(t, "Stock/Indicators/SMA/SMAIndicator.js", [t["Core/Chart/Chart.js"], t["Core/Series/SeriesRegistry.js"], t["Core/Utilities.js"]], function(e2, t2, s2) {
        let { line: i } = t2.seriesTypes, { addEvent: o, fireEvent: a, error: r, extend: n, isArray: l, merge: p, pick: u, splat: h } = s2;
        class d extends i {
          destroy() {
            this.dataEventsToUnbind.forEach(function(e3) {
              e3();
            }), super.destroy.apply(this, arguments);
          }
          getName() {
            let e3 = [], t3 = this.name;
            return t3 || ((this.nameComponents || []).forEach(function(t4, s3) {
              e3.push(this.options.params[t4] + u(this.nameSuffixes[s3], ""));
            }, this), t3 = (this.nameBase || this.type.toUpperCase()) + (this.nameComponents ? " (" + e3.join(", ") + ")" : "")), t3;
          }
          getValues(e3, t3) {
            let s3 = t3.period, i2 = e3.xData, o2 = e3.yData, a2 = o2.length, r2 = [], n2 = [], p2 = [], u2, h2 = -1, d2 = 0, c, g = 0;
            if (!(i2.length < s3)) {
              for (l(o2[0]) && (h2 = t3.index ? t3.index : 0); d2 < s3 - 1; )
                g += h2 < 0 ? o2[d2] : o2[d2][h2], d2++;
              for (u2 = d2; u2 < a2; u2++)
                g += h2 < 0 ? o2[u2] : o2[u2][h2], c = [i2[u2], g / s3], r2.push(c), n2.push(c[0]), p2.push(c[1]), g -= h2 < 0 ? o2[u2 - d2] : o2[u2 - d2][h2];
              return { values: r2, xData: n2, yData: p2 };
            }
          }
          init(t3, s3) {
            let i2 = this;
            super.init.call(i2, t3, s3);
            let a2 = o(e2, "afterLinkSeries", function({ isUpdating: e3 }) {
              if (e3)
                return;
              let s4 = !!i2.dataEventsToUnbind.length;
              if (!i2.linkedParent)
                return r("Series " + i2.options.linkedTo + " not found! Check `linkedTo`.", false, t3);
              if (!s4 && (i2.dataEventsToUnbind.push(o(i2.linkedParent, "updatedData", function() {
                i2.recalculateValues();
              })), i2.calculateOn.xAxis && i2.dataEventsToUnbind.push(o(i2.linkedParent.xAxis, i2.calculateOn.xAxis, function() {
                i2.recalculateValues();
              }))), "init" === i2.calculateOn.chart)
                i2.processedYData || i2.recalculateValues();
              else if (!s4) {
                let e4 = o(i2.chart, i2.calculateOn.chart, function() {
                  i2.recalculateValues(), e4();
                });
              }
            }, { order: 0 });
            i2.dataEventsToUnbind = [], i2.eventsToUnbind.push(a2);
          }
          recalculateValues() {
            let e3 = [], t3 = this.points || [], s3 = (this.xData || []).length, i2 = true, o2, r2, n2, l2, p2, u2, d2 = this.linkedParent.options && this.linkedParent.yData && this.linkedParent.yData.length && this.getValues(this.linkedParent, this.options.params) || { values: [], xData: [], yData: [] };
            if (s3 && !this.hasGroupedData && this.visible && this.points) {
              if (this.cropped) {
                for (this.xAxis && (l2 = this.xAxis.min, p2 = this.xAxis.max), n2 = this.cropData(d2.xData, d2.yData, l2, p2), u2 = 0; u2 < n2.xData.length; u2++)
                  e3.push([n2.xData[u2]].concat(h(n2.yData[u2])));
                o2 = d2.xData.indexOf(this.xData[0]), r2 = d2.xData.indexOf(this.xData[this.xData.length - 1]), -1 === o2 && r2 === d2.xData.length - 2 && e3[0][0] === t3[0].x && e3.shift(), this.updateData(e3);
              } else
                (this.updateAllPoints || d2.xData.length !== s3 - 1 && d2.xData.length !== s3 + 1) && (i2 = false, this.updateData(d2.values));
            }
            i2 && (this.xData = d2.xData, this.yData = d2.yData, this.options.data = d2.values), this.calculateOn.xAxis && this.processedXData && (delete this.processedXData, this.isDirty = true, this.redraw()), this.isDirtyData = !!this.linkedSeries.length, a(this, "updatedData");
          }
          processData() {
            let e3 = this.options.compareToMain, t3 = this.linkedParent;
            super.processData.apply(this, arguments), this.dataModify && t3 && t3.dataModify && t3.dataModify.compareValue && e3 && (this.dataModify.compareValue = t3.dataModify.compareValue);
          }
        }
        return d.defaultOptions = p(i.defaultOptions, { name: void 0, tooltip: { valueDecimals: 4 }, linkedTo: void 0, compareToMain: false, params: { index: 3, period: 14 } }), n(d.prototype, { calculateOn: { chart: "init" }, hasDerivedData: true, nameComponents: ["period"], nameSuffixes: [], useCommonDataGrouping: true }), t2.registerSeriesType("sma", d), d;
      }), s(t, "Stock/Indicators/EMA/EMAIndicator.js", [t["Core/Series/SeriesRegistry.js"], t["Core/Utilities.js"]], function(e2, t2) {
        let { sma: s2 } = e2.seriesTypes, { correctFloat: i, isArray: o, merge: a } = t2;
        class r extends s2 {
          accumulatePeriodPoints(e3, t3, s3) {
            let i2 = 0, o2 = 0;
            for (; o2 < e3; )
              i2 += t3 < 0 ? s3[o2] : s3[o2][t3], o2++;
            return i2;
          }
          calculateEma(e3, t3, s3, o2, a2, r2, n) {
            let l = e3[s3 - 1], p = r2 < 0 ? t3[s3 - 1] : t3[s3 - 1][r2];
            return [l, void 0 === a2 ? n : i(p * o2 + a2 * (1 - o2))];
          }
          getValues(e3, t3) {
            let s3 = t3.period, i2 = e3.xData, a2 = e3.yData, r2 = a2 ? a2.length : 0, n = 2 / (s3 + 1), l = [], p = [], u = [], h, d, c, g = -1, y = 0;
            if (!(r2 < s3)) {
              for (o(a2[0]) && (g = t3.index ? t3.index : 0), y = this.accumulatePeriodPoints(s3, g, a2) / s3, c = s3; c < r2 + 1; c++)
                d = this.calculateEma(i2, a2, c, n, h, g, y), l.push(d), p.push(d[0]), u.push(d[1]), h = d[1];
              return { values: l, xData: p, yData: u };
            }
          }
        }
        return r.defaultOptions = a(s2.defaultOptions, { params: { index: 3, period: 9 } }), e2.registerSeriesType("ema", r), r;
      }), s(t, "Stock/Indicators/AD/ADIndicator.js", [t["Core/Series/SeriesRegistry.js"], t["Core/Utilities.js"]], function(e2, t2) {
        let { sma: s2 } = e2.seriesTypes, { error: i, extend: o, merge: a } = t2;
        class r extends s2 {
          static populateAverage(e3, t3, s3, i2, o2) {
            let a2 = t3[i2][1], r2 = t3[i2][2], n = t3[i2][3], l = s3[i2];
            return [e3[i2], n === a2 && n === r2 || a2 === r2 ? 0 : (2 * n - r2 - a2) / (a2 - r2) * l];
          }
          getValues(e3, t3) {
            let s3, o2, a2;
            let n = t3.period, l = e3.xData, p = e3.yData, u = t3.volumeSeriesID, h = e3.chart.get(u), d = h && h.yData, c = p ? p.length : 0, g = [], y = [], m = [];
            if (!(l.length <= n) || !c || 4 === p[0].length) {
              if (!h) {
                i("Series " + u + " not found! Check `volumeSeriesID`.", true, e3.chart);
                return;
              }
              for (o2 = n; o2 < c; o2++)
                s3 = g.length, a2 = r.populateAverage(l, p, d, o2, n), s3 > 0 && (a2[1] += g[s3 - 1][1]), g.push(a2), y.push(a2[0]), m.push(a2[1]);
              return { values: g, xData: y, yData: m };
            }
          }
        }
        return r.defaultOptions = a(s2.defaultOptions, { params: { index: void 0, volumeSeriesID: "volume" } }), o(r.prototype, { nameComponents: false, nameBase: "Accumulation/Distribution" }), e2.registerSeriesType("ad", r), r;
      }), s(t, "Stock/Indicators/AO/AOIndicator.js", [t["Core/Globals.js"], t["Core/Series/SeriesRegistry.js"], t["Core/Utilities.js"]], function(e2, t2, s2) {
        let { noop: i } = e2, { column: { prototype: o }, sma: a } = t2.seriesTypes, { extend: r, merge: n, correctFloat: l, isArray: p } = s2;
        class u extends a {
          drawGraph() {
            let e3;
            let t3 = this.options, s3 = this.points, i2 = this.userOptions.color, o2 = t3.greaterBarColor, a2 = t3.lowerBarColor, r2 = s3[0];
            if (!i2 && r2)
              for (e3 = 1, r2.color = o2; e3 < s3.length; e3++)
                s3[e3].y > s3[e3 - 1].y ? s3[e3].color = o2 : s3[e3].y < s3[e3 - 1].y ? s3[e3].color = a2 : s3[e3].color = s3[e3 - 1].color;
          }
          getValues(e3) {
            let t3 = e3.xData || [], s3 = e3.yData || [], i2 = s3.length, o2 = [], a2 = [], r2 = [], n2, u2, h, d, c, g, y = 0, m = 0;
            if (!(t3.length <= 34) && p(s3[0]) && 4 === s3[0].length) {
              for (c = 0; c < 33; c++)
                d = (s3[c][1] + s3[c][2]) / 2, c >= 29 && (m = l(m + d)), y = l(y + d);
              for (g = 33; g < i2; g++)
                m = l(m + (d = (s3[g][1] + s3[g][2]) / 2)), y = l(y + d), n2 = l(m / 5 - y / 34), o2.push([t3[g], n2]), a2.push(t3[g]), r2.push(n2), u2 = g + 1 - 5, h = g + 1 - 34, m = l(m - (s3[u2][1] + s3[u2][2]) / 2), y = l(y - (s3[h][1] + s3[h][2]) / 2);
              return { values: o2, xData: a2, yData: r2 };
            }
          }
        }
        return u.defaultOptions = n(a.defaultOptions, { params: { index: void 0, period: void 0 }, greaterBarColor: "#06b535", lowerBarColor: "#f21313", threshold: 0, groupPadding: 0.2, pointPadding: 0.2, crisp: false, states: { hover: { halo: { size: 0 } } } }), r(u.prototype, { nameBase: "AO", nameComponents: void 0, markerAttribs: i, getColumnMetrics: o.getColumnMetrics, crispCol: o.crispCol, translate: o.translate, drawPoints: o.drawPoints }), t2.registerSeriesType("ao", u), u;
      }), s(t, "Stock/Indicators/MultipleLinesComposition.js", [t["Core/Series/SeriesRegistry.js"], t["Core/Utilities.js"]], function(e2, t2) {
        var s2;
        let { sma: { prototype: i } } = e2.seriesTypes, { defined: o, error: a, merge: r } = t2;
        return function(e3) {
          let t3 = ["bottomLine"], s3 = ["top", "bottom"], n = ["top"];
          function l(e4) {
            return "plot" + e4.charAt(0).toUpperCase() + e4.slice(1);
          }
          function p(e4, t4) {
            let s4 = [];
            return (e4.pointArrayMap || []).forEach((e5) => {
              e5 !== t4 && s4.push(l(e5));
            }), s4;
          }
          function u() {
            let e4 = this, t4 = e4.pointValKey, s4 = e4.linesApiNames, n2 = e4.areaLinesNames, u2 = e4.points, h2 = e4.options, d2 = e4.graph, c2 = { options: { gapSize: h2.gapSize } }, g = [], y = p(e4, t4), m = u2.length, f;
            if (y.forEach((e5, t5) => {
              for (g[t5] = []; m--; )
                f = u2[m], g[t5].push({ x: f.x, plotX: f.plotX, plotY: f[e5], isNull: !o(f[e5]) });
              m = u2.length;
            }), e4.userOptions.fillColor && n2.length) {
              let t5 = g[y.indexOf(l(n2[0]))], s5 = 1 === n2.length ? u2 : g[y.indexOf(l(n2[1]))], o2 = e4.color;
              e4.points = s5, e4.nextPoints = t5, e4.color = e4.userOptions.fillColor, e4.options = r(u2, c2), e4.graph = e4.area, e4.fillGraph = true, i.drawGraph.call(e4), e4.area = e4.graph, delete e4.nextPoints, delete e4.fillGraph, e4.color = o2;
            }
            s4.forEach((t5, s5) => {
              g[s5] ? (e4.points = g[s5], h2[t5] ? e4.options = r(h2[t5].styles, c2) : a('Error: "There is no ' + t5 + ' in DOCS options declared. Check if linesApiNames are consistent with your DOCS line names."'), e4.graph = e4["graph" + t5], i.drawGraph.call(e4), e4["graph" + t5] = e4.graph) : a('Error: "' + t5 + ` doesn't have equivalent in pointArrayMap. To many elements in linesApiNames relative to pointArrayMap."`);
            }), e4.points = u2, e4.options = h2, e4.graph = d2, i.drawGraph.call(e4);
          }
          function h(e4) {
            let t4, s4 = [], o2 = [];
            if (e4 = e4 || this.points, this.fillGraph && this.nextPoints) {
              if ((t4 = i.getGraphPath.call(this, this.nextPoints)) && t4.length) {
                t4[0][0] = "L", s4 = i.getGraphPath.call(this, e4), o2 = t4.slice(0, s4.length);
                for (let e5 = o2.length - 1; e5 >= 0; e5--)
                  s4.push(o2[e5]);
              }
            } else
              s4 = i.getGraphPath.apply(this, arguments);
            return s4;
          }
          function d(e4) {
            let t4 = [];
            return (this.pointArrayMap || []).forEach((s4) => {
              t4.push(e4[s4]);
            }), t4;
          }
          function c() {
            let e4 = this.pointArrayMap, t4 = [], s4;
            t4 = p(this), i.translate.apply(this, arguments), this.points.forEach((i2) => {
              e4.forEach((e5, o2) => {
                s4 = i2[e5], this.dataModify && (s4 = this.dataModify.modifyValue(s4)), null !== s4 && (i2[t4[o2]] = this.yAxis.toPixels(s4, true));
              });
            });
          }
          e3.compose = function(e4) {
            let i2 = e4.prototype;
            return i2.linesApiNames = i2.linesApiNames || t3.slice(), i2.pointArrayMap = i2.pointArrayMap || s3.slice(), i2.pointValKey = i2.pointValKey || "top", i2.areaLinesNames = i2.areaLinesNames || n.slice(), i2.drawGraph = u, i2.getGraphPath = h, i2.toYData = d, i2.translate = c, e4;
          };
        }(s2 || (s2 = {})), s2;
      }), s(t, "Stock/Indicators/Aroon/AroonIndicator.js", [t["Stock/Indicators/MultipleLinesComposition.js"], t["Core/Series/SeriesRegistry.js"], t["Core/Utilities.js"]], function(e2, t2, s2) {
        let { sma: i } = t2.seriesTypes, { extend: o, merge: a, pick: r } = s2;
        function n(e3, t3) {
          let s3 = e3[0], i2 = 0, o2;
          for (o2 = 1; o2 < e3.length; o2++)
            ("max" === t3 && e3[o2] >= s3 || "min" === t3 && e3[o2] <= s3) && (s3 = e3[o2], i2 = o2);
          return i2;
        }
        class l extends i {
          getValues(e3, t3) {
            let s3, i2, o2, a2, l2;
            let p = t3.period, u = e3.xData, h = e3.yData, d = h ? h.length : 0, c = [], g = [], y = [];
            for (a2 = p - 1; a2 < d; a2++)
              o2 = n((l2 = h.slice(a2 - p + 1, a2 + 2)).map(function(e4) {
                return r(e4[2], e4);
              }), "min"), s3 = n(l2.map(function(e4) {
                return r(e4[1], e4);
              }), "max") / p * 100, i2 = o2 / p * 100, u[a2 + 1] && (c.push([u[a2 + 1], s3, i2]), g.push(u[a2 + 1]), y.push([s3, i2]));
            return { values: c, xData: g, yData: y };
          }
        }
        return l.defaultOptions = a(i.defaultOptions, { params: { index: void 0, period: 25 }, marker: { enabled: false }, tooltip: { pointFormat: '<span style="color:{point.color}">●</span><b> {series.name}</b><br/>Aroon Up: {point.y}<br/>Aroon Down: {point.aroonDown}<br/>' }, aroonDown: { styles: { lineWidth: 1, lineColor: void 0 } }, dataGrouping: { approximation: "averages" } }), o(l.prototype, { areaLinesNames: [], linesApiNames: ["aroonDown"], nameBase: "Aroon", pointArrayMap: ["y", "aroonDown"], pointValKey: "y" }), e2.compose(l), t2.registerSeriesType("aroon", l), l;
      }), s(t, "Stock/Indicators/AroonOscillator/AroonOscillatorIndicator.js", [t["Stock/Indicators/MultipleLinesComposition.js"], t["Core/Series/SeriesRegistry.js"], t["Core/Utilities.js"]], function(e2, t2, s2) {
        let { aroon: i } = t2.seriesTypes, { extend: o, merge: a } = s2;
        class r extends i {
          getValues(e3, t3) {
            let s3, i2;
            let o2 = [], a2 = [], r2 = [], n = super.getValues.call(this, e3, t3);
            for (i2 = 0; i2 < n.yData.length; i2++)
              s3 = n.yData[i2][0] - n.yData[i2][1], o2.push([n.xData[i2], s3]), a2.push(n.xData[i2]), r2.push(s3);
            return { values: o2, xData: a2, yData: r2 };
          }
        }
        return r.defaultOptions = a(i.defaultOptions, { tooltip: { pointFormat: '<span style="color:{point.color}">●</span><b> {series.name}</b>: {point.y}' } }), o(r.prototype, { nameBase: "Aroon Oscillator", linesApiNames: [], pointArrayMap: ["y"], pointValKey: "y" }), e2.compose(i), t2.registerSeriesType("aroonoscillator", r), r;
      }), s(t, "Stock/Indicators/ATR/ATRIndicator.js", [t["Core/Series/SeriesRegistry.js"], t["Core/Utilities.js"]], function(e2, t2) {
        let { sma: s2 } = e2.seriesTypes, { isArray: i, merge: o } = t2;
        function a(e3, t3) {
          return Math.max(e3[1] - e3[2], void 0 === t3 ? 0 : Math.abs(e3[1] - t3[3]), void 0 === t3 ? 0 : Math.abs(e3[2] - t3[3]));
        }
        class r extends s2 {
          getValues(e3, t3) {
            let s3 = t3.period, o2 = e3.xData, r2 = e3.yData, n = r2 ? r2.length : 0, l = [[o2[0], r2[0]]], p = [], u = [], h = [], d, c, g = 0, y = 1, m = 0;
            if (!(o2.length <= s3) && i(r2[0]) && 4 === r2[0].length) {
              for (c = 1; c <= n; c++) {
                var f, D;
                (function(e4, t4, s4, i2) {
                  let o3 = t4[i2], a2 = s4[i2];
                  e4.push([o3, a2]);
                })(l, o2, r2, c), s3 < y ? (g = (f = c, D = g, d = [o2[f - 1], (D * (s3 - 1) + a(r2[f - 1], r2[f - 2])) / s3])[1], p.push(d), u.push(d[0]), h.push(d[1])) : (s3 === y ? (g = m / (c - 1), p.push([o2[c - 1], g]), u.push(o2[c - 1]), h.push(g)) : m += a(r2[c - 1], r2[c - 2]), y++);
              }
              return { values: p, xData: u, yData: h };
            }
          }
        }
        return r.defaultOptions = o(s2.defaultOptions, { params: { index: void 0 } }), e2.registerSeriesType("atr", r), r;
      }), s(t, "Stock/Indicators/BB/BBIndicator.js", [t["Stock/Indicators/MultipleLinesComposition.js"], t["Core/Series/SeriesRegistry.js"], t["Core/Utilities.js"]], function(e2, t2, s2) {
        let { sma: i } = t2.seriesTypes, { extend: o, isArray: a, merge: r } = s2;
        class n extends i {
          init() {
            t2.seriesTypes.sma.prototype.init.apply(this, arguments), this.options = r({ topLine: { styles: { lineColor: this.color } }, bottomLine: { styles: { lineColor: this.color } } }, this.options);
          }
          getValues(e3, s3) {
            let i2, o2, r2, n2, l, p, u, h, d;
            let c = s3.period, g = s3.standardDeviation, y = [], m = [], f = e3.xData, D = e3.yData, x = D ? D.length : 0, S = [];
            if (f.length < c)
              return;
            let v = a(D[0]);
            for (d = c; d <= x; d++)
              l = f.slice(d - c, d), p = D.slice(d - c, d), n2 = (h = t2.seriesTypes.sma.prototype.getValues.call(this, { xData: l, yData: p }, s3)).xData[0], i2 = h.yData[0], u = function(e4, t3, s4, i3) {
                let o3 = e4.length, a2 = 0, r3, n3 = 0;
                for (; a2 < o3; a2++)
                  n3 += (r3 = (s4 ? e4[a2][t3] : e4[a2]) - i3) * r3;
                return Math.sqrt(n3 /= o3 - 1);
              }(p, s3.index, v, i2), o2 = i2 + g * u, r2 = i2 - g * u, S.push([n2, o2, i2, r2]), y.push(n2), m.push([o2, i2, r2]);
            return { values: S, xData: y, yData: m };
          }
        }
        return n.defaultOptions = r(i.defaultOptions, { params: { period: 20, standardDeviation: 2, index: 3 }, bottomLine: { styles: { lineWidth: 1, lineColor: void 0 } }, topLine: { styles: { lineWidth: 1, lineColor: void 0 } }, tooltip: { pointFormat: '<span style="color:{point.color}">●</span><b> {series.name}</b><br/>Top: {point.top}<br/>Middle: {point.middle}<br/>Bottom: {point.bottom}<br/>' }, marker: { enabled: false }, dataGrouping: { approximation: "averages" } }), o(n.prototype, { areaLinesNames: ["top", "bottom"], linesApiNames: ["topLine", "bottomLine"], nameComponents: ["period", "standardDeviation"], pointArrayMap: ["top", "middle", "bottom"], pointValKey: "middle" }), e2.compose(n), t2.registerSeriesType("bb", n), n;
      }), s(t, "Stock/Indicators/CCI/CCIIndicator.js", [t["Core/Series/SeriesRegistry.js"], t["Core/Utilities.js"]], function(e2, t2) {
        let { sma: s2 } = e2.seriesTypes, { isArray: i, merge: o } = t2;
        class a extends s2 {
          getValues(e3, t3) {
            let s3 = t3.period, o2 = e3.xData, a2 = e3.yData, r = a2 ? a2.length : 0, n = [], l = [], p = [], u = [], h, d, c = [], g, y = 1, m, f, D, x;
            if (!(o2.length <= s3) && i(a2[0]) && 4 === a2[0].length) {
              for (; y < s3; )
                d = a2[y - 1], n.push((d[1] + d[2] + d[3]) / 3), y++;
              for (x = s3; x <= r; x++)
                f = ((d = a2[x - 1])[1] + d[2] + d[3]) / 3, g = n.push(f), m = (c = n.slice(g - s3)).reduce(function(e4, t4) {
                  return e4 + t4;
                }, 0) / s3, D = function(e4, t4) {
                  let s4 = e4.length, i2 = 0, o3;
                  for (o3 = 0; o3 < s4; o3++)
                    i2 += Math.abs(t4 - e4[o3]);
                  return i2;
                }(c, m) / s3, h = (f - m) / (0.015 * D), l.push([o2[x - 1], h]), p.push(o2[x - 1]), u.push(h);
              return { values: l, xData: p, yData: u };
            }
          }
        }
        return a.defaultOptions = o(s2.defaultOptions, { params: { index: void 0 } }), e2.registerSeriesType("cci", a), a;
      }), s(t, "Stock/Indicators/CMF/CMFIndicator.js", [t["Core/Series/SeriesRegistry.js"], t["Core/Utilities.js"]], function(e2, t2) {
        let { sma: s2 } = e2.seriesTypes, { merge: i } = t2;
        class o extends s2 {
          constructor() {
            super(...arguments), this.nameBase = "Chaikin Money Flow";
          }
          isValid() {
            let e3 = this.chart, t3 = this.options, s3 = this.linkedParent, i2 = this.volumeSeries || (this.volumeSeries = e3.get(t3.params.volumeSeriesID)), o2 = s3 && s3.yData && 4 === s3.yData[0].length;
            function a(e4) {
              return e4.xData && e4.xData.length >= t3.params.period;
            }
            return !!(s3 && i2 && a(s3) && a(i2) && o2);
          }
          getValues(e3, t3) {
            if (this.isValid())
              return this.getMoneyFlow(e3.xData, e3.yData, this.volumeSeries.yData, t3.period);
          }
          getMoneyFlow(e3, t3, s3, i2) {
            let o2 = t3.length, a = [], r = [], n = [], l = [], p, u, h = -1, d = 0, c = 0;
            function g(e4, t4) {
              let s4 = e4[1], i3 = e4[2], o3 = e4[3];
              return null !== t4 && null !== s4 && null !== i3 && null !== o3 && s4 !== i3 ? (o3 - i3 - (s4 - o3)) / (s4 - i3) * t4 : (h = p, null);
            }
            if (i2 > 0 && i2 <= o2) {
              for (p = 0; p < i2; p++)
                a[p] = g(t3[p], s3[p]), d += s3[p], c += a[p];
              for (r.push(e3[p - 1]), n.push(p - h >= i2 && 0 !== d ? c / d : null), l.push([r[0], n[0]]); p < o2; p++)
                a[p] = g(t3[p], s3[p]), d -= s3[p - i2], d += s3[p], c -= a[p - i2], c += a[p], u = [e3[p], p - h >= i2 ? c / d : null], r.push(u[0]), n.push(u[1]), l.push([u[0], u[1]]);
            }
            return { values: l, xData: r, yData: n };
          }
        }
        return o.defaultOptions = i(s2.defaultOptions, { params: { index: void 0, volumeSeriesID: "volume" } }), e2.registerSeriesType("cmf", o), o;
      }), s(t, "Stock/Indicators/DMI/DMIIndicator.js", [t["Stock/Indicators/MultipleLinesComposition.js"], t["Core/Series/SeriesRegistry.js"], t["Core/Utilities.js"]], function(e2, t2, s2) {
        let { sma: i } = t2.seriesTypes, { correctFloat: o, extend: a, isArray: r, merge: n } = s2;
        class l extends i {
          calculateDM(e3, t3, s3) {
            let i2 = e3[t3][1], a2 = e3[t3][2], r2 = e3[t3 - 1][1], n2 = e3[t3 - 1][2];
            return o(i2 - r2 > n2 - a2 ? s3 ? Math.max(i2 - r2, 0) : 0 : s3 ? 0 : Math.max(n2 - a2, 0));
          }
          calculateDI(e3, t3) {
            return e3 / t3 * 100;
          }
          calculateDX(e3, t3) {
            return o(Math.abs(e3 - t3) / Math.abs(e3 + t3) * 100);
          }
          smoothValues(e3, t3, s3) {
            return o(e3 - e3 / s3 + t3);
          }
          getTR(e3, t3) {
            return o(Math.max(e3[1] - e3[2], t3 ? Math.abs(e3[1] - t3[3]) : 0, t3 ? Math.abs(e3[2] - t3[3]) : 0));
          }
          getValues(e3, t3) {
            let s3 = t3.period, i2 = e3.xData, o2 = e3.yData, a2 = o2 ? o2.length : 0, n2 = [], l2 = [], p = [];
            if (i2.length <= s3 || !r(o2[0]) || 4 !== o2[0].length)
              return;
            let u = 0, h = 0, d = 0, c;
            for (c = 1; c < a2; c++) {
              let e4, t4, a3, r2, g, y, m, f, D;
              c <= s3 ? (r2 = this.calculateDM(o2, c, true), g = this.calculateDM(o2, c), y = this.getTR(o2[c], o2[c - 1]), u += r2, h += g, d += y, c === s3 && (m = this.calculateDI(u, d), f = this.calculateDI(h, d), D = this.calculateDX(u, h), n2.push([i2[c], D, m, f]), l2.push(i2[c]), p.push([D, m, f]))) : (r2 = this.calculateDM(o2, c, true), g = this.calculateDM(o2, c), y = this.getTR(o2[c], o2[c - 1]), e4 = this.smoothValues(u, r2, s3), t4 = this.smoothValues(h, g, s3), a3 = this.smoothValues(d, y, s3), u = e4, h = t4, d = a3, m = this.calculateDI(u, d), f = this.calculateDI(h, d), D = this.calculateDX(u, h), n2.push([i2[c], D, m, f]), l2.push(i2[c]), p.push([D, m, f]));
            }
            return { values: n2, xData: l2, yData: p };
          }
        }
        return l.defaultOptions = n(i.defaultOptions, { params: { index: void 0 }, marker: { enabled: false }, tooltip: { pointFormat: '<span style="color: {point.color}">●</span><b> {series.name}</b><br/><span style="color: {point.color}">DX</span>: {point.y}<br/><span style="color: {point.series.options.plusDILine.styles.lineColor}">+DI</span>: {point.plusDI}<br/><span style="color: {point.series.options.minusDILine.styles.lineColor}">-DI</span>: {point.minusDI}<br/>' }, plusDILine: { styles: { lineWidth: 1, lineColor: "#06b535" } }, minusDILine: { styles: { lineWidth: 1, lineColor: "#f21313" } }, dataGrouping: { approximation: "averages" } }), a(l.prototype, { areaLinesNames: [], nameBase: "DMI", linesApiNames: ["plusDILine", "minusDILine"], pointArrayMap: ["y", "plusDI", "minusDI"], parallelArrays: ["x", "y", "plusDI", "minusDI"], pointValKey: "y" }), e2.compose(l), t2.registerSeriesType("dmi", l), l;
      }), s(t, "Stock/Indicators/DPO/DPOIndicator.js", [t["Core/Series/SeriesRegistry.js"], t["Core/Utilities.js"]], function(e2, t2) {
        let { sma: s2 } = e2.seriesTypes, { extend: i, merge: o, correctFloat: a, pick: r } = t2;
        function n(e3, t3, s3, i2, o2) {
          let n2 = r(t3[s3][i2], t3[s3]);
          return o2 ? a(e3 - n2) : a(e3 + n2);
        }
        class l extends s2 {
          getValues(e3, t3) {
            let s3 = t3.period, i2 = t3.index, o2 = s3 + Math.floor(s3 / 2 + 1), a2 = e3.xData || [], l2 = e3.yData || [], p = l2.length, u = [], h = [], d = [], c, g, y, m, f, D = 0;
            if (!(a2.length <= o2)) {
              for (m = 0; m < s3 - 1; m++)
                D = n(D, l2, m, i2);
              for (f = 0; f <= p - o2; f++)
                g = f + s3 - 1, y = f + o2 - 1, D = n(D, l2, g, i2), c = r(l2[y][i2], l2[y]) - D / s3, D = n(D, l2, f, i2, true), u.push([a2[y], c]), h.push(a2[y]), d.push(c);
              return { values: u, xData: h, yData: d };
            }
          }
        }
        return l.defaultOptions = o(s2.defaultOptions, { params: { index: 0, period: 21 } }), i(l.prototype, { nameBase: "DPO" }), e2.registerSeriesType("dpo", l), l;
      }), s(t, "Stock/Indicators/Chaikin/ChaikinIndicator.js", [t["Stock/Indicators/AD/ADIndicator.js"], t["Core/Series/SeriesRegistry.js"], t["Core/Utilities.js"]], function(e2, t2, s2) {
        let { ema: i } = t2.seriesTypes, { correctFloat: o, extend: a, merge: r, error: n } = s2;
        class l extends i {
          getValues(t3, s3) {
            let i2, a2;
            let r2 = s3.periods, l2 = s3.period, p = [], u = [], h = [];
            if (2 !== r2.length || r2[1] <= r2[0]) {
              n('Error: "Chaikin requires two periods. Notice, first period should be lower than the second one."');
              return;
            }
            let d = e2.prototype.getValues.call(this, t3, { volumeSeriesID: s3.volumeSeriesID, period: l2 });
            if (!d)
              return;
            let c = super.getValues.call(this, d, { period: r2[0] }), g = super.getValues.call(this, d, { period: r2[1] });
            if (!c || !g)
              return;
            let y = r2[1] - r2[0];
            for (a2 = 0; a2 < g.yData.length; a2++)
              i2 = o(c.yData[a2 + y] - g.yData[a2]), p.push([g.xData[a2], i2]), u.push(g.xData[a2]), h.push(i2);
            return { values: p, xData: u, yData: h };
          }
        }
        return l.defaultOptions = r(i.defaultOptions, { params: { index: void 0, volumeSeriesID: "volume", period: 9, periods: [3, 10] } }), a(l.prototype, { nameBase: "Chaikin Osc", nameComponents: ["periods"] }), t2.registerSeriesType("chaikin", l), l;
      }), s(t, "Stock/Indicators/CMO/CMOIndicator.js", [t["Core/Series/SeriesRegistry.js"], t["Core/Utilities.js"]], function(e2, t2) {
        let { sma: s2 } = e2.seriesTypes, { isNumber: i, merge: o } = t2;
        class a extends s2 {
          getValues(e3, t3) {
            let s3 = t3.period, o2 = e3.xData, a2 = e3.yData, r = a2 ? a2.length : 0, n = [], l = [], p = [], u, h = t3.index, d;
            if (o2.length < s3)
              return;
            i(a2[0]) ? d = a2 : (h = Math.min(h, a2[0].length - 1), d = a2.map((e4) => e4[h]));
            let c = 0, g = 0, y = 0, m;
            for (let e4 = s3; e4 > 0; e4--)
              d[e4] > d[e4 - 1] ? g += d[e4] - d[e4 - 1] : d[e4] < d[e4 - 1] && (y += d[e4 - 1] - d[e4]);
            for (m = g + y > 0 ? 100 * (g - y) / (g + y) : 0, l.push(o2[s3]), p.push(m), n.push([o2[s3], m]), u = s3 + 1; u < r; u++)
              c = Math.abs(d[u - s3 - 1] - d[u - s3]), d[u] > d[u - 1] ? g += d[u] - d[u - 1] : d[u] < d[u - 1] && (y += d[u - 1] - d[u]), d[u - s3] > d[u - s3 - 1] ? g -= c : y -= c, m = g + y > 0 ? 100 * (g - y) / (g + y) : 0, l.push(o2[u]), p.push(m), n.push([o2[u], m]);
            return { values: n, xData: l, yData: p };
          }
        }
        return a.defaultOptions = o(s2.defaultOptions, { params: { period: 20, index: 3 } }), e2.registerSeriesType("cmo", a), a;
      }), s(t, "Stock/Indicators/DEMA/DEMAIndicator.js", [t["Core/Series/SeriesRegistry.js"], t["Core/Utilities.js"]], function(e2, t2) {
        let { ema: s2 } = e2.seriesTypes, { correctFloat: i, isArray: o, merge: a } = t2;
        class r extends s2 {
          getEMA(e3, t3, s3, i2, o2, a2) {
            return super.calculateEma(a2 || [], e3, void 0 === o2 ? 1 : o2, this.EMApercent, t3, void 0 === i2 ? -1 : i2, s3);
          }
          getValues(e3, t3) {
            let s3 = t3.period, a2 = [], r2 = 2 * s3, n = e3.xData, l = e3.yData, p = l ? l.length : 0, u = [], h = [], d = [], c = 0, g = 0, y, m, f, D, x = -1, S, v = 0;
            if (this.EMApercent = 2 / (s3 + 1), !(p < 2 * s3 - 1)) {
              for (o(l[0]) && (x = t3.index ? t3.index : 0), v = (c = super.accumulatePeriodPoints(s3, x, l)) / s3, c = 0, D = s3; D < p + 2; D++)
                D < p + 1 && (g = this.getEMA(l, m, v, x, D)[1], a2.push(g)), m = g, D < r2 ? c += g : (D === r2 && (v = c / s3), g = a2[D - s3 - 1], y = this.getEMA([g], f, v)[1], S = [n[D - 2], i(2 * g - y)], u.push(S), h.push(S[0]), d.push(S[1]), f = y);
              return { values: u, xData: h, yData: d };
            }
          }
        }
        return r.defaultOptions = a(s2.defaultOptions), e2.registerSeriesType("dema", r), r;
      }), s(t, "Stock/Indicators/TEMA/TEMAIndicator.js", [t["Core/Series/SeriesRegistry.js"], t["Core/Utilities.js"]], function(e2, t2) {
        let { ema: s2 } = e2.seriesTypes, { correctFloat: i, isArray: o, merge: a } = t2;
        class r extends s2 {
          getEMA(e3, t3, s3, i2, o2, a2) {
            return super.calculateEma(a2 || [], e3, void 0 === o2 ? 1 : o2, this.EMApercent, t3, void 0 === i2 ? -1 : i2, s3);
          }
          getTemaPoint(e3, t3, s3, o2) {
            return [e3[o2 - 3], i(3 * s3.level1 - 3 * s3.level2 + s3.level3)];
          }
          getValues(e3, t3) {
            let s3 = t3.period, i2 = 2 * s3, a2 = 3 * s3, r2 = e3.xData, n = e3.yData, l = n ? n.length : 0, p = [], u = [], h = [], d = [], c = [], g = {}, y = -1, m = 0, f = 0, D, x, S, v;
            if (this.EMApercent = 2 / (s3 + 1), !(l < 3 * s3 - 2)) {
              for (o(n[0]) && (y = t3.index ? t3.index : 0), f = (m = super.accumulatePeriodPoints(s3, y, n)) / s3, m = 0, S = s3; S < l + 3; S++)
                S < l + 1 && (g.level1 = this.getEMA(n, D, f, y, S)[1], d.push(g.level1)), D = g.level1, S < i2 ? m += g.level1 : (S === i2 && (f = m / s3, m = 0), g.level1 = d[S - s3 - 1], g.level2 = this.getEMA([g.level1], x, f)[1], c.push(g.level2), x = g.level2, S < a2 ? m += g.level2 : (S === a2 && (f = m / s3), S === l + 1 && (g.level1 = d[S - s3 - 1], g.level2 = this.getEMA([g.level1], x, f)[1], c.push(g.level2)), g.level1 = d[S - s3 - 2], g.level2 = c[S - 2 * s3 - 1], g.level3 = this.getEMA([g.level2], g.prevLevel3, f)[1], (v = this.getTemaPoint(r2, a2, g, S)) && (p.push(v), u.push(v[0]), h.push(v[1])), g.prevLevel3 = g.level3));
              return { values: p, xData: u, yData: h };
            }
          }
        }
        return r.defaultOptions = a(s2.defaultOptions), e2.registerSeriesType("tema", r), r;
      }), s(t, "Stock/Indicators/TRIX/TRIXIndicator.js", [t["Core/Series/SeriesRegistry.js"], t["Core/Utilities.js"]], function(e2, t2) {
        let { tema: s2 } = e2.seriesTypes, { correctFloat: i, merge: o } = t2;
        class a extends s2 {
          getTemaPoint(e3, t3, s3, o2) {
            if (o2 > t3)
              return [e3[o2 - 3], 0 !== s3.prevLevel3 ? i(s3.level3 - s3.prevLevel3) / s3.prevLevel3 * 100 : null];
          }
        }
        return a.defaultOptions = o(s2.defaultOptions), e2.registerSeriesType("trix", a), a;
      }), s(t, "Stock/Indicators/APO/APOIndicator.js", [t["Core/Series/SeriesRegistry.js"], t["Core/Utilities.js"]], function(e2, t2) {
        let { ema: s2 } = e2.seriesTypes, { extend: i, merge: o, error: a } = t2;
        class r extends s2 {
          getValues(e3, t3) {
            let s3, i2;
            let o2 = t3.periods, r2 = t3.index, n = [], l = [], p = [];
            if (2 !== o2.length || o2[1] <= o2[0]) {
              a('Error: "APO requires two periods. Notice, first period should be lower than the second one."');
              return;
            }
            let u = super.getValues.call(this, e3, { index: r2, period: o2[0] }), h = super.getValues.call(this, e3, { index: r2, period: o2[1] });
            if (!u || !h)
              return;
            let d = o2[1] - o2[0];
            for (i2 = 0; i2 < h.yData.length; i2++)
              s3 = u.yData[i2 + d] - h.yData[i2], n.push([h.xData[i2], s3]), l.push(h.xData[i2]), p.push(s3);
            return { values: n, xData: l, yData: p };
          }
        }
        return r.defaultOptions = o(s2.defaultOptions, { params: { period: void 0, periods: [10, 20] } }), i(r.prototype, { nameBase: "APO", nameComponents: ["periods"] }), e2.registerSeriesType("apo", r), r;
      }), s(t, "Stock/Indicators/IKH/IKHIndicator.js", [t["Extensions/DataGrouping/ApproximationRegistry.js"], t["Core/Color/Color.js"], t["Core/Series/SeriesRegistry.js"], t["Core/Utilities.js"]], function(e2, t2, s2, i) {
        let { parse: o } = t2, { sma: a } = s2.seriesTypes, { defined: r, extend: n, isArray: l, isNumber: p, getClosestDistance: u, merge: h, objectEach: d } = i;
        function c(e3) {
          return { high: e3.reduce(function(e4, t3) {
            return Math.max(e4, t3[1]);
          }, -1 / 0), low: e3.reduce(function(e4, t3) {
            return Math.min(e4, t3[2]);
          }, 1 / 0) };
        }
        function g(e3) {
          let t3 = e3.indicator;
          t3.points = e3.points, t3.nextPoints = e3.nextPoints, t3.color = e3.color, t3.options = h(e3.options.senkouSpan.styles, e3.gap), t3.graph = e3.graph, t3.fillGraph = true, s2.seriesTypes.sma.prototype.drawGraph.call(t3);
        }
        class y extends a {
          constructor() {
            super(...arguments), this.data = [], this.options = {}, this.points = [], this.graphCollection = [];
          }
          init() {
            super.init.apply(this, arguments), this.options = h({ tenkanLine: { styles: { lineColor: this.color } }, kijunLine: { styles: { lineColor: this.color } }, chikouLine: { styles: { lineColor: this.color } }, senkouSpanA: { styles: { lineColor: this.color, fill: o(this.color).setOpacity(0.5).get() } }, senkouSpanB: { styles: { lineColor: this.color, fill: o(this.color).setOpacity(0.5).get() } }, senkouSpan: { styles: { fill: o(this.color).setOpacity(0.2).get() } } }, this.options);
          }
          toYData(e3) {
            return [e3.tenkanSen, e3.kijunSen, e3.chikouSpan, e3.senkouSpanA, e3.senkouSpanB];
          }
          translate() {
            for (let e3 of (s2.seriesTypes.sma.prototype.translate.apply(this), this.points))
              for (let t3 of this.pointArrayMap) {
                let s3 = e3[t3];
                p(s3) && (e3["plot" + t3] = this.yAxis.toPixels(s3, true), e3.plotY = e3["plot" + t3], e3.tooltipPos = [e3.plotX, e3["plot" + t3]], e3.isNull = false);
              }
          }
          drawGraph() {
            let e3 = this, t3 = e3.points, i2 = e3.options, o2 = e3.graph, a2 = e3.color, n2 = { options: { gapSize: i2.gapSize } }, l2 = e3.pointArrayMap.length, p2 = [[], [], [], [], [], []], u2 = { tenkanLine: p2[0], kijunLine: p2[1], chikouLine: p2[2], senkouSpanA: p2[3], senkouSpanB: p2[4], senkouSpan: p2[5] }, c2 = [], y2 = e3.options.senkouSpan, m = y2.color || y2.styles.fill, f = y2.negativeColor, D = [[], []], x = [[], []], S = t3.length, v = 0, C, A, I, T, P, k, j, b, M, L, V, O, R;
            for (e3.ikhMap = u2; S--; ) {
              for (I = 0, A = t3[S]; I < l2; I++)
                r(A[C = e3.pointArrayMap[I]]) && p2[I].push({ plotX: A.plotX, plotY: A["plot" + C], isNull: false });
              if (f && S !== t3.length - 1) {
                let e4 = u2.senkouSpanB.length - 1, t4 = function(e5, t5, s3, i3) {
                  if (e5 && t5 && s3 && i3) {
                    let o3 = t5.plotX - e5.plotX, a3 = t5.plotY - e5.plotY, r2 = i3.plotX - s3.plotX, n3 = i3.plotY - s3.plotY, l3 = e5.plotX - s3.plotX, p3 = e5.plotY - s3.plotY, u3 = (-a3 * l3 + o3 * p3) / (-r2 * a3 + o3 * n3), h2 = (r2 * p3 - n3 * l3) / (-r2 * a3 + o3 * n3);
                    if (u3 >= 0 && u3 <= 1 && h2 >= 0 && h2 <= 1)
                      return { plotX: e5.plotX + h2 * o3, plotY: e5.plotY + h2 * a3 };
                  }
                }(u2.senkouSpanA[e4 - 1], u2.senkouSpanA[e4], u2.senkouSpanB[e4 - 1], u2.senkouSpanB[e4]);
                if (t4) {
                  let s3 = { plotX: t4.plotX, plotY: t4.plotY, isNull: false, intersectPoint: true };
                  u2.senkouSpanA.splice(e4, 0, s3), u2.senkouSpanB.splice(e4, 0, s3), c2.push(e4);
                }
              }
            }
            if (d(u2, (t4, o3) => {
              i2[o3] && "senkouSpan" !== o3 && (e3.points = p2[v], e3.options = h(i2[o3].styles, n2), e3.graph = e3["graph" + o3], e3.fillGraph = false, e3.color = a2, s2.seriesTypes.sma.prototype.drawGraph.call(e3), e3["graph" + o3] = e3.graph), v++;
            }), e3.graphCollection)
              for (let t4 of e3.graphCollection)
                e3[t4].destroy(), delete e3[t4];
            if (e3.graphCollection = [], f && u2.senkouSpanA[0] && u2.senkouSpanB[0]) {
              for (c2.unshift(0), c2.push(u2.senkouSpanA.length - 1), O = 0; O < c2.length - 1; O++)
                if (T = c2[O], P = c2[O + 1], k = u2.senkouSpanB.slice(T, P + 1), j = u2.senkouSpanA.slice(T, P + 1), Math.floor(k.length / 2) >= 1) {
                  let e4 = Math.floor(k.length / 2);
                  if (k[e4].plotY === j[e4].plotY) {
                    for (R = 0, b = 0, M = 0; R < k.length; R++)
                      b += k[R].plotY, M += j[R].plotY;
                    D[V = b > M ? 0 : 1] = D[V].concat(k), x[V] = x[V].concat(j);
                  } else
                    D[V = k[e4].plotY > j[e4].plotY ? 0 : 1] = D[V].concat(k), x[V] = x[V].concat(j);
                } else
                  D[V = k[0].plotY > j[0].plotY ? 0 : 1] = D[V].concat(k), x[V] = x[V].concat(j);
              ["graphsenkouSpanColor", "graphsenkouSpanNegativeColor"].forEach(function(t4, s3) {
                D[s3].length && x[s3].length && (L = 0 === s3 ? m : f, g({ indicator: e3, points: D[s3], nextPoints: x[s3], color: L, options: i2, gap: n2, graph: e3[t4] }), e3[t4] = e3.graph, e3.graphCollection.push(t4));
              });
            } else
              g({ indicator: e3, points: u2.senkouSpanB, nextPoints: u2.senkouSpanA, color: m, options: i2, gap: n2, graph: e3.graphsenkouSpan }), e3.graphsenkouSpan = e3.graph;
            delete e3.nextPoints, delete e3.fillGraph, e3.points = t3, e3.options = i2, e3.graph = o2, e3.color = a2;
          }
          getGraphPath(e3) {
            let t3 = [], i2, o2 = [];
            if (e3 = e3 || this.points, this.fillGraph && this.nextPoints) {
              if ((i2 = s2.seriesTypes.sma.prototype.getGraphPath.call(this, this.nextPoints)) && i2.length) {
                i2[0][0] = "L", t3 = s2.seriesTypes.sma.prototype.getGraphPath.call(this, e3), o2 = i2.slice(0, t3.length);
                for (let e4 = o2.length - 1; e4 >= 0; e4--)
                  t3.push(o2[e4]);
              }
            } else
              t3 = s2.seriesTypes.sma.prototype.getGraphPath.apply(this, arguments);
            return t3;
          }
          getValues(e3, t3) {
            let s3, i2, o2, a2, r2, n2, p2, h2, d2, g2;
            let y2 = t3.period, m = t3.periodTenkan, f = t3.periodSenkouSpanB, D = e3.xData, x = e3.yData, S = e3.xAxis, v = x && x.length || 0, C = u(S.series.map((e4) => e4.xData || [])), A = [], I = [];
            if (D.length <= y2 || !l(x[0]) || 4 !== x[0].length)
              return;
            let T = D[0] - y2 * C;
            for (r2 = 0; r2 < y2; r2++)
              I.push(T + r2 * C);
            for (r2 = 0; r2 < v; r2++)
              r2 >= m && (n2 = ((i2 = c(x.slice(r2 - m, r2))).high + i2.low) / 2), r2 >= y2 && (d2 = (n2 + (p2 = ((o2 = c(x.slice(r2 - y2, r2))).high + o2.low) / 2)) / 2), r2 >= f && (g2 = ((a2 = c(x.slice(r2 - f, r2))).high + a2.low) / 2), h2 = x[r2][3], s3 = D[r2], void 0 === A[r2] && (A[r2] = []), void 0 === A[r2 + y2 - 1] && (A[r2 + y2 - 1] = []), A[r2 + y2 - 1][0] = n2, A[r2 + y2 - 1][1] = p2, A[r2 + y2 - 1][2] = void 0, void 0 === A[r2 + 1] && (A[r2 + 1] = []), A[r2 + 1][2] = h2, r2 <= y2 && (A[r2 + y2 - 1][3] = void 0, A[r2 + y2 - 1][4] = void 0), void 0 === A[r2 + 2 * y2 - 2] && (A[r2 + 2 * y2 - 2] = []), A[r2 + 2 * y2 - 2][3] = d2, A[r2 + 2 * y2 - 2][4] = g2, I.push(s3);
            for (r2 = 1; r2 <= y2; r2++)
              I.push(s3 + r2 * C);
            return { values: A, xData: I, yData: A };
          }
        }
        return y.defaultOptions = h(a.defaultOptions, { params: { index: void 0, period: 26, periodTenkan: 9, periodSenkouSpanB: 52 }, marker: { enabled: false }, tooltip: { pointFormat: '<span style="color:{point.color}">●</span> <b> {series.name}</b><br/>TENKAN SEN: {point.tenkanSen:.3f}<br/>KIJUN SEN: {point.kijunSen:.3f}<br/>CHIKOU SPAN: {point.chikouSpan:.3f}<br/>SENKOU SPAN A: {point.senkouSpanA:.3f}<br/>SENKOU SPAN B: {point.senkouSpanB:.3f}<br/>' }, tenkanLine: { styles: { lineWidth: 1, lineColor: void 0 } }, kijunLine: { styles: { lineWidth: 1, lineColor: void 0 } }, chikouLine: { styles: { lineWidth: 1, lineColor: void 0 } }, senkouSpanA: { styles: { lineWidth: 1, lineColor: void 0 } }, senkouSpanB: { styles: { lineWidth: 1, lineColor: void 0 } }, senkouSpan: { styles: { fill: "rgba(255, 0, 0, 0.5)" } }, dataGrouping: { approximation: "ichimoku-averages" } }), n(y.prototype, { pointArrayMap: ["tenkanSen", "kijunSen", "chikouSpan", "senkouSpanA", "senkouSpanB"], pointValKey: "tenkanSen", nameComponents: ["periodSenkouSpanB", "period", "periodTenkan"] }), e2["ichimoku-averages"] = function() {
          let t3;
          let s3 = [];
          return [].forEach.call(arguments, function(i2, o2) {
            s3.push(e2.average(i2)), t3 = !t3 && void 0 === s3[o2];
          }), t3 ? void 0 : s3;
        }, s2.registerSeriesType("ikh", y), y;
      }), s(t, "Stock/Indicators/KeltnerChannels/KeltnerChannelsIndicator.js", [t["Stock/Indicators/MultipleLinesComposition.js"], t["Core/Series/SeriesRegistry.js"], t["Core/Utilities.js"]], function(e2, t2, s2) {
        let { sma: i } = t2.seriesTypes, { correctFloat: o, extend: a, merge: r } = s2;
        class n extends i {
          init() {
            t2.seriesTypes.sma.prototype.init.apply(this, arguments), this.options = r({ topLine: { styles: { lineColor: this.color } }, bottomLine: { styles: { lineColor: this.color } } }, this.options);
          }
          getValues(e3, s3) {
            let i2, a2, r2, n2, l, p, u;
            let h = s3.period, d = s3.periodATR, c = s3.multiplierATR, g = s3.index, y = e3.yData, m = y ? y.length : 0, f = [], D = t2.seriesTypes.ema.prototype.getValues(e3, { period: h, index: g }), x = t2.seriesTypes.atr.prototype.getValues(e3, { period: d }), S = [], v = [];
            if (!(m < h)) {
              for (u = h; u <= m; u++)
                l = D.values[u - h], p = x.values[u - d], n2 = l[0], a2 = o(l[1] + c * p[1]), r2 = o(l[1] - c * p[1]), i2 = l[1], f.push([n2, a2, i2, r2]), S.push(n2), v.push([a2, i2, r2]);
              return { values: f, xData: S, yData: v };
            }
          }
        }
        return n.defaultOptions = r(i.defaultOptions, { params: { index: 0, period: 20, periodATR: 10, multiplierATR: 2 }, bottomLine: { styles: { lineWidth: 1, lineColor: void 0 } }, topLine: { styles: { lineWidth: 1, lineColor: void 0 } }, tooltip: { pointFormat: '<span style="color:{point.color}">●</span><b> {series.name}</b><br/>Upper Channel: {point.top}<br/>EMA({series.options.params.period}): {point.middle}<br/>Lower Channel: {point.bottom}<br/>' }, marker: { enabled: false }, dataGrouping: { approximation: "averages" }, lineWidth: 1 }), a(n.prototype, { nameBase: "Keltner Channels", areaLinesNames: ["top", "bottom"], nameComponents: ["period", "periodATR", "multiplierATR"], linesApiNames: ["topLine", "bottomLine"], pointArrayMap: ["top", "middle", "bottom"], pointValKey: "middle" }), e2.compose(n), t2.registerSeriesType("keltnerchannels", n), n;
      }), s(t, "Stock/Indicators/Klinger/KlingerIndicator.js", [t["Stock/Indicators/MultipleLinesComposition.js"], t["Core/Series/SeriesRegistry.js"], t["Core/Utilities.js"]], function(e2, t2, s2) {
        let { ema: i, sma: o } = t2.seriesTypes, { correctFloat: a, error: r, extend: n, isArray: l, merge: p } = s2;
        class u extends o {
          calculateTrend(e3, t3) {
            return e3[t3][1] + e3[t3][2] + e3[t3][3] > e3[t3 - 1][1] + e3[t3 - 1][2] + e3[t3 - 1][3] ? 1 : -1;
          }
          isValidData(e3) {
            let t3 = this.chart, s3 = this.options, i2 = this.linkedParent, o2 = l(e3) && 4 === e3.length, a2 = this.volumeSeries || (this.volumeSeries = t3.get(s3.params.volumeSeriesID));
            return a2 || r("Series " + s3.params.volumeSeriesID + " not found! Check `volumeSeriesID`.", true, i2.chart), !!([i2, a2].every(function(e4) {
              return e4 && e4.xData && e4.xData.length >= s3.params.slowAvgPeriod;
            }) && o2);
          }
          getCM(e3, t3, s3, i2, o2) {
            return a(t3 + (s3 === i2 ? e3 : o2));
          }
          getDM(e3, t3) {
            return a(e3 - t3);
          }
          getVolumeForce(e3) {
            let t3 = [], s3 = 0, i2, o2 = 1, a2 = 0, r2 = e3[0][1] - e3[0][2], n2 = 0, l2;
            for (; o2 < e3.length; o2++)
              l2 = this.calculateTrend(e3, o2), i2 = this.getDM(e3[o2][1], e3[o2][2]), s3 = this.getCM(a2, i2, l2, n2, r2), t3.push([this.volumeSeries.yData[o2] * l2 * Math.abs(2 * (i2 / s3 - 1)) * 100]), n2 = l2, a2 = s3, r2 = i2;
            return t3;
          }
          getEMA(e3, t3, s3, o2, a2, r2, n2) {
            return i.prototype.calculateEma(n2 || [], e3, void 0 === r2 ? 1 : r2, o2, t3, void 0 === a2 ? -1 : a2, s3);
          }
          getSMA(e3, t3, s3) {
            return i.prototype.accumulatePeriodPoints(e3, t3, s3) / e3;
          }
          getValues(e3, t3) {
            let s3 = [], i2 = e3.xData, o2 = e3.yData, r2 = [], n2 = [], l2 = [], p2, u2 = 0, h = 0, d, c, g, y = null;
            if (!this.isValidData(o2[0]))
              return;
            let m = this.getVolumeForce(o2), f = this.getSMA(t3.fastAvgPeriod, 0, m), D = this.getSMA(t3.slowAvgPeriod, 0, m), x = 2 / (t3.fastAvgPeriod + 1), S = 2 / (t3.slowAvgPeriod + 1);
            for (; u2 < o2.length; u2++)
              u2 >= t3.fastAvgPeriod && (c = h = this.getEMA(m, c, f, x, 0, u2, i2)[1]), u2 >= t3.slowAvgPeriod && (g = d = this.getEMA(m, g, D, S, 0, u2, i2)[1], l2.push(p2 = a(h - d)), l2.length >= t3.signalPeriod && (y = l2.slice(-t3.signalPeriod).reduce((e4, t4) => e4 + t4) / t3.signalPeriod), s3.push([i2[u2], p2, y]), r2.push(i2[u2]), n2.push([p2, y]));
            return { values: s3, xData: r2, yData: n2 };
          }
        }
        return u.defaultOptions = p(o.defaultOptions, { params: { fastAvgPeriod: 34, slowAvgPeriod: 55, signalPeriod: 13, volumeSeriesID: "volume" }, signalLine: { styles: { lineWidth: 1, lineColor: "#ff0000" } }, dataGrouping: { approximation: "averages" }, tooltip: { pointFormat: '<span style="color: {point.color}">●</span><b> {series.name}</b><br/><span style="color: {point.color}">Klinger</span>: {point.y}<br/><span style="color: {point.series.options.signalLine.styles.lineColor}">Signal</span>: {point.signal}<br/>' } }), n(u.prototype, { areaLinesNames: [], linesApiNames: ["signalLine"], nameBase: "Klinger", nameComponents: ["fastAvgPeriod", "slowAvgPeriod"], pointArrayMap: ["y", "signal"], parallelArrays: ["x", "y", "signal"], pointValKey: "y" }), e2.compose(u), t2.registerSeriesType("klinger", u), u;
      }), s(t, "Stock/Indicators/MACD/MACDIndicator.js", [t["Core/Globals.js"], t["Core/Series/SeriesRegistry.js"], t["Core/Utilities.js"]], function(e2, t2, s2) {
        let { noop: i } = e2, { column: o, sma: a } = t2.seriesTypes, { extend: r, correctFloat: n, defined: l, merge: p } = s2;
        class u extends a {
          init() {
            t2.seriesTypes.sma.prototype.init.apply(this, arguments);
            let e3 = this.color;
            this.options && (l(this.colorIndex) && (this.options.signalLine && this.options.signalLine.styles && !this.options.signalLine.styles.lineColor && (this.options.colorIndex = this.colorIndex + 1, this.getCyclic("color", void 0, this.chart.options.colors), this.options.signalLine.styles.lineColor = this.color), this.options.macdLine && this.options.macdLine.styles && !this.options.macdLine.styles.lineColor && (this.options.colorIndex = this.colorIndex + 1, this.getCyclic("color", void 0, this.chart.options.colors), this.options.macdLine.styles.lineColor = this.color)), this.macdZones = { zones: this.options.macdLine.zones, startIndex: 0 }, this.signalZones = { zones: this.macdZones.zones.concat(this.options.signalLine.zones), startIndex: this.macdZones.zones.length }), this.color = e3;
          }
          toYData(e3) {
            return [e3.y, e3.signal, e3.MACD];
          }
          translate() {
            let t3 = this, s3 = ["plotSignal", "plotMACD"];
            e2.seriesTypes.column.prototype.translate.apply(t3), t3.points.forEach(function(e3) {
              [e3.signal, e3.MACD].forEach(function(i2, o2) {
                null !== i2 && (e3[s3[o2]] = t3.yAxis.toPixels(i2, true));
              });
            });
          }
          destroy() {
            this.graph = null, this.graphmacd = this.graphmacd && this.graphmacd.destroy(), this.graphsignal = this.graphsignal && this.graphsignal.destroy(), t2.seriesTypes.sma.prototype.destroy.apply(this, arguments);
          }
          drawGraph() {
            let e3 = this, s3 = e3.points, i2 = e3.options, o2 = e3.zones, a2 = { options: { gapSize: i2.gapSize } }, r2 = [[], []], n2, u2 = s3.length;
            for (; u2--; )
              l((n2 = s3[u2]).plotMACD) && r2[0].push({ plotX: n2.plotX, plotY: n2.plotMACD, isNull: !l(n2.plotMACD) }), l(n2.plotSignal) && r2[1].push({ plotX: n2.plotX, plotY: n2.plotSignal, isNull: !l(n2.plotMACD) });
            ["macd", "signal"].forEach((s4, o3) => {
              e3.points = r2[o3], e3.options = p(i2[`${s4}Line`]?.styles || {}, a2), e3.graph = e3[`graph${s4}`], e3.zones = (e3[`${s4}Zones`].zones || []).slice(e3[`${s4}Zones`].startIndex || 0), t2.seriesTypes.sma.prototype.drawGraph.call(e3), e3[`graph${s4}`] = e3.graph;
            }), e3.points = s3, e3.options = i2, e3.zones = o2;
          }
          applyZones() {
            let e3 = this.zones;
            this.zones = this.signalZones.zones, t2.seriesTypes.sma.prototype.applyZones.call(this), this.graphmacd && this.options.macdLine.zones.length && this.graphmacd.hide(), this.zones = e3;
          }
          getValues(e3, s3) {
            let i2 = s3.longPeriod - s3.shortPeriod, o2 = [], a2 = [], r2 = [], p2, u2, h, d = 0, c = [];
            if (!(e3.xData.length < s3.longPeriod + s3.signalPeriod)) {
              for (h = 0, p2 = t2.seriesTypes.ema.prototype.getValues(e3, { period: s3.shortPeriod, index: s3.index }), u2 = t2.seriesTypes.ema.prototype.getValues(e3, { period: s3.longPeriod, index: s3.index }), p2 = p2.values, u2 = u2.values; h <= p2.length; h++)
                l(u2[h]) && l(u2[h][1]) && l(p2[h + i2]) && l(p2[h + i2][0]) && o2.push([p2[h + i2][0], 0, null, p2[h + i2][1] - u2[h][1]]);
              for (h = 0; h < o2.length; h++)
                a2.push(o2[h][0]), r2.push([0, null, o2[h][3]]);
              for (h = 0, c = (c = t2.seriesTypes.ema.prototype.getValues({ xData: a2, yData: r2 }, { period: s3.signalPeriod, index: 2 })).values; h < o2.length; h++)
                o2[h][0] >= c[0][0] && (o2[h][2] = c[d][1], r2[h] = [0, c[d][1], o2[h][3]], null === o2[h][3] ? (o2[h][1] = 0, r2[h][0] = 0) : (o2[h][1] = n(o2[h][3] - c[d][1]), r2[h][0] = n(o2[h][3] - c[d][1])), d++);
              return { values: o2, xData: a2, yData: r2 };
            }
          }
        }
        return u.defaultOptions = p(a.defaultOptions, { params: { shortPeriod: 12, longPeriod: 26, signalPeriod: 9, period: 26 }, signalLine: { zones: [], styles: { lineWidth: 1, lineColor: void 0 } }, macdLine: { zones: [], styles: { lineWidth: 1, lineColor: void 0 } }, threshold: 0, groupPadding: 0.1, pointPadding: 0.1, crisp: false, states: { hover: { halo: { size: 0 } } }, tooltip: { pointFormat: '<span style="color:{point.color}">●</span> <b> {series.name}</b><br/>Value: {point.MACD}<br/>Signal: {point.signal}<br/>Histogram: {point.y}<br/>' }, dataGrouping: { approximation: "averages" }, minPointLength: 0 }), r(u.prototype, { nameComponents: ["longPeriod", "shortPeriod", "signalPeriod"], pointArrayMap: ["y", "signal", "MACD"], parallelArrays: ["x", "y", "signal", "MACD"], pointValKey: "y", markerAttribs: i, getColumnMetrics: e2.seriesTypes.column.prototype.getColumnMetrics, crispCol: e2.seriesTypes.column.prototype.crispCol, drawPoints: e2.seriesTypes.column.prototype.drawPoints }), t2.registerSeriesType("macd", u), u;
      }), s(t, "Stock/Indicators/MFI/MFIIndicator.js", [t["Core/Series/SeriesRegistry.js"], t["Core/Utilities.js"]], function(e2, t2) {
        let { sma: s2 } = e2.seriesTypes, { extend: i, merge: o, error: a, isArray: r } = t2;
        function n(e3) {
          return e3.reduce(function(e4, t3) {
            return e4 + t3;
          });
        }
        function l(e3) {
          return (e3[1] + e3[2] + e3[3]) / 3;
        }
        class p extends s2 {
          getValues(e3, t3) {
            let s3 = t3.period, i2 = e3.xData, o2 = e3.yData, p2 = o2 ? o2.length : 0, u = t3.decimals, h = e3.chart.get(t3.volumeSeriesID), d = h && h.yData, c = [], g = [], y = [], m = [], f = [], D, x, S, v, C, A, I = false, T = 1;
            if (!h) {
              a("Series " + t3.volumeSeriesID + " not found! Check `volumeSeriesID`.", true, e3.chart);
              return;
            }
            if (!(i2.length <= s3) && r(o2[0]) && 4 === o2[0].length && d) {
              for (D = l(o2[T]); T < s3 + 1; )
                x = D, I = (D = l(o2[T])) >= x, S = D * d[T], m.push(I ? S : 0), f.push(I ? 0 : S), T++;
              for (A = T - 1; A < p2; A++)
                A > T - 1 && (m.shift(), f.shift(), x = D, I = (D = l(o2[A])) > x, S = D * d[A], m.push(I ? S : 0), f.push(I ? 0 : S)), v = n(f), C = parseFloat((100 - 100 / (1 + n(m) / v)).toFixed(u)), c.push([i2[A], C]), g.push(i2[A]), y.push(C);
              return { values: c, xData: g, yData: y };
            }
          }
        }
        return p.defaultOptions = o(s2.defaultOptions, { params: { index: void 0, volumeSeriesID: "volume", decimals: 4 } }), i(p.prototype, { nameBase: "Money Flow Index" }), e2.registerSeriesType("mfi", p), p;
      }), s(t, "Stock/Indicators/Momentum/MomentumIndicator.js", [t["Core/Series/SeriesRegistry.js"], t["Core/Utilities.js"]], function(e2, t2) {
        let { sma: s2 } = e2.seriesTypes, { extend: i, isArray: o, merge: a } = t2;
        function r(e3, t3, s3, i2, o2) {
          let a2 = t3[s3 - 1][o2] - t3[s3 - i2 - 1][o2];
          return [e3[s3 - 1], a2];
        }
        class n extends s2 {
          getValues(e3, t3) {
            let s3, i2;
            let a2 = t3.period, n2 = t3.index, l = e3.xData, p = e3.yData, u = p ? p.length : 0, h = [], d = [], c = [];
            if (!(l.length <= a2) && o(p[0])) {
              for (s3 = a2 + 1; s3 < u; s3++)
                i2 = r(l, p, s3, a2, n2), h.push(i2), d.push(i2[0]), c.push(i2[1]);
              return i2 = r(l, p, s3, a2, n2), h.push(i2), d.push(i2[0]), c.push(i2[1]), { values: h, xData: d, yData: c };
            }
          }
        }
        return n.defaultOptions = a(s2.defaultOptions, { params: { index: 3 } }), i(n.prototype, { nameBase: "Momentum" }), e2.registerSeriesType("momentum", n), n;
      }), s(t, "Stock/Indicators/NATR/NATRIndicator.js", [t["Core/Series/SeriesRegistry.js"], t["Core/Utilities.js"]], function(e2, t2) {
        let { atr: s2 } = e2.seriesTypes, { merge: i } = t2;
        class o extends s2 {
          getValues(e3, t3) {
            let s3 = super.getValues.apply(this, arguments), i2 = s3.values.length, o2 = e3.yData, a = 0, r = t3.period - 1;
            if (s3) {
              for (; a < i2; a++)
                s3.yData[a] = s3.values[a][1] / o2[r][3] * 100, s3.values[a][1] = s3.yData[a], r++;
              return s3;
            }
          }
        }
        return o.defaultOptions = i(s2.defaultOptions, { tooltip: { valueSuffix: "%" } }), e2.registerSeriesType("natr", o), o;
      }), s(t, "Stock/Indicators/OBV/OBVIndicator.js", [t["Core/Series/SeriesRegistry.js"], t["Core/Utilities.js"]], function(e2, t2) {
        let { sma: s2 } = e2.seriesTypes, { isNumber: i, error: o, extend: a, merge: r } = t2;
        class n extends s2 {
          getValues(e3, t3) {
            let s3 = e3.chart.get(t3.volumeSeriesID), a2 = e3.xData, r2 = e3.yData, n2 = [], l = [], p = [], u = !i(r2[0]), h = [], d = 1, c = 0, g = 0, y = 0, m = 0, f;
            if (s3)
              for (f = s3.yData, h = [a2[0], c], y = u ? r2[0][3] : r2[0], n2.push(h), l.push(a2[0]), p.push(h[1]); d < r2.length; d++)
                g = (m = u ? r2[d][3] : r2[d]) > y ? c + f[d] : m === y ? c : c - f[d], h = [a2[d], g], c = g, y = m, n2.push(h), l.push(a2[d]), p.push(h[1]);
            else {
              o("Series " + t3.volumeSeriesID + " not found! Check `volumeSeriesID`.", true, e3.chart);
              return;
            }
            return { values: n2, xData: l, yData: p };
          }
        }
        return n.defaultOptions = r(s2.defaultOptions, { marker: { enabled: false }, params: { index: void 0, period: void 0, volumeSeriesID: "volume" }, tooltip: { valueDecimals: 0 } }), a(n.prototype, { nameComponents: void 0 }), e2.registerSeriesType("obv", n), n;
      }), s(t, "Stock/Indicators/PivotPoints/PivotPointsPoint.js", [t["Core/Series/SeriesRegistry.js"]], function(e2) {
        let t2 = e2.seriesTypes.sma.prototype.pointClass;
        function s2(t3, s3) {
          let i = t3.series.pointArrayMap, o, a = i.length;
          for (e2.seriesTypes.sma.prototype.pointClass.prototype[s3].call(t3); a--; )
            t3[o = "dataLabel" + i[a]] && t3[o].element && t3[o].destroy(), t3[o] = null;
        }
        return class extends t2 {
          destroyElements() {
            s2(this, "destroyElements");
          }
          destroy() {
            s2(this, "destroyElements");
          }
        };
      }), s(t, "Stock/Indicators/PivotPoints/PivotPointsIndicator.js", [t["Stock/Indicators/PivotPoints/PivotPointsPoint.js"], t["Core/Series/SeriesRegistry.js"], t["Core/Utilities.js"]], function(e2, t2, s2) {
        let { sma: i } = t2.seriesTypes, { merge: o, extend: a, defined: r, isArray: n } = s2;
        class l extends i {
          toYData(e3) {
            return [e3.P];
          }
          translate() {
            let e3 = this;
            super.translate.apply(e3), e3.points.forEach(function(t3) {
              e3.pointArrayMap.forEach(function(s3) {
                r(t3[s3]) && (t3["plot" + s3] = e3.yAxis.toPixels(t3[s3], true));
              });
            }), e3.plotEndPoint = e3.xAxis.toPixels(e3.endPoint, true);
          }
          getGraphPath(e3) {
            let t3 = this, s3 = [[], [], [], [], [], [], [], [], []], i2 = t3.pointArrayMap.length, o2 = t3.plotEndPoint, a2 = [], n2, l2, p = e3.length, u;
            for (; p--; ) {
              for (u = 0, l2 = e3[p]; u < i2; u++)
                r(l2[n2 = t3.pointArrayMap[u]]) && s3[u].push({ plotX: l2.plotX, plotY: l2["plot" + n2], isNull: false }, { plotX: o2, plotY: l2["plot" + n2], isNull: false }, { plotX: o2, plotY: null, isNull: true });
              o2 = l2.plotX;
            }
            return s3.forEach((e4) => {
              a2 = a2.concat(super.getGraphPath.call(t3, e4));
            }), a2;
          }
          drawDataLabels() {
            let e3, t3, s3, i2;
            let o2 = this, a2 = o2.pointArrayMap;
            o2.options.dataLabels.enabled && (t3 = o2.points.length, a2.concat([false]).forEach((r2, n2) => {
              for (i2 = t3; i2--; )
                s3 = o2.points[i2], r2 ? (s3.y = s3[r2], s3.pivotLine = r2, s3.plotY = s3["plot" + r2], e3 = s3["dataLabel" + r2], n2 && (s3["dataLabel" + a2[n2 - 1]] = s3.dataLabel), s3.dataLabels || (s3.dataLabels = []), s3.dataLabels[0] = s3.dataLabel = e3 = e3 && e3.element ? e3 : null) : s3["dataLabel" + a2[n2 - 1]] = s3.dataLabel;
              super.drawDataLabels.call(o2);
            }));
          }
          getValues(e3, t3) {
            let s3, i2, o2, a2, r2, l2, p;
            let u = t3.period, h = e3.xData, d = e3.yData, c = d ? d.length : 0, g = this[t3.algorithm + "Placement"], y = [], m = [], f = [];
            if (!(h.length < u) && n(d[0]) && 4 === d[0].length) {
              for (p = u + 1; p <= c + u; p += u)
                o2 = h.slice(p - u - 1, p), a2 = d.slice(p - u - 1, p), i2 = o2.length, s3 = o2[i2 - 1], l2 = g(this.getPivotAndHLC(a2)), r2 = y.push([s3].concat(l2)), m.push(s3), f.push(y[r2 - 1].slice(1));
              return this.endPoint = o2[0] + (s3 - o2[0]) / i2 * u, { values: y, xData: m, yData: f };
            }
          }
          getPivotAndHLC(e3) {
            let t3 = e3[e3.length - 1][3], s3 = -1 / 0, i2 = 1 / 0;
            return e3.forEach(function(e4) {
              s3 = Math.max(s3, e4[1]), i2 = Math.min(i2, e4[2]);
            }), [(s3 + i2 + t3) / 3, s3, i2, t3];
          }
          standardPlacement(e3) {
            let t3 = e3[1] - e3[2];
            return [null, null, e3[0] + t3, 2 * e3[0] - e3[2], e3[0], 2 * e3[0] - e3[1], e3[0] - t3, null, null];
          }
          camarillaPlacement(e3) {
            let t3 = e3[1] - e3[2];
            return [e3[3] + 1.5 * t3, e3[3] + 1.25 * t3, e3[3] + 1.1666 * t3, e3[3] + 1.0833 * t3, e3[0], e3[3] - 1.0833 * t3, e3[3] - 1.1666 * t3, e3[3] - 1.25 * t3, e3[3] - 1.5 * t3];
          }
          fibonacciPlacement(e3) {
            let t3 = e3[1] - e3[2];
            return [null, e3[0] + t3, e3[0] + 0.618 * t3, e3[0] + 0.382 * t3, e3[0], e3[0] - 0.382 * t3, e3[0] - 0.618 * t3, e3[0] - t3, null];
          }
        }
        return l.defaultOptions = o(i.defaultOptions, { params: { index: void 0, period: 28, algorithm: "standard" }, marker: { enabled: false }, enableMouseTracking: false, dataLabels: { enabled: true, format: "{point.pivotLine}" }, dataGrouping: { approximation: "averages" } }), a(l.prototype, { nameBase: "Pivot Points", pointArrayMap: ["R4", "R3", "R2", "R1", "P", "S1", "S2", "S3", "S4"], pointValKey: "P", pointClass: e2 }), t2.registerSeriesType("pivotpoints", l), l;
      }), s(t, "Stock/Indicators/PPO/PPOIndicator.js", [t["Core/Series/SeriesRegistry.js"], t["Core/Utilities.js"]], function(e2, t2) {
        let { ema: s2 } = e2.seriesTypes, { correctFloat: i, extend: o, merge: a, error: r } = t2;
        class n extends s2 {
          getValues(e3, t3) {
            let s3, o2;
            let a2 = t3.periods, n2 = t3.index, l = [], p = [], u = [];
            if (2 !== a2.length || a2[1] <= a2[0]) {
              r('Error: "PPO requires two periods. Notice, first period should be lower than the second one."');
              return;
            }
            let h = super.getValues.call(this, e3, { index: n2, period: a2[0] }), d = super.getValues.call(this, e3, { index: n2, period: a2[1] });
            if (!h || !d)
              return;
            let c = a2[1] - a2[0];
            for (o2 = 0; o2 < d.yData.length; o2++)
              s3 = i((h.yData[o2 + c] - d.yData[o2]) / d.yData[o2] * 100), l.push([d.xData[o2], s3]), p.push(d.xData[o2]), u.push(s3);
            return { values: l, xData: p, yData: u };
          }
        }
        return n.defaultOptions = a(s2.defaultOptions, { params: { period: void 0, periods: [12, 26] } }), o(n.prototype, { nameBase: "PPO", nameComponents: ["periods"] }), e2.registerSeriesType("ppo", n), n;
      }), s(t, "Stock/Indicators/ArrayUtilities.js", [], function() {
        return { getArrayExtremes: function(e2, t2, s2) {
          return e2.reduce((e3, i) => [Math.min(e3[0], i[t2]), Math.max(e3[1], i[s2])], [Number.MAX_VALUE, -Number.MAX_VALUE]);
        } };
      }), s(t, "Stock/Indicators/PC/PCIndicator.js", [t["Stock/Indicators/ArrayUtilities.js"], t["Stock/Indicators/MultipleLinesComposition.js"], t["Core/Color/Palettes.js"], t["Core/Series/SeriesRegistry.js"], t["Core/Utilities.js"]], function(e2, t2, s2, i, o) {
        let { sma: a } = i.seriesTypes, { merge: r, extend: n } = o;
        class l extends a {
          getValues(t3, s3) {
            let i2, o2, a2, r2, n2, l2, p;
            let u = s3.period, h = t3.xData, d = t3.yData, c = d ? d.length : 0, g = [], y = [], m = [];
            if (!(c < u)) {
              for (p = u; p <= c; p++)
                r2 = h[p - 1], n2 = d.slice(p - u, p), i2 = ((o2 = (l2 = e2.getArrayExtremes(n2, 2, 1))[1]) + (a2 = l2[0])) / 2, g.push([r2, o2, i2, a2]), y.push(r2), m.push([o2, i2, a2]);
              return { values: g, xData: y, yData: m };
            }
          }
        }
        return l.defaultOptions = r(a.defaultOptions, { params: { index: void 0, period: 20 }, lineWidth: 1, topLine: { styles: { lineColor: s2.colors[2], lineWidth: 1 } }, bottomLine: { styles: { lineColor: s2.colors[8], lineWidth: 1 } }, dataGrouping: { approximation: "averages" } }), n(l.prototype, { areaLinesNames: ["top", "bottom"], nameBase: "Price Channel", nameComponents: ["period"], linesApiNames: ["topLine", "bottomLine"], pointArrayMap: ["top", "middle", "bottom"], pointValKey: "middle" }), t2.compose(l), i.registerSeriesType("pc", l), l;
      }), s(t, "Stock/Indicators/PriceEnvelopes/PriceEnvelopesIndicator.js", [t["Stock/Indicators/MultipleLinesComposition.js"], t["Core/Series/SeriesRegistry.js"], t["Core/Utilities.js"]], function(e2, t2, s2) {
        let { sma: i } = t2.seriesTypes, { extend: o, isArray: a, merge: r } = s2;
        class n extends i {
          init() {
            super.init.apply(this, arguments), this.options = r({ topLine: { styles: { lineColor: this.color } }, bottomLine: { styles: { lineColor: this.color } } }, this.options);
          }
          getValues(e3, t3) {
            let s3, i2, o2, r2, n2, l, p, u;
            let h = t3.period, d = t3.topBand, c = t3.bottomBand, g = e3.xData, y = e3.yData, m = y ? y.length : 0, f = [], D = [], x = [];
            if (!(g.length < h) && a(y[0]) && 4 === y[0].length) {
              for (u = h; u <= m; u++)
                n2 = g.slice(u - h, u), l = y.slice(u - h, u), r2 = (p = super.getValues({ xData: n2, yData: l }, t3)).xData[0], i2 = (s3 = p.yData[0]) * (1 + d), o2 = s3 * (1 - c), f.push([r2, i2, s3, o2]), D.push(r2), x.push([i2, s3, o2]);
              return { values: f, xData: D, yData: x };
            }
          }
        }
        return n.defaultOptions = r(i.defaultOptions, { marker: { enabled: false }, tooltip: { pointFormat: '<span style="color:{point.color}">●</span><b> {series.name}</b><br/>Top: {point.top}<br/>Middle: {point.middle}<br/>Bottom: {point.bottom}<br/>' }, params: { period: 20, topBand: 0.1, bottomBand: 0.1 }, bottomLine: { styles: { lineWidth: 1, lineColor: void 0 } }, topLine: { styles: { lineWidth: 1 } }, dataGrouping: { approximation: "averages" } }), o(n.prototype, { areaLinesNames: ["top", "bottom"], linesApiNames: ["topLine", "bottomLine"], nameComponents: ["period", "topBand", "bottomBand"], nameBase: "Price envelopes", pointArrayMap: ["top", "middle", "bottom"], parallelArrays: ["x", "y", "top", "bottom"], pointValKey: "middle" }), e2.compose(n), t2.registerSeriesType("priceenvelopes", n), n;
      }), s(t, "Stock/Indicators/PSAR/PSARIndicator.js", [t["Core/Series/SeriesRegistry.js"], t["Core/Utilities.js"]], function(e2, t2) {
        let { sma: s2 } = e2.seriesTypes, { merge: i } = t2;
        function o(e3, t3) {
          return parseFloat(e3.toFixed(t3));
        }
        class a extends s2 {
          constructor() {
            super(...arguments), this.nameComponents = void 0;
          }
          getValues(e3, t3) {
            let s3 = e3.xData, i2 = e3.yData, a2 = t3.maxAccelerationFactor, r = t3.increment, n = t3.initialAccelerationFactor, l = t3.decimals, p = t3.index, u = [], h = [], d = [], c = t3.initialAccelerationFactor, g, y = i2[0][1], m, f, D, x = 1, S, v, C, A, I = i2[0][2], T, P, k, j;
            if (!(p >= i2.length)) {
              for (j = 0; j < p; j++)
                y = Math.max(i2[j][1], y), I = Math.min(i2[j][2], o(I, l));
              for (g = i2[j][1] > I ? 1 : -1, m = y - I, f = (c = t3.initialAccelerationFactor) * m, u.push([s3[p], I]), h.push(s3[p]), d.push(o(I, l)), j = p + 1; j < i2.length; j++)
                if (S = i2[j - 1][2], v = i2[j - 2][2], C = i2[j - 1][1], A = i2[j - 2][1], P = i2[j][1], k = i2[j][2], null !== v && null !== A && null !== S && null !== C && null !== P && null !== k) {
                  var b, M, L, V, O, R, E, w, B, U, N, G, W;
                  O = g, R = x, E = I, w = f, B = y, I = O === R ? 1 === O ? E + w < Math.min(v, S) ? E + w : Math.min(v, S) : E + w > Math.max(A, C) ? E + w : Math.max(A, C) : B, b = g, M = y, T = 1 === b ? P > M ? P : M : k < M ? k : M, L = x, V = I, U = D = 1 === L && k > V || -1 === L && P > V ? 1 : -1, N = g, G = y, W = c, f = (c = U === N ? 1 === U && T > G || -1 === U && T < G ? W === a2 ? a2 : o(W + r, 2) : W : n) * (m = T - I), u.push([s3[j], o(I, l)]), h.push(s3[j]), d.push(o(I, l)), x = g, g = D, y = T;
                }
              return { values: u, xData: h, yData: d };
            }
          }
        }
        return a.defaultOptions = i(s2.defaultOptions, { lineWidth: 0, marker: { enabled: true }, states: { hover: { lineWidthPlus: 0 } }, params: { period: void 0, initialAccelerationFactor: 0.02, maxAccelerationFactor: 0.2, increment: 0.02, index: 2, decimals: 4 } }), e2.registerSeriesType("psar", a), a;
      }), s(t, "Stock/Indicators/ROC/ROCIndicator.js", [t["Core/Series/SeriesRegistry.js"], t["Core/Utilities.js"]], function(e2, t2) {
        let { sma: s2 } = e2.seriesTypes, { isArray: i, merge: o, extend: a } = t2;
        class r extends s2 {
          getValues(e3, t3) {
            let s3 = t3.period, o2 = e3.xData, a2 = e3.yData, r2 = a2 ? a2.length : 0, n = [], l = [], p = [], u, h = -1, d;
            if (!(o2.length <= s3)) {
              for (i(a2[0]) && (h = t3.index), u = s3; u < r2; u++)
                d = function(e4, t4, s4, i2, o3) {
                  let a3, r3;
                  return r3 = o3 < 0 ? (a3 = t4[s4 - i2]) ? (t4[s4] - a3) / a3 * 100 : null : (a3 = t4[s4 - i2][o3]) ? (t4[s4][o3] - a3) / a3 * 100 : null, [e4[s4], r3];
                }(o2, a2, u, s3, h), n.push(d), l.push(d[0]), p.push(d[1]);
              return { values: n, xData: l, yData: p };
            }
          }
        }
        return r.defaultOptions = o(s2.defaultOptions, { params: { index: 3, period: 9 } }), a(r.prototype, { nameBase: "Rate of Change" }), e2.registerSeriesType("roc", r), r;
      }), s(t, "Stock/Indicators/RSI/RSIIndicator.js", [t["Core/Series/SeriesRegistry.js"], t["Core/Utilities.js"]], function(e2, t2) {
        let { sma: s2 } = e2.seriesTypes, { isNumber: i, merge: o } = t2;
        function a(e3, t3) {
          return parseFloat(e3.toFixed(t3));
        }
        class r extends s2 {
          getValues(e3, t3) {
            let s3 = t3.period, o2 = e3.xData, r2 = e3.yData, n = r2 ? r2.length : 0, l = t3.decimals, p = [], u = [], h = [], d = 0, c = 0, g = t3.index, y = 1, m, f, D, x, S, v;
            if (!(o2.length < s3)) {
              for (i(r2[0]) ? v = r2 : (g = Math.min(g, r2[0].length - 1), v = r2.map((e4) => e4[g])); y < s3; )
                (f = a(v[y] - v[y - 1], l)) > 0 ? d += f : c += Math.abs(f), y++;
              for (D = a(d / (s3 - 1), l), x = a(c / (s3 - 1), l), S = y; S < n; S++)
                (f = a(v[S] - v[S - 1], l)) > 0 ? (d = f, c = 0) : (d = 0, c = Math.abs(f)), D = a((D * (s3 - 1) + d) / s3, l), m = 0 === (x = a((x * (s3 - 1) + c) / s3, l)) ? 100 : 0 === D ? 0 : a(100 - 100 / (1 + D / x), l), p.push([o2[S], m]), u.push(o2[S]), h.push(m);
              return { values: p, xData: u, yData: h };
            }
          }
        }
        return r.defaultOptions = o(s2.defaultOptions, { params: { decimals: 4, index: 3 } }), e2.registerSeriesType("rsi", r), r;
      }), s(t, "Stock/Indicators/Stochastic/StochasticIndicator.js", [t["Stock/Indicators/ArrayUtilities.js"], t["Stock/Indicators/MultipleLinesComposition.js"], t["Core/Series/SeriesRegistry.js"], t["Core/Utilities.js"]], function(e2, t2, s2, i) {
        let { sma: o } = s2.seriesTypes, { extend: a, isArray: r, merge: n } = i;
        class l extends o {
          init() {
            super.init.apply(this, arguments), this.options = n({ smoothedLine: { styles: { lineColor: this.color } } }, this.options);
          }
          getValues(t3, s3) {
            let i2 = s3.periods[0], o2 = s3.periods[1], a2 = t3.xData, n2 = t3.yData, l2 = n2 ? n2.length : 0, p = [], u = [], h = [], d, c, g, y = null, m, f;
            if (l2 < i2 || !r(n2[0]) || 4 !== n2[0].length)
              return;
            let D = true, x = 0;
            for (f = i2 - 1; f < l2; f++) {
              if (d = n2.slice(f - i2 + 1, f + 1), c = (m = e2.getArrayExtremes(d, 2, 1))[0], isNaN(g = (n2[f][3] - c) / (m[1] - c) * 100) && D) {
                x++;
                continue;
              }
              D && !isNaN(g) && (D = false);
              let t4 = u.push(a2[f]);
              isNaN(g) ? h.push([h[t4 - 2] && "number" == typeof h[t4 - 2][0] ? h[t4 - 2][0] : null, null]) : h.push([g, null]), f >= x + (i2 - 1) + (o2 - 1) && (y = super.getValues({ xData: u.slice(-o2), yData: h.slice(-o2) }, { period: o2 }).yData[0]), p.push([a2[f], g, y]), h[t4 - 1][1] = y;
            }
            return { values: p, xData: u, yData: h };
          }
        }
        return l.defaultOptions = n(o.defaultOptions, { params: { index: void 0, period: void 0, periods: [14, 3] }, marker: { enabled: false }, tooltip: { pointFormat: '<span style="color:{point.color}">●</span><b> {series.name}</b><br/>%K: {point.y}<br/>%D: {point.smoothed}<br/>' }, smoothedLine: { styles: { lineWidth: 1, lineColor: void 0 } }, dataGrouping: { approximation: "averages" } }), a(l.prototype, { areaLinesNames: [], nameComponents: ["periods"], nameBase: "Stochastic", pointArrayMap: ["y", "smoothed"], parallelArrays: ["x", "y", "smoothed"], pointValKey: "y", linesApiNames: ["smoothedLine"] }), t2.compose(l), s2.registerSeriesType("stochastic", l), l;
      }), s(t, "Stock/Indicators/SlowStochastic/SlowStochasticIndicator.js", [t["Core/Series/SeriesRegistry.js"], t["Core/Utilities.js"]], function(e2, t2) {
        let { sma: s2, stochastic: i } = e2.seriesTypes, { extend: o, merge: a } = t2;
        class r extends i {
          getValues(e3, t3) {
            let i2 = t3.periods, o2 = super.getValues.call(this, e3, t3), a2 = { values: [], xData: [], yData: [] };
            if (!o2)
              return;
            a2.xData = o2.xData.slice(i2[1] - 1);
            let r2 = o2.yData.slice(i2[1] - 1), n = s2.prototype.getValues.call(this, { xData: a2.xData, yData: r2 }, { index: 1, period: i2[2] });
            if (n) {
              for (let e4 = 0, t4 = a2.xData.length; e4 < t4; e4++)
                a2.yData[e4] = [r2[e4][1], n.yData[e4 - i2[2] + 1] || null], a2.values[e4] = [a2.xData[e4], r2[e4][1], n.yData[e4 - i2[2] + 1] || null];
              return a2;
            }
          }
        }
        return r.defaultOptions = a(i.defaultOptions, { params: { periods: [14, 3, 3] } }), o(r.prototype, { nameBase: "Slow Stochastic" }), e2.registerSeriesType("slowstochastic", r), r;
      }), s(t, "Stock/Indicators/Supertrend/SupertrendIndicator.js", [t["Core/Series/SeriesRegistry.js"], t["Core/Utilities.js"]], function(e2, t2) {
        let { atr: s2, sma: i } = e2.seriesTypes, { addEvent: o, correctFloat: a, isArray: r, extend: n, merge: l, objectEach: p } = t2;
        function u(e3, t3, s3) {
          return { index: t3, close: e3.yData[t3][s3], x: e3.xData[t3] };
        }
        class h extends i {
          init() {
            let e3 = this;
            super.init.apply(e3, arguments);
            let t3 = o(this.chart.constructor, "afterLinkSeries", () => {
              if (e3.options) {
                let t4 = e3.options, s3 = e3.linkedParent.options;
                t4.cropThreshold = s3.cropThreshold - (t4.params.period - 1);
              }
              t3();
            }, { order: 1 });
          }
          drawGraph() {
            let e3 = this, t3 = e3.options, s3 = e3.linkedParent, o2 = s3 ? s3.points : [], a2 = e3.points, r2 = e3.graph, n2 = o2.length - a2.length, h2 = n2 > 0 ? n2 : 0, d = { options: { gapSize: t3.gapSize } }, c = { top: [], bottom: [], intersect: [] }, g = { top: { styles: { lineWidth: t3.lineWidth, lineColor: t3.fallingTrendColor || t3.color, dashStyle: t3.dashStyle } }, bottom: { styles: { lineWidth: t3.lineWidth, lineColor: t3.risingTrendColor || t3.color, dashStyle: t3.dashStyle } }, intersect: t3.changeTrendLine }, y, m, f, D, x, S, v, C, A, I = a2.length;
            for (; I--; )
              y = a2[I], m = a2[I - 1], f = o2[I - 1 + h2], D = o2[I - 2 + h2], x = o2[I + h2], S = o2[I + h2 + 1], v = y.options.color, C = { x: y.x, plotX: y.plotX, plotY: y.plotY, isNull: false }, !D && f && s3.yData[f.index - 1] && (D = u(s3, f.index - 1, 3)), !S && x && s3.yData[x.index + 1] && (S = u(s3, x.index + 1, 3)), !f && D && s3.yData[D.index + 1] ? f = u(s3, D.index + 1, 3) : !f && x && s3.yData[x.index - 1] && (f = u(s3, x.index - 1, 3)), y && f && x && D && y.x !== f.x && (y.x === x.x ? (D = f, f = x) : y.x === D.x ? (f = D, D = { close: s3.yData[f.index - 1][3], x: s3.xData[f.index - 1] }) : S && y.x === S.x && (f = S, D = x)), m && D && f ? (A = { x: m.x, plotX: m.plotX, plotY: m.plotY, isNull: false }, y.y >= f.close && m.y >= D.close ? (y.color = v || t3.fallingTrendColor || t3.color, c.top.push(C)) : y.y < f.close && m.y < D.close ? (y.color = v || t3.risingTrendColor || t3.color, c.bottom.push(C)) : (c.intersect.push(C), c.intersect.push(A), c.intersect.push(l(A, { isNull: true })), y.y >= f.close && m.y < D.close ? (y.color = v || t3.fallingTrendColor || t3.color, m.color = v || t3.risingTrendColor || t3.color, c.top.push(C), c.top.push(l(A, { isNull: true }))) : y.y < f.close && m.y >= D.close && (y.color = v || t3.risingTrendColor || t3.color, m.color = v || t3.fallingTrendColor || t3.color, c.bottom.push(C), c.bottom.push(l(A, { isNull: true }))))) : f && (y.y >= f.close ? (y.color = v || t3.fallingTrendColor || t3.color, c.top.push(C)) : (y.color = v || t3.risingTrendColor || t3.color, c.bottom.push(C)));
            p(c, function(t4, s4) {
              e3.points = t4, e3.options = l(g[s4].styles, d), e3.graph = e3["graph" + s4 + "Line"], i.prototype.drawGraph.call(e3), e3["graph" + s4 + "Line"] = e3.graph;
            }), e3.points = a2, e3.options = t3, e3.graph = r2;
          }
          getValues(e3, t3) {
            let i2 = t3.period, o2 = t3.multiplier, n2 = e3.xData, l2 = e3.yData, p2 = [], u2 = [], h2 = [], d = 0 === i2 ? 0 : i2 - 1, c = [], g = [], y = [], m, f, D, x, S, v, C, A, I;
            if (!(n2.length <= i2) && r(l2[0]) && 4 === l2[0].length && !(i2 < 0)) {
              for (I = 0, y = s2.prototype.getValues.call(this, e3, { period: i2 }).yData; I < y.length; I++)
                A = l2[d + I], C = l2[d + I - 1] || [], x = c[I - 1], S = g[I - 1], v = h2[I - 1], 0 === I && (x = S = v = 0), m = a((A[1] + A[2]) / 2 + o2 * y[I]), f = a((A[1] + A[2]) / 2 - o2 * y[I]), m < x || C[3] > x ? c[I] = m : c[I] = x, f > S || C[3] < S ? g[I] = f : g[I] = S, v === x && A[3] < c[I] || v === S && A[3] < g[I] ? D = c[I] : (v === x && A[3] > c[I] || v === S && A[3] > g[I]) && (D = g[I]), p2.push([n2[d + I], D]), u2.push(n2[d + I]), h2.push(D);
              return { values: p2, xData: u2, yData: h2 };
            }
          }
        }
        return h.defaultOptions = l(i.defaultOptions, { params: { index: void 0, multiplier: 3, period: 10 }, risingTrendColor: "#06b535", fallingTrendColor: "#f21313", changeTrendLine: { styles: { lineWidth: 1, lineColor: "#333333", dashStyle: "LongDash" } } }), n(h.prototype, { nameBase: "Supertrend", nameComponents: ["multiplier", "period"] }), e2.registerSeriesType("supertrend", h), h;
      }), s(t, "Stock/Indicators/VBP/VBPPoint.js", [t["Core/Series/SeriesRegistry.js"]], function(e2) {
        let { sma: { prototype: { pointClass: t2 } } } = e2.seriesTypes;
        return class extends t2 {
          destroy() {
            this.negativeGraphic && (this.negativeGraphic = this.negativeGraphic.destroy()), super.destroy.apply(this, arguments);
          }
        };
      }), s(t, "Stock/Indicators/VBP/VBPIndicator.js", [t["Stock/Indicators/VBP/VBPPoint.js"], t["Core/Animation/AnimationUtilities.js"], t["Core/Globals.js"], t["Core/Series/SeriesRegistry.js"], t["Core/Utilities.js"]], function(e2, t2, s2, i, o) {
        let { animObject: a } = t2, { noop: r } = s2, { column: { prototype: n }, sma: l } = i.seriesTypes, { addEvent: p, arrayMax: u, arrayMin: h, correctFloat: d, defined: c, error: g, extend: y, isArray: m, merge: f } = o, D = Math.abs;
        class x extends l {
          init(e3, t3) {
            let s3 = this;
            delete t3.data, super.init.apply(s3, arguments);
            let i2 = p(this.chart.constructor, "afterLinkSeries", function() {
              if (s3.options) {
                let t4 = s3.options.params, i3 = s3.linkedParent, o2 = e3.get(t4.volumeSeriesID);
                s3.addCustomEvents(i3, o2);
              }
              i2();
            }, { order: 1 });
            return s3;
          }
          addCustomEvents(e3, t3) {
            let s3 = this, i2 = () => {
              s3.chart.redraw(), s3.setData([]), s3.zoneStarts = [], s3.zoneLinesSVG && (s3.zoneLinesSVG = s3.zoneLinesSVG.destroy());
            };
            return s3.dataEventsToUnbind.push(p(e3, "remove", function() {
              i2();
            })), t3 && s3.dataEventsToUnbind.push(p(t3, "remove", function() {
              i2();
            })), s3;
          }
          animate(e3) {
            let t3 = this, s3 = t3.chart.inverted, i2 = t3.group, o2 = {};
            if (!e3 && i2) {
              let e4 = s3 ? t3.yAxis.top : t3.xAxis.left;
              s3 ? (i2["forceAnimate:translateY"] = true, o2.translateY = e4) : (i2["forceAnimate:translateX"] = true, o2.translateX = e4), i2.animate(o2, y(a(t3.options.animation), { step: function(e5, s4) {
                t3.group.attr({ scaleX: Math.max(1e-3, s4.pos) });
              } }));
            }
          }
          drawPoints() {
            this.options.volumeDivision.enabled && (this.posNegVolume(true, true), n.drawPoints.apply(this, arguments), this.posNegVolume(false, false)), n.drawPoints.apply(this, arguments);
          }
          posNegVolume(e3, t3) {
            let s3 = t3 ? ["positive", "negative"] : ["negative", "positive"], i2 = this.options.volumeDivision, o2 = this.points.length, a2 = [], r2 = [], n2 = 0, l2, p2, u2, h2;
            for (e3 ? (this.posWidths = a2, this.negWidths = r2) : (a2 = this.posWidths, r2 = this.negWidths); n2 < o2; n2++)
              (h2 = this.points[n2])[s3[0] + "Graphic"] = h2.graphic, h2.graphic = h2[s3[1] + "Graphic"], e3 && (l2 = h2.shapeArgs.width, (u2 = (p2 = this.priceZones[n2]).wholeVolumeData) ? (a2.push(l2 / u2 * p2.positiveVolumeData), r2.push(l2 / u2 * p2.negativeVolumeData)) : (a2.push(0), r2.push(0))), h2.color = t3 ? i2.styles.positiveColor : i2.styles.negativeColor, h2.shapeArgs.width = t3 ? this.posWidths[n2] : this.negWidths[n2], h2.shapeArgs.x = t3 ? h2.shapeArgs.x : this.posWidths[n2];
          }
          translate() {
            let e3 = this, t3 = e3.options, s3 = e3.chart, i2 = e3.yAxis, o2 = i2.min, a2 = e3.options.zoneLines, r2 = e3.priceZones, l2 = 0, p2, h2, c2, g2, y2, m2, f2, x2, S, v;
            n.translate.apply(e3);
            let C = e3.points;
            C.length && (f2 = t3.pointPadding < 0.5 ? t3.pointPadding : 0.1, p2 = u(e3.volumeDataArray), h2 = s3.plotWidth / 2, x2 = s3.plotTop, c2 = D(i2.toPixels(o2) - i2.toPixels(o2 + e3.rangeStep)), y2 = D(i2.toPixels(o2) - i2.toPixels(o2 + e3.rangeStep)), f2 && (g2 = D(c2 * (1 - 2 * f2)), l2 = D((c2 - g2) / 2), c2 = D(g2)), C.forEach(function(t4, s4) {
              S = t4.barX = t4.plotX = 0, v = t4.plotY = i2.toPixels(r2[s4].start) - x2 - (i2.reversed ? c2 - y2 : c2) - l2, m2 = d(h2 * r2[s4].wholeVolumeData / p2), t4.pointWidth = m2, t4.shapeArgs = e3.crispCol.apply(e3, [S, v, m2, c2]), t4.volumeNeg = r2[s4].negativeVolumeData, t4.volumePos = r2[s4].positiveVolumeData, t4.volumeAll = r2[s4].wholeVolumeData;
            }), a2.enabled && e3.drawZones(s3, i2, e3.zoneStarts, a2.styles));
          }
          getExtremes() {
            let e3;
            let t3 = this.options.compare, s3 = this.options.cumulative;
            return this.options.compare ? (this.options.compare = void 0, e3 = super.getExtremes(), this.options.compare = t3) : this.options.cumulative ? (this.options.cumulative = false, e3 = super.getExtremes(), this.options.cumulative = s3) : e3 = super.getExtremes(), e3;
          }
          getValues(e3, t3) {
            let s3 = e3.processedXData, i2 = e3.processedYData, o2 = this.chart, a2 = t3.ranges, r2 = [], n2 = [], l2 = [], p2 = o2.get(t3.volumeSeriesID);
            if (!e3.chart) {
              g("Base series not found! In case it has been removed, add a new one.", true, o2);
              return;
            }
            if (!p2 || !p2.processedXData.length) {
              let e4 = p2 && !p2.processedXData.length ? " does not contain any data." : " not found! Check `volumeSeriesID`.";
              g("Series " + t3.volumeSeriesID + e4, true, o2);
              return;
            }
            let u2 = m(i2[0]);
            if (u2 && 4 !== i2[0].length) {
              g("Type of " + e3.name + " series is different than line, OHLC or candlestick.", true, o2);
              return;
            }
            return (this.priceZones = this.specifyZones(u2, s3, i2, a2, p2)).forEach(function(e4, t4) {
              r2.push([e4.x, e4.end]), n2.push(r2[t4][0]), l2.push(r2[t4][1]);
            }), { values: r2, xData: n2, yData: l2 };
          }
          specifyZones(e3, t3, s3, i2, o2) {
            let a2 = !!e3 && function(e4) {
              let t4 = e4.length, s4 = e4[0][3], i3 = s4, o3 = 1, a3;
              for (; o3 < t4; o3++)
                (a3 = e4[o3][3]) < s4 && (s4 = a3), a3 > i3 && (i3 = a3);
              return { min: s4, max: i3 };
            }(s3), r2 = this.zoneStarts = [], n2 = [], l2 = a2 ? a2.min : h(s3), p2 = a2 ? a2.max : u(s3), g2 = 0, y2 = 1, m2 = this.linkedParent;
            if (!this.options.compareToMain && m2.dataModify && (l2 = m2.dataModify.modifyValue(l2), p2 = m2.dataModify.modifyValue(p2)), !c(l2) || !c(p2))
              return this.points.length && (this.setData([]), this.zoneStarts = [], this.zoneLinesSVG && (this.zoneLinesSVG = this.zoneLinesSVG.destroy())), [];
            let f2 = this.rangeStep = d(p2 - l2) / i2;
            for (r2.push(l2); g2 < i2 - 1; g2++)
              r2.push(d(r2[g2] + f2));
            r2.push(p2);
            let D2 = r2.length;
            for (; y2 < D2; y2++)
              n2.push({ index: y2 - 1, x: t3[0], start: r2[y2 - 1], end: r2[y2] });
            return this.volumePerZone(e3, n2, o2, t3, s3);
          }
          volumePerZone(e3, t3, s3, i2, o2) {
            let a2, r2, n2, l2, p2;
            let u2 = this, h2 = s3.processedXData, d2 = s3.processedYData, c2 = t3.length - 1, g2 = o2.length, y2 = d2.length;
            return D(g2 - y2) && (i2[0] !== h2[0] && d2.unshift(0), i2[g2 - 1] !== h2[y2 - 1] && d2.push(0)), u2.volumeDataArray = [], t3.forEach(function(t4) {
              for (p2 = 0, t4.wholeVolumeData = 0, t4.positiveVolumeData = 0, t4.negativeVolumeData = 0; p2 < g2; p2++) {
                r2 = false, n2 = false, l2 = e3 ? o2[p2][3] : o2[p2], a2 = p2 ? e3 ? o2[p2 - 1][3] : o2[p2 - 1] : l2;
                let s4 = u2.linkedParent;
                !u2.options.compareToMain && s4.dataModify && (l2 = s4.dataModify.modifyValue(l2), a2 = s4.dataModify.modifyValue(a2)), l2 <= t4.start && 0 === t4.index && (r2 = true), l2 >= t4.end && t4.index === c2 && (n2 = true), (l2 > t4.start || r2) && (l2 < t4.end || n2) && (t4.wholeVolumeData += d2[p2], a2 > l2 ? t4.negativeVolumeData += d2[p2] : t4.positiveVolumeData += d2[p2]);
              }
              u2.volumeDataArray.push(t4.wholeVolumeData);
            }), t3;
          }
          drawZones(e3, t3, s3, i2) {
            let o2 = e3.renderer, a2 = e3.plotWidth, r2 = e3.plotTop, n2 = this.zoneLinesSVG, l2 = [], p2;
            s3.forEach(function(s4) {
              p2 = t3.toPixels(s4) - r2, l2 = l2.concat(e3.renderer.crispLine([["M", 0, p2], ["L", a2, p2]], i2.lineWidth));
            }), n2 ? n2.animate({ d: l2 }) : n2 = this.zoneLinesSVG = o2.path(l2).attr({ "stroke-width": i2.lineWidth, stroke: i2.color, dashstyle: i2.dashStyle, zIndex: this.group.zIndex + 0.1 }).add(this.group);
          }
        }
        return x.defaultOptions = f(l.defaultOptions, { params: { index: void 0, period: void 0, ranges: 12, volumeSeriesID: "volume" }, zoneLines: { enabled: true, styles: { color: "#0A9AC9", dashStyle: "LongDash", lineWidth: 1 } }, volumeDivision: { enabled: true, styles: { positiveColor: "rgba(144, 237, 125, 0.8)", negativeColor: "rgba(244, 91, 91, 0.8)" } }, animationLimit: 1e3, enableMouseTracking: false, pointPadding: 0, zIndex: -1, crisp: true, dataGrouping: { enabled: false }, dataLabels: { allowOverlap: true, enabled: true, format: "P: {point.volumePos:.2f} | N: {point.volumeNeg:.2f}", padding: 0, style: { fontSize: "0.5em" }, verticalAlign: "top" } }), y(x.prototype, { nameBase: "Volume by Price", nameComponents: ["ranges"], calculateOn: { chart: "render", xAxis: "afterSetExtremes" }, pointClass: e2, markerAttribs: r, drawGraph: r, getColumnMetrics: n.getColumnMetrics, crispCol: n.crispCol }), i.registerSeriesType("vbp", x), x;
      }), s(t, "Stock/Indicators/VWAP/VWAPIndicator.js", [t["Core/Series/SeriesRegistry.js"], t["Core/Utilities.js"]], function(e2, t2) {
        let { sma: s2 } = e2.seriesTypes, { error: i, isArray: o, merge: a } = t2;
        class r extends s2 {
          getValues(e3, t3) {
            let s3 = e3.chart, a2 = e3.xData, r2 = e3.yData, n = t3.period, l = true, p;
            if (!(p = s3.get(t3.volumeSeriesID))) {
              i("Series " + t3.volumeSeriesID + " not found! Check `volumeSeriesID`.", true, s3);
              return;
            }
            return o(r2[0]) || (l = false), this.calculateVWAPValues(l, a2, r2, p, n);
          }
          calculateVWAPValues(e3, t3, s3, i2, o2) {
            let a2, r2, n, l, p, u;
            let h = i2.yData, d = i2.xData.length, c = t3.length, g = [], y = [], m = [], f = [], D = [];
            for (p = 0, a2 = c <= d ? c : d, u = 0; p < a2; p++)
              r2 = (e3 ? (s3[p][1] + s3[p][2] + s3[p][3]) / 3 : s3[p]) * h[p], n = u ? g[p - 1] + r2 : r2, l = u ? y[p - 1] + h[p] : h[p], g.push(n), y.push(l), D.push([t3[p], n / l]), m.push(D[p][0]), f.push(D[p][1]), ++u === o2 && (u = 0);
            return { values: D, xData: m, yData: f };
          }
        }
        return r.defaultOptions = a(s2.defaultOptions, { params: { index: void 0, period: 30, volumeSeriesID: "volume" } }), e2.registerSeriesType("vwap", r), r;
      }), s(t, "Stock/Indicators/WilliamsR/WilliamsRIndicator.js", [t["Stock/Indicators/ArrayUtilities.js"], t["Core/Series/SeriesRegistry.js"], t["Core/Utilities.js"]], function(e2, t2, s2) {
        let { sma: i } = t2.seriesTypes, { extend: o, isArray: a, merge: r } = s2;
        class n extends i {
          getValues(t3, s3) {
            let i2, o2, r2, n2, l, p;
            let u = s3.period, h = t3.xData, d = t3.yData, c = d ? d.length : 0, g = [], y = [], m = [];
            if (!(h.length < u) && a(d[0]) && 4 === d[0].length) {
              for (p = u - 1; p < c; p++)
                i2 = d.slice(p - u + 1, p + 1), l = (o2 = e2.getArrayExtremes(i2, 2, 1))[0], r2 = -(((n2 = o2[1]) - d[p][3]) / (n2 - l) * 100), h[p] && (g.push([h[p], r2]), y.push(h[p]), m.push(r2));
              return { values: g, xData: y, yData: m };
            }
          }
        }
        return n.defaultOptions = r(i.defaultOptions, { params: { index: void 0, period: 14 } }), o(n.prototype, { nameBase: "Williams %R" }), t2.registerSeriesType("williamsr", n), n;
      }), s(t, "Stock/Indicators/WMA/WMAIndicator.js", [t["Core/Series/SeriesRegistry.js"], t["Core/Utilities.js"]], function(e2, t2) {
        let { sma: s2 } = e2.seriesTypes, { isArray: i, merge: o } = t2;
        function a(e3, t3, s3, i2, o2) {
          let a2 = t3[i2], r2 = o2 < 0 ? s3[i2] : s3[i2][o2];
          e3.push([a2, r2]);
        }
        function r(e3, t3, s3, i2) {
          let o2 = e3.length, a2 = e3.reduce(function(e4, t4, s4) {
            return [null, e4[1] + t4[1] * (s4 + 1)];
          })[1] / ((o2 + 1) / 2 * o2), r2 = t3[i2 - 1];
          return e3.shift(), [r2, a2];
        }
        class n extends s2 {
          getValues(e3, t3) {
            let s3 = t3.period, o2 = e3.xData, n2 = e3.yData, l = n2 ? n2.length : 0, p = o2[0], u = [], h = [], d = [], c = 1, g = -1, y, m, f = n2[0];
            if (o2.length < s3)
              return;
            i(n2[0]) && (g = t3.index, f = n2[0][g]);
            let D = [[p, f]];
            for (; c !== s3; )
              a(D, o2, n2, c, g), c++;
            for (y = c; y < l; y++)
              u.push(m = r(D, o2, n2, y)), h.push(m[0]), d.push(m[1]), a(D, o2, n2, y, g);
            return u.push(m = r(D, o2, n2, y)), h.push(m[0]), d.push(m[1]), { values: u, xData: h, yData: d };
          }
        }
        return n.defaultOptions = o(s2.defaultOptions, { params: { index: 3, period: 9 } }), e2.registerSeriesType("wma", n), n;
      }), s(t, "Stock/Indicators/Zigzag/ZigzagIndicator.js", [t["Core/Series/SeriesRegistry.js"], t["Core/Utilities.js"]], function(e2, t2) {
        let { sma: s2 } = e2.seriesTypes, { merge: i, extend: o } = t2;
        class a extends s2 {
          getValues(e3, t3) {
            let s3 = t3.lowIndex, i2 = t3.highIndex, o2 = t3.deviation / 100, a2 = { low: 1 + o2, high: 1 - o2 }, r = e3.xData, n = e3.yData, l = n ? n.length : 0, p = [], u = [], h = [], d, c, g, y, m = false, f = false;
            if (!r || r.length <= 1 || l && (void 0 === n[0][s3] || void 0 === n[0][i2]))
              return;
            let D = n[0][s3], x = n[0][i2];
            for (d = 1; d < l; d++)
              n[d][s3] <= x * a2.high ? (p.push([r[0], x]), g = [r[d], n[d][s3]], y = true, m = true) : n[d][i2] >= D * a2.low && (p.push([r[0], D]), g = [r[d], n[d][i2]], y = false, m = true), m && (u.push(p[0][0]), h.push(p[0][1]), c = d++, d = l);
            for (d = c; d < l; d++)
              y ? (n[d][s3] <= g[1] && (g = [r[d], n[d][s3]]), n[d][i2] >= g[1] * a2.low && (f = i2)) : (n[d][i2] >= g[1] && (g = [r[d], n[d][i2]]), n[d][s3] <= g[1] * a2.high && (f = s3)), false !== f && (p.push(g), u.push(g[0]), h.push(g[1]), g = [r[d], n[d][f]], y = !y, f = false);
            let S = p.length;
            return 0 !== S && p[S - 1][0] < r[l - 1] && (p.push(g), u.push(g[0]), h.push(g[1])), { values: p, xData: u, yData: h };
          }
        }
        return a.defaultOptions = i(s2.defaultOptions, { params: { index: void 0, period: void 0, lowIndex: 2, highIndex: 1, deviation: 1 } }), o(a.prototype, { nameComponents: ["deviation"], nameSuffixes: ["%"], nameBase: "Zig Zag" }), e2.registerSeriesType("zigzag", a), a;
      }), s(t, "Stock/Indicators/LinearRegression/LinearRegressionIndicator.js", [t["Core/Series/SeriesRegistry.js"], t["Core/Utilities.js"]], function(e2, t2) {
        let { sma: s2 } = e2.seriesTypes, { isArray: i, extend: o, merge: a } = t2;
        class r extends s2 {
          getRegressionLineParameters(e3, t3) {
            let s3 = this.options.params.index, o2 = function(e4, t4) {
              return i(e4) ? e4[t4] : e4;
            }, a2 = e3.reduce(function(e4, t4) {
              return t4 + e4;
            }, 0), r2 = t3.reduce(function(e4, t4) {
              return o2(t4, s3) + e4;
            }, 0), n = a2 / e3.length, l = r2 / t3.length, p, u, h = 0, d = 0;
            for (u = 0; u < e3.length; u++)
              h += (p = e3[u] - n) * (o2(t3[u], s3) - l), d += Math.pow(p, 2);
            let c = d ? h / d : 0;
            return { slope: c, intercept: l - c * n };
          }
          getEndPointY(e3, t3) {
            return e3.slope * t3 + e3.intercept;
          }
          transformXData(e3, t3) {
            let s3 = e3[0];
            return e3.map(function(e4) {
              return (e4 - s3) / t3;
            });
          }
          findClosestDistance(e3) {
            let t3, s3, i2;
            for (i2 = 1; i2 < e3.length - 1; i2++)
              (t3 = e3[i2] - e3[i2 - 1]) > 0 && (void 0 === s3 || t3 < s3) && (s3 = t3);
            return s3;
          }
          getValues(e3, t3) {
            let s3, i2, o2, a2, r2, n, l, p, u;
            let h = e3.xData, d = e3.yData, c = t3.period, g = { xData: [], yData: [], values: [] }, y = this.options.params.xAxisUnit || this.findClosestDistance(h);
            for (i2 = c - 1; i2 <= h.length - 1; i2++)
              o2 = i2 - c + 1, a2 = i2 + 1, r2 = h[i2], l = h.slice(o2, a2), p = d.slice(o2, a2), u = this.transformXData(l, y), s3 = this.getRegressionLineParameters(u, p), n = this.getEndPointY(s3, u[u.length - 1]), g.values.push({ regressionLineParameters: s3, x: r2, y: n }), g.xData.push(r2), g.yData.push(n);
            return g;
          }
        }
        return r.defaultOptions = a(s2.defaultOptions, { params: { xAxisUnit: null }, tooltip: { valueDecimals: 4 } }), o(r.prototype, { nameBase: "Linear Regression Indicator" }), e2.registerSeriesType("linearRegression", r), r;
      }), s(t, "Stock/Indicators/LinearRegressionSlopes/LinearRegressionSlopesIndicator.js", [t["Core/Series/SeriesRegistry.js"], t["Core/Utilities.js"]], function(e2, t2) {
        let { linearRegression: s2 } = e2.seriesTypes, { extend: i, merge: o } = t2;
        class a extends s2 {
          getEndPointY(e3) {
            return e3.slope;
          }
        }
        return a.defaultOptions = o(s2.defaultOptions), i(a.prototype, { nameBase: "Linear Regression Slope Indicator" }), e2.registerSeriesType("linearRegressionSlope", a), a;
      }), s(t, "Stock/Indicators/LinearRegressionIntercept/LinearRegressionInterceptIndicator.js", [t["Core/Series/SeriesRegistry.js"], t["Core/Utilities.js"]], function(e2, t2) {
        let { linearRegression: s2 } = e2.seriesTypes, { extend: i, merge: o } = t2;
        class a extends s2 {
          getEndPointY(e3) {
            return e3.intercept;
          }
        }
        return a.defaultOptions = o(s2.defaultOptions), i(a.prototype, { nameBase: "Linear Regression Intercept Indicator" }), e2.registerSeriesType("linearRegressionIntercept", a), a;
      }), s(t, "Stock/Indicators/LinearRegressionAngle/LinearRegressionAngleIndicator.js", [t["Core/Series/SeriesRegistry.js"], t["Core/Utilities.js"]], function(e2, t2) {
        let { linearRegression: s2 } = e2.seriesTypes, { extend: i, merge: o } = t2;
        class a extends s2 {
          slopeToAngle(e3) {
            return 180 / Math.PI * Math.atan(e3);
          }
          getEndPointY(e3) {
            return this.slopeToAngle(e3.slope);
          }
        }
        return a.defaultOptions = o(s2.defaultOptions, { tooltip: { pointFormat: '<span style="color:{point.color}">●</span>{series.name}: <b>{point.y}°</b><br/>' } }), i(a.prototype, { nameBase: "Linear Regression Angle Indicator" }), e2.registerSeriesType("linearRegressionAngle", a), a;
      }), s(t, "Stock/Indicators/ABands/ABandsIndicator.js", [t["Stock/Indicators/MultipleLinesComposition.js"], t["Core/Series/SeriesRegistry.js"], t["Core/Utilities.js"]], function(e2, t2, s2) {
        let { sma: i } = t2.seriesTypes, { correctFloat: o, extend: a, merge: r } = s2;
        class n extends i {
          getValues(e3, t3) {
            let s3, i2, a2, r2, n2, l, p, u, h, d, c;
            let g = t3.period, y = t3.factor, m = t3.index, f = e3.xData, D = e3.yData, x = D ? D.length : 0, S = [], v = [], C = [], A = [], I = [];
            if (!(x < g)) {
              for (c = 0; c <= x; c++) {
                if (c < x) {
                  var T, P;
                  T = D[c][2], n2 = o((P = D[c][1]) - T) / (o(P + T) / 2) * 1e3 * y, S.push(D[c][1] * o(1 + 2 * n2)), v.push(D[c][2] * o(1 - 2 * n2));
                }
                c >= g && (h = f.slice(c - g, c), d = D.slice(c - g, c), p = super.getValues.call(this, { xData: h, yData: S.slice(c - g, c) }, { period: g }), u = super.getValues.call(this, { xData: h, yData: v.slice(c - g, c) }, { period: g }), r2 = (l = super.getValues.call(this, { xData: h, yData: d }, { period: g, index: m })).xData[0], i2 = p.yData[0], a2 = u.yData[0], s3 = l.yData[0], C.push([r2, i2, s3, a2]), A.push(r2), I.push([i2, s3, a2]));
              }
              return { values: C, xData: A, yData: I };
            }
          }
        }
        return n.defaultOptions = r(i.defaultOptions, { params: { period: 20, factor: 1e-3, index: 3 }, lineWidth: 1, topLine: { styles: { lineWidth: 1 } }, bottomLine: { styles: { lineWidth: 1 } }, dataGrouping: { approximation: "averages" } }), a(n.prototype, { areaLinesNames: ["top", "bottom"], linesApiNames: ["topLine", "bottomLine"], nameBase: "Acceleration Bands", nameComponents: ["period", "factor"], pointArrayMap: ["top", "middle", "bottom"], pointValKey: "middle" }), e2.compose(n), t2.registerSeriesType("abands", n), n;
      }), s(t, "Stock/Indicators/TrendLine/TrendLineIndicator.js", [t["Core/Series/SeriesRegistry.js"], t["Core/Utilities.js"]], function(e2, t2) {
        let { sma: s2 } = e2.seriesTypes, { extend: i, merge: o, isArray: a } = t2;
        class r extends s2 {
          constructor() {
            super(...arguments), this.updateAllPoints = true;
          }
          getValues(e3, t3) {
            let s3 = e3.xData, i2 = e3.yData, o2 = [], r2 = [], n = [], l = [], p = t3.index, u = 0, h = 0, d = 0, c = 0, g = 0;
            for (let e4 = 0; e4 < s3.length; e4++)
              (0 === e4 || s3[e4] !== s3[e4 - 1]) && g++, o2.push(g);
            for (let e4 = 0; e4 < o2.length; e4++)
              d += o2[e4], c += a(i2[e4]) ? i2[e4][p] : i2[e4];
            let y = d / o2.length, m = c / i2.length;
            for (let e4 = 0; e4 < o2.length; e4++) {
              let t4 = a(i2[e4]) ? i2[e4][p] : i2[e4];
              u += (o2[e4] - y) * (t4 - m), h += Math.pow(o2[e4] - y, 2);
            }
            for (let e4 = 0; e4 < o2.length; e4++) {
              if (s3[e4] === n[n.length - 1])
                continue;
              let t4 = s3[e4], i3 = m + u / h * (o2[e4] - y);
              r2.push([t4, i3]), n.push(t4), l.push(i3);
            }
            return { xData: n, yData: l, values: r2 };
          }
        }
        return r.defaultOptions = o(s2.defaultOptions, { params: { period: void 0, index: 3 } }), i(r.prototype, { nameBase: "Trendline", nameComponents: void 0 }), e2.registerSeriesType("trendline", r), r;
      }), s(t, "Stock/Indicators/DisparityIndex/DisparityIndexIndicator.js", [t["Core/Series/SeriesRegistry.js"], t["Core/Utilities.js"]], function(e2, t2) {
        let { sma: s2 } = e2.seriesTypes, { correctFloat: i, defined: o, extend: a, isArray: r, merge: n } = t2;
        class l extends s2 {
          init() {
            let t3 = arguments, i2 = t3[1].params, o2 = i2 && i2.average ? i2.average : void 0;
            this.averageIndicator = e2.seriesTypes[o2] || s2, this.averageIndicator.prototype.init.apply(this, t3);
          }
          calculateDisparityIndex(e3, t3) {
            return i(e3 - t3) / t3 * 100;
          }
          getValues(e3, t3) {
            let s3 = t3.index, i2 = e3.xData, a2 = e3.yData, n2 = a2 ? a2.length : 0, l2 = [], p = [], u = [], h = this.averageIndicator, d = r(a2[0]), c = h.prototype.getValues(e3, t3), g = c.yData, y = i2.indexOf(c.xData[0]);
            if (g && 0 !== g.length && o(s3) && !(a2.length <= y)) {
              for (let e4 = y; e4 < n2; e4++) {
                let t4 = this.calculateDisparityIndex(d ? a2[e4][s3] : a2[e4], g[e4 - y]);
                l2.push([i2[e4], t4]), p.push(i2[e4]), u.push(t4);
              }
              return { values: l2, xData: p, yData: u };
            }
          }
        }
        return l.defaultOptions = n(s2.defaultOptions, { params: { average: "sma", index: 3 }, marker: { enabled: false }, dataGrouping: { approximation: "averages" } }), a(l.prototype, { nameBase: "Disparity Index", nameComponents: ["period", "average"] }), e2.registerSeriesType("disparityindex", l), l;
      }), s(t, "masters/indicators/indicators-all.src.js", [t["Core/Globals.js"]], function(e2) {
        return e2;
      });
    });
  }
});
export default require_indicators_all();
//# sourceMappingURL=highcharts_indicators_indicators-all.js.map
