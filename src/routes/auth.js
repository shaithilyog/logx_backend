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
    
    console.log('Starting account deletion for user:', userId);
    
    // Step 1: Delete user's profile data
    try {
      const { error: profileError } = await supabaseAdmin
        .from('profiles')
        .delete()
        .eq('id', userId);
        
      if (profileError) {
        console.error('Error deleting profile data:', profileError);
      } else {
        console.log('Profile data deleted successfully');
      }
    } catch (dataError) {
      console.error('Error in profile deletion step:', dataError);
    }
    
    // Step 2: Delete the auth user
    try {
      const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(userId);
      
      if (deleteError) {
        console.error('Error in auth.admin.deleteUser:', deleteError);
        throw deleteError;
      }
      
      console.log('User auth account deleted successfully');
    } catch (authDeleteError) {
      console.error('Auth deletion error details:', authDeleteError);
      throw authDeleteError;
    }
    
    return res.status(200).json({
      success: true,
      message: 'Account deleted successfully'
    });
  } catch (error) {
    console.error('Overall delete account error:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to delete account'
    });
  }
});

module.exports = router;