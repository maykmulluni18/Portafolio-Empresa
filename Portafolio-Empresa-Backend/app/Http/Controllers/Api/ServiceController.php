<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    public function index(Request $request)
    {
        $query = Service::with('company');
        if ($request->company_id) {
            $query->where('company_id', $request->company_id);
        }
        return response()->json($query->get());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'company_id'     => 'required|exists:companies,id',
            'name'           => 'required|string|max:255',
            'description'    => 'nullable|string',
            'base_price'     => 'nullable|numeric|min:0',
            'estimated_time' => 'nullable|string|max:100',
        ]);

        return response()->json(Service::create($data), 201);
    }

    public function show(Service $service)
    {
        return response()->json($service->load('company'));
    }

    public function update(Request $request, Service $service)
    {
        $data = $request->validate([
            'name'           => 'sometimes|string|max:255',
            'description'    => 'nullable|string',
            'base_price'     => 'nullable|numeric|min:0',
            'estimated_time' => 'nullable|string|max:100',
        ]);

        $service->update($data);

        return response()->json($service);
    }

    public function destroy(Service $service)
    {
        $service->delete();
        return response()->json(null, 204);
    }
}
