import axios from 'axios';

const LandingPage = ({ currentUser }) => {
  console.log(currentUser);
  return <h1> Landing page</h1>;
};
// request obj argument to the fct
LandingPage.getInitialProps = async ({ req }) => {
  // window only exists in the browser not in node
  if (typeof window === 'undefined') {
    // we are on the server !ingress-nginx-controller
    const { data } = await axios
      .get(
        'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser',
        {
          // for ingress-nginx to know the domain of the request and append ticketing.dev
          // headers: {
          //   Host: 'ticketing.dev',
          // },
          headers: req.headers,
        }
      )
      .catch((err) => {
        console.log(err.message);
      });
    return data;
  } else {
    const { data } = await axios.get('/api/users/currentuser').catch((err) => {
      console.log(err.message);
    });
    return data;
  }
};
export default LandingPage;
