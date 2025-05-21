import express from 'express';
import dotenv from 'dotenv'
import colors from 'colors'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './docs/swagger';
import barberAvailabilityRoutes from './routes/barberAvailabilityRoutes'
import barberRoutes from './routes/barberRoutes'
import serviceRoutes from './routes/serviceRoutes'
import bookingRoutes from './routes/bookingRoutes'
import disabledSlotsRoutes from './routes/disabledSlotsRoutes'
import { db } from './config/database';

dotenv.config()

async function connectDB() {
  try{
      await db.authenticate()
      db.sync()
      console.log( colors.blue.green('Conexión a la base de datos exitosa'))
  }catch(error){
      console.log(error)
  }
}
connectDB()

const app = express();
const port = process.env.PORT;

app.use(express.json());

const allowedOrigins = [
  'http://localhost:3000',
  'https://ds-barber.vercel.app'
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}));
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

app.use('/api/barber', barberRoutes)
app.use('/api/service', serviceRoutes)
app.use('/api/availability', barberAvailabilityRoutes);
app.use('/api/booking', bookingRoutes);
app.use('/api/disabled', disabledSlotsRoutes);

//ruta de swagger
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));