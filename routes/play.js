const express = require('express');
const util = require('../config/util.js');
const {
    
    balanceOf,
    amountUntilSwap,
    setFees,
    calculateRewardCycleExtension
} = require('./../contract.js'); // Import necessary functions
const router = express.Router();

// Render the play page
router.get('/', function (req, res) {
    console.log('Rendering play page');
    res.render('partials/play', {
        title: 'Chess Hub - Game',
        user: req.user,
        isPlayPage: true
    });
});

// Handle game start
router.post('/', function (req, res) {
    const side = req.body.side;
    const token = util.randomString(20);
    console.log(`Game started with token: ${token} and side: ${side}`);
    res.redirect('/game/' + token + '/' + side);
});



// Implement the route for getting the balance of an address
router.get('/balance/:address', async (req, res) => {

    const address = req.params.address;
    console.log(`Request received to fetch balance for address: ${address}`);
    try {
        const balance = await balanceOf(address);
        const convertedBalance=Number(balance)
        console.log(`Balance for ${address}: ${convertedBalance}`);
        res.status(200).json({ address, balance });
    } catch (error) {
        console.error('Error fetching balance inside Play:', error.message);
        res.status(500).json({ error: error.message });
    }
});

// Implement the route for getting amount until swap
router.get('/amountUntilSwap', async (req, res) => {
    console.log('Request received to calculate amount until swap');
    try {
        const amount = await amountUntilSwap();
        console.log(`Amount until swap: ${amount}`);
        res.status(200).json({ amount });
    } catch (error) {
        console.error('Error calculating amount until swap:', error);
        res.status(500).json({ error: error.message });
    }
});



// Implement the route for setting fees
router.post('/setFees', async (req, res) => {
    const { liquidityFee, rewardFee, marketingFee, devFee } = req.body; // Get fees from request body
    console.log(`Request received to set fees: Liquidity Fee: ${liquidityFee}, Reward Fee: ${rewardFee}, Marketing Fee: ${marketingFee}, Dev Fee: ${devFee}`);
    try {
        const transactionHash = await setFees(liquidityFee, rewardFee, marketingFee, devFee);
        console.log(`Fees set successfully. Transaction Hash: ${transactionHash}`);
        res.status(200).json({ message: 'Fees set successfully.', transactionHash });
    } catch (error) {
        console.error('Error setting fees:', error);
        res.status(500).json({ error: error.message });
    }
});

// Implement the route for calculating reward cycle extension
router.post('/calculateRewardCycleExtension', async (req, res) => {
    const { balance, amount } = req.body; // Get balance and amount from request body
    console.log(`Request received to calculate reward cycle extension: Balance: ${balance}, Amount: ${amount}`);
    try {
        const extension = await calculateRewardCycleExtension(balance, amount);
        // const convertExtension=Number(extension)
        console.log("Reward cycle extension calculated: ", extension);
        res.status(200).json({ message: 'Reward cycle extension calculated.', extension });
    } catch (error) {
        console.error('Error calculating reward cycle extension:', error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
