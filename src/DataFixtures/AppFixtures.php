<?php

namespace App\DataFixtures;

use Faker\Factory;
use App\Entity\Personne;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create('fr_FR');

        for ($i=0; $i < 50; $i++) { 
            $personne = new Personne();
            $personne->setPrenom(strtolower($faker->firstName()));
            $personne->setNom(strtolower($faker->lastName()));
            $personne->setTel($faker->phoneNumber());

            $manager->persist($personne);
        }

        $manager->flush();
    }
}
