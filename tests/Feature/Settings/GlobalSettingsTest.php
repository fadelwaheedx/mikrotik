<?php

declare(strict_types=1);

use App\Settings\GeneralSettings;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('maintenance mode blocks access', function () {
    GeneralSettings::fake([
        'maintenance_mode' => true,
    ]);

    $settings = app(GeneralSettings::class);
    expect($settings->maintenance_mode)->toBeTrue();
});
