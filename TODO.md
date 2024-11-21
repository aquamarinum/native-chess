### https://lichess.org/api/board/game/stream/{gameId}

{
"id": "QdzzBlzY",
"variant": {
"key": "standard",
"name": "Standard",
"short": "Std"
},
"speed": "blitz",
"perf": {
"name": "Blitz"
},
"rated": true,
"createdAt": 1714920830966,
"white": {
"id": "bobby",
"name": "Bobby",
"title": "GM",
"rating": 1956
},
"black": {
"id": "bot1",
"name": "Bot1",
"title": "BOT",
"rating": 1500,
"provisional": true
},
"initialFen": "startpos",
"clock": {
"initial": 300000,
"increment": 0
},
"type": "gameFull",
"state": {
"type": "gameState",
"moves": "e2e4 e7e5 g1f3 b8c6 f1c4",
"wtime": 294810,
"btime": 286000,
"winc": 0,
"binc": 0,
"status": "started"
}
}

### https://lichess.org/api/board/game/{gameId}/move/{move}

{
"ok": true
}
