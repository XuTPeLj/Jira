(() => {
  if (window.location.host !== 'jira.sholding.ru') return;
  const m = window.location.pathname.match(/^(\/browse\/([a-z]+-\d+))/i);
  if (!m) return;

  const _browser = this._browser || this.browser || this.chrome;
  const urlPattern = /^https?:\/\/(?:www\.|(?!www))[^\s.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,}$/;
  const storage = _browser.storage.sync || _browser.storage.local;

  if (storage && typeof storage.get === 'function') {
    storage.get(
      {
        history: [],
      },
      options => {
        // options.history = [];
        const findNom = options.history.findIndex(el => el.id === m[2]);
        if (findNom !== -1) {
          const findElement = options.history[findNom];
          options.history.splice(findNom, 1);

          findElement.count += 1;
          findElement.date = (date =>
              ['getFullYear', 'getMonth', 'getDate'].map(method => date[method]()).map(a => a < 10 ? `0${a}` : a).join('-')
          )(new Date());
          if ($('h1').text() !== '403 Forbidden')
            findElement.title = $('h1').text();
        } else {
          options.history.unshift({
            url: window.location.href,
            id: m[2],
            title: $('h1').text(),
            date: (date =>
                ['getFullYear', 'getMonth', 'getDate'].map(method => date[method]()).map(a => a < 10 ? `0${a}` : a).join('-')
            )(new Date()),
            count: 1,
          });
        }

        storage.set({
          history: options.history
        });

        storage.get(
          {
            history: [],
          },
          options_ => {
            const findNom = options_.history.findIndex(el => el.id === m[2]);
            if (findNom === -1) {
              options.history.splice(options.history.length - 1, 1);

              storage.set({
                history: options.history
              });
            }
          });
      }
    );
  }
})();
