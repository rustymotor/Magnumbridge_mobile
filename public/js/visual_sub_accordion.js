const cards = document.querySelectorAll(".card");
const container = document.querySelector(".accordion-area");

cards.forEach(card => {
    card.addEventListener("mouseenter", () => {
        cards.forEach(c => {
            c.classList.remove("is-hovered", "is-inactive");
            if (c !== card) c.classList.add("is-inactive");
        });
        card.classList.add("is-hovered");
    });
});

container.addEventListener("mouseleave", () => {
    cards.forEach(c => {
        c.classList.remove("is-hovered", "is-inactive");
    });
});
