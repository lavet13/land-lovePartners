'use strict';

const getBreakpoint = function () {
    return window
        .getComputedStyle(document.body, ':before')
        .content.replace(/\"/g, '');
};

window.addEventListener('resize', e => {
    console.log(getBreakpoint());
    if (document.documentElement.clientWidth > 0) {
        document
            .querySelector('.header')
            .after(document.querySelector('.header__indent'));
    } else if (document.documentElement.clientWidth > 600) {
        document
            .querySelector('.header')
            .append(document.querySelector('.header__indent'));
    }
});
