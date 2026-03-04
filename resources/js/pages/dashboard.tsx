import { Head ,Link , usePage, useForm } from '@inertiajs/react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"
import { useState } from "react";
import ProductList from './Products/components/ProductList';
import { Input } from '@/components/ui/input';
import {products} from './Products/data/products';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Administrador',
    href: '/dashboard',
  },  
  {
    title: 'Productos',
    href: '/products',
  },

];

export default function Dashboard() {
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState("asc");

  const filteredProducts = products
    .filter(p =>
      (min === "" || p.precio >= min) &&
      (max === "" || p.precio <= max) &&
      p.nombre.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) =>
      order === "asc" ? a.precio - b.precio : b.precio - a.precio
    );

  const total = filteredProducts.length;
  const prices = filteredProducts.map(p => p.precio);

  const average =
    prices.length > 0
      ? (prices.reduce((a, b) => a + b, 0) / prices.length).toFixed(2)
      : 0;

  const maxProduct =
    total > 0
      ? filteredProducts.reduce((a, b) =>
        a.precio > b.precio ? a : b
      )
      : null;

  const minProduct =
    total > 0
      ? filteredProducts.reduce((a, b) =>
        a.precio < b.precio ? a : b
      )
      : null;

  const getcolorByPrice = (precio) => {
    if (precio <= 200) return "#4caf50";
    if (precio <= 1000) return "#ff9800";
    return "#f44336";

  };


  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Administrador" />
      <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
        <div>
          <div >
            <h1 className='text-center p-7'>Filtros Avanzados de Precio</h1>
            {/*ESTADISTICAS*/}
            <div className='grid gap-4 mb-5 ' style={{gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))"}} >
              <div className='p-4 border border-solid rounded-3xl' style={{border: "1px solid #ccc" }}>
                <strong> Total productos</strong>
                <p>{total}</p>
              </div>
              <div className='p-4 border border-solid rounded-3xl' style={{border: "1px solid #ccc" }}>
                <strong>Precio promedio</strong>
                <p>S/ {average}</p>
              </div>
              {total > 0 && (
                <>
                  <div className='p-4 border border-solid rounded-3xl' style={{border: "1px solid #ccc" }}>
                    <strong>Mas barato</strong>
                    <p>{minProduct.nombre} - S/{minProduct.precio}</p>
                  </div>

                  <div className='p-4 border border-solid rounded-3xl' style={{border: "1px solid #ccc" }}>
                    <strong> Mas caro</strong>
                    <p>{maxProduct.nombre} - S/{maxProduct.precio}</p>
                  </div>
                </>
              )}
            </div>
            {/*FILTROS */}
            <div className='mb-5' >
              <div className='flex gap-2 items-center justify-center m-3'> 
                <Input type="number" placeholder="Precio mínimo" value={min} onChange={e => setMin(e.target.value)} />
                <Input type="number" placeholder="Precio máximo" value={max} onChange={e => setMax(e.target.value)} />
                <Input type="text" placeholder="Buscar producto" value={search} onChange={e => setSearch(e.target.value)} />
              </div>
                <NativeSelect value={order} onChange={e => setOrder(e.target.value)} className="ml-2.5" >
                  <NativeSelectOption value="asc">Más barato → más caro</NativeSelectOption>
                  <NativeSelectOption value="desc">Más caro → más barato</NativeSelectOption>
                </NativeSelect>
            </div>

            <ProductList items={filteredProducts} />
            <h2> Estadisticas de precios(barras)</h2>

            <div className='flex items-end gap-2.5 p-2.5 h-52 border border-solid border-gray-200 m-5' >
              {filteredProducts.map(product => (
                <div key={product.id} style={{ textAlign: "center" }}>
                  {/*PRECIO */}
                  <small className='block mb-1' >
                    S/ {product.precio}
                  </small>

                  {/*BARRA */}
                  <div className='w-10 rounded-md '
                    style={{
                      height: product.precio / 32,
                      backgroundColor: "#4CAF50",
                      backgroundColor: getcolorByPrice(product.precio),
                      margin: "0 auto 5px",
                    }}
                  />
                  {/*NOMBRE*/}
                  <small> {product.nombre}</small>

                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
