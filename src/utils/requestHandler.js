export const requestHandler = async (operation, res) => {
    try {
        const result = await operation();
        res.json({ status: 'success', result });
    } catch (error) {
        console.log(error)
        if (error.message.includes('E11000 duplicate key')) {
            error.status = '200';
            error.message = 'Email already in use...';
        }
        
        return res.status(500).json({ status: 'error', message: error.message });
    }
};
