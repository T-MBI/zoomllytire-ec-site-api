const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// ミドルウェア
app.use(cors());
app.use(express.json());

// サンプル注文データ
let orders = [
    {
        id: "10001",
        customer_email: "janet.smith@example.com",
        customer_name: "田中 花子",
        customer_address: "〒150-0001 東京都渋谷区神宮前1-1-1",
        delivery_date: "2025-01-26",
        delivery_time: "09-12",
        status: "配送完了",
        store: "2031",
        location: "In Store",
        link: "https://portal.zoomllytire.net?order=10001",
        items: [
            { name: "オールシーズンタイヤ", price: 18000, quantity: 4, image: "🌤️" }
        ],
        total: 72000,
        created_at: "2025-01-26T11:30:00Z"
    },
    {
        id: "10002",
        customer_email: "john.doe@example.com",
        customer_name: "佐藤 太郎",
        customer_address: "〒530-0001 大阪府大阪市北区梅田1-1-1",
        delivery_date: "2025-01-28",
        delivery_time: "14-18",
        status: "配送中",
        store: "2031",
        location: "In Store",
        link: "https://portal.zoomllytire.net?order=10002",
        items: [
            { name: "ウィンタータイヤ（スタッドレス）", price: 22000, quantity: 4, image: "❄️" }
        ],
        total: 88000,
        created_at: "2025-01-24T14:15:00Z"
    },
    {
        id: "10003",
        customer_email: "mary.johnson@example.com",
        customer_name: "鈴木 美恵",
        customer_address: "〒220-0011 神奈川県横浜市西区高島1-1-1",
        delivery_date: "2025-01-29",
        delivery_time: "15-18",
        status: "出荷準備中",
        store: "2031",
        location: "In Store",
        link: "https://portal.zoomllytire.net?order=10003",
        items: [
            { name: "コンフォートタイヤ", price: 15000, quantity: 4, image: "🛋️" }
        ],
        total: 60000,
        created_at: "2025-01-25T09:20:00Z"
    },
    {
        id: "10004",
        customer_email: "robert.brown@example.com",
        customer_name: "高橋 一郎",
        customer_address: "〒460-0001 愛知県名古屋市中区三の丸1-1-1",
        delivery_date: "2025-01-30",
        delivery_time: "10-14",
        status: "処理中",
        store: "2031",
        location: "In Store",
        link: "https://portal.zoomllytire.net?order=10004",
        items: [
            { name: "スポーツタイヤ", price: 25000, quantity: 4, image: "🏎️" }
        ],
        total: 100000,
        created_at: "2025-01-25T16:45:00Z"
    },
    {
        id: "10005",
        customer_email: "lisa.davis@example.com",
        customer_name: "山田 麻美",
        customer_address: "〒810-0001 福岡県福岡市中央区天神1-1-1",
        delivery_date: "2025-01-31",
        delivery_time: "13-17",
        status: "注文受付",
        store: "2031",
        location: "In Store",
        link: "https://portal.zoomllytire.net?order=10005",
        items: [
            { name: "オールシーズンタイヤ", price: 18000, quantity: 4, image: "🌤️" }
        ],
        total: 72000,
        created_at: "2025-01-26T11:30:00Z"
    },
    {
        id: "10006",
        customer_email: "david.wilson@example.com",
        customer_name: "伊藤 健太",
        customer_address: "〒980-0021 宮城県仙台市青葉区中央1-1-1",
        delivery_date: "2025-02-01",
        delivery_time: "09-13",
        status: "出荷遅延中",
        store: "2031",
        location: "In Store",
        link: "https://portal.zoomllytire.net?order=10006",
        items: [
            { name: "SUV・4WD専用タイヤ", price: 28000, quantity: 4, image: "🚙" }
        ],
        total: 112000,
        created_at: "2025-01-22T13:15:00Z"
    },
    {
        id: "10007",
        customer_email: "sarah.garcia@example.com",
        customer_name: "渡辺 さくら",
        customer_address: "〒700-0901 岡山県岡山市北区本町1-1-1",
        delivery_date: "2025-02-02",
        delivery_time: "14-18",
        status: "配送中",
        store: "2031",
        location: "In Store",
        link: "https://portal.zoomllytire.net?order=10007",
        items: [
            { name: "ランフラットタイヤ", price: 35000, quantity: 4, image: "🛡️" }
        ],
        total: 140000,
        created_at: "2025-01-24T08:45:00Z"
    },
    {
        id: "10008",
        customer_email: "michael.martinez@example.com",
        customer_name: "加藤 雄二",
        customer_address: "〒730-0011 広島県広島市中区基町1-1-1",
        delivery_date: "2025-02-03",
        delivery_time: "11-15",
        status: "出荷準備中",
        store: "2031",
        location: "In Store",
        link: "https://portal.zoomllytire.net?order=10008",
        items: [
            { name: "エコノミータイヤ", price: 8500, quantity: 4, image: "🏷️" },
            { name: "ウィンタータイヤ（スタッドレス）", price: 22000, quantity: 4, image: "❄️" }
        ],
        total: 122000,
        created_at: "2025-01-25T15:20:00Z"
    },
    {
        id: "10009",
        customer_email: "jennifer.lopez@example.com",
        customer_name: "松本 由美",
        customer_address: "〒760-0017 香川県高松市番町1-1-1",
        delivery_date: "2025-02-04",
        delivery_time: "16-20",
        status: "処理中",
        store: "2031",
        location: "In Store",
        link: "https://portal.zoomllytire.net?order=10009",
        items: [
            { name: "コンフォートタイヤ", price: 15000, quantity: 4, image: "🛋️" }
        ],
        total: 60000,
        created_at: "2025-01-26T10:15:00Z"
    },
    {
        id: "10010",
        customer_email: "william.anderson@example.com",
        customer_name: "小林 信一",
        customer_address: "〒870-0001 大分県大分市城崎町1-1-1",
        delivery_date: "2025-02-05",
        delivery_time: "12-16",
        status: "注文受付",
        store: "2031",
        location: "In Store",
        link: "https://portal.zoomllytire.net?order=10010",
        items: [
            { name: "スポーツタイヤ", price: 25000, quantity: 4, image: "🏎️" }
        ],
        total: 100000,
        created_at: "2025-01-26T17:30:00Z"
    }
];

