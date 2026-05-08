<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    public function index(Request $request)
    {
        $query = Project::with(['company', 'client', 'technologies', 'images']);

        if ($request->company_id) {
            $query->where('company_id', $request->company_id);
        }

        if ($request->visibility === 'public') {
            $query->where('visibility', 'public');
        }

        return response()->json($query->get());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'company_id'  => 'required|exists:companies,id',
            'client_id'   => 'nullable|exists:clients,id',
            'title'       => 'required|string|max:255',
            'description' => 'nullable|string',
            'status'      => 'in:planning,in_progress,completed,on_hold,cancelled',
            'visibility'  => 'in:public,private',
            'budget'      => 'nullable|numeric|min:0',
            'start_date'  => 'nullable|date',
            'end_date'    => 'nullable|date|after_or_equal:start_date',
        ]);

        $data['created_by'] = auth('api')->id();

        return response()->json(Project::create($data), 201);
    }

    public function show(Project $project)
    {
        return response()->json(
            $project->load(['company', 'client', 'creator', 'users', 'technologies', 'images', 'deliverables', 'payments', 'portfolio'])
        );
    }

    public function update(Request $request, Project $project)
    {
        $data = $request->validate([
            'title'       => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'status'      => 'in:planning,in_progress,completed,on_hold,cancelled',
            'visibility'  => 'in:public,private',
            'budget'      => 'nullable|numeric|min:0',
            'start_date'  => 'nullable|date',
            'end_date'    => 'nullable|date',
        ]);

        $project->update($data);

        return response()->json($project);
    }

    public function destroy(Project $project)
    {
        $project->delete();
        return response()->json(null, 204);
    }
}
