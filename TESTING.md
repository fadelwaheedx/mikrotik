# Testing Strategy & Coverage

This project uses a comprehensive testing suite to ensure reliability and correctness.

## 1. Unit & Feature Tests (PHPUnit)

We use PHPUnit for backend testing. The suite covers Models, Controllers, Middleware, and Routes.

**To run the tests:**
```bash
php artisan test
```

**To check coverage:**
```bash
php artisan test --coverage
```

### Coverage Targets
*   **Models**: `User` (Attributes/Casting), `SavedScript` (Relationships).
*   **Controllers**: `ToolController` (CRUD), `PCCController` (Render).
*   **Middleware**: `EnsureUserIsPremium` (Access Control).
*   **Feature**: Dashboard data loading, Page rendering, Script saving/deletion validation.

## 2. Static Analysis (Larastan)

We use PHPStan (via Larastan) to find bugs without running code.

**To run analysis:**
```bash
./vendor/bin/phpstan analyse
```

## 3. Mutation Testing (Infection)

We use Infection to ensure test quality by "mutating" code and checking if tests fail.

**To run mutation tests:**
```bash
./vendor/bin/infection
```

## 4. Code Style (Pint)

We use Laravel Pint to automatically fix code style issues.

**To fix style:**
```bash
./vendor/bin/pint
```
