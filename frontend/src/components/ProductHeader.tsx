import React from 'react';
import { Apple } from 'lucide-react';

interface ProductHeaderProps {
  productName: string;
  servingInfo: {
    serving_size: string;
    servings_per_pack: number | string;
  };
}

const ProductHeader: React.FC<ProductHeaderProps> = ({ productName, servingInfo }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-5 mb-6">
      <div className="flex items-center">
        <div className="bg-green-100 p-3 rounded-full mr-4">
          <Apple className="h-8 w-8 text-green-600" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-800">{productName}</h2>
          <div className="flex items-center mt-1 text-sm text-gray-500">
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