"use strict";


// Prealoder
function prealoader() {
    if ($('#loader').length) {
        $('#loader').fadeOut(); // will first fade out the loading animation
        $('#loader-wrapper').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website.
        $('body').delay(350).css({ 'overflow': 'visible' });
    };
}

// Banner rev Slider 
function mainBanner() {
    if ($("#banner").length) {
        $("#main_slider").revolution({
            sliderType: "standard",
            sliderLayout: "auto",
            loops: false,
            delay: 7500,
            navigation: {
                keyboardNavigation: "off",
                keyboard_direction: "horizontal",
                mouseScrollNavigation: "off",
                onHoverStop: "on",
                touch: {
                    touchenabled: "on",
                    swipe_threshold: 75,
                    swipe_min_touches: 1,
                    swipe_direction: "horizontal",
                    drag_block_vertical: false
                },
                arrows: {
                    style: "hephaistos",
                    enable: true,
                    hide_onmobile: false,
                    hide_onleave: false,
                    tmp: '<div class="arrow-holder"> </div>',
                    left: {
                        h_align: "left",
                        v_align: "center",
                        h_offset: 28,
                        v_offset: 32
                    },
                    right: {
                        h_align: "right",
                        v_align: "center",
                        h_offset: 43,
                        v_offset: 32
                    }
                },
                bullets: {
                    style: "hephaistos",
                    enable: true,
                    hide_onmobile: false,
                    hide_onleave: false,
                    h_align: "center",
                    v_align: "bottom",
                    space: 10,
                    v_offset: 30
                },
            },
            responsiveLevels: [2220, 1183, 975, 751],
            gridwidth: [1170, 970, 770, 480],
            gridheight: [700, 700, 700, 500],
            lazyType: "none",
            parallax: {
                type: "mouse",
                origo: "slidercenter",
                speed: 2000,
                levels: [2, 3, 4, 5, 6, 7, 12, 16, 10, 50],
            },
            shadow: 0,
            spinner: "off",
            stopLoop: "off",
            stopAfterLoops: -1,
            stopAtSlide: -1,
            shuffle: "off",
            autoHeight: "off",
            hideThumbsOnMobile: "off",
            hideSliderAtLimit: 0,
            hideCaptionAtLimit: 0,
            hideAllCaptionAtLilmit: 0,
            debugMode: false,
            fallbacks: {
                simplifyAll: "off",
                nextSlideOnWindowFocus: "off",
                disableFocusListener: false,
            }
        });
    };
}




function countryInfo() {
    if ($('.area_select').length) {
        $('.area_select').change(function() {
            var val = $(this).val();
            if (val) {
                $('.state:not(#value' + val + ')').slideUp();
                $('#value' + val).slideDown();
            } else {
                $('.state').slideDown();
            }
        });
    }
}



// Select menu 
function selectDropdown() {
    if ($(".selectmenu").length) {
        $(".selectmenu").selectmenu();

        var changeSelectMenu = function(event, item) {
            $(this).trigger('change', item);
        };
        $(".selectmenu").selectmenu({ change: changeSelectMenu });
    };
}


// placeholder remove
function removePlaceholder() {
    if ($("input,textarea").length) {
        $("input,textarea").each(
            function() {
                $(this).data('holder', $(this).attr('placeholder'));
                $(this).on('focusin', function() {
                    $(this).attr('placeholder', '');
                });
                $(this).on('focusout', function() {
                    $(this).attr('placeholder', $(this).data('holder'));
                });

            });
    }
}


// Fancybox 
function FancypopUp() {
    if ($(".fancybox").length) {
        $(".fancybox").fancybox({
            openEffect: 'elastic',
            closeEffect: 'elastic',
            helpers: {
                overlay: {
                    css: {
                        'background': 'rgba(0, 0, 0, 0.6)'
                    }
                }
            }
        });
    };
}




// Partner Logo Footer 
function partnersLogo() {
    if ($('#partner_logo').length) {
        $('#partner_logo').owlCarousel({
            loop: true,
            nav: false,
            margin: 30,
            dots: true,
            autoplay: true,
            autoplayTimeout: 1500,
            autoplaySpeed: 1000,
            lazyLoad: true,
            responsive: {
                0: {
                    items: 1
                },
                400: {
                    items: 2
                },
                550: {
                    items: 3
                },
                1001: {
                    items: 4
                }
            }
        })
    }
}



// Scroll to top
function scrollToTop() {
    if ($('.scroll-top').length) {

        //Check to see if the window is top if not then display button
        $(window).on('scroll', function() {
            if ($(this).scrollTop() > 200) {
                $('.scroll-top').fadeIn();
            } else {
                $('.scroll-top').fadeOut();
            }
        });

        //Click event to scroll to top
        $('.scroll-top').on('click', function() {
            $('html, body').animate({ scrollTop: 0 }, 1500);
            return false;
        });
    }
}

// Close suddess Alret
function closeSuccessAlert() {
    if ($('.closeAlert').length) {
        $(".closeAlert").on('click', function() {
            $(".alert_wrapper").fadeOut();
        });
        $(".closeAlert").on('click', function() {
            $(".alert_wrapper").fadeOut();
        })
    }
}
// DOM ready function
jQuery(document).on('ready', function() {
    (function($) {
        mainBanner();
        selectDropdown();
        partnersLogo();
        scrollToTop();
        closeSuccessAlert();
    })(jQuery);
});



// Window scroll function
jQuery(window).on('scroll', function() {
    (function($) {

    })(jQuery);
});




// Window load function
jQuery(window).on('load', function() {
    (function($) {
        prealoader();
    })(jQuery);
});
