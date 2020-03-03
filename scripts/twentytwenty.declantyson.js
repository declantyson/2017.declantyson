/* 
  * 
  *  twentytwenty.declantyson 
  *  Declan Tyson 
  *  v0.1.2 
  *  03/03/2020 
  * 
  */


(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.twentytwenty || (g.twentytwenty = {})).declantyson = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (global){
/* 
  * 
  *  Ocelot 
  *  Declan Tyson 
  *  v0.3.10 
  *  25/09/2017 
  * 
  */


!function(a){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=a();else if("function"==typeof define&&define.amd)define([],a);else{var b;b="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,b.Ocelot=a()}}(function(){return function a(b,c,d){function e(g,h){if(!c[g]){if(!b[g]){var i="function"==typeof require&&require;if(!h&&i)return i(g,!0);if(f)return f(g,!0);var j=new Error("Cannot find module '"+g+"'");throw j.code="MODULE_NOT_FOUND",j}var k=c[g]={exports:{}};b[g][0].call(k.exports,function(a){var c=b[g][1][a];return e(c||a)},k,k.exports,a,b,c,d)}return c[g].exports}for(var f="function"==typeof require&&require,g=0;g<d.length;g++)e(d[g]);return e}({1:[function(a,b,c){"use strict";function d(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(c,"__esModule",{value:!0});var e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&"function"==typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a},f=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),g=function(a){var b=a.match(/^([^:\/?#]+:)?(?:\/\/([^\/?#]*))?([^?#]+)?(\?[^#]*)?(#.*)?/);return"string"==typeof b[1]&&b[1].length>0&&b[1].toLowerCase()!==location.protocol||"string"==typeof b[2]&&b[2].length>0&&b[2].replace(new RegExp(":("+{"http:":80,"https:":443}[location.protocol]+")?$"),"")!==location.host},h=function(){function a(){var b=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"ocelot-content";d(this,a),this.el=b,this.events={},this.defaultOpts={endpoint:!1,method:"GET",timeout:0,callback:null,callbackTimeout:0,push:!0},this.prePopCallback=function(){},this.postPopCallback=null,this.registerPop()}return f(a,[{key:"registerPop",value:function(){var a=this,b=this;history.pushState?window.onpopstate=function(){var c={endpoint:window.location.pathname,push:!1};b.prePopCallback&&a.prePopCallback(),b.postPopCallback&&(c.callback=a.postPopCallback),b.changePage(c)}:console.warn("Ocelot: this browser does not support history.pushState. Hash changing is coming soon.")}},{key:"setEvent",value:function(a,b){this.events[a]=b}},{key:"changePage",value:function(){var a=this,b=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},c=this.defaultOpts;Object.keys(b).forEach(function(a){c[a]=b[a]}),c.endpoint||console.warn("Ocelot: a PJAX endpoint is required.");var d=new XMLHttpRequest;d.open(c.method,c.endpoint,!0),d.send(),d.onreadystatechange=function(){if(4===d.readyState){if(200!==d.status)return void console.warn("Ocelot: "+c.method+" "+c.endpoint+" returned "+d.status+".");setTimeout(function(){var b=document.createElement("div");b.innerHTML=d.responseText,document.querySelector("#"+a.el).innerHTML=b.querySelector("#"+a.el).innerHTML;var f=a.events[c.endpoint];if(f){if("function"!=typeof f)return void console.warn("Ocelot: "+c.endpoint+" event must be a function, instead found "+(void 0===f?"undefined":e(f))+".");f()}},c.timeout),setTimeout(function(){if(null!==c.callback)return"function"!=typeof c.callback?void console.warn("Ocelot: Callback must be a function, instead found "+e(c.callback)+"."):void c.callback(d.responseText)},c.callbackTimeout),c.push&&history.pushState("","New URL: "+c.endpoint,c.endpoint)}}}},{key:"all",value:function(){var a=this,b=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};document.addEventListener("click",function(c){c=c||window.event;for(var d=c.target||c.srcElement;d;){if(d instanceof HTMLAnchorElement){b.endpoint=d.attributes.href.value,b.push=!0;if(-1!==["mailto","tel"].indexOf(b.endpoint.split(":")[0]))break;if(g(b.endpoint))break;c.preventDefault(),"function"!=typeof b.prePopCallback?a.prePopCallback():b.prePopCallback(),a.changePage(b);break}d=d.parentNode}})}},{key:"fadeAll",value:function(){var a=this,b=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};b.timeout||(b.timeout=250),b.callbackTimeout||(b.callbackTimeout=250),b.fadeTo||(b.fadeTo=0),b.prePopCallback||(this.prePopCallback=function(){a.fadeContent(b.fadeTo)}),document.getElementById(this.el).style.transition="opacity "+b.timeout/1e3+"s ease-out",document.addEventListener("click",function(c){c=c||window.event;for(var d=c.target||c.srcElement;d;){if(d instanceof HTMLAnchorElement){if("break"===function(){if(b.endpoint=d.attributes.href.value,b.push=!0,-1!==["mailto","tel"].indexOf(b.endpoint.split(":")[0]))return"break";if(g(b.endpoint))return"break";c.preventDefault(),a.fadeContent(b.fadeTo);var e=b.callback;return b.callback=function(b){a.fadeContent(1),e&&e(b)},a.postPopCallback=b.callback,a.changePage(b),"break"}())break}d=d.parentNode}})}},{key:"fadeContent",value:function(a){document.getElementById(this.el).style.opacity=a}}]),a}();c.Pjax=h},{}]},{},[1])(1)});
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],2:[function(require,module,exports){
/*
 *
 *  declantyson/2020/main
 *  Declan Tyson
 *  v1.0
 *  03/03/2020
 *
 */

/* jshint esversion: 6 */
const Ocelot = require('ocelot-pjax');
let ocelot = new Ocelot.Pjax();

const ocelotCallback = () => {
    let featuredImg = document.querySelector('#featured img'),
        fileName = window.location.pathname.substr(1, window.location.pathname.length - 1),
        container = document.getElementById('container');

    if (fileName === '') fileName = 'homepage';
    if (window.innerWidth < 480) fileName = `mobile/${fileName}`;

    featuredImg.setAttribute('src', `/assets/${fileName}.png`);
    container.scrollTo(0, 0);
};

ocelot.prePopCallback = () => {};

ocelot.all({
    timeout: 500,
    callbackTimeout: 550,
    callback: ocelotCallback
});

window.onload = () => {
    ocelotCallback();
    if (typeof ocelot.events[window.location.pathname] !== 'undefined') ocelot.events[window.location.pathname]();
};


},{"ocelot-pjax":1}]},{},[2])(2)
});
