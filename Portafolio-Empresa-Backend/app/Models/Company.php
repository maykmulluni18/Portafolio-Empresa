<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'description', 'mission', 'vision', 'history',
        'email', 'phone', 'website', 'address', 'logo',
    ];

    public function socials()
    {
        return $this->hasMany(CompanySocial::class);
    }

    public function timelines()
    {
        return $this->hasMany(CompanyTimeline::class);
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'company_user')
            ->withPivot('role_id', 'position')
            ->withTimestamps();
    }

    public function services()
    {
        return $this->hasMany(Service::class);
    }

    public function projects()
    {
        return $this->hasMany(Project::class);
    }

    public function testimonials()
    {
        return $this->hasMany(Testimonial::class);
    }
}
