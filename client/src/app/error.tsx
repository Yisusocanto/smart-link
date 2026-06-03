"use client";

function error({ error }: { error: Error & { digest?: string } }) {
  return (
    <div className="text-center mt-40">
      <h1 className="text-4xl font-bold">An error ocurred</h1>
      <p className="text-lg text-muted">
        Error: {error.message}
      </p>
    </div>
  );
}

export default error;
