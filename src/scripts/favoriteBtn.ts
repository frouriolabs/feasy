type Styles = { property: keyof CSSStyleDeclaration; value: string }[];

const iframeStyle: Styles = [
  { property: 'position', value: 'absolute' },
  { property: 'top', value: '50%' },
  { property: 'left', value: '50%' },
  { property: 'transform', value: 'translate(-50%, -50%)' },
  { property: 'width', value: '95vw' },
  { property: 'height', value: '70vh' },
  { property: 'background', value: 'white' },
];

const appendBtnStyle: Styles = [
  { property: 'width', value: '100px' },
  { property: 'height', value: '50px' },
  { property: 'color', value: 'red' },
];

const closeBtnStyle: Styles = [
  { property: 'position', value: 'absolute' },
  { property: 'top', value: '13vh' },
  { property: 'right', value: '2.5vw' },
  { property: 'color', value: 'gray' },
  { property: 'background', value: 'transparent' },
  { property: 'border', value: 'none' },
  { property: 'cursor', value: 'pointer' },
];

const applyStyles = (htmlElm: HTMLElement, styles: Styles) => {
  styles.forEach((style) => {
    htmlElm.style.setProperty(String(style.property), style.value);
  });
};

const appendToBody = (element: HTMLElement) => {
  document.body.appendChild(element);
};

const btn = document.createElement('button');
const iframe = document.createElement('iframe');
const closeBtn = document.createElement('button');

btn.innerText = 'iframe 表示';
iframe.src = 'http://localhost:3000';
applyStyles(btn, appendBtnStyle);
applyStyles(iframe, iframeStyle);
applyStyles(closeBtn, closeBtnStyle);

btn.addEventListener('click', () => {
  appendToBody(iframe);
  appendToBody(closeBtn);
  closeBtn.style.setProperty('font-size', '80px');
});

closeBtn.innerText = '×';
closeBtn.addEventListener('click', () => {
  document.body.removeChild(iframe);
  document.body.removeChild(closeBtn);
});

document.body.appendChild(btn);
