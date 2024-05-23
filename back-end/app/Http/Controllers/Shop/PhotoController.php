<?php

namespace App\Http\Controllers\Shop;

use App\Http\Resources\Shop\PhotoResource;
use App\Http\Requests\Shop\StorePhotoRequest;
use Illuminate\Http\Request;
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

    public function getPhotos(Request $request)
    {
        $codePro = $request->query('codePro');
        $photos = Photo::where('codePro', $codePro)->get();
        return PhotoResource::collection($photos);
    }

    public function update(StorePhotoRequest $request, Photo $photo)
    {
        $photo->update($request->validated());
        return new PhotoResource($photo);
    }

    public function destroy($idPhoto)
    {
        $photo = Photo::findOrFail($idPhoto);
        $photo->delete();
        return response()->json(null, 204);
    }
}
