import { client } from './steamClient.js';

export const playLoading = {
  playThis: ['', true],
  moon: ['🌑', '🌒', '🌓', '🌔', '🌕', '🌖', '🌗', '🌘'],
  count: 0,
  timer: null,
  loading: false,
  startTimer() {
    this.loading = true;
    this.timer = setInterval(() => {
      this.playThis[0] = `${this.moon[this.count]} Loading...`;
      this.count += 1;

      if (this.count > 7) {
        this.count = 0;
      }

      client.gamesPlayed(this.playThis);
    }, 500);
  },
  resetTimer() {
    this.loading = false;
    this.count = 0;
    clearInterval(this.timer);
  },
};
