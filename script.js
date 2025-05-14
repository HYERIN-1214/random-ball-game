const names = ['Alice', 'Bob', 'Charlie'];
let positions = Array(names.length).fill(0);
let speeds = Array(names.length).fill(0);
let obstacles = [];
let winner = null;
let isRunning = false;

function generateObstacles() {
    const obs = [];
    for (let i = 0; i < 15; i++) {
        obs.push({
            left: Math.random() * 90 + '%',
            delay: Math.random() * 15,
            size: Math.random() * 40 + 20,
            speed: Math.random() * 3 + 2,
        });
    }
    return obs;
}

function startRace() {
    positions = Array(names.length).fill(0);
    speeds = Array(names.length).fill(2 + Math.random() * 3);
    obstacles = generateObstacles();
    isRunning = true;
    updateRace();
}

function updateRace() {
    if (!isRunning) return;

    positions = positions.map((pos, index) => {
        const speedChange = Math.random() > 0.7 ? (Math.random() * 2 - 1) : 0;
        return Math.min(pos + speeds[index] + speedChange, 100);
    });

    const winnerIndex = positions.findIndex(pos => pos >= 100);
    if (winnerIndex !== -1) {
        isRunning = false;
        winner = names[winnerIndex];
        alert(`🏆 ${winner}가 우승했습니다!`);
        return;
    }

    render();
    requestAnimationFrame(updateRace);
}

function render() {
    const track = document.querySelector('.race-track');
    track.innerHTML = '';

    names.forEach((name, index) => {
        const ball = document.createElement('div');
        ball.className = 'ball';
        ball.style.top = `${positions[index]}%`;
        ball.style.left = `${(index + 1) * (90 / (names.length + 1))}%`;
        ball.textContent = name;
        track.appendChild(ball);
    });

    obstacles.forEach(obstacle => {
        const obs = document.createElement('div');
        obs.className = 'obstacle';
        obs.style.width = `${obstacle.size}px`;
        obs.style.height = `${obstacle.size}px`;
        obs.style.left = obstacle.left;
        obs.style.top = `-${obstacle.size}px`;
        track.appendChild(obs);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById('root');
    root.innerHTML = `
        <h1>🚀 우주 공 레이스</h1>
        <ul>${names.map(name => `<li>${name}</li>`).join('')}</ul>
        <button onclick="startRace()">Start Race</button>
        <div class="race-track"></div>
    `;
});
