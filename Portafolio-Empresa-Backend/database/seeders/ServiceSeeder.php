<?php

namespace Database\Seeders;

use App\Models\Company;
use App\Models\Service;
use Illuminate\Database\Seeder;

class ServiceSeeder extends Seeder
{
    public function run(): void
    {
        $company = Company::where('name', 'Nexo Digital')->firstOrFail();

        $services = [
            [
                'name'           => 'Prototipado & MVP',
                'description'    => 'Tomamos tu idea de negocio y la convertimos en un producto mínimo viable listo para validar en el mercado en pocas semanas. Usamos metodologías lean startup para reducir riesgos y maximizar el aprendizaje temprano.',
                'base_price'     => 1500000,
                'estimated_time' => '3-4 semanas',
            ],
            [
                'name'           => 'Aplicaciones Web a la Medida',
                'description'    => 'Desarrollamos aplicaciones web robustas, escalables y seguras adaptadas exactamente a las necesidades de tu negocio. Desde plataformas SaaS hasta sistemas de gestión interna, con las mejores tecnologías del mercado.',
                'base_price'     => 4000000,
                'estimated_time' => '2-4 meses',
            ],
            [
                'name'           => 'Aplicaciones Móviles',
                'description'    => 'Creamos apps nativas o multiplataforma para iOS y Android que ofrecen experiencias de usuario excepcionales. Especialistas en React Native y Flutter para entregar productos de alta calidad en menor tiempo.',
                'base_price'     => 6000000,
                'estimated_time' => '3-6 meses',
            ],
            [
                'name'           => 'Consultoría en Innovación',
                'description'    => 'Ayudamos a tu empresa a identificar oportunidades de transformación digital, definir hojas de ruta tecnológicas y ejecutar estrategias de innovación que generen ventajas competitivas sostenibles.',
                'base_price'     => 800000,
                'estimated_time' => '1-2 semanas',
            ],
            [
                'name'           => 'Diseño UX/UI',
                'description'    => 'Diseñamos interfaces que enamoran y flujos que convierten. Nuestro proceso de diseño centrado en el usuario garantiza productos intuitivos que tus clientes adorarán usar, validados con pruebas reales.',
                'base_price'     => 1200000,
                'estimated_time' => '2-4 semanas',
            ],
            [
                'name'           => 'Mantenimiento & Soporte',
                'description'    => 'Monitoreo continuo, actualizaciones de seguridad, corrección de bugs y mejoras incrementales para mantener tus sistemas funcionando al 100%. SLAs garantizados y equipo disponible cuando más nos necesitas.',
                'base_price'     => 350000,
                'estimated_time' => 'Mensual',
            ],
        ];

        foreach ($services as $data) {
            Service::firstOrCreate(
                ['company_id' => $company->id, 'name' => $data['name']],
                $data + ['company_id' => $company->id]
            );
        }
    }
}
