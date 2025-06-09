# React Component Testing

## Why Test React Components?

- Ensure UI behaves as expected
- Prevent regressions when refactoring
- Document component usage

## Tools

- **React Testing Library**: Test components as users interact with them
- **Jest**: Test runner and assertions

## Basic Example

```jsx
import { render, screen, fireEvent } from '@testing-library/react';
import Counter from './Counter';

test('renders initial count', () => {
  render(<Counter />);
  expect(screen.getByText(/count/i)).toHaveTextContent('0');
});

test('increments count on button click', () => {
  render(<Counter />);
  fireEvent.click(screen.getByRole('button', { name: /increment/i }));
  expect(screen.getByText(/count/i)).toHaveTextContent('1');
});
```

## Querying the DOM

- `getByText`, `getByRole`, `getByLabelText`, etc.
- Prefer queries that reflect user experience

## Simulating User Events

- `fireEvent.click`, `fireEvent.change`, etc.
- For more realistic events, use `@testing-library/user-event`

## Testing Forms

```jsx
test('submits form with input value', () => {
  render(<MyForm />);
  fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Alice' } });
  fireEvent.click(screen.getByRole('button', { name: /submit/i }));
  expect(screen.getByText(/hello, alice/i)).toBeInTheDocument();
});
```

## Mocking Props and Context

- Pass different props to test variations
- Use context providers for context-dependent components

## Snapshot Testing

```jsx
import renderer from 'react-test-renderer';
import Button from './Button';

test('matches snapshot', () => {
  const tree = renderer.create(<Button>Click me</Button>).toJSON();
  expect(tree).toMatchSnapshot();
});
```

## Best Practices

- Test behavior, not implementation details
- Avoid relying on component internals
- Clean up after each test (handled automatically by RTL)
- Use `screen` for queries

## Exercise

1. Write a test for a `TodoList` component that adds and removes todos.
2. Test a form component for validation and submission.

## Next Steps

Explore integration and end-to-end testing for full user flows.
