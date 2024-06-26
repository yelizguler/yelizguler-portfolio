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
        (function (self) {
            'use strict';

            const popupClosedKey = 'popupClosed';
            const buttonClickedKey = 'buttonClicked';

            self.init = function () {
                const popupClicked = localStorage.getItem(popupClosedKey) || localStorage.getItem(buttonClickedKey) || false;

                if (popupClicked) {
                    return;
                } else if ($('#overlay').length === 0){
                    self.buildHTML();
                    self.setEvents();
                }
            };

            self.reset = function () {
                $('#overlay').remove();
            };

            self.buildHTML = function () {
                $('body').append(
                    '<div id="overlay">' +
                    '   <div id="custom-popup-container">' +
                    '       <div id="close-button">X</div>' +
                    '       <div id="content-1" style="color: #3e547e; font-weight: 600">Don\'t leave! I didn\'t show you everything I can do.</div>' +
                    '       <div id="custom-button"><span>Show me the next thing you can do</span></div>' +
                    '   </div>' +
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
                    $('#content-1').css('width', '250px')
                    $('#custom-button').remove();
                };

                $('#close-button').on('click touchstart', handleClose);
                $('#custom-button').on('click touchstart', handleCustomButtonClick);
            };

            return self.init();
        })(window.jQuery || window.$ || {});
    }

});

document.addEventListener('DOMContentLoaded', function() {
    const announcementBar = document.createElement('div');
    announcementBar.id = 'announcementBar';
    
    const announcementText = document.createElement('span');
    announcementText.textContent = 'YOU CAN USE THIS PART TO SHOW YOUR PROMOTIONS!';
    announcementBar.appendChild(announcementText);
    
    const closeButton = document.createElement('div');
    closeButton.id = 'closeButton';
    closeButton.textContent = 'X';
    
    $(closeButton).on('click touchstart', function() {
        announcementBar.style.display = 'none';
    });
    
    announcementBar.appendChild(closeButton);
    
    document.body.appendChild(announcementBar);
});
