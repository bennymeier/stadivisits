import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import dbConnect from '../../lib/dbConnect';
import Stadium from '../../models/Stadium';

const StadiumPage = ({ stadium }) => {
  const router = useRouter();
  const [message, setMessage] = useState('');
  const handleDelete = async () => {
    const stadiumID = router.query.id;

    try {
      await fetch(`/api/stadiums/${stadiumID}`, {
        method: 'Delete',
      });
      router.push('/');
    } catch (error) {
      setMessage('Failed to delete the stadium.');
    }
  };

  return (
    <div key={stadium._id}>
      <div className="card">
        <img src={stadium.image_url} />
        <h5 className="stadium-name">{stadium.name}</h5>
        <div className="main-content">
          <p className="stadium-name">{stadium.name}</p>
          <p className="owner">Owner: {stadium.owner_name}</p>

          <div className="btn-container">
            <Link href="/[id]/edit" as={`/${stadium._id}/edit`} legacyBehavior>
              <button className="btn edit">Edit</button>
            </Link>
            <button className="btn delete" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>
      {message && <p>{message}</p>}
    </div>
  );
};

export async function getServerSideProps({ params }) {
  await dbConnect();

  const stadium = await Stadium.findById(params.id).lean();
  stadium._id = stadium._id.toString();

  return { props: { stadium } };
}

export default StadiumPage;
