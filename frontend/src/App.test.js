test('renders navbar brand', () => {
  render(<App />);
  const brandText = screen.getByText(/toko online/i); // atau sesuaikan dengan isi Navbar
  expect(brandText).toBeInTheDocument();
});