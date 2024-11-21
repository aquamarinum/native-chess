import axios from 'axios';
import {Equine} from 'equine';
import {MovesAggregator} from '../../game/MovesAggregator';
import {CellPositionType} from '../../game/ChessBoard';

const LICHESS_WEBSOCKET_URL = 'wss://lichess.org/api/board/game/stream/';
const LICHESS_API_URL = 'https://lichess.org/api/board/game/';
const LICHESS_API_TOKEN = 'lip_KRAOC3icBKnXrNFAlZw2';
export class LichessApiService {
  gameId: string;
  converter: MovesAggregator;

  constructor(id: string) {
    this.gameId = id;
    this.converter = new MovesAggregator();
  }

  sendMove = async (move: string) => {
    try {
      const response = await axios.post(
        `${LICHESS_API_URL}${this.gameId}/move/${move}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${LICHESS_API_TOKEN}`,
          },
        },
      );
      console.log('Move sent:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error sending move:', error);
      return null;
    }
  };
  getGameState = async () => {
    try {
      const response = await axios.get(
        `https://lichess.org/api/board/game/stream/${this.gameId}`,
        {
          headers: {
            Authorization: `Bearer ${LICHESS_API_TOKEN}`,
          },
        },
      );
      return response.data.state;
    } catch (error) {
      console.error('Error fetching game state:', error);
      throw error;
    }
  };

  connectToGame = async () => {
    try {
      const response = await axios.get(
        `https://lichess.org/api/board/game/stream/${this.gameId}`,
        {
          headers: {
            Authorization: `Bearer ${LICHESS_API_TOKEN}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching game state:', error);
      throw error;
    }
  };
}

// {"black": {},
//  "createdAt": 1732040747422,
//   "id": "ZjVZ4GQO",
//    "initialFen": "startpos",
//     "perf": {"name": "Игра по переписке"},
//      "rated": false, "speed": "correspondence",
//       "state": {"binc": 0, "btime": 2147483647, "moves": "", "status": "started", "type": "gameState", "winc": 0, "wtime": 2147483647},
//        "type": "gameFull", "variant": {"key": "standard", "name": "Standard", "short": "Std"},
//         "white": {"id": "aquamarinum", "name": "aquamarinum", "provisional": true, "rating": 1500, "title": null}
//   }
