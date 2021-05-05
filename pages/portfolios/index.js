import { useState } from 'react';
import axios from 'axios';
import PortfolioCard from '@/components/portfolios/PortfolioCard';
import Link from 'next/link';

const graphcreatePortfolio = () => {
  const query = `
  mutation CreatePortfolio {
    createPortfolio(input: {
      title: "New Job"
      company: "New Company"
      companyWebsite: "New Website"
      location: "New location"
      jobTitle: "New title"
      description: "New Desc"
      startDate: "1/1/2020"
      endDate: "1/1/2021"
    }) {
      _id
      title
      description
      company
      companyWebsite
      location
      startDate
      endDate
    }
  }`;
  return axios
    .post('http://localhost:3000/graphql', { query })
    .then(({ data: graph }) => graph.data)
    .then(data => data.createPortfolio);
};
const fetchPortfolios = () => {
  const query = `
  query Portfolios {
    portfolios {
      _id
    title
    description
    company
    companyWebsite
    location
    startDate
    endDate

  }
    }`;
  return axios
    .post('http://localhost:3000/graphql', { query })
    .then(({ data: graph }) => graph.data)
    .then(data => data.portfolios)
    .then(portfolios => portfolios);
};
const Portfolios = ({ data }) => {
  const [portfolios, setPortfolios] = useState(data.portfolios);
  const createPortfolio = async () => {
    const newPortfolio = await graphcreatePortfolio();
    const newPortfolios = [...portfolios, newPortfolio];
    setPortfolios(newPortfolios);
  };
  return (
    <>
      <section className="section-title">
        <div className="px-2">
          <div className="pt-5 pb-4">
            <h1>Portfolios</h1>
          </div>
        </div>
        <button className="btn btn-primary" onClick={createPortfolio}>
          Create Portfolio
        </button>
      </section>
      <section className="pb-5">
        <div className="row">
          {portfolios.map(portfolio => (
            <div key={portfolio._id} className="col-md-4">
              <Link href="/portfolios/[id" as={`/portfolios/${portfolio._id}`}>
                <a className="card-link">
                  <PortfolioCard portfolio={portfolio} />
                </a>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

Portfolios.getInitialProps = async () => {
  const portfolios = await fetchPortfolios();
  return { data: { portfolios } };
};

export default Portfolios;
