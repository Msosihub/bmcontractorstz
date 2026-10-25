import Link from 'next/link';
import type {Metadata} from 'next';
export const metadata:Metadata={title:'Private Preview — notifications disabled',robots:{index:false,follow:false}};
export default function NotificationsDisabled(){return <main className="mx-auto max-w-2xl p-8"><h1 className="text-2xl font-bold">Private Preview</h1><p className="mt-4">SMS and WhatsApp notifications are disabled in this test environment. Use synthetic details in the website forms.</p><p className="mt-4" lang="sw">Huu ni mfumo wa majaribio. Ujumbe wa SMS na WhatsApp hautumwi. Tumia taarifa za kubuni katika fomu za tovuti.</p><Link className="mt-6 inline-block underline" href="/">Return to website / Rudi kwenye tovuti</Link></main>}
