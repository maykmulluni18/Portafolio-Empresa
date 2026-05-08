<?php

namespace Database\Seeders;

use App\Models\Client;
use App\Models\Company;
use App\Models\Deliverable;
use App\Models\Payment;
use App\Models\Project;
use App\Models\ProjectImage;
use App\Models\Technology;
use App\Models\User;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    public function run(): void
    {
        $company = Company::where('name', 'Nexo Digital')->firstOrFail();
        $creator = User::where('email', 'carlos@nexodigital.cl')->firstOrFail();
        $techMap = Technology::pluck('id', 'name');

        $projects = [
            // 1 ─────────────────────────────────────────────────────────────────
            [
                'project' => [
                    'title'       => 'AutoMARK — Sistema de Evaluación con IA',
                    'description' => 'Plataforma de calificación automática de respuestas abiertas usando procesamiento de lenguaje natural. Reducción del 80% en el tiempo de corrección para instituciones educativas.',
                    'status'      => 'completed',
                    'visibility'  => 'public',
                    'budget'      => 12000000,
                    'start_date'  => '2023-03-01',
                    'end_date'    => '2023-06-30',
                    'client'      => 'EduConnect',
                ],
                'techs'   => ['Python', 'FastAPI', 'React', 'PostgreSQL', 'Docker'],
                'images'  => [
                    'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
                    'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800',
                ],
                'deliverables' => [
                    ['title' => 'API de evaluación NLP', 'description' => 'Microservicio Python/FastAPI con modelo de lenguaje fine-tuned.', 'delivered_at' => '2023-04-15'],
                    ['title' => 'Panel de administración', 'description' => 'Dashboard React para gestión de evaluaciones y reportes.', 'delivered_at' => '2023-05-30'],
                    ['title' => 'Integración con LMS', 'description' => 'Conector con plataformas Moodle y Canvas.', 'delivered_at' => '2023-06-25'],
                ],
                'payments' => [
                    ['amount' => 4000000, 'payment_date' => '2023-03-05', 'method' => 'Transferencia', 'status' => 'completed'],
                    ['amount' => 4000000, 'payment_date' => '2023-04-20', 'method' => 'Transferencia', 'status' => 'completed'],
                    ['amount' => 4000000, 'payment_date' => '2023-07-05', 'method' => 'Transferencia', 'status' => 'completed'],
                ],
            ],

            // 2 ─────────────────────────────────────────────────────────────────
            [
                'project' => [
                    'title'       => 'FileIQ — Document Intelligence',
                    'description' => 'Asistente de IA para análisis y gestión documental empresarial. Permite hacer preguntas en lenguaje natural sobre contratos, reportes y documentos internos con alta precisión.',
                    'status'      => 'completed',
                    'visibility'  => 'public',
                    'budget'      => 18000000,
                    'start_date'  => '2023-07-01',
                    'end_date'    => '2023-11-30',
                    'client'      => 'FinanceHub',
                ],
                'techs'   => ['Python', 'LangChain', 'FastAPI', 'React', 'AWS', 'PostgreSQL'],
                'images'  => [
                    'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&q=80&w=800',
                    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800',
                ],
                'deliverables' => [
                    ['title' => 'Motor de indexación RAG', 'description' => 'Pipeline de ingesta y vectorización con LangChain + OpenAI.', 'delivered_at' => '2023-08-20'],
                    ['title' => 'Chat interface', 'description' => 'UI de conversación con soporte de historial y fuentes citadas.', 'delivered_at' => '2023-10-15'],
                    ['title' => 'Integración SharePoint', 'description' => 'Conector bidireccional con Microsoft SharePoint Online.', 'delivered_at' => '2023-11-25'],
                ],
                'payments' => [
                    ['amount' => 6000000,  'payment_date' => '2023-07-05', 'method' => 'Transferencia', 'status' => 'completed'],
                    ['amount' => 6000000,  'payment_date' => '2023-09-10', 'method' => 'Transferencia', 'status' => 'completed'],
                    ['amount' => 6000000,  'payment_date' => '2023-12-05', 'method' => 'Transferencia', 'status' => 'completed'],
                ],
            ],

            // 3 ─────────────────────────────────────────────────────────────────
            [
                'project' => [
                    'title'       => 'PizzAi — Bot de Pedidos Conversacional',
                    'description' => 'Bot de WhatsApp con IA para automatizar pedidos, seguimiento y gestión de reclamos para cadena de pizzerías. Integración completa con sistema de cocina y delivery.',
                    'status'      => 'completed',
                    'visibility'  => 'public',
                    'budget'      => 8000000,
                    'start_date'  => '2023-01-10',
                    'end_date'    => '2023-04-30',
                    'client'      => 'RetailMax',
                ],
                'techs'   => ['Python', 'Node.js', 'React', 'MySQL'],
                'images'  => [
                    'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=800',
                    'https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&q=80&w=800',
                ],
                'deliverables' => [
                    ['title' => 'Motor conversacional', 'description' => 'NLP para interpretar pedidos en lenguaje natural.', 'delivered_at' => '2023-02-28'],
                    ['title' => 'Integración WhatsApp Business API', 'description' => 'Webhook y gestión de sesiones de conversación.', 'delivered_at' => '2023-03-25'],
                    ['title' => 'Dashboard de operaciones', 'description' => 'Panel en tiempo real para el equipo de cocina y delivery.', 'delivered_at' => '2023-04-28'],
                ],
                'payments' => [
                    ['amount' => 3000000, 'payment_date' => '2023-01-15', 'method' => 'Transferencia', 'status' => 'completed'],
                    ['amount' => 5000000, 'payment_date' => '2023-05-05', 'method' => 'Transferencia', 'status' => 'completed'],
                ],
            ],

            // 4 ─────────────────────────────────────────────────────────────────
            [
                'project' => [
                    'title'       => 'RetailMax E-Commerce',
                    'description' => 'Plataforma de comercio electrónico omnicanal con catálogo de más de 50.000 productos, gestión de inventario en tiempo real, múltiples medios de pago y panel de analytics.',
                    'status'      => 'completed',
                    'visibility'  => 'public',
                    'budget'      => 22000000,
                    'start_date'  => '2022-08-01',
                    'end_date'    => '2023-02-28',
                    'client'      => 'RetailMax',
                ],
                'techs'   => ['React', 'Node.js', 'PostgreSQL', 'AWS', 'Docker'],
                'images'  => [
                    'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800',
                    'https://images.unsplash.com/photo-1523289333742-be1143f6b766?auto=format&fit=crop&q=80&w=800',
                ],
                'deliverables' => [
                    ['title' => 'Catálogo y buscador', 'description' => 'Motor de búsqueda con Elasticsearch y filtros avanzados.', 'delivered_at' => '2022-10-15'],
                    ['title' => 'Checkout y pagos', 'description' => 'Integración con Webpay, MercadoPago y PayPal.', 'delivered_at' => '2022-12-20'],
                    ['title' => 'Panel de administración', 'description' => 'Backoffice completo para gestión de productos, pedidos y clientes.', 'delivered_at' => '2023-02-20'],
                ],
                'payments' => [
                    ['amount' => 7000000,  'payment_date' => '2022-08-05', 'method' => 'Transferencia', 'status' => 'completed'],
                    ['amount' => 8000000,  'payment_date' => '2022-11-10', 'method' => 'Transferencia', 'status' => 'completed'],
                    ['amount' => 7000000,  'payment_date' => '2023-03-05', 'method' => 'Transferencia', 'status' => 'completed'],
                ],
            ],

            // 5 ─────────────────────────────────────────────────────────────────
            [
                'project' => [
                    'title'       => 'HealthPlus — Plataforma de Telemedicina',
                    'description' => 'Sistema de videoconsultas médicas, gestión de fichas clínicas digitales, prescripciones electrónicas y seguimiento de pacientes crónicos. Certificado por la Superintendencia de Salud.',
                    'status'      => 'completed',
                    'visibility'  => 'public',
                    'budget'      => 35000000,
                    'start_date'  => '2022-01-10',
                    'end_date'    => '2022-10-31',
                    'client'      => 'HealthPlus',
                ],
                'techs'   => ['React', 'Laravel', 'PostgreSQL', 'AWS', 'Docker', 'TypeScript'],
                'images'  => [
                    'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800',
                    'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&q=80&w=800',
                ],
                'deliverables' => [
                    ['title' => 'Módulo de videoconsultas', 'description' => 'Integración WebRTC + Twilio para consultas de alta calidad.', 'delivered_at' => '2022-04-30'],
                    ['title' => 'Ficha clínica digital', 'description' => 'HIS conforme a estándares HL7 FHIR.', 'delivered_at' => '2022-07-15'],
                    ['title' => 'App móvil para pacientes', 'description' => 'App React Native para iOS y Android.', 'delivered_at' => '2022-10-25'],
                ],
                'payments' => [
                    ['amount' => 12000000, 'payment_date' => '2022-01-15', 'method' => 'Transferencia', 'status' => 'completed'],
                    ['amount' => 12000000, 'payment_date' => '2022-05-10', 'method' => 'Transferencia', 'status' => 'completed'],
                    ['amount' => 11000000, 'payment_date' => '2022-11-10', 'method' => 'Transferencia', 'status' => 'completed'],
                ],
            ],

            // 6 ─────────────────────────────────────────────────────────────────
            [
                'project' => [
                    'title'       => 'EduConnect — LMS Corporativo',
                    'description' => 'Plataforma de aprendizaje online para empresas con cursos interactivos, evaluaciones adaptativas, gamificación y reportes de progreso por equipos. Soporta hasta 10.000 usuarios concurrentes.',
                    'status'      => 'completed',
                    'visibility'  => 'public',
                    'budget'      => 28000000,
                    'start_date'  => '2021-09-01',
                    'end_date'    => '2022-05-31',
                    'client'      => 'EduConnect',
                ],
                'techs'   => ['Vue.js', 'Laravel', 'MySQL', 'AWS', 'Docker'],
                'images'  => [
                    'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=800',
                    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800',
                ],
                'deliverables' => [
                    ['title' => 'Editor de cursos drag & drop', 'description' => 'Constructor de contenido con soporte SCORM.', 'delivered_at' => '2021-12-20'],
                    ['title' => 'Motor de gamificación', 'description' => 'Sistema de puntos, insignias y tablas de clasificación.', 'delivered_at' => '2022-03-10'],
                    ['title' => 'Analytics por equipo', 'description' => 'Dashboard de progreso y certificaciones para RR.HH.', 'delivered_at' => '2022-05-25'],
                ],
                'payments' => [
                    ['amount' => 9000000,  'payment_date' => '2021-09-05', 'method' => 'Transferencia', 'status' => 'completed'],
                    ['amount' => 10000000, 'payment_date' => '2022-01-10', 'method' => 'Transferencia', 'status' => 'completed'],
                    ['amount' => 9000000,  'payment_date' => '2022-06-10', 'method' => 'Transferencia', 'status' => 'completed'],
                ],
            ],

            // 7 ─────────────────────────────────────────────────────────────────
            [
                'project' => [
                    'title'       => 'LogiMex — Plataforma de Logística B2B',
                    'description' => 'Marketplace B2B para conectar empresas con proveedores de transporte y almacenaje. Cotizaciones en tiempo real, tracking GPS de envíos y facturación automatizada.',
                    'status'      => 'in_progress',
                    'visibility'  => 'public',
                    'budget'      => 45000000,
                    'start_date'  => '2024-02-01',
                    'end_date'    => null,
                    'client'      => 'LogiMex',
                ],
                'techs'   => ['React', 'Node.js', 'PostgreSQL', 'AWS', 'TypeScript', 'Docker'],
                'images'  => [
                    'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800',
                    'https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&q=80&w=800',
                ],
                'deliverables' => [
                    ['title' => 'Marketplace de proveedores', 'description' => 'Directorio y cotizador automático.', 'delivered_at' => '2024-04-30'],
                ],
                'payments' => [
                    ['amount' => 15000000, 'payment_date' => '2024-02-05', 'method' => 'Transferencia', 'status' => 'completed'],
                    ['amount' => 15000000, 'payment_date' => '2024-06-10', 'method' => 'Transferencia', 'status' => 'completed'],
                ],
            ],

            // 8 ─────────────────────────────────────────────────────────────────
            [
                'project' => [
                    'title'       => 'AgroMundo — App de Gestión Agrícola',
                    'description' => 'Aplicación móvil para gestión de predios agrícolas, control de riego, monitoreo de cultivos con sensores IoT, predicciones de rendimiento con ML y trazabilidad para exportación.',
                    'status'      => 'in_progress',
                    'visibility'  => 'public',
                    'budget'      => 32000000,
                    'start_date'  => '2024-04-01',
                    'end_date'    => null,
                    'client'      => 'AgroMundo',
                ],
                'techs'   => ['React Native', 'Flutter', 'Python', 'FastAPI', 'PostgreSQL', 'AWS'],
                'images'  => [
                    'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80&w=800',
                    'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&q=80&w=800',
                ],
                'deliverables' => [],
                'payments' => [
                    ['amount' => 10000000, 'payment_date' => '2024-04-05', 'method' => 'Transferencia', 'status' => 'completed'],
                ],
            ],
        ];

        foreach ($projects as $data) {
            $client  = Client::where('company_name', $data['project']['client'])->first();
            $project = Project::firstOrCreate(
                ['company_id' => $company->id, 'title' => $data['project']['title']],
                [
                    'company_id'  => $company->id,
                    'client_id'   => $client?->id,
                    'title'       => $data['project']['title'],
                    'description' => $data['project']['description'],
                    'status'      => $data['project']['status'],
                    'visibility'  => $data['project']['visibility'],
                    'budget'      => $data['project']['budget'],
                    'start_date'  => $data['project']['start_date'],
                    'end_date'    => $data['project']['end_date'],
                    'created_by'  => $creator->id,
                ]
            );

            // Technologies
            $techIds = collect($data['techs'])->map(fn($t) => $techMap[$t] ?? null)->filter()->values()->toArray();
            $project->technologies()->syncWithoutDetaching($techIds);

            // Images
            foreach ($data['images'] as $url) {
                ProjectImage::firstOrCreate(['project_id' => $project->id, 'image_url' => $url]);
            }

            // Deliverables
            foreach ($data['deliverables'] as $d) {
                Deliverable::firstOrCreate(
                    ['project_id' => $project->id, 'title' => $d['title']],
                    [
                        'description'  => $d['description'],
                        'delivered_at' => $d['delivered_at'],
                    ]
                );
            }

            // Payments
            foreach ($data['payments'] as $p) {
                Payment::firstOrCreate(
                    ['project_id' => $project->id, 'payment_date' => $p['payment_date'], 'amount' => $p['amount']],
                    [
                        'method' => $p['method'],
                        'status' => $p['status'],
                    ]
                );
            }
        }
    }
}
