import { linkStats } from "@/services/linkService";
import { Card } from "@heroui/react";
import { Activity, Link, MousePointerClick } from "lucide-react";
import { cookies } from "next/headers";

async function KPICards() {
  const cookieStore = await cookies();
  const data = await linkStats(cookieStore.toString());
  return (
    <div className="flex gap-2 justify-between">
      <Card className="w-full px-8 py-8 flex flex-row justify-between border">
        <div className="flex flex-col items-center">
          <h1 className="text-muted">TOTAL LINKS</h1>
          <p className="text-4xl font-bold">{data.totalLinks}</p>
        </div>
        <div className="flex items-center p-5 rounded-2xl bg-accent/10">
          <Link size={20} />
        </div>
      </Card>
      <Card className="w-full px-8 py-8 flex flex-row justify-between border">
        <div className="flex flex-col items-center">
          <h1 className="text-muted">TOTAL ACTIVE LINKS</h1>
          <p className="text-4xl font-bold">{data.totalActiveLinks}</p>
        </div>
        <div className="flex items-center p-5 rounded-2xl bg-purple-500/10">
          <Activity size={20} />
        </div>
      </Card>
      <Card className="w-full px-8 py-8 flex flex-row justify-between border">
        <div className="flex flex-col items-center">
          <h1 className="text-muted">TOTAL CLICKS</h1>
          <p className="text-4xl font-bold">{data.totalClicks}</p>
        </div>
        <div className="flex items-center p-5 rounded-2xl bg-green-500/10">
          <MousePointerClick size={20} />
        </div>
      </Card>
    </div>
  );
}

export default KPICards;
