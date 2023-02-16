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

  $('#addcomment').attr('style', `

  position: sticky;
  bottom: 0px;
  background: white;
  border-top: 1px solid #00000030;
  padding-top: 3px;
  z-index: 10;
`);

// Активности - Списоки: Коментарии и тд
  $('#activitymodule').attr('style', `

  position: sticky;
  bottom: 33px;
  background: white;
  border-top: 1px solid #00000030;
  padding-top: 3px;
  z-index: 10;
`);
  setTimeout(()=>
      $('#activitymodule_heading button.toggle-title[aria-expanded="true"]').click(),
    500);

})();

//===================



  $('.message-container').attr('style', `

    position: sticky;
    bottom: 33px;
    z-index: 10;
    background: bisque;
`);

/*  $('.aui-toolbar2-primary').eq(0).attr('style', `

    position: sticky;
    top: 0px;
    z-index: 10;
`);*/


