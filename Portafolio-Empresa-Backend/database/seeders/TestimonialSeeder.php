<?php

namespace Database\Seeders;

use App\Models\Company;
use App\Models\Testimonial;
use Illuminate\Database\Seeder;

class TestimonialSeeder extends Seeder
{
    public function run(): void
    {
        $company = Company::where('name', 'Nexo Digital')->firstOrFail();

        $testimonials = [
            [
                'client_name' => 'Roberto Figueroa — TechStart SpA',
                'content'     => 'Nexo Digital transformó nuestra idea en un producto real en tiempo récord. Su metodología ágil y comunicación constante hicieron que el proceso fuera fluido y transparente. Los recomendamos sin dudarlo.',
                'rating'      => 5,
            ],
            [
                'client_name' => 'Camila Vega — InnovateCorp',
                'content'     => 'El equipo de Nexo Digital entendió nuestras necesidades desde el primer día. Entregaron un sistema robusto que superó nuestras expectativas, dentro del presupuesto y con excelente soporte post-entrega.',
                'rating'      => 5,
            ],
            [
                'client_name' => 'Andrés Castillo — RetailMax',
                'content'     => 'Trabajar con Nexo Digital fue una excelente decisión. Nuestro e-commerce despegó y los números hablan solos: +180% en ventas online. Son un socio estratégico, no solo un proveedor de software.',
                'rating'      => 5,
            ],
            [
                'client_name' => 'Patricia Morales — HealthPlus',
                'content'     => 'El desarrollo de nuestra plataforma de telemedicina fue complejo y altamente regulado. Nexo Digital navegó esos desafíos con profesionalismo y entregó una solución certificada que usamos con total confianza.',
                'rating'      => 5,
            ],
            [
                'client_name' => 'Fernando Reyes — EduConnect',
                'content'     => 'Nuestra plataforma de aprendizaje pasó de cero a 30.000 usuarios activos en menos de un año, gracias al trabajo impecable del equipo de Nexo Digital. La calidad del código y la UX son simplemente excelentes.',
                'rating'      => 5,
            ],
            [
                'client_name' => 'Natalia Soto — FinanceHub',
                'content'     => 'FileIQ cambió la manera en que gestionamos la documentación legal y financiera de nuestra empresa. Lo que antes tomaba horas ahora toma minutos. El ROI fue evidente desde el primer mes.',
                'rating'      => 5,
            ],
            [
                'client_name' => 'Rodrigo Álvarez — Startup Anónima',
                'content'     => 'Contratamos a Nexo Digital para un MVP y quedamos tan satisfechos que ahora son nuestro equipo de desarrollo permanente. Calidad, velocidad y precio justo: la combinación perfecta.',
                'rating'      => 4,
            ],
            [
                'client_name' => 'María José Herrera — Agencia Digital',
                'content'     => 'Como agencia que subcontrata desarrollo, hemos trabajado con muchos equipos. Nexo Digital destaca por su autonomía, proactividad y la calidad del código que entregan. Volvemos una y otra vez.',
                'rating'      => 5,
            ],
        ];

        foreach ($testimonials as $data) {
            Testimonial::firstOrCreate(
                ['company_id' => $company->id, 'client_name' => $data['client_name']],
                [
                    'content' => $data['content'],
                    'rating'  => $data['rating'],
                ]
            );
        }
    }
}
