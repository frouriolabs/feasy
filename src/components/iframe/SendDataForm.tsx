import { useEffect, useMemo, useState } from 'react';
import type { CombinationOriginVal } from '../../types/Post.type';
import styles from './styles/form.module.css';
import { postMessageToParent } from './utils/Post';

const allowedOrigins = ['https://form.cao.go.jp'];

export const SendDataForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [old, setOld] = useState('');

  const combineIdentifiers: CombinationOriginVal = useMemo(() => {
    return {
      [allowedOrigins[0]]: [
        {
          id: 'q1',
          value: name,
        },
        {
          id: 'q2',
          value: email,
        },
        {
          id: 'q5',
          value: old,
        },
      ],
    };
  }, [name, email, old]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (!allowedOrigins.includes(event.data)) return alert('このオリジンは許可されていません。');

      postMessageToParent('share', combineIdentifiers[event.data]);
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [combineIdentifiers]);

  return (
    <div className={styles.container}>
      <p className={styles.spaceY} />
      <input
        title="氏名"
        className={styles.basicInput}
        placeholder="富士 太郎"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <p className={styles.spaceY} />
      <input
        title="メールアドレス"
        className={styles.basicInput}
        placeholder="mail@co.jp"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <p className={styles.spaceY} />
      <input
        title="年齢"
        className={styles.basicInput}
        placeholder="20"
        value={old}
        type="number"
        onChange={(e) => setOld(e.target.value)}
      />
      <p className={styles.spaceY} />
      <div style={{ textAlign: 'right' }}>
        <button onClick={() => postMessageToParent('check', [])} className={styles.shareBtn}>
          データ共有
        </button>
      </div>
    </div>
  );
};
