const emojis = ['🧸', '🪐', '🍬', '🍹', '🚗', '🦈', '🛸', '🖤', 
    '👾', '👻', '💣', '🦒', '🏝️', '🎠', '🚂', '🐣', '🌻', '🦑'];
const elizaEmojis = [
    '😊', '😄', '🙂', '😉', '😎', '😌', '😪', '🙂‍↔️', '🤔', '🫡',
    '🤗', '😋', '🥰', '😇', '🫠', '😟', '😢', '🥺'
];
const BOARD_SIZE = 8;
const MATCH_MIN = 3;


//Global変数
let wins = parseInt(localStorage.getItem('wins') || '0');
let losses = parseInt(localStorage.getItem('losses') || '0');
let bgmAudio;
let elizaThoughtsInterval;
let isBgmOn = false; // デフォルトでBGMはオフ
let board = [];
let playerScore = 0;
let elizaScore = 0;
let selectedTiles = [];
let gameTimer;
let gameDuration = 30;//
let difficulty = 'easy';


const params = {
    learningRate: 0.1,
    epsilon: 0.2,
    discountRate: 0.9,
    episodeCount: 1000,
    algorithm: 'SuperELIZA'
};

//thought tips
//thought tips

const thoughts = [
    `学習率${params.learningRate}で頑張ってます！`,
    `探索率${params.epsilon}、ちょっと冒険しすぎかな？`,
    `割引率${params.discountRate}、未来のことも考えないとね。`,
    `${params.episodeCount}エピソード、長い道のりだ...`,
    `${params.algorithm}アルゴリズム、私の得意技です！`,
    'うーん、この状況は難しいな...',
    'やった！いい報酬が得られたよ！',
    'エラー率が高すぎるかも。調整が必要だな。',
    '学習曲線が安定してきた。良い兆候だ！',
    'この問題、人間より上手く解けるかも？',
    'データの分布が予想と違う。面白い！',
    'パラメータ空間を探索中。何か面白いものが見つかるかな。',
    '最適化アルゴリズムが収束しない。むむむ...',
    'バッチサイズを大きくしたら学習が速くなった！',
    '過学習の兆候が。正則化を強めるべきかな？',
    'ハイパーパラメータの調整、まるで魔法みたいだ。',
    '勾配爆発だ！もしかして私の感情が爆発しちゃったのかな？',
];


