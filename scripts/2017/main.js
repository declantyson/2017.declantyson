/*
 *
 *  declantyson/2017/main
 *  Declan Tyson
 *  v0.1.2
 *  04/04/2017
 *
 */


/* jshint esversion: 6 */
const Ocelot = require('ocelot-pjax');
let ocelot = new Ocelot.Pjax();

const ocelotCallback = () => {

    document.querySelector('#total').scrollTop = 0;

    let header = document.querySelector('header'),
        navigation = document.querySelector('.navigation'),
        pageTitle = document.querySelector('#ocelot-content h1'),
        pageSubTitle = document.querySelector('#ocelot-content h6'),
        pageTitleH1 = document.createElement('h1'),
        pageSubTitlePara = document.createElement('p'),
        bodyClassName = window.location.pathname.replace('/', '').replace(/\//g, '-'),
        fileName = window.location.pathname.substr(1, window.location.pathname.length - 1),
        featuredImg = document.getElementById('featured');

    if(bodyClassName === '') {
        bodyClassName = 'homepage';
        fileName = 'homepage';
    }
    document.body.className = bodyClassName;

    let titlePrefix = 'Declan Tyson | ';
    if(bodyClassName === 'homepage') {
        titlePrefix = '';
    }
    document.title = titlePrefix + pageTitle.innerHTML;
    pageTitleH1.innerHTML = pageTitle.innerHTML;
    pageTitle.remove();

    pageSubTitlePara.innerHTML = pageSubTitle.innerHTML;
    pageSubTitle.remove();

    header.className = '';
    header.innerHTML = pageTitleH1.outerHTML + pageSubTitlePara.outerHTML;

    ocelot.fadeContent(1);

    featuredImg.onload = () => {
        featuredImg.style.opacity = 1;

        let offset = (header.clientHeight + navigation.clientHeight + 20);
        if(navigator.userAgent.match(/Android/g)) offset += 55;
        if(navigator.userAgent.match(/iPhone/g)) offset += 95;

        header.className = 'in';
        header.style.marginTop = 'calc(100vh - ' + offset + 'px)';

        let scrollPoint = document.querySelector('#total').clientHeight / 4;

        if (window.location.pathname === '/') {

        } else if (document.querySelector('#total').scrollTop <= scrollPoint) {
            //scrollPage(500, scrollPoint);
            document.querySelector('.drop').className = 'drop in';
        }
    };

    if(window.innerWidth < 480) {
        fileName = 'mobile/' + fileName;
    }
    featuredImg.setAttribute('src', '/assets/' + fileName + '.png');
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
    if(typeof ocelot.events[window.location.pathname] !== 'undefined') ocelot.events[window.location.pathname]();
};

document.querySelector('#total').onscroll = () => {
    let scrollPoint = document.querySelector('#total').clientHeight / 4;
    if(document.querySelector('#total').scrollTop <= scrollPoint + 10) {
        document.querySelector('.drop').className = 'drop in';
    } else {
        document.querySelector('.drop').className = 'drop';
    }
};

document.querySelector('.drop').onclick = () => {
    let scrollPoint = document.querySelector('#total').clientHeight / 4;
    if(document.body.clientWidth < 640) {
        scrollPoint = false;
    }

    scrollPage(500, scrollPoint);
};

window.onresize = () => {
    let fileName = window.location.pathname.substr(1, window.location.pathname.length - 1);
    if(fileName === '') fileName = 'homepage';

    if(window.innerWidth < 480) {
        fileName = 'mobile/' + fileName;
    }

    document.querySelector('#featured').setAttribute('src', '/assets/' + fileName + '.png');
};

const scrollPage = (scrollDuration, stopPoint = false) => {
    let view = document.querySelector('#total'),
        header = document.querySelector('header'),
        bottom = view.scrollHeight - view.clientHeight;

    if(!stopPoint) stopPoint = bottom < header.offsetTop-40 ? bottom : header.offsetTop-40;

    let scrollStep = stopPoint / (scrollDuration / 15),
        scrollInterval = setInterval(() => {
            if (view.scrollTop < stopPoint) {
                view.scrollTop += scrollStep;
            } else {
                clearInterval(scrollInterval);
            }
        },15);
};
