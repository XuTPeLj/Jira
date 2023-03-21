(() => {
  if (window.location.host !== 'drone.k8s.service.s') return;
  loadStyle(`
  div[class*="license_system-messages-wrapper"] {display: none;}
  `);
})();


