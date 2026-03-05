import React, { useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from 'lucide-react';

// Actualizamos la interfaz local para incluir los nuevos campos
interface Product {
    id: number;
    nombre: string;
    precio: number;
    descripcion: string;
    sales?: number;
    categorias?: string;
    stock?: number;
}

import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select"

interface Props {
    product: Product;
    open: boolean;
    setOpen: (open: boolean) => void;
}

export default function EditProductModal({ product, open, setOpen }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        nombre: product.nombre,
        precio: product.precio,
        descripcion: product.descripcion,
        sales: product.sales ?? 0,
        categorias: product.categorias ?? '',
        stock: product.stock ?? 0
    });

    // Sincronizar los datos cuando el producto seleccionado cambie en la tabla
    useEffect(() => {
        setData({
            nombre: product.nombre,
            precio: product.precio,
            descripcion: product.descripcion,
            sales: product.sales ?? 0,
            categorias: product.categorias ?? '',
            stock: product.stock ?? 0
        });
    }, [product]);

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('products.update', product.id), {
            onSuccess: () => setOpen(false),
        });
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle className="italic">Editando: {product.nombre}</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleUpdate} className="space-y-4">
                    {Object.keys(errors).length > 0 && (
                        <Alert variant="destructive">
                            <Terminal className="h-4 w-4" />
                            <AlertTitle>Error de validación</AlertTitle>
                            <AlertDescription>
                                <ul className="list-disc pl-4 text-xs">
                                    {Object.entries(errors).map(([key, message]) => (
                                        <li key={key}>{message as string}</li>
                                    ))}
                                </ul>
                            </AlertDescription>
                        </Alert>
                    )}

                    <div className="grid gap-2">
                        <Label htmlFor="edit_nombre">Nombre del Producto</Label>
                        <Input 
                            id="edit_nombre" 
                            value={data.nombre} 
                            onChange={(e) => setData('nombre', e.target.value)} 
                        />
                    </div>

                    {/* Fila doble: Precio y Categoría */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="edit_precio">Precio ($)</Label>
                            <Input 
                                id="edit_precio" 
                                type="number"
                                step="0.01"
                                value={data.precio} 
                                onChange={(e) => setData('precio', Number(e.target.value))} 
                            />
                        </div>
                        <div className='grid gap-2'>
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
                    </div>

                    {/* Fila doble: Ventas y Stock */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="edit_sales">Ventas</Label>
                            <Input 
                                id="edit_sales" 
                                type="number"
                                value={data.sales} 
                                onChange={(e) => setData('sales', Number(e.target.value))} 
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="edit_stock">Stock</Label>
                            <Input 
                                id="edit_stock" 
                                type="number"
                                value={data.stock} 
                                onChange={(e) => setData('stock', Number(e.target.value))} 
                            />
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="edit_descripcion">Descripción</Label>
                        <Textarea 
                            id="edit_descripcion" 
                            className="resize-none"
                            value={data.descripcion} 
                            onChange={(e) => setData('descripcion', e.target.value)} 
                        />
                    </div>

                    <DialogFooter className="pt-2">
                        <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                            Cancelar
                        </Button>
                        <Button type="submit" disabled={processing} className="bg-slate-700">
                            {processing ? 'Actualizando...' : 'Guardar Cambios'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}