import { useState } from 'react';
import axios from 'axios';
import PortfolioCard from '@/components/portfolios/PortfolioCard';
import Link from 'next/link';
import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import { useEffect } from 'react';
import { GET_PORTFOLIOS } from '../../apolloLogic/queries';
import { CREATE_PORTFOLIO } from '../../apolloLogic/mutations';

const graphDeletePortfolio = id => {
  const query = `mutation DeletePortfolio {
    deletePortfolio(id: "${id}")

  }`;
  return axios
    .post('http://localhost:3000/graphql', { query })
    .then(({ data: graph }) => graph.data)
    .then(data => data.deletePortfolio);
};

const graphUpdatePortfolio = id => {
  const query = `
  mutation UpdatePortfolio {
    updatePortfolio(id: "${id}", input: {
      title: "Updated Job"
      company: "Updated Company"
      companyWebsite: "Updated Website"
      location: "Updated location"
      jobTitle: "Updated title"
      description: "Updated Desc"
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
    .then(data => data.updatePortfolio);
};

const Portfolios = ({ query }) => {
  const [portfolios, setPortfolios] = useState([]);
  const [getPortfolios, { loading, data }] = useLazyQuery(GET_PORTFOLIOS);
  const [createPortfolio, { data: createData }] = useMutation(CREATE_PORTFOLIO);

  useEffect(() => {
    getPortfolios();
  }, []);

  if (data && data.portfolios.length > 0 && portfolios.length === 0) {
    setPortfolios(data.portfolios);
  }
  if (loading) {
    return 'loading...';
  }

  const updatePortfolio = async id => {
    const updatedPortfolio = await graphUpdatePortfolio(id);
    const index = portfolios.findIndex(p => p._id === id);
    const newPortfolios = portfolios.slice();
    newPortfolios[index] = updatedPortfolio;
    setPortfolios(newPortfolios);
  };
  const deletePortfolio = async id => {
    const deletedId = await graphUpdatePortfolio(id);
    const index = portfolios.findIndex(p => p._id === deletedId);
    const newPortfolios = portfolios.slice();
    newPortfolios.splice(index, 1);
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
              <button
                className="btn btn-warning"
                onClick={() => updatePortfolio(portfolio._id)}
              >
                Upate Portfolio
              </button>
              <button
                className="btn btn-danger ml-3"
                onClick={() => deletePortfolio(portfolio._id)}
              >
                Delete Portfolio
              </button>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Portfolios;
