import React from 'react';
import { JetIcon, FashionIcon, MehrIcon, PlusIcon, LotteryIcon, MissionsIcon, ServiceIcon, MoreIcon } from './icons';

interface QuickAccessProps {
  onQuickAccessClick: (itemName: string) => void;
}

const QuickAccess: React.FC<QuickAccessProps> = ({ onQuickAccessClick }) => {
    const items = [
        { name: 'دیجی‌کالا جت', Icon: JetIcon },
        { name: 'حراج استایل', Icon: FashionIcon },
        { name: 'خرید اعتباری', Icon: MehrIcon },
        { name: 'دیجی‌پلاس', Icon: PlusIcon },
        { name: 'قرعه‌کشی', Icon: LotteryIcon },
        { name: 'مأموریت‌ها', Icon: MissionsIcon },
        { name: 'دیجی‌کالا سرویس', Icon: ServiceIcon },
        { name: 'کالاهای بیشتر', Icon: MoreIcon },
    ];

    return (
        <div className="flex justify-around items-start my-8">
        {items.map((item) => (
            <button 
                onClick={() => onQuickAccessClick(item.name)}
                key={item.name} 
                className="flex flex-col items-center gap-2 text-center w-20 focus:outline-none focus:ring-2 focus:ring-dk-red rounded-lg p-1 text-dk-dark-gray"
            >
                <item.Icon className="h-12 w-12" />
                <span className="text-xs font-medium">{item.name}</span>
            </button>
        ))}
        </div>
    );
};

export default QuickAccess;