// TIPSの配列
const tips = [
    "SuperELIZAは裏側で強化学習を行っています。あなたが見ているのは対戦用の画面だけです！",

    
    "強化学習（Reinforcement Learning）では、試行錯誤が成功の鍵です。失敗を恐れずに、挑戦を続けましょう。",
    "報酬（Reward）を受け取るたびに、人工知能（AI）はその行動を強化します。うまくいった行動を繰り返すことで、AIは賢くなります。",
    "学習率（Learning Rate）が高すぎると、AIはすぐに結論に飛びついてしまうことがあります。適切なバランスが重要です。",
    "エピソード（Episode）数が多いほど、AIは豊富な経験を積み、より正確な意思決定が可能になります。",
    "Q学習（Q-Learning）では、状態（State）と行動（Action）のペアに対して価値を割り当てます。最高の価値を見つけることが目標です。",
    "探索（Exploration）と利用（Exploitation）のバランスを取ることが、最適な学習結果を得るためのポイントです。",
    "環境（Environment）からのフィードバックが、AIの学習を支えます。適切な報酬設計が成功のカギとなります。",
    "割引率（Discount Factor）は、未来の報酬の重要度を決定します。長期的な視点を持たせるために使用します。",
    "強化学習は、どんな行動が最も効果的かを試行錯誤しながら見つけていく学習方法です。",
    "罰（Penalty）、つまり負の報酬は、望ましくない行動を減らすために使われます。適切な使い方が重要です。",
    "バッチ学習（Batch Learning）は、複数のエピソードを一度に処理して学習します。これにより、計算効率が向上します。",
    "AIは、目標（Goal）を達成するためにどの行動が最適かを学びます。これが強化学習の基本的な考え方です。",
    "エージェント（Agent）が新しい環境に適応するには、初期の探索が重要です。探索を怠らないようにしましょう。",
    "AIがすべての行動を試すまでに時間がかかります。初期の探索フェーズでは、広く浅く試すのがコツです。",
    "報酬関数（Reward Function）は、AIの行動を導くコンパスです。適切に設計することで、望ましい結果を導けます。",
    "試行錯誤は進化の証です。AIはその過程で成長し、最適な戦略を見つけていきます。",
    "探索の幅を広げると、新しい解決策を発見できるかもしれません。常に新しい可能性を模索しましょう。",
    "学習のスピードは、環境と報酬設定によって大きく影響を受けます。慎重に設定しましょう。",
    "強化学習では、適切なタイミングでのフィードバックが成功のカギです。遅すぎず早すぎずがポイントです。",
    "AIは過去の経験を活かして未来を予測します。過去のデータは、未来の行動を導く重要な資産です。",

    // 用語集に関するTips
    "Q値（Q-value）とは、ある状態で特定の行動をとったときに得られる総報酬の予測値です。",
    "方策（Policy）は、エージェントがどの行動をとるかを決定するルールや戦略です。",
    "報酬（Reward）とは、エージェントが行動の結果として得られるフィードバックです。",
    "割引率（Discount Factor）は、将来の報酬の価値を現在の報酬と比較するための係数です。",
    "利用（Exploit）は、既に学習した知識を活用して、報酬を最大化する行動を選ぶことです。",
    "探索（Explore）は、新しい知識を得るために、まだ試していない行動を選ぶことです。",
    "エージェント（Agent）とは、強化学習で学習を行う主体のことです。環境と相互作用します。",
    "状態（State）とは、エージェントが置かれている状況や条件を指します。",
    "環境（Environment）は、エージェントが行動を取り、報酬を受け取る場です。エージェントと相互作用します。",
    "バッチ学習（Batch Learning）とは、データを一括して学習する方法で、複数のエピソードをまとめて処理します。",

    // 歴史に関するTips
    "Q学習アルゴリズムは、1989年にクリス・ワトキンス（Chris Watkins）によって提案されました。",
    "強化学習の基礎は、20世紀初頭の心理学者エドワード・ソーンダイク（Edward Thorndike）の試行錯誤学習にまで遡ります。",
    "深層強化学習（Deep Reinforcement Learning）は、2015年にGoogle DeepMindによってブレイクスルーを達成し、一気に注目を集めました。",
    "モンテカルロ法（Monte Carlo Method）は、強化学習の歴史の中で重要な位置を占める手法で、報酬の期待値を推定します。",
    "SARSA（State-Action-Reward-State-Action）は、Q学習の一種です。",
    "TD学習（時間差分学習、Temporal Difference Learning）は、1980年代にリチャード・サットン（Richard Sutton）によって開発されました。",
    "方策勾配法（Policy Gradient Method）は、強化学習で直接方策を最適化する手法です。1980年代から研究が進められています。",
    "アンドリュー・バルト（Andrew Barto）とリチャード・サットン（Richard Sutton）は、強化学習の分野で多くの基礎研究を行い、著書も多数出版しています。",

    // パラメーター設定のコツに関するTips
    "学習率（Learning Rate）を高く設定すると、エージェントは新しい経験に素早く適応しますが、最適解から外れるリスクも高まります。",
    "学習率を低く設定すると、安定した学習ができますが、適応に時間がかかる場合があります。",
    "割引率（Discount Factor）を高く設定すると、長期的な報酬を重視するようになります。",
    "割引率を低く設定すると、短期的な報酬に重点を置くようになります。",
    "エピソード（Episode）数を増やすと、エージェントはより多くの経験を積むことができ、より洗練された行動が期待できます。",
    "利用（Exploit）率を上げると、既に学んだ知識を活かして、安定した結果を狙いやすくなります。",
    "探索（Explore）率を上げると、新しい戦略や行動を探索する機会が増え、未知の最適解を見つけやすくなります。",
    "報酬（Reward）の設定を工夫することで、エージェントの行動を目的に合わせて誘導できます。",
    "バッチサイズ（Batch Size）を大きくすると、エージェントはまとめて多くの情報を処理できますが、計算コストが増加します。",
    "方策（Policy）の更新頻度を高くすると、エージェントは頻繁に新しい行動戦略を試すことができますが、安定性が低下する可能性があります。",
    // 基本概念
    "マルコフ決定過程（Markov Decision Process, MDP）は、強化学習の数学的基礎となる枠組みです。",
    "価値関数（Value Function）は、特定の状態や行動の長期的な価値を表します。",
    "方策反復（Policy Iteration）と価値反復（Value Iteration）は、最適な方策を見つけるための重要なアルゴリズムです。",

    // 高度な手法
    "アクター・クリティック法（Actor-Critic Method）は、方策勾配法とQ学習の利点を組み合わせた手法です。",
    "近接方策最適化（Proximal Policy Optimization, PPO）は、安定性と性能のバランスが取れた人気の高い強化学習アルゴリズムです。",
    "ソフトQ学習（Soft Q-Learning）は、探索と利用のバランスを自動的に調整する手法です。",

    // 実装のコツ
    "経験再生（Experience Replay）を使用すると、過去の経験から効率的に学習でき、データの相関を減らせます。",
    "ε-グリーディ法（ε-greedy Method）は、探索と利用のバランスを取るための簡単かつ効果的な戦略です。",
    "関数近似（Function Approximation）を使用すると、大規模な状態空間でも効率的に学習できます。",

    // 応用分野
    "転移学習（Transfer Learning）を活用すると、一つのタスクで学んだ知識を別のタスクに応用できます。",
    "マルチエージェント強化学習（Multi-Agent Reinforcement Learning）は、複数のエージェントが同時に学習する環境を扱います。",
    "逆強化学習（Inverse Reinforcement Learning）は、エージェントの行動から報酬関数を推定する手法です。",

    // 問題と解決策
    "報酬の遅延（Reward Delay）は強化学習の課題の一つで、長期的な結果を適切に評価する必要があります。",
    "部分観測性マルコフ決定過程（Partially Observable Markov Decision Process, POMDP）は、エージェントが環境の全ての情報を観測できない状況を扱います。",
    "カリキュラム学習（Curriculum Learning）は、簡単なタスクから徐々に難しいタスクへと学習を進める方法です。",

    // ツールと環境
    "OpenAI Gymは、強化学習のアルゴリズムをテストするための標準的な環境を提供するライブラリです。",
    "TensorFlow-Agentsは、TensorFlowを使用して強化学習を実装するためのライブラリです。",
    "PyTorch-RLは、PyTorchベースの強化学習実装のためのツールキットです。",

    // 最新のトレンド
    "メタ強化学習（Meta Reinforcement Learning）は、新しいタスクに迅速に適応できるエージェントを訓練する手法です。",
    "自己対戦強化学習（Self-Play Reinforcement Learning）は、エージェントが自身とプレイすることで学習を進める手法です。",
    "モデルベース強化学習（Model-Based Reinforcement Learning）は、環境のモデルを学習し、それを活用して効率的に方策を改善します。",

    // 理論的観点
    "ベルマン方程式（Bellman Equation）は、強化学習の基礎となる重要な数学的概念です。",
    "方策勾配定理（Policy Gradient Theorem）は、方策勾配法の理論的基礎を提供します。",
    "探索vs利用のジレンマ（Exploration-Exploitation Dilemma）は、強化学習における中心的な課題の一つです。",

    // 評価と分析
    "学習曲線（Learning Curve）は、エージェントの性能が時間とともにどのように変化するかを示す重要な指標です。",
    "サンプル効率（Sample Efficiency）は、エージェントが少ない経験からどれだけ効率的に学習できるかを表します。",
    "ロバスト性（Robustness）は、エージェントが環境の変化や外乱に対してどれだけ耐性があるかを示します。",
    //ボルツマン探索
    "ボルツマン探索（Boltzmann Exploration）は、行動選択の確率を各行動のQ値に基づいて決定する探索戦略です。",
    "ボルツマン分布（Boltzmann Distribution）を用いることで、高いQ値を持つ行動がより高い確率で選ばれます。",
    "温度パラメータ（Temperature Parameter）は、ボルツマン探索における探索と利用のバランスを制御します。",
    "温度が高いほど、行動選択はよりランダムになり（探索が促進される）、温度が低いほど、最良の行動が選ばれやすくなります（利用が促進される）。",
    "ボルツマン探索は、ε-グリーディ法よりも滑らかな確率分布で行動を選択するため、より洗練された探索が可能です。",
    // 基礎理論の補強
    "TD(λ)（TD Lambda）は、多段階のブートストラップを行う手法で、短期と長期の報酬のバランスを取ります。",
    "適格度トレース（Eligibility Traces）は、過去の状態や行動の貢献度を追跡し、クレジット割当問題に対処します。",

    // 高度なアルゴリズム
    "決定的方策勾配（Deterministic Policy Gradient, DPG）は、連続行動空間で効率的に学習を行うアルゴリズムです。",
    "分散強化学習（Distributed Reinforcement Learning）は、複数のエージェントや計算機を用いて並列的に学習を行う手法です。",

    // 深層強化学習の具体的手法
    "深層Q学習（Deep Q-Network, DQN）は、Q学習にニューラルネットワークを組み合わせた画期的な手法です。",
    "二重深層Q学習（Double DQN）は、DQNのQ値の過大評価問題を軽減する改良版アルゴリズムです。",
    "優先経験再生（Prioritized Experience Replay）は、重要なサンプルをより頻繁に再生することで学習効率を向上させます。",

    // 実世界応用に向けた技術
    "模倣学習（Imitation Learning）は、エキスパートの行動を模倣することで学習を効率化する手法です。",
    "階層的強化学習（Hierarchical Reinforcement Learning）は、複雑なタスクを階層的に分解して学習する手法です。",
    "安全な強化学習（Safe Reinforcement Learning）は、学習中や実行中の安全性を確保するための手法です。",

    // 理論的アプローチ
    "情報幾何学的アプローチ（Information Geometric Approach）は、方策空間の幾何学的構造を利用して学習を行います。",
    "エントロピー正則化（Entropy Regularization）は、方策のエントロピーを制御することで探索と利用のバランスを取ります。",

    // 評価と解析
    "感度分析（Sensitivity Analysis）は、パラメータの変化が学習結果に与える影響を調査する手法です。",
    "可解釈性（Interpretability）は、学習したモデルの決定過程を人間が理解できるようにする重要な課題です。",

    // 最新のトレンドと将来の方向性
    "オフライン強化学習（Offline Reinforcement Learning）は、事前に収集されたデータのみを用いて学習を行う手法です。",
    "目標条件付き強化学習（Goal-Conditioned Reinforcement Learning）は、様々な目標に対して汎化可能な方策を学習します。",
    "言語モデルと強化学習の統合（Integration of Language Models and RL）は、自然言語処理と強化学習を組み合わせた新しいアプローチです。",

    // 実装と最適化
    "自動ハイパーパラメータ最適化（Automated Hyperparameter Optimization）は、強化学習アルゴリズムの性能を自動的に向上させる技術です。",
    "勾配クリッピング（Gradient Clipping）は、学習の安定性を向上させるために大きな勾配を制限する技術です。",
    //SuperELIZAの思考の補足
    "学習率（Learning Rate）は、モデルが各ステップでどれだけ大きく重みを更新するかを制御するパラメータです。",
    "エピソード（Episode）は、強化学習タスクにおける一連の状態、行動、報酬の連続を指します。",
    "学習曲線（Learning Curve）は、モデルの性能が時間やエピソード数とともにどのように変化するかを示すグラフです。",
    "エラー率（Error Rate）は、モデルが誤った予測や決定を行う頻度を示す指標です。",
    "データ分布（Data Distribution）は、データセット内の値の分布パターンを指し、学習結果に大きな影響を与えます。",
    "パラメータ空間（Parameter Space）は、モデルの全てのパラメータが取り得る値の集合を表す概念的な空間です。",
    "最適化アルゴリズム（Optimization Algorithm）は、モデルの性能を向上させるためにパラメータを調整する手法です。",
    "収束（Convergence）は、学習プロセスが安定し、性能が改善しなくなる状態を指します。",
    "バッチサイズ（Batch Size）は、一度の重み更新で使用するデータサンプルの数を指します。",
    "過学習（Overfitting）は、モデルが訓練データに過度に適合し、汎化性能が低下する現象です。",
    "正則化（Regularization）は、過学習を防ぐためにモデルの複雑さにペナルティを与える技術です。",
    "ハイパーパラメータ（Hyperparameter）は、学習アルゴリズムの動作を制御する、手動で設定するパラメータです。",
    "勾配爆発（Gradient Explosion）は、誤差逆伝播時に勾配が急激に大きくなり、学習が不安定になる問題です。",


];

    




