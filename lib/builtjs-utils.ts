/* eslint-disable @typescript-eslint/no-explicit-any */
import dynamic from "next/dynamic";

type ComponentMap = Record<string, Promise<{ default: React.ComponentType<any> }>>;

export async function getComponentMap(sections: any): Promise<ComponentMap> {
  const map: ComponentMap = {};
  for (let i = 0; i < sections.length; i++) {
    if (!sections[i].template) {
      continue;
    }
    const section = sections[i];
    const template = section.template.doc;
    const templateFileName = template.name.replace(/[A-Z]/g, function (match: string) {
      return '-' + match.toLowerCase();
    });
    map["section" + i] = import(
      `./../components${section.namespace ? `/plugins/${section.namespace}` : ''}/templates/${template.category}/${templateFileName}.tsx`
    );
  }
  return map;
}

export function getComponents(sections: any): Promise<React.ComponentType<any>[]> {
  return new Promise((resolve) => {
    getComponentMap(sections).then((map: ComponentMap) => {
      const comps: React.ComponentType[] = [];
      for (const key of Object.keys(map)) {
        const comp = dynamic(() => map[key], {
          loading: () => null
        });
        comps.push(comp);
      }
      resolve(comps);
    });
  });
}

export const widthForImage = (source: any) => source?.width;

export const heightForImage = (source: any) => source?.height;

export const collectionSlug = (entry: any) =>
  entry._type ? entry._type.replace(/[A-Z]/g, (letter: any) => `-${letter.toLowerCase()}`) : '';

export const entrySlug = (entry: any) => entry && entry.slug && entry.slug.current ? entry.slug.current : entry.slug;
