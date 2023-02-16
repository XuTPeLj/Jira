setInterval(() => {
  if (window.location.host !== 'jira.sholding.ru') return;
  const m = window.location.pathname.match(/^(\/browse\/([a-z]+-\d+))/i);
  if (!m) return;

  const _browser = this._browser || this.browser || this.chrome;
  const urlPattern = /^https?:\/\/(?:www\.|(?!www))[^\s.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,}$/;
  const storage = _browser.storage.sync || _browser.storage.local;

  console.log('[storage]', storage);
  if (storage && typeof storage.get === 'function') {
    console.log('[storage.get]', storage.get);
    storage.get(
      {
        history: [],
      },
      options => {
        console.log('[options]', options.history);

        const findNom = options.history.findIndex(el => el.id === m[2]);
        if (findNom !== -1) {
          const findElement = options.history[findNom];
          findElement.count += 1;
          options.history.splice(findNom, 1);
          options.history.unshift(findElement);
        } else {
          options.history.unshift({
            url: m[1],
            id: m[2],
            title: document.title,
            count: 1,
          });
        }
        console.log('[options.history]', options.history);
        storage.set({
          history: options.history
        });
      }
    );
  }
}, 10000);