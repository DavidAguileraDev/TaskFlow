<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Attribute\Route;

final class AuthController extends AbstractController
{

    #[Route('/api/sign-in', name: 'api_sign_in', methods: ['POST'])]
    public function signIn(): Response
    {
        return $this->json([
            'error' => 'La autenticación debe gestionarla Symfony Security'
        ], 401);
    }

    #[Route('/api/sign-up', name: 'api_sign-Up', methods: ['POST'])]
    public function signUp(
        Request $request,
        EntityManagerInterface $entityManager,
        UserPasswordHasherInterface  $passwordHasher,
        UserRepository $userRepository
    ): Response {


        // 1. Transform the request Object to array
        $data = $request->toArray();

        $name = trim($data['name'] ?? '');
        $email = trim($data['email'] ?? '');
        $password = $data['password'] ?? '';
        $confirmPassword = $data['confirmPassword'] ?? '';
        $accept_terms = $data['acceptTerms'] ?? '';



        // 2. Make sure that fields are completed
        if ($name === '' || $email === '' || $password === '') {
            return $this->json([
                'error' => 'Todos los campos son obligatorios'
            ], 400);
        }

        // 3. Make sure that terms have been accepted
        if (!$accept_terms) {
            return $this->json([
                'error' => 'Debes aceptar los términos y condiciones'
            ], 400);
        }

        // 4. Make sure that password and passwordConfirm are equals
        if ($confirmPassword != $password) {
            return $this->json([
                'error' => 'Las contraseñas deben coincidir'
            ], 400);
        }

        // 5. Make sure that email have a valid format
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return $this->json([
                'error' => 'El email no es válido'
            ], 400);
        }

        // 6. Make sure that email are not registered
        if ($userRepository->findOneBy(['email' => $email])) {
            return $this->json([
                'error' => 'Este email ya está registrado'
            ], 409);
        }

        // 7. Create user
        $user = new User();

        $user->setName($name);
        $user->setEmail($email);

        // 8. Hashing password
        $hashedPassword = $passwordHasher->hashPassword(
            $user,
            $password
        );

        $user->setPassword($hashedPassword);


        // 9. Save the user into database
        $entityManager->persist($user);
        $entityManager->flush();

        // 10. Response to React - FrontEnd
        return $this->json([
            'message' => 'Usuario registrado correctamente',
            'user' => [
                'id' => $user->getId(),
                'name' => $user->getName(),
                'email' => $user->getEmail()
            ]
        ], 201);
    }


    #[Route('/api/me', name: 'api_me', methods: ['GET'])]
    public function me(): JsonResponse
    {
        $user = $this->getUser();

        if (!$user instanceof User) {
            return $this->json([
                'success' => false,
                'message' => 'No hay ningún usuario autenticado'
            ], 401);
        }

        return $this->json([
            'success' => true,
            'user' => [
                'id' => $user->getId(),
                'name' => $user->getName(),
                'email' => $user->getEmail()
            ]
        ]);
    }
}
