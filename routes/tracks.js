const express = require("express");
const app = express.Router();

app.get("/api/v1/games/fortnite/tracks/activeBy/:date", (req, res) => {
    res.json([
        {
            "gameId": "fortnite",
            "trackguid": "gr4p3s",
            "rankingType": "delmar-competitive",
            "beginTime": "2026-03-19T06:00:01Z",
            "endTime": "2026-07-01T00:00:00Z",
            "divisionCount": 18,
            "leaderboardTrackingEventId": "epicgames_ranked_rr_season11"
        },
        {
            "gameId": "fortnite",
            "trackguid": "L3AGUE",
            "rankingType": "ranked-br-combined",
            "beginTime": "2026-03-19T06:00:01Z",
            "endTime": "2026-07-01T23:59:00Z",
            "divisionCount": 18,
            "leaderboardTrackingEventId": "epicgames_ranked_br_season40"
        },
        {
            "gameId": "fortnite",
            "trackguid": "c1ty17",
            "rankingType": "ranked-feral",
            "beginTime": "2026-03-19T06:00:01Z",
            "endTime": "2026-07-01T23:59:00Z",
            "divisionCount": 18,
            "leaderboardTrackingEventId": "epicgames_ranked_feral_season40"
        },
        {
            "gameId": "fortnite",
            "trackguid": "ST33L5",
            "rankingType": "ranked_blastberry_build",
            "beginTime": "2026-02-19T09:00:01Z",
            "endTime": "2026-08-18T23:59:00Z",
            "divisionCount": 18,
            "leaderboardTrackingEventId": "epicgames_ranked_blastberry_build_season39v2"
        },
        {
            "gameId": "fortnite",
            "trackguid": "ST0RM5",
            "rankingType": "ranked_blastberry_nobuild",
            "beginTime": "2026-02-19T09:00:01Z",
            "endTime": "2026-08-18T23:59:00Z",
            "divisionCount": 18,
            "leaderboardTrackingEventId": "epicgames_ranked_blastberry_zb_season39v2"
        }
    ]);
});

app.get("/api/v1/games/fortnite/trackprogress/:idk", (req, res) => {
    res.json({});
});

app.get("/api/content/v2/launch-data", (req, res) => {
    res.status(204).end();
});

app.post("/catalog/api/shared/namespace/fn/bulk/offers", (req, res) => {
    res.status(204).end();
});

app.put("/profile/languages", (req, res) => {
    res.json({});
});

app.put("/profile/privacy_settings", (req, res) => {
    res.json({
        "privacySettings": {
            "playRegion": "PRIVATE",
            "badges": "FRIENDS_ONLY",
            "languages": "PRIVATE"
        }
    });
});

app.get("/api/v1/lfg/Fortnite/users/:accountId/settings", (req, res) => {
    res.json({
		"isLookingForGroup": false,
		"preferredRegion": "EU"
	});
});

app.get("/api/v1/public/accounts", (req, res) => {
    res.json({
        "accounts": [
            {
            "accountId": req.query.accountId,
            "tags": [
                {
                "id": "c8eaf7c8365f478e99a20ff70a83e689",
                "name": "BR - Trios",
                "types": ["Game Modes"],
                "primary": false,
                "locale": "en-US",
                "defaultLocaleName": "BR - Trios"
                },
                {
                "id": "9614aa25267041ad8c7d6e17296fdc65",
                "name": "BR - Squads",
                "types": ["Game Modes"],
                "primary": false,
                "locale": "en-US",
                "defaultLocaleName": "BR - Squads"
                },
                {
                "id": "d9e00ab236c343268ebc1fe479b960e6",
                "name": "BR - Duos",
                "types": ["Game Modes"],
                "primary": false,
                "locale": "en-US",
                "defaultLocaleName": "BR - Duos"
                }
            ]
            }
        ]
    });
})

app.post("/api/v1/games/fortnite/trackprogress/byAccountIds/:shit", (req, res) => {
    res.status(204).end();
})

module.exports = app;