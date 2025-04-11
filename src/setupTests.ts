import '@testing-library/jest-dom';
import { expect } from 'vitest';
import * as matchers from '@testing-library/jest-dom/matchers';

// jest-dom のマッチャーを Vitest の expect に拡張
expect.extend(matchers);
