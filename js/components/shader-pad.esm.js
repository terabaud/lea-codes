class ShaderPad extends HTMLElement {
  constructor() {
    super();
    this.onInput = this.onInput.bind(this);
  }

  connectedCallback() {
    if (!this.renderer) {
      this.setup();
    }
  }

  disconnectedCallback() {
    this.dispose();
  }

  static register() {
    if (typeof customElements.get('shader-pad') === 'undefined') {
      customElements.define('shader-pad', ShaderPad);
    }
  }

  setup() {
    this.shaderCanvas = this.querySelector('shader-canvas');
    this.fragCode = this.querySelector('script[type="frag"]');
    this.textArea = this.querySelector('textarea');
    this.textArea.addEventListener('input', this.onInput, false);
  }

  onInput() {
    const { gl, program } = this.shaderCanvas;
    this.shaderCanvas.playState = 'stopped';
    gl.deleteProgram(program);
    this.fragCode.textContent = this.textArea.value.trim();
    this.shaderCanvas.update();
    this.shaderCanvas.playState = 'running';
  }

  dispose() {
    this.textArea.removeEventListener('input', this.onInput);
    this.textArea = null;
    this.shaderCanvas = null;
  }
}

ShaderPad.register();
