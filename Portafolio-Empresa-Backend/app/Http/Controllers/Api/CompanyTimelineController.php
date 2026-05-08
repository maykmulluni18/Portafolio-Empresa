<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CompanyTimeline;
use Illuminate\Http\Request;

class CompanyTimelineController extends Controller
{
    public function index(Request $request)
    {
        $query = CompanyTimeline::query();
        if ($request->company_id) {
            $query->where('company_id', $request->company_id);
        }
        return response()->json($query->orderBy('event_date')->get());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'company_id'  => 'required|exists:companies,id',
            'title'       => 'required|string|max:255',
            'description' => 'nullable|string',
            'event_date'  => 'required|date',
            'image'       => 'nullable|string',
        ]);

        return response()->json(CompanyTimeline::create($data), 201);
    }

    public function show(CompanyTimeline $companyTimeline)
    {
        return response()->json($companyTimeline);
    }

    public function update(Request $request, CompanyTimeline $companyTimeline)
    {
        $data = $request->validate([
            'title'       => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'event_date'  => 'sometimes|date',
            'image'       => 'nullable|string',
        ]);

        $companyTimeline->update($data);

        return response()->json($companyTimeline);
    }

    public function destroy(CompanyTimeline $companyTimeline)
    {
        $companyTimeline->delete();
        return response()->json(null, 204);
    }
}
