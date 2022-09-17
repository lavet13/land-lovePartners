'use strict';

window.addEventListener('DOMContentLoaded', () => {
    const overlay = document.querySelector('.overlay');

    const getBreakpoint = function () {
        return window
            .getComputedStyle(document.body, ':before')
            .content.replace(/\"/g, '');
    };

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

    const dropDownNavLinks = function ({ dropDownButton, navLinksContainer }) {
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
    };

    /////////////////////////////////////////////////
    // Reveal elements on scroll

    const observePotentialBoxes = function ({ potentialBoxes }) {
        const revealPotentialBox = function (entries, observer) {
            const [entry] = entries;

            if (!entry.isIntersecting) return;

            entry.target.classList.remove('potential-box--hidden');

            observer.unobserve(entry.target);
        };

        const potentialBoxObserver = new IntersectionObserver(
            revealPotentialBox,
            {
                root: null,
                threshold: 0.42,
            }
        );

        potentialBoxes.forEach(box => {
            potentialBoxObserver.observe(box);
            box.classList.add('potential-box--hidden');
        });
    };

    // INVOKING THE FUNCTIONS
    dropDownNavLinks({
        dropDownButton: document.querySelector('.dropdown-btn'),
        navLinksContainer: document.querySelector('.header__nav-links'),
    });

    observePotentialBoxes({
        potentialBoxes: document.querySelectorAll('.potential-box'),
    });

    ///////////////////////////////////////////////////
    // Close Nav Links
    const navLinksContainer = document.querySelector('.header__nav-links');
    const dropDownBtn = document.querySelector('.dropdown-btn');
    document.body.addEventListener('click', e => {
        if (!navLinksContainer.matches('.header__nav-links--active')) return;
        console.log('NONONON');
        const isNotNavLinks = e.currentTarget.closest('.header__nav-links');
        if (!isNotNavLinks) {
            console.log('click');
            dropDownBtn.classList.remove('dropdown-btn--active');
            navLinksContainer.classList.remove('header__nav-links--active');
        }
    });

    // overflow but below everyone
});
