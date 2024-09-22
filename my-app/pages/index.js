import Head from 'next/head';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home({ people }) {
  return (
    <div className="container py-5" style={{ backgroundColor: '#ffe0e0' }}>
      <Head>
        <title>Libra SZN</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap" rel="stylesheet" />
      </Head>

      <main>
        <h1 className="text-center" style={{ fontFamily: 'Pacifico, cursive', fontSize: '4rem', marginBottom: '2rem' }}>
          LIBRA SZN
        </h1>
        <ul className="list-group">
          {people.map((person, index) => (
            <li key={index} className="list-group-item">
              {person.name} - {person.date}
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const res = await fetch(`${process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : ''}/data/data.json`);
  const people = await res.json();
  return {
    props: {
      people,
    },
  };
}
