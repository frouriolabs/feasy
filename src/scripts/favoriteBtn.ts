import type { PostData, PostFunc } from '../types/Post.type';

const LOCALHOST_URL = 'http://localhost:3000';

type Styles = { property: keyof CSSStyleDeclaration; value: string }[];

const btnStyle: Styles = [
  { property: 'width', value: '160px' },
  { property: 'height', value: '56px' },
  { property: 'color', value: 'red' },
  { property: 'position', value: 'absolute' },
  { property: 'top', value: '160px' },
  { property: 'left', value: '80px' },
];

const containerStyle: Styles = [
  { property: 'height', value: '50%' },
  { property: 'width', value: '50%' },
  { property: 'position', value: 'absolute' },
  { property: 'top', value: '50%' },
  { property: 'left', value: '50%' },
  { property: 'transform', value: 'translate(-50%, -50%)' },
];

const containerHideStyle: Styles = [
  { property: 'height', value: '0' },
  { property: 'width', value: '0' },
];

const iframeStyle: Styles = [
  { property: 'height', value: '100%' },
  { property: 'width', value: '100%' },
  { property: 'background', value: 'white' },
];

const setStyle = (htmlElm: HTMLElement, styles: Styles) => {
  styles.forEach((val) => {
    htmlElm.style.setProperty(String(val.property), val.value);
  });
};

const showIframe = () => {
  setStyle(container, containerStyle);

  if (container.querySelector('iframe')) return;

  const iframe = document.createElement('iframe');

  iframe.src = LOCALHOST_URL;
  iframe.sandbox.value = 'allow-scripts allow-same-origin allow-modals';

  setStyle(iframe, iframeStyle);

  container.appendChild(iframe);
};

const hideIframe = () => {
  const iframe = container.querySelector('iframe');

  if (!iframe) return;

  container.removeChild(iframe);

  setStyle(container, containerHideStyle);
};

const shareForm = (event: MessageEvent) => {
  const postData: PostData = event.data;
  const inputElms = Array.from(document.getElementsByTagName('input'));

  postData.content.forEach((val) => {
    const elm = inputElms.find(({ id }) => id === val.id);

    if (!elm) return;

    elm.value = val.value;
  });

  hideIframe();
};

const originCheck = (event: MessageEvent) => {
  if (!event.source) return;

  event.source.postMessage(window.location.origin, { targetOrigin: event.origin });
};

const iframePostActions: PostFunc = {
  hide: hideIframe,
  share: shareForm,
  check: originCheck,
};

window.addEventListener('message', (event) => {
  const postData: PostData = event.data;

  iframePostActions[postData.action](event);
});

const btn = document.createElement('button');
const container = document.createElement('div');

btn.innerText = 'iframe 表示';
setStyle(btn, btnStyle);
btn.addEventListener('click', showIframe);

document.body.appendChild(btn);
document.body.appendChild(container);
