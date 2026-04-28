import HomepageAdmin from './HomepageAdmin';

export const metadata = {
  title: "Configuration page d'accueil · Admin",
};

export default function HomepageAdminPage() {
  return (
    <div className="min-h-screen bg-[#0f0606] p-6 md:p-8">
      <HomepageAdmin />
    </div>
  );
}
