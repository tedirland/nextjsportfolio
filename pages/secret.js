import withApollo from '../hoc/withApollo';
import withAuth from '../hoc/withAuth';

const Secret = withAuth(({ displayMessage }) => {
  //If user is authenticated they can stay, otherwise redirect

  return (
    <>
      <div className="bwm-form mt-5">
        <div className="row">
          <div className="col-md-5 mx-auto">
            <h1 className="page-title">Secret Page!!!</h1>
          </div>
        </div>
      </div>
    </>
  );
});

export default withApollo(Secret);
