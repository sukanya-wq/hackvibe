import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import { getDishRecommendationsAI, getSommelierChatResponse, getAIOperationsInsights } from './src/lib/gemini';
import {
  INITIAL_MENU,
  INITIAL_TABLES,
  INITIAL_RESERVATIONS,
  INITIAL_QUEUE,
  INITIAL_ORDERS,
  INITIAL_INVENTORY,
  INITIAL_STAFF,
  INITIAL_CUSTOMERS,
  INITIAL_INSIGHTS
} from './src/data/mockData';

export const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory data state
let menu = [...INITIAL_MENU];
let tables = [...INITIAL_TABLES];
let reservations = [...INITIAL_RESERVATIONS];
let queue = [...INITIAL_QUEUE];
let orders = [...INITIAL_ORDERS];
let inventory = [...INITIAL_INVENTORY];
let staff = [...INITIAL_STAFF];
let customers = [...INITIAL_CUSTOMERS];
let insights = [...INITIAL_INSIGHTS];

async function startServer() {

  // API Routes
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', service: 'RestaurantOS AI Engine', time: new Date().toISOString() });
  });

  // Auth Simulation Endpoints
  app.post('/api/auth/otp', (req, res) => {
    const { email, role } = req.body;
    res.json({
      success: true,
      message: `OTP code sent to ${email}`,
      user: {
        id: 'user-' + Date.now(),
        name: email.split('@')[0],
        email,
        role: role || 'customer',
        token: 'token-' + Math.random().toString(36).substring(2)
      }
    });
  });

  app.post('/api/auth/google', (req, res) => {
    const { role } = req.body;
    res.json({
      success: true,
      user: {
        id: 'google-user-1',
        name: 'Alexander Vance',
        email: 'alexander@gourmet.com',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        role: role || 'customer',
        token: 'google-token-' + Date.now()
      }
    });
  });

  // AI Endpoints
  app.post('/api/ai/recommend', async (req, res) => {
    try {
      const preferences = req.body;
      const recommendations = await getDishRecommendationsAI(preferences);
      res.json(recommendations);
    } catch (err: any) {
      res.status(500).json({ error: err.message || 'AI Recommendation failed' });
    }
  });

  app.post('/api/ai/chat', async (req, res) => {
    try {
      const { history, message } = req.body;
      const responseText = await getSommelierChatResponse(history || [], message || '');
      res.json({ reply: responseText });
    } catch (err: any) {
      res.status(500).json({ error: err.message || 'AI Chat failed' });
    }
  });

  app.get('/api/ai/insights', async (req, res) => {
    try {
      const aiResults = await getAIOperationsInsights();
      res.json(aiResults);
    } catch (err: any) {
      res.status(500).json({ error: err.message || 'AI Insights failed' });
    }
  });

  // Menu Endpoints
  app.get('/api/menu', (req, res) => {
    res.json(menu);
  });

  app.post('/api/menu', (req, res) => {
    const newItem = { id: 'm' + (menu.length + 1), ...req.body };
    menu.push(newItem);
    res.json(newItem);
  });

  // Tables Endpoints
  app.get('/api/tables', (req, res) => {
    res.json(tables);
  });

  app.patch('/api/tables/:id', (req, res) => {
    const { id } = req.params;
    const index = tables.findIndex(t => t.id === id);
    if (index !== -1) {
      tables[index] = { ...tables[index], ...req.body };
      res.json(tables[index]);
    } else {
      res.status(404).json({ error: 'Table not found' });
    }
  });

  // Reservations Endpoints
  app.get('/api/reservations', (req, res) => {
    res.json(reservations);
  });

  app.post('/api/reservations', (req, res) => {
    const newRes = {
      id: 'res-' + Date.now(),
      status: 'confirmed',
      createdAt: new Date().toISOString(),
      ...req.body
    };
    reservations.unshift(newRes);
    res.json(newRes);
  });

  // Queue Endpoints
  app.get('/api/queue', (req, res) => {
    res.json(queue);
  });

  app.post('/api/queue', (req, res) => {
    const ticketNum = 'Q-0' + (queue.length + 4);
    const newQueueItem = {
      id: 'q-' + Date.now(),
      ticketNumber: ticketNum,
      estimatedWaitMinutes: 15,
      status: 'waiting',
      joinedAt: new Date().toISOString(),
      ...req.body
    };
    queue.push(newQueueItem);
    res.json(newQueueItem);
  });

  // Orders Endpoints
  app.get('/api/orders', (req, res) => {
    res.json(orders);
  });

  app.post('/api/orders', (req, res) => {
    const ordNum = 'ORD-#' + (100 + orders.length + 1);
    const newOrder = {
      id: 'ord-' + Date.now(),
      orderNumber: ordNum,
      status: 'preparing',
      createdAt: new Date().toISOString(),
      estimatedPrepTimeMinutes: 18,
      paymentStatus: 'pending',
      ...req.body
    };
    orders.unshift(newOrder);
    res.json(newOrder);
  });

  app.patch('/api/orders/:id/status', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const index = orders.findIndex(o => o.id === id);
    if (index !== -1) {
      orders[index].status = status;
      res.json(orders[index]);
    } else {
      res.status(404).json({ error: 'Order not found' });
    }
  });

  // Inventory Endpoints
  app.get('/api/inventory', (req, res) => {
    res.json(inventory);
  });

  app.patch('/api/inventory/:id/restock', (req, res) => {
    const { id } = req.params;
    const { amount } = req.body;
    const index = inventory.findIndex(i => i.id === id);
    if (index !== -1) {
      inventory[index].currentStock += (amount || 5.0);
      inventory[index].status = inventory[index].currentStock >= inventory[index].minThreshold ? 'optimal' : 'low';
      inventory[index].lastRestocked = new Date().toISOString().split('T')[0];
      res.json(inventory[index]);
    } else {
      res.status(404).json({ error: 'Inventory item not found' });
    }
  });

  // Staff & Customers & Insights
  app.get('/api/staff', (req, res) => res.json(staff));
  app.get('/api/customers', (req, res) => res.json(customers));
  app.get('/api/insights', (req, res) => res.json(insights));

  // Vite Middleware Setup
  const isProduction = process.env.NODE_ENV === 'production';
  const distPath = path.join(process.cwd(), 'dist');
  const hasDistFolder = fs.existsSync(distPath) && fs.existsSync(path.join(distPath, 'index.html'));

  if (!isProduction || !hasDistFolder) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`\n==================================================`);
    console.log(`🚀 [RestaurantOS AI Engine] Server active!`);
    console.log(`👉 Open in your browser: http://localhost:${PORT}`);
    console.log(`👉 Alternative link:      http://127.0.0.1:${PORT}`);
    console.log(`==================================================\n`);
  });

  server.on('error', (err: any) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`\n❌ Error: Port ${PORT} is already in use by another application!`);
      console.error(`💡 Solution: Close the app using port ${PORT} or kill node processes.\n`);
    } else {
      console.error('❌ Server startup error:', err);
    }
  });
}

if (process.env.VERCEL !== '1' && !process.env.VERCEL_ENV) {
  startServer();
}

export default app;
