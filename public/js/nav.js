// lnb 스크롤 상단 고정
document.addEventListener("DOMContentLoaded", function () {
    const lnb = document.querySelector(".lnb");
    const triggerOffset = 9 * 10; // 9rem = 90px (root rem 기준)

    // 현재 페이지 경로 확인
    const isMainPage = window.location.pathname.endsWith("/") || window.location.pathname.includes("main");

    // 메인 페이지일 경우 기능 실행 안 함
    if (isMainPage || !lnb) return;

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

// lnb색상 액티브 설정 (active 설정 자동화)
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

/* gnb클릭시 해당 lnb만 보이게 하기 (active 설정 자동화) */

document.addEventListener("DOMContentLoaded", function () {
    const path = window.location.pathname;
    const isMainOrGnbRelated = /(main|business|company|recruit)/.test(path);
    const isMain = /main/.test(path);

    const gnbLinks = document.querySelectorAll(".gnb > li > a");
    const nav = document.querySelector("nav");

    gnbLinks.forEach(gnbLink => {
        const href = gnbLink.getAttribute("href")?.replace(".html", "");

        if (href && path.includes(href)) {
            gnbLink.classList.add("active");

            const nextEl = gnbLink.nextElementSibling;
            if (nextEl && nextEl.classList.contains("lnb")) {
                nextEl.classList.add("is-show");

                const lnbLinks = nextEl.querySelectorAll("a");
                lnbLinks.forEach(lnbLink => {
                    const lnbHref = lnbLink.getAttribute("href")?.replace(".html", "");
                    if (lnbHref && path.includes(lnbHref)) {
                        lnbLink.classList.add("active");
                    }
                });
            }
        }

        if (isMainOrGnbRelated) {
            gnbLink.addEventListener("click", function (e) {
                const nextEl = gnbLink.nextElementSibling;

                if (nextEl && nextEl.classList.contains("lnb")) {
                    e.preventDefault();

                    document.querySelectorAll(".lnb").forEach(lnb => lnb.classList.remove("is-show"));
                    gnbLinks.forEach(link => link.classList.remove("active"));

                    gnbLink.classList.add("active");
                    nextEl.classList.add("is-show");
                }
            });
        }
    });

    //  이 부분은 main 페이지에서만 실행
    if (isMain) {
        nav.addEventListener("mouseleave", function () {
            document.querySelectorAll(".lnb").forEach(lnb => lnb.classList.remove("is-show"));
            gnbLinks.forEach(link => link.classList.remove("active"));
        });
    }
});

// header 서브페이지만 배경 흰색 적용 (디자인 요소)
document.addEventListener("DOMContentLoaded", function () {
    const path = window.location.pathname;
    const header = document.querySelector("header");

    const isMain = path.includes("main");

    // main이 아닐 경우 배경 흰색 클래스 추가
    if (!isMain && header) {
        header.classList.add("has-bg");
    }
});

// main에서만 작동하는 gnb 에니
document.addEventListener("DOMContentLoaded", function () {
    const path = window.location.pathname;

    // main.html 또는 / 경로일 때만 적용
    if (!path.includes("main")) return;

    const nav = document.querySelector("nav");
    let lastScrollY = window.scrollY;

    window.addEventListener("scroll", function () {
        const currentScrollY = window.scrollY;

        if (currentScrollY === 0) {
            nav.classList.remove("is-fixed");
        } else if (currentScrollY < lastScrollY) {
            nav.classList.add("is-fixed");
        } else {
            nav.classList.remove("is-fixed");
        }

        lastScrollY = currentScrollY;
    });
});
