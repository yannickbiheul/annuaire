<?php

namespace App\Controller;

use App\Entity\Personne;
use App\Repository\PersonneRepository;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

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

    /**
     * Afficher la liste des personnes
     */
    #[Route('/api/personnes', name: 'personnes', methods: ['GET'])]
    public function readPersonnes(PersonneRepository $personneRepository, SerializerInterface $serializer): JsonResponse
    {
        $listPersonnes = $personneRepository->findAll();
        $jsonListPersonnes = $serializer->serialize($listPersonnes, 'json');

        return new JsonResponse($jsonListPersonnes, Response::HTTP_OK, [], true);
    }

    /**
     * Afficher une personne
     */
    #[Route('/api/personnes/{id}', name: 'detailPersonne', methods: ['GET'])]
    public function readPersonneById(Personne $personne, SerializerInterface $serializer): JsonResponse
    {
        $jsonPersonne = $serializer->serialize($personne, 'json');

        return new JsonResponse($personne, Response::HTTP_OK, [], true);
    }
}
