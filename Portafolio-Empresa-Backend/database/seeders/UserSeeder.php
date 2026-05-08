<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $users = [
            [
                'name'        => 'Carlos Mendoza',
                'email'       => 'carlos@nexodigital.cl',
                'password'    => Hash::make('password'),
                'bio'         => 'CEO y cofundador de Nexo Digital. Apasionado por la innovación y la transformación digital de empresas latinoamericanas.',
                'github_url'  => 'https://github.com/carlosmendoza',
                'linkedin_url'=> 'https://linkedin.com/in/carlosmendoza',
                'avatar'      => 'https://i.pravatar.cc/150?img=11',
            ],
            [
                'name'        => 'Ana Torres',
                'email'       => 'ana@nexodigital.cl',
                'password'    => Hash::make('password'),
                'bio'         => 'CTO con más de 10 años de experiencia en arquitectura de software. Especialista en sistemas escalables y cloud.',
                'github_url'  => 'https://github.com/anatorres',
                'linkedin_url'=> 'https://linkedin.com/in/anatorres',
                'avatar'      => 'https://i.pravatar.cc/150?img=20',
            ],
            [
                'name'        => 'Diego López',
                'email'       => 'diego@nexodigital.cl',
                'password'    => Hash::make('password'),
                'bio'         => 'Desarrollador Full Stack con expertise en React, Node.js y arquitecturas serverless.',
                'github_url'  => 'https://github.com/diegolopez',
                'linkedin_url'=> 'https://linkedin.com/in/diegolopez',
                'avatar'      => 'https://i.pravatar.cc/150?img=14',
            ],
            [
                'name'        => 'Valentina Muñoz',
                'email'       => 'valentina@nexodigital.cl',
                'password'    => Hash::make('password'),
                'bio'         => 'Diseñadora UX/UI especializada en experiencias digitales centradas en el usuario. Experta en Figma y design systems.',
                'github_url'  => null,
                'linkedin_url'=> 'https://linkedin.com/in/valentinamunoz',
                'avatar'      => 'https://i.pravatar.cc/150?img=25',
            ],
            [
                'name'        => 'Sebastián Rojas',
                'email'       => 'sebastian@nexodigital.cl',
                'password'    => Hash::make('password'),
                'bio'         => 'Desarrollador Backend con foco en Laravel, Python y bases de datos relacionales. Amante del código limpio.',
                'github_url'  => 'https://github.com/sebastianrojas',
                'linkedin_url'=> 'https://linkedin.com/in/sebastianrojas',
                'avatar'      => 'https://i.pravatar.cc/150?img=8',
            ],
            // Admin
            [
                'name'        => 'Admin',
                'email'       => 'admin@nexodigital.cl',
                'password'    => Hash::make('admin123'),
                'bio'         => 'Administrador del sistema.',
                'github_url'  => null,
                'linkedin_url'=> null,
                'avatar'      => null,
            ],
        ];

        foreach ($users as $data) {
            User::firstOrCreate(['email' => $data['email']], $data);
        }
    }
}
