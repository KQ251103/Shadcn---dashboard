import { Email } from '../models/email.js';

export const getAllEmails = async (req, res) => {
  try {
    const emails = await Email.find(); 
    res.status(200).json(emails);
  } catch (error) {
    console.error('Error al obtener los correos electrónicos:', error);
    res.status(500).json({ message: 'Error al obtener los correos electrónicos' });
  }
};
export const getInboxEmails = async(req, res )=>{
    try{
        const emails= await Email.find({status:"inbox"})
        res.json(emails);
    }catch(error){
        console.error('Error al obtener los correos de inbox', error)
        res.status(500).json({message:'Error al obtener los correos de inbox'})
    }
}
export const getArchivedEmails = async(req, res)=>{
    try{
        const emails= await Email.find({status:"archived"})
        res.json(emails);
    }catch(error){
        console.error('Error al obtener los correos archivados', error)
        res.status(500).json({message:'Error al obtener los correos archivados'})
    }
}
export const getDeletedEmails = async(req, res)=>{
    try{
        const emails= await Email.find({status:"deleted"})
        res.json(emails);
    }catch(error){
        console.error('Error al obtener los correos eliminados', error)
        res.status(500).json({message:'Error al obtener los correos eliminados'})
    }
}
export const getEmailById = async (req, res) => {
    try {
        const email = await Email.findById(req.params.id);
        if (!email) {
            return res.status(404).json({ message: 'Correo electrónico no encontrado' });
        }
        res.status(200).json(email);
    } catch (error) {
        console.error('Error al obtener el correo electrónico:', error);
        res.status(500).json({ message: 'Error al obtener el correo electrónico' });
    }
};
export const createEmail = async (req, res) => {
    try {
        const email = new Email(req.body);
        await email.save();
        res.status(201).json({ message: 'Correo electrónico creado correctamente', email });
    } catch (error) {
        console.error('Error al crear el correo electrónico:', error);
        res.status(500).json({ message: 'Error al crear el correo electrónico' });
    }
};
export const archiveEmail = async (req, res) => {
    try{
        const email = await Email.findByIdAndUpdate(
            req.params.id,
            {status:"archived"},
            {new:true}
        );
        if(!email)
            return res.status(404).json({message:'Correo electronico no encontrado'});
        res.status(200).json({message:'Correo archivado correctamente',email});
    }catch(error){
        console.error('Error al archivar el correo electronico:',error);
        res.status(500).json({message:'Error al archivado el correo electronico'});
    }
};
export const moveToTrash = async (req, res)=>{
    try{
        const email = await Email.findByIdAndUpdate(
            req.params.id,
            {status:"deleted"},
            {new:true}
        );
        if(!email)
            return res.status(404).json({message:'Correo electronico no encontrado'});
        res.status(200).json({message:'Correo movido a elimanados',email});
    }catch(error){
        console.error('Error al mover correo a eliminados:',error);
        res.status(500).json({message:'Error al mover correo a eliminados'});
    }
};

export const restoreEmail = async (req, res)=>{
    try{
        const email = await Email.findByIdAndUpdate(
            req.params.id,
            {status:"inbox"},
            {new:true}
        );
        if(!email)
            return res.status(404).json({message:'Correo electronico no encontrado'});
        res.status(200).json({message:'Correo restaurado correctamente',email});
    }catch(error){
        console.error('Error al restaurar correo electronico:',error);
        res.status(500).json({message:'Error al restaurar correo electronico'});
    }
};

export const deleteEmail = async (req, res) => {
    try {
        const email = await Email.findByIdAndDelete(req.params.id);
        if (!email) {
            return res.status(404).json({ message: 'Correo electrónico no encontrado' });
        }
        res.json({ message: 'Correo electrónico eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar el correo electrónico:', error);
        res.status(500).json({ message: 'Error al eliminar el correo electrónico' });
    }
};
export const searchEmails = async (req, res) => {
    const { query } = req.query;
    try {
        const emails = await Email.find({
            $or: [
                { subject: new RegExp(query, 'i') },
                { body: new RegExp(query, 'i') },
                { sender: new RegExp(query, 'i') },
                { recipient: new RegExp(query, 'i') }
            ]
        });
        res.status(200).json(emails);
    } catch (error) {
        console.error('Error al buscar correos electrónicos:', error);
        res.status(500).json({ message: 'Error al buscar correos electrónicos' });
    }
};
export const togglePinEmail = async (req, res) =>{
    try{
        const {id} = req.params;
        const email = await Email.findById(id);
        if(!email)
            return res.status(404).json({error:"Email no encontrado"});
        email.isPinned = !email.isPinned;
        await email.save();

        res.json({email});
    }catch(error){
        console.error("Error al fijar correo:",error);
        res.status(505).json({error:"Error al fijar correo electronico"})
    }
}