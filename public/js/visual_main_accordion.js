const buttons = document.querySelectorAll(".accordion_controller button");
const cards = document.querySelectorAll(".card");
const container = document.querySelector(".accordion_contain");
const defaultIndex = 2; // 시작 시 펼칠 카드 index (0~5)

// 전체 카드 초기화
function clearAll() {
    cards.forEach(card => card.classList.remove("is-hovered"));
}

// 특정 카드 열기
function openCard(index) {
    clearAll();
    const card = document.querySelector(`.card[data-index="${index}"]`);
    if (card) {
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

// 카드 hover 시 해당 카드만 열기
cards.forEach(card => {
    card.addEventListener("mouseenter", () => {
        const index = card.dataset.index;
        openCard(index);
    });
});

// ✅ 마우스가 카드 전체 영역에서 벗어나면 모두 닫기
container.addEventListener("mouseleave", () => {
    clearAll();
});
