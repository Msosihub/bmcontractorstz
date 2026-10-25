import type {Metadata} from 'next';
import {headers} from 'next/headers';
import './globals.css';
export const metadata:Metadata={robots:{index:false,follow:false},title:'BM Contractors — Private design review'};
export default async function Layout({children}:{children:React.ReactNode}){const h=await headers();return <html lang={h.get('x-preview-language')==='sw'?'sw':'en'}><body>{children}</body></html>}
