import RegisterForm from '../components/forms/RegisterForm';
import { Mutation } from '@apollo/client/react/components';
import { SIGN_IN } from '../apolloLogic/mutations';
import withApollo from '../hoc/withApollo';
import Redirect from '../components/shared/Redirect';
import LoginForm from '../components/forms/LoginForm';
const Login = () => {
  return (
    <>
      <div className="bwm-form mt-5">
        <div className="row">
          <div className="col-md-5 mx-auto">
            <h1 className="page-title">Login</h1>
            {/* <Mutation mutation={SIGN_IN}>
              {(logInUser, {data,error}) => (

              )} */}
            <LoginForm
              onSubmit={signInData => alert(JSON.stringify(signInData))}
            />
            {/* </Mutation> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default withApollo(Login);
