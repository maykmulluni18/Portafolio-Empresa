<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PortfolioProject extends Model
{
    use HasFactory;

    protected $fillable = ['project_id', 'title', 'description', 'demo_url', 'visible'];

    protected $casts = ['visible' => 'boolean'];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }
}
