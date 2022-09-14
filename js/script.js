'use strict';

const getBreakpoint = function () {
    return window
        .getComputedStyle(document.body, ':before')
        .content.replace(/\"/g, '');
};

const breakpoints = ['none', 'very small', 'small', 'medium', 'large'];

const headerIndent = document.querySelector('.header__indent');

const cssApply = function (breakpoint) {
    switch (breakpoint) {
        case 'large':
            break;

        case 'medium':
            break;

        case 'small':
            console.log('medium');
            document.querySelector('.header').append(headerIndent);
            break;

        case 'very small':
            document.querySelector('.header__background').after(headerIndent);
            break;

        case 'none':
            break;
    }
};

cssApply(getBreakpoint());

window.addEventListener('resize', () => {
    cssApply(getBreakpoint());
});
