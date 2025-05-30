import sql from '../config/db.js'

export const addContact = async (req, res) => {
    const { contact_name, contact_email } = req.body;
    const user_id = req.user.id;

    if (!contact_name || !contact_email){
        return res.status(400).json({ error: 'Missing required fields '});
    }

    try {
        const result = await sql`
            INSERT INTO contacts (user_id, contact_name, contact_email)
            VALUES (${user_id}, ${contact_name}, ${contact_email})
            RETURNING *
        `

        res.status(201).json(result[0])
    } catch (error) {
        console.error('Error adding contact:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const getContacts = async (req, res) => {
    const user_id = req.user.id;
    console.log('decoded user:', req.user)
    try {
        const contacts = await sql`
            SELECT * FROM contacts
            WHERE user_id = ${user_id}
            ORDER BY created_at DESC
        `

        res.json(contacts)
    } catch (error) {
        console.error('Error fetching contacts:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}