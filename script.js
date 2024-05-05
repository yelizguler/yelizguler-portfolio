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

document.addEventListener("DOMContentLoaded", function (event) {

    window.onload = function () {

        window.requestAnimationFrame(function () {
            const boxes = gsap.utils.toArray("h2");

            boxes.forEach((box, i) => {
                const anim = gsap.fromTo(
                    box,
                    { autoAlpha: 0, y: 50 },
                    { duration: 1, autoAlpha: 1, y: 0 }
                );
                ScrollTrigger.create({
                    trigger: box,
                    animation: anim,
                    toggleActions: "play none none reverse",
                    once: false
                });
            });


            gsap
                .timeline({
                    scrollTrigger: {
                        trigger: ".animate-experience",
                        start: "bottom bottom",
                        end: "center center",
                        scrub: false,
                        toggleActions: "play none none reverse",
                        ease: "power2"
                    }
                })
                .fromTo(
                    ".carousel.experience",
                    { xPercent: 100 },
                    {
                        xPercent: 0,
                        duration: 2
                    },
                    0
                );

            var els = $(".tabbed label");

            gsap.timeline({
                scrollTrigger: {
                    trigger: ".animate-skills",
                    start: "top 70%",
                    end: "bottom top",
                    toggleActions: "play none none reverse",
                    onEnter: myEnterFunc
                }
            });

            function myEnterFunc() {
                document.querySelector("#firsttab").click();
            }

            /* var parallaxImage = document.getElementById("ParallaxImage");
            var parallaxContent = document.getElementById("ParallaxContent");
            var windowScrolled;

            window.addEventListener("scroll", function windowScroll() {
                windowScrolled = window.pageYOffset || document.documentElement.scrollTop;

                parallaxImage.style.transform =
                    "translate3d(0, " + windowScrolled / 4 + "px, 0)";

                parallaxContent.style.transform =
                    "translate3d(0, " + windowScrolled / 2 + "px, 0)";
            }); */

            class StickyNavigation {
                constructor() {
                    this.currentId = null;
                    this.currentTab = null;
                    this.tabContainerHeight = 70;
                    let self = this;
                    $(".et-hero-tab").click(function () {
                        self.onTabClick(event, $(this));
                    });
                    $(".scroll-down").click(function () {
                        self.onTabClick(event, $(this));
                    });
                    $(window).scroll(() => {
                        this.onScroll();
                    });
                    $(window).resize(() => {
                        this.onResize();
                    });
                }

                onTabClick(event, element) {
                    event.preventDefault();
                    let scrollTop = $(element.attr("href")).offset().top - 69;
                    $("html, body").animate({ scrollTop: scrollTop }, 600);
                }

                onScroll() {
                    this.checkTabContainerPosition();
                    this.findCurrentTabSelector();
                }

                onResize() {
                    if (this.currentId) {
                        this.setSliderCss();
                    }
                }

                checkTabContainerPosition() {
                    let offset = $(".et-hero-tabs").offset().top + $(".et-hero-tabs").height();
                    if ($(window).scrollTop() > offset) {
                        $(".et-hero-tabs-container").addClass("et-hero-tabs-container--top");
                    } else {
                        $(".et-hero-tabs-container").removeClass("et-hero-tabs-container--top");
                    }
                }

                findCurrentTabSelector(element) {
                    let newCurrentId;
                    let newCurrentTab;
                    let self = this;
                    $(".et-hero-tab").each(function () {
                        let id = $(this).attr("href");
                        let offsetTop = $(id).offset().top - self.tabContainerHeight;
                        let offsetBottom =
                            $(id).offset().top + $(id).height() - self.tabContainerHeight;
                        if (
                            $(window).scrollTop() > offsetTop &&
                            $(window).scrollTop() < offsetBottom
                        ) {
                            newCurrentId = id;
                            newCurrentTab = $(this);
                        }
                    });
                    if (this.currentId != newCurrentId || this.currentId === null) {
                        this.currentId = newCurrentId;
                        this.currentTab = newCurrentTab;
                        this.setSliderCss();
                    }
                }

                setSliderCss() {
                    let width = 0;
                    let left = 0;
                    if (this.currentTab) {
                        width = this.currentTab.css("width");
                        left = this.currentTab.offset().left;
                    }
                    $(".et-hero-tab-slider").css("width", width);
                    $(".et-hero-tab-slider").css("left", left);
                }
            }

            new StickyNavigation();
        });

    };
}, { passive: true });

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
