const reasons = [
    {
        text: "My Chini Kam Paani 😭❤️ — literally one of my favourite people.",
        emoji: "💗",
        gif: "gif1.gif"
    },

    {
        text: "Your “nanananan” — I don't know why, but it will always be cute. 😭",
        emoji: "🎀",
        gif: "gif2.gif"
    },

    {
        text: "Your “haan haan” — somehow even those two words are adorable coming from you.",
        emoji: "🥹",
        gif: "gif1.gif"
    },

    {
        text: "The way you copy me and then pretend you didn't. 😂❤️",
        emoji: "🫶🏻",
        gif: "gif2.gif"
    },

    {
        text: "Every stupid little fight — because somehow even those became a part of what makes you special.",
        emoji: "🌷",
        gif: "gif1.gif"
    },

    {
        text: "Your random conversations — the ones that somehow make ordinary moments feel special.",
        emoji: "✨",
        gif: "gif2.gif"
    },

    {
        text: "The way you understand me, support me and make things feel a little easier.",
        emoji: "🤍",
        gif: "gif1.gif"
    },

    {
        text: "And honestly... simply because you're YOU. ❤️",
        emoji: "🌙",
        gif: "gif2.gif"
    }
];


let currentReasonIndex = 0;
let isTransitioning = false;

const reasonsContainer = document.getElementById("reasons-container");
const shuffleButton = document.querySelector(".shuffle-button");
const reasonCounter = document.querySelector(".reason-counter");


function createReasonCard(reason) {

    const card = document.createElement("div");
    card.className = "reason-card";

    const text = document.createElement("div");
    text.className = "reason-text";

    text.innerHTML = `${reason.emoji} ${reason.text}`;

    const gifOverlay = document.createElement("div");
    gifOverlay.className = "gif-overlay";

    gifOverlay.innerHTML = `
        <img src="${reason.gif}" alt="Cute memory">
    `;

    card.appendChild(text);
    card.appendChild(gifOverlay);

    gsap.from(card, {
        opacity: 0,
        y: 50,
        duration: 0.6,
        ease: "back.out"
    });

    return card;
}


function displayNewReason() {

    if (isTransitioning) return;

    isTransitioning = true;

    if (currentReasonIndex < reasons.length) {

        const card = createReasonCard(
            reasons[currentReasonIndex]
        );

        reasonsContainer.appendChild(card);

        reasonCounter.textContent =
            `Little thing ${currentReasonIndex + 1} of ${reasons.length}`;

        currentReasonIndex++;

        if (currentReasonIndex === reasons.length) {

            gsap.to(shuffleButton, {
                scale: 1.1,
                duration: 0.5,
                ease: "elastic.out",

                onComplete: () => {

                    shuffleButton.textContent =
                        "A Little Glimpse of You →";

                    shuffleButton.classList.add("story-mode");

                    shuffleButton.onclick = () => {

                        gsap.to("body", {
                            opacity: 0,
                            duration: 1,

                            onComplete: () => {
                                window.location.href = "last.html";
                            }
                        });

                    };

                }
            });

        }

        createFloatingElement();

        setTimeout(() => {
            isTransitioning = false;
        }, 500);

    }

}


shuffleButton.addEventListener("click", () => {

    gsap.to(shuffleButton, {
        scale: 0.9,
        duration: 0.1,
        yoyo: true,
        repeat: 1
    });

    displayNewReason();

});


function createFloatingElement() {

    const elements = [
        "🌸",
        "✨",
        "💖",
        "🦋",
        "⭐",
        "🎀"
    ];

    const element = document.createElement("div");

    element.className = "floating";

    element.textContent =
        elements[Math.floor(Math.random() * elements.length)];

    element.style.left =
        Math.random() * window.innerWidth + "px";

    element.style.top =
        Math.random() * window.innerHeight + "px";

    element.style.fontSize =
        (Math.random() * 20 + 10) + "px";

    document.body.appendChild(element);

    gsap.to(element, {
        y: -500,
        duration: Math.random() * 10 + 10,
        opacity: 0,

        onComplete: () => {
            element.remove();
        }
    });

}


const cursor = document.querySelector(".custom-cursor");

document.addEventListener("mousemove", (e) => {

    if (!cursor) return;

    gsap.to(cursor, {
        x: e.clientX - 15,
        y: e.clientY - 15,
        duration: 0.2
    });

});


setInterval(createFloatingElement, 2000);