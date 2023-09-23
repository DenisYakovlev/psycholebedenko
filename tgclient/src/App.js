function App() {
  const tg = window.Telegram.WebApp

  return (
    <h1>{tg.initDataUnsafe.user.id}</h1>
  );
}

export default App;