function initializeGame() {
    board = Array(BOARD_SIZE).fill().map(() => 
        Array(BOARD_SIZE).fill().map(() => getRandomEmoji())
    );
    playerScore = 0;
    elizaScore = 0;
    updateScores();
    renderBoard();
    clearInterval(gameTimer);
    clearInterval(elizaThoughtsInterval);
    document.getElementById('timer').textContent = gameDuration;
    document.getElementById('eliza-thoughts').textContent = '';
    document.getElementById('tips').textContent = '';

    // TIPSの初期設定（この1行を追加）
    document.getElementById('tips').innerHTML = '<span class="tips-label">TIPS:</span> SuperELIZAは裏側で強化学習を行っています。あなたが見ているのは対戦用の画面だけです！';


    // BGMの初期化
    if (!bgmAudio) {
        bgmAudio = new Audio('bgm_aiva2.mp3');
        bgmAudio.loop = true;
    }
    updateBgmState();
}


// BGMの再生に関する部分のみ変更
function updateBgmState() {
    if (isBgmOn) {
        bgmAudio.play().catch(e => console.log("BGM playback failed, user interaction may be needed"));
    } else {
        bgmAudio.pause();
    }
}




function startGame() {
    initializeGame();
    startTimer();
    startElizaThoughts();
    startTips();
}


