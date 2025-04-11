import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // MemoryRouter をインポート
import App from './App';
import { describe, it, expect } from 'vitest'; // describe, it, expect をインポート

describe('App Component', () => {
  it('should render the home page initially', () => { // テスト名をより具体的に
    render(
      <MemoryRouter initialEntries={['/']}> {/* MemoryRouter でラップ */}
        <App />
      </MemoryRouter>
    );
    // 初期表示されるホームページのタイトルが表示されていることを確認
    expect(screen.getByRole('heading', { name: /home page/i })).toBeInTheDocument();
  });
});