// ステータス変換
function getStatusText(status) {
    const statusMap = {
        '注文受付': '注文受付',
        '処理中': '処理中',
        '出荷準備中': '出荷準備中',
        '配送中': '配送中',
        '配送完了': '配送完了',
        '出荷遅延中': '出荷遅延中'
    };
    return statusMap[status] || status;
}

// 注文データ変換
function formatOrderResponse(order) {
    return {
        customer_email: order.customer_email,
        delivery_date: order.delivery_date,
        delivery_time: order.delivery_time + "時",
        id: order.id,
        link: order.link,
        location: "店舗受取",
        status: getStatusText(order.status),
        store: order.store,
        total_amount: "¥" + order.total.toLocaleString(),
        items: order.items.map(item => ({
            name: item.name,
            quantity: item.quantity + "本",
            price: "¥" + item.price.toLocaleString(),
            subtotal: "¥" + (item.price * item.quantity).toLocaleString()
        }))
    };
}

// API エンドポイント

// GET /api/order?id={id} - 特定の注文情報を取得
app.get('/api/order', (req, res) => {
    const { id } = req.query;
    
    if (!id) {
        return res.status(400).json({
            error: "注文IDが必要です",
            message: "クエリパラメータに id を指定してください"
        });
    }
    
    const order = orders.find(o => o.id === id);
    
    if (order) {
        res.json(formatOrderResponse(order));
    } else {
        res.status(404).json({
            error: "注文が見つかりません",
            message: "指定された注文番号は存在しません"
        });
    }
});

// GET /api/orders - 全注文一覧を取得
app.get('/api/orders', (req, res) => {
    const formattedOrders = orders.map(order => ({
        ...formatOrderResponse(order),
        created_at: new Date(order.created_at).toLocaleString('ja-JP')
    }));
    
    res.json({
        orders: formattedOrders,
        total_count: orders.length
    });
});

// POST /api/order - 新規注文を作成
app.post('/api/order', (req, res) => {
    const {
        customer_name,
        customer_email,
        customer_address,
        items,
        total
    } = req.body;
    
    if (!customer_name || !customer_email || !customer_address || !items || !total) {
        return res.status(400).json({
            error: "必須項目が不足しています",
            message: "customer_name, customer_email, customer_address, items, total が必要です"
        });
    }
    
    const newOrderId = (Math.max(...orders.map(o => parseInt(o.id))) + 1).toString();
    const newOrder = {
        id: newOrderId,
        customer_name,
        customer_email,
        customer_address,
        delivery_date: getRandomFutureDate(),
        delivery_time: getRandomTimeSlot(),
        status: "注文受付",
        store: "2031",
        location: "In Store",
        link: `https://portal.zoomllytire.net?order=${newOrderId}`,
        items,
        total,
        created_at: new Date().toISOString()
    };
    
    orders.push(newOrder);
    
    res.status(201).json({
        id: newOrder.id,
        message: "注文が正常に作成されました",
        link: newOrder.link,
        created_at: new Date(newOrder.created_at).toLocaleString('ja-JP')
    });
});

// PUT /api/order/:id - 注文ステータスを更新
app.put('/api/order/:id', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    
    const orderIndex = orders.findIndex(o => o.id === id);
    
    if (orderIndex === -1) {
        return res.status(404).json({
            error: "注文が見つかりません",
            message: "指定された注文番号は存在しません"
        });
    }
    
    if (status) {
        orders[orderIndex].status = status;
    }
    
    res.json({
        message: "注文が正常に更新されました",
        id: id,
        updated_at: new Date().toLocaleString('ja-JP')
    });
});

// ユーティリティ関数
function getRandomFutureDate() {
    const today = new Date();
    const futureDate = new Date(today.getTime() + (Math.floor(Math.random() * 7) + 1) * 24 * 60 * 60 * 1000);
    return futureDate.toISOString().split('T')[0];
}

function getRandomTimeSlot() {
    const slots = ["09-12", "12-15", "15-18", "18-21"];
    return slots[Math.floor(Math.random() * slots.length)];
}

// ルートページ - API情報を表示
app.get('/', (req, res) => {
    res.json({
        message: "zoomllytire タイヤECサイト API",
        version: "1.0.0",
        endpoints: {
            "GET /api/order?id={id}": "特定の注文情報を取得",
            "GET /api/orders": "全注文一覧を取得",
            "POST /api/order": "新規注文を作成",
            "PUT /api/order/{id}": "注文ステータスを更新"
        },
        sample_usage: {
            "注文取得": "GET /api/order?id=10001",
            "全注文取得": "GET /api/orders"
        }
    });
});

// ヘルスチェック
app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// エラーハンドリング
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: "内部サーバーエラー",
        message: "サーバーで問題が発生しました"
    });
});

// 404ハンドリング
app.use((req, res) => {
    res.status(404).json({
        error: "エンドポイントが見つかりません",
        message: "指定されたURLは存在しません"
    });
});

app.listen(PORT, () => {
    console.log(`🚗 zoomllytire API Server is running on port ${PORT}`);
    console.log(`📡 API endpoints available at: http://localhost:${PORT}`);
});

module.exports = app;