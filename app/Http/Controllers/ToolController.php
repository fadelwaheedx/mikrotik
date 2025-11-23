<?php

namespace App\Http\Controllers;

use App\Models\SavedScript;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ToolController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'type' => 'required|string|max:50',
            'config_json' => 'required|string', // JSON string of inputs
            'generated_script' => 'required|string',
        ]);

        SavedScript::create([
            'user_id' => auth()->id(),
            'title' => $request->title,
            'type' => $request->type,
            'config_json' => $request->config_json,
            'generated_script' => $request->generated_script,
        ]);

        return redirect()->back()->with('success', 'Script saved successfully.');
    }
}
