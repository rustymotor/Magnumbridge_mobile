// 스와이퍼 라이브러리 안씀
document.querySelectorAll(".slider").forEach(slider => {
    const track = slider.querySelector(".slider-track");
    const slides = track.querySelectorAll(".slide");

    // 복제된 슬라이드들을 붙여줌
    slides.forEach(slide => {
        const clone = slide.cloneNode(true);
        track.appendChild(clone);
    });
});
