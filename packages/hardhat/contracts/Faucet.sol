// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Faucet {
	address payable public owner;
	uint256 public constant MAX_WITHDRAWAL = 0.1 ether;
	uint256 public lockTime = 1 minutes;

	mapping(address => uint256) nextAccessTime;

	event Withdrawal(address indexed to, uint256 amount);
	event Deposited(address indexed by, uint256 amount);

	constructor() {
		owner = payable(msg.sender);
	}

	modifier onlyOwner() {
		require(msg.sender == owner, "Only owner can call this function.");
		_;
	}

	function withdraw(address _to) external {
		require(
			_to.balance < 0.2 ether,
			"Your balance is too high."
		);
		require(
			address(this).balance >= MAX_WITHDRAWAL,
			"Insufficient balance in the faucet."
		);
		require(
			block.timestamp >= nextAccessTime[_to],
			"Insufficient time elapsed since last withdrawal - try again later."
		);

		nextAccessTime[_to] = block.timestamp + lockTime;

		payable(_to).transfer(MAX_WITHDRAWAL);
		emit Withdrawal(_to, MAX_WITHDRAWAL);
	}

	// Fallback function to receive ether
	receive() external payable {}

	// Function to allow any user to refill the faucet
	function deposit() external payable {
		require(msg.value > 0, "Deposit amount must be greater than 0.");

		emit Deposited(msg.sender, msg.value);
	}

	// Function to allow the owner to withdraw funds from the contract
	function withdrawFunds(uint256 _amount) external {
		require(
			address(this).balance >= _amount,
			"Insufficient balance in the contract."
		);
		owner.transfer(_amount);
	}
}
