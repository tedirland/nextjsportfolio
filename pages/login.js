import { useSignIn } from '../apolloLogic/actions';
import withApollo from '../hoc/withApollo';
import Redirect from '../components/shared/Redirect';
import LoginForm from '../components/forms/LoginForm';
import BaseLayout from '@/layouts/BaseLayout';

const Login = () => {
  const [signIn, { data, loading, error }] = useSignIn();
  const errorMessage = error => {
    return (
      (error.graphQLErrors && error.graphQLErrors[0].message) ||
      'Oops, something went wrong'
    );
  };
  return (
    <BaseLayout>
      <div className="bwm-form mt-5">
        <div className="row">
          <div className="col-md-5 mx-auto">
            <h1 className="page-title">Login</h1>

            <LoginForm
              loading={loading}
              onSubmit={signInData => signIn({ variables: signInData })}
            />
            {data && data.signIn && <Redirect to="/" />}
            {error && (
              <div className="alert alert-danger">{errorMessage(error)} </div>
            )}
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default withApollo(Login);
