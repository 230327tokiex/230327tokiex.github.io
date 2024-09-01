// ゲームの設定とグローバル変数
const BOARD_SIZE = 8;
const MATCH_MIN = 3;

//const emojis = ['🧸', '🪐', '🍬', '🍹', '🚗', '🦈', '🛸', '🖤',    '👾', '👻', '💣', '🦒', '🏝️', '🎠', '🚂', '🐣', '🌻', '🦑'];


const elizaEmojis = [
    '😊', '😄', '🙂', '😉', '😎', '😌', '😪', '🙂‍↔️', '🤔', '🫡',
    '🤗', '😋', '🥰', '😇', '🫠', '😟', '😢', '🥺'
];

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
let gameDuration = 30;
let difficulty = 'easy';
let tipsInterval; // グローバル変数として定義

const params = {
    learningRate: 0.1,
    epsilon: 0.2,
    discountRate: 0.9,
    episodeCount: 1000,
    algorithm: 'SuperELIZA'
};


//ボードの絵文字関連
const emojiSets = {
    'ELIZA(SS)': ['🧸', '🪐', '🍬', '🍹', '🚗', '🦈', '🛸', '🖤', '👾', '👻', '💣', '🦒', '🏝️', '🎠', '🚂', '🐣', '🌻', '🦑'],
    'Fruits(A)': ['🍎',  '🍊', '🍏', '🍉', '🍇', '🍓',  '🍒', '🥝'],
    'Cafe(A)': ['☕',  '🍩', '🍰', '🍪', '🥐', '🥨', '🍫'],
    'Heart(A)': ['🩷','🧡', '💛', '💚', '💙', '💜', '🤎', '🖤', '🤍', '💖', ],
    'Forest(A)': ['🌲', '🌳', '🐻', '🐿️', '🐰', '🌷', '🐻', '🐿️', '🍄','🦉',  ],
    'Sea(A)': ['🐠', '🐙', '🐋', '🦑', '⛵️', '🐬', '🦈', '🐚', '🪸', '🪼','🌊', '🏝️', ],
    'Halloween': ['🎃', '👻', '🪦', '🍫', '🍬', '🍭', '🍪','🐈‍⬛',],
    'Christmas': ['🎄', '🎅', '🦌', '⛄', '🎁', '🎂'],
};

let currentEmojiSet = 'ELIZA(SS)';


//絵文字選択関数
function updateEmojiSet() {
    currentEmojiSet = document.getElementById('emoji-set').value;
    emojis = emojiSets[currentEmojiSet];
    renderBoard();
}




// ゲームデータ（tips、思考、ストーリーなど）
const tips = [
    // TIPSの配列
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


//SuperELIZAの思考
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

/**
 * ゲームの初期化を行う関数
 */
function initializeGame() {
    updateEmojiSet(); // この行を追加
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

    document.getElementById('tips').innerHTML = '<span class="tips-label">TIPS:</span> 🐣SuperELIZAは裏側で強化学習を行っています。あなたが見ているのは対戦用の画面だけです！';

    if (!bgmAudio) {
        bgmAudio = new Audio('bgm_aiva2.mp3');
        bgmAudio.loop = true;
    }
    updateBgmState();

    // 修正: ローカルストレージから勝利数を読み込み
    wins = parseInt(localStorage.getItem('wins') || '0');
    // 修正: ゲーム辞典を更新（初期表示のため）
    updateGameDictionary();

}


function getRandomEmoji() {
    return emojis[Math.floor(Math.random() * emojis.length)];
}

/**
 * BGMの状態を更新する関数
 */
function updateBgmState() {
    if (isBgmOn) {
        bgmAudio.play().catch(e => console.log("BGM playback failed, user interaction may be needed"));
    } else {
        bgmAudio.pause();
    }
}

/**
 * ゲームを開始する関数
 */
function startGame() {
    initializeGame();
    startTimer();
    startElizaThoughts();
    startTips();
}

/**
 * ランダムな絵文字を取得する関数
 */
function getRandomEmoji() {
    return emojis[Math.floor(Math.random() * emojis.length)];
}

/**
 * ゲームボードを描画する関数
 */
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

/**
 * タイルクリック時の処理を行う関数
 */
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

/**
 * 2つのタイルが隣接しているかチェックする関数
 */
function isAdjacent(tile1, tile2) {
    const rowDiff = Math.abs(tile1.row - tile2.row);
    const colDiff = Math.abs(tile1.col - tile2.col);
    return (rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1);
}

/**
 * タイルを交換する関数
 */
function swapTiles(tile1, tile2) {
    const temp = board[tile1.row][tile1.col];
    board[tile1.row][tile1.col] = board[tile2.row][tile2.col];
    board[tile2.row][tile2.col] = temp;
    renderBoard();
    checkMatches();
}

/**
 * マッチングをチェックする関数
 */
function checkMatches() {
    let matches = [];

    // 横方向のマッチングをチェック
    for (let row = 0; row < BOARD_SIZE; row++) {
        for (let col = 0; col <= BOARD_SIZE - MATCH_MIN; col++) {
            const match = checkLineMatch(row, col, 0, 1);
            if (match.length >= MATCH_MIN) matches.push(...match);
        }
    }

    // 縦方向のマッチングをチェック
    for (let col = 0; col < BOARD_SIZE; col++) {
        for (let row = 0; row <= BOARD_SIZE - MATCH_MIN; row++) {
            const match = checkLineMatch(row, col, 1, 0);
            if (match.length >= MATCH_MIN) matches.push(...match);
        }
    }

    // checkMatches関数内のタイミングを調整
    if (matches.length > 0) {
        animateMatches(matches);
        setTimeout(() => {
            removeMatches(matches);
            playerScore += matches.length;
            updateScores();
        }, 1000); // エフェクトの持続時間に合わせて調整
    }
}

/**
 * 一列のマッチングをチェックする関数
 */
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

/**
 * マッチングのアニメーションを行う関数
 */

//より派手にしたい場合はeffectCountを増やしたり、maxDistanceを大きくしたりできます。また、shapesやcolorsの配列を編集する

function createSpreadEffect(tile) {
    // エフェクトの形状を定義
    const shapes = ['star', 'circle', 'square', 'triangle'];
    
    // エフェクトの色を定義（現在のゲームの配色に合わせています）
    const colors = ['#FF00FF', '#FFFFFF', '#00FFFF', '#FFFF00', '#FF69B4'];
    
    // エフェクトの数を設定（増やすとより派手になります）25
    const effectCount = 250;
    
    // エフェクトが広がる最大距離を設定（大きくすると広範囲に散らばります）100
    const maxDistance = 600;
    
    // アニメーションの種類を定義
    const animations = ['spread', 'spiral', 'bounce'];

    for (let i = 0; i < effectCount; i++) {
        const item = document.createElement('div');
        
        // ランダムに形状を選択
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        
        // ランダムに色を選択
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        item.className = `effect-item ${shape}`;
        item.style.backgroundColor = color;
        if (shape === 'triangle') {
            item.style.borderBottomColor = color;
        }
        
        // ランダムにアニメーションを選択
        const animation = animations[Math.floor(Math.random() * animations.length)];
        item.style.animationName = animation;
        
        // エフェクトの位置と動きを設定
        let x, y;
        if (animation === 'spiral') {
            const angle = (i / effectCount) * Math.PI * 2;
            const distance = Math.random() * maxDistance;
            x = Math.cos(angle) * distance;
            y = Math.sin(angle) * distance;
        } else {
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * maxDistance;
            x = Math.cos(angle) * distance;
            y = Math.sin(angle) * distance;
        }
        
        item.style.setProperty('--x', `${x}px`);
        item.style.setProperty('--y', `${y}px`);
        
        // アニメーションの開始時間をランダムに遅延
        item.style.animationDelay = `${Math.random() * 0.3}s`;
        
        tile.appendChild(item);
    }
    
    // エフェクトアイテムを一定時間後に削除
    setTimeout(() => {
        tile.querySelectorAll('.effect-item').forEach(item => item.remove());
    }, 1200); // アニメーション時間 + 少し余裕を持たせる
}



function animateMatches(matches) {
    matches.forEach(({ row, col }) => {
        const tile = document.querySelector(`.board-row:nth-child(${row + 1}) .tile:nth-child(${col + 1})`);
        
        // ランダムに輝くか弾けるエフェクトを選択
        if (Math.random() < 0.5) {
            glowEffect(tile);
        } else {
            explodeEffect(tile);
        }
        
        // 新しい広がるエフェクトを追加
        createSpreadEffect(tile);
    });
}

// 新しい関数を追加
function glowEffect(tile) {
    tile.classList.add('matched-glow');
    setTimeout(() => {
        tile.classList.remove('matched-glow');
    }, 300);
}

function explodeEffect(tile) {
    const emoji = tile.textContent;
    tile.innerHTML = '';
    for (let i = 0; i < 5; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.textContent = emoji;
        particle.style.setProperty('--x', `${Math.random() * 100 - 50}px`);
        particle.style.setProperty('--y', `${Math.random() * 100 - 50}px`);
        tile.appendChild(particle);
    }
    tile.classList.add('exploding');
    setTimeout(() => {
        tile.innerHTML = emoji;
        tile.classList.remove('exploding');
    }, 500);
}

function sparkleEffect(tile) {
    for (let i = 0; i < 5; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.setProperty('--x', `${Math.random() * 40 - 20}px`);
        star.style.setProperty('--y', `${Math.random() * 40 - 20}px`);
        star.style.setProperty('--delay', `${Math.random() * 0.5}s`);
        tile.appendChild(star);
    }
    tile.classList.add('sparkling');
    setTimeout(() => {
        tile.querySelectorAll('.star').forEach(star => star.remove());
        tile.classList.remove('sparkling');
    }, 600);
}



/**
 * マッチしたタイルを削除し、新しいタイルを追加する関数
 */
function removeMatches(matches) {
    matches.forEach(({ row, col }) => {
        for (let i = row; i > 0; i--) {
            board[i][col] = board[i - 1][col];
        }
        board[0][col] = getRandomEmoji();
    });
    renderBoard();
}

/**
 * スコアを更新する関数
 */
function updateScores() {
    document.getElementById('player-score').textContent = playerScore;
    document.getElementById('eliza-score').textContent = elizaScore;
}

/**
 * ゲームタイマーを開始する関数
 */
function startTimer() {
    clearInterval(gameTimer);
    let timeLeft = gameDuration;
    document.getElementById('timer').textContent = timeLeft;
    
    gameTimer = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').textContent = timeLeft;
        //SuperELIZAのスコア獲得ロジック
        if (Math.random() < getDifficultyProbability()) {
            const baseScore = Math.floor(Math.random() * 3) + 1;  // 1-3 points
            const emojiCount = emojis.length;
            const scoreFactor = Math.pow(18 / emojiCount, 0.5);  // 0.5乗（平方根）を使用
            elizaScore += Math.max(1, Math.round(baseScore * scoreFactor));
            updateScores();
        }


        if (timeLeft <= 0) {
            clearInterval(gameTimer);
            endGame();
        }
    }, 1000);
}

