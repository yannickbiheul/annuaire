<?php

namespace App\Controller;

use App\Entity\Personne;
use App\Repository\PersonneRepository;
use Doctrine\ORM\EntityManagerInterface;
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
     * Afficher une personne depuis l'id
     */
    #[Route('/api/personnes/id/{id}', name: 'detailPersonneId', methods: ['GET'])]
    public function readPersonneById(Personne $personne, SerializerInterface $serializer): JsonResponse
    {
        $jsonPersonne = $serializer->serialize($personne, 'json');

        return new JsonResponse($personne, Response::HTTP_OK, [], true);
    }

    /**
     * Afficher une personne depuis le prenom
     */
    #[Route('/api/personnes/prenom/{prenom}', name: 'detailPersonnePrenom', methods: ['GET'])]
    public function readPersonneByPrenom($prenom, PersonneRepository $personneRepository, SerializerInterface $serializer, EntityManagerInterface $em): JsonResponse
    {
        if (str_contains($prenom, ' ')) {
            $tableauPrenom = explode(' ', $prenom);
            $query = $em->createQuery("SELECT p.id, p.prenom, p.nom 
                                        FROM App:Personne AS p 
                                        WHERE p.prenom LIKE :val1 AND p.nom LIKE :val2
                                        OR p.nom LIKE :val1 AND p.prenom LIKE :val2
                                        OR p.prenom LIKE :val1 OR p.nom LIKE :val2");
            $query->setParameter('val1', '%' . $tableauPrenom[0] . '%');
            $query->setParameter('val2', '%' . $tableauPrenom[1] . '%');
        } else {
            $query = $em->createQuery("SELECT p.id, p.prenom, p.nom FROM App:Personne AS p WHERE p.prenom LIKE :val OR p.nom LIKE :val");
            $query->setParameter('val', '%' . $prenom . '%');
        }
        
        $listPersonnes = $query->getResult();
        $jsonListPersonnes = $serializer->serialize($listPersonnes, 'json');

        return new JsonResponse($jsonListPersonnes, Response::HTTP_OK, [], true);
    }
}
