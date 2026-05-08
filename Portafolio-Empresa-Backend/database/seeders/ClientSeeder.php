<?php

namespace Database\Seeders;

use App\Models\Client;
use Illuminate\Database\Seeder;

class ClientSeeder extends Seeder
{
    public function run(): void
    {
        $clients = [
            [
                'name'         => 'Roberto Figueroa',
                'email'        => 'roberto@techstart.cl',
                'phone'        => '+56 9 1111 2222',
                'company_name' => 'TechStart SpA',
            ],
            [
                'name'         => 'Camila Vega',
                'email'        => 'camila@innovatecorp.com',
                'phone'        => '+56 9 3333 4444',
                'company_name' => 'InnovateCorp',
            ],
            [
                'name'         => 'Andrés Castillo',
                'email'        => 'andres@retailmax.cl',
                'phone'        => '+56 9 5555 6666',
                'company_name' => 'RetailMax',
            ],
            [
                'name'         => 'Patricia Morales',
                'email'        => 'patricia@healthplus.cl',
                'phone'        => '+56 9 7777 8888',
                'company_name' => 'HealthPlus',
            ],
            [
                'name'         => 'Fernando Reyes',
                'email'        => 'fernando@educonnect.cl',
                'phone'        => '+56 9 9999 0000',
                'company_name' => 'EduConnect',
            ],
            [
                'name'         => 'Natalia Soto',
                'email'        => 'natalia@financehub.com',
                'phone'        => '+56 9 2222 3333',
                'company_name' => 'FinanceHub',
            ],
            [
                'name'         => 'Ignacio Bravo',
                'email'        => 'ignacio@logimex.cl',
                'phone'        => '+56 9 4444 5555',
                'company_name' => 'LogiMex',
            ],
            [
                'name'         => 'Sofía Contreras',
                'email'        => 'sofia@agromundo.cl',
                'phone'        => '+56 9 6666 7777',
                'company_name' => 'AgroMundo',
            ],
        ];

        foreach ($clients as $data) {
            Client::firstOrCreate(['email' => $data['email']], $data);
        }
    }
}
