<?php

namespace App\Entity;

use App\Repository\PersonneRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: PersonneRepository::class)]
class Personne
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(["getPersonnes"])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(["getPersonnes"])]
    private ?string $prenom = null;

    #[ORM\Column(length: 255)]
    #[Groups(["getPersonnes"])]
    private ?string $nom = null;

    #[ORM\Column(length: 255)]
    #[Groups(["getPersonnes"])]
    private ?string $tel = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPrenom(): ?string
    {
        return $this->prenom;
    }

    public function setPrenom(string $prenom): self
    {
        $this->prenom = $prenom;

        return $this;
    }

    public function getNom(): ?string
    {
        return $this->nom;
    }

    public function setNom(string $nom): self
    {
        $this->nom = $nom;

        return $this;
    }

    public function getTel(): ?string
    {
        return $this->tel;
    }

    public function setTel(string $tel): self
    {
        $this->tel = $tel;

        return $this;
    }

    public function __toString(): string
    {
        return $this->getPrenom() . ' ' .$this->getNom() . ' ' . $this->getTel();
    }
}
