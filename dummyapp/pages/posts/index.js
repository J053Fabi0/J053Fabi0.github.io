import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import styles from "../../styles/Home.module.scss";

export async function getStaticProps() {
  // Aquí puedo hacer llamadas a API y pasar el resultado como props
  // Cuándo: BuildTime, o sea que los datos de post se sacan
  // cuando se hace build, y no cada vez que se necesitan

  const { data } = await axios
    .get("https://dummyapi.io/data/api/post?limit=10", {
      headers: { "app-id": "6011f27d538b828b65127ff9" },
    })
    .catch((err) => err);

  return { props: { posts: data } };
}

export default function Posts(props) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Posts</title>
      </Head>
      <main className={styles.main}>
        <h1>On Posts</h1>
        <div className={styles.links}>
          <Link href="/..">
            <a>Back</a>
          </Link>
        </div>
        {props.posts.data.map((e) => (
          <li>{e.text}</li>
        ))}
      </main>
    </div>
  );
}
