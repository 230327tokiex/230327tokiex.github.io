// Confetti effect (simplified version)

// 紙吹雪エフェクト（四角形、色を調整）
let confettiInterval;

function toggleConfetti() {
    if (confettiInterval) {
        clearInterval(confettiInterval);
        confettiInterval = null;
        document.getElementById('confetti-badge').style.backgroundColor = '#FF00FF';
        document.getElementById('confetti-badge').style.color = '#FFFF00';
    } else {
        confettiInterval = setInterval(() => {
            for (let i = 0; i < 5; i++) {
                createConfetti();
            }
        }, 50);
        document.getElementById('confetti-badge').style.backgroundColor = '#FFFF00';
        document.getElementById('confetti-badge').style.color = '#FF00FF';
    }
}

function createConfetti() {
    const confetti = document.createElement('div');
    confetti.style.width = '15px';
    confetti.style.height = '15px';
    confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.position = 'fixed';
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.top = '-15px';
    confetti.style.pointerEvents = 'none';
    document.body.appendChild(confetti);
    
    let angle = Math.random() * 2 * Math.PI;
    let velocity = 2 + Math.random() * 2;
    let x = 0;
    let y = 0;
    let rotation = 0;
    
    function frame() {
        if (y > window.innerHeight) {
            document.body.removeChild(confetti);
        } else {
            y += velocity * Math.sin(angle);
            x += velocity * Math.cos(angle) * 0.5;
            rotation += 5;
            confetti.style.top = y + 'px';
            confetti.style.left = `calc(${confetti.style.left} + ${x}px)`;
            confetti.style.transform = `rotate(${rotation}deg)`;
            requestAnimationFrame(frame);
        }
    }
    requestAnimationFrame(frame);
}

// UFOエフェクト（サイズ大きく、動きをランダムに）
let ufoInterval;

function createUFO() {
    const ufo = document.createElement('div');
    ufo.textContent = '🛸';
    ufo.style.position = 'fixed';
    ufo.style.fontSize = '120px';
    ufo.style.left = '-150px';
    ufo.style.top = Math.random() * (window.innerHeight - 150) + 'px';
    ufo.style.pointerEvents = 'none';
    document.body.appendChild(ufo);

    let position = -150;
    const speed = 8 + Math.random() * 5; // 速度を大幅に上げる
    const waveAmplitude = 10 + Math.random() * 20;
    const waveFrequency = 0.05 + Math.random() * 0.05; // 波の頻度も上げる
    const initialY = parseInt(ufo.style.top);

    function animate() {
        if (position > window.innerWidth) {
            document.body.removeChild(ufo);
        } else {
            position += speed;
            const waveY = Math.sin(position * waveFrequency) * waveAmplitude;
            ufo.style.left = position + 'px';
            ufo.style.top = (initialY + waveY) + 'px';
            requestAnimationFrame(animate);
        }
    }
    requestAnimationFrame(animate);
}

function toggleUFO() {
    if (ufoInterval) {
        clearInterval(ufoInterval);
        ufoInterval = null;
        document.getElementById('ufo-badge').style.backgroundColor = '#00FFFF';
        document.getElementById('ufo-badge').style.color = '#FF00FF';
    } else {
        ufoInterval = setInterval(() => {
            createUFO();
        }, 3000); // UFOの出現頻度も上げる（3秒ごと）
        document.getElementById('ufo-badge').style.backgroundColor = '#FFFF00';
        document.getElementById('ufo-badge').style.color = '#FF00FF';
    }
}

// イベントリスナーの設定
document.getElementById('confetti-badge').addEventListener('click', toggleConfetti);
document.getElementById('ufo-badge').addEventListener('click', toggleUFO);

// おや？HTMLファイルにも隠されたメッセージがあるようですね...
// 両方のファイルをチェックしてくれてありがとう！
// 君はきっと素晴らしいウェブ探検家だ！🕵️‍♂️✨
// 
// さあ、バッジをクリックして楽しもう！
// 紙吹雪とUFOの世界へようこそ！🎉🛸