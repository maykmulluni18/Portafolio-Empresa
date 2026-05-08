<?php

namespace Database\Seeders;

use App\Models\PortfolioProject;
use App\Models\Project;
use Illuminate\Database\Seeder;

class PortfolioSeeder extends Seeder
{
    public function run(): void
    {
        $portfolioData = [
            [
                'title'       => 'AutoMARK — Evaluación con IA',
                'description' => 'Plataforma que reduce en 80% el tiempo de corrección mediante procesamiento de lenguaje natural. Más de 200.000 evaluaciones procesadas.',
                'demo_url'    => null,
                'visible'     => true,
                'project'     => 'AutoMARK — Sistema de Evaluación con IA',
            ],
            [
                'title'       => 'FileIQ — Document Intelligence',
                'description' => 'Asistente conversacional que permite consultar miles de documentos corporativos en lenguaje natural. ROI del 340% en el primer año.',
                'demo_url'    => null,
                'visible'     => true,
                'project'     => 'FileIQ — Document Intelligence',
            ],
            [
                'title'       => 'PizzAi — Bot de Pedidos',
                'description' => 'Bot de WhatsApp que automatizó el 70% de los pedidos de una cadena de 25 locales, reduciendo errores en un 95%.',
                'demo_url'    => null,
                'visible'     => true,
                'project'     => 'PizzAi — Bot de Pedidos Conversacional',
            ],
            [
                'title'       => 'RetailMax E-Commerce',
                'description' => 'Plataforma omnicanal con 50.000+ productos que incrementó las ventas online en un 180% respecto al año anterior.',
                'demo_url'    => null,
                'visible'     => true,
                'project'     => 'RetailMax E-Commerce',
            ],
            [
                'title'       => 'HealthPlus Telemedicina',
                'description' => 'Sistema de telemedicina certificado con más de 15.000 consultas mensuales y 4.8/5 de satisfacción de pacientes.',
                'demo_url'    => null,
                'visible'     => true,
                'project'     => 'HealthPlus — Plataforma de Telemedicina',
            ],
            [
                'title'       => 'EduConnect LMS Corporativo',
                'description' => 'Plataforma de aprendizaje para empresas con 30.000 usuarios activos y un incremento del 65% en completación de cursos.',
                'demo_url'    => null,
                'visible'     => true,
                'project'     => 'EduConnect — LMS Corporativo',
            ],
        ];

        foreach ($portfolioData as $data) {
            $project = Project::where('title', $data['project'])->first();
            if (!$project) continue;

            PortfolioProject::firstOrCreate(
                ['project_id' => $project->id],
                [
                    'title'       => $data['title'],
                    'description' => $data['description'],
                    'demo_url'    => $data['demo_url'],
                    'visible'     => $data['visible'],
                ]
            );
        }
    }
}
