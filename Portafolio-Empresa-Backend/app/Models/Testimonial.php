<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Testimonial extends Model
{
    use HasFactory;

    protected $fillable = ['company_id', 'client_name', 'content', 'rating'];

    public function company()
    {
        return $this->belongsTo(Company::class);
    }
}
