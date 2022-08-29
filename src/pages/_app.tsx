import "bootstrap/dist/css/bootstrap.min.css";
import { TodoProvider } from "contexts/TodoContext";
import type { AppProps } from "next/app";
import Head from "next/head";
import "styles/_global.scss";

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <>
      <Head>
        <title>Todo List</title>
      </Head>
      <TodoProvider>
        <Component {...pageProps} />
      </TodoProvider>
    </>
  );
};

export default App;
