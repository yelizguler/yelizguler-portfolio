document.addEventListener('DOMContentLoaded', () => {
    const body = document.querySelector('body');

    body.addEventListener('mouseleave', (event) => {
        const mouseY = event.clientY;
        if (!event.toElement && !event.relatedTarget && mouseY < 0) {
            handleExitIntent();
        }
    });

    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY || document.documentElement.scrollTop;
        if (scrollPosition <= 0) {
            handleExitIntent();
        }
    });

    function handleExitIntent() {
        console.log('Exit intent detected!');
        (function (self) {
            'use strict';

            const popupClosedKey = 'popupClosed';
            const buttonClickedKey = 'buttonClicked';

            self.init = function () {
                const popupClicked = localStorage.getItem(popupClosedKey) || localStorage.getItem(buttonClickedKey) || false;

                if (popupClicked) {
                    return;
                } else {
                    self.buildHTML();
                    self.setEvents();
                }
            };

            self.reset = function () {
                $('#custom-popup-container').remove();
            };

            self.buildHTML = function () {
                $('body').append(
                    '<div id="custom-popup-container">' +
                    '<div id="close-button">X</div>' +
                    '<div id="content-1" style="color: #3e547e; font-weight: 600">Don\'t leave! I didn\'t show you everything I can do.</div>' +
                    '<div id="custom-button"><span>Show me the next thing you can do</span></div>' +
                    '</div>'
                );
            };

            self.setEvents = function () {
                const handleClose = function () {
                    self.reset();
                    localStorage.setItem(popupClosedKey, 'true');
                };

                const handleCustomButtonClick = function () {
                    localStorage.setItem(buttonClickedKey, 'true');
                    $('#content-1').text('Thank you for staying! I am working on the next thing. Please come back later :)');
                    $('#custom-button').remove();
                };

                $('#close-button').on('click touchstart', handleClose);
                $('#custom-button').on('click touchstart', handleCustomButtonClick);
            };

            return self.init();
        })(window.jQuery || window.$ || {});
    }
});
