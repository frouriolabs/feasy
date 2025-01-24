import { IframeHideBtn } from '../components/iframe/IframeHideBtn';
import { SendDataForm } from '../components/iframe/SendDataForm';
import styles from './index.module.css';

const Home = () => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <IframeHideBtn />
        <SendDataForm />
      </main>
      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <img src="vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Home;
