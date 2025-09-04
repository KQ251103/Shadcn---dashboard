
import { Person } from '../models/person.js';
export const getAllPersons = async (req, res) => {
    try {
        const persons = await Person.find();
        res.status(200).json(persons);
    } catch (error) {
        console.error('Error al obtener las personas:', error);
        res.status(500).json({ message: 'Error al obtener las personas' });
    }
}
export const getPersonById = async (req, res) => {
  try {
    const { query } = req.query // viene de ?query=nombre

    if (!query) {
      return res.status(400).json({ message: "Falta el término de búsqueda." })
    }

    const searchRegex = new RegExp(query, "i") // "i" para ignorar mayúsculas/minúsculas

    const results = await Person.find({
      $or: [
        { name: searchRegex },
        { role: searchRegex },
        { department: searchRegex },
        { email: searchRegex },
        { location: searchRegex },
        { skills: { $elemMatch: { $regex: searchRegex } } }
      ]
    })

    res.json(results)
  } catch (error) {
    res.status(500).json({ message: "Error al buscar perfiles.", error })
  }
}
export const createPerson = async (req, res) => {
  try {
    const person = new Person(req.body);
    await person.save();
    res.status(201).json({ person });
  } catch (error) {
    console.error("Error al crear persona:", error);
    res.status(500).json({ message: "Error al crear persona", error: error.message });
  }
};

export const updatePerson = async (req, res) => {
    try {
        const person = await Person.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!person) {
            return res.status(404).json({ message: 'Persona no encontrada' });
        }
        res.json({ message: 'Persona actualizada correctamente', person });
    } catch (error) {
        console.error('Error al actualizar la persona:', error);
        res.status(500).json({ message: 'Error al actualizar la persona' });
    }
}
export const deletePerson = async (req, res) => {
    try {
        const person = await Person.findByIdAndDelete(req.params.id);
        if (!person) {
            return res.status(404).json({ message: 'Persona no encontrada' });
        }
        res.status(200).json({ message: 'Persona eliminada correctamente' });
    } catch (error) {
        console.error('Error al eliminar la persona:', error);
        res.status(500).json({ message: 'Error al eliminar la persona' });
    }
}