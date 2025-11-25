<?php

declare(strict_types=1);

use App\Models\Tool;

test('api returns tool schema', function () {
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
