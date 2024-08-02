# Chess Game Smart Contract Interaction

- **contract.js**: Contains functions for deploying the smart contract, setting fees, and interacting with various methods defined in the smart contract.
- **play.js**: Handles HTTP routes for the chess game, including rendering the game page, starting games, setting fees, and fetching balances.

---


### Key Variables

- `contractABI`: The ABI (Application Binary Interface) of the smart contract, which defines how to interact with it.

- `contractAddress`: The address of the deployed contract on the blockchain.

### Functions


   

1. **setFees**
   - **Description**: Sets the fees for liquidity, rewards, marketing, and development within the contract.
   - **Parameters**:
     - `liquidityFee`: The percentage for liquidity fee.
     - `rewardFee`: The percentage for reward fee.
     - `marketingFee`: The percentage for marketing fee.
     - `devFee`: The percentage for developer fee.
   - **Returns**: The transaction hash upon successful fee setting.

2. **balanceOf**
   - **Description**: Retrieves the balance of a specified address.
   - **Parameters**:
     - `address`: The address for which to retrieve the balance.
   - **Returns**: The balance of the specified address.
   - **Usage**:
     ```javascript
     const balance = await balanceOf('0xAddressHere');
     ```

3. **amountUntilSwap**
   - **Description**: Calculates the amount needed until a swap can occur based on the contract's threshold.
   - **Returns**: The amount required until a swap.
   - **Usage**:
     ```javascript
     const amount = await amountUntilSwap();
     ```

4. **calculateRewardCycleExtension**
   - **Description**: Calculates the extension for reward cycles based on balance and amount.
   - **Parameters**:
     - `balance`: The current balance.
     - `amount`: The amount to be evaluated.
   - **Returns**: The calculated reward cycle extension.
   - **Usage**:
     ```javascript
     const extension = await calculateRewardCycleExtension(currentBalance, amount);
     ```

---

## play.js


### Routes


1. **GET `/balance/:address`**
   - **Description**: Fetches the balance for a specified address.
   - **Parameters**:
     - `address`: The address for which to fetch the balance.
   - **Returns**: A JSON object containing the address and balance.
   - **Usage**:
     ```javascript
     router.get('/balance/:address', async (req, res) => { ... });
     ```

2. **GET `/amountUntilSwap`**
   - **Description**: Calculates and returns the amount needed until a swap can occur.
   - **Returns**: A JSON object with the calculated amount.
   - **Usage**:
     ```javascript
     router.get('/amountUntilSwap', async (req, res) => { ... });
     ```

   - **Description**: Transfers tokens from one address to another.
   - **Parameters**:
     - `sender`: The address sending the tokens.
     - `recipient`: The address receiving the tokens.
     - `amount`: The amount of tokens to transfer.
   - **Returns**: A JSON object with a success message and transaction hash.
   - **Usage**:
     ```javascript
     router.post('/transfer', async (req, res) => { ... });
     ```

3. **POST `/setFees`**
   - **Description**: Sets the fees in the contract.
   - **Parameters**: 
     - `liquidityFee`: The liquidity fee percentage.
     - `rewardFee`: The reward fee percentage.
     - `marketingFee`: The marketing fee percentage.
     - `devFee`: The development fee percentage.
   - **Returns**: A JSON object with a success message and transaction hash.
   - **Usage**:
     ```javascript
     router.post('/setFees', async (req, res) => { ... });
     ```

4. **POST `/calculateRewardCycleExtension`**
   - **Description**: Calculates and returns the extension of the reward cycle based on the balance and amount.
   - **Parameters**:
     - `balance`: The current balance.
     - `amount`: The amount to evaluate.
   - **Returns**: A JSON object with a success message and the calculated extension.
   - **Usage**:
     ```javascript
     router.post('/calculateRewardCycleExtension', async (req, res) => { ... });
     ```

---

 