import withApollo from '../../../hoc/withApollo';
import withAuth from '../../../hoc/withAuth';
import { useRouter } from 'next/router';
import BaseLayout from '@/layouts/BaseLayout';
import { Card, Button } from 'react-bootstrap';

const InstructorDashBoard = () => {
  const router = useRouter();
  const instructorId = router.query.id || '';

  return (
    <BaseLayout>
      <div className="bwm-form mt-5">
        <div className="row">
          <div className="col-md-12">
            <h1 className="page-title">
              Instructor Portfolios - {instructorId}
            </h1>
            <Card>
              <Card.Header>Featured</Card.Header>
              <Card.Body>
                <Card.Title>Some Title</Card.Title>
                <Card.Text>Lorem ipsum lorem ipsum..........</Card.Text>
                <Button variant="primary">Go Somewhere</Button>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default withApollo(
  withAuth(InstructorDashBoard, ['admin', 'instructor'])
);
