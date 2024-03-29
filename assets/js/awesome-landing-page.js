/*!

 =========================================================
 * Awesome Landing Page - v1.2.2
 =========================================================
 
 * Product Page: https://www.creative-tim.com/product/awesome-landing-page
 * Copyright 2017 Creative Tim (http://www.creative-tim.com)
 * Licensed under MIT (https://github.com/creativetimofficial/awesome-landing-page/blob/master/LICENSE.md)
 
 =========================================================
 
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 */

        var big_image;
        $().ready(function() {
            $('.selector').click(function() {
                SelectColor(this);
            });
            var selectCol = 0;
            if (selectCol == 0) {
                if ($('body').hasClass('landing-page1')) {

                }
            }

        });

        $(window).on('scroll', function() {
            responsive = $(window).width();
            if (responsive >= 768) {
                parallax();
            }
        });

        function SelectColor(btn) {
            oldColor = $('.filter-gradient').attr('data-color');
            newColor = $(btn).attr('data-color');

            oldButton = $('a[id^="Demo"]').attr('data-button');
            newButton = $(btn).attr('data-button');

            $('.filter-gradient').removeClass(oldColor).addClass(newColor).attr('data-color', newColor);

            $('a[id^="Demo"]').removeClass("btn-" + oldButton).addClass("btn-" + newButton).attr('data-button', newButton);

            $('.carousel-indicators').removeClass("carousel-indicators-" + oldColor).addClass("carousel-indicators-" + newColor);

            $('.card').removeClass("card-" + oldColor).addClass("card-" + newColor);

            $('.selector').removeClass('active');
            $(btn).addClass('active');
        }

        $('.switch').each(function() {
            var selector = $(this).parent('li')
            $(this).click(function() {
                if (selector.siblings().hasClass('active')) {
                    selector.addClass('active');
                    selector.siblings().removeClass('active');
                    var slide = $(this).attr('data-slide')
                    var lastClass = $('body').attr('class').split(' ').pop();
                    $('body').removeClass(lastClass);
                    $('body').addClass('landing-page' + slide);
                }
            });
        });

        var parallax = debounce(function() {
            no_of_elements = 0;
            $('.parallax').each(function() {
                var $elem = $(this);

                if (isElementInViewport($elem)) {
                    var parent_top = $elem.offset().top;
                    var window_bottom = $(window).scrollTop();
                    var $image = $elem.find('.parallax-background-image')
                    var $oVal = ((window_bottom - parent_top) / 3);
                    $image.css('margin-top', $oVal + 'px');
                }
            });
        }, 6)

        function debounce(func, wait, immediate) {
            var timeout;
            return function() {
                var context = this,
                    args = arguments;
                clearTimeout(timeout);
                timeout = setTimeout(function() {
                    timeout = null;
                    if (!immediate) func.apply(context, args);
                }, wait);
                if (immediate && !timeout) func.apply(context, args);
            };
        };


        function isElementInViewport(elem) {
            var $elem = $(elem);

            // Get the scroll position of the page.
            var scrollElem = ((navigator.userAgent.toLowerCase().indexOf('webkit') != -1) ? 'body' : 'html');
            var viewportTop = $(scrollElem).scrollTop();
            var viewportBottom = viewportTop + $(window).height();

            // Get the position of the element on the page.
            var elemTop = Math.round($elem.offset().top);
            var elemBottom = elemTop + $elem.height();

            return ((elemTop < viewportBottom) && (elemBottom > viewportTop));
        }

        
        // const cards = document.querySelectorAll(".card");
        // // const onDocumentMouseMoveHandler = (evt) => {
        // //   evt.preventDefault();

        // //   requestAnimationFrame(() => {
        // //     if (!evt.target.closest('.card')) {
        // //       card.style.transform = 'perspective(1000px) scale(1) rotateX(0) rotateY(0)';
        // //     }
        // //   });
        // // };
        // // document.addEventListener('mousemove', onDocumentMouseMoveHandler)
        // cards.forEach((card) => {
        // const height = card.clientHeight;
        // const width = card.clientWidth;

        // // const mouseMoveHandler = (evt) => {
        // //     evt.preventDefault();

        // //     requestAnimationFrame(() => {
        // //     const xRotation = -7 * ((evt.layerY - height / 2) / height);
        // //     const yRotation = 5 * ((evt.layerX - width / 2) / width);

        // //     card.style.transform = `perspective(1000px) scale(1.00) rotateX(${xRotation}deg) rotateY(${yRotation}deg)`;
        // //     });
        // // };


        // // card.addEventListener("mouseenter", (evt) => {
        // //     evt.preventDefault();
        // //     card.addEventListener("mousemove", mouseMoveHandler);
        // // });

        // // card.addEventListener("mouseout", (evt) => {
        // //     evt.preventDefault();
        // //     card.style.transform = "perspective(1000px) scale(1) rotateX(0) rotateY(0)";
        // //     card.removeEventListener("mousemove", mouseMoveHandler);
        // // });
        
        // // card.addEventListener("click", (evt) => {
        // //     evt.preventDefault();
        // //     card.style.animation = "spin 2s ease-in-out";
        // //     setTimeout(() => {      
        // //     card.style.animation = '';
        // //     }, 1000);
        // // });
        //  });

        const menuItems = document.querySelectorAll('.menu div');
        const contentItems = document.querySelectorAll('.content');
        let currentIndex = 0;
        let intervalId;

        function switchMenuItem() {
            menuItems[currentIndex].classList.remove('active');
            contentItems[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % menuItems.length;
            menuItems[currentIndex].classList.add('active');
            contentItems[currentIndex].classList.add('active');
        }
        
        intervalId = setInterval(switchMenuItem, 3000);

        menuItems.forEach((menuItem, index) => {
            menuItem.addEventListener('click', () => {
                clearInterval(intervalId); // Очищаем интервал при клике на пункт меню
                currentIndex = index; // Устанавливаем текущий индекс в соответствии с кликнутым пунктом меню
                menuItems.forEach(item => item.classList.remove('active'));
                contentItems.forEach(item => item.classList.remove('active'));
                menuItem.classList.add('active');
                contentItems[index].classList.add('active');
            });
        });

        const card = document.querySelector('.card');

        card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const xPercent = x / rect.width;
          const yPercent = y / rect.height;
          card.style.setProperty('--tx', `${xPercent * 2 - 1}`);
          card.style.setProperty('--ty', `${yPercent * 2 - 1}`);
        });
        
        card.addEventListener('mouseleave', () => {
          card.style.setProperty('--tx', '0');
          card.style.setProperty('--ty', '0');
        });

        function openTelegramWebAppWithText(text) {
            var telegramUrl = 'https://web.telegram.org/#/im';
            var encodedText = encodeURIComponent(text);
            var encodedUrl = encodeURIComponent(telegramUrl);
            var finalUrl = `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`;
            window.open(finalUrl, '_blank');
        }

        function openEmailClientOrForm() {
            // Создаем предварительно заполненные данные для письма
            var subject = 'Тема вашего письма';
            var body = 'Текст вашего сообщения';
            
            // Формируем ссылку с предварительно заполненными данными
            var mailtoLink = 'mailto:?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
            
            // Проверяем, находится ли пользователь на мобильном устройстве
            var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
            
            if (isMobile) {
                // Открываем почтовый клиент на мобильных устройствах
                window.location.href = mailtoLink;
            } else {
                // Открываем веб-версию Gmail с предварительно заполненными данными в новой вкладке
                window.open('https://mail.google.com/?view=cm&fs=1&to=&su=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body), '_blank');
            }
        }