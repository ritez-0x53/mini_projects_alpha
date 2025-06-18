
const bubbleContainer = document.getElementById("bubble_container");
const timer = document.getElementById("timer");
const target = document.getElementById("target");
const score = document.getElementById("score");

function generateRandomNum() {
    let num = Math.ceil(Math.random() * 10);
    return Number.parseInt(num);
}

function setTimer(i) {
    const inter = setInterval(() => {
        i--;
        if (i <= 0) {
            clearInterval(inter)
            renderGameOver();
        }
        timer.textContent = i;
    }, 1000)
}

function setTarget(val) {
    target.textContent = val;
}

function setScore(val) {
    let sc = Number.parseInt(score.textContent);
    score.textContent = sc + val;
}

function renderGameOver(){
    bubbleContainer.innerHTML = `<div id="g_o_container">
    <h2 class="g_o_heading">GAMEOVER</h2>
    <h3 class="btn" id="total_score">SCORE : ${score.textContent}</h3>
    <h3 class="btn" onclick="restart()"  id="restart_btn">RESTART</h3>
    </div>`
    setTarget(0)
}

function restart() {
    bubbleContainer.innerHTML = ''
    renderBubble()
    setTimer(30)
    setTarget(generateRandomNum())
    setScore(0)
}

setTimer(30)
setTarget(generateRandomNum())
setScore(0)

function renderBubble(numberOfBubbles = 90) {
    for (let i = 1; i <= numberOfBubbles; i++) {
        const bubble = document.createElement("div");
        bubble.className = "bubble";
        bubble.textContent = generateRandomNum();
        bubbleContainer.append(bubble)
    }
}
renderBubble(120)

bubbleContainer.addEventListener("click", (e) => {
    if (e.target.className === "bubble") {

        if (e.target.textContent == target.textContent) {
            setScore(10)
            setTarget(generateRandomNum())
            e.target.textContent = generateRandomNum();
            e.target.textContent = generateRandomNum();
        }

    }
})

