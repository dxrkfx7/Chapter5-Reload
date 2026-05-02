const express = require("express");
const app = express.Router();


app.post('/matchmaking/api/v1/sessions/matches', (req, res) => {
    const accountId = req.headers['x-epic-account-id'] || "EPYC_USER";
    
    res.status(200).json({
        "matches": [{
            "id": "match_session_epyc",
            "status": "CREATED",
            "sessionId": "epyc_session_id",
            "queuedPlayers": [],
            "totalPlayers": 1,
            "full": false,
            "owningPlayerId": accountId
        }],
        "ticket": "v29_match_ticket_authorized" 
    });
});


app.get('/matchmaking/api/v1/sessions/public/advertise', (req, res) => {
    res.json({
        "sessions": [{
            "id": "epyc_session_id",
            "ownerId": "SYSTEM",
            "ownerName": "hostaccount",
            "serverAddress": "modern-upstairs.gl.at.ply.gg:9601", // Setze hier deine EPYC VPS IP ein
            "serverPort": 7777,
            "maxPublicPlayers": 16,
            "openPublicPlayers": 15,
            "attributes": {
                "PLAYLISTNAME_s": "playlist_defaultsolo",
                "SESSIONKEY_s": "better_reload_key"
            }
        }]
    });
});

module.exports = app;