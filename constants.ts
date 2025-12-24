
import { FlightData, ItineraryDay, PackingCategory, PowerBankRule, Accommodation } from './types';

export const PACKING_LIST_COLLECTION = 'packing_list';
export const FIREBASE_LIST_DOC_ID = 'userList';

export const initialPackingList: PackingCategory[] = [
    { category: "重要文件(Documents)", icon: "🔖", items: [
        { name: "護照、電子簽證(ETA)", packed: false },
        { name: "機票 (電子登機證)", packed: false },
        { name: "旅遊保險資料", packed: false },
        { name: "國際駕照、台灣駕照", packed: false },
        { name: "訂房/訂車單", packed: false },
    ]},
    { category: "隨身行李 (Carry-on)", icon: "👜", items: [
        { name: "現金 (台幣、日幣)", packed: false },
        { name: "信用卡、提款卡", packed: false },
        { name: "行動電源", packed: false },
        { name: "充電線、頭", packed: false },
        { name: "個人藥品", packed: false },
        { name: "耳機、頸枕、眼罩", packed: false },
        { name: "水壺、輕便雨傘", packed: false },
        { name: "手錶、太陽眼鏡", packed: false },
    ]},
    { category: "衣物類 (Clothing)", icon: "👕", items: [
        { name: "上衣 (長袖/短袖)", packed: false },
        { name: "外套 (防風/保暖)", packed: false },
        { name: "下著", packed: false },
        { name: "襪子、內衣褲 (9天份)", packed: false },
        { name: "睡衣、拖鞋", packed: false },
        { name: "備用鞋 (運動鞋)", packed: false },
    ]},
    { category: "盥洗/彩妝/保養 (Toiletries/Skincare)", icon: "🧴", items: [
        { name: "牙刷、牙膏、漱口水", packed: false },
        { name: "洗髮精、沐浴乳 (旅行組)", packed: false },
        { name: "毛巾、浴巾", packed: false },
        { name: "洗面乳、化妝水、乳液", packed: false },
        { name: "化妝品、卸妝品", packed: false },
        { name: "防曬乳、護唇膏", packed: false },
        { name: "衛生用品 (女性)", packed: false },
    ]},
    { category: "其他用品 (Others)", icon: "🧐", items: [
        { name: "環保袋、購物袋", packed: false },
        { name: "洗衣袋、夾鏈袋", packed: false },
        { name: "個人習慣用品", packed: false },
        { name: "口罩", packed: false },
    ]},
];

export const importantNotes: string[] = [
    "✅ 液體限制：所有液體、噴霧、凝膠容器不得超過 100ml，且需放入 1 公升透明夾鏈袋內 (隨身行李)。",
    "✅ 刀具/尖銳物：修眉刀、指甲剪等需託運。",
    "✅ 護照有效期：確認護照有效期需超過六個月。",
    "🔋 行動電源：必須放在手提行李，禁止託運。容量限制請參考下方詳細規定。",
    "🚫 飛行全程禁止在機上使用或充電行動電源。",
];

export const powerBankRules: PowerBankRule[] = [
    { rule: "攜帶位置", detail: "只能放在手提行李中，禁止託運。" },
    { rule: "容量限制 (100Wh 以下)", detail: "可自由攜帶上機，數量上限依各航空公司規定 (常見最多20個)。" },
    { rule: "容量限制 (100Wh 至 160Wh)", detail: "需事先向航空公司報備許可，每人最多可攜帶兩個。" },
    { rule: "容量限制 (超過 160Wh)", detail: "禁止攜帶。" },
    { rule: "標示要求", detail: "行動電源上必須清楚標示容量 (Wh 或 mAh) 和功率。" },
];

export const flightData: FlightData = {
    outbound: {
        type: "去程 (Outbound)",
        date: "2026/03/28 (六)",
        departure: { time: "07:30", city: "TPE/桃園", airport: "臺灣桃園國際機場", terminal: "T1" },
        arrival: { time: "11:00", city: "OSA/大阪", airport: "關西國際機場", terminal: "T1" },
        airline: "泰國越捷航空",
        flightNumber: "VZ566",
        duration: "2小時30分",
        color: "text-[#d15b47]", // Theme Red
        baggage: {
            carryOn: "每人 1 件 (≤7kg)",
            checked: "每人 1 件 (≤15kg)", 
        },
    },
    inbound: {
        type: "回程 (Inbound)",
        date: "2026/04/05 (日)",
        departure: { time: "14:00", city: "OSA/大阪", airport: "關西國際機場", terminal: "T1" },
        arrival: { time: "16:00", city: "TPE/桃園", airport: "臺灣桃園國際機場", terminal: "T2" },
        airline: "中華航空",
        flightNumber: "CI153",
        duration: "2小時55分",
        color: "text-[#2b6e90]", // Theme Blue
        baggage: {
            carryOn: "每人 1 件 (≤7kg)",
            checked: "每人 2 件 (≤23kg)",
        },
    }
};

export const accommodationData: Accommodation[] = [
    {
        name: "JOJO CChouse",
        dates: "2026/3/28 — 2026/3/29",
        address: "クリオコート梅田イースト クリオコ－ト梅田イ－スト, Osaka, Japan, 530-0021",
        notes: "",
        mapUrl: "https://maps.app.goo.gl/CaHm3U2Qae6oTWLz9"
    },
    {
        name: "Happy House- TAKAMATSU",
        dates: "2026/3/29 — 2026/3/30",
        address: "国道32号線 白井ビル, 高松市, Japan",
        notes: "Map Code：60 637 360*54\n部屋【203】室、key box【8823】",
        mapUrl: "https://maps.app.goo.gl/2ivAUEN5ZpzGWbsD9"
    },
    {
        name: "arigatouya 3 minutes by car to C",
        dates: "2026/3/30 — 2026/4/1",
        address: "仁尾町仁尾丁３２５, 三豊市, Japan 769-1407",
        notes: "Map Code：77 392 568*62",
        mapUrl: "https://maps.app.goo.gl/qKSvDzaZz5FvERfr9"
    },
    {
        name: "木の家ゲストハウス松山本館",
        dates: "2026/4/1 — 2026/4/2",
        address: "愛媛県松山市越智３丁目６−６, 愛媛県松山市, Japan 790-0933",
        notes: "Map Code：53 199 637*82\nkey box【9655】",
        mapUrl: "https://maps.app.goo.gl/Sbr2kRYoS9dVHCf88"
    },
    {
        name: "entohouse BAR&GUESTHOUSE",
        dates: "2026/4/2 — 2026/4/3",
        address: "西予市野村町野村９−１８０, 西予市, Japan 797-1212",
        notes: "Map Code：176 736 086*27",
        mapUrl: "https://maps.app.goo.gl/vYpASt1zACD7uEGr5"
    },
    {
        name: "光の宿",
        dates: "2026/4/3 — 2026/4/4",
        address: "富岡町トノ町６６－１, 阿南市, Japan 774-0033",
        notes: "Map Code：217 589 853*57",
        mapUrl: "https://maps.app.goo.gl/Fyv8NJsh7Wp7Kwmu9"
    },
    {
        name: "大阪難波ELLY-one",
        dates: "2026/4/4 — 2026/4/5",
        address: "大阪市中央区日本橋2-18-19 公寓, Osaka, Japan 542-0073",
        notes: "",
        mapUrl: "https://maps.app.goo.gl/dDttATrd7b8dM3mt5"
    }
];

