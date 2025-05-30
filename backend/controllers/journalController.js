import sql from '../config/db.js'

export const createJournalEntry = async (req, res) => {
    const { entry_text, mood_rating } = req.body;
    console.log('decoded user:', req.user);
    const user_id = req.user.id;

    if (!entry_text || !mood_rating){
        return res.status(400).json({
            success: false,
            error: 'Missing required fields'
        });
    }

    try {
        const result = await sql`
            INSERT INTO journal_entries (user_id, entry_text, mood_rating)
            VALUES (${user_id}, ${entry_text}, ${mood_rating})
            RETURNING id
        `;

        res.status(201).json({
            success: true,
            id: result[0].id
        });
    } catch (error) {
        console.error('Error inserting journal entry:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
}

export const getJournalEntries = async (req, res) => {
    const user_id = req.user.id;
    console.log('decoded user:', req.user)
    try {
        const entries = await sql`
            SELECT * FROM journal_entries
            WHERE user_id = ${user_id}
            ORDER BY created_at DESC
        `

        res.json(entries)
    } catch (error) {
        console.error('Error fetching journal entries:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

