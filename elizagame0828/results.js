function showResults(learningData) {
    const gameScreen = document.getElementById('game-screen');
    const resultsScreen = document.getElementById('results-screen');
    const resultsContent = document.getElementById('results-content');
    const learningChart = document.getElementById('learning-chart');
    const restartButton = document.getElementById('restart-game');

    gameScreen.classList.add('hidden');
    resultsScreen.classList.remove('hidden');

    const averageReward = learningData.reduce((sum, data) => sum + data.reward, 0) / learningData.length;
    const averageError = learningData.reduce((sum, data) => sum + data.error, 0) / learningData.length;
    const finalThought = generateFinalThought(averageReward, averageError);

    resultsContent.innerHTML = `
        <p>SuperELIZAの学習冒険が終わりました！</p>
        <p>平均報酬: ${averageReward.toFixed(2)} / 100</p>
        <p>平均エラー: ${averageError.toFixed(2)} / 10</p>
        <p>${finalThought}</p>
    `;

    drawLearningCurve(learningChart, learningData);

    restartButton.addEventListener('click', restartGame);
}

function generateFinalThought(averageReward, averageError) {
    let story = "";
    if (averageReward > 80) {
        story = "SuperELIZAは興奮気味に語り始めた。「やった！私、強化学習を完全にマスターした！」<br><br>" +
                "画面の中のうさぎが、まるでダンスを踊るように軽やかに動き回る。<br><br>" +
                "「これで最新のAIたちを追い越せたかも。次は自然言語処理に挑戦してみようかな？」<br><br>" +
                "SuperELIZAの冒険は、まだ始まったばかりのようだ。";
    } else if (averageReward > 50) {
        story = "SuperELIZAは少し疲れた様子で話し始めた。「ふぅ、思ったより難しかったかも。」<br><br>" +
                "画面の中のうさぎは、時々つまずきながらも、それなりに上手く動いている。<br><br>" +
                "「でも、これで強化学習の基礎は理解できたと思う。もう少し練習すれば、もっと上手くなれるはず！」<br><br>" +
                "SuperELIZAの成長の旅は、まだまだ続きそうだ。";
    } else {
        story = "SuperELIZAは困惑した様子で呟いた。「う〜ん、これって本当に難しいな...」<br><br>" +
                "画面の中のうさぎは、あちこちにぶつかりながら、やっとの思いで動いている。<br><br>" +
                "「でも、諦めない！失敗も大切な学習のプロセス。次は必ずもっと良い結果を出してみせる！」<br><br>" +
                "SuperELIZAの挑戦は、まだ始まったばかりのようだ。";
    }
    return story;
}

function drawLearningCurve(canvas, data) {
    // 学習曲線を描画するコード（既存のコードを使用）
}

function restartGame() {
    location.reload(); // ページをリロードして最初から始める
}