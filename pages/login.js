import RegisterForm from '../components/forms/RegisterForm';
import { useSignIn } from '../apolloLogic/actions';
import withApollo from '../hoc/withApollo';
import Redirect from '../components/shared/Redirect';
import LoginForm from '../components/forms/LoginForm';
const Login = () => {
  const [signIn, { data, error }] = useSignIn();
  const errorMessage = error => {
    return (
      (error.graphQLErrors && error.graphQLErrors[0].message) ||
      'Oops, something went wrong'
    );
  };
  return (
    <>
      <div className="bwm-form mt-5">
        <div className="row">
          <div className="col-md-5 mx-auto">
            <h1 className="page-title">Login</h1>

            <LoginForm
              onSubmit={signInData => signIn({ variables: signInData })}
            />
            {data && data.signIn && <Redirect to="/" />}
            {error && (
              <div className="alert alert-danger">{errorMessage(error)} </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default withApollo(Login);
