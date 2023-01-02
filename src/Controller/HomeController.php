<?php

namespace App\Controller;

use App\Repository\PersonneRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class HomeController extends AbstractController
{
    #[Route('/', name: 'app_home')]
    public function index(PersonneRepository $personneRepository): Response
    {
        $personnes = $personneRepository->findAll();

        return $this->render('home/index.html.twig', [
            'personnes' => $personnes,
        ]);
    }
}
