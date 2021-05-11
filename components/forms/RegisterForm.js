import { useForm } from 'react-hook-form';

function RegisterForm({ onSubmit }) {
  const { register, handleSubmit } = useForm();

  const handleChange = e => {};
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label htmlFor="avatar">Avatar</label>
        <input
          {...register('avatar')}
          type="text"
          className="form-control"
          name="avatar"
          id="avatar"
        />
      </div>
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input
          {...register('username')}
          type="text"
          className="form-control"
          name="username"
          id="username"
        />
      </div>
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
      <div className="form-group">
        <label htmlFor="passwordConfirmation">Password Confirmation</label>
        <input
          {...register('passwordConfirmation')}
          type="password"
          className="form-control"
          name="passwordConfirmation"
          id="passwordConfirmation"
        />
      </div>
      <button type="submit" className="btn btn-main bg-blue py-2 ttu">
        Submit
      </button>
    </form>
  );
}

export default RegisterForm;
