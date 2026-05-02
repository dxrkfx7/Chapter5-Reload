const express = require("express");
const app = express.Router();
const Profile = require("../model/profiles.js");
const Friends = require("../model/friends.js");
const functions = require("../structs/functions.js");
const log = require("../structs/log.js");
const error = require("../structs/error.js");

const { verifyToken, verifyClient } = require("../tokenManager/tokenVerify.js");
const keychain = require("../responses/keychain.json");

// Hilfsfunktion f�r ein valides C5S2 Catalog-Objekt, falls die Datenbank leer ist
const getV29FallbackCatalog = () => {
    return {
        "refreshIntervalHrs": 24,
        "dailyPurchaseLimit": -1,
        "expiration": "2027-01-01T00:00:00Z", // Muss in der Zukunft liegen!
        "storefronts": [
            {
                "name": "BRDailyStorefront",
                "catalogEntries": [
                    {
                        "offerId": "v29_ares_special",
                        "devName": "Ares Boss Skin",
                        "offerType": "StaticPrice",
                        "prices": [{ "currencyType": "MtxCurrency", "amount": 0 }],
                        "categories": ["Daily"],
                        "itemGrants": [{ "templateId": "AthenaCharacter:CID_Ares", "quantity": 1 }],
                        "requirements": [],
                        "giftInfo": { "bIsEnabled": true, "forcedGiftBoxTemplateId": "", "purchaseVerifyConfigOverride": "" },
                        "metaInfo": [{ "key": "DisplayAssetPath", "value": "/Game/Catalog/DisplayAssets/DA_Ares.DA_Ares" }]
                    }
                ]
            },
            {
                "name": "BRWeeklyStorefront",
                "catalogEntries": []
            }
        ]
    };
};

app.get("/fortnite/api/storefront/v2/catalog", (req, res) => {
    log.debug("Request to /fortnite/api/storefront/v2/catalog");
    if (req.headers["user-agent"] == undefined) return;
    if (req.headers["user-agent"].includes("2870186")) {
        return res.status(404).end();
    }
    
    //const shop = functions.getItemShop();
    //if (!shop) {
    //    log.error("getItemShop returned undefined/null");
    //    return res.status(500).json({ error: "Failed to load catalog" });
    //}
    //res.json(shop);

    res.json(require("../responses/catalog.json"));
});


app.get("/fortnite/api/storefront/v2/gift/check_eligibility/recipient/:recipientId/offer/:offerId", verifyToken, async (req, res) => {
    log.debug(`Gift eligibility check for ${req.params.offerId}`);
    
    const findOfferId = functions.getOfferID(req.params.offerId);
    if (!findOfferId) return error.createError("errors.com.epicgames.fortnite.id_invalid", "Offer ID not found", [req.params.offerId], 16027, undefined, 400, res);

    let sender = await Friends.findOne({ accountId: req.user.accountId }).lean();
    if (!sender) return error.createError("errors.com.epicgames.friends.no_relationship", "User has no friends list", [req.user.accountId], 28004, undefined, 403, res);

    // Check friendship
    if (!sender.list.accepted.find(i => i.accountId == req.params.recipientId) && req.params.recipientId != req.user.accountId) {
        return error.createError("errors.com.epicgames.friends.no_relationship", "Not friends", [req.user.accountId, req.params.recipientId], 28004, undefined, 403, res);
    }

    const profiles = await Profile.findOne({ accountId: req.params.recipientId });
    if (!profiles) return error.createError("errors.com.epicgames.account.account_not_found", "Recipient not found", [req.params.recipientId], 18007, undefined, 404, res);

    let athena = profiles.profiles["athena"];
    for (let itemGrant of findOfferId.offerId.itemGrants) {
        for (let itemId in athena.items) {
            if (itemGrant.templateId.toLowerCase() == athena.items[itemId].templateId.toLowerCase()) {
                return error.createError("errors.com.epicgames.modules.gamesubcatalog.purchase_not_allowed", "Recipient already owns item", [], 28004, undefined, 403, res);
            }
        }
    }

    res.json({
        price: findOfferId.offerId.prices[0],
        items: findOfferId.offerId.itemGrants
    });
});

app.get("/fortnite/api/storefront/v2/keychain", (req, res) => {
    log.debug("Request to /fortnite/api/storefront/v2/keychain");
    res.json(keychain);
});

app.get("/catalog/api/shared/bulk/offers", (req, res) => {
    res.json({});
});

module.exports = app;