import Link from "next/link";
import styles from '../../../styles/Post.module.css'

/*
  1° Buscar e definir os paths
  2° Buscar e definir os dados da pagina
  3° Renderizar o conteudo
*/

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

export async function getStaticProps(ctx){

  const reqPost = await fetch(`https://jsonplaceholder.typicode.com/posts/${ctx.params.id}`)
  const resPost = await reqPost.json()

  const post = resPost

  const reqComments = await fetch(`https://dummyjson.com/comments/post/${ctx.params.id}?limit=100`)
  const resComments = await reqComments.json()

  const comments = resComments.comments

  return {
    props: {
      post: post,
      comments: comments
    },
  }
}

export default function Post({ post, comments }) {
  return (
    <main>
      <div className={styles.container}>
        <div className={styles.post}>
          <h1 className={styles.post__title}>{post.title}</h1>
          <p className={styles.post__body}>{post.body}</p>
        </div>
        <div className={styles.comments}>
          <h2 className={styles.comments_title}>Comments</h2>
          <ul className={styles.comments__list}>
            {comments?.map(comment => (
              <li key={comment.id} className={styles.comment}>
                <h4>{comment.user.username}</h4>
                <span>"{comment.body}"</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <Link href={`${post.id}/comments`}>Ir para comentarios do post</Link>
        </div>
        <div>
          <Link href={'/posts'}>Voltar para Home</Link>
        </div>
      </div>
    </main>
  );
}
