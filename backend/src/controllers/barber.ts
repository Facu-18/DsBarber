// src/controllers/barber.ts
import { Request, Response } from "express";
import { Barber } from "../models/Barber";
import formidable from "formidable";
import { v4 as uuid } from "uuid";
import cloudinary from "../config/cloudinary";

export class BarberController {
  static uploadImage = async (req: Request, res: Response) => {
    const form = formidable({ multiples: false, keepExtensions: true });

    form.parse(req, async (error, fields, files) => {
      if (error) {
        return res
          .status(400)
          .json({ message: "Error al procesar el formulario" });
      }

      const barberId = req.params.barberId;

      // Buscar barbero
      const barber = await Barber.findByPk(barberId);

      // Obtener archivo
      const uploadedFile = Array.isArray(files.file)
        ? files.file[0]
        : files.file;

      if (!uploadedFile) {
        return res
          .status(400)
          .json({ message: "No se proporcionó ninguna imagen" });
      }

      try {
        const result = await cloudinary.uploader.upload(uploadedFile.filepath, {
          public_id: uuid(),
          folder: "dsbarber/uploads",
        });

        barber!.image = result.secure_url;
        await barber!.save();

        return res.json({ image: result.secure_url });
      } catch (uploadError) {
        console.error("Error al subir a Cloudinary", uploadError);
        return res.status(500).json({ message: "Error al subir la imagen" });
      }
    });
  };

  static createBarber = async (req: Request, res: Response) => {
    try {
      const newBarber = await Barber.create(req.body);
      await newBarber.save();

      res.status(201).json({
        message: "Barbero registrado con éxito",
        barber: newBarber,
      });
    } catch (error) {
      console.error("Error al registrar barbero:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  };

  static getAllBarbers = async (req: Request, res: Response) => {
    try {
      const barbers = await Barber.findAll({
        order: [["name", "DESC"]],
      });
      res.json(barbers);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Hubo un error" });
    }
  };

  static getBarberId = async (req: Request, res: Response) => {
    try {
      const barberId = req.params.barberId;
      const barber = await Barber.findByPk(barberId);
      res.json(barber);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Hubo un error" });
    }
  };

  static updateBarberById = async (req: Request, res: Response) => {
    try {
      const { barber } = req;
      const { name, description } = req.body;
  
      if (!barber) {
        res.status(404).json({ message: "Barbero no encontrado" });
        return 
      }
  
      // Actualizar campos si fueron provistos
      if (name) barber.name = name;
      if (description) barber.description = description;
  
      await barber.save();
  
      res.json({
        message: "Barbero actualizado correctamente",
        barber,
      });
    } catch (error) {
      console.error("Error al actualizar barbero:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  };

  static deleteBarberById = async (req: Request, res: Response) => {
    try {
      const { barber } = req;

      if (!barber) {
        res.status(404).json({ message: "El barbero no fue encontrado" });
        return;
      }

      // Eliminar registo del barbero
      await Barber.destroy({ where: { barber_id: barber.barber_id } });

      res.json("Barbero Eliminado Correctamente");
    } catch (error) {
      console.error("Error al eliminar al barbero:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  };
}