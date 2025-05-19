/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import Image from "next/image";
import { entrySlug } from "@/lib/builtjs-utils";

export default function Cover1({ content }: any) {
  if (!content) return <></>;
  const { collections = null } = { ...content };
  const categories = collections["category"];
  const products = collections["product"];
  return (
    <section id="cover1" className="relative flex-1 bg-gray-50">
      <div className="container mx-auto min-h-[calc(100vh-5rem)] flex flex-col lg:flex-row items-center gap-4 px-4 py-6">
        {/* Left Column - Text Content */}
        <div className="flex-1 text-center lg:text-left lg:max-w-[45%]">
          <h1 className="mb-3 text-3xl font-bold leading-tight lg:text-5xl lg:mb-4">
            Elevate Your Style with Premium Sportswear
          </h1>
          <p className="max-w-2xl mb-4 text-base text-gray-600 lg:text-lg lg:mb-6">
            Discover our collection of premium athletic wear designed for
            performance and style. From innovative footwear to comfortable
            apparel, find your perfect fit.
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
            <div className="flex w-64 h-12 overflow-hidden border divide-x rounded-lg">
              {categories &&
                categories.map((category: any, index: number) => (
                  <Link
                    key={index}
                    href={`/products/${category._id}`}
                    className="flex items-center justify-center w-1/3 text-gray-500 transition duration-100 hover:bg-gray-100 active:bg-gray-200"
                  >
                    {category.name}
                  </Link>
                ))}
            </div>
          </div>
        </div>

        {/* Right Column - Featured Products Grid */}
        <div className="flex-1 w-full lg:max-w-[45%]">
          <div className="relative grid h-full grid-cols-2 gap-2 lg:gap-3">
            {products.slice(0, 3).map((product: any, index: number) => (
              <Link
                href={`/product/${entrySlug(product)}`}
                key={index}
                className={`relative rounded-lg overflow-hidden ${
                  index === 0
                    ? "col-span-2 row-span-2 aspect-[16/9] lg:aspect-[16/10]"
                    : "aspect-square"
                }`}
              >
                <Image
                  src={product.image.url}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                  sizes={
                    index === 0
                      ? "(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
                      : "(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  }
                  priority={index === 0}
                />
                <div className="absolute inset-0 flex items-end p-4 transition-opacity duration-300 opacity-0 bg-black/20 hover:opacity-100">
                  <span className="text-lg font-semibold text-white">
                    {product.name}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