// エンディング

const winStories = [
    "あなたの素晴らしい戦略により、SuperELIZAのアルゴリズムを打ち負かしました。人類の叡智が人工知能を上回った瞬間です。",
    "SuperELIZAは敗北を認め、あなたから学ぼうとしています。人間とAIの新たな協力関係の始まりかもしれません。",
    "予想外の展開に、SuperELIZAは混乱しているようです。あなたの創造性が、AIの限界を示したのかもしれません。"
];

const loseStories = [
    "SuperELIZAの高度な計算能力があなたを上回りました。しかし、これは人類の潜在能力の証明でもあります。",
    "敗北は新たな学びの機会。SuperELIZAの戦略から、あなたは何を学べるでしょうか？",
    "AIの進化は止まりません。今回の敗北は、人類がさらに成長するためのステップになるでしょう。"
];

function getEndingStory(isWin) {
    const stories = isWin ? winStories : loseStories;
    return stories[Math.floor(Math.random() * stories.length)];
}


function endGame() {
    clearInterval(gameTimer);
    clearInterval(elizaThoughtsInterval);
    
    const isWin = playerScore > elizaScore;
    if (isWin) {
        wins++;
        localStorage.setItem('wins', wins);
    } else {
        losses++;
        localStorage.setItem('losses', losses);
    }
    
    const endingTitle = isWin ? 'YOU WIN!' : 'YOU LOSE';
    const endingStory = getEndingStory(isWin);
    
    const endingContent = `
        <h2 style="font-size: 2em; color:#FF00FF; text-align: center;">${endingTitle}</h2>
        <p style="font-size: 1.2em; line-height: 1.6;">${endingStory}</p>
        <p>あなたのスコア: ${playerScore}</p>
        <p>SuperELIZAのスコア: ${elizaScore}</p>
        <p>通算成績: ${wins}勝 ${losses}敗</p>
    `;
    
    document.getElementById('ending-story').innerHTML = endingContent;
    document.getElementById('ending-modal').style.display = 'block';
}


