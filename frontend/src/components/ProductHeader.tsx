import React from 'react';
import { Apple } from 'lucide-react';

interface ProductHeaderProps {
  productName: string;
  servingInfo: {
    serving_size: string;
    servings_per_pack: number | string;
  };
  isLoading?: boolean; // Add this prop to control loading state
}

const ProductHeader: React.FC<ProductHeaderProps> = ({ productName, servingInfo, isLoading = false }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 mb-6">
      <div className="flex items-center">
        <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full mr-4">
          {isLoading ? (
            <div className="animate-spin h-8 w-8 flex items-center justify-center">
              <svg
                className="h-6 w-6 text-green-600 dark:text-green-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </div>
          ) : (
            <Apple className="h-8 w-8 text-green-600 dark:text-green-400" />
          )}
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">{productName}</h2>
          <div className="flex items-center mt-1 text-sm text-gray-500 dark:text-gray-400">
            <span>
              Serving size: {servingInfo.serving_size}
            </span>
            <span className="mx-2">•</span>
            <span>
              {typeof servingInfo.servings_per_pack === 'number' 
                ? `${servingInfo.servings_per_pack} servings per package`
                : servingInfo.servings_per_pack}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductHeader;





// import React from 'react';
// import { Apple } from 'lucide-react';

// interface ProductHeaderProps {
//   productName: string;
//   servingInfo: {
//     serving_size: string;
//     servings_per_pack: number | string;
//   };
// }

// const ProductHeader: React.FC<ProductHeaderProps> = ({ productName, servingInfo }) => {
//   return (
//     <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 mb-6">
//       <div className="flex items-center">
//         <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full mr-4">
//           <Apple className="h-8 w-8 text-green-600 dark:text-green-400" />
//         </div>
//         <div>
//           <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">{productName}</h2>
//           <div className="flex items-center mt-1 text-sm text-gray-500 dark:text-gray-400">
//             <span>
//               Serving size: {servingInfo.serving_size}
//             </span>
//             <span className="mx-2">•</span>
//             <span>
//               {typeof servingInfo.servings_per_pack === 'number' 
//                 ? `${servingInfo.servings_per_pack} servings per package`
//                 : servingInfo.servings_per_pack}
//             </span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductHeader;