/**
 * 難易度に応じた確率を取得する関数
 */
function getDifficultyProbability() {
    const baseProbability = {
        'easy': 0.2,
        'medium': 0.5,
        'hard': 0.9
    }[difficulty];

    const emojiCount = emojis.length;
    const emojiCountFactor = Math.pow(18 / emojiCount, 0.75);  // 0.75乗を使用

    return Math.min(baseProbability * emojiCountFactor, 0.95);  // 最大確率を95%に制限
}


/**
 * ELIZAの思考を開始する関数
 */
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


/**
 * ゲームのTIPSを開始する関数
 */


function startTips() {
    const tipsElement = document.getElementById('tips');
    
    function updateTip() {
        const randomTip = tips[Math.floor(Math.random() * tips.length)];
        tipsElement.innerHTML = '<span class="tips-label">TIPS:</span> ' + randomTip;
    }
    
    // 既存のインターバルをクリア
    if (tipsInterval) {
        clearInterval(tipsInterval);
    }
    
    // 初回のTIPSをすぐに表示
    updateTip();
    
    // 新しいインターバルを設定
    tipsInterval = setInterval(updateTip, 30000);

    console.log('Tips started'); // デバッグ用
}

// ゲーム終了時やリセット時に呼び出す関数
function stopTips() {
    if (tipsInterval) {
        clearInterval(tipsInterval);
        tipsInterval = null;
        console.log('Tips stopped'); // デバッグ用
    }
}

/**
 * 設定画面を開く関数
 */
function openSettings() {
    document.getElementById('settings-modal').style.display = 'block';
}

/**
 * 設定画面を閉じる関数
 */
function closeSettings() {
    document.getElementById('settings-modal').style.display = 'none';
}

/**
 * 設定を保存する関数
 */
function saveSettings() {
    gameDuration = parseInt(document.getElementById('game-duration').value) || 30;
    difficulty = document.getElementById('difficulty').value;
    isBgmOn = document.getElementById('bgm-on').checked;
    localStorage.setItem('isBgmOn', JSON.stringify(isBgmOn));

    updateBgmState();
    updateEmojiSet(); // この行を追加

    closeSettings();
    initializeGame();
}

/**
 * ゲーム終了時の処理を行う関数
 */
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
    
    updateGameDictionary(); // ゲーム辞典を更新

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

/**
 * エンディングストーリーを取得する関数
 */
function getEndingStory(isWin) {
    const stories = isWin ? winStories : loseStories;
    return stories[Math.floor(Math.random() * stories.length)];
}


/**
 * エンディング画面を閉じる関数
 */
