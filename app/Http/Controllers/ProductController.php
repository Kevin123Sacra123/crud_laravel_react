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
        return Inertia::render('Dashboard', compact('products'));
    }

    public function create(){
        return Inertia::render('Products/Create');
    }

    public function store(Request $request){
        $request->validate([
            'nombre' => 'required|string|max:255',
            'precio' => 'required|numeric',
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
            'descripcion' => 'nullable|string',
        ]);
        $product->update([
            'nombre' => $request->input('nombre'),
            'precio' => $request->input('precio'),
            'descripcion' => $request->input('descripcion'),
        ]);
        return redirect()->route('products.index')->with('message', 'Producto actualizado exitosamente.');
    }
}
