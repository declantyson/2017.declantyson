// A script, not an application

var button = document.querySelector('button.read-more');
var main = document.querySelector('main');
var content = document.querySelector('section.content');

button.addEventListener('click', openContent);

function openContent() {
    button.classList.add('hide');
    main.classList.add('shrink');
    content.classList.add('show');

    setTimeout(function () {
        content.classList.add('expand');
    }, 1);
}
