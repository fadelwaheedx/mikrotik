<?php

namespace Tests\Unit;

use App\Models\SavedScript;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SavedScriptTest extends TestCase
{
    use RefreshDatabase;

    public function test_saved_script_belongs_to_user(): void
    {
        $user = User::factory()->create();
        $script = SavedScript::factory()->create(['user_id' => $user->id]);

        $this->assertInstanceOf(User::class, $script->user);
        $this->assertEquals($user->id, $script->user->id);
    }

    public function test_fillable_attributes(): void
    {
        $script = new SavedScript([
            'title' => 'Test Script',
            'type' => 'pcc',
            'config_json' => '{}',
            'generated_script' => 'code'
        ]);

        $this->assertEquals('Test Script', $script->title);
        $this->assertEquals('pcc', $script->type);
    }
}
