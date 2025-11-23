<?php

namespace Tests;

use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

abstract class TestCase extends BaseTestCase
{
    // In a full Laravel app, this trait handles booting the app.
    // Since we are scaffolding, we assume standard structure.
    use CreatesApplication;
}
