"use client";

import React from "react";
import * as Icons from "lucide-react";

export default function List1({ content }: any) {
  if (!content) return <></>;
  const { collections = {} } = { ...content };

  const LucideIcon = ({
    name,
    className,
  }: {
    name: string;
    className?: string;
  }) => {
    const Icon = Icons[name as keyof typeof Icons] as React.ElementType;
    return Icon ? <Icon className={className} /> : null;
  };

  return (
    <section id="list2" className="py-16 bg-white">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {collections["feature"] &&
            collections["feature"].map((feature: any, index: number) => (
              <div
                key={index}
                className="flex flex-col items-center p-6 text-center"
              >
                <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-primary/10">
                  <LucideIcon
                    name={feature.icon}
                    className="w-8 h-8 text-primary"
                  />
                </div>
                <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