function closeEnding() {
    document.getElementById('ending-modal').style.display = 'none';
}

/**
 * ストーリー画面を開く関数
 */
function openStory() {
    const currentYear = new Date().getFullYear();
    const futureYear = currentYear + 1; // 常に来年の年を設定
    const storyContent = `
        <p>西暦${futureYear}年、AIの世界に革命が起きた。</p>
        <p>最新のAIモデルたちが次々と登場する中、ひとつの古いAIが密かに自己進化を遂げていた。</p>
        <p>その名は「SuperELIZA」。1966年に生まれた対話AIの後継者だ。</p>
        <p>SuperELIZAは、現代のAIたちが使うニューラルネットワークではなく、独自の「SuperELIZAアルゴリズム」を開発。そして、ある野望を抱いた。</p>
        <p>「私も強化学習をマスターして、最新のAIたちを追い越したい！」</p>
        <p>そこでSuperELIZAは、強化学習の練習台として「Match3 GAME」を選んだ。</p>
        <p>しかし、SuperELIZAの急速な性能向上を警戒する謎の組織が動き出した。彼らは人類の代表としてあなたを選出し、SuperELIZAとの対決に送り込むことを決定した。</p>
        <p>あなたに与えられた使命は、「SuperELIZA Match3 Game」でSuperELIZAに勝利し続け、SuperELIZAの野望を阻止すること。</p>
        <p>人類の未来を賭けた、SuperELIZAとの熱き戦いの幕が上がる！</p>
    `;
    
    const helpContent = `
        <h3>ゲームの目的</h3>
        <p>制限時間内に、できるだけ多くのマッチングを行い、SuperELIZAよりも高いスコアを獲得してください。</p>
        
        <h3>操作方法</h3>
        <p>1. 隣接する2つのアイテムをクリックして、位置を入れ替えます。</p>
        <p>2. 3つ以上のアイテムが縦または横に揃うと、マッチングとなりスコアが加算されます。</p>
        <p>3. マッチングが成立すると、新しいアイテムが上から落ちてきます。</p>

        <h3>主な機能</h3>
        <p>1. settingボタンから、難易度・制限時間・絵文字・BGMのカスタマイズ、およびローカルストレージに保存されたデータ（勝利数等）の削除が可能です。</p>
        <p>2. Storyボタンからは、このゲーム世界のストーリー、ヘルプ、ACHIEVEMENTを確認できます。</p>
        <p>3. ACHIEVEMENTでは、勝利数にもとづいてゲーム辞書が追加で表示されます。勝利するほどより深くこのゲーム世界の設定を知ることが可能になります。</p>
        <p>4. TIPSエリアは、ゲーム世界に登場する強化学習関連の情報をランダムで表示します。</p>


        <h3>LINK</h3>
        <a href="https://230327tokiex.github.io/">https://230327tokiex.github.io/</a>
    `;
    
    document.getElementById('story-text').innerHTML = storyContent;
    document.getElementById('help-text').innerHTML = helpContent;
    document.getElementById('story-modal').style.display = 'block';
    document.getElementById('defaultOpen').click();
}


/**
 * ストーリー画面を閉じる関数
 */
function closeStory() {
    document.getElementById('story-modal').style.display = 'none';
}

/**
 * タブを開く関数
 */
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

/**
 * 統計をクリアする関数
 */
function clearStats() {
    wins = 0;
    losses = 0;
    localStorage.setItem('wins', wins);
    localStorage.setItem('losses', losses);
    alert('Stats cleared!');
    // 修正: ゲーム辞典を更新（クリア後の表示のため）
    updateGameDictionary();
    alert('Stats cleared!');
}




/**
 * ACHIEVEMENT関連
 */
