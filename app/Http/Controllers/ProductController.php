<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use App\Http\Resources\ProductResource;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = $request->user();

        return ProductResource::collection(Product::where('user_id', $user->id)->paginate(20));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request)
    {
        $data = $request->validated();
        $product  = Product::create($data);

        return response()->json([
            'message' => 'Successfully created product.',
            'data' => new ProductResource($product),
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product, Request $request)
    {
        $user = $request->user();

        if ($user->id !== $product->user_id) {
            return abort(403, 'Unauthorized action.');
        }

        return response()->json([
            'message' => 'Product successfully recovered.',
            'data' => new ProductResource($product),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, Product $product)
    {
        $product->update($request->validated());

        return response()->json([
            'message' => 'Successfully updated product.',
            'data' => new ProductResource($product),
        ], 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product,  Request $request)
    {
        $user = $request->user();

        if ($user->id !== $product->user_id) {
            return abort(403, 'Unauthorized action.');
        }

        $product->delete();
        return response('Successfully deleted product.', 204);
    }
}
