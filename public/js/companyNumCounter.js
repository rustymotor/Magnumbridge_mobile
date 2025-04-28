document.addEventListener("DOMContentLoaded", function () {
    const options = {
        animationDuration: 1500,
        scrollAnimateY: 150
    };

    const area = document.querySelector(".box-list-area");
    const numbers = area.querySelectorAll(".fs50");
    let animated = false;
    let lastScrollY = window.scrollY || window.pageYOffset;

    // 원본 저장
    numbers.forEach(el => {
        el.dataset.originalText = el.innerText.trim();
    });

    function animateNumbers() {
        numbers.forEach(el => {
            const originalText = el.dataset.originalText;
            const isDateFormat = /^\d{1,2}\.\d{1,2}\.\d{1,2}$/.test(originalText);

            if (isDateFormat) {
                const parts = originalText.split(".").map(Number);
                const startTime = performance.now();

                el.innerText = "0.0.0"; // 초기화

                function updateDate(now) {
                    const elapsed = now - startTime;
                    const progress = Math.min(elapsed / options.animationDuration, 1);
                    const currentParts = parts.map(target => Math.floor(progress * target));

                    el.innerText = currentParts.join(".");
                    if (progress < 1) {
                        requestAnimationFrame(updateDate);
                    } else {
                        el.innerText = parts.join(".");
                    }
                }

                requestAnimationFrame(updateDate);
            } else {
                const text = originalText.replace(/[^0-9.]/g, "");
                const unit = originalText.replace(/[0-9.\s]/g, "");

                const targetNumber = parseFloat(text);
                if (isNaN(targetNumber)) return;

                const startTime = performance.now();

                el.innerText = "0" + unit; // 초기화

                function updateNumber(now) {
                    const elapsed = now - startTime;
                    const progress = Math.min(elapsed / options.animationDuration, 1);
                    const currentNumber = Math.floor(progress * targetNumber);
                    el.innerText = currentNumber + unit;
                    if (progress < 1) {
                        requestAnimationFrame(updateNumber);
                    } else {
                        el.innerText = (Number.isInteger(targetNumber) ? targetNumber : targetNumber) + unit;
                    }
                }

                requestAnimationFrame(updateNumber);
            }
        });
    }

    function handleScroll() {
        const currentScrollY = window.scrollY || window.pageYOffset;

        if (!animated && currentScrollY >= options.scrollAnimateY) {
            animateNumbers();
            animated = true;
        }

        lastScrollY = currentScrollY;
    }

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    handleScroll(); // 초기 체크
});
