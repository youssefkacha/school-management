<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        \App\Models\User::factory(10)->create();

        \App\Models\User::factory()->create([
            'name' => 'youssef kacha',
            'email' => 'youssef@kacha.com',
            'password'=>'123456789'
        ]);
        \App\Models\Admin::factory()->create([
            'first_name' => 'Admin',
            'last_name' =>  'Admin',
            'date_of_birth' => fake()->date(),
            'address' => fake()->address(),
            'phone' => substr(fake()->phoneNumber(),10), 
            'email' => 'admin@ad.ad',
            'password' => '$2y$12$/ur70L3I6szcX6YyEatHye85ItGhABROfbld.7XP7ZWwAXztWIkiW'
        ]);
        \App\Models\Teacher::factory()->create([
            'first_name' => 'Teacher',
            'last_name' =>  'Teacher',
            'date_of_birth' => fake()->date(),
            'address' => fake()->address(),
            'phone' => substr(fake()->phoneNumber(),10), 
            'email' => 'teacher@teacher.teacher',
            'password' => '$2y$12$/ur70L3I6szcX6YyEatHye85ItGhABROfbld.7XP7ZWwAXztWIkiW'
        ]);
    }
}
