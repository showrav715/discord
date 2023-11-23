import { currentUser, redirectToSignIn } from "@clerk/nextjs";
import db from "@/lib/db";
export const initialProfile = async () => {
  const user = await currentUser();

  if (!user) {
    redirectToSignIn();
  }

  const profile = await db.profile.findUnique({
    where: {
      userId: user?.id,
    },
  });

  if (profile) {
    return profile;
  }

  const createProfile = await db.profile.create({
    data: {
      userId: user?.id as string,
      name: `${user?.firstName} ${user?.lastName}`,
      email: user?.emailAddresses[0].emailAddress as string,
      imageUrl: user?.imageUrl as string,
    },
  });

  return createProfile;
};
