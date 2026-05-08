<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            RoleSeeder::class,           // 1. Roles (CEO, CTO, Developer…)
            UserSeeder::class,           // 2. Usuarios del equipo
            TechnologySeeder::class,     // 3. Stack tecnológico (16 tecnologías)
            ClientSeeder::class,         // 4. Clientes (8 empresas)
            CompanySeeder::class,        // 5. Empresa + redes sociales + timeline + miembros
            ServiceSeeder::class,        // 6. Servicios ofrecidos (6 servicios)
            ProjectSeeder::class,        // 7. Proyectos + imágenes + tecnologías + pagos + entregables
            PortfolioSeeder::class,      // 8. Portafolio público (6 items visibles)
            TestimonialSeeder::class,    // 9. Testimonios de clientes (8 reseñas)
            ServiceRequestSeeder::class, // 10. Solicitudes de servicio (5 requests)
        ]);
    }
}
