<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Testimonial;
use Illuminate\Http\Request;

class TestimonialController extends Controller
{
    public function index(Request $request)
    {
        $query = Testimonial::with('company');
        if ($request->company_id) {
            $query->where('company_id', $request->company_id);
        }
        return response()->json($query->get());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'company_id'  => 'required|exists:companies,id',
            'client_name' => 'required|string|max:255',
            'content'     => 'required|string',
            'rating'      => 'integer|min:1|max:5',
        ]);

        return response()->json(Testimonial::create($data), 201);
    }

    public function show(Testimonial $testimonial)
    {
        return response()->json($testimonial->load('company'));
    }

    public function update(Request $request, Testimonial $testimonial)
    {
        $data = $request->validate([
            'client_name' => 'sometimes|string|max:255',
            'content'     => 'sometimes|string',
            'rating'      => 'integer|min:1|max:5',
        ]);

        $testimonial->update($data);

        return response()->json($testimonial);
    }

    public function destroy(Testimonial $testimonial)
    {
        $testimonial->delete();
        return response()->json(null, 204);
    }
}
