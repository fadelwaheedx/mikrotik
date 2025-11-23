<?php

namespace Tests\Feature;

use App\Models\SavedScript;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ToolSavingTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_save_script(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->post(route('tools.save'), [
            'title' => 'My PCC Script',
            'type' => 'pcc',
            'config_json' => json_encode(['wans' => []]),
            'generated_script' => '/ip firewall mangle...',
        ]);

        $response->assertRedirect();
        $response->assertSessionHas('success');

        $this->assertDatabaseHas('saved_scripts', [
            'title' => 'My PCC Script',
            'user_id' => $user->id,
            'type' => 'pcc',
        ]);
    }

    public function test_save_validation_fails_if_fields_missing(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->post(route('tools.save'), [
            'title' => '', // Empty title
        ]);

        $response->assertSessionHasErrors(['title', 'type', 'config_json', 'generated_script']);
    }

    public function test_user_can_delete_own_script(): void
    {
        $user = User::factory()->create();
        $script = SavedScript::factory()->create([
            'user_id' => $user->id,
            'title' => 'Script to Delete'
        ]);

        $response = $this->actingAs($user)->delete(route('tools.destroy', $script->id));

        $response->assertRedirect();
        $this->assertDatabaseMissing('saved_scripts', [
            'id' => $script->id,
        ]);
    }

    public function test_user_cannot_delete_others_script(): void
    {
        $owner = User::factory()->create();
        $attacker = User::factory()->create();

        $script = SavedScript::factory()->create([
            'user_id' => $owner->id,
        ]);

        $response = $this->actingAs($attacker)->delete(route('tools.destroy', $script->id));

        // Since we use findOrFail on scoped query, it returns 404
        $response->assertNotFound();

        $this->assertDatabaseHas('saved_scripts', [
            'id' => $script->id,
        ]);
    }
}