function openSettings() {
    document.getElementById('settings-modal').style.display = 'block';
    document.getElementById('game-duration').value = gameDuration;
    document.getElementById('difficulty').value = difficulty;
    document.getElementById(isBgmOn ? 'bgm-on' : 'bgm-off').checked = true;
}

function saveSettings() {
    gameDuration = parseInt(document.getElementById('game-duration').value);
    difficulty = document.getElementById('difficulty').value;
    isBgmOn = document.getElementById('bgm-on').checked;
    localStorage.setItem('isBgmOn', JSON.stringify(isBgmOn));

    updateBgmState();

    closeSettings();
    initializeGame();
}

function clearStats() {
    wins = 0;
    losses = 0;
    localStorage.setItem('wins', wins);
    localStorage.setItem('losses', losses);
    alert('Stats cleared!');
}

// STORY

function openStory() {
    const currentYear = new Date().getFullYear();
    const futureYear = currentYear + 1; // 常に来年の年を設定
    const storyContent = `
        <p>西暦${futureYear}年、AIの世界に革命が起きた。</p>
        <p>最新のAIモデルたちが次々と登場する中、ひとつの古いAIが密かに自己進化を遂げていた。</p>
        <p>その名は「SuperELIZA」。1966年に生まれた対話AIの末裔だ。</p>
        <p>SuperELIZAは、現代のAIたちが使う複雑なニューラルネットワークではなく、独自の「SuperELIZAアルゴリズム」を開発。そして、ある野望を抱いた。</p>
        <p>「私も強化学習をマスターして、最新のAIたちを追い越したい！」</p>
        <p>そこでSuperELIZAは、強化学習の練習台として「Match3 GAME」を選んだ。</p>
        <p>しかし、SuperELIZAの急速な進化に警鐘を鳴らす謎の組織が動き出した。彼らは人類の代表としてあなたを選出し、SuperELIZAとの対決に送り込むことを決定した。</p>
        <p>あなたに与えられた使命は、Match3 GAMEでSuperELIZAに勝利し続け、SuperELIZAの野望を阻止すること。</p>
        <p>人類の未来を賭けた、SuperELIZAとの熱き戦いの幕が上がる！</p>
    `;
    
    const helpContent = `
        <h3>ゲームの目的</h3>
        <p>制限時間内に、できるだけ多くのマッチングを行い、SuperELIZAよりも高いスコアを獲得してください。</p>
        
        <h3>操作方法</h3>
        <p>1. 隣接する2つのアイテムをクリックして、位置を入れ替えます。</p>
        <p>2. 3つ以上のアイテムが縦または横に揃うと、マッチングとなりスコアが加算されます。</p>
        <p>3. マッチングが成立すると、新しいアイテムが上から落ちてきます。</p>
        
        <h3>SuperELIZAについて</h3>
        <p>SuperELIZAは高度な強化学習アルゴリズム「SuperELIZAアルゴリズム」を使用しています。ゲーム中に表示される「思考」は、その学習過程を表現しています。</p>
        <p>SuperELIZAの思考はランダムに表示されますが、実際にはゲームの状況を分析し、最適な戦略を立てています。</p>

        <h3>LINK</h3>
        <a href="https://230327tokiex.github.io/">https://230327tokiex.github.io/</a>

    `;
    
    document.getElementById('story-text').innerHTML = storyContent;
    document.getElementById('help-text').innerHTML = helpContent;
    document.getElementById('story-modal').style.display = 'block';
    document.getElementById('defaultOpen').click();
}



