const express = require("express");
const router = express.Router();

// ==========================================================
// 1. KRITISCHE FIXES (Behebt "Fortnite was not started correctly")
// ==========================================================

// Hotconfigs Fix für Chapter 5
router.get("/hotconfigs/v2/livefn.json", (req, res) => {
    res.json({
        "configs": {
            "fortnite.game.v2": {
                "p": { "use_f_v2": true, "enable_v2_discovery": true }
            }
        }
    });
});

// Keychain Fix
router.get("/fortnite/api/storefront/v2/keychain", (req, res) => {
    res.json([{
        "name": "pakchunk1000-WindowsClient.pak",
        "key": "276D93712D1C6092C442D170B8956002"
    }]);
});

// Launch Data Fix
router.get("/api/v1/content/v2/launch-data", (req, res) => {
    res.json({ "active": true, "launch_data": {} });
});

// ==========================================================
// 2. OAUTH & ACCOUNT FIXES (Behebt 'accountId' von undefined)
// ==========================================================

// Token Info Fix
router.post("/epic/oauth/v2/tokenInfo", (req, res) => {
    res.json({
        "clientId": "ec684b8c687f4795a33fddc5586951f0",
        "accountId": req.body.accountId || "961910511faf4a28902d29c0b828687b",
        "expiresIn": 28800
    });
});

// Revoke & Kill Sessions
router.post("/epic/oauth/v2/revoke", (req, res) => res.status(204).end());
router.delete("/account/api/oauth/sessions/kill*", (req, res) => res.status(204).end());

// ==========================================================
// 3. PROFILE & SOCIAL (Behebt Missing Endpoints aus Bild 0899b8)
// ==========================================================

// Profile Settings & Privacy
router.put("/profile/*/privacy_settings", (req, res) => res.status(204).end());
router.put("/profile/*/languages", (req, res) => res.status(204).end());
router.get("/party/api/v1/Fortnite/user/*/settings/privacy", (req, res) => res.json({}));

// Interactions & Content Controls
router.get("/content-controls/*", (req, res) => res.json({ "unlocked": true }));
router.get("/api/v2/interactions/*", (req, res) => res.json([]));
router.get("/api/v1/assets/Fortnite/*", (req, res) => res.json({}));

// App Installation Status
router.get("/app_installation/status", (req, res) => res.json({ "status": "INSTALLED" }));

// ==========================================================
// 4. LOBBY & MOTD (Behebt fehlende News/Surfaces)
// ==========================================================

router.post("/api/v1/fortnite-br/surfaces/*/target", (req, res) => {
    res.json({ "status": "OK", "content": [] });
});

// Hudson & Link Status
router.get("/hudson", (req, res) => res.json({ "status": "OK" }));
router.all("/api/v1/links/lock-status/*", (req, res) => res.json({ "isLocked": false }));

// ==========================================================
// 5. TELEMETRIE (Stoppt die Log-Flut)
// ==========================================================

router.all([
    "*/datarouter/*", 
    "*/telemetry/*", 
    "/fortnite/api/feedback/*"
], (req, res) => res.status(204).end());

module.exports = router;