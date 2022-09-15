'use strict';

window.addEventListener('DOMContentLoaded', () => {
    // ELEMENTS
    const dropDownButton = document.querySelector('.dropdown-btn');
    const navLinksContainer = document.querySelector('.header__nav-links');
    const potentialBoxes = document.querySelectorAll('.potential-box');
    const overlay = document.querySelector('.overlay');

    const getBreakpoint = function () {
        return window
            .getComputedStyle(document.body, ':before')
            .content.replace(/\"/g, '');
    };

    const breakpoints = ['none', 'very small', 'small', 'medium', 'large'];

    const headerIndent = document.querySelector('.header__indent');

    const revealHeaderIndent = function () {
        if (this) {
            document.querySelector('.header').append(headerIndent);
        } else {
            document.querySelector('.header__background').after(headerIndent);
        }
    };

    const cssApply = function (breakpoint) {
        switch (breakpoint) {
            case 'large':
                revealHeaderIndent.call(true);
                break;

            case 'medium':
                revealHeaderIndent.call(true);
                break;

            case 'small':
                console.log('medium');
                revealHeaderIndent.call(true);
                break;

            case 'very small':
                revealHeaderIndent.call(false);
                break;

            case 'tiny':
                revealHeaderIndent.call(false);
                break;

            case 'none':
                revealHeaderIndent.call(false);
                break;
        }
    };

    cssApply(getBreakpoint());

    window.addEventListener('resize', () => {
        cssApply(getBreakpoint());
    });

    ///////////////////////////////////////////////
    // DROP_DOWN_BUTTON

    dropDownButton.addEventListener('click', e => {
        if (e.currentTarget.classList.contains('dropdown-btn--active')) {
            e.currentTarget.classList.remove('dropdown-btn--active');
            navLinksContainer.classList.remove('header__nav-links--active');
            document.body.style.overflow = '';
        } else {
            e.currentTarget.classList.add('dropdown-btn--active');
            navLinksContainer.classList.add('header__nav-links--active');
            document.body.style.overflow = 'hidden';
        }
    });

    /////////////////////////////////////////////////
    // Reveal elements on scroll

    const revealPotentialBox = function (entries, observer) {
        const [entry] = entries;

        if (!entry.isIntersecting) return;

        entry.target.classList.remove('potential-box--hidden');

        observer.unobserve(entry.target);
    };

    const potentialBoxObserver = new IntersectionObserver(revealPotentialBox, {
        root: null,
        threshold: 0.42,
    });

    potentialBoxes.forEach(box => {
        potentialBoxObserver.observe(box);
        box.classList.add('potential-box--hidden');
    });
});
