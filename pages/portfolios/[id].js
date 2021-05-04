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

// class PortfolioDetail extends React.Component {
//   //Called on the server
//   static getInitialProps({ query }) {
//     //What you return here will get into this.props
//     console.log(query);
//     return { query, test: 'hello world', num: 4 + 4 };
//   }
//   render() {
//     const id = this.props.query.id;
//     console.log(id);
//     return (
//       <h1>
//         Portfolio Details! ID: {id} {this.props.test} {this.props.num}
//       </h1>
//     );
//   }
// }

export default PortfolioDetail;