export const itineraryData: ItineraryDay[] = [
    { 
        day: 1, 
        date: "2026/03/28", 
        theme: "城市漫遊與轉乘", 
        color: "border-[#f1be42]", 
        highlight: "泰國越捷 VZ566 11:00 抵達 KIX，難波/心齋橋購物。", 
        stops: [
            {
                time: "07:30",
                name: "臺灣桃園國際機場",
                durationLabel: "(起飛)",
                note: "備註：\n📝越捷航空_VZ566",
                transport: { mode: "✈️", time: "2hr3min" },
                category: "🛫"
            },
            {
                time: "11:00",
                name: "関西国際空港",
                durationLabel: "(停留 01時00分)",
                note: "備註：\n📝 搭乘手扶梯至2F、ICOCA卡(南海電鐵_紅色窗口)",
                transport: { mode: "🚶", time: "10分" },
                category: "🛬"
            },
            {
                time: "12:30",
                name: "関西空港駅",
                durationLabel: "(停留 00時09分)",
                note: "備註：\n📝南海空港線:\n関西空港 → 南海難波(11站)\n💴¥970",
                mapUrl: "https://maps.app.goo.gl/FqjshYKq5CnPxBDT7",
                transport: { mode: "🚇", time: "54分" },
                category: "🚉"
            },
            {
                time: "13:33",
                name: "南海難波",
                durationLabel: "(停留 00時30分)",
                note: "📝行李寄放",
                storageUrl: "https://maps.app.goo.gl/he44jc3v25impeKq6",
                transport: { mode: "🚶", time: "4分" },
                category: "🚉"
            },
            {
                time: "14:07",
                name: "福太郎 難波Dining Maison店",
                durationLabel: "(停留 01時00分)",
                mapUrl: "https://maps.app.goo.gl/TxSwyh3CFuRcGjep8",
                transport: { mode: "🚶", time: "9分" },
                category: "🍽️"
            },
            {
                time: "15:16",
                name: "K-books Namba-ichibankan",
                durationLabel: "(停留 01時00分)",
                mapUrl: "https://maps.app.goo.gl/MWa7egcKfBiB4mpt9",
                transport: { mode: "🚶", time: "5分" },
                category: "🛍️"
            },
            {
                time: "16:21",
                name: "Kotobukiya Namba",
                durationLabel: "(停留 01時00分)",
                mapUrl: "https://maps.app.goo.gl/KbTwZ1xipkzfHX1E9",
                note: "備註：\n📝御堂筋線:\n難波站 → 心齋橋站(1站)\n💴¥190",
                transport: { mode: "🚶+🚃", time: "10分" },
                category: "🛍️"
            },
            {
                time: "17:31",
                name: "3COINS",
                durationLabel: "(停留 01時00分)",
                mapUrl: "https://maps.app.goo.gl/pqvtqcavzvdt1HtGA",
                transport: { mode: "🚶", time: "5分" },
                category: "🛍️"
            },
            {
                time: "18:36",
                name: "HMV&BOOKS SHINSAIBASHI",
                durationLabel: "(停留 01時00分)",
                mapUrl: "https://maps.app.goo.gl/7WzvQLyVqJdP3KLf9",
                note: "備註：\n📝御堂筋線:\n心齋橋站 → 難波站(1站)\n💴¥190",
                transport: { mode: "🚶+🚃", time: "8分" },
                category: "🛍️"
            },
            {
                time: "19:44",
                name: "南海難波",
                durationLabel: "(停留 00時30分)",
                mapUrl: "https://maps.app.goo.gl/FqjshYKq5CnPxBDT7",
                storageUrl: "https://maps.app.goo.gl/he44jc3v25impeKq6",
                note: "備註：\n📝堺筋線:\n日本橋（大阪） → 天神橋筋六丁目(6站)\n💴¥240",
                transport: { mode: "🚶+🚃", time: "25分" },
                category: "🚉"
            },
            {
                time: "20:36",
                name: "JOJO CChouse",
                durationLabel: "(停留 00時15分)",
                mapUrl: "https://maps.app.goo.gl/CaHm3U2Qae6oTWLz9",
                note: "備註：\n📝谷町線:\n天神橋筋六丁目 → 東梅田(2站)\n💴¥190",
                transport: { mode: "🚶+🚃", time: "22分" },
                category: "🛏️"
            },
            {
                time: "21:11",
                name: "新梅田美食街",
                durationLabel: "(停留 01時00分)",
                mapUrl: "https://maps.app.goo.gl/PfkTrsuwTj8YWrCS7",
                note: "備註：\n📝谷町線:\n東梅田 → 天神橋筋六丁目(2站)\n💴¥190",
                transport: { mode: "🚶+🚃", time: "22分" },
                category: "🍽️"
            },
            {
                time: "22:32",
                name: "7-Eleven 天神筋橋六6丁目站南店",
                durationLabel: "(停留 00時15分)",
                mapUrl: "https://maps.app.goo.gl/2X9Brk2n3FqTofzq5",
                transport: { mode: "🚶", time: "5分" },
                category: "🏪"
            },
            {
                time: "22:28",
                name: "JOJO CChouse",
                durationLabel: "",
                mapUrl: "https://maps.app.goo.gl/CaHm3U2Qae6oTWLz9",
                transport: undefined,
                category: "🛏️"
            }
        ]
    },
    { 
        day: 2, 
        date: "2026/03/29", 
        theme: "啟程、烏龍麵與庭園之美", 
        color: "border-[#2b6e90]", 
        highlight: "高速巴士至高松、租車、烏龍麵、栗林公園、骨付鳥。", 
        stops: [
            {
                time: "06:20",
                name: "JOJO CChouse",
                durationLabel: "",
                transport: { mode: "🚶", time: "17min" },
                category: "🛏️"
            },
            {
                time: "06:37",
                name: "大阪梅田_阪急三番街",
                durationLabel: "",
                mapUrl: "https://maps.app.goo.gl/qzNzy6vgcdiQ5LcB6",
                note: "備註：\n📝07:10發車",
                transport: { mode: "🚍", time: "3hr41min" },
                category: "🚏"
            },
            {
                time: "10:51",
                name: "JR高松車站_高速巴士總站",
                durationLabel: "",
                mapUrl: "https://maps.app.goo.gl/xkYKbmPX4qVFYtcQ8",
                transport: { mode: "🚶", time: "4min" },
                category: "🚏"
            },
            {
                time: "11:05",
                name: "平成租車高松車站前店",
                durationLabel: "(停留 00時30分)",
                mapUrl: "https://maps.app.goo.gl/zCnVfvDgy9bnhrB2A",
                transport: { mode: "🚗", time: "11min" },
                category: "🧍"
            },
            {
                time: "11:46",
                name: "手打十段うどんバカ一代",
                durationLabel: "(停留 01時00分)",
                mapUrl: "https://maps.app.goo.gl/AYvf4cQYFPxuAWwM7",
                note:"備註：\n📝Map code: 60 607 011*48\n🅿あなぶきパーク多賀町パーキング\n💴¥100/30min",
                parkingUrl: "https://maps.app.goo.gl/c2nUZh16ivDtgyKs7",
                transport: { mode: "🚗", time: "10min" },
                category: "🍽️"
            },
            {
                time: "13:20",
                name: "栗林公園",
                durationLabel: "(停留 02時00分)",
                mapUrl: "https://maps.app.goo.gl/AYvf4cQYFPxuAWwM7",
                note: "備註：\n💴門票:¥410/人\n🅿栗林公園 駐車場\n📝Map code: 60 545 891*36\n💴¥100/25min",
                parkingUrl: "https://maps.app.goo.gl/c2nUZh16ivDtgyKs7",
                transport: { mode: "🚗", time: "10min" },
                category: "🏞️"
            },
            {
                time: "15:40",
                name: "時尚中心 思夢樂鹿角店",
                durationLabel: "(停留 01時00分)",
                mapUrl: "https://maps.app.goo.gl/ZHD7GTgQtJUxRuah6",
                note: "備註：\n🅿思夢樂附設\n📝Map code: 60 484 016*07\n💴免費",
                transport: { mode: "🚗+🚶", time: "25min" },
                category: "🛍️"
            },
            {
                time: "17:25",
                name: "骨付鳥 一鶴 高松店",
                durationLabel: "(停留 01時00分)",
                mapUrl: "https://maps.app.goo.gl/dm8qZsERDKTztRGu6",
                note: "備註：\n🅿丸亀町町営第4駐車場\n📝Map code: 60 606 454*70\n💴¥500/5h",
                parkingUrl: "https://maps.app.goo.gl/Kfeq77aV4R2s5bYS6",
                transport: { mode: "🚶", time: "3min" },
                category: "🍽️"
            },
            {
                time: "18:35",
                name: "セブン-イレブン高松丸亀町店",
                durationLabel: "(停留 00時30分)",
                mapUrl: "https://maps.app.goo.gl/7cqYFFK8Js4gxqEf8",
                note: "備註：\n📝郵票(きって)¥100/張",
                transport: { mode: "🚶", time: "1min" },
                category: "🏪"
            },
            {
                time: "19:00",
                name: "薬 マツモトキヨシ高松丸亀町店",
                durationLabel: "",
                mapUrl: "https://maps.app.goo.gl/X7rK3ZaXRsDunJaJA",
                note: "備註：\n📝暈船藥等",
                transport: { mode: "🚶", time: "4min" },
                category: "💊"
            },
            {
                time: "20:25",
                name: "丸亀町町営第4駐車場",
                durationLabel: "",
                mapUrl: "https://maps.app.goo.gl/Kfeq77aV4R2s5bYS6",
                transport: { mode: "🚗", time: "8min" },
                category: "🅿️"
            },
            {
                time: "20:40",
                name: "Happy House - TAKAMATSU",
                durationLabel: "",
                mapUrl: "https://maps.app.goo.gl/2ivAUEN5ZpzGWbsD9",
                note: "備註：\n📝Map code: 60 367 360*54",
                category: "🛏️"
            }
        ] 
    },
    { 
        day: 3, 
        date: "2026/03/30", 
        theme: "小豆島絕景", 
        color: "border-[#d15b47]", 
        highlight: "渡輪日、寒霞溪、橄欖公園、天使之路 (需確認潮汐)。", 
        stops: [
            {
                time: "06:00",
                name: "Happy House - TAKAMATSU",
                durationLabel: "",
                transport: { mode: "🚗+🚶", time: "10min" },
                category: "🛏️"
            },
            {
                time: "06:30",
                name: "高松港",
                durationLabel: "",
                mapUrl: "https://maps.app.goo.gl/FtJH7X3Kc2x6Zufx6",
                note: "備註：\n🅿高松駅前広場地下駐車場\n📝Map code: 60 635 869*11\n💴¥1400/6h",
                parkingUrl: "https://maps.app.goo.gl/8oSamJPJqDHFvoVYA",
                transport: { mode: "🚶", time: "1min" },
                category: "⚓"
            },
            {
                time: "06:35",
                name: "小豆島|土庄行きフェリー乗船口",
                durationLabel: "",
                mapUrl: "https://maps.app.goo.gl/1DZX4E6Rvhnjii1z5",
                note: "備註：\n📝7:20發船\n💴¥1330/人(來回)",
                transport: { mode: "🚢", time: "1hr" },
                category: "⚓"
            },
            {
                time: "08:20",
                name: "土庄港１号岸壁",
                durationLabel: "",
                mapUrl: "https://maps.app.goo.gl/tTn7gsKE8fV5C8ki7",
                transport: { mode: "🚶", time: "2min" },
                category: "⚓"
            },
            {
                time: "08:22",
                name: "土庄港",
                durationLabel: "(停留 00時5分)",
                mapUrl: "https://maps.app.goo.gl/FevYmLWP2aa6PgkN9",
                note: "備註：\n📝田ノ浦映画村線:\n08:30土庄港 → 09:02草壁港||\n10:10土庄港 → 10:36草壁港\n💴一日巴士券¥1600/人",
                transport: { mode: "🚍", time: "36min" },
                category: "🚏"
            },
            {
                time: "09:02",
                name: "草壁港",
                durationLabel: "(停留 00時18分)",
                mapUrl: "https://maps.app.goo.gl/enP7ZtV2TW4NjRtS6",
                note: "備註：\n📝寒霞溪急行線:\n09:20草壁港 → 10:01紅雲亭||\n11:10草壁港 → 11:21紅雲亭",
                transport: { mode: "🚍", time: "11min" },
                category: "🚏"
            },
            {
                time: "10:01",
                name: "寒霞溪纜車 紅雲亭站",
                durationLabel: "",
                mapUrl: "https://maps.app.goo.gl/S5RuytkHPGVBZo979",
                note: "備註：\n💴¥2340/人(來回)",
                transport: { mode: "🚡", time: "10min" },
                category: "🚏"
            },
            {
                time: "10:30",
                name: "寒霞溪",
                durationLabel: "(停留 02時00分)",
                mapUrl: "https://maps.app.goo.gl/erzzmTqHjrBHFTzY8",
                transport: { mode: "🚡", time: "10min" },
                category: "🏞️"
            },
            {
                time: "12:40",
                name: "寒霞溪纜車 紅雲亭站",
                durationLabel: "(停留 00時04分)",
                mapUrl: "https://maps.app.goo.gl/S5RuytkHPGVBZo979",
                note: "備註：\n📝寒霞溪急行線:\n12:50紅雲亭 → 13:01草壁港||\n14:30紅雲亭 → 14:41草壁港",
                transport: { mode: "🚍", time: "11min" },
                category: "🚏"
            },
            {
                time: "13:01",
                name: "草壁港",
                durationLabel: "(停留 00時35分)",
                mapUrl: "https://maps.app.goo.gl/enP7ZtV2TW4NjRtS6",
                note: "備註：\n📝南廻り福田線:13:36草壁港 → 13:40オリーブ公園口||\n📝坂手線:14:15草壁港 → 14:19オリーブ公園口||\n📝田ノ浦映画村線:14:56草壁港 → 15:00オリーブ公園口",
                transport: { mode: "🚍", time: "4min" },
                category: "🚏"
            },
            {
                time: "13:40",
                name: "小豆島橄欖公園",
                durationLabel: "(停留 01時20分)",
                mapUrl: "https://maps.app.goo.gl/TzTtBd5bNXHBVfMz5",
                note: "備註：\n📝田ノ浦映画村線:\n15:00オリーブ公園口→15:22国際ホテル_エンジェルロード前",
                transport: { mode: "🚍", time: "22min" },
                category: "📷"
            },
            {
                time: "15:22",
                name: "エンジェルロード",
                durationLabel: "(停留 01時00分)",
                mapUrl: "https://maps.app.goo.gl/4C8pztCZJZsJDA1k8",
                note: "備註：\n📝田ノ浦映画村線:\n16:58国際ホテル_エンジェルロード前→17:08土庄港||\n18:36国際ホテル_エンジェルロード前→18:46土庄港",
                transport: { mode: "🚍", time: "10min" },
                category: "🌅"
            },
            {
                time: "17:08",
                name: "土庄港1号岸壁",
                durationLabel: "",
                mapUrl: "https://maps.app.goo.gl/tTn7gsKE8fV5C8ki7",
                note: "備註：\n📝17:30發船||18:40發船",
                transport: { mode: "🚢", time: "1hr" },
                category: "⚓"
            },
            {
                time: "18:30",
                name: "小豆島|土庄行きフェリー乗船口",
                durationLabel: "",
                mapUrl: "https://maps.app.goo.gl/1DZX4E6Rvhnjii1z5",
                transport: { mode: "🚶", time: "2min" },
                category: "⚓"
            },
            {
                time: "18:35",
                name: "高松駅前広場地下駐車場",
                durationLabel: "",
                mapUrl: "https://maps.app.goo.gl/8oSamJPJqDHFvoVYA",
                note: "備註：\n📝マリタイムプラザ高松",
                transport: { mode: "🚗", time: "1hr" },
                category: "🅿️"
            },
            {
                time: "20:00",
                name: "325番地",
                durationLabel: "(停留 00時15分)",
                mapUrl: "https://maps.app.goo.gl/qKSvDzaZz5FvERfr9",
                note: "備註：\n📝Map Code：77 392 568*62",
                transport: { mode: "🚶", time: "2min" },
                category: "🛏️"
            },
            {
                time: "20:20",
                name: "MAWARU",
                durationLabel: "(停留 01時00分)",
                mapUrl: "https://maps.app.goo.gl/ieg54ETPjDopiMHt5",
                transport: { mode: "🚶", time: "4min" },
                category: "🍽️"
            },
            {
                time: "21:30",
                name: "Lawson Niocho Shop",
                durationLabel: "(停留 00時30分)",
                mapUrl: "https://maps.app.goo.gl/1XFU7jzYiUNMveS46",
                transport: { mode: "🚶", time: "5min" },
                category: "🏪"
            },
            {
                time: "22:05",
                name: "arigatouya 3 minutes by car to C",
                durationLabel: "(停留 01時00分)",
                mapUrl: "https://maps.app.goo.gl/qKSvDzaZz5FvERfr9",
                category: "🛏️"
            }
        ]
    },
    { 
        day: 4, 
        date: "2026/03/31", 
        theme: "秘境：祖谷藤蔓橋與天空鳥居", 
        color: "border-[#98c187]", 
        highlight: "大步危峽谷、祖谷藤蔓橋、雲邊寺、高屋神社、父母濱日落。", 
        stops: [
            {
                time: "07:30",
                name: "arigatouya 3 minutes by car to C",
                durationLabel: "",
                transport: { mode: "🚗", time: "1hr13min" },
                category: "🛏️"
            },
            {
                time: "08:50",
                name: "大步危峽谷觀光遊覽船",
                durationLabel: "(停留 01時00分)",
                mapUrl: "https://maps.app.goo.gl/zn6R4ap7Qtdi7St7A",
                note: "備註：\n📝Map Code：357 151 826*11\n💴¥1500/人(來回)\n🅿觀光船附設\n💴免費",
                transport: { mode: "🚗", time: "16min" },
                category: "🚢"
            },
            {
                time: "10:00",
                name: "ENEOS かずら橋 SS",
                durationLabel: "(停留 00時15分)",
                mapUrl: "https://maps.app.goo.gl/BrwrwQxPuvPxhxGK7",
                note: "備註：\n📝Map Code：357 188 401*22",
                transport: { mode: "🚗+🚶", time: "10min" },
                category: "⛽"
            },
            {
                time: "10:30",
                name: "祖谷のかずら橋管理小屋",
                durationLabel: "(停留 00時15分)",
                mapUrl: "https://maps.app.goo.gl/m47yUdoA3czX1oMT6",
                note: "備註：\n💴門票：¥550/人\n📝Map Code：357 130 554*57\n🅿かずら橋 渡り口駐車場\n💴¥500/次\n📝Map Code：357 130 708*11\n🅿祖谷のかずら橋付近駐車場(備案)\n💴¥300/次",
                parkingUrl: "https://maps.app.goo.gl/cfdLER9teSjFkc9P7",
                transport: { mode: "🚶", time: "2min" },
                category: "🅿️"
            },
            {
                time: "10:50",
                name: "祖谷藤蔓橋",
                durationLabel: "(停留 01時00分)",
                mapUrl: "https://maps.app.goo.gl/6JgqyHxz6ZoufjbRA",
                transport: { mode: "🚶", time: "3min" },
                category: "🏞️"
            },
            {
                time: "11:55",
                name: "やま里",
                durationLabel: "(停留 01時00分)",
                mapUrl: "https://maps.app.goo.gl/kVzSR6KTBgfMCSZP7",
                transport: { mode: "🚶", time: "5min" },
                category: "🍽️"
            },
            {
                time: "13:00",
                name: "かずら橋 渡り口駐車場",
                durationLabel: "",
                mapUrl: "https://maps.app.goo.gl/cfdLER9teSjFkc9P7",
                transport: { mode: "🚗", time: "1hr35min" },
                category: "🅿️"
            },
            {
                time: "14:40",
                name: "高屋神社（本宮）",
                durationLabel: "(停留 01時00分)",
                mapUrl: "https://maps.app.goo.gl/56EvWYLbpPH4129E6",
                note: "備註：\n📝Map Code：77 274 062*73\n🅿天空の鳥居駐車場\n💴免費",
                parkingUrl: "https://maps.app.goo.gl/QtTb4nMgn2dFZpDG6",
                transport: { mode: "🚗", time: "25min" },
                category: "⛩️"
            },
            {
                time: "16:15",
                name: "父母濱海岸",
                durationLabel: "(停留 02時00分)",
                mapUrl: "https://maps.app.goo.gl/xE5tHKgyV9ct8uscA",
                note: "備註：\n📝Map Code：77 363 248*02\n🅿父母ヶ浜 第1駐車場\n💴免費",
                parkingUrl: "https://maps.app.goo.gl/6zkaAZpXzv4vYvoL7",
                transport: { mode: "🚗", time: "10min" },
                category: "🌅"
            },
            {
                time: "18:30",
                name: "arigatouya 3 minutes by car to C",
                durationLabel: "",
                mapUrl: "https://maps.app.goo.gl/qKSvDzaZz5FvERfr9",
                note: "備註：\n📝Map Code：77 392 568*62",
                transport: { mode: "🚶", time: "4min" },
                category: "🛏️"
            },
            {
                time: "18:50",
                name: "鮨酒場 南",
                durationLabel: "(停留 01時00分)",
                mapUrl: "https://maps.app.goo.gl/csCQa8HWB3tV4Ybg7",
                transport: { mode: "🚶", time: "5min" },
                category: "🍽️"
            },
            {
                time: "20:00",
                name: "Lawson Niocho Shop",
                durationLabel: "",
                mapUrl: "https://maps.app.goo.gl/1XFU7jzYiUNMveS46",
                transport: { mode: "🚶", time: "5min" },
                category: "🏪"
            },
            {
                time: "20:30",
                name: "arigatouya 3 minutes by car to C",
                durationLabel: "",
                mapUrl: "https://maps.app.goo.gl/qKSvDzaZz5FvERfr9",
                category: "🛏️"
            }
        ]
    },
    { 
        day: 5, 
        date: "2026/04/01", 
        theme: "登高與溫泉放鬆", 
        color: "border-[#2b6e90]", // Theme Blue
        highlight: "挑戰金刀比羅宮、松山移動、道後溫泉泡湯。", 
        stops: [
            {
                time: "07:00",
                name: "arigatouya 3 minutes by car to C",
                durationLabel: "",
                transport: { mode: "🚗", time: "5min" },
                category: "🛏️"
            },
            {
                time: "07:15",
                name: "ENEOS 仁尾 SS",
                durationLabel: "(停留 00時15分)",
                mapUrl: "https://maps.app.goo.gl/f1vBiCDokJ5r5Zuw6",
                note: "備註：\n📝Map Code：77 393 150*55\n📝レギュラー(紅色)",
                transport: { mode: "🚗", time: "35min" },
                category: "⛽"
            },
            {
                time: "08:05",
                name: "琴平公園駐車場",
                durationLabel: "",
                mapUrl: "https://maps.app.goo.gl/ia34DVa5jsSGzjsz9",
                note: "備註：\n📝Map Code：77 353 621*01\n🅿琴平海洋博物館駐車場(備案)\n📝Map Code：77 353 853*43\n💴免費",
                transport: { mode: "🚶", time: "12min" },
                category: "🅿"
            },
            {
                time: "08:20",
                name: "金刀比羅宮 大門",
                durationLabel: "",
                mapUrl: "https://maps.app.goo.gl/LWxdVdMXkuvNhd6v7",
                note: "備註：\n💴出租拐杖¥100/根",
                transport: { mode: "🚶", time: "15min" },
                category: "📷"
            },
            {
                time: "08:45",
                name: "金刀比羅宮",
                durationLabel: "(停留 01時00分)",
                mapUrl: "https://maps.app.goo.gl/TuUx1tuMobYrWFyo6",
                transport: { mode: "🚶", time: "6min" },
                category: "⛩️"
            },
            {
                time: "10:00",
                name: "神椿",
                durationLabel: "(停留 01時00分)",
                mapUrl: "https://maps.app.goo.gl/dvM31LBwcY2mvdwQ6",
                transport: { mode: "🚶", time: "15min" },
                category: "🍽️"
            },
            {
                time: "11:30",
                name: "琴平公園駐車場",
                durationLabel: "",
                mapUrl: "https://maps.app.goo.gl/ia34DVa5jsSGzjsz9",
                transport: { mode: "🚗", time: "10min" },
                category: "🅿"
            },
            {
                time: "11:40",
                name: "栄光酒造",
                durationLabel: "(停留 01時00分)",
                mapUrl: "https://maps.app.goo.gl/wViy53FWWiFaidcq8",
                note: "備註：\n📝Map Code：53 352 757*26\n🅿酒廠附設\n💴免費",
                specialUrl: "https://maps.app.goo.gl/T6sLeePwZoBE7g3TA",
                transport: { mode: "🚗", time: "10min" },
                category: "🛍️"
            },
            {
                time: "13:00",
                name: "湯山郵便局",
                durationLabel: "(停留 01時00分)",
                mapUrl: "https://maps.app.goo.gl/qDXe3LUeBdWZh946A",
                note: "備註：\n📝Map Code：53 352 632*01\n💴明信片郵資¥100/張",
                transport: { mode: "🚗+🚶", time: "10min" },
                category: "🏣"
            },
            {
                time: "14:20",
                name: "放生園",
                durationLabel: "(停留 00時15分)",
                mapUrl: "https://maps.app.goo.gl/fkBKoFgqQCRoAUCT9",
                note: "備註：\n🅿エコロパーク 道後温泉前第1駐車場\n📝Map Code：53 349 563*61\n💴¥600/次\n🅿道後湯の里パーキング(備案)\n💴¥100/30min",
                parkingUrl: "https://maps.app.goo.gl/MATR6qjhJByNJXEUA",
                transport: { mode: "🚶", time: "1min" },
                category: "📷"
            },
            {
                time: "14:35",
                name: "坊っちゃん列車",
                durationLabel: "(停留 00時15分)",
                mapUrl: "https://maps.app.goo.gl/yupEvQoxeLs9xfRS7",
                transport: { mode: "🚶", time: "1min" },
                category: "📷"
            },
            {
                time: "14:50",
                name: "愛媛の食卓1970",
                durationLabel: "(停留 00時30分)",
                mapUrl: "https://maps.app.goo.gl/qYfHfWUgVj9Y4tX69",
                transport: { mode: "🚶", time: "1min" },
                category: "🍽️"
            },
            {
                time: "15:20",
                name: "つぼや菓子舗",
                durationLabel: "(停留 00時30分)",
                mapUrl: "https://maps.app.goo.gl/88fBM54ZDjnqmqiSA",
                note: "備註：\n📝元祖坊っちゃん団子",
                transport: { mode: "🚶", time: "1min" },
                category: "🍽️"
            },
            {
                time: "16:00",
                name: "道後温泉別館 飛鳥乃湯泉",
                durationLabel: "(停留 01時30分)",
                mapUrl: "https://maps.app.goo.gl/jooFV8dHv4xKc8Yu6",
                note: "備註：\n💴門票：¥1280/人\n💴租借：毛巾¥100||浴巾¥300||置物櫃¥100",
                transport: { mode: "🚶", time: "5min" },
                category: "♨️"
            },
            {
                time: "17:35",
                name: "ローソン 松山道後駅前店",
                durationLabel: "",
                mapUrl: "https://maps.app.goo.gl/r3kVxL85DchSFPhp7",
                transport: { mode: "🚶", time: "3min" },
                category: "🏪"
            },
            {
                time: "18:10",
                name: "エコロパーク 道後温泉前第1駐車場",
                durationLabel: "",
                mapUrl: "https://maps.app.goo.gl/MATR6qjhJByNJXEUA",
                transport: { mode: "🚗", time: "16min" },
                category: "🅿"
            },
            {
                time: "18:30",
                name: "木の家ゲストハウス松山本館",
                durationLabel: "",
                mapUrl: "https://maps.app.goo.gl/bHZsfw6WmcXYgKHm7",
                note: "備註：\n📝Map Code：53 199 637*82",
                transport: { mode: "🚶", time: "5min" },
                category: "🛏️"
            },
            {
                time: "19:00",
                name: "丸源拉麵",
                durationLabel: "(停留 01時00分)",
                mapUrl: "https://maps.app.goo.gl/QakGxiXS8ztEryWh7",
                transport: { mode: "🚶", time: "5min" },
                category: "🍽️"
            },
            {
                time: "20:15",
                name: "木の家ゲストハウス松山本館",
                durationLabel: "",
                mapUrl: "https://maps.app.goo.gl/bHZsfw6WmcXYgKHm7",
                category: "🛏️"
            }
        ]
    },
    { 
        day: 6, 
        date: "2026/04/02", 
        theme: "雙城古城巡禮", 
        color: "border-[#d15b47]", // Theme Red
        highlight: "松山城、萬翠莊、宇和島城、海鮮市場。", 
        stops: [
            {
                time: "07:00",
                name: "木の家ゲストハウス松山本館",
                durationLabel: "",
                transport: { mode: "🚗", time: "5min" },
                category: "🛏️"
            },
            {
                time: "07:15",
                name: "ENEOS 松山南 SS",
                durationLabel: "(停留 00時15分)",
                mapUrl: "https://maps.app.goo.gl/6AY7JBAFweeuAn8r5",
                note: "備註：\n📝Map Code：53 258 191*36\n📝レギュラー(紅色)",
                transport: { mode: "🚗", time: "15min" },
                category: "⛽"
            },
            {
                time: "07:45",
                name: "濱商パークしののめ",
                durationLabel: "",
                mapUrl: "https://maps.app.goo.gl/vva5x9ZjuBhZeHP9A",
                note: "備註：\n📝Map Code：53 348 060*38\n💴¥100/90min\n🅿あなぶきパーク西一万(備案)\n💴¥100/hr",
                transport: { mode: "🚶", time: "10min" },
                category: "🅿️"
            },
            {
                time: "08:05",
                name: "マクドナルド",
                durationLabel: "(停留 01時00分)",
                mapUrl: "https://maps.app.goo.gl/HmTpNHfP3nSxkCwe9",
                transport: { mode: "🚶", time: "5min" },
                category: "🍽️"
            },
            {
                time: "09:10",
                name: "萬翠莊舊管理人舎",
                durationLabel: "(停留 00時30分)",
                mapUrl: "https://maps.app.goo.gl/eASaxspQws3xyZ698",
                note: "備註：\n門票💴¥400/人",
                transport: { mode: "🚶", time: "11min" },
                category: "📷"
            },
            {
                time: "09:55",
                name: "松山城 黒門口登城道",
                durationLabel: "",
                mapUrl: "https://maps.app.goo.gl/v27DjsP2USX7eMox8",
                transport: { mode: "🚶", time: "20min" },
                category: "🏞️"
            },
            {
                time: "10:15",
                name: "松山城",
                durationLabel: "(停留 01時00分)",
                mapUrl: "https://maps.app.goo.gl/srxvAV9QaLZm98tA8",
                transport: { mode: "🚶", time: "8min" },
                category: "📷"
            },
            {
                time: "11:25",
                name: "松山城_長者ヶ平站",
                durationLabel: "",
                note: "備註：\n💴纜車：¥270/人(單趟)",
                transport: { mode: "🚡", time: "10min" },
                category: "🚡"
            },
            {
                time: "11:35",
                name: "松山城_東雲口站",
                durationLabel: "",
                transport: { mode: "🚶", time: "3min" },
                category: "🚡"
            },
            {
                time: "11:45",
                name: "濱商パークしののめ",
                durationLabel: "",
                mapUrl: "https://maps.app.goo.gl/vva5x9ZjuBhZeHP9A",
                transport: { mode: "🚗", time: "11min" },
                category: "🅿️"
            },
            {
                time: "12:10",
                name: "太陽市",
                durationLabel: "(停留 01時00分)",
                mapUrl: "https://maps.app.goo.gl/HSQKM2NCEMSKGixa6",
                note: "備註：\n📝Map Code：53 285 824*78\n🅿賣場附設\n💴免費",
                transport: { mode: "🚗+🚶", time: "1hr30min" },
                category: "🍽️"
            },
            {
                time: "14:50",
                name: "藩老桑折氏武家長屋門",
                durationLabel: "",
                mapUrl: "https://maps.app.goo.gl/2qKmLgFHtNVx4HGy9",
                note: "備註：\n🅿市営 城山下有料駐車場\n📝Map Code：176 188 124*67\n💴¥100/hr\n🅿宇和島リージェントホテル前駐車場(備案)\n💴¥100/hr",
                parkingUrl: "https://maps.app.goo.gl/jAs5cbzNkBKYo57u6",
                transport: { mode: "🚶", time: "10min" },
                category: "🏞️"
            },
            {
                time: "15:00",
                name: "宇和島城",
                durationLabel: "(停留 01時00分)",
                mapUrl: "https://maps.app.goo.gl/mBe7fBXqWgcKhkj56",
                transport: { mode: "🚶", time: "10min" },
                category: "📷"
            },
            {
                time: "16:10",
                name: "市営 城山下有料駐車場",
                durationLabel: "",
                mapUrl: "https://maps.app.goo.gl/jAs5cbzNkBKYo57u6",
                transport: { mode: "🚗", time: "5min" },
                category: "🅿️"
            },
            {
                time: "16:15",
                name: "道の駅 うわじま きさいや広場",
                durationLabel: "(停留 01時30分)",
                mapUrl: "https://maps.app.goo.gl/p9Q4knVmycWpBBsq8",
                note: "備註：\n🅿道の駅附設\n📝Map Code：176 187 280*68\n💴免費",
                transport: { mode: "🚗", time: "35min" },
                category: "🛍️"
            },
            {
                time: "18:25",
                name: "entohouse BAR&GUESTHOUSE",
                durationLabel: "",
                mapUrl: "https://maps.app.goo.gl/mxMYey9ZQL1QrgUP7",
                note: "備註：\n📝Map Code：176 736 086*27",
                transport: { mode: "🚶", time: "10min" },
                category: "🛏️"
            },
            {
                time: "18:50",
                name: "麺や 一心",
                durationLabel: "(停留 01時00分)",
                mapUrl: "https://maps.app.goo.gl/b3D1Kg3SdtZUPxRy6",
                transport: { mode: "🚶", time: "1min" },
                category: "🍽️"
            },
            {
                time: "20:05",
                name: "ファミリーマート 野村店",
                durationLabel: "",
                mapUrl: "https://maps.app.goo.gl/RXsnajubjMBzRn5z7",
                transport: { mode: "🚶", time: "10min" },
                category: "🏪"
            },
            {
                time: "20:30",
                name: "entohouse BAR&GUESTHOUSE",
                durationLabel: "",
                mapUrl: "https://maps.app.goo.gl/mxMYey9ZQL1QrgUP7",
                category: "🛏️"
            }
        ]
    },
    { 
        day: 7, 
        date: "2026/04/03", 
        theme: "美食、企鵝與花園", 
        color: "border-[#f1be42]", // Theme Yellow
        highlight: "弘人市場、桂濱水族館、莫內庭園、長距離移動至德島。", 
        stops: [
            {
                time: "07:00",
                name: "entohouse BAR&GUESTHOUSE",
                durationLabel: "",
                transport: { mode: "🚗", time: "3min" },
                category: "🛏️"
            },
            {
                time: "07:15",
                name: "apollstation 野村 SS (岡田石油店)",
                durationLabel: "(停留 00時15分)",
                mapUrl: "https://maps.app.goo.gl/hRTJpM5KrEsiSYQr9",
                note: "備註：\n📝Map Code：176 737 552*54\n📝レギュラー(紅色)",
                transport: { mode: "🚗+🚶", time: "2hr35min" },
                category: "⛽"
            },
            {
                time: "10:00",
                name: "弘人市場",
                durationLabel: "(停留 01時30分)",
                mapUrl: "https://maps.app.goo.gl/j4a6D2GHqtnGCrwL6",
                note: "備註：\n🅿APパーク 高知\n📝Map Code：73 184 675*88\n💴¥100/20min",
                parkingUrl: "https://maps.app.goo.gl/AYv84yEnAeZqTgqM6",
                transport: { mode: "🚗+🚶", time: "45min" },
                category: "🍽️"
            },
            {
                time: "12:20",
                name: "桂濱水族館",
                durationLabel: "(停留 01時30分)",
                mapUrl: "https://maps.app.goo.gl/j4a6D2GHqtnGCrwL6",
                note: "備註：\n💴門票：¥1600/人\n🅿龍馬駐車場\n📝Map Code：858 279 451*16\n💴¥200/次",
                parkingUrl: "https://maps.app.goo.gl/Fi2C5H1i7yqiyr617",
                transport: { mode: "🚗+🚶", time: "1hr15min" },
                category: "📷"
            },
            {
                time: "15:05",
                name: "莫內庭園",
                durationLabel: "(停留 01時30分)",
                mapUrl: "https://maps.app.goo.gl/a7jKj2nQFMGTAzTe9",
                note: "備註：\n💴門票：¥1000/人\n🅿北川村モネの庭マルモッタン駐車場\n📝Map Code：421 664 310*07\n💴免費",
                parkingUrl: "https://maps.app.goo.gl/e4MG94PWK2ffJLUr6",
                transport: { mode: "🚗", time: "1hr40min" },
                category: "📷"
            },
            {
                time: "18:20",
                name: "ENEOS 牟岐 SS",
                durationLabel: "(停留 00時15分)",
                mapUrl: "https://maps.app.goo.gl/FMyPZ68ew2WRy5i2A",
                note: "備註：\n📝Map Code：427 620 289*28\n📝レギュラー(紅色)",
                transport: { mode: "🚗", time: "55min" },
                category: "⛽"
            },
            {
                time: "19:30",
                name: "Hikarinoyado",
                durationLabel: "",
                mapUrl: "https://maps.app.goo.gl/TydmYcnBHp1AoLjL8",
                note: "備註：\n📝Map Code：176 736 086*27",
                transport: { mode: "🚶", time: "10min" },
                category: "🛏️"
            },
            {
                time: "19:55",
                name: "客美多咖啡 阿南富岡店",
                durationLabel: "(停留 01時00分)",
                mapUrl: "https://maps.app.goo.gl/KBM8W6WU4LEcQfy8A",
                transport: { mode: "🚶", time: "10min" },
                category: "🍽️"
            },
            {
                time: "21:10",
                name: "Hikarinoyado",
                durationLabel: "",
                mapUrl: "https://maps.app.goo.gl/TydmYcnBHp1AoLjL8",
                category: "🛏️"
            }
        ]
    },
    { 
        day: 8, 
        date: "2026/04/04", 
        theme: "渦潮震撼與重返大阪", 
        color: "border-[#98c187]", 
        highlight: "阿波舞、鳴門渦潮、高松還車、高速巴士回大阪。", 
        stops: [
            {
                time: "07:00",
                name: "Hikarinoyado",
                durationLabel: "",
                transport: { mode: "🚗", time: "45min" },
                category: "🛏️"
            },
            {
                time: "08:00",
                name: "ローソン 徳島西大工町二丁目店",
                durationLabel: "",
                mapUrl: "https://maps.app.goo.gl/1AEokw2myuvtHDes8",
                note: "備註：\n🅿ローソン附設\n📝Map Code：56 260 175*22\n💴免費",
                transport: { mode: "🚗+🚶", time: "2min" },
                category: "🏪"
            },
            {
                time: "09:00",
                name: "阿波おどり会館",
                durationLabel: "(停留 01時30分)",
                mapUrl: "https://maps.app.goo.gl/NRG8a1A8ZvgJ6Ywi9",
                note: "備註：\n🅿パークワン西山手\n📝Map Code：56 260 052*20\n💴¥100/20min",
                parkingUrl: "https://maps.app.goo.gl/JzsooL9Y7yK7wH9f6",
                transport: { mode: "🚗", time: "35min" },
                category: "🛍️"
            },
            {
                time: "11:10",
                name: "うずしお観潮船",
                durationLabel: "",
                mapUrl: "https://maps.app.goo.gl/acgeUcJ4j77CrEm18",
                note: "備註：\n📝11:40發船\n💴遊艇：¥2000/人\n🅿うずしお観潮船 マイカー駐車場\n📝Map Code：106 210 212*81\n💴免費",
                parkingUrl: "https://maps.app.goo.gl/kRL3c7SQHvqayrGg8",
                transport: { mode: "🚗", time: "1hr40min" },
                category: "🛥️"
            },
            {
                time: "14:00",
                name: "ENEOS セルフ城東SS",
                durationLabel: "(停留 00時15分)",
                mapUrl: "https://maps.app.goo.gl/GVmtkeKzZs4UmExE8",
                note: "備註：\n📝Map Code：60 637 301*57\n📝レギュラー(紅色)",
                transport: { mode: "🚗", time: "5min" },
                category: "⛽"
            },
            {
                time: "14:15",
                name: "平成租車高松車站前店",
                durationLabel: "(停留 00時30分)",
                mapUrl: "https://maps.app.goo.gl/kV1vv6qQCgpPbvym6",
                note: "備註：\n📝Map Code：60 636 604*05",
                transport: { mode: "🚶", time: "4min" },
                category: "🧍"
            },
            {
                time: "14:45",
                name: "高松車站_高速巴士總站",
                durationLabel: "",
                mapUrl: "https://maps.app.goo.gl/kV1vv6qQCgpPbvym6",
                note: "備註：\n📝15:00發車",
                transport: { mode: "🚍", time: "3hr22min" },
                category: "🚏"
            },
            {
                time: "18:22",
                name: "JR難波站前",
                durationLabel: "",
                mapUrl: "https://maps.app.goo.gl/8iZYYMXXqWt5GKCf7",
                note: "備註：\n📝近鐵奈良線:\n大阪難波 → 近鐵日本橋(1站)\n💴¥180",
                transport: { mode: "🚶+🚃", time: "16分" },
                category: "🚏"
            },
            {
                time: "18:50",
                name: "大阪難波ELLY-one",
                durationLabel: "",
                mapUrl: "https://maps.app.goo.gl/LtKsVRVXiNFDwqmU6",
                transport: { mode: "🚶", time: "12分" },
                category: "🛏️"
            },
            {
                time: "19:25",
                name: "なんばマルイ",
                durationLabel: "(停留 00時15分)",
                mapUrl: "https://maps.app.goo.gl/ocPpbu46CYQh5Ad78",
                note: "備註：\n📝BLOOMING自動販売機-1F\n📝Osaka Metro 御堂筋線なんば駅 中改札外(備案)",
                transport: { mode: "🚶", time: "4分" },
                category: "🛍️"
            },
            {
                time: "19:50",
                name: "Karaokekan Namba-ebisubashi honten",
                durationLabel: "(停留 02時00分)",
                mapUrl: "https://maps.app.goo.gl/twvB49NcQ9gB8vgh8",
                transport: { mode: "🚶", time: "1分" },
                category: "🎶"
            },
            {
                time: "22:00",
                name: "道頓堀",
                durationLabel: "(停留 01時00分)",
                mapUrl: "https://maps.app.goo.gl/Eu5cPwihJ6md8voK9",
                transport: { mode: "🚶", time: "16分" },
                category: "🛍️"
            },
            {
                time: "23:16",
                name: "ファミリーマート日本橋二丁目店",
                durationLabel: "",
                mapUrl: "https://maps.app.goo.gl/ir97bFTxSZirsSdj9",
                transport: { mode: "🚶", time: "16分" },
                category: "🛍️"
            },
            {
                time: "23:50",
                name: "大阪難波ELLY-one",
                durationLabel: "",
                mapUrl: "https://maps.app.goo.gl/LtKsVRVXiNFDwqmU6",
                category: "🛏️"
            }
        ]
    },
    { 
        day: 9, 
        date: "2026/04/05", 
        theme: "台灣", 
        color: "border-[#2b6e90]", 
        highlight: "上午彈性活動時間增加！14:00 KIX → 15:55 TPE。", 
        stops: [
            {
                time: "09:00",
                name: "大阪難波ELLY-one",
                durationLabel: "",
                transport: { mode: "🚶", time: "8分" },
                category: "🛏️"
            },
            {
                time: "09:39",
                name: "南海難波",
                durationLabel: "",
                mapUrl: "https://maps.app.goo.gl/FqjshYKq5CnPxBDT7",
                note: "備註：\n📝南海空港線：南海難波>関西空港(11站)\n💴¥970",
                transport: { mode: "🚇", time: "54分" },
                category: "🚉"
            },
            {
                time: "10:28",
                name: "関西空港駅",
                durationLabel: "",
                transport: { mode: "🚶", time: "10分" },
                category: "🚉"
            },
            {
                time: "14:00",
                name: "関西国際空港",
                durationLabel: "",
                note: "備註：\n📝中華航空_CI153",
                transport: { mode: "✈️", time: "2hr" },
                category: "🛫"
            },
            {
                time: "16:00",
                name: "臺灣桃園國際機場",
                durationLabel: "",
                category: "🛬"
            }
        ] 
    },
];
