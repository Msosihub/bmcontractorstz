import {NextResponse,type NextRequest} from 'next/server';
export function proxy(request:NextRequest){const headers=new Headers(request.headers);headers.set('x-preview-language',request.nextUrl.searchParams.get('lang')==='sw'?'sw':'en');return NextResponse.next({request:{headers}});}
