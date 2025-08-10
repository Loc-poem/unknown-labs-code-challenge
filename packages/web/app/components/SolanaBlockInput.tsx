'use client';

import { useState } from 'react';

interface TransactionCountResponse {
  success: boolean;
  data: {
    transactionCount: number;
  };
}

export default function SolanaBlockInput() {
  const [blockNumber, setBlockNumber] = useState('');
  const [transactionCount, setTransactionCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const API_URL = 'http://localhost:3002'; // #toDo: use env variable to config for api url

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!blockNumber.trim()) {
      setError('Please enter a block number');
      return;
    }

    const blockNum = parseInt(blockNumber.trim(), 10);
    if (isNaN(blockNum) || blockNum < 0) {
      setError('Please enter a valid positive block number');
      return;
    }

    setLoading(true);
    setError(null);
    setTransactionCount(null);

    try {
      const response = await fetch(`${API_URL}/api/solana/block/${blockNum}/transactions`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: TransactionCountResponse = await response.json();
      
      if (data.success) {
        setTransactionCount(data.data.transactionCount);
      } else {
        throw new Error('Failed to fetch transaction count');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while fetching data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
        Solana Block Transaction Count
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="blockNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Block Number (Slot)
          </label>
          <input
            id="blockNumber"
            type="number"
            min="0"
            value={blockNumber}
            onChange={(e) => setBlockNumber(e.target.value)}
            placeholder="Enter block number..."
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            disabled={loading}
          />
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {loading ? 'Fetching...' : 'Get Transaction Count'}
        </button>
      </form>

      {error && (
        <div className="mt-4 p-3 bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-300 rounded-md">
          <p className="text-sm">{error}</p>
        </div>
      )}

      {transactionCount !== null && (
        <div className="mt-4 p-4 bg-green-100 dark:bg-green-900 border border-green-400 dark:border-green-600 rounded-md">
          <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-2">
            Result
          </h3>
          <p className="text-green-700 dark:text-green-300">
            Block <span className="font-mono font-bold">{blockNumber}</span> contains{' '}
            <span className="font-mono font-bold">{transactionCount}</span> transaction
            {transactionCount !== 1 ? 's' : ''}
          </p>
        </div>
      )}
    </div>
  );
}
