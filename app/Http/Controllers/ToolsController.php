<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\SavedScript;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class ToolsController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'type' => 'required|string|max:50',
            'config_json' => 'required|string',
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

    public function destroy(string $id): RedirectResponse
    {
        $script = SavedScript::where('user_id', auth()->id())->findOrFail($id);
        $script->delete();

        return redirect()->back()->with('success', 'Script deleted successfully.');
    }
}
