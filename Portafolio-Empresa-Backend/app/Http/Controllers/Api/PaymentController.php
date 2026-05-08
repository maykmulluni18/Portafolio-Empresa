<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    public function index(Request $request)
    {
        $query = Payment::with('project');
        if ($request->project_id) {
            $query->where('project_id', $request->project_id);
        }
        return response()->json($query->get());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'project_id'   => 'required|exists:projects,id',
            'amount'       => 'required|numeric|min:0',
            'payment_date' => 'required|date',
            'method'       => 'nullable|string|max:100',
            'status'       => 'in:pending,completed,failed,refunded',
        ]);

        return response()->json(Payment::create($data), 201);
    }

    public function show(Payment $payment)
    {
        return response()->json($payment->load('project'));
    }

    public function update(Request $request, Payment $payment)
    {
        $data = $request->validate([
            'amount'       => 'sometimes|numeric|min:0',
            'payment_date' => 'sometimes|date',
            'method'       => 'nullable|string|max:100',
            'status'       => 'in:pending,completed,failed,refunded',
        ]);

        $payment->update($data);

        return response()->json($payment);
    }

    public function destroy(Payment $payment)
    {
        $payment->delete();
        return response()->json(null, 204);
    }
}
