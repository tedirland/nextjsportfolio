import React from 'react';
import { useRouter } from 'next/router';

// function PortfolioDetail() {
//   const router = useRouter();
//   const { id } = router.query;
//   return <h1>Detail Page with ID: {id}</h1>;
// }

const PortfolioDetail = ({ query }) => {
  const { id } = query;
  return <h1>I am a detail page with ID: {id}</h1>;
};
PortfolioDetail.getInitialProps = ({ query }) => {
  return { query };
};

export default PortfolioDetail;
