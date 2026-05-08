<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        $roles = [
            'CEO',
            'CTO',
            'Desarrollador Full Stack',
            'Desarrollador Frontend',
            'Desarrollador Backend',
            'Diseñador UX/UI',
            'Project Manager',
            'DevOps',
        ];

        foreach ($roles as $name) {
            DB::table('roles')->insertOrIgnore(['name' => $name, 'created_at' => now(), 'updated_at' => now()]);
        }
    }
}