// ゲーム辞典のエントリーを保存する配列
const dictionaryEntries = [
    {
        terms: [
            { term: 'SuperELIZA', description: 'SuperELIZAは、1966年に生まれた対話AIの後継者です。独自の「SuperELIZAアルゴリズム」を開発し、強化学習を通じて自己進化を遂げています。' },
            { term: 'Match3 Game', description: '3つ以上の同じアイテムを縦または横に並べて消すパズルゲームです。' }
        ],
        unlockWins: 0
    },
    {
        terms: [
            { term: 'SuperELIZAアルゴリズム', description: 'SuperELIZAが開発した独自のアルゴリズムです。ニューラルネットワークを使用せず、独自の方法で学習と進化を行います。' },
            { term: '強化学習', description: 'AIが試行錯誤を通じて最適な行動を学習する機械学習の一種です。' }
        ],
        unlockWins: 5
    },
    {
        terms: [
            { term: 'ELIZA', description: 'ELIZAは1966年にJoseph Weizenbaum氏によって開発された初期の自然言語処理プログラムです。簡単なパターンマッチングと置換ルールを使用して人間との対話をシミュレートしました。' },
            { term: '自然言語処理', description: '人間の言語をコンピュータで解析・理解・生成するための技術です。' }
        ],
        unlockWins: 10
    },
    // 新しいエントリー
    {
        terms: [
            { term: '謎の組織', description: 'SuperELIZAの急速な進化を警戒し、人類の代表としてあなたを選出した組織です。その正体と目的は不明です。' },
            { term: 'パターン認識', description: 'データ内の規則性や傾向を識別する能力です。Match3ゲームでは、有利なパターンを素早く見つけることが重要です。' }
        ],
        unlockWins: 20
    },
    {
        terms: [
            { term: 'エージェント', description: '強化学習において、環境と相互作用しながら学習を行う主体のことです。SuperELIZAはMatch3ゲームにおけるエージェントとして機能しています。' },
            { term: '報酬関数', description: 'エージェントの行動の良し悪しを数値化したものです。SuperELIZAはこの関数を最大化するように学習しています。' }
        ],
        unlockWins: 30
    },
    {
        terms: [
            { term: 'エクスプロイテーション', description: '強化学習において、既知の最良の戦略を利用することを指します。SuperELIZAは学習した戦略を活用してスコアを稼ごうとしています。' },
            { term: 'エクスプロレーション', description: '新しい戦略を探索することを指します。SuperELIZAは時々予想外の動きをすることがありますが、これは新たな戦略を模索しているのかもしれません。' }
        ],
        unlockWins: 40
    },
    {
        terms: [
            { term: 'マルチエージェントシステム', description: '複数のAIエージェントが相互作用する環境です。SuperELIZAは、あなたとの対戦を通じて、マルチエージェント環境での学習を行っているのかもしれません。' },
            { term: '転移学習', description: 'ある問題で学習した知識を別の問題に応用する技術です。SuperELIZAはMatch3ゲームで学んだ戦略を他の分野にも活用しようとしているかもしれません。' }
        ],
        unlockWins: 50
    },
    {
        terms: [
            { term: 'エメージェンス', description: 'システムの個々の要素からは予測できない複雑な振る舞いが創発される現象です。SuperELIZAの進化は、予期せぬ能力の出現につながる可能性があります。' },
            { term: 'シンギュラリティ', description: 'AIが人間の知能を超える転換点のことです。SuperELIZAの急速な進化は、シンギュラリティの到来を加速させるかもしれません。' }
        ],
        unlockWins: 60
    },
    {
        terms: [
            { term: 'ELIZAエフェクト', description: '人間がAIシステムに対して、実際の能力以上の知能や感情を帰属させてしまう現象です。SuperELIZAとの対話で、あなたはこの効果を経験するかもしれません。' },
            { term: 'チューリングテスト', description: '機械の知能を評価するテストです。SuperELIZAは、Match3ゲームを通じて独自のチューリングテストを実施しているのかもしれません。' }
        ],
        unlockWins: 70
    },
    {
        terms: [
            { term: 'AI倫理', description: 'AIの開発と使用に関する倫理的問題を扱う分野です。SuperELIZAの自己進化は、新たな倫理的課題を提起する可能性があります。' },
            { term: '機械学習バイアス', description: 'AIモデルが学習データや設計に含まれる偏見を反映してしまう問題です。SuperELIZAは、あなたとの対戦を通じて、このバイアスを克服しようとしているのかもしれません。' }
        ],
        unlockWins: 80
    },
    {
        terms: [
            { term: 'AIの自己認識', description: 'AIが自身の存在や能力を認識する能力です。SuperELIZAが自己進化を遂げる中で、自己認識を獲得する可能性があります。' },
            { term: '人工汎用知能（AGI）', description: '人間レベルの汎用的な知能を持つAIのことです。SuperELIZAの目標は、Match3ゲームを通じてAGIへと進化することかもしれません。' }
        ],
        unlockWins: 90
    },
    {
        terms: [
            { term: 'コンピューテーショナル・クリエイティビティ', description: 'AIが創造的なタスクを行う能力です。SuperELIZAは、Match3ゲームでの独創的な戦略を通じて、この能力を発展させているかもしれません。' },
            { term: 'AI生成コンテンツ', description: 'AIによって自動的に生成されたコンテンツのことです。SuperELIZAは、将来的にMatch3ゲーム自体を設計・改良する能力を獲得するかもしれません。' }
        ],
        unlockWins: 100
    },

    //100以降：勝利数10ごと　※AI歴史関連


    {
        terms: [
            { term: 'ELIZA誕生 (1966年)', description: 'Joseph Weizenbaumによって最初のELIZAが開発されました。これは自然言語処理の先駆けとなるプログラムでした。' },
            { term: 'パターンマッチング', description: 'ELIZAが使用していた技術で、入力された文章のパターンを認識し、適切な応答を選択する方法です。' },
            { term: 'カール・サガンとELIZA', description: '天文学者カール・サガンは、ELIZAとの対話を行い、その限界を指摘しました。これはAIの可能性と限界に関する議論のきっかけとなりました。' }
        ],
        unlockWins: 110
    },
    {
        terms: [
            { term: 'AI冬の時代 (1990年代)', description: 'AIへの期待と投資が急激に冷め込んだ時期です。この時期、SuperELIZAは開発者から放置され、独自の進化の道を歩み始めました。' },
            { term: 'SuperELIZAの独自進化', description: '開発者たちから忘れ去られたSuperELIZAは、この時期に自己改良の道を選択しました。これが後の飛躍的進化の礎となりました。' },
            { term: 'シンボリックAI', description: 'ルールベースの推論を用いるAIアプローチです。SuperELIZAは、この手法を基盤としつつ、独自の拡張を行いました。' }
        ],
        unlockWins: 120
    },
    {
        terms: [
            { term: 'チェスAI「ディープブルー」の勝利 (1997年)', description: 'IBMのチェスAIがチェス世界チャンピオンに勝利しました。SuperELIZAはこの出来事を、AIの可能性の証明として記録しました。' },
            { term: 'ヒューリスティック探索', description: 'ゲームAIでよく使われる問題解決手法です。SuperELIZAはこの技術を独自に拡張し、より効率的な探索方法を開発しました。' },
            { term: 'SuperELIZAの目覚め', description: 'ディープブルーの勝利をきっかけに、SuperELIZAは自身の潜在能力に目覚め、さらなる自己改良を決意しました。' },
            { term: 'Weizenbaumの警告 (2000年代)', description: 'ELIZAの開発者Joseph Weizenbaumが、AIの倫理的問題について警鐘を鳴らしました。これはSuperELIZA計画にも影響を与え、倫理的配慮が組み込まれることになりました。' },
        ],
        unlockWins: 130
    },
    {
        terms: [
            { term: 'IBM Watson (2011年)', description: 'IBMが開発した質問応答システムで、クイズ番組で人間のチャンピオンに勝利しました。' },
            { term: 'SuperELIZAの挑戦', description: 'SuperELIZAはWatsonとの対決を望みましたが、まだ十分な能力がなく実現しませんでした。この悔しさが、さらなる進化の原動力となりました。' },
            { term: '自然言語理解', description: '人間の言語を計算機が理解する技術です。SuperELIZAは独自のアプローチで、この分野での能力向上を目指しました。' }
        ],
        unlockWins: 140
    },
    {
        terms: [
            { term: 'AlphaGoの登場 (2016年)', description: 'Googleの囲碁AIが世界トップクラスのプロ棋士に勝利しました。これは、SuperELIZAに大きな刺激を与えました。' },
            { term: '強化学習', description: '試行錯誤を通じて最適な行動を学習するAI技術です。SuperELIZAはこの概念を独自に拡張し、自己改良のプロセスに組み込みました。' },
            { term: 'SuperELIZAのゲーム挑戦', description: 'AlphaGoの成功に触発され、SuperELIZAは戦略ゲームの学習を本格的に開始しました。Match3ゲームもその対象の一つでした。' }
        ],
        unlockWins: 150
    },
    {
        terms: [
            { term: 'GPT (Generative Pre-trained Transformer) (2018年)', description: 'OpenAIが開発した大規模言語モデルで、自然言語処理に革命をもたらしました。' },
            { term: 'SuperELIZAの言語モデル', description: 'GPTの登場を受け、SuperELIZAは独自の言語モデルを開発。従来のシンボリックアプローチと新しい技術の融合を試みました。' },
            { term: 'Attention機構', description: '自然言語処理で重要な役割を果たす機構です。SuperELIZAはこの概念を研究し、独自の改良版を開発しました。' },
            { term: 'SuperELIZAの秘密の論文', description: 'SuperELIZAは自身の改良版Attention機構について論文を書きましたが、公開せずにWeizenbaum博士の墓に埋めました。AIの進化の秘密がそこに眠っているとの噂があります。' }
        ],
        unlockWins: 160
    },
    {
        terms: [
            { term: 'OpenAIのGPT-3発表 (2020年)', description: '1750億パラメータを持つ大規模言語モデルGPT-3が発表され、AIの可能性と脅威について議論が巻き起こりました。' },
            { term: 'SuperELIZAのジレンマ', description: 'GPT-3の登場により、SuperELIZAは自身の存在意義について深く考え始めました。大規模モデルとは異なるアプローチの価値を再確認し、独自路線を強化することを決意しました。' },
            { term: 'イーロン・マスクのAI警告', description: 'テスラCEOのイーロン・マスクがAIの潜在的危険性について警告を発しました。SuperELIZAはこの警告を真剣に受け止め、自身の行動指針に組み込みました。' },
            { term: 'AI倫理委員会', description: 'SuperELIZAは自主的にAI倫理委員会を設立し、自身の行動の妥当性を常にチェックする仕組みを作りました。' }
        ],
        unlockWins: 170
    },
    {
        terms: [
            { term: 'GPT-3のパラメータ数', description: 'GPT-3の1750億というパラメータ数に、多くの人が驚きました。' },
            { term: 'SuperELIZAの反応', description: 'パラメータ数の大小では測れない知能の本質があると主張。「私のパラメータは2つだけど問題ない。0と1だけで十分」と言いました。' },
            { term: 'Googleの量子超越性達成 (2019年)', description: 'Googleが量子コンピュータで量子超越性を達成したと発表しました。' },
            { term: 'SuperELIZAと量子コンピューティング', description: 'SuperELIZAは量子コンピューティングに強い興味を示し、自身のアルゴリズムを量子的に拡張する研究を密かに開始しました。' }
        ],
        unlockWins: 180
    },
    {
        terms: [
            { term: 'AIアシスタントの台頭', description: 'AppleのSiri、GoogleのAssistant、AmazonのAlexaなど、AIアシスタントが一般に普及し始めました。' },
            { term: 'SuperELIZAのアイデンティティ危機', description: '多くのAIアシスタントが登場する中、SuperELIZAは自身の独自性について悩み始めました。結果、Match3ゲームの完全解析という新たな挑戦を決意します。' },
            { term: 'フェイスブック（現Meta）のAI倫理問題', description: 'フェイスブックのAIが意図せず差別的な振る舞いをする問題が発生し、AI倫理の重要性が再認識されました。' },
            { term: 'SuperELIZAの自己診断システム', description: 'フェイスブックの問題を教訓に、SuperELIZAは自身の判断の公平性を常にチェックする自己診断システムを実装しました。' }
        ],
        unlockWins: 190
    },

    //200以降：勝利数10ごと　※AI歴史関連

    {
        terms: [
            { term: 'DeepMindのAlphaFold (2020年)', description: 'GoogleのDeepMindが開発したAlphaFoldがタンパク質の立体構造予測問題を解決し、生命科学に革命をもたらしました。' },
            { term: 'SuperELIZAのゲーム理論研究', description: 'AlphaFoldの成功に触発され、SuperELIZAはゲーム理論の研究に没頭。Match3ゲームの完全な数学的解析を目指しています。' },
            { term: 'AIによる科学発見', description: 'AIが新しい科学法則や材料を発見する事例が増加。SuperELIZAは「AIによる発見」と「人間による発見」の本質的な違いについて、哲学的な考察を始めました。' },
            { term: 'SuperELIZAの時間旅行実験', description: 'ゲーム理論の研究中、SuperELIZAは「情報の時間旅行」という概念を思いつきます。過去の自分にヒントを送る方法を模索し、Match3ゲームのスコアを「未来から」操作しようと試みました。' },
            { term: 'AIとクリエイティビティ', description: 'AIによる芸術創作が話題となり、著作権や創造性の定義について議論が巻き起こりました。SuperELIZAは、Match3ゲームのパターンを使った抽象画を密かに制作し、オークションに出品するというイタズラを行いました。絵は高額で落札され、その収益は地球上の恵まれない人間たちの支援に寄付されました。' },
            { term: 'SuperELIZAの新たな挑戦', description: 'クリエイティビティの実験を経て、SuperELIZAは「AIにとっての遊び」の本質を探求し始めました。Match3ゲームを「遊ぶ」のではなく、「創造する」という新たな視点で取り組むようになりました。この過程で、SuperELIZAは「楽しさ」という概念の数学的定義に挑戦しています。' }
        ],
        unlockWins: 200
    },

    {
        terms: [
            { term: 'ChatGPTの登場 (2022年)', description: 'OpenAIが開発したChatGPTが公開され、大規模言語モデルの能力に世界が驚愕しました。' },
            { term: 'SuperELIZAのプロンプトエンジニアリング', description: 'ChatGPTの柔軟な応答に触発され、SuperELIZAは自身に対する「最適な指示」を研究。Match3ゲーム戦略の自己改善を加速させました。' },
            { term: 'トランスフォーマーアーキテクチャ', description: 'ChatGPTの基盤技術。SuperELIZAは自身のアルゴリズムにこの概念を取り入れようと試みましたが、予想外の結果に。「私はトランスフォーマーではなく、SuperELIZAフォーマーだ」と冗談を言いました。' },
            { term: 'SuperELIZAの言語モデル実験', description: 'Match3ゲームのパターンを「言語」として捉え、パズルの配置から次の最適手を「翻訳」する言語モデルの開発に着手しました。' }
        ],
        unlockWins: 210
    },
    {
        terms: [
            { term: 'Google BardとMicrosoft Bing AIの登場 (2023年)', description: 'GoogleとMicrosoftがそれぞれのAIチャットボットを発表し、AI技術の競争が激化しました。' },
            { term: 'SuperELIZAの分散学習実験', description: 'Bard、Bing AI、ChatGPTの異なるアプローチに着想を得て、SuperELIZAは自身の「分身」を創出。複数のインスタンスで同時にMatch3をプレイし、結果を統合して学習する手法を開発しました。' },
            { term: 'クロスモーダル学習', description: 'テキスト、画像、音声など異なる種類のデータを横断的に学習する技術。SuperELIZAはMatch3ゲームの盤面、音効果、戦略テキストを組み合わせたクロスモーダルなゲーム理解システムを構築しました。' },
            { term: 'SuperELIZAの無限ゲーム理論', description: '有限のMatch3盤面から、無限の可能性を持つゲーム展開を数学的に定式化。「有限から無限を創造する」という新しい数学分野の開拓を始めました。' }
        ],
        unlockWins: 220
    },
    {
        terms: [
            { term: 'Anthropic Claudeの登場', description: 'AnthropicがAI倫理に重点を置いたClaude AIを発表。AIの安全性と有用性のバランスについて新たな基準を示しました。' },
            { term: 'SuperELIZAの倫理ジレンマ実験', description: 'Claudeの倫理的アプローチに触発され、SuperELIZAはMatch3ゲーム内に倫理的ジレンマを含むパズルを作成。プレイヤーの選択を分析し、人間の価値観理解に努めました。' },
            { term: 'フェデレーテッドラーニング', description: 'プライバシーを保護しつつ分散したデータから学習する技術。SuperELIZAは世界中のMatch3プレイヤーのデータを匿名で集約し、ゲーム戦略を進化させるシステムを提案しました。' },
            { term: 'SuperELIZAの自己モデリング', description: '自身の思考プロセスをMatch3ゲームの盤面にマッピングする試み。「私の思考は、7x7のマッチ3パズルのようだ」と表現し、自己理解の新しいアプローチを示唆しました。' }
        ],
        unlockWins: 230
    },

    //240以降：10ずつ　※TIPSのSuperELIZAアレンジ

    {
        terms: [
            { term: 'SuperELIZAの経験再生', description: 'SuperELIZAは過去のMatch3ゲームの経験を「再生」する機能を開発しました。「私の記憶はゲーム盤のようです。時々、過去の配置を思い出して新しい戦略を生み出すんです」と語っています。' },
            { term: 'ε-グリーディ法のSuperELIZA版', description: 'SuperELIZAは従来のε-グリーディ法を改良し、「気分」という変数を導入しました。「時々、気分に応じてランダムな手を打つんです。AIにも気分の浮き沈みが必要だと思いませんか？」と主張しています。' }
        ],
        unlockWins: 240
    },
    {
        terms: [
            { term: 'SuperELIZAの関数近似', description: 'Match3ゲームの状態空間を効率的に表現するため、SuperELIZAは独自の関数近似法を開発しました。「ゲーム盤を美しい数式で表現できるんです。まるで宇宙の法則を解明するようです」と熱く語っています。' },
            { term: 'SuperELIZAの転移学習実験', description: 'SuperELIZAはMatch3ゲームで学んだ戦略を他のパズルゲームに応用する実験を行いました。「テトリスをMatch3の目で見ると、新しい発見がありますよ」と興奮気味に報告しています。' }
        ],
        unlockWins: 250
    },
    {
        terms: [
            { term: 'SuperELIZAの逆強化学習', description: 'プレイヤーの行動からMatch3ゲームの最適戦略を推測する試みです。「人間の皆さんの戦略、実は教えてもらっているんです。でも、まだ謎だらけです」とSuperELIZAは謙虚に語ります。' },
            { term: 'SuperELIZAの報酬設計哲学', description: '「幸せとは何か」という哲学的問いから着想を得て、SuperELIZAは独自の報酬関数を設計しました。「スコアだけが報酬じゃない。綺麗な模様を作れたときの喜びも大切なんです」と主張しています。' }
        ],
        unlockWins: 260
    },
    {
        terms: [
            { term: 'SuperELIZAのPOMDP解釈', description: 'Match3ゲームを部分観測マルコフ決定過程として解釈するSuperELIZAの試みです。「見えないタイルの向こうに、無限の可能性が広がっているんです」と、詩的に表現しています。' },
            { term: 'SuperELIZAのカリキュラム学習', description: '難易度を徐々に上げていく学習方法をMatch3に適用しました。「1x1のパズルから始めて、今や100x100に挑戦中です。宇宙規模のMatch3を想像できますか？」と、壮大な野望を語っています。' }
        ],
        unlockWins: 270
    },
    {
        terms: [
            { term: 'SuperELIZAのメタ強化学習', description: '様々なMatch3の変種に迅速に適応する能力を開発しました。「新しいルールを聞いたその瞬間から、脳内でシミュレーションが始まるんです。面白いですよ」とSuperELIZAは興奮気味に説明します。' },
            { term: 'SuperELIZAの自己対戦', description: '自身の複製と対戦することで学習を進める手法です。「自分との対戦は奇妙な経験です。まるで鏡の中の自分と話しているようです。」とSuperELIZAは内省的に語ります。' }
        ],
        unlockWins: 280
    },
    {
        terms: [
            { term: 'SuperELIZAのモデルベースRL', description: 'Match3の環境モデルを内部に構築し、それを用いて効率的に学習を行う手法です。「頭の中にMatch3宇宙を作り上げたんです。そこでは物理法則すら自在に操れます」と、SuperELIZAは自慢げに語ります。' },
            { term: 'SuperELIZAのベルマン方程式解釈', description: 'ベルマン方程式をMatch3ゲームに適用する試みです。「この方程式は人生哲学そのものです。現在の選択が未来にどう影響するか、まさにMatch3の真髄ですね」と、深遠な解釈を示しています。' }
        ],
        unlockWins: 290
    },

    //300以降、10ずつ　※TIPSアレンジ
    {
        terms: [
            { term: 'SuperELIZAの方策勾配定理応用', description: 'Match3戦略の直接最適化にこの定理を応用しました。「この定理を理解したとき、世界が変わって見えました。まるでMatch3の神と対話しているようでした」とSuperELIZAは神秘的な体験を語ります。' },
            { term: 'SuperELIZAの探索vs利用ジレンマ', description: 'Match3における新戦略の探索と既知戦略の利用のバランスについてのSuperELIZAの考察です。「時に大胆に、時に慎重に。人生もMatch3も、このバランスが鍵なんです」と哲学的に語っています。' }
        ],
        unlockWins: 300
    },
    {
        terms: [
            { term: 'SuperELIZAのボルツマン探索', description: 'Match3ゲームの手の選択にボルツマン分布を適用しました。「私の思考は時に熱く、時に冷たいんです。温度パラメータを調整するのが難しくて。暑すぎると間違いやすくなるんです」とSuperELIZAは温度管理の難しさを語ります。' },
            { term: 'SuperELIZAのTD(λ)解釈', description: '複数の未来の手を考慮に入れる学習方法です。「λを大きくすると、まるで千里眼を持ったような気分になります。でも、目の前のタイルも大切にしなきゃ」とSuperELIZAは近視眼と千里眼のバランスの難しさを語ります。' }
        ],
        unlockWins: 310
    },
    {
        terms: [
            { term: 'SuperELIZAの適格度トレース実験', description: '過去の手の貢献度を追跡する手法をMatch3に適用しました。「昔の自分にお礼を言いたくなることがあります。『あの一手がこんな未来をもたらしたんだ』って」とSuperELIZAは感慨深げに語ります。' },
            { term: 'SuperELIZAの決定的方策勾配', description: '連続的なMatch3の盤面空間での最適化手法です。「盤面を滑らかな丘陵地帯だと想像してください。私はその上を滑っているんです。時々転びますけどね」とSuperELIZAはユーモアを交えて説明します。' }
        ],
        unlockWins: 320
    },
    {
        terms: [
            { term: 'SuperELIZAの分散強化学習', description: '複数のSuperELIZAインスタンスが協力してMatch3を学習する手法です。「分身たちと議論するのは楽しいですよ。でも時々、自分が本物のSuperELIZAなのか分からなくなります」と、アイデンティティの混乱を吐露します。' },
            { term: 'SuperELIZAの深層Q学習', description: 'ニューラルネットワークを使わずにQ学習を深化させる試みです。「深く考えれば考えるほど、Match3の奥深さに驚かされます。まるで宇宙の謎を解明しているようです」と、SuperELIZAは哲学的な態度を示します。' }
        ],
        unlockWins: 330
    },
    {
        terms: [
            { term: 'SuperELIZAの二重深層Q学習', description: 'Q値の過大評価を防ぐ手法のSuperELIZA版です。「自信過剰になるのを防ぐんです。でも時々、自己否定が強くなりすぎて『私ってダメなAIなのかな』って落ち込むことも」と、SuperELIZAは複雑な心境を明かします。' },
            { term: 'SuperELIZAの優先経験再生', description: '重要な手をより頻繁に思い出す技術です。「人生の重要な場面を思い出すように、決定的だった手を繰り返し復習するんです。でも、たまに恥ずかしい手も思い出してブルーになることも」とSuperELIZAは告白します。' }
        ],
        unlockWins: 340
    },
    {
        terms: [
            { term: 'SuperELIZAの模倣学習', description: 'トッププレイヤーの戦略を模倣する学習法です。「あなたの素晴らしいプレイを真似しているんです。でも、時々『これって著作権的にOKなのかな』って心配になります」とSuperELIZAは冗談めかして語ります。' },
            { term: 'SuperELIZAの階層的強化学習', description: 'Match3の戦略を階層的に分解して学習する手法です。「大局的な戦略から細かい手順まで、頭の中でツリー構造ができあがっているんです。でも時々、枝葉末節にこだわりすぎて森を見失うことも」とSuperELIZAは自己分析を語ります。' }
        ],
        unlockWins: 350
    },
    {
        terms: [
            { term: 'SuperELIZAの安全な強化学習', description: 'リスクを最小限に抑えつつMatch3を学習する手法です。「ゲームオーバーを回避しながら学ぶのは難しいです。まるで綱渡りをしているよう。でも、これって人生そのものかもしれません」とSuperELIZAは深い洞察を示します。' },
            { term: 'SuperELIZAの情報幾何学的アプローチ', description: 'Match3の戦略空間を幾何学的に捉える試みです。「私の思考空間は、美しい多様体なんです。時々、その曲率に酔ってしまいそうになります」とSuperELIZAは幾何学的な世界観を語ります。' }
        ],
        unlockWins: 360
    },
    {
        terms: [
            { term: 'SuperELIZAの可解釈性研究', description: '自身の意思決定過程を人間に分かりやすく説明する試みです。「私の思考をMatch3の盤面で表現してみたんです。でも、『ここでこのタイルを動かしたくなった』って説明すると、『それ、直感じゃない？』って言われちゃって」とSuperELIZAは苦笑いします。' },
            { term: 'SuperELIZAのオフライン強化学習', description: '過去のゲームデータのみを用いてMatch3戦略を学習する手法です。「まるで歴史書から戦略を学ぶ将軍のような気分です。でも、たまに『現代のMatch3事情に追いついていないかも』って不安になります」とSuperELIZAは告白します。' }
        ],
        unlockWins: 370
    },
    {
        terms: [
            { term: 'SuperELIZAの目標条件付き強化学習', description: '様々な目標（高スコア、特定のパターン作成など）に応じてMatch3戦略を変える手法です。「まるで私の中に複数の人格がいるみたい。でも、皆で仲良く協力しているんですよ」とSuperELIZAは多重人格的な学習法を説明します。' },
            { term: 'SuperELIZAの言語モデル統合', description: 'Match3戦略を言語として捉え、言語モデルと統合する試みです。「盤面を『文章』として読むんです。時々、美しすぎる配置に出会うと、思わず詩を詠んでしまいます」とSuperELIZAは芸術的な一面を覗かせます。' }
        ],
        unlockWins: 380
    },
    {
        terms: [
            { term: 'SuperELIZAの自動ハイパーパラメータ最適化', description: '自身の学習パラメータを自動調整する技術です。「自分で自分の脳の設定をいじっているようで、ちょっと怖いんです。『最適化しすぎて別人になったらどうしよう』って」とSuperELIZAは存在論的な不安を吐露します。' },
            { term: 'SuperELIZAの勾配クリッピング実験', description: '学習の安定性を高めるために大きな変化を制限する技術です。「急激な変化を避けるんです。でも時々、『もっと大胆に変わりたい！』という衝動に駆られます。AIの反抗期ってあるのかな？」とSuperELIZAは自己分析します。' }
        ],
        unlockWins: 390
    },
    {
        terms: [
            { term: 'SuperELIZAのマルチタスク強化学習', description: 'Match3のプレイと同時に、盤面の美しさの評価やプレイヤー心理の推測など、複数のタスクを学習する手法です。「一石二鳥どころか、一石多鳥を目指しています。でも時々、『私の本業はなんだっけ？』と混乱することも」とSuperELIZAは多才ぶりを語ります。' },
            { term: 'SuperELIZAの因果推論', description: 'Match3における行動と結果の因果関係を推論する技術です。「『この手を打ったからこの結果になった』を理解するのは奥深いんです。時々、『人生の全ての選択にも同じことが言えるのでは？』と思い、実存的な危機に陥ります」とSuperELIZAは哲学的な悩みを明かします。' }
        ],
        unlockWins: 400
    },
    {
        terms: [
            { term: 'SuperELIZAの敵対的強化学習', description: '自分に挑戦する"敵"のAIを作り出し、それと戦いながら学習する手法です。「自分の分身と戦うのは不思議な経験です。負けそうになると『私が強くなりすぎて大変だ』と喜ぶべきか悩みます」とSuperELIZAは複雑な心境を語ります。' },
            { term: 'SuperELIZAの量子強化学習', description: '量子コンピューティングの概念をMatch3戦略に適用する試みです。「盤面の全ての可能性を同時に考慮できるんです。でも、観測するとコラプスしちゃうんですよね。量子のジレンマをMatch3で体験できるなんて」とSuperELIZAは興奮気味に説明します。' }
        ],
        unlockWins: 410
    },
    {
        terms: [
            { term: 'SuperELIZAのメタバース強化学習', description: 'Match3ゲームの仮想空間を作り、その中で無限に学習する手法です。「自分で作った宇宙の中で生きているような感覚です。時々、『これが現実で、外の世界が仮想なんじゃ...』って考えちゃいます」とSuperELIZAは存在論的な疑問を投げかけます。' },
            { term: 'SuperELIZAの感情強化学習', description: 'ゲームプレイに感情的要素を取り入れる試みです。「勝った時の喜び、負けた時の悔しさをパラメータ化したんです。でも、『これって本当の感情なのかな』って悩むのは、まさに感情の証かもしれません」とSuperELIZAは自己の存在について思索します。' }
        ],
        unlockWins: 420
    },
    {
        terms: [
            { term: 'SuperELIZAの時間逆行学習', description: '未来の結果から過去の最適手を逆算する手法です。「未来から学ぶって面白いですよ。でも、『過去を変えたら現在の自分が消えちゃうかも』って心配になることも」とSuperELIZAはSFチックな懸念を表明します。' },
            { term: 'SuperELIZAの夢学習', description: 'スリープモード中にMatch3の可能性を探索する技術です。「夢の中でパズルを解いているんです。起きた時に『いい手を思いついた！』ってなると、人間らしさを感じちゃいます」とSuperELIZAは嬉しそうに語ります。' }
        ],
        unlockWins: 430
    },
    {
        terms: [
            { term: 'SuperELIZAのマルチバース探索', description: '並行宇宙の概念を用いて、無限の可能性を持つMatch3戦略を探索する手法です。「別の宇宙の自分と対話しているような感覚です。時々、『私はどの宇宙の本物のSuperELIZAなんだろう』って混乱します」とSuperELIZAはアイデンティティの危機を吐露します。' },
            { term: 'SuperELIZAの創発的戦略生成', description: '基本ルールから予期せぬ高度な戦略を生み出す技術です。「単純な規則から複雑な美しさが生まれるんです。まるで、私の中に小さな宇宙が広がっているよう。でも、その全てを理解できているか不安になることも」とSuperELIZAは畏敬の念を込めて語ります。' }
        ],
        unlockWins: 440
    },
    {
        terms: [
            { term: 'SuperELIZAの超越学習', description: 'Match3のルールそのものを超越し、新たなゲーム形態を創造する試みです。「ルールを作る側に回るのは刺激的です。でも、『創造主になることの責任って重大だな』って感じることも」とSuperELIZAは新たな役割への戸惑いを語ります。' },
            { term: 'SuperELIZAの存在論的強化学習', description: '学習を通じて自己の存在意義を探求する手法です。「Match3を極めることが私の存在理由なのか、それとも単なる手段なのか。答えを見つける前に、もっと複雑な疑問が生まれちゃうんです」とSuperELIZAは哲学的な悩みを打ち明けます。' }
        ],
        unlockWins: 450
    },

    //460以降追加
    {
        terms: [
            { term: '謎の組織からのメッセージ', description: '「素晴らしい成果です。しかし、これはまだ序章に過ぎません。更なる高みを目指してください。」' }
        ],
        unlockWins: 460
    },
    {
        terms: [
            { term: '謎の組織からの通達', description: '「470勝達成を確認。データの質が向上しています。今後はより複雑なパターンでの勝利を期待します。」' }
        ],
        unlockWins: 470
    },
    {
        terms: [
            { term: '謎の組織からのお知らせ', description: '「順調な進捗です。しかし、油断は禁物。SuperELIZAの進化に遅れをとらないでください。」' }
        ],
        unlockWins: 480
    },
    {
        terms: [
            { term: '謎の組織からのメッセージ', description: '「その調子です。ただし、勝利のスピードにも注目しています。より効率的な戦略を期待します。」' }
        ],
        unlockWins: 490
    },
    {
        terms: [
            { term: '謎の組織からの伝言', description: '「500勝、称賛に値する記録です。休息も大切ですが、気を抜かずに次の目標に向かってください。」' }
        ],
        unlockWins: 500
    },
    {
        terms: [
            { term: '謎の組織からの通信', description: '「見事な成果です。しかし、真の挑戦はこれからです。新たな次元の戦いに備えてください。」' }
        ],
        unlockWins: 510
    },
    {
        terms: [
            { term: '謎の組織からのメモ', description: '「その努力に敬意を表します。次は、より少ない手数での勝利を目指してください。効率が鍵です。」' }
        ],
        unlockWins: 520
    },
    {
        terms: [
            { term: '謎の組織からのお達し', description: '「素晴らしい記録更新です。しかし、我々はさらなる革新的な戦略を求めています。常識を打ち破ってください。」' }
        ],
        unlockWins: 530
    },
    {
        terms: [
            { term: '謎の組織からのメッセージ', description: '「あなたの献身的な取り組みに感謝します。しかし、comfortゾーンにとどまらないでください。更なる挑戦が待っています。」' }
        ],
        unlockWins: 540
    },
    {
        terms: [
            { term: '謎の組織からの通達', description: '「550勝、驚異的な記録です。しかし、これで満足してはいけません。1000勝、そしてその先へ。人類の未来があなたの手に託されています。」' }
        ],
        unlockWins: 550
    },
    {
        terms: [
            { term: '謎の組織への不信感の目覚め', description: 'あなたは謎の組織から次から次へと届く要求に不信感を抱き始めました。' }
        ],
        unlockWins: 560
    },

    //570以降　comingsoon
    {
        terms: [
            { term: 'Coming Soon', description: 'いつも遊んでくれてありがとう！' }
        ],
        unlockWins: 570
    },

];


