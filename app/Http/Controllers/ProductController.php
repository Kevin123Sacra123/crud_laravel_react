<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{

    public function index()
    {
        $products = Product::all();
        return Inertia::render('Products/Index', compact('products'));
    }

    public function dashboard()
    {
        $products = Product::all();
        return Inertia::render('Products/Dashboard', compact('products'));
    }

public function export()
    {
        $products = Product::all();
        $fileName = 'lista_productos_' . date('Ymd') . '.csv';

        $headers = [
            "Content-type"        => "text/csv; charset=utf-8",
            "Content-Disposition" => "attachment; filename=$fileName",
            "Pragma"              => "no-cache",
            "Cache-Control"       => "must-revalidate, post-check=0, pre-check=0",
            "Expires"             => "0"
        ];

        $callback = function() use($products) {
            $file = fopen('php://output', 'w');
            
            // BOM para que Excel en Windows reconozca tildes y eñes
            fprintf($file, chr(0xEF).chr(0xBB).chr(0xBF));

            // Encabezados de la tabla
            fputcsv($file, ['ID', 'Nombre', 'Precio', 'Descripción', 'Ventas', 'Categoría', 'Stock'], ";");

            foreach ($products as $product) {
                fputcsv($file, [
                    $product->id, 
                    $product->nombre, 
                    $product->precio, 
                    $product->descripcion,
                    $product->sales,
                    $product->categorias,
                    $product->stock
                ],";");
            }
            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }


    public function create(){
        return Inertia::render('Products/Create');
    }

    public function store(Request $request){
        $request->validate([
            'nombre' => 'required|string|max:255',
            'precio' => 'required|numeric',
            'categorias' => 'nullable|string|max:255',
            'sales' => 'nullable|integer',
            'stock' => 'nullable|integer',
            'descripcion' => 'nullable|string',
        ]);

        Product::create($request->all());
        return redirect()->route('products.index')->with('message', 'Producto creado exitosamente.');
    }

    public function destroy(Product $product){
        $product->delete();
        return redirect()->route('products.index')->with('message', 'Producto ha sido eliminado exitosamente.');
    }

    public function edit(Product $product){
        return inertia::render('Products/Edit', compact('product'));
    }

    public function update(Request $request, Product $product){
        $request->validate([
            'nombre' => 'required|string|max:255',
            'precio' => 'required|numeric',
            'categorias' => 'nullable|string',
            'sales' => 'nullable|integer',
            'stock' => 'nullable|integer',
            'descripcion' => 'nullable|string',
        ]);
        $product->update([
            'nombre' => $request->input('nombre'),
            'precio' => $request->input('precio'),
            'categorias' => $request->input('categorias'),
            'sales' => $request->input('sales'),
            'stock' => $request->input('stock'),
            'descripcion' => $request->input('descripcion'),
        ]);
        return redirect()->route('products.index')->with('message', 'Producto actualizado exitosamente.');
    }
}
