import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../../lib/firebase-app';

export default function Person({ person }) {
  return (
    <div className="container">
      <h1>{person.name}</h1>
      <p>{person.details}</p>
    </div>
  );
}

export async function getStaticPaths() {
  const personsCollectionRef = collection(db, "persons");
  const personsSnapshot = await getDocs(personsCollectionRef);
  const people = personsSnapshot.docs.map(doc => doc.data());

  const paths = people.map(person => ({
    params: { id: person.name.replace(/\s+/g, '-').toLowerCase() },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const personsCollectionRef = collection(db, "persons");
  const personsSnapshot = await getDocs(personsCollectionRef);
  const people = personsSnapshot.docs.map(doc => doc.data());

  const person = people.find(
    (item) => item.name.replace(/\s+/g, '-').toLowerCase() === params.id
  );

  return {
    props: {
      person,
    },
  };
}
