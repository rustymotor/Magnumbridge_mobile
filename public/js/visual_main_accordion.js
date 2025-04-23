const buttons = document.querySelectorAll(".accordion_controller button");
const cards = document.querySelectorAll(".card");
const container = document.querySelector(".accordion_contain");
const defaultIndex = 2; // 시작 시 펼칠 카드 index (0~5)

// 전체 카드 초기화
function clearAll() {
    cards.forEach(card => {
        card.classList.remove("is-hovered");
        card.classList.remove("is-expanded");
    });
}

// 특정 카드 열기
function openCard(index) {
    clearAll();
    const card = document.querySelector(`.card[data-index="${index}"]`);
    if (card) {
        card.classList.add("is-expanded");
        card.classList.add("is-hovered");
    }
}

// 초기 상태로 열기
openCard(defaultIndex);

// 버튼 클릭 시 해당 카드 열기
buttons.forEach(button => {
    button.addEventListener("click", () => {
        const index = button.dataset.target;
        openCard(index);
    });
});

// 카드 hover 시 해당 카드만 열고 버튼도 활성화
cards.forEach(card => {
    card.addEventListener("mouseenter", () => {
        const index = card.dataset.index;

        // 카드 열기
        openCard(index);

        // 버튼 상태 동기화
        buttons.forEach(button => {
            if (button.dataset.target === index) {
                button.classList.add("active");
            } else {
                button.classList.remove("active");
            }
        });
    });
});
cards.forEach(card => {
    card.addEventListener("mouseenter", () => {
        card.classList.add("is-hovered");
    });

    card.addEventListener("mouseleave", () => {
        // card.classList.remove("is-hovered");
    });
});
// ✅ 마우스가 카드 전체 영역에서 벗어나면 모두 닫기
// container.addEventListener("mouseleave", () => {
//     clearAll();
// });

buttons.forEach(button => {
    button.addEventListener("click", () => {
        buttons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
    });
});
