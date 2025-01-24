import styles from './styles/form.module.css';
import { postMessageToParent } from './utils/Post';

export const IframeHideBtn = () => {
  return (
    <div>
      <button onClick={() => postMessageToParent('hide', [])} className={styles.hideBtn}>
        Iframe 非表示
      </button>
    </div>
  );
};
