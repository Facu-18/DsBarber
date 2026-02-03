import { Router } from "express";
import { BarberServicePriceController } from "../controllers/barberServicePrice";

const router = Router();

router.post("/upsert", BarberServicePriceController.upsertPrice);
router.get("/:barberId/:serviceId", BarberServicePriceController.getPrice);

export default router;
