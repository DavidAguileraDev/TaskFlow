<?php

namespace App\Controller;

use App\Entity\Tarea;
use App\Entity\User;
use App\Enum\Prioridad;
use App\Repository\TareaRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

final class TareaController extends AbstractController
{
    #[Route('api/tareas/creador/{id}', name: 'api_tareas_por_creador', methods: ['GET'])]
    public function getTaskByUserId(int $id, TareaRepository $tareaRepository): JsonResponse
    {

        $usuario = $this->getUser();

        if (!$usuario instanceof User || $usuario->getId() !== $id) {
            return $this->json(['success' => false ,'error' => 'No autorizado'], 403);
        }

        $tareas = $tareaRepository->findPorCreador($id);


        return $this->json([
            'success' => true,
            'tareas' => array_map(static fn(Tarea $tarea): array => [
                'id' => $tarea->getId(),
                'titulo' => $tarea->getTitulo(),
                'completada' => $tarea->isCompletada(),
                'prioridad' => $tarea->getPrioridad()?->value,
                'fechaVencimiento' => $tarea->getFechaVencimiento()?->format('Y-m-d'),
                'inTrash' => $tarea->isInTrash(),
            ], $tareas),
        ]);
    }

    #[Route('/api/tareas/creador/{id}/aniadir', name: 'api_tareas_aniadir', methods: ['POST'])]
    public function aniadirTarea(int $id, Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $usuario = $this->getUser();

        if (!$usuario instanceof User || $usuario->getId() !== $id) {
            return $this->json(['success' => false, 'error' => 'No autorizado'], 403);
        }

        $datos = $request->toArray();

        $titulo = trim((string) ($datos['titulo'] ?? ''));

        if (!$titulo) {
            return $this->json(['success' => false, 'error' => 'El título es obligatorio'], 400);
        }

        if (mb_strlen($titulo, 'UTF-8') > 128) {
            return $this->json(['success' => false, 'error' => 'El título es demasiado largo'], 400);
        }

        $prioridad = Prioridad::tryFrom((int) ($datos['prioridad'] ?? 0));

        if (!$prioridad) {
            return $this->json(['success' => false, 'error' => 'La prioridad debe ser 1, 2 o 3'], 400);
        }

        $fechaVencimiento = null;
        $fechaTexto = $datos['fechaVencimiento'] ?? null;

        if ($fechaTexto !== null && $fechaTexto !== '') {
            $fecha = \DateTime::createFromFormat('!Y-m-d', (string) $fechaTexto);
            $errores = \DateTime::getLastErrors();

            if ($fecha === false || ($errores !== false && ($errores['warning_count'] > 0 || $errores['error_count'] > 0))) {
                return $this->json(['success' => false, 'error' => 'La fecha debe tener formato Y-m-d'], 400);
            }

            $fechaVencimiento = $fecha;
        }

        $tarea = new Tarea();
        $tarea->setTitulo($titulo);
        $tarea->setCompletada(false);
        $tarea->setPrioridad($prioridad);
        $tarea->setFechaVencimiento($fechaVencimiento);
        $tarea->setInTrash(false);

        $usuario->addTarea($tarea);

        $entityManager->persist($tarea);
        $entityManager->flush();

        return $this->json([
            'success' => true,
            'tarea' => [
                'id' => $tarea->getId(),
                'titulo' => $tarea->getTitulo(),
                'completada' => $tarea->isCompletada(),
                'prioridad' => $tarea->getPrioridad()?->value,
                'fechaVencimiento' => $tarea->getFechaVencimiento()?->format('Y-m-d'),
                'inTrash' => $tarea->isInTrash(),
            ],
        ], 201);
    }
}
