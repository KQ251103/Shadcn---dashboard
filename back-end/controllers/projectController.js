import {Proyect} from '../models/project.js';

export const getAllProjects = async (req, res) => {
    try {
        const projects = await Proyect.find();
        res.status(200).json(projects);
    } catch (error) {
        console.error('Error al obtener los proyectos:', error);
        res.status(500).json({ message: 'Error al obtener los proyectos' });
    }
};

export const getProjectById = async (req, res) => {
    try {
        const project = await Proyect.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ message: 'Proyecto no encontrado' });
        }
        res.status(200).json(project);
    } catch (error) {
        console.error('Error al obtener el proyecto:', error);
        res.status(500).json({ message: 'Error al obtener el proyecto' });
    }
};

export const createProject = async (req, res) => {
    try {
        const project = new Proyect(req.body);
        await project.save();
        res.status(201).json({ message: 'Proyecto creado correctamente', project });
    } catch (error) {
        console.error('Error al crear el proyecto:', error);
        res.status(500).json({ message: 'Error al crear el proyecto' });
    }
};

export const updateProject = async (req, res) => {
    try {
        const project = await Proyect.findByIdAndUpdate(req.params.id
, req.body, { new: true });
        if (!project) {
            return res.status(404).json({ message: 'Proyecto no encontrado' });
        }
        res.json({ message: 'Proyecto actualizado correctamente', project });
    } catch (error) {
        console.error('Error al actualizar el proyecto:', error);
        res.status(500).json({ message: 'Error al actualizar el proyecto' });
    }
};

export const deleteProject = async (req, res) => {
    try {
        const project = await Proyect.findByIdAndDelete(req.params.id);
        if (!project) {
            return res.status(404).json({ message: 'Proyecto no encontrado' });
        }
        res.json({ message: 'Proyecto eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar el proyecto:', error);
        res.status(500).json({ message: 'Error al eliminar el proyecto' });
    }
};
