import CommunicationAdmin from './CommunicationAdmin';
import { getCommunicationAdminData } from '@/lib/event-communication';

export const metadata = { title: 'Communication · Admin Level Up' };

export default async function CommunicationPage() {
  const data = await getCommunicationAdminData('fr');

  return <CommunicationAdmin initialSettings={data.settings} events={data.events} />;
}