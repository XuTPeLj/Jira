/*

https://jira.sholding.ru/secure/RapidBoard.jspa

 */
(() => {
  if (window.location.host !== 'jira.sholding.ru') return;
  if (window.location.pathname !== '/secure/RapidBoard.jspa') return;

  document.addEventListener('click', (event) => {
    const $divTask = $(event.target).closest('div.js-issue');
    if ($divTask.length !== 1) return;
    const $a = $($divTask).find('a.js-key-link.ghx-key-link');
    if ($a.length !== 1) return;
    event.preventDefault();
    event.stopPropagation();
    window.open($a.attr('href'), '_blank');
  }, true);
})();
