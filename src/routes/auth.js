const express = require('express');
const supabaseAdmin = require('../config/supabase');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

// Delete account endpoint
router.delete('/delete-account', authenticate, async (req, res) => {
  try {
    const userId = req.user.id;
    
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }
    
    // Step 1: Delete user's data from all tables
    await Promise.all([
      supabaseAdmin.from('profiles').delete().eq('id', userId),
      // Add other tables as needed:
      // supabaseAdmin.from('workouts').delete().eq('user_id', userId),
      // supabaseAdmin.from('food_logs').delete().eq('user_id', userId),
    ]);
    
    // Step 2: Delete the auth user account
    const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(userId);
    
    if (deleteError) {
      throw deleteError;
    }
    
    return res.status(200).json({ 
      success: true, 
      message: 'Account deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting account:', error);
    return res.status(500).json({ 
      success: false, 
      error: error.message || 'Failed to delete account' 
    });
  }
});

module.exports = router;