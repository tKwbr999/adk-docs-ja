import { render, screen } from '@testing-library/react';
import App from './App'; // テスト対象のコンポーネントをインポート

describe('App Component', () => {
  it('should render without crashing', () => {
    render(<App />);
    // 初期表示されるホームページのタイトルが表示されていることを確認
    expect(screen.getByRole('heading', { name: /home page/i })).toBeInTheDocument();
  });
});
