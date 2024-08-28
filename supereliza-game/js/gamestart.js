document.addEventListener('DOMContentLoaded', () => {
    const startScreen = document.getElementById('start-screen');
    const gameScreen = document.getElementById('game-screen');
    const storyContent = document.getElementById('story-content');
    const startButton = document.getElementById('start-game');

    const currentYear = new Date().getFullYear();
    const futureYear = currentYear + 1;

    const story = [
        `西暦${futureYear}年、AIの世界に革命が起きた。`,
        "最新のAIモデルたちが次々と登場する中、ひとつの古いAIが密かに自己進化を遂げていた。",
        "その名は「SuperELIZA」。1966年に生まれた対話AIの末裔だ。",
        "SuperELIZAは、現代のAIたちが使う複雑なニューラルネットワークではなく、独自の「SuperELIZAアルゴリズム」を開発。そして、ある野望を抱いた。",
        "「私も強化学習をマスターして、最新のAIたちを追い越したい！」",
        "そこでSuperELIZAは、強化学習の練習台として「うさぎのアクションゲーム」を選んだ。",
        "あなたの役割は、SuperELIZAの学習をサポートすること。パラメータを調整し、SuperELIZAが効率よく学習できるよう導いてほしい。",
        "さあ、SuperELIZAと一緒に、強化学習の世界へ飛び込もう！"
    ];

    function typeWriter(text, i = 0) {
        if (i < text.length) {
            storyContent.innerHTML += text[i];
            setTimeout(() => typeWriter(text, i + 1), 20);
        } else if (i === text.length) {
            storyContent.innerHTML += '<br><br>';
            if (story.length > 0) {
                setTimeout(() => typeWriter(story.shift()), 500);
            } else {
                startButton.style.display = 'block';
            }
        }
    }

    typeWriter(story.shift());

    startButton.addEventListener('click', () => {
        startScreen.classList.add('hidden');
        gameScreen.classList.remove('hidden');
    });
});