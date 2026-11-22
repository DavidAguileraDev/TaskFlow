<?php

namespace App\Security;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Http\Authentication\AuthenticationSuccessHandlerInterface;
use App\Entity\User;

class AuthenticationSuccessHandler implements AuthenticationSuccessHandlerInterface
{
    public function onAuthenticationSuccess(
        Request $request,
        TokenInterface $token
    ): JsonResponse {

        $user = $token->getUser();

        if (!$user instanceof User) {
            throw new \LogicException('El usuario autenticado no es válido.');
        }
        
        return new JsonResponse([
            'message' => 'Inicio de sesión correcto',
            'user' => [
                'id' => $user->getId(),
                'name' => $user->getName(),
                'email' => $user->getEmail()
            ]
        ]);
    }
}
