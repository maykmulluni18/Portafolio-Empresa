<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PortfolioProject;
use Illuminate\Http\Request;

class PortfolioProjectController extends Controller
{
    public function index()
    {
        return response()->json(
            PortfolioProject::with(['project.technologies', 'project.images'])
                ->where('visible', true)
                ->get()
        );
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'project_id'  => 'required|exists:projects,id|unique:portfolio_projects',
            'title'       => 'required|string|max:255',
            'description' => 'nullable|string',
            'demo_url'    => 'nullable|url',
            'visible'     => 'boolean',
        ]);

        return response()->json(PortfolioProject::create($data), 201);
    }

    public function show(PortfolioProject $portfolioProject)
    {
        return response()->json(
            $portfolioProject->load(['project.technologies', 'project.images', 'project.client'])
        );
    }

    public function update(Request $request, PortfolioProject $portfolioProject)
    {
        $data = $request->validate([
            'title'       => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'demo_url'    => 'nullable|url',
            'visible'     => 'boolean',
        ]);

        $portfolioProject->update($data);

        return response()->json($portfolioProject);
    }

    public function destroy(PortfolioProject $portfolioProject)
    {
        $portfolioProject->delete();
        return response()->json(null, 204);
    }
}
