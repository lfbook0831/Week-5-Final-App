import Link from 'next/link';
import fs from 'fs';
import path from 'path';

export default function Home({ people }) {
  return (
    <div className="container py-5" style={{ backgroundColor: '#ffe0e0' }}>
      <main>
      <h1 className="text-center" style={{ fontFamily: 'Pacifico, cursive', fontSize: '4rem', marginBottom: '2rem' }}>
  LIBRA SZN
</h1>
        <ul className="list-group">
          {people.map((person, index) => (
            <li key={index} className="list-group-item">
              <Link href={`/${person.name.replace(/\s+/g, '-').toLowerCase()}`}>
                {person.name}
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'public/data/data.json');
  const jsonData = fs.readFileSync(filePath);
  const people = JSON.parse(jsonData);

  return {
    props: {
      people,
    },
  };
}
