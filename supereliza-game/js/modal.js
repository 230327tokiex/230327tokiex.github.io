// modal.js

class ParameterModal {
    constructor() {
        this.modal = document.getElementById('parameter-modal');
        this.openButton = document.getElementById('parameter-button');
        this.closeButton = document.getElementById('close-modal');
        this.initEventListeners();
    }

    initEventListeners() {
        this.openButton.addEventListener('click', () => this.open());
        this.closeButton.addEventListener('click', () => this.close());
        window.addEventListener('click', (event) => {
            if (event.target == this.modal) {
                this.close();
            }
        });
    }

    open() {
        this.modal.style.display = 'block';
    }

    close() {
        this.modal.style.display = 'none';
    }

    getParameters() {
        return {
            learningRate: parseFloat(document.getElementById('learning-rate').value),
            epsilon: parseFloat(document.getElementById('epsilon').value),
            discountRate: parseFloat(document.getElementById('discount-rate').value),
            episodeCount: parseInt(document.getElementById('episode-count').value),
            algorithm: document.getElementById('algorithm').value
        };
    }
}

// グローバルスコープでモーダルのインスタンスを作成
const parameterModal = new ParameterModal();