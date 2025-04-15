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
    const header = document.querySelector("header");
    const sitemapPaths = document.querySelectorAll(".btn_sitemap svg path");
    let lastScrollY = window.scrollY;

    window.addEventListener("scroll", function () {
        const currentScrollY = window.scrollY;

        if (currentScrollY === 0) {
            nav.classList.remove("is-fixed");
            header.classList.remove("is-fixed");

            // 원래 fill 색 (예: white로 되돌림)
            sitemapPaths.forEach(path => {
                path.setAttribute("fill", "white");
            });
        } else if (currentScrollY < lastScrollY) {
            nav.classList.add("is-fixed");
            header.classList.add("is-fixed");

            // 스크롤 올릴 때 fill: black
            sitemapPaths.forEach(path => {
                path.setAttribute("fill", "black");
            });
        } else {
            nav.classList.remove("is-fixed");
            header.classList.remove("is-fixed");

            // 스크롤 내릴 땐 다시 white로
            sitemapPaths.forEach(path => {
                path.setAttribute("fill", "white");
            });
        }

        lastScrollY = currentScrollY;
    });
});

// 햄버거버튼 (사이트맵) 디자인 요소
document.addEventListener("DOMContentLoaded", () => {
    const isMain = document.body.classList.contains("is-main");
    const paths = document.querySelectorAll(".btn_sitemap svg path");

    paths.forEach(path => {
        path.setAttribute("fill", isMain ? "white" : "black");
    });
});

// 사이트맵 여닫기
document.addEventListener("DOMContentLoaded", function () {
    const btnOpen = document.querySelector(".btn_sitemap");
    const btnClose = document.querySelector(".btn_sitemap_close");
    const sitemap = document.querySelector(".contain_sitemap");

    btnOpen?.addEventListener("click", () => {
        sitemap.classList.add("is-active");
    });

    btnClose?.addEventListener("click", () => {
        sitemap.classList.remove("is-active");
    });
});

// 푸터 active 자동화
document.addEventListener("DOMContentLoaded", function () {
    const path = window.location.pathname.replace(".html", "");

    // .footer_menu 안의 모든 a 태그를 순회
    document.querySelectorAll(".footer_menu a").forEach(footerLink => {
        const href = footerLink.getAttribute("href")?.replace(".html", "");

        if (href && path.includes(href)) {
            footerLink.classList.add("active");
        }
    });
});
