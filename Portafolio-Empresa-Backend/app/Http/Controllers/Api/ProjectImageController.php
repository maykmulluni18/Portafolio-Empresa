<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ProjectImage;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\Request;

class ProjectImageController extends Controller
{
    private function resolveImageUrl(Request $request): string
    {
        if ($request->hasFile('image_file')) {
            $path = $request->file('image_file')->store('project-images', 'public');
            return asset('storage/' . $path);
        }

        return $request->input('image_url');
    }

    private function resolveImageUrls(Request $request): array
    {
        $imageUrls = [];

        if ($request->filled('image_url')) {
            $imageUrls[] = $request->input('image_url');
        }

        foreach ((array) $request->input('image_urls', []) as $imageUrl) {
            if ($imageUrl) {
                $imageUrls[] = $imageUrl;
            }
        }

        if ($request->hasFile('image_file')) {
            $imageUrls[] = $this->resolveImageUrl($request);
        }

        foreach ((array) $request->file('image_files', []) as $imageFile) {
            if ($imageFile) {
                $path = $imageFile->store('project-images', 'public');
                $imageUrls[] = asset('storage/' . $path);
            }
        }

        return array_values(array_filter($imageUrls));
    }

    public function index(Request $request)
    {
        $query = ProjectImage::query();
        if ($request->project_id) {
            $query->where('project_id', $request->project_id);
        }
        return response()->json($query->get());
    }

    public function store(Request $request)
    {
        $request->validate([
            'project_id' => 'required|exists:projects,id',
            'image_url'  => 'nullable|url',
            'image_urls' => 'nullable|array',
            'image_urls.*' => 'url',
            'image_file' => 'nullable|file|image|mimes:jpg,jpeg,png,webp',
            'image_files' => 'nullable|array',
            'image_files.*' => 'file|image|mimes:jpg,jpeg,png,webp',
        ]);

        $imageUrls = $this->resolveImageUrls($request);

        if (count($imageUrls) === 0) {
            throw ValidationException::withMessages([
                'image_url' => 'Debes enviar al menos una URL o un archivo de imagen.',
            ]);
        }

        $rows = [];

        foreach ($imageUrls as $imageUrl) {
            $rows[] = ProjectImage::create([
                'project_id' => $request->input('project_id'),
                'image_url' => $imageUrl,
            ]);
        }

        return response()->json($rows, 201);
    }

    public function show(ProjectImage $projectImage)
    {
        return response()->json($projectImage);
    }

    public function update(Request $request, ProjectImage $projectImage)
    {
        $data = $request->validate([
            'image_url'  => 'nullable|url|required_without:image_file',
            'image_file' => 'nullable|file|image|mimes:jpg,jpeg,png,webp|required_without:image_url',
        ]);

        $data['image_url'] = $this->resolveImageUrl($request);
        unset($data['image_file']);

        $projectImage->update($data);
        return response()->json($projectImage);
    }

    public function destroy(ProjectImage $projectImage)
    {
        $projectImage->delete();
        return response()->json(null, 204);
    }
}
