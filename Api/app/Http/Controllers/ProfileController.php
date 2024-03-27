<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\{Profile};
use Illuminate\Support\Facades\Auth;

class ProfileController extends Controller
{
    

    public function store(Request $request)
{
    try {
        // Verificar se o usuário está autenticado
        if (!Auth::check()) {
            return response()->json(['error' => 'Usuário não autenticado.'], 401);
        }

        // Obter o usuário autenticado
        $user = Auth::user();

        // Verificar se o usuário possui permissão para criar perfis
        if (!$user->hasPermission('profile_create')) {
            return response()->json(['error' => 'Você não tem permissão para criar perfis.'], 403);
        }

        $data = $request->validate([
            'name' => 'required|string',
            'permissions' => 'nullable|array',
        ]);

        // Console log para mostrar os dados recebidos
        \Log::info('Dados recebidos para criação de perfil:', $data);

        $profile = Profile::create($data);

        return response()->json(['success' => 'Perfil criado com sucesso.', 'profile' => $profile], 201);
    } catch (\Exception $e) {
        // Console log para mostrar o erro
        \Log::error('Erro ao criar perfil:', ['exception' => $e]);

        return response()->json(['error' => 'Erro ao criar perfil. Por favor, tente novamente.'], 500);
    }
}


    

    public function edit(Profile $profile)
    {
        if (!auth()->user()->hasPermission('profile_edit')) {
            return redirect()->route('home')->with('error','Você não tem permissão para editar perfils.');
        }
        return view('profiles.edit', compact('profile'));
    }

    public function update(Request $request, Profile $profile)
    {
        if (!auth()->user()->hasPermission('profile_edit')) {
            return redirect()->route('home')->with('error','Você não tem permissão para editar perfils.');
        }
        $data = $request->validate([
            'name' => 'required|string',
            'permissions' => 'nullable|array',
        ]);

        $profile->update($data);

        return redirect()->route('profile.index')->with('success', 'Perfil atualizado com sucesso.');
    }

    public function destroy(Profile $profile)
    {
        if (!auth()->user()->hasPermission('profile_delete')) {
            return redirect()->route('home')->with('error','Você não tem permissão para deletar perfils.');
        }
        $profile->delete();

        return redirect()->route('profile.index')->with('success', 'Perfil deletado com sucesso.');
    }
}
