import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Form, Head, Link , useForm} from '@inertiajs/react';                                                                              

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from "@/components/ui/textarea";
import React from 'react';

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { Terminal } from 'lucide-react';
import { Props } from 'node_modules/@headlessui/react/dist/types';

interface Product{
    id: number;
    nombre: string;
    precio: number;
    descripcion: string;
}

interface Props{
    product:  Product;
}

export default function Edit({product} : Props) {

    const {data, setData, put, processing, errors} = useForm({
        nombre: product.nombre,
        precio: product.precio,
        descripcion: product.descripcion
    });

    const handUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('products.update', product.id));
    }

    return (  
        <AppLayout breadcrumbs={[{ title: 'Editando', href: `/products/${product.id}/edit` }]}>
            <Head title="Editando" />
            <div className='w-8/12 p-4'>
                <form onSubmit={handUpdate} className='space-y-4' >
                    {/*en caso de error */}
                    {Object.keys(errors).length > 0 &&(
                        <Alert>
                            <Terminal className='h-4 w-4'></Terminal>
                            <AlertTitle>Error!!!</AlertTitle>
                            <AlertDescription>
                                <ul>
                                    {Object.entries(errors).map(([key, message]) => (
                                        <li key={key}>{message as string}</li>
                                    ))}
                                </ul>
                            </AlertDescription>                       
                        </Alert>                                                                                        
                    )}

                    <div className='gap-1.5'>
                        <Label htmlFor="nombre_producto">Nombre</Label>
                        <Input name="nombre_producto" placeholder='nombre del producto' value={data.nombre} onChange={(e) => setData('nombre', e.target.value)} />
                    </div>
                    <div className='gap-1.5'>
                        <Label htmlFor="precio">Precio</Label>
                        <Input name="precio" placeholder='Precio' value={data.precio} onChange={(e) => setData('precio', e.target.value)} />
                    </div>
                    <div className='gap-1.5'>
                        <Label htmlFor="producto_descripcion">Descripcion</Label>
                        < Textarea  placeholder='Descripcion del producto' value={data.descripcion} onChange={(e) => setData('descripcion', e.target.value)} />
                    </div>
                    <Button disabled={processing } type='submit'>Actualizar producto</Button>
                </form>
            </div>
        </AppLayout>
    );
}
