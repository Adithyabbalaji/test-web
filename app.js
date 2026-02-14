const { createApp } = Vue;

createApp({
  data() {
    return {
      pages: [],
      spreadIndex: 0,
      loading: true,
      errorMessage: '',
      isTurning: false,
      turnDirection: 'forward'
    };
  },
  computed: {
    leftPage() {
      return this.pages[this.spreadIndex] || null;
    },
    rightPage() {
      return this.pages[this.spreadIndex + 1] || null;
    },
    canGoBack() {
      return this.spreadIndex > 0;
    },
    canGoForward() {
      return this.spreadIndex + 2 < this.pages.length;
    },
    progressLabel() {
      if (!this.pages.length) return 'No pages yet';
      const start = this.spreadIndex + 1;
      const end = Math.min(this.spreadIndex + 2, this.pages.length);
      return `Pages ${start}-${end} of ${this.pages.length}`;
    },
    bookTurnClass() {
      if (!this.isTurning) return '';
      return this.turnDirection === 'forward' ? 'turn-forward' : 'turn-backward';
    }
  },
  async mounted() {
    await this.loadPages();
  },
  methods: {
    async loadPages() {
      try {
        this.loading = true;
        this.errorMessage = '';
        const response = await fetch('/api/pages');
        if (!response.ok) {
          throw new Error(`Failed to load pages (${response.status})`);
        }

        const payload = await response.json();
        this.pages = Array.isArray(payload.pages) ? payload.pages : [];
      } catch (error) {
        this.errorMessage = 'Could not load memories from backend.';
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    animateTurn(direction) {
      this.turnDirection = direction;
      this.isTurning = true;
      window.setTimeout(() => {
        this.isTurning = false;
      }, 550);
    },
    turnBackward() {
      if (!this.canGoBack) return;
      this.animateTurn('backward');
      this.spreadIndex = Math.max(this.spreadIndex - 2, 0);
    },
    turnForward() {
      if (!this.canGoForward) return;
      this.animateTurn('forward');
      this.spreadIndex = Math.min(this.spreadIndex + 2, this.pages.length - 2);
    }
  }
}).mount('#app');
