<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'company_id', 'client_id', 'title', 'description',
        'status', 'visibility', 'budget', 'start_date', 'end_date', 'created_by',
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
    ];

    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    public function client()
    {
        return $this->belongsTo(Client::class);
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'project_user')
            ->withPivot('role')
            ->withTimestamps();
    }

    public function technologies()
    {
        return $this->belongsToMany(Technology::class, 'project_technologies');
    }

    public function images()
    {
        return $this->hasMany(ProjectImage::class);
    }

    public function deliverables()
    {
        return $this->hasMany(Deliverable::class);
    }

    public function payments()
    {
        return $this->hasMany(Payment::class);
    }

    public function portfolio()
    {
        return $this->hasOne(PortfolioProject::class);
    }
}
