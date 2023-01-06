import "../styles/globals.css";
import { RecoilRoot } from "recoil";
import TimeAgo from "javascript-time-ago";

import en from "javascript-time-ago/locale/en.json";
TimeAgo.addDefaultLocale(en);

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <Component {...pageProps} />
    </RecoilRoot>
  );
}

export default MyApp;
