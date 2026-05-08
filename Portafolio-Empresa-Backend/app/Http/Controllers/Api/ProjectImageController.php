<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ProjectImage;
use Illuminate\Http\Request;

class ProjectImageController extends Controller
{
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
        $data = $request->validate([
            'project_id' => 'required|exists:projects,id',
            'image_url'  => 'required|string',
        ]);

        return response()->json(ProjectImage::create($data), 201);
    }

    public function show(ProjectImage $projectImage)
    {
        return response()->json($projectImage);
    }

    public function update(Request $request, ProjectImage $projectImage)
    {
        $data = $request->validate(['image_url' => 'required|string']);
        $projectImage->update($data);
        return response()->json($projectImage);
    }

    public function destroy(ProjectImage $projectImage)
    {
        $projectImage->delete();
        return response()->json(null, 204);
    }
}
