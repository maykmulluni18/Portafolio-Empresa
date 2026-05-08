<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Company;
use Illuminate\Http\Request;

class CompanyController extends Controller
{
    public function index()
    {
        return response()->json(
            Company::with(['socials', 'timelines', 'testimonials', 'users'])->get()
        );
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name'        => 'required|string|max:255',
            'description' => 'nullable|string',
            'mission'     => 'nullable|string',
            'vision'      => 'nullable|string',
            'history'     => 'nullable|string',
            'email'       => 'nullable|email',
            'phone'       => 'nullable|string',
            'website'     => 'nullable|url',
            'address'     => 'nullable|string',
            'logo'        => 'nullable|string',
        ]);

        return response()->json(Company::create($data), 201);
    }

    public function show(Company $company)
    {
        return response()->json(
            $company->load(['socials', 'timelines', 'users', 'services', 'testimonials'])
        );
    }

    public function update(Request $request, Company $company)
    {
        $data = $request->validate([
            'name'        => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'mission'     => 'nullable|string',
            'vision'      => 'nullable|string',
            'history'     => 'nullable|string',
            'email'       => 'nullable|email',
            'phone'       => 'nullable|string',
            'website'     => 'nullable|url',
            'address'     => 'nullable|string',
            'logo'        => 'nullable|string',
        ]);

        $company->update($data);

        return response()->json($company);
    }

    public function destroy(Company $company)
    {
        $company->delete();
        return response()->json(null, 204);
    }
}
