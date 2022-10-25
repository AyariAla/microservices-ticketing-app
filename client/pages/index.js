import buildClient from '../api/build-client';

const LandingPage = ({ currentUser }) => {
  // Object.entries(currentUser) === 0
  return currentUser ? (
    <h1> You are signed in {currentUser?.email} </h1>
  ) : (
    <h1> You are NOT signed in </h1>
  );
};
// request obj argument to the fct { req }
LandingPage.getInitialProps = async (context) => {
  const client = buildClient(context);
  const { data } = await client.get('/api/users/currentuser');
  return data;
};
export default LandingPage;
