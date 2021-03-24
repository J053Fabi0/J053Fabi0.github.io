import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import styles from "../../styles/Home.module.scss";

export async function getServerSideProps() {
  // Esta función se corre cada vez, es decir que el servidor
  // hace una petición a la base de datos

  const { data } = await axios
    .get("https://dummyapi.io/data/api/user?limit=10", {
      headers: { "app-id": "6011f27d538b828b65127ff9" },
    })
    .catch((err) => err);

  return { props: { users: data } };
}

export default function Users(props) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Users</title>
      </Head>

      <main className={styles.main}>
        <h1>On Users</h1>

        {props.users.data.map((u) => (
          <div className={styles.links}>
            <Link href={"/users/" + u.id}>
              <a>{`${u.firstName} ${u.lastName}`}</a>
            </Link>
          </div>
        ))}

        <div className={styles.links}>
          <Link href="/..">
            <a>Back</a>
          </Link>
        </div>
      </main>
    </div>
  );
}
