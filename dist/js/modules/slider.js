function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
    const sliderPrev = document.querySelector(prevArrow),
    slider = document.querySelector(container),
    sliderNext = document.querySelector(nextArrow),
    slides = document.querySelectorAll(slide),
    totalSlides = document.getElementById(totalCounter),
    currentSlides = document.getElementById(currentCounter),
    slidesWrapper = document.querySelector(wrapper),
    slidesField = document.querySelector(field),
    width = window.getComputedStyle(slidesWrapper).width;
    let    slideIndex= 1;
    let offset = 0;
    
 if(slides.length>=10) {
     totalSlides.innerHTML = `${slides.length}`;
     currentSlides.innerHTML = `${slideIndex}`;
 } else {
     totalSlides.innerHTML = `0${slides.length}`;
     currentSlides.innerHTML = `0${slideIndex}`;
 } 

 slidesField.style.width = 100 * slides.length + '%';
 slidesField.style.display = 'flex';
 slidesField.style.transition = '0.5s all';

 slidesWrapper.style.overflow = 'hidden';

 slides.forEach(slide => {
     slide.style.width = width;
 });

 slider.style.position = 'relative';

 const indicators = document.createElement('ol'),
       dots = [];
 indicators.classList.add('carousel-indicators');
 indicators.style.cssText = `
     position: absolute;
     right: 0;
     bottom: 0;
     left: 0;
     z-index: 15;
     display: flex;
     justify-content: center;
     margin-right: 15%;
     margin-left: 15%;
     list-style: none;
 `;
 slider.append(indicators);

 for (let i=0; i < slides.length; i++) {
     const dot = document.createElement('li');
           
     dot.setAttribute('data-slide-to', i+1);
     dot.style.cssText = `
             box-sizing: content-box;
             flex: 0 1 auto;
             width: 30px;
             height: 6px;
             margin-right: 3px;
             margin-left: 3px;
             cursor: pointer;
             background-color: #fff;
             background-clip: padding-box;
             border-top: 10px solid transparent;
             border-bottom: 10px solid transparent;
             opacity: .5;
             transition: opacity .6s ease;
     `;
     if(i == 0) {
         dot.style.opacity = 1;
     }

     indicators.append(dot);
     dots.push(dot);
 }
 function deleteNoDigits(str) {
     return +str.replace(/\D/g, '');
 }

 sliderNext.addEventListener('click', () =>{
     if(offset == deleteNoDigits(width) * (slides.length -1)) {
         offset = 0;
     } else {
         offset += deleteNoDigits(width);
     }

     slidesField.style.transform = `translateX(-${offset}px)`;

     if (slideIndex == slides.length) {
         slideIndex = 1;
     } else {
         slideIndex++;
     }

     if (slides.length < 10) {
         currentSlides.innerHTML = `0${slideIndex}`;
     } else {
         currentSlides.innerHTML = `${slideIndex}`;
     }

     dots.forEach(dot => dot.style.opacity = '0.5');
     dots[slideIndex-1].style.opacity = 1;
 });

 sliderPrev.addEventListener('click', () =>{
     if(offset == 0) {
         offset = deleteNoDigits(width) * (slides.length -1);
     } else {
         offset -= deleteNoDigits(width);
     }

     slidesField.style.transform = `translateX(-${offset}px)`;

     if (slideIndex == 1) {
         slideIndex = slides.length;
     } else {
         slideIndex--;
     }

     if (slides.length < 10) {
         currentSlides.innerHTML = `0${slideIndex}`;
     } else {
         currentSlides.innerHTML = `${slideIndex}`;
     }
 
     dots.forEach(dot => dot.style.opacity = '0.5');
     dots[slideIndex-1].style.opacity = 1;
 });

 dots.forEach(dot => {
     dot.addEventListener('click', (e) =>{
         const slideTo = e.target.getAttribute('data-slide-to');

         slideIndex = slideTo;
         offset = deleteNoDigits(width) * (slideTo -1);

         slidesField.style.transform = `translateX(-${offset}px)`;

         if (slides.length < 10) {
             currentSlides.innerHTML = `0${slideIndex}`;
         } else {
             currentSlides.innerHTML = `${slideIndex}`;
         }

         dots.forEach(dot => dot.style.opacity = '0.5');
         dots[slideIndex-1].style.opacity = 1;


     });
 });

/* showSildes(slideIndex);

function showSildes(n){
 if(n>slides.length) {
     slideIndex=1;
 } if(n < 1) {
     slideIndex = slides.length;
 }
 slides.forEach((item) => item.style.display = 'none');
 slides[slideIndex -1].style.display = 'block';

 if(slides.length>=10) {
     currentSlides.innerHTML = `${slideIndex}`;
 } else {
     currentSlides.innerHTML = `0${slideIndex}`;
 }

}

function plusSlides (n) {
 showSildes(slideIndex += n);
}

sliderNext.addEventListener('click', function(event) {
 plusSlides(1);
});
sliderPrev.addEventListener('click', function(event) {
 plusSlides(-1);
});

 if(slides.length>=10) {
     totalSlides.innerHTML = `${slides.length}`;
 } else {
     totalSlides.innerHTML = `0${slides.length}`;
 } */

}
export default slider;