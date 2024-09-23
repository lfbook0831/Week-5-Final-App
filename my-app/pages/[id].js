import { useRouter } from 'next/router';
import fs from 'fs';
import path from 'path';

export default function Person({ person }) {
  return (
    <div className="container">
      <h1>{person.name}</h1>
      <p>{person.details}</p>
    </div>
  );
}

export async function getStaticPaths() {
  const filePath = path.join(process.cwd(), 'public/data/data.json');
  const jsonData = fs.readFileSync(filePath);
  const data = JSON.parse(jsonData);

  const paths = data.map((person) => ({
    params: { id: person.name.replace(/\s+/g, '-').toLowerCase() },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const filePath = path.join(process.cwd(), 'public/data/info.json');
  const jsonData = fs.readFileSync(filePath);
  const data = JSON.parse(jsonData);

  const person = data.find(
    (item) => item.name.replace(/\s+/g, '-').toLowerCase() === params.id
  );

  return {
    props: {
      person,
    },
  };
}
