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

app.use(cors({
  origin: 'http://localhost:3000', 
}));

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

app.use('/api/barber', barberRoutes)
app.use('/api/service', serviceRoutes)
app.use('/api/availability', barberAvailabilityRoutes);
app.use('/api/booking', bookingRoutes);


//ruta de swagger
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));