import LinkCard from "@/components/LinkCard";
import UrlForm from "@/components/UrlForm";
import { recentLinks } from "@/services/linkService";
import { Link } from "@/types/Link";
import { cookies } from "next/headers";
import { BACKEND_URL } from "@/constants/backURL";

async function Home() {
  const cookieStore = await cookies();
  let recentLinksArray: Link[] | [] = [];
  try {
    const data = await recentLinks(cookieStore.toString());
    recentLinksArray = data.recentLinks;
  } catch (error) {
    return;
  }
  return (
    <div className="w-3/4 mx-auto py-20">
      <div className="mt-30 mb-10 text-center">
        <h1 className="text-6xl font-bold mb-2">
          Simplify your <strong className="text-accent">digital</strong> reach
        </h1>
        <p className="text-muted">
          Paste a long URL to shorten it instantly. Track clicks ans analyze
          your audience with precision.
        </p>
      </div>
      <UrlForm />
      {recentLinksArray.length >= 1 && (
        <div className="flex flex-col mt-15">
          <h2 className="text-3xl font-bold text-center mb-5">Recent Links</h2>
          <div className="flex flex-col gap-4">
            {recentLinksArray.map((link) => (
              <LinkCard
                key={link._id}
                link={link}
                BACKEND_URL={BACKEND_URL ?? ""}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
