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


    if(fileName === '') fileName = 'homepage';
    if(window.innerWidth < 480) fileName = `mobile/${fileName}`;

    featuredImg.setAttribute('src', `/assets/${fileName}.png`);
    container.scrollTo(0,0);
};

ocelot.prePopCallback = () => {

};

ocelot.all({
    timeout: 500,
    callbackTimeout: 550,
    callback: ocelotCallback
});

window.onload = () => {
    ocelotCallback();
    if(typeof ocelot.events[window.location.pathname] !== 'undefined') ocelot.events[window.location.pathname]();
};

