import Head from 'next/head';

export default function Home({ people }) {
  return (
    <div className="container py-5" style={{ backgroundColor: '#ffe0e0' }}>
      <Head>
        <title>Libra SZN</title>
      </Head>

      <main>
        <h1 className="text-center" style={{ fontFamily: 'Pacifico, cursive', fontSize: '4rem', marginBottom: '2rem' }}>
          LIBRA SZN
        </h1>
        <ul className="list-group">
          {people && people.length > 0 ? (
            people.map((person, index) => (
              <li key={index} className="list-group-item">
                {person.name} - {person.date}
              </li>
            ))
          ) : (
            <li className="list-group-item">No data available</li>
          )}
        </ul>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL ? '' : 'http://localhost:3000'}/data/data.json`);
  const people = await res.json();
  return {
    props: {
      people,
    },
  };
}
