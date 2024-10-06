import Link from 'next/link';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase-app";

export async function getStaticProps() {
  const personsCollectionRef = collection(db, "persons");
  const personsSnapshot = await getDocs(personsCollectionRef);
  const people = personsSnapshot.docs.map((doc) => doc.data());

  return {
    props: {
      people,
    },
  };
}

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
