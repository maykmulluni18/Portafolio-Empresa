<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'email', 'phone', 'company_name'];

    public function requests()
    {
        return $this->hasMany(ServiceRequest::class, 'client_id');
    }

    public function projects()
    {
        return $this->hasMany(Project::class);
    }
}
