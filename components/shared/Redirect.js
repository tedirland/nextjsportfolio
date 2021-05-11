import { useEffect } from 'react';
import { useRouter } from 'next/router';

function Redirect({ to }) {
  const router = useRouter();

  useEffect(() => {
    router.push({ pathname: to });
  }, []);
  return null;
}
export default Redirect;
