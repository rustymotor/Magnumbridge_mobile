document.addEventListener("DOMContentLoaded", function () {
    const lnb = document.querySelector(".lnb");
    const triggerOffset = 9 * 10; // 9rem = 90px (root rem 기준)

    let ticking = false;

    function onScroll() {
        const scrollY = window.scrollY || window.pageYOffset;

        if (scrollY >= triggerOffset) {
            lnb.classList.add("is-fixed");
        } else {
            lnb.classList.remove("is-fixed");
        }

        ticking = false;
    }

    window.addEventListener("scroll", function () {
        if (!ticking) {
            window.requestAnimationFrame(onScroll);
            ticking = true;
        }
    });
});

// lnb색상 액티브 설정 자동화
document.addEventListener("DOMContentLoaded", function () {
    const path = window.location.pathname;

    document.querySelectorAll(".gnb > li > a").forEach(gnbLink => {
        const href = gnbLink.getAttribute("href")?.replace(".html", "");

        if (href && path.includes(href)) {
            gnbLink.classList.add("active");

            // 바로 다음 형제가 <ul class="lnb">일 경우에만 진행
            const nextEl = gnbLink.nextElementSibling;
            if (nextEl && nextEl.classList.contains("lnb")) {
                const lnbLinks = nextEl.querySelectorAll("a");
                lnbLinks.forEach(lnbLink => {
                    const lnbHref = lnbLink.getAttribute("href")?.replace(".html", "");
                    if (lnbHref && path.includes(lnbHref)) {
                        lnbLink.classList.add("active");
                    }
                });
            }
        }
    });
});

// gnb클릭시 해당 lnb만 보이게 하기
document.addEventListener("DOMContentLoaded", function () {
    const path = window.location.pathname;

    document.querySelectorAll(".gnb > li > a").forEach(gnbLink => {
        const href = gnbLink.getAttribute("href")?.replace(".html", "");

        if (href && path.includes(href)) {
            gnbLink.classList.add("active");

            const nextEl = gnbLink.nextElementSibling;
            if (nextEl && nextEl.classList.contains("lnb")) {
                nextEl.classList.add("is-show"); // ✅ 이 줄 추가!!

                const lnbLinks = nextEl.querySelectorAll("a");
                lnbLinks.forEach(lnbLink => {
                    const lnbHref = lnbLink.getAttribute("href")?.replace(".html", "");
                    if (lnbHref && path.includes(lnbHref)) {
                        lnbLink.classList.add("active");
                    }
                });
            }
        }
    });
});
