<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Technology;
use Illuminate\Http\Request;

class TechnologyController extends Controller
{
    public function index()
    {
        return response()->json(Technology::all());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:100|unique:technologies',
            'icon' => 'nullable|string',
        ]);

        return response()->json(Technology::create($data), 201);
    }

    public function show(Technology $technology)
    {
        return response()->json($technology->load('projects'));
    }

    public function update(Request $request, Technology $technology)
    {
        $data = $request->validate([
            'name' => 'sometimes|string|max:100|unique:technologies,name,' . $technology->id,
            'icon' => 'nullable|string',
        ]);

        $technology->update($data);

        return response()->json($technology);
    }

    public function destroy(Technology $technology)
    {
        $technology->delete();
        return response()->json(null, 204);
    }
}
