(() => {
  if (window.location.host !== 'jira.sholding.ru') return;
  const m = window.location.pathname.match(/^(\/browse\/([a-z]+-\d+))/i);
  if (!m) return;

  document.addEventListener('click', (event) => {
    const $divEdit = $(event.target).closest('div.user-content-block');
    if ($divEdit.length !== 1) return;
    event.preventDefault();
    event.stopPropagation();
  }, true);
})();
