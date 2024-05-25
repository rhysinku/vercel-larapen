<?php

namespace App\Http\Controllers;

use App\Models\Editor;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class EditorController extends Controller
{
    //

    public function index($user_id=null , $id=null){


        $editor = null;
        if($user_id && $id){
            $editor = Editor::where('user_id' , $user_id)->where('code_id', $id)->first();
        }
      
        return view('Editor.editor' , compact('editor'));
    }



    public function create(Request $request ){
        $Authuser = Auth::user();
       
         $data = $request->all();
        $result =  Editor::create([
            'user_id' => $Authuser->id,
            'title' => $data['codetitle'],
            'htmlcode' => $data['htmlcode'],
            'csscode' => $data['csscode'],
            'jscode' => $data['jscode'],
        ]);

        $userWithEditors = $Authuser->load('editors');
        //  dd($userWithEditors->editors);
        
        //  return redirect('/editor/'. $result->user_id . '/' .$result->id)->with('success', 'Editor Created Successfully');
        return redirect()->route('editor.display' , ['user_id' => $result->user_id , 'id' => $result->code_id])
        ->with('success', 'Editor Created Successfully');
    }


    public function update(Request $request, $id){
        $editorId = Editor::where('code_id', $id)->first();
        $editorId->update($request->all());

        return redirect()->route('editor.display', ['user_id' => $editorId->user_id, 'id' => $editorId->code_id])
        ->with('success', 'Editor Updated Successfully');
    }
}