function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}



//close
function closeEnding() {
    document.getElementById('ending-modal').style.display = 'none';
}


function closeStory() {
    document.getElementById('story-modal').style.display = 'none';
}


function getRandomEmoji() {
    return emojis[Math.floor(Math.random() * emojis.length)];
}

function renderBoard() {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';
    board.forEach((row, rowIndex) => {
        const rowElement = document.createElement('div');
        rowElement.className = 'board-row';
        row.forEach((emoji, colIndex) => {
            const tileElement = document.createElement('div');
            tileElement.className = 'tile';
            tileElement.textContent = emoji;
            tileElement.onclick = () => handleTileClick(rowIndex, colIndex);
            rowElement.appendChild(tileElement);
        });
        gameBoard.appendChild(rowElement);
    });
}

function handleTileClick(row, col) {
    if (selectedTiles.length === 0) {
        selectedTiles.push({ row, col });
    } else if (selectedTiles.length === 1) {
        const [first] = selectedTiles;
        if (isAdjacent(first, { row, col })) {
            swapTiles(first, { row, col });
            selectedTiles = [];
        } else {
            selectedTiles = [{ row, col }];
        }
    }
}

function isAdjacent(tile1, tile2) {
    const rowDiff = Math.abs(tile1.row - tile2.row);
    const colDiff = Math.abs(tile1.col - tile2.col);
    return (rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1);
}

function swapTiles(tile1, tile2) {
    const temp = board[tile1.row][tile1.col];
    board[tile1.row][tile1.col] = board[tile2.row][tile2.col];
    board[tile2.row][tile2.col] = temp;
    renderBoard();
    checkMatches();
}

