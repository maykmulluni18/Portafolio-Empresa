<?php

namespace Database\Seeders;

use App\Models\Company;
use App\Models\CompanySocial;
use App\Models\CompanyTimeline;
use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;

class CompanySeeder extends Seeder
{
    public function run(): void
    {
        // ── Company ────────────────────────────────────────────────────────────
        $company = Company::firstOrCreate(
            ['name' => 'Nexo Digital'],
            [
                'description' => 'Agencia de innovación y desarrollo de software. Creamos soluciones digitales de alto impacto para startups y empresas que quieren transformar su negocio con tecnología.',
                'mission'     => 'Transformar ideas en productos digitales que generen valor real para las personas y los negocios. Combinamos metodologías ágiles, diseño centrado en el usuario y tecnología de vanguardia para entregar resultados que importan.',
                'vision'      => 'Ser la agencia tecnológica de referencia en Latinoamérica, reconocida por nuestra capacidad de innovar, ejecutar con excelencia y acompañar a nuestros clientes en cada etapa de su crecimiento digital.',
                'history'     => 'Nexo Digital nació en 2019 con la visión de democratizar el acceso a tecnología de calidad en Latinoamérica. Lo que comenzó como un equipo de tres personas en Santiago ha crecido hasta convertirse en una agencia con presencia en Chile, México y Colombia, habiendo completado más de 80 proyectos para clientes de diversas industrias.',
                'email'       => 'hola@nexodigital.cl',
                'phone'       => '+56 9 8765 4321',
                'website'     => 'https://nexodigital.cl',
                'address'     => 'Santiago, Chile · Remoto · Global',
                'logo'        => null,
            ]
        );

        // ── Social links ────────────────────────────────────────────────────────
        $socials = [
            ['platform' => 'LinkedIn',  'url' => 'https://linkedin.com/company/nexodigital'],
            ['platform' => 'Instagram', 'url' => 'https://instagram.com/nexodigital'],
            ['platform' => 'GitHub',    'url' => 'https://github.com/nexodigital'],
            ['platform' => 'Twitter',   'url' => 'https://twitter.com/nexodigital'],
        ];

        foreach ($socials as $social) {
            CompanySocial::firstOrCreate(
                ['company_id' => $company->id, 'platform' => $social['platform']],
                ['url' => $social['url']]
            );
        }

        // ── Timeline ────────────────────────────────────────────────────────────
        $timelines = [
            [
                'title'       => 'Fundación de Nexo Digital',
                'description' => 'Tres socios con visión compartida fundaron Nexo Digital en Santiago de Chile, con el sueño de llevar tecnología de calidad a más empresas latinoamericanas.',
                'event_date'  => '2019-03-15',
            ],
            [
                'title'       => 'Primer cliente internacional',
                'description' => 'Conseguimos nuestro primer contrato con una startup de México, marcando el inicio de nuestra expansión regional y validando nuestro modelo de trabajo remoto.',
                'event_date'  => '2020-06-01',
            ],
            [
                'title'       => 'Lanzamiento del servicio de consultoría',
                'description' => 'Ampliamos nuestra oferta de valor añadiendo consultoría en innovación y transformación digital, complementando el desarrollo de software con estrategia de negocio.',
                'event_date'  => '2021-02-10',
            ],
            [
                'title'       => 'Equipo supera los 10 integrantes',
                'description' => 'Con la incorporación de nuevos talentos en diseño, desarrollo y gestión de proyectos, consolidamos un equipo multidisciplinario de alto rendimiento.',
                'event_date'  => '2022-08-20',
            ],
            [
                'title'       => '50+ proyectos completados',
                'description' => 'Alcanzamos un hito importante: más de 50 proyectos entregados con éxito en sectores como retail, salud, educación, fintech y logística.',
                'event_date'  => '2023-05-05',
            ],
            [
                'title'       => 'Expansión a México y Colombia',
                'description' => 'Abrimos operaciones oficiales en Ciudad de México y Bogotá, consolidando nuestra presencia regional y atendiendo a clientes locales de manera más cercana.',
                'event_date'  => '2024-01-15',
            ],
        ];

        foreach ($timelines as $tl) {
            CompanyTimeline::firstOrCreate(
                ['company_id' => $company->id, 'title' => $tl['title']],
                ['description' => $tl['description'], 'event_date' => $tl['event_date']]
            );
        }

        // ── Company <-> User pivot ──────────────────────────────────────────────
        $roleMap = Role::pluck('id', 'name');

        $members = [
            ['email' => 'carlos@nexodigital.cl',    'role' => 'CEO',                     'position' => 'CEO & Cofundador'],
            ['email' => 'ana@nexodigital.cl',        'role' => 'CTO',                     'position' => 'CTO & Cofundadora'],
            ['email' => 'diego@nexodigital.cl',      'role' => 'Desarrollador Full Stack', 'position' => 'Lead Developer'],
            ['email' => 'valentina@nexodigital.cl',  'role' => 'Diseñador UX/UI',          'position' => 'Lead Designer'],
            ['email' => 'sebastian@nexodigital.cl',  'role' => 'Desarrollador Backend',    'position' => 'Backend Developer'],
        ];

        foreach ($members as $m) {
            $user   = User::where('email', $m['email'])->first();
            $roleId = $roleMap[$m['role']] ?? null;

            if ($user && $roleId && !$company->users()->where('user_id', $user->id)->exists()) {
                $company->users()->attach($user->id, [
                    'role_id'  => $roleId,
                    'position' => $m['position'],
                ]);
            }
        }
    }
}
