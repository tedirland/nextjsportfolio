import Link from 'next/link';
import { useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';

const PortfolioForm = ({ onSubmit }) => {
  const { handleSubmit, register } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          {...register('title')}
          name="title"
          type="text"
          className="form-control"
          id="title"
        />
      </div>

      <div className="form-group">
        <label htmlFor="city">Company</label>
        <input
          {...register('company')}
          name="company"
          type="text"
          className="form-control"
          id="company"
        />
      </div>

      <div className="form-group">
        <label htmlFor="street">Location</label>
        <input
          {...register('location')}
          name="location"
          type="text"
          className="form-control"
          id="location"
        />
      </div>

      <div className="form-group">
        <label htmlFor="street">Job Title</label>
        <input
          {...register('jobTitle')}
          name="jobTitle"
          type="text"
          className="form-control"
          id="jobTitle"
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          {...register('description')}
          name="description"
          rows="5"
          type="text"
          className="form-control"
          id="description"
        ></textarea>
      </div>

      <div className="form-group">
        <label htmlFor="street">Start Date</label>
        <div>
          <DatePicker
            showYearDropdown
            selected={new Date()}
            onChange={() => {}}
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="street">End Date</label>
        <div>
          <DatePicker
            showYearDropdown
            selected={new Date()}
            onChange={() => {}}
          />
        </div>
      </div>

      <button type="submit" className="btn btn-primary mr-4">
        Create
      </button>
      <Link href="/portfolios" className="btn btn-danger nav-link">
        Cancel
      </Link>
    </form>
  );
};

export default PortfolioForm;
