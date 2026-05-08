<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TechnologySeeder extends Seeder
{
    public function run(): void
    {
        $technologies = [
            ['name' => 'React',          'icon' => '⚛️'],
            ['name' => 'Vue.js',         'icon' => '💚'],
            ['name' => 'Node.js',        'icon' => '🟢'],
            ['name' => 'Laravel',        'icon' => '🔴'],
            ['name' => 'Python',         'icon' => '🐍'],
            ['name' => 'React Native',   'icon' => '📱'],
            ['name' => 'Flutter',        'icon' => '🦋'],
            ['name' => 'PostgreSQL',     'icon' => '🐘'],
            ['name' => 'MySQL',          'icon' => '🐬'],
            ['name' => 'AWS',            'icon' => '☁️'],
            ['name' => 'Docker',         'icon' => '🐳'],
            ['name' => 'Figma',          'icon' => '🎨'],
            ['name' => 'TypeScript',     'icon' => '🔷'],
            ['name' => 'Next.js',        'icon' => '▲'],
            ['name' => 'FastAPI',        'icon' => '⚡'],
            ['name' => 'LangChain',      'icon' => '🔗'],
        ];

        foreach ($technologies as $tech) {
            DB::table('technologies')->insertOrIgnore([
                'name'       => $tech['name'],
                'icon'       => $tech['icon'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
