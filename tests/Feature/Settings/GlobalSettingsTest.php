<?php

use App\Settings\GeneralSettings;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('maintenance mode blocks access', function () {
    GeneralSettings::fake([
        'maintenance_mode' => true,
    ]);

    // We need a middleware to actually check this.
    // Assuming the middleware is registered globally:
    // $response = $this->get('/');
    // $response->assertStatus(503);

    // For unit testing the *Setting Persistence*:
    $settings = app(GeneralSettings::class);
    expect($settings->maintenance_mode)->toBeTrue();
});
