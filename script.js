let players = [];
const colors = ["#ff5733", "#33c4ff", "#33ff77", "#ff33a6", "#ffc733", "#b633ff", "#33ffba", "#ff3362"];

function addPlayer() {
    const name = document.getElementById("nameInput").value;
    if (name.trim() !== "") {
        players.push(name);
        document.getElementById("nameInput").value = "";
        alert(`팀원 "${name}" 추가 완료!`);
    }
}

function startRace() {
    if (players.length === 0) {
        alert("팀원을 추가해주세요!");
        return;
    }

    const track = document.getElementById("race-track");
    track.innerHTML = "";
    const finishLine = track.offsetHeight - 60;

    players.forEach((player, index) => {
        const ball = document.createElement("div");
        ball.className = "ball";
        ball.textContent = player;
        ball.style.backgroundColor = colors[index % colors.length];
        ball.style.left = `${index * 60 + 20}px`;
        track.appendChild(ball);

        let position = 0;
        const speed = Math.random() * 3 + 2;
        const interval = setInterval(() => {
            position += speed;
            ball.style.top = `${position}px`;
            if (position >= finishLine) {
                clearInterval(interval);
                announceWinner(player);
            }
        }, 30);
    });
}

function announceWinner(player) {
    const winnerElement = document.getElementById("winner");
    winnerElement.textContent = `🎉 우승자: ${player}! 🎉`;
}
