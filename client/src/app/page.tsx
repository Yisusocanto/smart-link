import UrlForm from "@/components/feature/UrlForm";

function Home() {
  return (
    <div className="w-3/6 mx-auto">
      <div className="mt-50 mb-10 text-center">
        <h1 className="text-6xl font-bold mb-2">Simplify your digital reach</h1>
        <p className="text-muted">
          Paste a long URL to shorten it instantly. Track clicks ans analyze
          your audience with precision.
        </p>
      </div>
      <UrlForm />
    </div>
  );
}

export default Home;
