'use strict'

document.addEventListener( 'DOMContentLoaded', () => {
    const slides    = document.querySelectorAll('.slides'),
          previous  = document.querySelector('.previous'),
          next      = document.querySelector('.next'),
          pausePlay = document.querySelector('.control');


    for (let card of slides) {
        const cardSlides	= card.querySelectorAll('.card-slide');
        let layers 			= card.querySelectorAll('.slide'),
            indexArray 		= [],
            slidesInterval	= null,
            intervalManager	= function (flag, duration) {
                if (flag) {
                    slidesInterval = setInterval( function() {
                        indexArray.unshift(
                            indexArray.pop()
                        );
                        setIndex(indexArray);
                    }, duration)
                } else {
                    clearInterval(slidesInterval);
                }
            };

        intervalManager(true, 3000);

        (() => {
            let start = 0;

            while (layers.length > start) {
                indexArray.push(start++);
            }
        })();

        let setIndex = (arr) => {
            for( let i = 0; i < layers.length; i++ ) {
                layers[i].dataset.slide = arr[i];
            }
        }

        for (let cardSlide of cardSlides) {
            cardSlide.addEventListener('click', () => {
                indexArray.unshift(
                    indexArray.pop()
                );
                setIndex(indexArray);
                intervalManager(false);
            });
        }

        previous.addEventListener('click', () => {
            indexArray.unshift(
                indexArray.pop()
            );
            setIndex(indexArray);
                intervalManager(false);
            });

        next.addEventListener('click', () => {
            indexArray.push(
                indexArray.shift()
            );
            setIndex(indexArray);
            intervalManager(false);
        });

        pausePlay.addEventListener('click', () => {
            if ( pausePlay.classList.contains('pause') ) {
                intervalManager(false);
                pausePlay.classList.remove('pause');
                pausePlay.classList.add('play');
            } else if ( pausePlay.classList.contains('play') ) {
                intervalManager(true, 3000);
                pausePlay.classList.add('pause');
                pausePlay.classList.remove('play');
            }
        });

        setIndex(indexArray);
    };
});
