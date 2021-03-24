import axios from "axios";
import Head from "next/head";
import Link from "next/link";
// import { useRouter } from "next/router";
import styles from "../../styles/Home.module.scss";

export async function getServerSideProps({ query: { user } }) {
  const { data } = await axios
    .get(`https://dummyapi.io/data/api/user/${user}`, {
      headers: { "app-id": "6011f27d538b828b65127ff9" },
    })
    .catch((e) => e);

  return { props: { user: data } };
}

export default function Post({ user }) {
  // const { query: { user: userID } } = useRouter();

  return (
    <div className={styles.container}>
      <Head>
        <title>Users</title>
      </Head>

      <h2>Perfil</h2>

      <h3>{user.firstName + " " + user.lastName}</h3>

      <div className={styles.links}>
        <Link href="/users">
          <a>Back</a>
        </Link>
      </div>
    </div>
  );
}
