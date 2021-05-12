import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';

const PortfolioForm = ({ onSubmit }) => {
  const { handleSubmit, register, setValue } = useForm();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    register('startDate');
    register('endDate');
  }, [register]);

  const handleDateChange = (dateType, setDate) => date => {
    setValue(dateType, date);
    setDate(date);
  };

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
        <label htmlFor="city">Company Website</label>
        <input
          {...register('companyWebsite')}
          name="companyWebsite"
          type="text"
          className="form-control"
          id="companyWebsite"
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
            selected={startDate}
            onChange={handleDateChange('startDate', setStartDate)}
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="street">End Date</label>
        <div>
          <DatePicker
            showYearDropdown
            disabled={!endDate}
            selected={endDate}
            onChange={handleDateChange('endDate', setEndDate)}
          />
        </div>
      </div>
      <div className="form-group">
        {endDate && (
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => handleDateChange('endDate', setEndDate(null))}
          >
            Remove End Date
          </button>
        )}
        {!endDate && (
          <button
            type="button"
            className="btn btn-success"
            onClick={() => handleDateChange('endDate', setEndDate(new Date()))}
          >
            Set End Date
          </button>
        )}
      </div>

      <button type="submit" className="btn btn-primary">
        Create
      </button>
    </form>
  );
};

export default PortfolioForm;
