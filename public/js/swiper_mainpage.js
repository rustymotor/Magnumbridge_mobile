const mainSwiper = new Swiper(".swiper_main_1", {
    slidesPerView: 1,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false
    },
    loop: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
    }
});
const mainSwiper2 = new Swiper(".swiper_main_2", {
    slidesPerView: 3,
    grid: {
        rows: 2
    },
    spaceBetween: 20,
    loop: false, // loop가 있으면 정확한 index 제어가 어려워짐
    pagination: {
        el: ".swiper-pagination",
        clickable: true
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
    }
});

// 버튼 클릭 시 원하는 index로 슬라이드 이동 (3개씩 보이므로 3의 배수)
document.querySelectorAll(".visual_swiper_tabs button").forEach(button => {
    button.addEventListener("click", () => {
        const groupIndex = parseInt(button.dataset.index, 10);
        const targetIndex = groupIndex * 3; // 3개씩 슬라이드니까
        mainSwiper2.slideTo(targetIndex, 500); // 0.5초 애니메이션
    });
});

const tabButtons = document.querySelectorAll(".visual_swiper_tabs button");

tabButtons.forEach((button, i) => {
    button.addEventListener("click", () => {
        tabButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        const index = parseInt(button.dataset.index, 10);
        const targetIndex = index * 3;
        mainSwiper2.slideTo(targetIndex, 500);
    });
});
// swiper가 슬라이드될 때 탭 버튼과 동기화
mainSwiper2.on("slideChange", () => {
    const currentIndex = mainSwiper2.realIndex; // 실제 인덱스
    const tabIndex = Math.floor(currentIndex / 3); // 3개 단위로 묶음

    tabButtons.forEach(btn => btn.classList.remove("active"));
    if (tabButtons[tabIndex]) {
        tabButtons[tabIndex].classList.add("active");
    }
});
