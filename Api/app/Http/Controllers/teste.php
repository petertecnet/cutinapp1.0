<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;
use App\Models\User;

class UserController extends Controller
{
    protected function getValidationMessages()
    {
        return [
            'first_name.required' => 'O campo nome é obrigatório.',
            'last_name.required' => 'O campo sobrenome é obrigatório.',
            'email.required' => 'O campo e-mail é obrigatório.',
            'email.email' => 'O e-mail deve ser um endereço de e-mail válido.',
            'avatar.image' => 'O arquivo deve ser uma imagem válida.',
            'avatar.mimes' => 'A imagem deve ser do tipo: jpeg, png, jpg ou gif.',
            'avatar.max' => 'A imagem não pode ter mais de :max kilobytes.',
             ];
    }

    public function update(Request $request, $id){try {$user=Auth::user();if(!$user){return response()->json(['error'=>'Erro auth.'],401);}if($user->id!=$id&&!$user->hasPermission('update_user')){return response()->json(['error'=>'erro permission.'],403);}if($request->hasFile('avatar')){$validator=Validator::make($request->all(),['avatar'=>'image|mimes:jpeg,png,jpg,gif|max:2048'],$this->getValidationMessages());if($validator->fails()){throw new \Exception('Erro avatar:'.implode(',',$validator->errors()->all()));}$avatarPath=$request->file('avatar')->store('avatars','public');$user->avatar=$avatarPath;}$fieldsToUpdate=[];foreach($fieldsToUpdate as $field){if($request->filled($field)){$user->{$field}=$request->input($field);}}$user->save();return response()->json(['message'=>'sucesso']);}catch(\Exception$e){return response()->json(['error'=>'Error'],500);}}

}
