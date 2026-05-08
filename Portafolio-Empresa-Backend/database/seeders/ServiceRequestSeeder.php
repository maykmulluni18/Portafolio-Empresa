<?php

namespace Database\Seeders;

use App\Models\Client;
use App\Models\Service;
use App\Models\ServiceRequest;
use Illuminate\Database\Seeder;

class ServiceRequestSeeder extends Seeder
{
    public function run(): void
    {
        $requests = [
            [
                'client'      => 'TechStart SpA',
                'service'     => 'Prototipado & MVP',
                'title'       => 'MVP para plataforma de gestión de inventario',
                'description' => 'Necesitamos un MVP funcional para validar con primeros clientes antes de la ronda de inversión Serie A. El producto debe gestionar inventario en tiempo real para pymes de retail.',
                'budget'      => 2500000,
                'status'      => 'approved',
            ],
            [
                'client'      => 'InnovateCorp',
                'service'     => 'Consultoría en Innovación',
                'title'       => 'Hoja de ruta de transformación digital',
                'description' => 'Buscamos una consultoría para mapear nuestros procesos actuales, identificar oportunidades de automatización y diseñar un plan de transformación digital para los próximos 2 años.',
                'budget'      => 1500000,
                'status'      => 'approved',
            ],
            [
                'client'      => 'FinanceHub',
                'service'     => 'Aplicaciones Web a la Medida',
                'title'       => 'Portal de clientes para gestión de inversiones',
                'description' => 'Portal web seguro donde nuestros clientes puedan ver sus portafolios, ejecutar operaciones y acceder a reportes personalizados. Requiere integración con nuestra API core.',
                'budget'      => 15000000,
                'status'      => 'reviewing',
            ],
            [
                'client'      => 'LogiMex',
                'service'     => 'Mantenimiento & Soporte',
                'title'       => 'Soporte post-lanzamiento plataforma logística',
                'description' => 'Contrato de soporte mensual para la plataforma en producción. Incluye monitoreo 24/7, resolución de incidencias y deploys de mejoras menores.',
                'budget'      => 700000,
                'status'      => 'pending',
            ],
            [
                'client'      => 'AgroMundo',
                'service'     => 'Diseño UX/UI',
                'title'       => 'Rediseño de flujos de la app móvil agrícola',
                'description' => 'Los usuarios de campo reportan dificultad con el proceso de registro de datos de riego. Necesitamos un rediseño UX enfocado en simplicidad para uso con guantes y sol directo.',
                'budget'      => 1800000,
                'status'      => 'pending',
            ],
        ];

        foreach ($requests as $data) {
            $client  = Client::where('company_name', $data['client'])->first();
            $service = Service::where('name', $data['service'])->first();

            if (!$client || !$service) continue;

            ServiceRequest::firstOrCreate(
                ['client_id' => $client->id, 'title' => $data['title']],
                [
                    'service_id'  => $service->id,
                    'description' => $data['description'],
                    'budget'      => $data['budget'],
                    'status'      => $data['status'],
                ]
            );
        }
    }
}
