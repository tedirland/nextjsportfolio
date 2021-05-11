import { useForm } from 'react-hook-form';
function LoginForm({ onSubmit }) {
  const { register, handleSubmit } = useForm();

  const handleChange = e => {};
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          {...register('email')}
          type="email"
          className="form-control"
          name="email"
          id="email"
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          {...register('password')}
          type="password"
          className="form-control"
          name="password"
          id="password"
        />
      </div>

      <button type="submit" className="btn btn-main bg-blue py-2 ttu">
        Submit
      </button>
    </form>
  );
}

export default LoginForm;
