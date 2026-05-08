<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CompanyTimeline extends Model
{
    use HasFactory;

    protected $fillable = ['company_id', 'title', 'description', 'event_date', 'image'];

    protected $casts = ['event_date' => 'date'];

    public function company()
    {
        return $this->belongsTo(Company::class);
    }
}
