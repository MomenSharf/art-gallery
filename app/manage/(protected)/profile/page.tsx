import ProfileForm from "@/components/manage/manage-profile-page";
import { getProfile } from "@/lib/actions/get-profile";


export default async function ProfilePage() {
  const profile = await getProfile();

  return <ProfileForm profile={profile} />;
}