class ChessApiService {
  TOKEN: string;

  constructor() {
    this.TOKEN = 'lip_xIeD7buI2HzyqqlTy6l0';
  }

  async createGame() {
    try {
      const response = await fetch(
        'https://lichess.org/api/games/user/YOUR_USERNAME',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${this.TOKEN}`,
            'Content-Type': 'application/json',
          },
        },
      );
      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      console.log('Игра создана:', data);
      return data;
    } catch (error) {
      console.error('Ошибка при создании игры:', error);
    }
  }

  async waitForGameToStart(gameId: string) {
    // Здесь можно добавить логику ожидания, например, периодически проверять состояние игры
    console.log(`Waiting for game ${gameId} to start...`);
    // Временная задержка для имитации ожидания (можно заменить реальной логикой)
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  async makeMove(gameId: string, move: string) {
    try {
      const response = await fetch(
        `https://lichess.org/api/game/${gameId}/move/${move}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${this.TOKEN}`,
            'Content-Type': 'application/json',
          },
        },
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Move made:', data);
    } catch (error) {
      console.error('Error making move:', error);
    }
  }
}

export default new ChessApiService();
