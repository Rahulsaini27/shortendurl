const Url = require('../models/Url');
const validUrl = require('valid-url');
const shortid = require('shortid');

const generateUniqueShortCode = async (maxRetries = 10) => {
    let code;
    let isUnique = false;
    let attempts = 0;

    while (!isUnique && attempts < maxRetries) {
        code = shortid.generate();
        const existingUrl = await Url.findOne({ shortCode: code });
        if (!existingUrl) {
            isUnique = true;
        }
        attempts++;
    }

    if (!isUnique) {
        throw new Error('Failed to generate a unique short code after multiple attempts.');
    }
    return code;
};

const shortenUrl = async (req, res, next) => {
    const { originalUrl } = req.body;
    const baseUrl = process.env.BASE_URL || 'http://localhost:5000';

    if (!originalUrl || !validUrl.isUri(originalUrl)) {
        return res.status(400).json({ message: 'Invalid or missing original URL provided' });
    }

    try {
        const shortCode = await generateUniqueShortCode();
        const newUrl = new Url({ originalUrl, shortCode });
        await newUrl.save();

        res.status(201).json({
            originalUrl: newUrl.originalUrl,
            shortUrl: `${baseUrl}/${newUrl.shortCode}`,
            createdAt: newUrl.createdAt,
        });

    } catch (err) {
        next(err);
    }
};

const redirectToOriginalUrl = async (req, res, next) => {
    try {
        const { shortcode } = req.params;
        const url = await Url.findOne({ shortCode: shortcode });

        if (url) {
            url.visits++;
            await url.save();
            return res.redirect(url.originalUrl);
        } else {
            return res.status(404).json({ message: 'No URL found for this short code' });
        }
    } catch (err) {
        next(err);
    }
};

const getAllUrls = async (req, res, next) => {
    try {
        const urls = await Url.find({}).sort({ createdAt: -1 });
        res.status(200).json(urls);
    } catch (err) {
        next(err);
    }
};

module.exports = {
    shortenUrl,
    redirectToOriginalUrl,
    getAllUrls,
};