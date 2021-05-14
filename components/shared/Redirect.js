import { useEffect } from 'react';
import { useRouter } from 'next/router';

function Redirect({ to, query }) {
  const router = useRouter();

  useEffect(() => {
    router.push({ pathname: to, query });
  }, []);
  return null;
}
export default Redirect;
