import type {Metadata} from 'next';
import Homepage from './Homepage';
type Props={searchParams:Promise<{lang?:string}>};
export async function generateMetadata({searchParams}:Props):Promise<Metadata>{const sw=(await searchParams).lang==='sw';return {title:sw?'BM Contractors — Mapitio ya muundo':'BM Contractors — Homepage design review',description:sw?'Muundo wa tovuti wa huduma za usalama, uhandisi na teknolojia.':'A considered website for security, engineering and technology.',robots:{index:false,follow:false}}}
export default async function Page({searchParams}:Props){return <Homepage lang={(await searchParams).lang==='sw'?'sw':'en'}/>}
