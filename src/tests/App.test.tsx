import React from 'react';
import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect"

import App from '../components/App';

test("app renders", () => {
    render(<App />);
    const header = screen.getByText(/Todo List/);
    expect(header).toBeInTheDocument();
});