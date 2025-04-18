const sliders = [".swiper_sub_1", ".swiper_sub_2", ".swiper_sub_3"];

sliders.forEach(selector => {
    new Swiper(selector, {
        slidesPerView: "auto",
        spaceBetween: 0,
        loop: true,
        speed: 10000, // 느릿느릿
        allowTouchMove: false,

        autoplay: {
            delay: 0,
            disableOnInteraction: false
        }
    });
});