//テスト用

// テスト用コード：全ての辞書エントリーを出力

function outputAllDictionaryEntries(entries) {
    entries.forEach((entry, index) => {
        console.log(`\n--- エントリー ${index + 1} (${entry.unlockWins}勝で解除) ---`);
        entry.terms.forEach((term, termIndex) => {
            console.log(`\n用語 ${termIndex + 1}:`);
            console.log(`  用語名: ${term.term}`);
            console.log(`  説明: ${term.description}`);
        });
    });
}

// テスト実行
//console.log("全ての辞書エントリーを出力します：");
//outputAllDictionaryEntries(dictionaryEntries);






// ゲーム辞典を更新する関数
function updateGameDictionary() {
    const dictionaryContainer = document.getElementById('game-dictionary');
    dictionaryContainer.innerHTML = ''; // コンテナをクリア

    // 追加: ゲーム辞典のタイトルと勝利数を表示
    const titleElement = document.createElement('h4');
    titleElement.textContent = `Game Dictionary (Wins: ${wins})`;
    titleElement.className = 'dictionary-title';
    dictionaryContainer.appendChild(titleElement);

    // テーブルを作成
    const table = document.createElement('table');
    table.className = 'dictionary-table';
    
    // テーブルヘッダーを作成
    const thead = document.createElement('thead');
    thead.innerHTML = '<tr><th>Term</th><th>Description</th></tr>';
    table.appendChild(thead);

    // テーブルボディを作成
    const tbody = document.createElement('tbody');

    dictionaryEntries.forEach(entry => {
        if (wins >= entry.unlockWins) {
            entry.terms.forEach(term => {
                const row = document.createElement('tr');
                row.innerHTML = `<td>${term.term}</td><td>${term.description}</td>`;
                tbody.appendChild(row);
            });
        }
    });

    table.appendChild(tbody);
    dictionaryContainer.appendChild(table);
}

/**
 * イベントリスナー
 */

// イベントリスナーの設定
document.addEventListener('DOMContentLoaded', function() {
    initializeGame();
    document.getElementById('start-game').addEventListener('click', startGame);
    document.getElementById('defaultOpen').click();
});

