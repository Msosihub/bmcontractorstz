import { destinations, navigationGroups } from "./registry";
import type { Destination, NavItem, ResolvedGroup } from "./types";
export const destinationById = new Map(destinations.map(d=>[d.id,d]));
export function isVisible(d:Destination, unpublished:ReadonlySet<string>) {
  return d.status === "published" && d.visibility === "public" && !!d.href && !d.serviceSlugs.some(s=>unpublished.has(s));
}
export function resolveNavigation(unpublished:ReadonlySet<string>):ResolvedGroup[] {
  const item=(i:NavItem)=>{const d=destinationById.get(i.destination);return d&&isVisible(d,unpublished)?{...d,title:i.title||d.title,description:i.description}:null};
  return navigationGroups.flatMap(group=>{
    const directory=item({destination:group.directory});if(!directory)return [];
    const sections=group.sections.map(s=>({...s,items:s.items.flatMap(i=>{const d=item(i);return d?[d]:[]})})).filter(s=>s.items.length);
    if(!sections.length)return [];
    const feature=group.feature&&item({destination:group.feature.destination});
    return [{...group,directory,sections,feature:group.feature&&feature?{...group.feature,destination:feature}:undefined}];
  });
}
export function destinationTrail(id:string,unpublished:ReadonlySet<string>):Destination[] {
  const trail:Destination[]=[],seen=new Set<string>();let current=destinationById.get(id);
  while(current){if(seen.has(current.id))throw Error("Navigation parent cycle");seen.add(current.id);if(isVisible(current,unpublished))trail.unshift(current);current=current.parentId?destinationById.get(current.parentId):undefined;}
  return trail;
}
