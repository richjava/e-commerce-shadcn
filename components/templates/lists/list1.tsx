"use client";

import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { widthForImage, heightForImage, entrySlug } from "@/lib/builtjs-utils";

export default function List1({ content, api }: any) {
  const [category, setCategory] = useState<any>(null);
  const [products, setProducts] = useState<any>([]);
  const { fetchEntry = null } = { ...api };
  const hasFetched = useRef(false);
  const params = useParams<{ category: string }>();

  useEffect(() => {
    async function fetchData() {

      if (params && params.category && !category) {
        const cat = await fetchEntry("category", [{ _id: params.category }]);
        if(cat){
          setCategory(cat);
        }
        if(content.collections && content.collections['product']){
          setProducts(content.collections['product']);
        }
        // NOTE: We're getting the product data via the api here, but er can also get it
        // like this:
        // const productsData = await fetchEntries("product", [{ category: params.category }], ["images"]);
        // debugger
        // if(productsData && productsData.entries){
        //   setProducts(productsData.entries);
        // }
      }
    }
    if (!hasFetched.current) {
      hasFetched.current = true;
      fetchData();
    }
  }, []);
  if (!content) return <></>;

  return (
    <section id="productCategoryListLanding" className="py-10 min-h-[520px]">
      <div className="max-w-2xl px-4 mx-auto sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="flex items-center justify-between">
          {category && (
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              Our Products for {category.name}
            </h2>
          )}
        </div>

        <div className="grid grid-cols-1 mt-6 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products && products.map((product: any, i: number) => (
            <div key={i} className="relative group">
              <div className="w-full overflow-hidden bg-gray-200 rounded-md aspect-square group-hover:opacity-75 lg:h-80">
                <Link href={`/product/${entrySlug(product)}`}>
                  <Image
                    src={product.images[0].url}
                    width={widthForImage(product?.images[0])}
                    height={heightForImage(product?.images[0])}
                    alt="Product image"
                    className="object-cover object-center w-full h-full lg:h-full lg:w-full"
                    priority
                  />
                </Link>
              </div>
              <div className="flex justify-between mt-4">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <Link href={`/product/${entrySlug(product)}`}>
                      {product.name}
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {category.name}
                  </p>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  ${product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
