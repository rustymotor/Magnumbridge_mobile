document.addEventListener("DOMContentLoaded", function () {
    const options = {
        animationDuration: 1500,
        scrollAnimateY: 100
    };

    const area = document.querySelector(".box-list-area");
    const numbers = area.querySelectorAll(".fs50");
    let animated = false;
    let lastScrollY = window.scrollY || window.pageYOffset;

    // 처음에 모든 숫자들을 0으로 설정
    numbers.forEach(el => {
        const originalText = el.innerText.trim();
        // 숫자와 단위 분리
        const numberMatch = originalText.match(/^([\d,.]+)(.*)$/);
        if (numberMatch) {
            el.innerText = "0"; // 숫자는 0으로 초기화
            el.dataset.originalNumber = numberMatch[1]; // 숫자 부분
            el.dataset.unit = numberMatch[2]; // 단위 부분
        }
    });

    function animateNumbers() {
        numbers.forEach(el => {
            const numberPart = el.dataset.originalNumber;
            const unit = el.dataset.unit;
            const targetNumber = parseFloat(numberPart.replace(/,/g, ""));
            if (isNaN(targetNumber)) return;

            const isInteger = Number.isInteger(targetNumber);
            const startTime = performance.now();

            // 초기값을 0으로 설정
            el.innerText = "0" + unit;

            function updateNumber(now) {
                const elapsed = now - startTime;
                const progress = Math.min(elapsed / options.animationDuration, 1);
                const currentNumber = progress * targetNumber;

                // 정수 또는 소수로 표시
                el.innerText = (isInteger ? Math.floor(currentNumber) : currentNumber.toFixed(1)) + unit;
                if (progress < 1) {
                    requestAnimationFrame(updateNumber);
                } else {
                    el.innerText = numberPart + unit; // 애니메이션 끝나면 최종값으로 설정
                }
            }

            requestAnimationFrame(updateNumber);
        });
    }

    function handleScroll() {
        const currentScrollY = window.scrollY || window.pageYOffset;

        // 스크롤이 특정 지점에 도달하면 애니메이션 시작
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
