<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Deliverable extends Model
{
    use HasFactory;

    protected $fillable = ['project_id', 'title', 'description', 'file_url', 'delivered_at'];

    protected $casts = ['delivered_at' => 'datetime'];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }
}
