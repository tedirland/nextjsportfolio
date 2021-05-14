import { useGetUser } from '../apolloLogic/actions';
import Redirect from '../components/shared/Redirect';

export default (WrappedComponent, role, options = { ssr: false }) => {
  function withAuth(props) {
    const {
      data: { user } = {},
      loading,
      error,
    } = useGetUser({ fetchPolicy: 'network-only' });

    if (!loading && (!user || error) && typeof window !== 'undefined') {
      return <Redirect to="/login" query={{ message: 'NOT_AUTHENTICATED' }} />;
    }
    //TODO: Send a message to login page
    if (user) {
      if (role && !role.includes(user.role)) {
        return (
          <Redirect
            to="/login"
            query={{
              message: 'NOT_AUTHORIZED',
            }}
          />
        );
      }
      return <WrappedComponent {...props} />;
    }
    return <p> Loading... </p>;
  }

  if (options.ssr) {
    const serverRedirect = (res, to) => {
      res.redirect(to);
      res.end();
      return {};
    };
    withAuth.getInitialProps = async context => {
      const { req, res } = context;

      if (req) {
        const { user } = req;

        if (!user) {
          return serverRedirect(res, '/login?message=NOT_AUTHENTICATED');
        }
        if (role && !role.includes(user.role)) {
          return serverRedirect(res, '/login?message=NOT_AUTHORIZED');
        }
      }
      const pageProps =
        WrappedComponent.getInitialProps &&
        (await WrappedComponent.getInitialProps());
      return { ...pageProps };
    };
  }
  return withAuth;
};
