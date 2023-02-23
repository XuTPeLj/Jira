// Chrome and Opera do not support browser. http://stackoverflow.com/a/37646525/1902598
const _browser = this._browser || this.browser || this.chrome;
const storage = _browser.storage.sync || _browser.storage.local;

function onClickSelectOption(e) {
  if (taskId.value) {
    handleSubmit(e);
  }
}

function encodeHTML(raw) {
  return raw.replace(/[\u00A0-\u9999<>\&]/gim, i => '&#' + i.charCodeAt(0) + ';');
}

function formatDate(dateStr) {
  if (typeof dateStr !== 'string') return '';
  const [yearIndex, monthIndex, dayIndex] = [0, 1, 2];
  textMonth = [
    'янв',
    'фев',
    'мар',
    'апр',
    'май',
    'июн',
    'июл',
    'авг',
    'сен',
    'окт',
    'ноя',
    'дек',
  ];
  const textWeek = [
    'вс',
    'пн',
    'вт',
    'ср',
    'че',
    'пя',
    'су',
  ];
  const partsDate = dateStr.split('-');
  const date = new Date(...partsDate);
console.log('[]',textMonth[partsDate[monthIndex]],partsDate[monthIndex], monthIndex);
  return [
    `[${textWeek[date.getDay()]}]`,
    partsDate[+dayIndex],
    textMonth[+partsDate[monthIndex]],
  ].join(' ');
}


const handleSubmit = event => {
  if (event) {
    event.preventDefault();
  }
  let ticket = encodeURIComponent(document.querySelector('.quiji-ticket-id').value);
  if (ticket) {
    if (parseInt(ticket)) {
      ticket = `${select.value}-${ticket}`;
    }

    window.setTimeout(() => window.close(), 1000);
    _browser.extension.getBackgroundPage().openTicket(ticket, form.newTab);
  }
};

const handleLastTicket = (event, defaultOption, lastTicket) => {
	if (event) {
		event.preventDefault();
	}
	window.setTimeout(() => window.close(), 1000);
	_browser.extension.getBackgroundPage().openTicket(lastTicket, defaultOption);
};

const renderDialog = () => {
	storage.get(
		{
			defaultOption: 0,
			lastTicket: '',
			history: [],
		},
		options => {
			const form = document.querySelector('.quiji-popup-form');
			const newButton = document.querySelector('.quiji-new-tab');
			// newButton.newTab = true;
			const currentButton = document.querySelector('.quiji-current-tab');
			// currentButton.newTab = false;

			const lastTicketButton = createLastTicketButton(options);

      form.onsubmit = handleSubmit;
			// newButton.addEventListener('click', handleSubmit);
			// currentButton.addEventListener('click', handleSubmit);

			// depending on the option attach newTab true or false to submit handler
			console.log('[options.defaultOption]', options.defaultOption);
			// form.newTab = !options || options.defaultOption === 0 ? false : true;
			form.newTab = true;

			// newButton.value = _browser.i18n.getMessage('newTab');
			// currentButton.value = _browser.i18n.getMessage('currentTab');
			lastTicketButton.value = _browser.i18n.getMessage('lastTicket');


      const divListTasks = document.querySelector('.quiji-list');
      var a=1;
      divListTasks.innerHTML = options.history.map(task => `
<tr>
<td class="del" taskId="${task.id}">X</td>
  <td class="text">
    <a href="${encodeHTML(task.url)}" target="_blank">
      ${task.id}
    </a>
  </td>
  <td class="text title" title="${encodeHTML(task.title)}">
    ${encodeHTML(task.title)}
  </td>
  <td class="text">
    ${formatDate(task.date)}
  </td>
  <td>
    ${task.count}
  </td>

</tr>
`).join('');

      select.onclick = onClickSelectOption;

      select.innerHTML = options.history
        // Сортировка по дате - но массив уже отсортирован
        // .sort((a, b) => a.date < b.date ? 1 : a.date > b.date ? -1 : b.count - a.count)
        .map(a => a.id.replace(/-\d+$/, '')).filter((a, b, c) => {
          if (a && c.includes(a)) {
            c.forEach((b, i) => {
              if (b === a) {
                c[i] = '';
              }
            });
            return true;
          }
          return false;
        })
        .map((a, b) => `<option value="${a}" ${b === 0 ? 'selected' : ''} >${a}</option>`);

      setTimeout(() => document.querySelector('#taskId').focus(), 0);
    }
	);
};

document.addEventListener('DOMContentLoaded', () => {
	renderDialog();
});

function createLastTicketButton(options) {
	const lastTicketButton = document.querySelector('.quiji-last-ticket');
	if (options) {
		if (!options.lastTicket) {
			lastTicketButton.disabled = true;
		} else {
			lastTicketButton.addEventListener('click', e => handleLastTicket(e, options.defaultOption, options.lastTicket));
		}
	}
	return lastTicketButton;
}

document.addEventListener('click', function (e){
  let th = e.target;
  if (th.className !== 'del') return;
  if (!confirm('Удалить!?')) return;
  del(th);
  hide(th.parentElement);
});

function del(th) {
  storage.get(
    {
      history: [],
    },
    function (getBlock) {
    getBlock = getBlock.history;
    let key = 'id';
    let value = th.getAttribute('taskId');

    for (let i in getBlock) {
      if (isNaN(i)) break;
      if (getBlock[i][key] == value) {
        getBlock.splice(i, 1);
        storage.set({
          history: getBlock
        });
        return;
      }
    }
  });
}
function hide(th) {
  if (!th) return;
  th.style.backgroundColor = 'red';
  $(th).slideUp();
  /*th.focus();
  if (document.all('menu')) {
      console.log('[menu]',document.all('menu'));
      document.all('menu').click();
  }*/
  // setTimeout(() => {
  // console.log('[hide]', th);
}