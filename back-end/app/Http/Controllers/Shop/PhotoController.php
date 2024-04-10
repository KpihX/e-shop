<?php

namespace App\Http\Controllers\Shop;

use App\Http\Resources\Shop\PhotoResource;
use App\Http\Requests\Shop\StorePhotoRequest;
// use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Shop\Photo;

// use Illuminate\Support\Facades\Storage;

class PhotoController extends Controller
{
    public function index()
    {
        $photos = Photo::all();
        return PhotoResource::collection($photos);
    }

    public function store(StorePhotoRequest $request)
    {
        $photo = Photo::create($request->validated());
        return new PhotoResource($photo);
    }

    public function show(Photo $photo)
    {
        return new PhotoResource($photo);
    }

    public function update(StorePhotoRequest $request, Photo $photo)
    {
        $photo->update($request->validated());
        return new PhotoResource($photo);
    }

    public function destroy(Photo $photo)
    {
        $photo->delete();
        return response()->json(null, 204);
    }
}
