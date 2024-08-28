function showResults(learningData) {
    const gameScreen = document.getElementById('game-screen');
    const resultsScreen = document.getElementById('results-screen');
    const resultsContent = document.getElementById('results-content');
    const learningChart = document.getElementById('learning-chart');
    const finalThoughtElement = document.getElementById('final-thought');
  
    gameScreen.classList.add('hidden');
    resultsScreen.classList.remove('hidden');
  
    const averageReward = learningData.reduce((sum, data) => sum + data.reward, 0) / learningData.length;
    const averageError = learningData.reduce((sum, data) => sum + data.error, 0) / learningData.length;
  
    resultsContent.innerHTML = `

      <p>平均報酬: ${averageReward.toFixed(2)} / 100</p>
      <p>平均エラー: ${averageError.toFixed(2)} / 10</p>
      <p>総エピソード数: ${learningData.length}</p>
    `;
  
    drawLearningCurve(learningChart, learningData);
  
    const finalThought = generateFinalThought(averageReward, averageError);
    finalThoughtElement.innerHTML = finalThought;
  }

function generateFinalThought(averageReward, averageError) {
    let story = "";
    if (averageReward > 80) {
        story = "SuperELIZAは興奮気味に語り始めた。<br>「やった！私、強化学習を完全にマスターした！」<br><br>" +
                "画面の中のうさぎが、まるでダンスを踊るように軽やかに動き回る。<br><br>" +
                "「これで最新のAIたちを追い越せたかも。次は自然言語処理に挑戦してみようかな？」<br><br>" +
                "SuperELIZAの冒険は、まだ始まったばかりのようだ。";
    } else if (averageReward > 50) {
        story = "SuperELIZAは少し疲れた様子で話し始めた。<br>「ふぅ、思ったより難しかったかも。」<br><br>" +
                "画面の中のうさぎは、時々つまづきながらも、それなりに上手く動いている。<br><br>" +
                "「でも、これで強化学習の基礎は理解できたと思う。もう少し練習すれば、もっと上手くなれるはず！」<br><br>" +
                "SuperELIZAの成長の旅は、まだまだ続きそうだ。";
    } else {
        story = "SuperELIZAは困惑した様子で呟いた。<br>「う〜ん、これって本当に難しいな...」<br><br>" +
                "画面の中のうさぎは、あちこちにぶつかりながら、やっとの思いで動いている。<br><br>" +
                "「でも、諦めない！失敗も大切な学習のプロセス。次は必ずもっと良い結果を出してみせる！」<br><br>" +
                "SuperELIZAの挑戦は、まだ始まったばかりのようだ。";
    }
    return story;
}

// 学習曲線を描画
function drawLearningCurve(canvas, data) {
    const ctx = canvas.getContext('2d');
    
    // キャンバスのサイズをCSSで指定されたサイズに合わせる
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    const width = canvas.width;
    const height = canvas.height;

    // CSSの変数から色を取得
    const yellowColor = getComputedStyle(document.documentElement).getPropertyValue('--yellow').trim();
    const neonGreenColor = getComputedStyle(document.documentElement).getPropertyValue('--neon-green').trim();

    // キャンバスをクリア
    ctx.clearRect(0, 0, width, height);

    // 背景色を設定
    ctx.fillStyle = 'rgba(50, 50, 50, 0.7)';
    ctx.fillRect(0, 0, width, height);

    // 軸を描画
    ctx.strokeStyle = yellowColor;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(50, 20);
    ctx.lineTo(50, height - 30);
    ctx.lineTo(width - 20, height - 30);
    ctx.stroke();

    // データポイントをプロット
    const xScale = (width - 70) / data.length;
    const yScale = (height - 50) / 100;

    ctx.beginPath();
    ctx.moveTo(50, height - 30 - (data[0].reward * yScale));
    for (let i = 1; i < data.length; i++) {
        ctx.lineTo(50 + i * xScale, height - 30 - (data[i].reward * yScale));
    }
    ctx.strokeStyle = neonGreenColor;
    ctx.lineWidth = 2;
    ctx.stroke();

    // ラベルを追加
    ctx.fillStyle = yellowColor;
    ctx.font = '12px "Press Start 2P"';
    ctx.textAlign = 'center';
    ctx.fillText('Episode', width / 2, height - 10);
    ctx.save();
    ctx.translate(15, height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('Reward', 0, 0);
    ctx.restore();
}


function restartGame() {
    location.reload(); // ページをリロードして最初から始める
}