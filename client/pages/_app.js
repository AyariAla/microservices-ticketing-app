import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../api/build-client';
import { Header } from '../components/header';

const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <div>
      <Header currentUser={currentUser} />
      <Component {...pageProps} />
    </div>
  );
};

AppComponent.getInitialProps = async (appContext) => {
  // console.log(Object.keys(appContext)); ->  [ 'AppTree', 'Component', 'router', 'ctx' ]
  const client = buildClient(appContext.ctx);
  const { data } = await client.get('/api/users/currentuser');
  console.log('Logging from app getInitial props', data);
  // #####################
  // once we add a custom app getInitialProps other ones will not be called automatically
  // so we have to handle it manually

  let pageProps = {};
  // some components might not have getInitialProps so we check here and then send the data
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx);
  }
  return { pageProps, ...data };
};
export default AppComponent;
