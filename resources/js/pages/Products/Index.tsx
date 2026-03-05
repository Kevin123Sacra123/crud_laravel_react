import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage,useForm } from '@inertiajs/react';
import { useState } from 'react';

import { FileDown } from 'lucide-react';
import CreateProductModal from './Create';
import EditProductModal from './Edit';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

import {
  Table,
  TableBody,
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

    // Función para exportar
    const handleExport = () => {
        // Usamos window.open para que el navegador maneje la descarga del stream
        window.open(route('products.export'), '_blank');
    };

    // --- ESTADO PARA LA EDICIÓN ---
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const handleEditClick = (product: Product) => {
        setSelectedProduct(product);
        setIsEditOpen(true);
    };

    const handleDelete = (id:number, nombre: string) => {
        if(confirm('¿Seguro que quieres eliminar el producto? \n' + nombre)) {
            destroy(route('products.destroy', id));
        }
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Productos" />

            {selectedProduct && (
                <EditProductModal 
                    product={selectedProduct} 
                    open={isEditOpen} 
                    setOpen={setIsEditOpen} 
                />
            )}

            <div className='m-4 flex justify-between items-center'>
                <h1 className='text-2xl font-bold italic underline'>Lista de productos</h1>
                
                {/* --- CONTENEDOR DE BOTONES DE ACCIÓN --- */}
                <div className="flex gap-2">
                    <Button 
                        variant="outline" 
                        className="bg-green-600 hover:bg-green-700 text-white border-none shadow-sm"
                        onClick={handleExport}
                    >
                        <FileDown className="mr-2 h-4 w-4" />
                        Exportar Excel
                    </Button>
                    
                    <CreateProductModal />
                </div>
            </div>

            <div className='m-4'>
                {flash.message && (
                    <Alert className="border-green-500 text-green-600">
                        <Megaphone className='h-4 w-4' />
                        <AlertTitle>Notificación</AlertTitle>
                        <AlertDescription>{flash.message}</AlertDescription>
                    </Alert>
                )}
            </div>

            <div className="m-4 border rounded-md">
                {products.length > 0 ? (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[80px]">ID</TableHead>
                                <TableHead>Nombre</TableHead>
                                <TableHead>Precio</TableHead>
                                <TableHead className="text-left">Descripción</TableHead>
                                <TableHead className="text-center">Ventas</TableHead>
                                <TableHead className="text-left">Categoría</TableHead>
                                <TableHead className="text-center">Stock</TableHead>
                                <TableHead className="text-center">Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {products.map((product) => (
                                <TableRow key={product.id}>
                                    <TableCell className="font-medium">{product.id}</TableCell>
                                    <TableCell>{product.nombre}</TableCell>
                                    <TableCell>${product.precio}</TableCell>
                                    <TableCell className="max-w-xs truncate">{product.descripcion}</TableCell>
                                    <TableCell className="text-center">{product.sales ?? 0}</TableCell>
                                    <TableCell>
                                        <span className="px-2 py-1 rounded-full bg-slate-100 text-xs font-medium">
                                            {product.categorias ?? 'Sin categoría'}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <span className={`font-bold ${Number(product.stock) < 5 ? 'text-red-500' : 'text-slate-700'}`}>
                                            {product.stock ?? 0}
                                        </span>
                                    </TableCell>
                                    <TableCell className='flex gap-2 justify-center items-center'>
                                        
                                        {/* BOTÓN EDITAR: Ahora abre el modal */}
                                        <Button 
                                            size="icon" 
                                            variant="outline" 
                                            className='bg-slate-600 hover:bg-slate-700 text-white'
                                            onClick={() => handleEditClick(product)}
                                        >
                                            <PencilLine className="h-4 w-4" />
                                        </Button>
                                        
                                        <Button 
                                            size="icon"
                                            variant="destructive"
                                            disabled={processing} 
                                            onClick={() => handleDelete(product.id, product.nombre)}
                                        >
                                            <Trash className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                ) : (
                    <div className="p-8 text-center text-muted-foreground">
                        No hay productos registrados.
                    </div>
                )}
            </div>
        </AppLayout>


    );
}
