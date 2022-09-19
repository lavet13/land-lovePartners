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
    const addTransition = function (element) {
        element.classList.add('transition-reveal');
    };

    // POTENTIAL BOXES
    const observePotentialBoxes = function ({ potentialBoxes }) {
        const revealPotentialBox = function (entries, observer) {
            const [entry] = entries;

            if (!entry.isIntersecting) return;

            entry.target.classList.remove('element--hidden');

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
            box.classList.add('element--hidden');
        });
    };

    // DAILY-PAYOUTS
    const observeDailyPayouts = function ({
        dailyPayoutsChildren,
        dailyPayoutsTextSpan,
    }) {
        dailyPayoutsChildren = dailyPayoutsChildren.filter(
            el => !el.matches('.daily-payouts__big-text')
        );
        dailyPayoutsChildren.forEach(element => {
            addTransition(element);
        });

        console.log(dailyPayoutsTextSpan);

        dailyPayoutsTextSpan.forEach((el, i) => {
            console.log(i);
            el.style.transform = `translateY(${i * 5}px)`;
            el.style.transition = `all `;
        });

        const revealDailyPayouts = function (entries, observer) {
            const [entry] = entries;

            if (!entry.isIntersecting) return;

            entry.target.classList.remove('element--hidden');

            observer.unobserve(entry.target);
        };

        const observeDailyPayouts = new IntersectionObserver(
            revealDailyPayouts,
            {
                root: null,
                threshold: 0.15,
            }
        );

        dailyPayoutsChildren.forEach(element => {
            observeDailyPayouts.observe(element);
            element.classList.add('element--hidden');
        });
    };

    const observePayments = function ({ paymentsChildren }) {
        paymentsChildren.forEach(element => {
            addTransition(element);
        });
        const revealPayments = function (entries, observer) {
            const [entry] = entries;

            if (!entry.isIntersecting) return;

            entry.target.classList.remove('element--hidden');

            observer.unobserve(entry.target);
        };

        const observePayments = new IntersectionObserver(revealPayments, {
            root: null,
            threshold: 0.1,
        });

        paymentsChildren.forEach(element => {
            observePayments.observe(element);
            element.classList.add('element--hidden');
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

    observeDailyPayouts({
        dailyPayoutsChildren: Array.from(
            document.querySelector('.daily-payouts').children
        ),
        dailyPayoutsTextSpan: document.querySelectorAll(
            '.daily-payouts__big-text--flex span'
        ),
    });

    observePayments({
        paymentsChildren: Array.from(
            document.querySelector('.payments').children
        ),
    });
});
