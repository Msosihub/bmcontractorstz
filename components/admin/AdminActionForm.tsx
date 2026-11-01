"use client";
import {createContext,useContext,useRef,useState} from "react";
const ActionPending=createContext<boolean|undefined>(undefined);
export function useAdminActionPending(){return useContext(ActionPending);}
/** Complete the mutation before requesting a fresh document. A document refresh also clears stale RSC form state. */
export function AdminActionForm({action,children,className}:{action:(data:FormData)=>Promise<void>;children:React.ReactNode;className?:string}){
 const lock=useRef(false);const [busy,setBusy]=useState(false);const [error,setError]=useState("");const [saved,setSaved]=useState(false);
 return <ActionPending.Provider value={busy}><form className={className} aria-busy={busy} onSubmit={async event=>{event.preventDefault();if(lock.current)return;const data=new FormData(event.currentTarget);lock.current=true;setBusy(true);setError("");setSaved(false);let success=false;try{await action(data);setSaved(true);success=true;}catch{setError("Could not save. Please try again, or sign in again if your session expired.");}finally{lock.current=false;setBusy(false);}if(success)window.location.reload();}}>{children}{error?<p role="alert" className="mt-2 text-xs text-red-700">{error}</p>:null}{saved?<span role="status" className="sr-only">Saved.</span>:null}</form></ActionPending.Provider>;
}
