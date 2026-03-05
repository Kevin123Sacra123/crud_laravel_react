import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head,Link , usePage,useForm } from '@inertiajs/react';

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Megaphone, Trash , PencilLine } from 'lucide-react';      

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'administrador',
        href: '/products/dashboard',
    },
    {
        title: 'Productos',
        href: '/products',
    },
];

interface Product{
    id: number;
    nombre: string;
    precio: number;
    sales: number;
    stock: number;
    categorias: string;
    descripcion: string;
}

interface PageProps {
    flash: {
        message?: string
    }
    products: Product[];
}

export default function Index() {
    const {products, flash } = usePage().props as PageProps;

    const {processing, delete:destroy} = useForm();

    const handleDelete = (id:number, nombre: string) => {
        if(confirm('¿Seguro que quieres eliminar el producto? \n' + nombre)) {
            destroy(route('products.destroy', id));
        }
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products" />
            <div className='m-4'>
                <Link href={route('products.create')}><Button>crear un producto</Button></Link>
            </div>
            <div className='m-4'>
                <div>
                    {flash.message && (
                        <Alert>
                            <Megaphone className='h-4 w-4'></Megaphone>
                            <AlertTitle>Notificación</AlertTitle>
                            <AlertDescription>{flash.message}</AlertDescription>
                        </Alert>
                    )}
                </div>
            </div>
            <h1 className='text-center py-5'>Lista de productos</h1>
            {products.length > 0 &&(
                <Table>
                    <TableCaption></TableCaption>
                    <TableHeader>
                        <TableRow>
                        <TableHead className="w-[100px]">ID</TableHead>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Precio</TableHead>
                        <TableHead className="text-left">Stock</TableHead>
                        <TableHead className="text-left">Ventas</TableHead>
                        <TableHead className="text-left">Categorías</TableHead>
                        <TableHead className="text-left">Descripción</TableHead>
                        <TableHead className="text-center">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {products.map((product) => (
                        <TableRow>
                            <TableCell className="font-medium">{product.id}</TableCell>
                            <TableCell>{product.nombre}</TableCell>
                            <TableCell>{product.precio}</TableCell>
                            <TableCell>{product.stock}</TableCell>
                            <TableCell>{product.sales}</TableCell>
                            <TableCell>{product.categorias}</TableCell>
                            <TableCell>{product.descripcion}</TableCell>
                            <TableCell className='flex gap-3.5 justify-center items-center'>
                                <Link href={route('products.edit', product.id)}><Button className='bg-slate-600 hover:bg-slate-700'> <PencilLine/> </Button></Link>
                                <Button disabled={processing} onClick={() => handleDelete(product.id, product.nombre)} className='bg-red-500 hover:bg-red-700'> <Trash/> </Button>
                            </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>

            )}
        
        </AppLayout>
    );
}
