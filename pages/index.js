import DefaultLayout from "interface/DefaultLayout";

function Home() {
  return (
    <DefaultLayout
      metadata={{
        description:
          'Um espaço para aqueles que entendem que "não é só um jogo".',
      }}
    >
      <h1>
        🎮️ Um espaço para aqueles que entendem que &quot;não é só um jogo&quot;.
      </h1>
    </DefaultLayout>
  );
}

export default Home;
