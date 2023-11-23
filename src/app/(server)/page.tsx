import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import { ModeToggle } from "@/components/mood-toggle";
import { initialProfile } from "@/lib/initial-profile";
import db from "@/lib/db";
import { redirect } from "next/navigation";

export default async function Home() {
  const profile = await initialProfile();

  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (server) {
    redirect(`/server/${server.id}`);
  }

  return (
    <main className="flex min-h-screen justify-start gap-6 p-14">
      Home
      <div>
        <UserButton afterSignOutUrl="/" />
      </div>
      <div>
        <ModeToggle />
      </div>
      <div>create a new server</div>
    </main>
  );
}
