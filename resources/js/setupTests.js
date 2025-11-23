import '@testing-library/jest-dom';
import * as matchers from '@testing-library/jest-dom/matchers';
import { expect } from 'vitest';
import { toHaveNoViolations } from 'vitest-axe';

expect.extend(matchers);
expect.extend(toHaveNoViolations);
