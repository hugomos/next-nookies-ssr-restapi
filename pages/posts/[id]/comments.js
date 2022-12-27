import Link from "next/link";
import { useRouter } from "next/router";

export async function getStaticPaths(){

  const res = await fetch('https://jsonplaceholder.typicode.com/posts')
  const posts = await res.json()

  const paths = posts?.map(post => (
    { params: { id: `${post.id}`}}
  ))

  return {
    paths: paths,
    fallback: false // false or 'blocking'
  }
}

export default function Comentarios({comments}) {
  const router = useRouter();

  return (
    <div>
      <h3>comentarios do post com id: {router.query.id}</h3>
      
        <li>
          <Link href={`/posts/${router.query.id}`}>Ir para o post</Link>
        </li>
        <li>
          <Link href="/">Ir para a home</Link>
        </li>
      </ul>
    </div>
  );
}
