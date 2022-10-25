import { Router } from 'next/router';
import { useEffect } from 'react';
import useRequest from '../../hooks/use-request';

export default () => {
  const { doRequest } = useRequest({
    url: '/api/users/signout',
    method: 'post',
    body: {},
    onSuccess: () => {
      Router.push('/');
    },
  });
  // const logoutBrowser = async () => {
  //   if( typeof window !== 'undefined'){
  //     window[WINDOW_USER_SCRIPT_VARIABLE]
  //   }
  // }
  useEffect(() => {
    doRequest();
  }, []);
  return <div>Signin you out</div>;
};
