import React from 'react';
import { useForm } from '@inertiajs/react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal, PlusCircle } from 'lucide-react';

import {
  NativeSelect,
  NativeSelectOptGroup,
  NativeSelectOption,
} from "@/components/ui/native-select"

export default function CreateProductModal() {
    const [open, setOpen] = React.useState(false);

    // Actualizamos el hook con los nuevos campos
    const { data, setData, post, processing, errors, reset } = useForm({
        nombre: '',
        precio: '',
        descripcion: '',
        sales: '0',      
        categorias: '',   
        stock: '0'      
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('products.store'), {
            onSuccess: () => {
                setOpen(false);
                reset();
            },
        });
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Añadir producto
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Crear nuevo producto</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {Object.keys(errors).length > 0 && (
                        <Alert variant="destructive">
                            <Terminal className="h-4 w-4" />
                            <AlertTitle>Error</AlertTitle>
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
                        <Label htmlFor="nombre">Nombre</Label>
                        <Input 
                            id="nombre" 
                            placeholder="Ej. Laptop Gaming"
                            value={data.nombre} 
                            onChange={(e) => setData('nombre', e.target.value)} 
                        />
                    </div>

                    {/* Fila doble: Precio y Categoría */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="precio">Precio ($)</Label>
                            <Input 
                                id="precio" 
                                type="number"
                                step="0.01"
                                value={data.precio} 
                                onChange={(e) => setData('precio', e.target.value)} 
                            />
                        </div>
                        <div className='gap-2'>
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
                            <Label htmlFor="sales">Ventas Iniciales</Label>
                            <Input 
                                id="sales" 
                                type="number"
                                value={data.sales} 
                                onChange={(e) => setData('sales', e.target.value)} 
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="stock">Stock Disponible</Label>
                            <Input 
                                id="stock" 
                                type="number"
                                value={data.stock} 
                                onChange={(e) => setData('stock', e.target.value)} 
                            />
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="descripcion">Descripción</Label>
                        <Textarea 
                            id="descripcion" 
                            placeholder="Breve descripción del producto..."
                            className="resize-none"
                            value={data.descripcion} 
                            onChange={(e) => setData('descripcion', e.target.value)} 
                        />
                    </div>

                    <DialogFooter className="pt-4">
                        <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                            Cancelar
                        </Button>
                        <Button type="submit" disabled={processing} className="bg-blue-600">
                            {processing ? 'Guardando...' : 'Guardar producto'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}