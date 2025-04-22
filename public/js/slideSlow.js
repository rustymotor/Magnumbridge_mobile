document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".slider").forEach(slider => {
        const track = slider.querySelector(".slider-track");
        const slides = track.querySelectorAll(".slide");

        console.log("찾은 슬라이드:", slides.length); // 👉 몇 개 나오는지 체크!

        slides.forEach(slide => {
            const clone = slide.cloneNode(true);
            track.appendChild(clone);
        });
    });
});
