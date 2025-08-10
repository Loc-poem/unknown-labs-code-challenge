import Image from "next/image";
import SolanaBlockInput from "./components/SolanaBlockInput";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start max-w-4xl">
        <div className="flex flex-col items-center sm:items-start">
          <h1 className="text-2xl font-bold mt-4 mb-6 text-center sm:text-left">
            Solana Block Explorer
          </h1>
        </div>

        <div className="w-full flex flex-col lg:flex-row gap-8 items-start">
          <div className="flex-1">
            <SolanaBlockInput />
          </div>
          
          <div className="flex-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                Getting Started
              </h2>
              <ol className="font-mono list-inside list-decimal text-sm/6 space-y-2">
                <li className="tracking-[-.01em]">
                  Enter a Solana block number (slot) in the input field
                </li>
                <li className="tracking-[-.01em]">
                  Click "Get Transaction Count" to fetch data from the API
                </li>
                <li className="tracking-[-.01em]">
                  View the number of transactions in that block
                </li>
              </ol>
              
              <div className="mt-6">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <strong>API Endpoint:</strong> localhost:3002
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Make sure the NestJS API is running on port 3002
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
      </footer>
    </div>
  );
}
