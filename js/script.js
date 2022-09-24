'use strict';

window.addEventListener('DOMContentLoaded', () => {
    const getBreakpoint = function () {
        return window
            .getComputedStyle(document.body, ':before')
            .content.replace(/\"/g, '');
    };

    const headerIndent = document.querySelector('.header__indent');
    const navLinks = document.querySelector('.header__nav-links');

    const revealHeaderIndent = function () {
        if (this) {
            document.querySelector('.header').append(headerIndent);
        } else {
            document.querySelector('.header__background').after(headerIndent);
        }
    };

    const revealNavLinks = function () {
        if (this) {
            document.querySelector('.header').append(navLinks);
        } else {
            document.querySelector('.dropdown-btn').after(navLinks);
        }
    };

    const cssApply = function (breakpoint) {
        switch (breakpoint) {
            case 'large':
                revealHeaderIndent.call(true);
                revealNavLinks.call(true);
                break;

            case 'medium':
                revealHeaderIndent.call(true);
                revealNavLinks.call(true);
                break;

            case 'small':
                console.log('medium');
                revealHeaderIndent.call(true);
                revealNavLinks.call(true);
                break;

            case 'very small':
                revealHeaderIndent.call(false);
                revealNavLinks.call(true);
                break;

            case 'tiny':
                revealHeaderIndent.call(false);
                revealNavLinks.call(true);
                break;

            case 'none':
                revealHeaderIndent.call(false);
                revealNavLinks.call(true);
                break;
        }
    };

    cssApply(getBreakpoint());

    window.addEventListener('resize', () => {
        cssApply(getBreakpoint());
    });

    ///////////////////////////////////////////////
    // Open and Close Modal
    const signupBtns = document.querySelectorAll('.header__btn--signup');
    const registerBtns = document.querySelectorAll('.header__btn--register');
    const modalReg = document.querySelector('.modal--registration');
    const modalSign = document.querySelector('.modal--signup');
    const buttonCloseRegistration = document.querySelector(
        '.modal__btn-close--registration'
    );
    const buttonCloseSignup = document.querySelector(
        '.modal__btn-close--signup'
    );
    const overlay = document.querySelector('.overlay');

    const openModal = function (...array) {
        event.preventDefault();
        const [modal, overlay] = array;
        if (modal.classList.contains('hidden')) {
            modal.classList.remove('hidden');
            overlay.classList.remove('hidden');
            document.body.overflow = 'hidden';
        } else {
            modal.classList.add('hidden');
            overlay.classList.add('hidden');
            document.body.overflow = '';
        }
    };

    const closeModal = function (...array) {
        event.preventDefault();
        const [modal, overlay] = array;

        if (!modal.classList.contains('hidden')) {
            modal.classList.add('hidden');
            overlay.classList.add('hidden');
        }
    };

    buttonCloseRegistration.addEventListener(
        'click',
        closeModal.bind(null, modalReg, overlay)
    );
    buttonCloseSignup.addEventListener(
        'click',
        closeModal.bind(null, modalSign, overlay)
    );
    overlay.addEventListener(
        'click',
        closeModal.bind(null, modalSign, overlay)
    );
    overlay.addEventListener('click', closeModal.bind(null, modalReg, overlay));

    signupBtns.forEach(btn => {
        btn.addEventListener('click', openModal.bind(null, modalSign, overlay));
    });

    registerBtns.forEach(btn => {
        btn.addEventListener('click', openModal.bind(null, modalReg, overlay));
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

    /////////////////////////////////////////////////
    // Reveal Text
    const setSpanStyles = function (element) {
        let count = 0;
        element
            .querySelectorAll('div.daily-payouts__big-text--flex span')
            .forEach((span, i) => {
                span.style.opacity = 0;
                span.style.transform = `translateY(${i * 5}px)`;
                span.style.transition = `all 0.2s ${(count = count + 0.08)}s`;
            });
    };

    const revealLetters = function (element) {
        element
            .querySelectorAll('div.daily-payouts__big-text--flex span')
            .forEach(span => {
                span.classList.add('letter--visible');
            });
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
        dailyPayoutsText,
    }) {
        dailyPayoutsChildren = dailyPayoutsChildren.filter(
            el => !el.matches('.daily-payouts__big-text')
        );
        dailyPayoutsChildren.forEach(element => {
            addTransition(element);
        });

        const revealDailyPayouts = function (entries, observer) {
            const [entry] = entries;

            if (!entry.isIntersecting) return;

            entry.target.classList.remove('element--hidden');

            if (entry.target.matches('.daily-payouts__big-text')) {
                revealLetters(entry.target);
            }

            observer.unobserve(entry.target);
        };

        const observeDailyPayouts = new IntersectionObserver(
            revealDailyPayouts,
            {
                root: null,
                threshold: 0.15,
            }
        );

        const observeDailyPayoutsSpanText = new IntersectionObserver(
            revealDailyPayouts,
            {
                root: null,
                threshold: 0,
            }
        );

        dailyPayoutsChildren.forEach(element => {
            observeDailyPayouts.observe(element);
            element.classList.add('element--hidden');
        });

        observeDailyPayoutsSpanText.observe(dailyPayoutsText);

        setSpanStyles(dailyPayoutsText);
    };

    const observePayments = function ({
        paymentsChildren,
        paymentsHeaderText,
    }) {
        paymentsChildren = paymentsChildren.filter(
            el => !el.matches('.payments--header')
        );

        paymentsChildren.forEach(element => {
            addTransition(element);
        });

        const revealPayments = function (entries, observer) {
            const [entry] = entries;

            if (!entry.isIntersecting) return;

            entry.target.classList.remove('element--hidden');
            if (entry.target.matches('.payments--header')) {
                revealLetters(entry.target);
            }

            observer.unobserve(entry.target);
        };

        const observePayments = new IntersectionObserver(revealPayments, {
            root: null,
            threshold: 0.1,
        });

        setSpanStyles(paymentsHeaderText);

        observePayments.observe(paymentsHeaderText);

        paymentsChildren.forEach(element => {
            observePayments.observe(element);
            element.classList.add('element--hidden');
        });
    };

    const observeSupport = function ({ supportBoxes, supportHeaderText }) {
        let supportBoxesElements = Array.from(supportBoxes).flatMap(box => [
            ...box.children,
        ]);

        supportBoxesElements = supportBoxesElements.filter(
            el => !el.matches('.support--header')
        );

        supportBoxesElements.forEach(el => addTransition(el));

        const revealSupportElements = function (entries, observer) {
            const [entry] = entries;

            if (!entry.isIntersecting) return;

            entry.target.classList.remove('element--hidden');
            if (entry.target.matches('.support--header')) {
                revealLetters(entry.target);
            }

            observer.unobserve(entry.target);
        };

        const observeSupport = new IntersectionObserver(revealSupportElements, {
            root: null,
            threshold: 0.1,
        });

        const observeSupportText = new IntersectionObserver(
            revealSupportElements,
            {
                root: null,
                threshold: 0,
            }
        );

        observeSupportText.observe(supportHeaderText);

        setSpanStyles(supportHeaderText);

        supportBoxesElements.forEach(el => {
            observeSupport.observe(el);
            el.classList.add('element--hidden');
        });
    };

    const observeAdminStuff = function ({ adminStuff }) {
        const revealAdminStuff = function (entries, observer) {
            const [entry] = entries;

            if (!entry.isIntersecting) return;

            revealLetters(entry.target);

            observer.unobserve(entry.target);
        };

        const observeAdminStuff = new IntersectionObserver(revealAdminStuff, {
            root: null,
            threshold: 0,
        });

        observeAdminStuff.observe(adminStuff);

        setSpanStyles(adminStuff);
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
        dailyPayoutsText: document.querySelector('.daily-payouts__big-text'),
    });

    observePayments({
        paymentsChildren: Array.from(
            document.querySelector('.payments').children
        ),
        paymentsHeaderText: document.querySelector('.payments--header'),
    });

    observeSupport({
        supportBoxes: document.querySelectorAll('.support-box'),
        supportHeaderText: document.querySelector('.support--header'),
    });

    observeAdminStuff({
        adminStuff: document.querySelector('.admin-stuff'),
    });
});
