<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ServiceRequest;
use Illuminate\Http\Request;

class ServiceRequestController extends Controller
{
    public function index()
    {
        return response()->json(
            ServiceRequest::with(['client', 'service'])->get()
        );
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'client_id'   => 'required|exists:clients,id',
            'service_id'  => 'required|exists:services,id',
            'title'       => 'required|string|max:255',
            'description' => 'nullable|string',
            'budget'      => 'nullable|numeric|min:0',
            'status'      => 'in:pending,reviewing,approved,rejected',
        ]);

        return response()->json(ServiceRequest::create($data), 201);
    }

    public function show(ServiceRequest $request)
    {
        return response()->json($request->load(['client', 'service']));
    }

    public function update(Request $httpRequest, ServiceRequest $request)
    {
        $data = $httpRequest->validate([
            'title'       => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'budget'      => 'nullable|numeric|min:0',
            'status'      => 'in:pending,reviewing,approved,rejected',
        ]);

        $request->update($data);

        return response()->json($request);
    }

    public function destroy(ServiceRequest $request)
    {
        $request->delete();
        return response()->json(null, 204);
    }
}
