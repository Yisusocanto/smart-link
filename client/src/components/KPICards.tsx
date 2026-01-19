import { linkStats } from "@/services/linkService";
import { Card } from "@heroui/react";
import { Activity, Link, MousePointerClick } from "lucide-react";
import { cookies } from "next/headers";

async function KPICards() {
  const cookieStore = await cookies();
  const data = await linkStats(cookieStore.toString());
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
      <Card className="w-full px-4 py-6 md:px-8 md:py-8 flex flex-row justify-between border">
        <div className="flex flex-col items-center">
          <h1 className="text-muted text-xs md:text-sm">TOTAL LINKS</h1>
          <p className="text-3xl md:text-4xl font-bold">{data.totalLinks}</p>
        </div>
        <div className="flex items-center p-4 md:p-5 rounded-2xl bg-accent/10">
          <Link size={20} />
        </div>
      </Card>
      <Card className="w-full px-4 py-6 md:px-8 md:py-8 flex flex-row justify-between border">
        <div className="flex flex-col items-center">
          <h1 className="text-muted text-xs md:text-sm">TOTAL ACTIVE LINKS</h1>
          <p className="text-3xl md:text-4xl font-bold">
            {data.totalActiveLinks}
          </p>
        </div>
        <div className="flex items-center p-4 md:p-5 rounded-2xl bg-purple-500/10">
          <Activity size={20} />
        </div>
      </Card>
      <Card className="w-full px-4 py-6 md:px-8 md:py-8 flex flex-row justify-between border sm:col-span-2 lg:col-span-1">
        <div className="flex flex-col items-center">
          <h1 className="text-muted text-xs md:text-sm">TOTAL CLICKS</h1>
          <p className="text-3xl md:text-4xl font-bold">{data.totalClicks}</p>
        </div>
        <div className="flex items-center p-4 md:p-5 rounded-2xl bg-green-500/10">
          <MousePointerClick size={20} />
        </div>
      </Card>
    </div>
  );
}

export default KPICards;
