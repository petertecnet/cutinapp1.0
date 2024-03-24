<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use App\Models\User;

use Intervention\Image\Facades\Image;

class UserController extends Controller
{
    // Função para obter mensagens de validação personalizadas
    protected function getValidationMessages()
    {
        return [
            'first_name.required' => 'O campo :attribute é obrigatório.',
            'avatar.image' => 'O arquivo deve ser uma imagem.',
            'avatar.mimes' => 'O arquivo deve ter um formato de imagem válido (jpeg, png, jpg, gif).',
            'avatar.max' => 'O tamanho máximo do arquivo é de 2MB.',
            // Adicione mensagens de validação para outros campos conforme necessário
        ];
    }

    // Função para atualizar os detalhes do usuário
    public function update(Request $request, $userId)
    {
        try {
            // Verificar se o usuário está autenticado
            $user = Auth::user();
            if (!$user) {
                Log::error('Usuário não autenticado.');
                return response()->json(['error' => 'Usuário não autenticado.'], 401);
            }

            // Verificar se o usuário tem permissão para atualizar
            if ($user->id != $userId && !$user->hasPermission('update_user')) {
                Log::error('Usuário não tem permissão para atualizar este usuário.');
                return response()->json(['error' => 'Você não tem permissão para atualizar este usuário.'], 403);
            }

            // Validar os dados recebidos
            $validator = Validator::make($request->all(), [
                'first_name' => 'nullable',
                'last_name' => 'nullable',
                'email' => 'nullable|email',
                'verification_code' => 'nullable',
                'avatar' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // Tamanho máximo de 2MB
                'password' => 'nullable|min:6',
                'reset_password_code' => 'nullable',
                'reset_password_expires_at' => 'nullable|date',
                'remember_token' => 'nullable',
                'profile_id' => 'nullable|numeric',
                'cpf' => 'nullable',
                'address' => 'nullable',
                'phone' => 'nullable',
                'city' => 'nullable',
                'uf' => 'nullable',
                'postal_code' => 'nullable',
                'birthdate' => 'nullable|date',
                'gender' => 'nullable',
                'marital_status' => 'nullable',
                'occupation' => 'nullable',
                'about' => 'nullable',
                'favorite_artist' => 'nullable',
                'favorite_genre' => 'nullable',
                'payment_method' => 'nullable',
                'newsletter_subscription' => 'nullable|boolean',
                'ticket_purchases' => 'nullable|numeric',
                'account_balance' => 'nullable|numeric',
                'is_producer' => 'nullable|boolean',
                'is_participant' => 'nullable|boolean',
                'is_promoter' => 'nullable|boolean',
                'is_partner' => 'nullable|boolean',
                'is_ticket_seller' => 'nullable|boolean',
                'extra_info' => 'nullable',
                // Adicione validações para outros campos conforme necessário
            ], $this->getValidationMessages());

            if ($validator->fails()) {
                return response()->json(['error' => $validator->errors()->first()], 400);
            }

            // Encontrar o usuário a ser atualizado
            $userToUpdate = User::findOrFail($userId);

            // Atualizar os campos fornecidos
            if ($request->has('first_name')) {
                $userToUpdate->first_name = $request->input('first_name');
            }
            if ($request->has('last_name')) {
                $userToUpdate->last_name = $request->input('last_name');
            }
            if ($request->has('email')) {
                $userToUpdate->email = $request->input('email');
            }
            if ($request->has('verification_code')) {
                $userToUpdate->verification_code = $request->input('verification_code');
            }

            if ($request->has('avatar')) {
                $avatar = $request->file('avatar');
                $userId = $userToUpdate->id;
                $extension = $avatar->getClientOriginalExtension();
                $avatarName = $userId . '-' . time() . '.' . $extension;
                $avatarPath = 'public/users/' . $userId . '/avatar';

                // Salva a imagem original
                $avatar->storeAs($avatarPath, $avatarName);

                // Abre a imagem com o Intervention Image
                $image = Image::make(storage_path('app/' . $avatarPath . '/' . $avatarName));

                // Redimensiona a imagem para 500x500 mantendo a proporção
                $image->resize(250, 250, function ($constraint) {
                    $constraint->aspectRatio();
                });

                // Salva a imagem redimensionada
                $image->save(storage_path('app/' . $avatarPath . '/' . $avatarName));

                // Atualiza o caminho do avatar no usuário
                $userToUpdate->avatar = 'users/' . $userId . '/avatar/' . $avatarName;
            } else {
                // Log de erro se não houver arquivo de avatar enviado
                error_log("Nenhum arquivo de avatar enviado.");
            }
            if ($request->has('password')) {
                $userToUpdate->password = bcrypt($request->input('password'));
            }
            if ($request->has('reset_password_code')) {
                $userToUpdate->reset_password_code = $request->input('reset_password_code');
            }
            if ($request->has('reset_password_expires_at')) {
                $userToUpdate->reset_password_expires_at = $request->input('reset_password_expires_at');
            }
            if ($request->has('remember_token')) {
                $userToUpdate->remember_token = $request->input('remember_token');
            }
            if ($request->has('profile_id')) {
                $userToUpdate->profile_id = $request->input('profile_id');
            }
            if ($request->has('cpf')) {
                $userToUpdate->cpf = $request->input('cpf');
            }
            if ($request->has('address')) {
                $userToUpdate->address = $request->input('address');
            }
            if ($request->has('phone')) {
                $userToUpdate->phone = $request->input('phone');
            }
            if ($request->has('city')) {
                $userToUpdate->city = $request->input('city');
            }
            if ($request->has('uf')) {
                $userToUpdate->uf = $request->input('uf');
            }
            if ($request->has('postal_code')) {
                $userToUpdate->postal_code = $request->input('postal_code');
            }
            if ($request->has('birthdate')) {
                $userToUpdate->birthdate = $request->input('birthdate');
            }
            if ($request->has('gender')) {
                $userToUpdate->gender = $request->input('gender');
            }
            if ($request->has('marital_status')) {
                $userToUpdate->marital_status = $request->input('marital_status');
            }
            if ($request->has('occupation')) {
                $userToUpdate->occupation = $request->input('occupation');
            }
            if ($request->has('about')) {
                $userToUpdate->about = $request->input('about');
            }
            if ($request->has('favorite_artist')) {
                $userToUpdate->favorite_artist = $request->input('favorite_artist');
            }
            if ($request->has('favorite_genre')) {
                $userToUpdate->favorite_genre = $request->input('favorite_genre');
            }
            if ($request->has('payment_method')) {
                $userToUpdate->payment_method = $request->input('payment_method');
            }
            if ($request->has('newsletter_subscription')) {
                $userToUpdate->newsletter_subscription = $request->input('newsletter_subscription');
            }
            if ($request->has('ticket_purchases')) {
                $userToUpdate->ticket_purchases = $request->input('ticket_purchases');
            }
            if ($request->has('account_balance')) {
                $userToUpdate->account_balance = $request->input('account_balance');
            }
            if ($request->has('is_producer')) {
                $userToUpdate->is_producer = $request->input('is_producer');
            }
            if ($request->has('is_participant')) {
                $userToUpdate->is_participant = $request->input('is_participant');
            }
            if ($request->has('is_promoter')) {
                $userToUpdate->is_promoter = $request->input('is_promoter');
            }
            if ($request->has('is_partner')) {
                $userToUpdate->is_partner = $request->input('is_partner');
            }
            if ($request->has('is_ticket_seller')) {
                $userToUpdate->is_ticket_seller = $request->input('is_ticket_seller');
            }
            if ($request->has('extra_info')) {
                $userToUpdate->extra_info = $request->input('extra_info');
            }

            // Salvar as alterações no banco de dados
            $userToUpdate->save();

            Log::info('Usuário atualizado com sucesso: ' . $userToUpdate->id);
            // Retornar uma resposta de sucesso
            return response()->json(['message' => 'Usuário atualizado com sucesso.'], 200);

        } catch (\Exception $e) {
            Log::error('Erro ao atualizar o usuário: ' . $e->getMessage());
            return response()->json(['error' => 'Ocorreu um erro ao atualizar o usuário.'], 500);
        }
    }
}