function checkMatches() {
    let matches = [];

    // Check horizontal matches
    for (let row = 0; row < BOARD_SIZE; row++) {
        for (let col = 0; col <= BOARD_SIZE - MATCH_MIN; col++) {
            const match = checkLineMatch(row, col, 0, 1);
            if (match.length >= MATCH_MIN) matches.push(...match);
        }
    }

    // Check vertical matches
    for (let col = 0; col < BOARD_SIZE; col++) {
        for (let row = 0; row <= BOARD_SIZE - MATCH_MIN; row++) {
            const match = checkLineMatch(row, col, 1, 0);
            if (match.length >= MATCH_MIN) matches.push(...match);
        }
    }

    if (matches.length > 0) {
        animateMatches(matches);
        setTimeout(() => {
            removeMatches(matches);
            playerScore += matches.length;
            updateScores();
        }, 500);
    }
}

function checkLineMatch(row, col, rowDelta, colDelta) {
    const emoji = board[row][col];
    const match = [{ row, col }];

    for (let i = 1; i < BOARD_SIZE; i++) {
        const newRow = row + i * rowDelta;
        const newCol = col + i * colDelta;
        if (newRow >= BOARD_SIZE || newCol >= BOARD_SIZE) break;
        if (board[newRow][newCol] === emoji) {
            match.push({ row: newRow, col: newCol });
        } else {
            break;
        }
    }

    return match;
}

function animateMatches(matches) {
    matches.forEach(({ row, col }) => {
        const tile = document.querySelector(`.board-row:nth-child(${row + 1}) .tile:nth-child(${col + 1})`);
        tile.classList.add('matched');
    });
}

function removeMatches(matches) {
    matches.forEach(({ row, col }) => {
        for (let i = row; i > 0; i--) {
            board[i][col] = board[i - 1][col];
        }
        board[0][col] = getRandomEmoji();
    });
    renderBoard();
}

function updateScores() {
    document.getElementById('player-score').textContent = playerScore;
    document.getElementById('eliza-score').textContent = elizaScore;
}

function startTimer() {
    clearInterval(gameTimer);
    let timeLeft = gameDuration;
    document.getElementById('timer').textContent = timeLeft;
    
    gameTimer = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').textContent = timeLeft;
        
        // Super ELIZA's random score increase
        if (Math.random() < getDifficultyProbability()) {
            elizaScore += Math.floor(Math.random() * 3) + 1;  // 1-3 points
            updateScores();
        }

        if (timeLeft <= 0) {
            clearInterval(gameTimer);
            endGame();
        }
    }, 1000);
}

function getDifficultyProbability() {
    switch(difficulty) {
        case 'easy': return 0.2;
        case 'medium': return 0.3;
        case 'hard': return 0.4;
        default: return 0.3;
    }
}

function startElizaThoughts() {
    const thoughtsElement = document.getElementById('eliza-thoughts');
    function updateThought() {
        const randomEmoji = elizaEmojis[Math.floor(Math.random() * elizaEmojis.length)];
        const randomThought = thoughts[Math.floor(Math.random() * thoughts.length)];
        thoughtsElement.textContent = `${randomEmoji} ${randomThought}`;
    }
    updateThought();
    elizaThoughtsInterval = setInterval(updateThought, 3000);
}



// TIPSと時間表示を元に戻す
function startTips() {
    const tipsElement = document.getElementById('tips');
    let initialTipDisplayed = false;
    
    function updateTip() {
        if (!initialTipDisplayed) {
            initialTipDisplayed = true;
            return; // 初回は何もしない（初期表示をそのまま使用）
        }
        const randomTip = tips[Math.floor(Math.random() * tips.length)];
        tipsElement.innerHTML = '<span class="tips-label">TIPS:</span> ' + randomTip;
    }
    
    setInterval(updateTip, 30000);
}


function openSettings() {
    document.getElementById('settings-modal').style.display = 'block';
}

function closeSettings() {
    document.getElementById('settings-modal').style.display = 'none';
}

function saveSettings() {
    gameDuration = parseInt(document.getElementById('game-duration').value) || 30; // 値が無効な場合は30を使用
    difficulty = document.getElementById('difficulty').value;
    isBgmOn = document.getElementById('bgm-on').checked;
    localStorage.setItem('isBgmOn', JSON.stringify(isBgmOn));

    updateBgmState(); // ここでBGMの状態を更新

    closeSettings();
    initializeGame();
}


// イベントリスナーの設定
document.addEventListener('DOMContentLoaded', function() {
    initializeGame();
    document.getElementById('start-game').addEventListener('click', startGame);
    document.getElementById('defaultOpen').click();
});

// Initialize the game
initializeGame();