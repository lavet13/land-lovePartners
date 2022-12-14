'use strict';

window.addEventListener('DOMContentLoaded', () => {
    // https://gomakethings.com/the-easy-way-to-manage-css-breakpoints-in-javascript/
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

    const supportButton = document.getElementsByClassName('support__button');
    const switchSupportButton = function () {
        if (this) {
            document.querySelector('.support-box--1').append(supportButton[0]);
        } else {
            document.querySelector('.support-box--2').append(supportButton[0]);
        }
    };

    const cssApply = function (breakpoint) {
        switch (breakpoint) {
            case 'large':
                revealHeaderIndent.call(true);
                revealNavLinks.call(true);
                switchSupportButton.call(true);
                break;

            case 'medium':
                revealHeaderIndent.call(true);
                revealNavLinks.call(true);
                switchSupportButton.call(true);
                break;

            case 'small':
                console.log('medium');
                revealHeaderIndent.call(true);
                revealNavLinks.call(false);
                switchSupportButton.call(false);
                break;

            case 'very small':
                revealHeaderIndent.call(false);
                revealNavLinks.call(false);
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
            document.body.style.overflow = 'hidden';
        }
    };

    const closeModal = function (...array) {
        event.preventDefault();
        const [modal, overlay] = array;

        if (!modal.classList.contains('hidden')) {
            modal.classList.add('hidden');
            overlay.classList.add('hidden');
            if (
                !document
                    .querySelector('.header__nav-links')
                    .classList.contains('header__nav-links--active')
            )
                document.body.style.overflow = '';
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
        element.querySelectorAll('span').forEach(span => {
            span.classList.add('letter--visible');
        });
    };

    // POTENTIAL BOXES
    const renderError = function () {};

    const changeImage = function (img) {
        return new Promise((resolve, reject) => {
            img.src = img.dataset.src;

            img.addEventListener('load', () => {
                resolve(img);
            });

            img.addEventListener('error', () => {
                reject(new Error('Image not found!'));
            });
        });
    };

    const observePotentialBoxes = function ({ potential }) {
        const revealPotentialBox = async function (entries, observer) {
            try {
                const [entry] = entries;

                if (!entry.isIntersecting) return;

                entry.target
                    .querySelectorAll('.potential-box')
                    .forEach(async box => {
                        console.log(box);
                        box.classList.remove('element--hidden');

                        const image = await changeImage(
                            box.querySelector('img')
                        );

                        image.classList.remove('lazy-img');
                    });

                observer.unobserve(entry.target);
            } catch (err) {
                console.error(err);
            }
        };

        const potentialBoxObserver = new IntersectionObserver(
            revealPotentialBox,
            {
                root: null,
                threshold: 0.42,
            }
        );

        potential
            .querySelectorAll('.potential-box')
            .forEach(box => box.classList.add('element--hidden'));

        potentialBoxObserver.observe(potential);
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

        const revealDailyPayouts = async function (entries, observer) {
            try {
                const [entry] = entries;

                if (!entry.isIntersecting) return;

                entry.target.classList.remove('element--hidden');

                if (entry.target.querySelector('img')) {
                    const image = await changeImage(
                        entry.target.querySelector('img')
                    );

                    image.classList.remove('lazy-img');
                    image.style.maxWidth = '100%';
                    image.style.width = 'auto';
                }

                if (entry.target.matches('.daily-payouts__big-text')) {
                    revealLetters(entry.target);
                }

                observer.unobserve(entry.target);
            } catch (err) {
                console.error(err);
            }
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

        let count = 0;

        Array.from(paymentsChildren.at(0).children).forEach((element, i) => {
            element.style.opacity = 0;
            element.style.transform = `translateY(${i * 10}px)`;
            element.style.transition = `all 0.4s ${(count = count + 0.1)}s`;
        });

        const revealPayments = function (entries, observer) {
            const [entry] = entries;

            if (!entry.isIntersecting) return;

            if (entry.target.matches('.payments__container')) {
                Array.from(entry.target.children).forEach(element => {
                    element.classList.add('letter--visible');
                });
            }

            if (entry.target.matches('.payments--header')) {
                revealLetters(entry.target);
            }

            observer.unobserve(entry.target);
        };

        const observePayments = new IntersectionObserver(revealPayments, {
            root: null,
            threshold: 0.6,
        });

        setSpanStyles(paymentsHeaderText);

        observePayments.observe(paymentsHeaderText);

        paymentsChildren.forEach(element => {
            observePayments.observe(element);
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

        const revealSupportElements = async function (entries, observer) {
            try {
                const [entry] = entries;

                if (!entry.isIntersecting) return;

                entry.target.classList.remove('element--hidden');

                if (entry.target.matches('img')) {
                    const image = await changeImage(entry.target);

                    image.classList.remove('lazy-img');
                }

                if (entry.target.matches('.support--header')) {
                    revealLetters(entry.target);
                }

                observer.unobserve(entry.target);
            } catch (err) {
                console.error(err);
            }
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
        potential: document.querySelector('.potential'),
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
