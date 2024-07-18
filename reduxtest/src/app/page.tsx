import ReduxTesting from "@/components/posts/ReduxTesting";

export default async function Home() {
  return (
    <>
      {" "}
      <main className="flex min-h-screen flex-col items-center space-y-10 p-24">
        <ReduxTesting />
      </main>
    </>
  );
}
