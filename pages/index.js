import Link from 'next/link';
import dbConnect from '../lib/dbConnect';
import Stadium from '../models/Stadium';

const Index = ({ stadiums }) => (
  <>
    {stadiums.map((stadium) => (
      <div key={stadium._id}>
        <div className="card">
          <img src={stadium.image_url} />
          <h5 className="stadium-name">{stadium.name}</h5>
          <div className="main-content">
            <p className="stadium-name">{stadium.name}</p>
            <p className="owner">Owner: {stadium.owner_name}</p>
            <div className="btn-container">
              <Link
                href="/[id]/edit"
                as={`/${stadium._id}/edit`}
                legacyBehavior
              >
                <button className="btn edit">Edit</button>
              </Link>
              <Link href="/[id]" as={`/${stadium._id}`} legacyBehavior>
                <button className="btn view">View</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    ))}
  </>
);

/* Retrieves stadium(s) data from mongodb database */
export async function getServerSideProps() {
  await dbConnect();

  /* find all the data in our database */
  const result = await Stadium.find({});
  const stadiums = result.map((doc) => {
    const stadium = doc.toObject();
    stadium._id = stadium._id.toString();
    return stadium;
  });

  return { props: { stadiums: stadiums } };
}

export default Index;
