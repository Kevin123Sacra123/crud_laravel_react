import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link , useForm} from '@inertiajs/react';                                                                              

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from "@/components/ui/textarea";
import React from 'react';
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { Terminal } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'creando un producto',
        href: '/products/create',
    },
];

export default function Index() {

    const {data, setData, post, errors} = useForm({
        nombre: '',
        precio: '',
        sales: '',
        stock: '',
        categorias: '',
        descripcion: '',
    });

    const handSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('products.store'));
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Crear" />
            <div className='w-8/12 p-4'>
                <form onSubmit={handSubmit} className='space-y-4' >
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
                        <Label htmlFor="categorias">Categorias</Label>
                        <NativeSelect  value={data.categorias} onChange={(e) => setData('categorias', e.target.value)} >
                            <NativeSelectOption value="null">Selecciona una categoria</NativeSelectOption>
                            <NativeSelectOption value="Electronicos">Electrónicos</NativeSelectOption>
                            <NativeSelectOption value="Accesorios">Accesorios</NativeSelectOption>
                            <NativeSelectOption value="Audio">Audio</NativeSelectOption>
                            <NativeSelectOption value="Componentes">Componentes</NativeSelectOption>    
                        </NativeSelect>
                        <Input type='hidden' name="categorias" placeholder='Categorias' />
                    </div>

                    <div className='gap-1.5'>
                        <Label htmlFor="sales">Ventas</Label>
                        <Input type='number' name="sales" placeholder='Ventas' value={data.sales} onChange={(e) => setData('sales', e.target.value)} />
                    </div>
                    <div className='gap-1.5'>
                        <Label htmlFor="stock">Stock</Label>
                        <Input type='number' name="stock" placeholder='Stock' value={data.stock} onChange={(e) => setData('stock', e.target.value)} />
                    </div>
                    <div className='gap-1.5'>
                        <Label htmlFor="producto_descripcion">Descripcion</Label>
                        < Textarea  placeholder='Descripcion del producto' value={data.descripcion} onChange={(e) => setData('descripcion', e.target.value)} />
                    </div>
                    <Button type='submit'>Añadir producto</Button>
                    <Link href={route('products.index')} className="ml-2">  
                        <Button >Cancelar</Button>
                    </Link>

                </form>
            </div>
        </AppLayout>
    );
}
