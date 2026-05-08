<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Deliverable;
use Illuminate\Http\Request;

class DeliverableController extends Controller
{
    public function index(Request $request)
    {
        $query = Deliverable::with('project');
        if ($request->project_id) {
            $query->where('project_id', $request->project_id);
        }
        return response()->json($query->get());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'project_id'   => 'required|exists:projects,id',
            'title'        => 'required|string|max:255',
            'description'  => 'nullable|string',
            'file_url'     => 'nullable|string',
            'delivered_at' => 'nullable|date',
        ]);

        return response()->json(Deliverable::create($data), 201);
    }

    public function show(Deliverable $deliverable)
    {
        return response()->json($deliverable->load('project'));
    }

    public function update(Request $request, Deliverable $deliverable)
    {
        $data = $request->validate([
            'title'        => 'sometimes|string|max:255',
            'description'  => 'nullable|string',
            'file_url'     => 'nullable|string',
            'delivered_at' => 'nullable|date',
        ]);

        $deliverable->update($data);

        return response()->json($deliverable);
    }

    public function destroy(Deliverable $deliverable)
    {
        $deliverable->delete();
        return response()->json(null, 204);
    }
}
