<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CompanySocial;
use Illuminate\Http\Request;

class CompanySocialController extends Controller
{
    public function index(Request $request)
    {
        $query = CompanySocial::query();
        if ($request->company_id) {
            $query->where('company_id', $request->company_id);
        }
        return response()->json($query->get());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'company_id' => 'required|exists:companies,id',
            'platform'   => 'required|string|max:100',
            'url'        => 'required|url',
        ]);

        return response()->json(CompanySocial::create($data), 201);
    }

    public function show(CompanySocial $companySocial)
    {
        return response()->json($companySocial);
    }

    public function update(Request $request, CompanySocial $companySocial)
    {
        $data = $request->validate([
            'platform' => 'sometimes|string|max:100',
            'url'      => 'sometimes|url',
        ]);

        $companySocial->update($data);

        return response()->json($companySocial);
    }

    public function destroy(CompanySocial $companySocial)
    {
        $companySocial->delete();
        return response()->json(null, 204);
    }
}
