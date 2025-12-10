
import React, { useState, useEffect } from 'react';
import { 
  ChevronDown, ChevronRight, PlaneIcon, MapIcon, MenuIcon, SquareCheckIcon, 
  CheckIcon, SquareIcon, LuggageIcon, BatteryIcon, HomeIcon, ClockIcon, LocationIcon,
  TrainIcon, UtensilsIcon, ShoppingBagIcon, TicketIcon, BedIcon,
  FuelIcon, ParkingIcon, CameraIcon, ShrineIcon, MailIcon, HotSpringIcon,
  BusIcon, ShipIcon, CableCarIcon, MusicIcon
} from './components/Icons';
import { 
  initialPackingList, 
  importantNotes, powerBankRules, flightData, itineraryData, accommodationData
} from './constants';
import { FlightInfo, ItineraryDay, PackingCategory } from './types';

// =================================================================
// Sub-Components
// =================================================================

interface DayCardProps {
  dayData: ItineraryDay;
  onClick: () => void;
}

const DayCard: React.FC<DayCardProps> = ({ dayData, onClick }) => {
    const { day, date, color } = dayData;

    return (
        <div 
            className={`bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 ease-in-out cursor-pointer mb-5 border-l-4 ${color}`}
            onClick={onClick}
        >
            <div className="p-4 flex justify-between items-center">
                <div className="flex flex-col">
                    <h3 className="text-xl font-extrabold text-[#3c3c3c]">
                        DAY {day}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-[#757575]">
                        {date}
                    </p>
                </div>
                <ChevronRight className="w-5 h-5 text-[#757575]" />
            </div>
        </div>
    );
};

const DayDetail: React.FC<{ dayData: ItineraryDay; onBack: () => void }> = ({ dayData, onBack }) => {
    const { day, date, theme, color, stops } = dayData;

    // Helper to extract hex color from tailwind arbitrary class like 'border-[#123456]'
    const getThemeHex = (colorClass: string) => {
        const match = colorClass.match(/\[(.*?)\]/);
        return match ? match[1] : '#2b6e90'; // Default to blue if not found
    };
    
    const themeHex = getThemeHex(color);

    const getCategoryIcon = (category: string) => {
        const iconClass = "w-5 h-5";
        switch (category) {
            case "🛫": return <PlaneIcon className={`${iconClass} text-[#2b6e90] transform -rotate-45`} />;
            case "🛬": return <PlaneIcon className={`${iconClass} text-[#d15b47] transform rotate-45`} />;
            case "🚉": return <TrainIcon className={`${iconClass} text-[#3c3c3c]`} />;
            case "🍽️": return <UtensilsIcon className={`${iconClass} text-[#f1be42]`} />;
            case "🛍️": return <ShoppingBagIcon className={`${iconClass} text-[#d15b47]`} />;
            case "🛏️": return <BedIcon className={`${iconClass} text-[#2b6e90]`} />;
            case "⛽": return <FuelIcon className={`${iconClass} text-[#d15b47]`} />;
            case "🅿": case "🅿️": return <ParkingIcon className={`${iconClass} text-[#2b6e90]`} />;
            case "📷": return <CameraIcon className={`${iconClass} text-[#98c187]`} />;
            case "⛩️": return <ShrineIcon className={`${iconClass} text-[#d15b47]`} />;
            case "🏣": return <MailIcon className={`${iconClass} text-[#d15b47]`} />;
            case "♨️": return <HotSpringIcon className={`${iconClass} text-[#d15b47]`} />;
            case "🏪": return <ShoppingBagIcon className={`${iconClass} text-[#f1be42]`} />;
            case "🏞️": return <CameraIcon className={`${iconClass} text-[#98c187]`} />;
            case "🚏": return <BusIcon className={`${iconClass} text-[#2b6e90]`} />;
            case "⚓": case "🚢": case "🛥️": return <ShipIcon className={`${iconClass} text-[#2b6e90]`} />;
            case "🎫": return <TicketIcon className={`${iconClass} text-[#f1be42]`} />;
            case "🌅": return <CameraIcon className={`${iconClass} text-[#f1be42]`} />;
            case "💊": return <ShoppingBagIcon className={`${iconClass} text-[#2b6e90]`} />;
            case "🚡": return <CableCarIcon className={`${iconClass} text-[#98c187]`} />;
            case "🎶": return <MusicIcon className={`${iconClass} text-[#d15b47]`} />;
            default: return <span className="text-lg">{category}</span>;
        }
    };

    return (
        <div className="p-4 max-w-lg mx-auto min-h-[calc(100vh-8rem)]">
             <button 
                onClick={onBack} 
                className="flex items-center text-[#2b6e90] font-semibold mb-6 p-2 rounded-full hover:bg-white transition text-sm"
            >
                <ChevronDown className="w-4 h-4 mr-1 transform rotate-90" />
                返回行程總覽
            </button>

            <div className={`bg-white rounded-xl shadow-lg overflow-hidden border-t-8 ${color}`}>
                <div className="p-6">
                    <div className="flex items-baseline mb-4">
                         <span className={`text-4xl font-black mr-3 ${color.replace('border-', 'text-')}`}>
                             DAY {day}
                         </span>
                         <span className="text-[#757575] font-bold">{date}</span>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-[#3c3c3c] mb-6 border-b border-gray-100 pb-4">
                        {theme}
                    </h2>

                    <div>
                        <h4 className="text-sm font-bold text-[#757575] uppercase tracking-wider mb-6">行程細節</h4>
                        
                        {stops && stops.length > 0 ? (
                            <div className="">
                                {stops.map((stop, index) => (
                                    <div key={index} className="flex">
                                        {/* Timeline Column */}
                                        <div className="flex flex-col items-center w-12 flex-shrink-0 relative mr-2">
                                             {/* Node Pill */}
                                             <div className="w-3.5 h-10 rounded-full z-10 flex-shrink-0" style={{ backgroundColor: themeHex }}></div>
                                             
                                             {/* Connecting Line - thicker line */}
                                             {index !== stops.length - 1 && (
                                                 <div className="w-1.5 flex-grow -mt-2 opacity-50" style={{ backgroundColor: themeHex }}></div>
                                             )}
                                        </div>

                                        {/* Content Column */}
                                        <div className="flex-1 pb-6">
                                            {/* Time and Category Row */}
                                            <div className="flex items-center justify-between mb-3">
                                                {/* Time Box */}
                                                <div 
                                                    className="inline-block px-3 py-1 bg-white border-2 rounded-lg shadow-sm"
                                                    style={{ borderColor: themeHex }}
                                                >
                                                    <span className="text-lg font-bold text-[#3c3c3c]">{stop.time}</span>
                                                </div>

                                                {/* Category Box */}
                                                {stop.category && (
                                                    <div className="inline-flex items-center justify-center w-10 h-9 bg-white border-2 rounded-lg shadow-sm border-[#EDEDEF]" >
                                                        {stop.category}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Header Info */}
                                            <div className="mb-2">
                                                <h4 className="text-xl font-bold text-[#3c3c3c] mb-1 leading-tight">
                                                    {stop.name}
                                                </h4>
                                                {stop.durationLabel && (
                                                    <p className="text-sm text-[#757575] font-medium mb-1">
                                                        {stop.durationLabel}
                                                    </p>
                                                )}
                                            </div>

                                            {/* Actions / Details Row */}
                                            <div className="space-y-2 mb-4">
                                                {/* Map Link */}
                                                <div className="flex flex-wrap gap-3">
                                                    {stop.mapUrl && (
                                                        <a 
                                                            href={stop.mapUrl} 
                                                            target="_blank" 
                                                            rel="noopener noreferrer"
                                                            className="flex items-center text-base font-medium text-[#757575] hover:text-[#2b6e90] group"
                                                        >
                                                            <span className="mr-2 text-yellow-500 text-lg">🌐</span>
                                                            <span className="border-b border-dashed border-gray-400 group-hover:border-[#2b6e90]">查看地圖</span>
                                                        </a>
                                                    )}
                                                    {stop.parkingUrl && (
                                                        <a 
                                                            href={stop.parkingUrl} 
                                                            target="_blank" 
                                                            rel="noopener noreferrer"
                                                            className="flex items-center text-base font-medium text-[#757575] hover:text-[#2b6e90] group"
                                                        >
                                                            <span className="mr-2 text-blue-500 text-lg">🧭</span>
                                                            <span className="border-b border-dashed border-gray-400 group-hover:border-[#2b6e90]">停車場導航</span>
                                                        </a>
                                                    )}
                                                    {stop.storageUrl && (
                                                        <a 
                                                            href={stop.storageUrl} 
                                                            target="_blank" 
                                                            rel="noopener noreferrer"
                                                            className="flex items-center text-base font-medium text-[#757575] hover:text-[#2b6e90] group"
                                                        >
                                                            <span className="mr-2 text-blue-500 text-lg">🧳</span>
                                                            <span className="border-b border-dashed border-gray-400 group-hover:border-[#2b6e90]">行李寄存導航</span>
                                                        </a>
                                                    )}
                                                    {stop.specialUrl && (
                                                        <a 
                                                            href={stop.specialUrl} 
                                                            target="_blank" 
                                                            rel="noopener noreferrer"
                                                            className="flex items-center text-base font-medium text-[#757575] hover:text-[#2b6e90] group"
                                                        >
                                                            <span className="mr-2 text-blue-500 text-lg">🗺️</span>
                                                            <span className="border-b border-dashed border-gray-400 group-hover:border-[#2b6e90]">特殊路線</span>
                                                        </a>
                                                    )}
                                                </div>
                                                
                                                {/* Note */}
                                                {stop.note && (
                                                    <div className="flex items-start text-left text-base text-[#3c3c3c] leading-relaxed bg-gray-50 p-2 rounded-lg border border-gray-100 w-full">
                                                        <span className="mt-0.5 text-base w-full whitespace-pre-line">{stop.note.replace(/^備註：\s*/, '')}</span>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Transport Divider (Horizontal) */}
                                            {index !== stops.length - 1 && stop.transport && (
                                                <div className="relative mt-6 mb-2">
                                                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                                        <div className="w-full border-t-2 border-gray-300"></div>
                                                    </div>
                                                    <div className="relative flex justify-center">
                                                        <span className="bg-white px-3 text-base text-[#555] font-medium flex items-center">
                                                            <span className="mr-1 text-lg">{stop.transport.mode}</span> 
                                                            {stop.transport.time}
                                                        </span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            // Fallback for days without structured data
                            <div className="space-y-4 border-l-2 border-gray-200 ml-2 pl-6 py-1">
                                <p className="text-sm text-[#757575]">
                                    08:30 出發
                                    <br/>
                                    <span className="text-xs text-gray-400">（詳細行程節點請於後續編輯補充）</span>
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const FlightCard: React.FC<{ flight: FlightInfo }> = ({ flight }) => {
    const { type, date, departure, arrival, flightNumber, airline, color, baggage } = flight;
    
    // Extract color for the top bar
    const barColor = color.replace('text-', 'bg-');

    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 mb-6">
            {/* Top Color Bar */}
            <div className={`h-2 w-full ${barColor}`}></div>
            
            <div className="p-6">
                {/* Header */}
                <h3 className="flex items-center text-xl font-bold text-[#3c3c3c] mb-6">
                    <PlaneIcon className={`w-6 h-6 mr-2 ${color}`} />
                    {type}
                </h3>

                {/* Schedule Grid */}
                <div className="mb-2">
                     <p className="text-[#757575] font-bold mb-4">航班時間表</p>
                     
                     <div className="grid grid-cols-[auto_1fr] gap-y-4 gap-x-8 items-center">

                        <span className="text-[#757575] font-medium">航空公司</span>
                        <span className="text-[#2b6e90] font-bold text-lg text-right">{airline}</span>

                        <span className="text-[#757575] font-medium">航班編號</span>
                        <span className="text-[#2b6e90] font-bold text-lg text-right">{flightNumber}</span>
                        
                        <span className="text-[#757575] font-medium">起飛 ({departure.city}_{departure.terminal})</span>
                        <span className="text-[#2b6e90] font-bold text-xl text-right">{departure.time}</span>
                        
                        <span className="text-[#757575] font-medium">抵達 ({arrival.city}_{arrival.terminal})</span>
                        <span className="text-[#d15b47] font-bold text-xl text-right">{arrival.time}</span>
                     </div>
                </div>

                {/* Date Separator */}
                <div className="border-t border-gray-200 my-4 pt-4 text-center">
                    <p className="text-[#757575] text-md">日期：{date}</p>
                </div>

                {/* Baggage Section */}
                <div className="mt-2">
                     <h4 className="flex items-center text-[#2b6e90] font-bold mb-3 text-md">
                        <LuggageIcon className="w-5 h-5 mr-2" />
                        行李額度
                     </h4>
                     <div className="bg-[#f1be42] bg-opacity-20 border border-[#f1be42] rounded-lg p-4 space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-[#3c3c3c] text-md font-medium">托運行李:</span>
                            <span className="text-[#2b6e90] font-bold text-right text-md">{baggage.checked}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-[#3c3c3c] text-md font-medium">手提行李:</span>
                            <span className="text-[#2b6e90] font-bold text-right text-md">{baggage.carryOn}</span>
                        </div>
                     </div>
                </div>
            </div>
        </div>
    );
};

const FlightContent: React.FC<{ setSubView: (v: string | null) => void }> = ({ setSubView }) => (
    <div className="p-4 max-w-lg mx-auto">
        <button 
            onClick={() => setSubView(null)} 
            className="flex items-center text-[#2b6e90] font-semibold mb-6 p-2 rounded-full hover:bg-white transition text-sm"
        >
            <ChevronDown className="w-4 h-4 mr-1 transform rotate-90" />
            返回選單
        </button>
        
        <div className="bg-[#f1be42] bg-opacity-20 border-l-4 border-[#f1be42] text-[#3c3c3c] p-4 rounded-lg shadow-inner mb-6" role="alert">
            <p className="font-bold text-sm">重要提醒：</p>
            <p className="text-sm">請務必在起飛前至少 2.5 小時抵達機場辦理報到手續。</p>
        </div>

        <h2 className="text-2xl font-extrabold text-[#3c3c3c] mb-6 flex items-center">
            ✈️ 機票與行程
        </h2>
        
        <FlightCard flight={flightData.outbound} />
        <FlightCard flight={flightData.inbound} />
    </div>
);

const PowerBankRulesSection: React.FC = () => (
    <div className="mt-4 p-3 bg-gray-200 rounded-lg shadow-inner">
        <h4 className="text-base font-bold text-[#3c3c3c] mb-2 flex items-center">
            <BatteryIcon className="w-4 h-4 mr-2 text-[#98c187]" />
            行動電源攜帶詳細規定
        </h4>
        <ul className="space-y-2 text-base text-[#3c3c3c]">
            {powerBankRules.map((rule, index) => (
                <li key={index} className="flex items-start">
                    <span className="font-semibold text-[#3E3FB0] mr-2 min-w-[5rem]">{rule.rule}:</span>
                    <span className="flex-1">{rule.detail}</span>
                </li>
            ))}
        </ul>
    </div>
);

const AccommodationContent: React.FC<{ setSubView: (v: string | null) => void }> = ({ setSubView }) => (
    <div className="p-4 max-w-lg mx-auto">
        <button 
            onClick={() => setSubView(null)} 
            className="flex items-center text-[#2b6e90] font-semibold mb-6 p-2 rounded-full hover:bg-white transition text-sm"
        >
            <ChevronDown className="w-4 h-4 mr-1 transform rotate-90" />
            返回選單
        </button>
        <h2 className="text-2xl font-extrabold text-[#3c3c3c] mb-6 flex items-center">
            🏠 住宿資訊
        </h2>

        <div className="space-y-6">
            {accommodationData.map((item, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md p-5 border-l-4 border-[#d15b47] hover:shadow-lg transition duration-300">
                    <h3 className="text-lg font-bold text-[#3c3c3c] mb-3 flex items-center">
                        <HomeIcon className="w-5 h-5 mr-2 text-[#d15b47]" />
                        {item.name}
                    </h3>
                    <div className="space-y-2 text-sm text-[#757575]">
                        <div className="flex items-center bg-[#f0f4f6] p-2 rounded text-base text-left">
                            <ClockIcon className="w-4 h-4 mr-2 text-[#757575] flex-shrink-0" />
                            <span className="font-medium">{item.dates}</span>
                        </div>
                        <div className="flex items-start bg-[#f0f4f6] p-2 rounded text-base text-left">
                            <LocationIcon className="w-4 h-4 mr-2 text-[#757575] flex-shrink-0 mt-0.5" />
                            <span className="break-all">{item.address}</span>
                        </div>
                        {item.notes && (
                            <div className="bg-[#f1be42] bg-opacity-10 text-[#3c3c3c] p-3 rounded-md text-base font-mono whitespace-pre-line leading-relaxed border border-[#f1be42] border-opacity-30 mt-2 text-left">
                                <span className="font-normal block mb-1">{item.notes.replace(/^備註：\s*/, '')}</span>
                            </div>
                        )}
                    </div>
                    {/* Map Button */}
                    <div className="mt-4 pt-3 border-t border-gray-100">
                        <a 
                            href={item.mapUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center w-full px-4 py-2 bg-[#2b6e90] text-white text-sm font-bold rounded-lg hover:bg-opacity-90 transition shadow-sm"
                        >
                            <MapIcon className="w-4 h-4 mr-2" />
                            地圖
                        </a>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const PackingListContent: React.FC<{ setSubView: (v: string | null) => void }> = ({ setSubView }) => {
    const [listState, setListState] = useState<PackingCategory[] | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [showPowerBankDetails, setShowPowerBankDetails] = useState(false);

    useEffect(() => {
        // Load from local storage or use initial list
        const loadList = () => {
            try {
                const savedList = localStorage.getItem('userPackingList');
                if (savedList) {
                    setListState(JSON.parse(savedList));
                } else {
                    setListState(initialPackingList);
                }
            } catch (e) {
                console.error("Failed to load packing list", e);
                setListState(initialPackingList);
            }
            setIsLoading(false);
        };

        loadList();
    }, []);

    const toggleItem = (categoryIndex: number, itemIndex: number) => {
        if (!listState) return;

        const newListState = JSON.parse(JSON.stringify(listState));
        const currentItem = newListState[categoryIndex].items[itemIndex];
        currentItem.packed = !currentItem.packed;
        
        setListState(newListState);
        localStorage.setItem('userPackingList', JSON.stringify(newListState));
    };

    const totalItems = listState?.reduce((acc, cat) => acc + cat.items.length, 0) || 0;
    const packedItems = listState?.reduce((acc, cat) => acc + cat.items.filter(item => item.packed).length, 0) || 0;
    const completionPercentage = totalItems > 0 ? Math.round((packedItems / totalItems) * 100) : 0;
    
    return (
        <div className="p-4 max-w-lg mx-auto">
            <button 
                onClick={() => setSubView(null)} 
                className="flex items-center text-[#2b6e90] font-semibold mb-6 p-2 rounded-full hover:bg-white transition text-sm"
            >
                <ChevronDown className="w-4 h-4 mr-1 transform rotate-90" />
                返回選單
            </button>
            <h2 className="text-2xl font-extrabold text-[#3c3c3c] mb-2">🧳 行李清單</h2>
            <p className="text-sm text-[#757575] mb-6">點擊項目即可勾選/取消，進度將自動儲存 (Local Storage)。</p>
            
            {isLoading || !listState ? (
                <div className="flex items-center justify-center p-8 bg-white rounded-xl shadow-lg text-sm">
                    <svg className="animate-spin h-5 w-5 mr-3 text-[#98c187]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25"></circle><path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" className="opacity-75"></path></svg>
                    清單載入中...
                </div>
            ) : (
                <>
                    <div className="mb-6 bg-[#f1be42] bg-opacity-20 border-l-4 border-[#f1be42] p-4 rounded-lg shadow-xl">
                        <p className="text-base font-bold text-[#3c3c3c] mb-2 flex items-center">
                            <span className="text-lg mr-2">⚠️</span> 重要提醒
                        </p>
                        <ul className="space-y-2 text-sm text-[#3c3c3c]">
                            {importantNotes.map((note, index) => (
                                <li key={index}>
                                    {note}
                                    {note.includes("行動電源") && (
                                        <button 
                                            onClick={() => setShowPowerBankDetails(!showPowerBankDetails)}
                                            className="ml-2 text-[#2b6e90] hover:text-[#2b6e90] font-semibold text-xs transition duration-150"
                                        >
                                            {showPowerBankDetails ? '▲ 隱藏細節' : '▼ 查看細節'}
                                        </button>
                                    )}
                                </li>
                            ))}
                        </ul>
                        {showPowerBankDetails && <PowerBankRulesSection />}
                    </div>

                    <div className="mb-6 p-4 bg-white rounded-xl shadow-lg">
                        <div className="flex justify-between items-center mb-2">
                            <p className="text-md font-semibold text-[#757575]">準備進度：{packedItems} / {totalItems} 項</p>
                            <p className="text-lg font-bold text-[#98c187]">{completionPercentage}%</p>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                                className="bg-[#98c187] h-2 rounded-full transition-all duration-500 ease-out" 
                                style={{ width: `${completionPercentage}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* Packing Categories */}
                    <div className="space-y-4">
                        {listState.map((category, catIndex) => (
                            <div key={catIndex} className="bg-white p-4 rounded-xl shadow-lg border-t-3 border-[#98c187]">
                                <h3 className="text-base font-bold text-[#3c3c3c] mb-3 flex items-center">
                                    <span className="text-xl mr-2">{category.icon}</span>
                                    {category.category}
                                </h3>
                                <ul className="space-y-2">
                                    {category.items.map((item, itemIndex) => (
                                        <li 
                                            key={itemIndex} 
                                            className="flex items-center cursor-pointer p-1 rounded-lg transition duration-150 hover:bg-[#f0f4f6]"
                                            onClick={() => toggleItem(catIndex, itemIndex)}
                                        >
                                            <span className="w-5 h-5 mr-2 flex-shrink-0">
                                                {item.packed ? (
                                                    <CheckIcon className="text-[#98c187] bg-[#98c187] bg-opacity-20 rounded-full p-0.5" />
                                                ) : (
                                                    <SquareIcon className="text-[#757575]" />
                                                )}
                                            </span>
                                            <span className={`text-md font-medium transition duration-150 ${item.packed ? 'text-[#757575] line-through' : 'text-[#3c3c3c]'}`}>
                                                {item.name}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

const MenuPage: React.FC<{ setCurrentPage: (p: string) => void }> = ({ setCurrentPage }) => {
    const [subView, setSubView] = useState<string | null>(null);

    if (subView === 'flights') {
        return <FlightContent setSubView={setSubView} />;
    }
    if (subView === 'packingList') {
        return <PackingListContent setSubView={setSubView} />;
    }
    if (subView === 'accommodation') {
        return <AccommodationContent setSubView={setSubView} />;
    }

    return (
        <div className="p-4 max-w-lg mx-auto">
            <h2 className="text-2xl font-extrabold text-[#3c3c3c] mb-6 border-b pb-3">🛠️ 旅遊工具選單</h2>

            {/* Flight Overview Link */}
            <div 
                className="bg-white rounded-xl shadow-md p-4 mb-4 border-l-4 border-[#2b6e90] cursor-pointer hover:shadow-lg transition duration-300"
                onClick={() => setSubView('flights')}
            >
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-lg font-bold text-[#3c3c3c]">機票與行程</p>
                        <p className="text-sm text-[#757575]">查看 VZ566 / CI153 詳情</p>
                    </div>
                    <PlaneIcon className="w-6 h-6 text-[#2b6e90]" />
                </div>
            </div>

            {/* Packing List Link */}
            <div 
                className="bg-white rounded-xl shadow-md p-4 mb-4 border-l-4 border-[#98c187] cursor-pointer hover:shadow-lg transition duration-300"
                onClick={() => setSubView('packingList')}
            >
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-lg font-bold text-[#3c3c3c]">行李清單</p>
                        <p className="text-sm text-[#757575]">打包進度追蹤與重要提醒</p>
                    </div>
                    <SquareCheckIcon className="w-6 h-6 text-[#98c187]" /> 
                </div>
            </div>

            {/* Accommodation Link */}
            <div 
                className="bg-white rounded-xl shadow-md p-4 mb-4 border-l-4 border-[#f1be42] cursor-pointer hover:shadow-lg transition duration-300"
                onClick={() => setSubView('accommodation')}
            >
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-lg font-bold text-[#3c3c3c]">住宿資訊</p>
                        <p className="text-sm text-[#757575]">各晚住宿地址、MapCode</p>
                    </div>
                    <HomeIcon className="w-6 h-6 text-[#f1be42]" /> 
                </div>
            </div>

        </div>
    );
};

const ItineraryPage: React.FC<{ onDaySelect: (day: number) => void }> = ({ onDaySelect }) => (
    <main className="max-w-lg mx-auto p-4">
        {itineraryData.map((dayData) => (
            <DayCard
                key={dayData.day}
                dayData={dayData}
                onClick={() => onDaySelect(dayData.day)}
            />
        ))}
        <div className="h-4"></div>
    </main>
);

const App: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<'itinerary' | 'menu'>('itinerary');
    const [selectedDay, setSelectedDay] = useState<number | null>(null);

    const handleDaySelect = (day: number) => {
        setSelectedDay(day);
    };

    const handleBackToItinerary = () => {
        setSelectedDay(null);
    };

    const handleTabChange = (page: 'itinerary' | 'menu') => {
        setCurrentPage(page);
        setSelectedDay(null); // Reset detail view when switching tabs
    };

    // Determine content to render
    let content;
    if (currentPage === 'itinerary') {
        if (selectedDay !== null) {
            const dayData = itineraryData.find(d => d.day === selectedDay);
            if (dayData) {
                content = <DayDetail dayData={dayData} onBack={handleBackToItinerary} />;
            } else {
                 content = <ItineraryPage onDaySelect={handleDaySelect} />;
            }
        } else {
            content = <ItineraryPage onDaySelect={handleDaySelect} />;
        }
    } else {
        content = <MenuPage setCurrentPage={setCurrentPage as any} />;
    }

    return (
        <div className="min-h-screen bg-[#f0f4f6] pb-20 font-sans">
            <header className="bg-white border-b border-gray-200 shadow-sm p-4 sticky top-0 z-30">
                <div className="max-w-lg mx-auto">
                    <h1 className="text-xl font-extrabold text-[#2b6e90]">
                        2026 四國9日自駕遊
                    </h1>
                    <p className="text-xs text-[#757575] mt-0.5">
                        協同規劃儀表板
                    </p>
                </div>
            </header>

            {content}

            <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] flex justify-around text-xs text-[#757575] z-30 pb-safe">
                <button 
                    className={`flex flex-col items-center justify-center py-3 transition duration-200 w-1/2 ${currentPage === 'itinerary' ? 'text-[#2b6e90] font-bold' : 'text-[#757575] hover:text-[#2b6e90]'}`}
                    onClick={() => handleTabChange('itinerary')}
                >
                    <MapIcon className="w-6 h-6 mb-1" />
                    <span className="text-[10px]">行程總覽</span>
                </button>
                
                <button 
                    className={`flex flex-col items-center justify-center py-3 transition duration-200 w-1/2 ${currentPage === 'menu' ? 'text-[#2b6e90] font-bold' : 'text-[#757575] hover:text-[#2b6e90]'}`}
                    onClick={() => handleTabChange('menu')}
                >
                    <MenuIcon className="w-6 h-6 mb-1" />
                    <span className="text-[10px]">選單</span>
                </button>
            </footer>
        </div>
    );
};

export default App;
