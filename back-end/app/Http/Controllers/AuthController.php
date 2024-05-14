<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();
        
        $credentials['password'] = $credentials['pwd'];
        unset($credentials['pwd']); // Vous pouvez retirer cette ligne si vous ne l'avez pas déjà dans la requête
    
        if (!Auth::attempt($credentials)) {
            return response([
                'message' => 'Le login ou le mot de passe sont incorrects!'
            ], 401);
        }

        $gestionnaire = Auth::user();
        $token = $gestionnaire->createToken('main')->plainTextToken;

        return response()->json([
            'gestionnaire' => $gestionnaire,
            'token' => $token
        ]);

    }

    public function logout(Request $request)
    {
        $gestionnaire = $request->user();

        $gestionnaire->currentAccessToken()->delete();

        // print_r(("Test"));

        return response(["message" => 'Le gestionnaire ' . $gestionnaire->nomGest . ' a bien été déconnecté!'], 204);
    }
}