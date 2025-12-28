# Zod Production

> Enhanced Zod validation service with configurable error logging and parsing

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)](https://www.typescriptlang.org/)
[![Zod](https://img.shields.io/badge/Zod-4.2-blue.svg)](https://zod.dev/)

A production-ready wrapper around [Zod](https://zod.dev/) that provides enhanced error logging and configurable parsing behavior. Perfect for applications that need fine-grained control over validation and error reporting.

## Features

- 🎯 **Configurable Parsing**: Enable or disable validation parsing at runtime
- 📝 **Enhanced Error Logging**: Beautiful, styled console output for Zod validation errors
- 🔒 **Type-Safe**: Full TypeScript support with proper type inference
- ⚡ **Zero Dependencies**: Only depends on Zod itself
- 🧪 **Well Tested**: Comprehensive test coverage
- 🎨 **Developer Experience**: Clear, readable error messages with issue details

## Installation

```bash
npm install zod-production
# or
pnpm add zod-production
# or
yarn add zod-production
```

## Quick Start

```typescript
import { ZodService } from 'zod-production';
import { z } from 'zod';

// Create a service instance
const zodService = new ZodService({
  isParsingEnabled: true,
  shouldLogErrors: true
});

// Define your schema
const userSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  age: z.number().min(18)
});

// Parse with automatic error logging
try {
  const user = zodService.parse(userSchema, {
    name: "John",
    email: "john@example.com",
    age: 25
  });
  console.log(user); // { name: "John", email: "john@example.com", age: 25 }
} catch (error) {
  // Error is automatically logged with styled formatting
  // Handle error as needed
}

// Or use safeParse for error handling without exceptions
const result = zodService.safeParse(userSchema, invalidData);
if (result.success) {
  console.log(result.data);
} else {
  console.error(result.error);
}
```

## API Reference

### `ZodService`

The main service class for Zod validation with enhanced error handling.

#### Constructor

```typescript
new ZodService(config: ZodServiceConfig)
```

**Config Options:**

- `isParsingEnabled` (boolean): When `false`, skips validation and returns data as-is (use with caution)
- `shouldLogErrors` (boolean): When `true`, automatically logs validation errors with styled formatting

#### Methods

##### `parse<T>(schema: T, data: unknown): z.infer<T>`

Parses data against a Zod schema and throws if validation fails.

```typescript
const user = zodService.parse(userSchema, userData);
```

##### `safeParse<T>(schema: T, data: unknown): { success: true; data: z.infer<T> } | { success: false; error: ZodError }`

Safely parses data against a Zod schema without throwing.

```typescript
const result = zodService.safeParse(userSchema, userData);
if (result.success) {
  console.log(result.data);
} else {
  console.error(result.error);
}
```

### `logZodError(error: ZodError): void`

Utility function to log Zod errors with enhanced formatting. Automatically called by `ZodService` when `shouldLogErrors` is `true`.

```typescript
import { logZodError } from 'zod-production';

try {
  schema.parse(data);
} catch (error) {
  if (error instanceof ZodError) {
    logZodError(error);
  }
}
```

## Use Cases

### Development Mode

Enable detailed error logging during development:

```typescript
const zodService = new ZodService({
  isParsingEnabled: true,
  shouldLogErrors: process.env.NODE_ENV === 'development'
});
```

### Production Mode

Disable logging in production for performance:

```typescript
const zodService = new ZodService({
  isParsingEnabled: true,
  shouldLogErrors: false
});
```

### Feature Flags

Conditionally enable/disable validation:

```typescript
const zodService = new ZodService({
  isParsingEnabled: featureFlags.enableValidation,
  shouldLogErrors: true
});
```

## Error Logging

When `shouldLogErrors` is enabled, validation errors are logged with:

- 🎨 Styled console output with colors
- 📍 Clear path indicators for nested errors
- 📋 Detailed issue information (code, expected, received, message)
- 🔍 Collapsible error groups for better readability

Example error output:
```
❌ Zod Validation Error
Message: Validation failed
Issues:
  [1] name
     Code: invalid_type
     Expected: string
     Received: number
     Message: Expected string, received number
```

## Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run linting
npm run lint

# Type checking
npm run type-check
```

## Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with [Zod](https://zod.dev/) - TypeScript-first schema validation
- Inspired by the need for better error handling in production applications
