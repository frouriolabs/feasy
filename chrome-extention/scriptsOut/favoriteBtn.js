'use strict';
var LOCALHOST_URL = 'http://localhost:3000';
var btnStyle = [
  { property: 'width', value: '160px' },
  { property: 'height', value: '56px' },
  { property: 'color', value: 'red' },
  { property: 'position', value: 'absolute' },
  { property: 'top', value: '160px' },
  { property: 'left', value: '80px' },
];
var containerStyle = [
  { property: 'height', value: '50%' },
  { property: 'width', value: '50%' },
  { property: 'position', value: 'absolute' },
  { property: 'top', value: '50%' },
  { property: 'left', value: '50%' },
  { property: 'transform', value: 'translate(-50%, -50%)' },
];
var containerHideStyle = [
  { property: 'height', value: '0' },
  { property: 'width', value: '0' },
];
var iframeStyle = [
  { property: 'height', value: '100%' },
  { property: 'width', value: '100%' },
  { property: 'background', value: 'white' },
];
var setStyle = function (htmlElm, styles) {
  styles.forEach(function (val) {
    htmlElm.style.setProperty(String(val.property), val.value);
  });
};
var showIframe = function () {
  setStyle(container, containerStyle);
  if (container.querySelector('iframe')) return;
  var iframe = document.createElement('iframe');
  iframe.src = LOCALHOST_URL;
  iframe.sandbox.value = 'allow-scripts allow-same-origin';
  setStyle(iframe, iframeStyle);
  container.appendChild(iframe);
};
var hideIframe = function () {
  setStyle(container, containerHideStyle);
};
var combineIdentifiers = [
  {
    id: 'q1',
    kind: 'name',
  },
  {
    id: 'q2',
    kind: 'email',
  },
  {
    id: 'q5',
    kind: 'old',
  },
];
var shareForm = function (content) {
  var inputElms = Array.from(document.getElementsByTagName('input'));
  combineIdentifiers.forEach(function (val) {
    var elm = inputElms.find(function (_a) {
      var id = _a.id;
      return id === val.id;
    });
    if (!elm) return;
    elm.value = content[val.kind];
  });
  hideIframe();
};
var iframePostActions = {
  hide: hideIframe,
  share: shareForm,
};
window.addEventListener('message', function (event) {
  if (event.origin !== LOCALHOST_URL) return;
  var postData = event.data;
  iframePostActions[postData.action](postData.content);
});
var btn = document.createElement('button');
var container = document.createElement('div');
btn.innerText = 'iframe 表示';
setStyle(btn, btnStyle);
btn.addEventListener('click', showIframe);
document.body.appendChild(btn);
document.body.appendChild(container);
