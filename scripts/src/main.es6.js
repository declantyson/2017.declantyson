/*
 *
 *  declantyson/2017/main
 *  Declan Tyson
 *  v0.1.1
 *  30/03/2017
 *
 */

/* jshint esversion: 6 */
const Ocelot = require('ocelot-pjax');
let ocelot = new Ocelot.Pjax();

const ocelotCallback = () => {
    let header = document.querySelector('header'),
        pageTitle = document.querySelector('#ocelot-content h1'),
        pageSubTitle = document.querySelector('#ocelot-content h6'),
        pageTitleH1 = document.createElement('h1'),
        pageSubTitlePara = document.createElement('p'),
        bodyClassName = window.location.pathname.replace('/', ''),
        featuredImg = document.getElementById('featured');

    if(bodyClassName === '') bodyClassName = 'homepage';
    document.body.className = bodyClassName;

    featuredImg.setAttribute("src", "/assets/" + bodyClassName + ".png");
    featuredImg.style.opacity = 1;

    let titlePrefix = "Declan Tyson | ";
    if(bodyClassName === 'homepage') {
        titlePrefix = "";
    }
    document.title = titlePrefix + pageTitle.innerText;
    pageTitleH1.innerText = pageTitle.innerText;
    pageTitle.remove();

    pageSubTitlePara.innerHTML = pageSubTitle.innerText;
    pageSubTitle.remove();

    header.className = '';
    header.innerHTML = pageTitleH1.outerHTML + pageSubTitlePara.outerHTML;

    ocelot.fadeContent(1);

    setTimeout(() => {
        header.className = 'in';

        if(window.location.pathname !== "/") {
            scrollPage(500);
        } else {
            document.querySelector('#total').scrollTop = 0;
        }
    },200);
};

ocelot.prePopCallback = () => {
    document.querySelector('header').className = 'out';
    ocelot.fadeContent(0);
    document.getElementById('featured').style.opacity = 0;
};

ocelot.all({
    timeout: 500,
    callbackTimeout: 550,
    callback: ocelotCallback
});

window.onload = () => {
    ocelotCallback();
    if(typeof ocelot.events[window.location.pathname] !== "undefined") ocelot.events[window.location.pathname]();
};

const scrollPage = (scrollDuration) => {
    let view = document.querySelector('#total'),
        header = document.querySelector('header'),
        bottom = view.scrollHeight - view.clientHeight,
        stopPoint = bottom < header.offsetTop-40 ? bottom : header.offsetTop-40,
        scrollStep = stopPoint / (scrollDuration / 15),
        scrollInterval = setInterval(() => {
            if (view.scrollTop < stopPoint) {
                view.scrollTop += scrollStep;
            } else {
                clearInterval(scrollInterval);
            }
        },15);
};