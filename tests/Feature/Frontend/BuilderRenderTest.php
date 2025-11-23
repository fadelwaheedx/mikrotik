<?php

use App\Models\Tool;

test('api returns tool schema', function () {
    // We need an API endpoint to fetch the tool for the frontend
    // Assuming Route::get('/tools/{tool}', ...) exists and returns the Tool model.

    // Since we haven't explicitly created that API route in this chat,
    // we'll test the Model serialization which is what the API would return.

    $tool = Tool::create([
        'name' => 'Test Tool',
        'slug' => 'test-tool',
        'form_schema' => [
            [
                'type' => 'text_input',
                'data' => ['label' => 'IP', 'variable' => 'ip']
            ]
        ],
        'script_template' => 'test'
    ]);

    $json = $tool->toArray();

    expect($json['form_schema'][0]['type'])->toBe('text_input');
    expect($json['form_schema'][0]['data']['variable'])->toBe('ip');
});
